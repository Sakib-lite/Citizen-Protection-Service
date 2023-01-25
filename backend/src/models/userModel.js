const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    number: {
      type: Number,
    },
    dob: Date,
    password: { type: String, select: false },
    address: String,
    complaints: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Complaint' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    image: String,
    role: {
      type: String,
      enum: ['user', 'admin', 'moderator'],
      default: 'user',
    },
    banned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
