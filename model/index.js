//model/index.js
const sequelize = require("../config/db");
const User      = require("./User");
const Admin     = require("./Admin");
const Brand     = require("./Brand");
const Category  = require("./Category");
const Product   = require("./Product");
const Coupon    = require("./Coupon");
const Order     = require("./Order");
const Review    = require("./Review");

Product.belongsTo(Brand,    { foreignKey: "brand_id" });
Product.belongsTo(Category, { foreignKey: "category_id" });

Review.belongsTo(User,      { foreignKey: "user_id" });
Review.belongsTo(Product,   { foreignKey: "product_id" });
Order.belongsTo(User, { as: 'user', foreignKey: 'user_id' });
User.hasMany(Order, { foreignKey: 'user_id' });

Category.hasMany(Product, { foreignKey: "category_id", as: "products" });
Brand.hasMany(Product, { foreignKey: "brand_id" });

module.exports = {
  sequelize,
  User,
  Admin,
  Brand,
  Category,
  Product,
  Coupon,
  Order,
  Review
};
