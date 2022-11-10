exports.Complaint = {
  policeStation: async ({ id }, args, { models, userInfo }) => {
    const { Complaint, PoliceStation } = models;

    const complaint = await Complaint.findById(id);

    return await PoliceStation.findById(complaint.policeStation);
  },
};
