const Sequelize = require('sequelize').Sequelize;
const sequelize = require('../utils/database');

const Order = sequelize.define('order', { 
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = Order