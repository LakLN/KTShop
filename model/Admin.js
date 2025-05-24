const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Admin = sequelize.define("Admin", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(255), allowNull: false },
  image: { type: DataTypes.TEXT },
  address: { type: DataTypes.TEXT },
  country: { type: DataTypes.STRING(100) },
  city: { type: DataTypes.STRING(100) },
  email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
  phone: { type: DataTypes.STRING(20) },
  status: { type: DataTypes.ENUM("Active", "Inactive"), defaultValue: "Active" },
  password: { type: DataTypes.STRING(255), allowNull: false },
  role: { type: DataTypes.ENUM("Admin", "Super Admin", "Manager", "CEO"), defaultValue: "Admin" },
  joining_date: { type: DataTypes.DATE },
  confirmation_token: { type: DataTypes.STRING(1024) },
  confirmation_token_expires: { type: DataTypes.DATE }
}, {
  tableName: "admins",
  underscored: true,
  timestamps: true
});

module.exports = Admin;
