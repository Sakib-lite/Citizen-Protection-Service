const { Query } = require('./Query');
const { Mutation } = require('./Mutations/Mutation');
const { PoliceStation } = require('./PoliceStation');
const { Complaint } = require('./Complaint');
const { ComplaintFilter } = require('./ComplaintFilter');
const { User } = require('./User');
const { Comment } = require('./Comment');

exports.resolvers = {
  Query,
  Mutation,
  PoliceStation,
  Complaint,
  User,
  Comment,
  ComplaintFilter
};
