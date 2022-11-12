const { authResolvers } = require('./auth');
const { complaintResolvers } = require('./complaint');
const { policeStationResolvers } = require('./station');

exports.Mutation = {
  ...authResolvers,
  ...policeStationResolvers,
  ...complaintResolvers,
};
