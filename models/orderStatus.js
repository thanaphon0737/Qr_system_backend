const Sequelize = require("sequelize");
const sequelize = require("./../db_instance");

const orderStatus = sequelize.define(
    "orderStatus",
    {
        name:{
            type: Sequelize.STRING
        },
        note:{
            type: Sequelize.STRING
        }
    }
)



module.exports = orderStatus;