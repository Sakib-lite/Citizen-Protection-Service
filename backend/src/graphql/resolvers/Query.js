const users = [
  { name: 'John', number: 4687987, password: 'kljhpkjh' },
  { name: 'Max', number: 468794487, password: 'kljhpkjh' },
];

exports.Query = {
  users: async (parent, { credentials, name }, { models }) => {
    const { User } = models;
    return await User.find({});
  },
};
