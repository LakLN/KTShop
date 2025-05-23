const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Coupon = sequelize.define("Coupon", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING(255), allowNull: false },
  logo: { type: DataTypes.TEXT, allowNull: false },
  coupon_code: { type: DataTypes.STRING(100), allowNull: false },
  start_time: { type: DataTypes.DATE },
  end_time: { type: DataTypes.DATE, allowNull: false },
  discount_percentage: { type: DataTypes.DECIMAL(5,2), allowNull: false },
  minimum_amount: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  product_type: { type: DataTypes.STRING(255), allowNull: false },
  status: { type: DataTypes.ENUM("active", "inactive"), defaultValue: "active" }
}, {
  tableName: "coupons",
  underscored: true,
  timestamps: true
});

module.exports = Coupon;
