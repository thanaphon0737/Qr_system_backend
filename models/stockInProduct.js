const Sequelize = require("sequelize");
const sequelize = require("./../db_instance");

const stockInProduct = sequelize.define(
    "stockInProduct",
    {
        product_id:{
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        stockin_id:{
            type: Sequelize.INTEGER,
            allowNull:false
        },
        price:{
            type: Sequelize.DECIMAL,
            allowNull: false
        }
    }
)



module.exports = stockInProduct;