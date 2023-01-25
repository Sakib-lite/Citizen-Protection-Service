const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, 'Review is required'],
      min: 1,
      max: 200,
    },
    complaint: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Complaint',
      required: [true, 'Comment must belong to a complaint'],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Comment must belong to a user'],
    },
    reported: {
      type: Boolean,
      default: false,
    },
    visible: {
      type: Boolean,
      default: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

commentSchema.pre(/^find/, function (next) {
  this.populate({ path: 'complaint', select: 'title  images id' });
  this.populate({
    path: 'author',
    select: 'name image',
  });
  next();
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
