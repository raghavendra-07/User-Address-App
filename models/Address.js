const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

const Address = sequelize.define('Address', {
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

// Create relationships
User.hasMany(Address, { foreignKey: 'userId' });
Address.belongsTo(User, { foreignKey: 'userId' });

module.exports = Address;
