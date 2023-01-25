const { filterObj } = require('../../../utils/filterObj');

const Error = (msg = 'Something went wrong') => {
  return {
    userErrors: [
      {
        message: msg,
      },
    ],
    comment: null,
  };
};

exports.commentResolvers = {
  commentCreate: async (_, { input }, { models, userInfo }) => {
    try {
      const { User, Complaint, Comment } = models;

      const author = await User.findById(userInfo.id);
      if (!author) return Error('You are not logged in');
      const { comment, complaintId } = input;
      if (!comment || !complaintId)
        return Error('Please fill up the comment field');

      const complaint = await Complaint.findById(complaintId);
      if (!complaint) return Error('No complaint found by this id');

      const newComment = await Comment.create({
        comment,
        author: author.id,
        complaint: complaint.id,
      });
      if (!newComment) return Error('Comment cannot be created');
      author.comments.push(newComment);
      author.save();

      complaint.comments.push(newComment);
      complaint.save()

      return {
        userErrors: [],
        comment:newComment,
      };
    } catch (err) {
  
      return Error(err.message);
    }
  },

  commentUpdate: async (_, { id, input }, { models, userInfo }) => {
    try {
      const { Comment, User } = models;
      const author = await User.findById(userInfo.id);

      if (!author) return Error('You are not logged in');

      if (!input) return Error('Empty field');

      const obj = filterObj(input);

      const comment = await Comment.findByIdAndUpdate(id, obj, {
        new: true,
        runValidators: true,
      });

      if (!comment) return Error('No comment found with this id');

      return {
        userErrors: [],
        comment,
      };
    } catch (e) {
      return Error(e.message);
    }
  },
};
