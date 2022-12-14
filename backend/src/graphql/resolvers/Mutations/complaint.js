const { checkSlang } = require('../../../utils/filterSlang');
const distance = 50;
const unitValue = 1000;

const Error = (msg) => {
  return {
    userErrors: [
      {
        message: msg,
      },
    ],
    complaint: null,
  };
};

exports.complaintResolvers = {
  complaintCreate: async (_, { input, location }, { models, userInfo }) => {
    try {
      const { User, Complaint, PoliceStation } = models;

      const author = await User.findById(userInfo.id);

      if (!author) return Error('You are not logged in');

      const { title, description, public, photos } = input;

      if (!title || !description || !public || !photos)
        return Error('Please fill up all the fields');

      if (checkSlang(title) || checkSlang(description))
        return Error('Please remove Abusive words');
      const complaint = await Complaint.create({
        title,
        description,
        public,
        author: author.id,
        photos,
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

      if (!closest) return Error('No closest police station found');
      console.log('closest', closest);
      complaint.policeStation = closest[0]._id;
      complaint.save();

      const policeStation = await PoliceStation.findById(closest[0]._id);
      policeStation.complaints.push(complaint);
      policeStation.save();

      return {
        userErrors: [],
        complaint,
      };
    } catch (e) {
      console.log(e);
    }
  },

  complaintUpdate: async (_, { id, status }, { models, userInfo }) => {
    try {
      const { Complaint, User } = models;
      const author = await User.findById(userInfo.id);

      if (!author) return Error('You are not logged in');

      if (!status) return Error('Please fill up the status field');
      const complaint = await Complaint.findByIdAndUpdate(
        id,
        { status },
        {
          new: true,
          runValidators: true,
        }
      );

      if (!complaint) return Error('No Complaint found with this id');

      return {
        userErrors: [],
        complaint,
      };
    } catch (e) {
      console.log(e);
    }
  },
};
