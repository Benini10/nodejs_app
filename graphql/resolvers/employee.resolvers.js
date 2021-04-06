const { Employee, User, Office, Poste } = require("../../models");

module.exports = {
  Query: {
    async employees() {
      return await Employee.findAll();
    },
    async employee(_, { id }) {
      return await Employee.findOne({ where: { id } });
    },
  },
  Mutation: {
    async createEmployee(_, { data }) {
      return await Employee.create({
        ...data,
      });
    },
  },
  Employee: {
    user: async ({ userId }) => {
      return await User.findOne({
        where: { id: userId },
      });
    },
    office: async ({ officeId }) => {
      return await Office.findOne({
        where: { id: officeId },
      });
    },
    poste: async ({ posteId }) => {
      return await Poste.findOne({
        where: { id: posteId },
      });
    },
  },
};
