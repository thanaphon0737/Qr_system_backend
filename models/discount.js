const Sequelize = require("sequelize");
const sequelize = require("./../db_instance");
const order = require('./order');

const discount = sequelize.define(
    "discount",
    {

        discount_code:{
            type: Sequelize.STRING
        },
        discount_remain:{
            type: Sequelize.INTEGER
        },
        discount_amount:{
            type: Sequelize.DECIMAL(13,2),
        },
        minimum:{
            type: Sequelize.DECIMAL(13,2)
        }
    }
)


module.exports = discount;