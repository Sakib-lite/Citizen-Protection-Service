const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.sendToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES * 24 * 60 * 60 * 1000,
  });
  return `Bearer ${token}`;
};
