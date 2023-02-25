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
      complaint.save();

      return {
        userErrors: [],
        comment: newComment,
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
  commentDelete: async (_, { id }, { models, userInfo }) => {
    try {
      const { Comment, User, Complaint } = models;
      const user = await User.findById(userInfo.id);

      if (!user) return Error('You are not logged in');

      if (!id) return Error('Empty id field');

      const comment = await Comment.findById(id);
      if (!comment) return Error('No comment found with this id');

      const author = await User.findOneAndUpdate(
        { _id: comment.author },
        { $pull: { comments: id } },
        { new: true }
      );
      if (!author) return Error('No author found with this id');

      const complaint = await Complaint.findOneAndUpdate(
        { _id: comment.complaint },
        { $pull: { comments: id } },
        { new: true }
      );
      if (!complaint) return Error('No complaint found with this id');

      await Comment.findByIdAndDelete(id);

      return {
        userErrors: [],
        comment: null,
      };
    } catch (e) {
      return Error(e.message);
    }
  },
};
