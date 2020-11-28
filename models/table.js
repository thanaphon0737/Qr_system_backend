const Sequelize = require("sequelize");
const sequelize = require("../db_instance");
const customer = require('./customer')
const table = sequelize.define(
    "table",
    {
        capacity:{
            type: Sequelize.INTEGER
        }
    }
)

table.hasMany(customer)

module.exports = table;