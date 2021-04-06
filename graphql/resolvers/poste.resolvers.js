const { Poste, Employee } = require("../../models");

module.exports = {
  Query: {
    async postes(_, __) {
      return await Poste.findAll();
    },
    async poste(_, { id }) {
      return await Poste.findOne({ where: { id } });
    },
  },
  Mutation: {
    async createPoste(_, { name, status }) {
      const poste = await Poste.findOne({ where: { name } });
      if (poste) {
        throw new UserInputError("This name is already taken !!");
      }

      return await Poste.create({
        name,
        status,
      });
    },
  },
  Poste: {
    employee: async ({ id }) => {
      return await Employee.findOne({
        where: { posteId: id },
      });
    },
  },
};
