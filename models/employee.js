"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        onDelete: "CASCADE",
        foreignKey: "userId",
      });

      this.belongsTo(models.Poste, {
        onDelete: "CASCADE",
        foreignKey: "posteId",
      });
    }
  }
  Employee.init(
    {
      name: DataTypes.STRING,
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Employee",
    }
  );
  return Employee;
};
