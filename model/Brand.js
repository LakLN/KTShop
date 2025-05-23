const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Brand = sequelize.define("Brand", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  logo: { type: DataTypes.TEXT },
  name: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  description: { type: DataTypes.TEXT },
  email: { type: DataTypes.STRING(255) },
  website: { type: DataTypes.STRING(255) },
  location: { type: DataTypes.STRING(255) },
  status: { type: DataTypes.ENUM("active", "inactive"), defaultValue: "active" }
}, {
  tableName: "brands",
  underscored: true,
  timestamps: true
});

module.exports = Brand;
