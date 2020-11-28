const Sequelize = require("sequelize");
const sequelize = require("../db_instance");

const role =  sequelize.define(
    "role", {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        note: {
            type: Sequelize.STRING,
            allowNull: true, 
        }
    },{ }
);

role.associate = models =>{
    role.hasMany(models.employees, {
        onDelete: 'cascade'
    })
}


module.exports = role;
