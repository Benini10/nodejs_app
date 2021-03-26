"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Currency extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.Banknote, { foreignKey: "currencyId" });
      this.hasOne(models.Coin, { foreignKey: "currencyId" });
    }
  }

  Currency.init(
    {
      name: DataTypes.STRING,
      code: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      description: DataTypes.STRING,
      status: {
        type: DataTypes.STRING,
        defaultValue: "ACTIVE",
      },
    },
    {
      sequelize,
      modelName: "Currency",
    }
  );

  return Currency;
};
