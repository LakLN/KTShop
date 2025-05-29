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
const Wishlist = require("./Wishlist");

// model/index.js

Product.belongsTo(Category, { foreignKey: "category_id", as: "category" });   // alias là 'category'
Product.belongsTo(Brand, { foreignKey: "brand_id", as: "brand" });           // alias là 'brand'
Product.hasMany(Review, { foreignKey: 'product_id', as: 'reviews' });        // alias là 'reviews'

Review.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });      // alias là 'product'
Review.belongsTo(User, { foreignKey: "user_id", as: "user" });               // alias là 'user'
Category.hasMany(Product, { foreignKey: "category_id", as: "products" });    // alias là 'products'
Brand.hasMany(Product, { foreignKey: "brand_id", as: "products" });          // alias là 'products'

Order.belongsTo(User, { as: 'user', foreignKey: 'user_id' });
User.hasMany(Order, { foreignKey: 'user_id', as: 'orders' });


module.exports = {
  sequelize,
  User,
  Admin,
  Brand,
  Category,
  Product,
  Coupon,
  Order,
  Review,
  Wishlist
};
