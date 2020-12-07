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
        role_id: {
            type: Sequelize.INTEGER,
            allowNull: false
         },
        first_name:{
            type: Sequelize.STRING,
        },
        last_name:{
            type:Sequelize.STRING,
        },
        contact:{
            type: Sequelize.STRING
        }

    },{ }
);


module.exports = employee;
