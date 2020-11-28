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



productType.associate = models =>{
    productType.hasMany(models.product, {
        onDelete: 'cascade'
    })
}

module.exports = productType;