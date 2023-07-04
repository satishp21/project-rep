const Sequelize = require('sequelize');
const sequelize = require('../util/database');


const Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: Sequelize.INTEGER,
    name: Sequelize.STRING,
    price: Sequelize.INTEGER,
    description: Sequelize.STRING
})

module.exports = Product;