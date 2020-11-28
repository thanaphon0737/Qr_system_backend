const Sequelize = require("sequelize");
const sequelize = require("./../db_instance");

const stockIn = sequelize.define(
    "stockIn",
    {
        stock_date: {
            type: Sequelize.DATE,

        },
        total_price:{
            type: Sequelize.DECIMAL,
            allowNull:false,
        },
        note:{
            type: Sequelize.STRING
        }
    }
)


module.exports = stockIn;