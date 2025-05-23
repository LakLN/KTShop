const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Order = sequelize.define("Order", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  cart: { type: DataTypes.JSON },
  name: { type: DataTypes.STRING(255), allowNull: false },
  address: { type: DataTypes.TEXT, allowNull: false },
  email: { type: DataTypes.STRING(255), allowNull: false },
  contact: { type: DataTypes.STRING(100), allowNull: false },
  city: { type: DataTypes.STRING(100), allowNull: false },
  country: { type: DataTypes.STRING(100), allowNull: false },
  zip_code: { type: DataTypes.STRING(20), allowNull: false },
  sub_total: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  shipping_cost: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  discount: { type: DataTypes.DECIMAL(10,2), allowNull: false, defaultValue: 0 },
  total_amount: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  shipping_option: { type: DataTypes.STRING(255) },
  card_info: { type: DataTypes.JSON },
  payment_intent: { type: DataTypes.JSON },
  payment_method: { type: DataTypes.STRING(100), allowNull: false },
  order_note: { type: DataTypes.TEXT },
  invoice: { type: DataTypes.INTEGER.UNSIGNED, unique: true },
  status: { type: DataTypes.ENUM("pending", "processing", "delivered", "cancel") }
}, {
  tableName: "orders",
  underscored: true,
  timestamps: true
});

module.exports = Order;
