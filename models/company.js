"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Office, {
        foreignKey: "companyId",
      });
    }
  }

  Company.init(
    {
      name: DataTypes.STRING,
      logo: DataTypes.STRING,
      slogan: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      status: {
        type: DataTypes.STRING,
        defaultValue: "ACTIVE",
      },
    },
    {
      sequelize,
      modelName: "Company",
    }
  );

  return Company;
};
