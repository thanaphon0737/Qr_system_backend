const Sequelize = require("sequelize");
const sequelize = require("./../db_instance");
const order = require('./order')
const orderStatus = sequelize.define(
    "orderStatus",
    {
        name:{
            type: Sequelize.STRING
        },
        note:{
            type: Sequelize.STRING
        }
    }
)

orderStatus.hasMany(order)

module.exports = orderStatus;