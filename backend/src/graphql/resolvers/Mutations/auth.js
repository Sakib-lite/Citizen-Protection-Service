const bcrypt = require('bcryptjs');
const { filterObj } = require('../../../utils/filterObj');
const { sendToken } = require('../../../utils/sendToken');
const cloudinary = require('cloudinary').v2;

require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const Error = (msg) => {
  return {
    userErrors: [
      {
        message: msg,
      },
    ],
    token: null,
    user: null,
  };
};

exports.authResolvers = {
  signup: async (_, { credentials, name, image }, { models }) => {
    try {
      const { User } = models; //getting user model from context

      const { number, password } = credentials; //destructuring

      if (!number || !password || !name) {
        return Error('Invalid Numver or password'); //sending error
      }
      const foundUser = await User.findOne({ number }); ///checking

      if (foundUser) return Error('Number is already in use'); //sending error

      let img = image[0];
      const uploadResponse = await cloudinary.uploader.upload(img, {
        upload_preset: 'd3z47zme',
      });

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        name,
        number,
        password: hashedPassword,
        image: uploadResponse.secure_url,
      }); //user created

      return {
        userErrors: [],
        token: sendToken(user.id), //sending jwt token
        user,
      };
    } catch (err) {
      console.log(err);
      return Error(err.message);
    }
  },
  signin: async (_, { credentials }, { models }) => {
    try {
      const { User } = models; //getting user model from context
      const { number, password } = credentials; //destructuring

      const user = await User.findOne({ number }).select('+password'); ///checking

      if (!user) return Error('Invalid number or password'); //sending error

      let isMatch = await bcrypt.compare(password, user.password); //matching password

      if (!isMatch) {
        return Error('Wrong number or password');
      }
      if (user.banned) return Error('You are banned from this application');
      return {
        userErrors: [],
        token: sendToken(user.id),
        user: user,
      };
    } catch (err) {
      console.log(err);
      return Error(err.message);
    }
  },
  userUpdate: async (_, { input, id }, { models, userInfo }) => {
    try {
      const { User } = models; //getting user model from context

      // const author = await User.findById(userInfo.id);
      // if (!author) return Error('You are not logged in');

      if (!input) return Error('Empty field');

      const obj = filterObj(input);
      const user = await User.findByIdAndUpdate(id, obj, {
        new: true,
        runValidators: true,
      });

      if (!user) return Error('No user found with this id');
      return {
        userErrors: [],
        token: sendToken(user.id),
        user: user,
      };
    } catch (err) {
      console.log(err);
      return Error(err.message);
    }
  },
};
