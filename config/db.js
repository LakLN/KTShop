// config/db.js 
const { Sequelize } = require('sequelize');
const { secret } = require('../config/secret'); // hoặc require('./secret')

const sequelize = new Sequelize(secret.db_url, {
  dialect: 'mysql',
  logging: false,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false
    }
  }
});

module.exports = sequelize;
