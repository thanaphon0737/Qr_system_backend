const Sequelize = require("sequelize");
const sequelize = require("./../db_instance");
const order = require('./order')
const customer = sequelize.define(
    "customer",
    {
        table_id:{
            type: Sequelize.INTEGER,
            allowNull: false,
            
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



module.exports = customer;