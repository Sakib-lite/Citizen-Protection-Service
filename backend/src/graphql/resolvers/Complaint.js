exports.Complaint = {
  policeStation: async ({ id }, args, { models, userInfo }) => {
    const { Complaint, PoliceStation } = models;
    const complaint = await Complaint.findById(id);
    return await PoliceStation.findById(complaint.policeStation);
  },
  comments: async ({ id }, args, { models, userInfo }) => {
    const { Comment, Complaint } = models;
    const complaint = await Complaint.findById(id);
    const comments = complaint.comments.map(
      async (comment) => await Comment.findById(comment._id)
    );
    return Promise.all(comments);
  },
  author: async ({ id }, args, { models, userInfo }) => {
    const { User, Complaint } = models;
    const complaint = await Complaint.findById(id);
    return await User.findById(complaint.author);
  },
};
