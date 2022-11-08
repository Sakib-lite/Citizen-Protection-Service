const jwt_decode = require('jwt-decode');

exports.getUserFromToken = async (token) => {
  try {
    return jwt_decode(token);
  } catch (error) {
    return null;
  }
};
