"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      this.hasMany(models.User, {
        onDelete: "CASCADE",
        foreignKey: "roleId",
      });
      this.hasOne(models.Employee, {
        onDelete: "CASCADE",
        foreignKey: "userId",
      });
    }
  }
  Role.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Role",
    }
  );
  return Role;
};
