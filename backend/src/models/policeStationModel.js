const mongoose = require('mongoose');

const policeStationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    number: { type: Number },
    location: {
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
      },
    },
    postalCode: Number,
    street: String,
    description: {
      type: String,
      required: true,
    },

    complaints: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Complaint' }],
    address: String,
    image: String,

    beneficiaries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);
policeStationSchema.index({ location: '2dsphere' });
const PoliceStation = mongoose.model('PoliceStation', policeStationSchema);

module.exports = PoliceStation;
