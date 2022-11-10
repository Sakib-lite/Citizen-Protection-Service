const { Query } = require('./Query');
const { Mutation } = require('./Mutations/Mutation');
const { PoliceStation } = require('./PoliceStation');
const { Complaint } = require('./Complaint');
const { User } = require('./User');

exports.resolvers = {
  Query,
  Mutation,
  PoliceStation,
  Complaint,
  User,
};
