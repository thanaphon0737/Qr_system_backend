const Sequelize = require("sequelize");
const sequelize = require("./../db_instance");
const discount = require('./discount');

const order = sequelize.define(
    "order",
    {
        order_date: {
            type: Sequelize.DATE,
            
        },
        total_price: {
            type: Sequelize.DECIMAL(13,2),
        
            defaultValue: 0
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