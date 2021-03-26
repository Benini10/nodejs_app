"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(
        models.Office,
        { through: "OfficeService", foreignKey: "serviceId" },
        { onDelete: "CASCADE" }
      );
    }
  }
  Service.init(
    {
      name: DataTypes.STRING,
      code: DataTypes.STRING,
      description: DataTypes.STRING,
      status: {
        type: DataTypes.STRING,
        defaultValue: "ACTIVE",
      },
    },
    {
      sequelize,
      modelName: "Service",
    }
  );
  return Service;
};
