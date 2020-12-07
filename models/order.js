const Sequelize = require("sequelize");
const sequelize = require("./../db_instance");
const discount = require('./discount');

const order = sequelize.define(
    "order",
    {
        customer_id:{
            type: Sequelize.INTEGER,
            allowNull: false,
            
        },
        discount_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            
        },
        order_date: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        total_price: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: "-"
        },
        order_status_id:{
            type: Sequelize.INTEGER,
            allowNull: false,
            
        },
        note: {
            type: Sequelize.STRING,
        }
    },
    {
        // options
    }
);



module.exports = order;