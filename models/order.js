const Sequelize = require("sequelize");
const sequelize = require("./../db_instance");
const discount = require('./discount');
const discountCont = require("./discountConditional");
const order = sequelize.define(
    "order",
    {
        customer_id:{
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
               model: 'customers', // 'persons' refers to table name
               key: 'id', // 'id' refers to column name in persons table
            }
        },
        discount_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
               model: 'discounts', // 'persons' refers to table name
               key: 'id', // 'id' refers to column name in persons table
            }
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
            references: {
               model: 'orderStatuses', // 'persons' refers to table name
               key: 'id', // 'id' refers to column name in persons table
            }
        },
        note: {
            type: Sequelize.STRING,
        }
    },
    {
        // options
    }
);

order.associate = models =>{
    order.hasMany(models.discount, {
        onDelete: 'cascade'
    });
    order.hasMany(models.orderProduct, {
        onDelete: 'cascade'
    })

}

module.exports = order;