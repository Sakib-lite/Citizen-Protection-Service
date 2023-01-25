const { authResolvers } = require('./auth');
const { commentResolvers } = require('./comment');
const { complaintResolvers } = require('./complaint');
const { policeStationResolvers } = require('./station');

exports.Mutation = {
  ...authResolvers,
  ...policeStationResolvers,
  ...complaintResolvers,
  ...commentResolvers,
};
