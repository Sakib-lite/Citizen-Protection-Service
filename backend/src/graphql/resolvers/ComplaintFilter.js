exports.ComplaintFilter = {
  policeStation: async ({ id }, args, { models, userInfo }) => {
    const {  PoliceStation } = models;
    return await PoliceStation.findById(id);
  },
};
