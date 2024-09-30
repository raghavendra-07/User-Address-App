const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite' // You can change this for MySQL/Postgres if needed
});

module.exports = sequelize;
