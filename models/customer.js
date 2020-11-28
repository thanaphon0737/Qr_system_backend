const Sequelize = require("sequelize");
const sequelize = require("./../db_instance");
const order = require('./order')
const customer = sequelize.define(
    "customer",
    {
        table_id:{
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
               model: 'tables', // 'persons' refers to table name
               key: 'id', // 'id' refers to column name in persons table
            }
        },
        customer_name: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        url_image:{
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: "-"
        },
        timestamp_in:{
            type: Sequelize.DATE
        },
        timestamp_out:{
            type: Sequelize.DATE
        }
    },
    {
        // options
    }
);
customer.hasMany(order);


module.exports = customer;