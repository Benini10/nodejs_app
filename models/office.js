"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Office extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Company, { foreignKey: "companyId" });
      this.belongsToMany(
        models.Service,
        { through: "OfficeService", foreignKey: "officeId" },
        { onDelete: "CASCADE" }
      );
    }
  }
  Office.init(
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      status: {
        type: DataTypes.STRING,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "Office",
    }
  );

  return Office;
};
