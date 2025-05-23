const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Category = sequelize.define("Category", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  img: { type: DataTypes.TEXT },
  parent: { type: DataTypes.STRING(255), allowNull: false, unique: true },
  children: { type: DataTypes.JSON },
  product_type: { type: DataTypes.STRING(255), allowNull: false },
  description: { type: DataTypes.TEXT },
  status: { type: DataTypes.ENUM("Show", "Hide"), defaultValue: "Show" }
}, {
  tableName: "categories",
  underscored: true,
  timestamps: true
});

module.exports = Category;
