"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Fund extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Office, { foreignKey: "officeId" });
      this.belongsTo(models.User, { foreignKey: "userId" });
      this.belongsTo(models.Currency, { foreignKey: "currencyId" });
    }
  }
  Fund.init(
    {
      code: DataTypes.STRING,
      description: DataTypes.STRING,
      amount: DataTypes.DECIMAL,
      status: {
        type: DataTypes.STRING,
        defaultValue: "ACTIVE",
      },
    },
    {
      sequelize,
      modelName: "Fund",
    }
  );
  return Fund;
};
