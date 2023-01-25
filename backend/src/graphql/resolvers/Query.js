const User = require('../../models/userModel');

exports.Query = {
  users: async (parent, { credentials, name }, { models }) => {
    const { User } = models;
    return await User.find({});
  },
  user: async (parent, args, { models, userInfo }) => {
    const { User } = models;
    const user = await User.findById(userInfo.id);
    return user;
  },
  complaints: async (_, args, { models, userInfo }) => {
    const { Complaint } = models;
    return await Complaint.find({});
  },
  complaint: async (_, { id }, { models, userInfo }) => {
    const author = await User.findById(userInfo.id);

    const { Complaint } = models;
    return await Complaint.findById(id);
  },

  comments: async (_, args, { models, userInfo }) => {
    const { Comment } = models;
    return await Comment.find({})
  },
  comment: async (_, { id }, { models, userInfo }) => {
    const { Comment } = models;
    return await Comment.findById(id);
  },

  policeStations: async (_, args, { models, userInfo }) => {
    const { PoliceStation } = models;
    return await PoliceStation.find({});
  },
  policeStation: async (_, { id }, { models, userInfo }) => {
    const { PoliceStation } = models;
    return await PoliceStation.findById(id);
  },
};
