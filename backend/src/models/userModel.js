const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  location: {
    lat: Number,
    lng: Number,
  },
  dob: Date,
  password: { type: String, select: false },
  address: String,
  complaints: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Complaint' }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
