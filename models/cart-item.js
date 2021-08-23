const Sequelize = require('sequelize').Sequelize;
const sequelize = require('../utils/database');

const CartItem = sequelize.define('cartItem', { 
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: Sequelize.INTEGER
});

module.exports = CartItem