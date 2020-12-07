const Sequelize = require("sequelize");
const sequelize = require("./../db_instance");

const stockInProduct = sequelize.define(
    "stockInProduct",
    {
        
        price:{
            type: Sequelize.DECIMAL,
            allowNull: false
        }
    }
)



module.exports = stockInProduct;