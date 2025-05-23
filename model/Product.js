const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Product = sequelize.define("Product", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  sku: { type: DataTypes.STRING(100) },
  img: { type: DataTypes.TEXT, allowNull: false },
  title: { type: DataTypes.STRING(200), allowNull: false },
  slug: { type: DataTypes.STRING(255) },
  unit: { type: DataTypes.STRING(100), allowNull: false },
  image_urls: { type: DataTypes.JSON },
  parent: { type: DataTypes.STRING(255), allowNull: false },
  children: { type: DataTypes.STRING(255), allowNull: false },
  price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  discount: { type: DataTypes.DECIMAL(10,2) },
  quantity: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  brand_name: { type: DataTypes.STRING(255), allowNull: false },
  brand_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  category_name: { type: DataTypes.STRING(255), allowNull: false },
  category_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  status: { type: DataTypes.ENUM("in-stock", "out-of-stock", "discontinued"), defaultValue: "in-stock" },
  product_type: { type: DataTypes.STRING(255), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  video_id: { type: DataTypes.STRING(255) },
  additional_information: { type: DataTypes.JSON },
  tags: { type: DataTypes.JSON },
  sizes: { type: DataTypes.JSON },
  offer_start_date: { type: DataTypes.DATE },
  offer_end_date: { type: DataTypes.DATE },
  featured: { type: DataTypes.BOOLEAN, defaultValue: false },
  sell_count: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0 }
}, {
  tableName: "products",
  underscored: true,
  timestamps: true
});

module.exports = Product;
