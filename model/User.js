const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(100), allowNull: false },
  email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
  password: { type: DataTypes.STRING(255) },
  role: { type: DataTypes.ENUM("user", "admin"), defaultValue: "user" },
  contact_number: { type: DataTypes.STRING(20) },
  shipping_address: { type: DataTypes.TEXT },
  image_url: { type: DataTypes.STRING(255) },
  phone: { type: DataTypes.STRING(20) },
  address: { type: DataTypes.TEXT },
  bio: { type: DataTypes.TEXT },
  status: { type: DataTypes.ENUM("active", "inactive", "blocked"), defaultValue: "inactive" },
  confirmation_token: { type: DataTypes.STRING(255) },
  confirmation_token_expires: { type: DataTypes.DATE },
  password_changed_at: { type: DataTypes.DATE },
  password_reset_token: { type: DataTypes.STRING(255) },
  password_reset_expires: { type: DataTypes.DATE }
}, {
  tableName: "users",
  underscored: true,
  timestamps: true
});

module.exports = User;
