const Sequelize = require("sequelize");
const sequelize = require("./../db_instance");

const discountType = sequelize.define(
    "discountType",
    {
        name:{
            type: Sequelize.STRING
        },
        note: {
            type: Sequelize.STRING
        }
    }
)


module.exports = discountType;