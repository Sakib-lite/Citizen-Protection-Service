const bcrypt=require('bcryptjs')
const { sendToken } =require('../../../utils/sendToken');

const Error = (msg) => {
  return {
    userErrors: [
      {
        message: msg,
      },
    ],
    token: null,
    user:null
  };
};

exports.authResolvers = {
  signup: async (_, { credentials, name }, { models }) => {
    try {
      const { User } = models; //getting user model from context

      const { number, password } = credentials; //destructuring

      if (!number || !password || !name) {
        return Error('Invalid Numver or password'); //sending error
      }
      const foundUser = await User.findOne({ number }); ///checking

      if (foundUser) return Error('Number is already in use'); //sending error

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        name,
        number,
        password: hashedPassword,
      }); //user created
      return {
        userErrors: [],
        token: sendToken(user.id), //sending jwt token
        user
      };
    } catch (err) {
      console.log(err);
    }
  },
  signin: async (_, { credentials }, { models }) => {
    try {
      const { User } = models; //getting user model from context
      const { number, password } = credentials; //destructuring

      const user = await User.findOne({ number }).select('+password'); ///checking

      if (!user) return Error('Invalid number or password'); //sending error

      let isMatch =await bcrypt.compare(password, user.password); //matching password

      if (!isMatch) {
        return {
          userErrors: [{ message: 'Invalid credentials' }], //sending error
          token: null,
        };
      }

      return {
        userErrors: [],
        token: sendToken(user.id),
        user:user
      };
    } catch (err) {
      console.log(err);
    }
  },
};
