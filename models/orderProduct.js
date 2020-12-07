const Sequelize = require("sequelize");
const sequelize = require("./../db_instance");

const orderProduct = sequelize.define(
    "orderProduct",
    {
        
        
        order_qty: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        price: {
            type: Sequelize.DECIMAL,
            allowNull: false,
            defaultValue: 0
        },
        
    },
    {
        // options
    }
);



module.exports = orderProduct;