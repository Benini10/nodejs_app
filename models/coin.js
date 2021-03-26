"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Coin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Currency, { foreignKey: "currencyId" });
    }
  }

  Coin.init(
    {
      logo: DataTypes.STRING,
      value: DataTypes.STRING,
      description: DataTypes.STRING,
      status: {
        type: DataTypes.STRING,
        defaultValue: "ACTIVE",
      },
    },
    {
      sequelize,
      modelName: "Coin",
    }
  );

  return Coin;
};
