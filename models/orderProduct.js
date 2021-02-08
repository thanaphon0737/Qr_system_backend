const Sequelize = require("sequelize");
const sequelize = require("./../db_instance");

const orderProduct = sequelize.define(
    "orderProduct",
    {
        
        
        order_qty: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        price: {
            type: Sequelize.DECIMAL(13,2),
            defaultValue: 0
        },
        cookedBy: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
    },
    {
        // options
    }
);



module.exports = orderProduct;