const Sequelize = require("sequelize");
const sequelize = require("../db_instance");
const role = require('./roles')
const employee =  sequelize.define(
    "employee", {
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique:true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,  
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
            type: Sequelize.DECIMAL,
            allowNull: false,
            defaultValue: 0
        },

    },{ }
);


module.exports = employee;
