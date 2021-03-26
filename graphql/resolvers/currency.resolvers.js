const { Currency } = require("../../models");

module.exports = {
  Query: {
    async getCurrencies() {
      return await Currency.findAll();
    },
    async getOneCurrency(_, { id }) {
      return await Currency.findByPk(id);
    },
  },
  Mutation: {
    async createCurrency(_, { data }) {
      const currency = await Currency.create({
        ...data,
      });
      return currency;
    },
    async editCurrency(_, { currencyId, data }) {
      const currency = await Currency.findByPk(currencyId);
      if (!currency) {
        throw new Error("Currency does not exist");
      }
      return currency.update({ ...data });
    },
  },
};
