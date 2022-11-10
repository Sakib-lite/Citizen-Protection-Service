exports.PoliceStation = {
  complaints: async ({ id }, args, { models, userInfo }) => {
    const { Complaint, PoliceStation } = models;

    const policeStation = await PoliceStation.findById(id);

    const complaints = policeStation.complaints.map(
      async (complaint) => await Complaint.findById(complaint._id)
    );
    return Promise.all(complaints);
  },
};
