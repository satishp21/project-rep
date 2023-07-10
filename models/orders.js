const Sequelize = require('sequelize');
const sequelize = require('../util/database');


const Order = sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    productid: Sequelize.STRING,
    productname: Sequelize.STRING,
    productqty: Sequelize.INTEGER,
    price: Sequelize.INTEGER,
})

module.exports = Order;