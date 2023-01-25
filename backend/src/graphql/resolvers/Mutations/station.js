const cloudinary = require('cloudinary').v2;

require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const Error = (msg="Something went wrong") => {
  return {
    userErrors: [
      {
        message: msg,
      },
    ],
    policeStation: null,
  };
};

exports.policeStationResolvers = {
  policeStationCreate: async (
    _,
    { input, location, image },
    { models, userInfo }
  ) => {
    try {
      const { PoliceStation ,User} = models;
      const author = await User.findById(userInfo.id);
      if (!author) return Error('You are not logged in');

      if (author.role !== 'admin')
        return Error('You are not auhorized to perform this action');
      const { name, address, description, number, street, postalCode } = input;

      if (
        !name ||
        !address ||
        !description ||
        !number ||
        !street ||
        !postalCode ||
        !location
      )
        return Error('pLease fill up all the fields');
      let img = image[0];
      const uploadResponse = await cloudinary.uploader.upload(img, {
        upload_preset: 'd3z47zme',
      });
      const policeStation = await PoliceStation.create({
        name,
        address,
        description,
        number,
        street,
        postalCode,
        location,
        image: uploadResponse.secure_url,
      });

      if (!policeStation) return Error('Something went wrong');
      return {
        userErrors: [],
        policeStation,
      };
    } catch (e) {
      return Error(e.message);
    }
  },
};
