const Sequelize = require("sequelize");
const sequelize = require("./../db_instance");

const orderProduct = sequelize.define(
    "orderProduct",
    {
        order_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
               model: 'orders', // 'persons' refers to table name
               key: 'id', // 'id' refers to column name in persons table
            }
        },
        Product_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
               model: 'products', // 'persons' refers to table name
               key: 'id', // 'id' refers to column name in persons table
            }
        },
        order_qty: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        order_product_status_id:{
            type: Sequelize.INTEGER,
            allowNull:false
        }
    },
    {
        // options
    }
);



module.exports = orderProduct;