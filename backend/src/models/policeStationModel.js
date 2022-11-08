const mongoose = require('mongoose');

const policeStationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    number: { type: Number, required: true },
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
    address: String
  },
  { timestamps: true}
);
policeStationSchema.index({ location: '2dsphere' });
const PoliceStation = mongoose.model('PoliceStation', policeStationSchema);

module.exports = PoliceStation;
