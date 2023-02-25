exports.User = {
  complaints: async ({ id }, args, { models, userInfo }) => {
    const { Complaint, User } = models;

    const user = await User.findById(id);

    const complaints = user.complaints.map(
      async (complaint) => await Complaint.findById(complaint._id)
    );
    return Promise.all(complaints);
  },
  comments: async ({ id }, args, { models, userInfo }) => {
    const { Comment, User } = models;

    const user = await User.findById(id);

    const comments = user.comments.map(
      async (comment) => await Comment.findById(comment._id)
    );
    return Promise.all(comments);
  },
};
