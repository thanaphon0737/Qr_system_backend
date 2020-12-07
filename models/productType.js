const Sequelize = require("sequelize");
const sequelize = require("./../db_instance");

const productType = sequelize.define(
    "productType",
    {
        name:{
            type: Sequelize.STRING,    
        },
        note:{
            type: Sequelize.STRING,

        }
    }
)




module.exports = productType;