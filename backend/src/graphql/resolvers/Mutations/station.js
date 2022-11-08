
const Error = (msg) => {
  return {
    userErrors: [
      {
        message: msg,
      },
    ],
    policeStation: null,
  };
};

exports.policeStationResolvers = {
  policeStationCreate: async (_, { input, location }, { models }) => {
    try {
      const { PoliceStation } = models;

      const { name, address, description, number, street, postalCode } = input;
      console.log(name, address, description, number, street, postalCode,location);

      if (
        !name ||
        !address ||
        !description ||
        !number ||
        !street ||
        !postalCode ||
        !location
      )
        return Error('pLease fill up all the fields');

      const policeStation = await PoliceStation.create({
        name,
        address,
        description,
        number,
        street,
        postalCode,
        location,
      });

      if (!policeStation) return Error('Something went wrong');
      return {
        userErrors: [],
        policeStation,
      };
    } catch (e) {
      console.log(e);
    }
  },
};
