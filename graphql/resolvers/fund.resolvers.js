const { Currency, User, Office } = require("../../models");

module.exports = {
  Query: {
    async funds(_, __, context) {
      console.log(context.body.query);
      return await Fund.findAll();
    },
    async fund(_, { id }) {
      return await Fund.findOne({ where: { id } });
    },
  },
  Mutation: {
    async createFund(_, { data }) {
      return await Fund.create({
        ...data,
      });
    },
  },
  Fund: {
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
    currency: async ({ currencyId }) => {
      return await Currency.findOne({
        where: { id: currencyId },
      });
    },
  },
};
