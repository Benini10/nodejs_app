const { Coin, Currency } = require("../../models");

module.exports = {
  Query: {
    async getCoins() {
      return await Coin.findAll();
    },
    async getCoin(_, { id }) {
      return await Coin.findByPk(id);
    },
  },
  Mutation: {
    async createCoin(_, { data }) {
      const coin = await Coin.create({
        ...data,
      });
      return coin;
    },
    async editCoin(_, { coinId, data }) {
      const coin = await Coin.findByPk(coinId);
      if (!coin) {
        throw new Error("Coin does not exist");
      }
      return coin.update({ ...data });
    },
  },
  Coin: {
    async currency({ currencyId: id }) {
      return Currency.findByPk(id);
    },
  },
};
