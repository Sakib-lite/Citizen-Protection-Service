const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    public: { type: Boolean, default: true },
    photos: { type: String },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: {
      type: String,
      enum: ['pending', 'watching', 'solved'],
      default: 'pending',
    },
    policeStation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PoliceStation',
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
      },
    },
  },
  { timestamps: true }
);
complaintSchema.index({ location: '2dsphere' });
const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;
