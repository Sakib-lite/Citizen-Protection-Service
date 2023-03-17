require('dotenv').config();
const { checkWord } = require('../../../utils/filterSlang');
const unitValue = 1000;
const cloudinary = require('cloudinary').v2;
const natural = require('natural');
const { filterObj } = require('../../../utils/filterObj');
const distance = 50;
const policeHeadquaterId = '63cfc6f16ce1fd0f73568692';
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const Error = (msg = 'Something went wrong') => {
  return {
    userErrors: [
      {
        message: msg,
      },
    ],
    complaint: null,
  };
};

const sendSms = async (number, message) => {
  try {
    const response = await client.messages.create({
      body: message,
      from: '+18653446021',
      to: `+880${number}`,
    });
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

exports.complaintResolvers = {
  complaintCreate: async (
    _,
    { input, location, images = [] },
    { models, userInfo }
  ) => {
    try {
      const { User, Complaint, PoliceStation, Word } = models;

      const author = await User.findById(userInfo.id);
      if (!author) return Error('You are not logged in');

      const { title, description, public } = input;

      if (!title || !description || !public)
        return Error('Please fill up all the fields');
      const img = [];

      const slangWords = await Word.find({}).slangWords;
      const rumourWordsSet = await Word.find({}).rumourWordsSet;
      const tokenizer = new natural.WordTokenizer();
      const tokenizedTitle = tokenizer.tokenize(title);
      const tokenizedDescription = tokenizer.tokenize(description);

      if (slangWords) {
        tokenizedTitle.forEach((word) => {
          if (checkWord(slangWords, word)) {
            return Error(`"${word}" is slang in title`);
          }
        });

        tokenizedDescription.forEach((word) => {
          if (checkWord(slangWords, word)) {
            return Error(`"${word}" is slang in description`);
          }
        });
      }

      if (rumourWordsSet) {
        tokenizedTitle.forEach((word) => {
          if (checkWord(rumourWordsSet, word)) {
            public = false;
          }
        });

        tokenizedDescription.forEach((word) => {
          if (checkWord(rumourWordsSet, word)) {
            public = false;
          }
        });
      }

      for (let image of images) {
        const uploadResponse = await cloudinary.uploader.upload(image, {
          upload_preset: 'd3z47zme',
        });
        img.push(uploadResponse.secure_url);
      }

      const complaint = await Complaint.create({
        title,
        description,
        public,
        author: author.id,
        images: img,
        location,
      });

      if (!complaint) return Error('Complain cannot be created');
      author.complaints.push(complaint);
      author.save();

      const closest = await PoliceStation.aggregate([
        {
          $geoNear: {
            near: {
              type: 'Point',
              coordinates: [location.coordinates[0], location.coordinates[1]],
            },
            maxDistance: distance * unitValue,
            distanceField: 'distance',
            distanceMultiplier: 1 / unitValue,
          },
        },
        {
          $project: {
            _id: 1,
            distance: 1,
          },
        },
        {
          $sort: {
            distance: 1,
          },
        },
        { $limit: 3 },
      ]);

      if (closest) {
        console.log('closest', closest);
        complaint.policeStation = closest[0]._id;
        complaint.save();
        const policeStation = await PoliceStation.findById(closest[0]._id);
        policeStation.complaints.push(complaint);
        policeStation.save();
        await sendSms(
          policeStation.number,
          `New complaint "${title}" is filed in your police station.`
        );
        await sendSms(
          author.number,
          `Your complaint "${title}" is filed in ${policeStation.name}.`
        );
      } else {
        const policeStation = await PoliceStation.findById(policeHeadquaterId);
        policeStation.complaints.push(complaint);
        policeStation.save();
        await sendSms(
          policeStation.number,
          `New complaint "${title}" is filed in your police station.`
        );
        await sendSms(
          author.number,
          `Your complaint "${title}" is filed in ${policeStation.name}.`
        );
      }

      return {
        userErrors: [],
        complaint,
      };
    } catch (e) {
      return Error(e.message);
    }
  },

  complaintUpdate: async (_, { id, input }, { models, userInfo }) => {
    try {
      const { Complaint, User } = models;
      const author = await User.findById(userInfo.id);
      const { status } = input;
      if (!author) return Error('You are not logged in');

      const complaintObj = filterObj(input);

      const complaint = await Complaint.findByIdAndUpdate(id, complaintObj, {
        new: true,
        runValidators: true,
      });

      if (!complaint) return Error('No Complaint found with this id');
      console.log(status);
      const complaintAuthor = await User.findById(complaint.author);

      if (status)
        await sendSms(
          author.number,
          `Dear ${complaintAuthor.name}, your complaint "${complaint.title}" is solved now. Help us to build a safer city. Have a good day. Best wishes from Citizen Protection Service.`
        );
      return {
        userErrors: [],
        complaint,
      };
    } catch (e) {
      return Error(e.message);
    }
  },
};
