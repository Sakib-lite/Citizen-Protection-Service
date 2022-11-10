exports.Query = {
  users: async (parent, { credentials, name }, { models }) => {
    const { User } = models;
    return await User.find({});
  },
  user: async (parent, args, { models, userInfo }) => {
    const { User } = models;
    return await User.findById(userInfo.id);
  },
  complaints: async (_, args, { models, userInfo }) => {
    const { Complaint } = models;
    return await Complaint.find({});
  },
  complaint: async (_, { id }, { models, userInfo }) => {
    const { Complaint } = models;
    return await Complaint.findById(id);
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
