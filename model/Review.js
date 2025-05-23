const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Review = sequelize.define("Review", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  product_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  rating: { type: DataTypes.TINYINT.UNSIGNED, allowNull: false },
  comment: { type: DataTypes.TEXT }
}, {
  tableName: "reviews",
  underscored: true,
  timestamps: true
});

module.exports = Review;
  