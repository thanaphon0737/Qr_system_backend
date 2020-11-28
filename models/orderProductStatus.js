const Sequelize = require("sequelize");
const sequelize = require("./../db_instance");

const orderProductStatus = sequelize.define(
    "orderProductStatus",
    {
        name:{
            type: Sequelize.STRING,
        },
        note:{
            type: Sequelize.STRING,
        }
    }
)



module.exports = orderProductStatus;