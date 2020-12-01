const Sequelize = require("sequelize");
const sequelize = require("../db_instance");
const employee = require('./employees')
const role =  sequelize.define(
    "role", {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        note: {
            type: Sequelize.STRING,
            allowNull: true, 
        }
    },{ }
);




module.exports = role;
