const Sequelize = require("sequelize");
const sequelize = require("../db_instance");
const role = require('./roles')
const employee =  sequelize.define(
    "employee", {
        username: {
            type: Sequelize.STRING,
            unique:true
        },
        password: {
            type: Sequelize.STRING,
        },
        
        first_name:{
            type: Sequelize.STRING,
        },
        last_name:{
            type:Sequelize.STRING,
        },
        contact:{
            type: Sequelize.STRING
        },
        salary: {
            type: Sequelize.DECIMAL(13,2),
            allowNull: false,
            defaultValue: 0
        },

    },{ }
);


module.exports = employee;
