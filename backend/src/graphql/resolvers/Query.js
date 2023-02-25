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
    try {
      const { Complaint, User } = models;
      const user = await User.findById(userInfo.id);
      if (!user) return [];

      if (user && user.role === 'user') {
        return await Complaint.find({ public: true, status: 'pending' });
      } else return await Complaint.find({});
    } catch (err) {
      console.log(err);
    }
  },
  complaintsByStatus: async (_, { status }, { models, userInfo }) => {
    try {
      const { Complaint } = models;

      if (status === 'all') return await Complaint.find({});
      return await Complaint.find({ status });
    } catch (err) {
      console.log(err);
    }
  },
  complaintFilter: async (_, { type }, { models, userInfo }) => {
    try {
      const { Complaint } = models;
      return await Complaint.aggregate([
        {
          $match: {
            status: type,
          },
        },
        {
          $group: {
            _id: '$policeStation',
            count: { $sum: 1 },
          },
        },
        {
          $lookup: {
            from: 'policestations',
            localField: '_id',
            foreignField: '_id',
            as: 'policeStation',
          },
        },
        {
          $project: {
            _id: 0,
            policeStation: {
              $arrayElemAt: ['$policeStation', 0],
            },
            count: 1,
          },
        },
        {
          $project: {
            name: '$policeStation.name',
            count: 1,
          },
        },
      ]);
    } catch (err) {
      console.log(err);
    }
  },

  complaint: async (_, { id }, { models, userInfo }) => {
    const author = await User.findById(userInfo.id);

    const { Complaint } = models;
    return await Complaint.findById(id);
  },

  comments: async (_, args, { models, userInfo }) => {
    const { Comment, User } = models;
    const user = await User.findById(userInfo.id);

    if (user.role === 'user') {
      return await Comment.find({ reported: false, visible: true });
    }
    return await Comment.find({});
  },
  comment: async (_, { id }, { models, userInfo }) => {
    const { Comment } = models;
    return await Comment.findById(id);
  },

  policeStations: async (_, args, { models, userInfo }) => {
    try {
      const { PoliceStation } = models;
      return await PoliceStation.find({});
    } catch (err) {
      console.log(err);
    }
  },
  policeStation: async (_, { id }, { models, userInfo }) => {
    const { PoliceStation } = models;
    return await PoliceStation.findById(id);
  },
};
