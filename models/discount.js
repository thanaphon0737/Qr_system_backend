const Sequelize = require("sequelize");
const sequelize = require("./../db_instance");
const order = require('./order');

const discount = sequelize.define(
    "discount",
    {
        discount_type_id:{
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        discount_code:{
            type: Sequelize.STRING
        },
        discount_remain:{
            type: Sequelize.INTEGER
        },
        discount_amount:{
            type: Sequelize.INTEGER,

        }
    }
)


module.exports = discount;