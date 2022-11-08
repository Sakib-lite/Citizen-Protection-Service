const { authResolvers } = require('./auth');
const { complaintResolvers } = require('./complain');
const { policeStationResolvers } = require('./station');

exports.Mutation = {
  ...authResolvers,
  ...policeStationResolvers,
  ...complaintResolvers,
};
