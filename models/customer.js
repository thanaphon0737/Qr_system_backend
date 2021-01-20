const Sequelize = require("sequelize");
const sequelize = require("./../db_instance");
const order = require('./order')
const customer = sequelize.define(
    "customer",
    {
        
        customer_name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        url_image:{
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: ""
        },
        timestamp_in:{
            type: Sequelize.DATE
        },
        timestamp_out:{
            type: Sequelize.DATE
        },
        total_price:{
            type: Sequelize.DECIMAL,
            allowNull: false,
            defaultValue: 0
        }
    },
    {
        // options
    }
);




module.exports = customer;