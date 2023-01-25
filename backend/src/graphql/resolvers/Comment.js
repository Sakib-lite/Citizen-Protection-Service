exports.Comment = {
  complaint: async ({ id }, args, { models, userInfo }) => {
    const { Comment, Complaint } = models;
    const comment = await Comment.findById(id);
    return await Complaint.findById(comment.complaint._id);
  },
  author: async ({ id }, args, { models, userInfo }) => {
    const { User, Comment } = models;
    const comment = await Comment.findById(id);
    return await User.findById(comment.author);
  },
};
