const Sequelize = require("sequelize");
const sequelize = require("./../db_instance");
const order = require('./order');

const discount = sequelize.define(
    "discount",
    {
        discount_cont_id:{
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
               model: 'discountConts', // 'persons' refers to table name
               key: 'id', // 'id' refers to column name in persons table
            }
        },
        discount_code:{
            type: Sequelize.STRING
        },
        discount_remain:{
            type: Sequelize.INTEGER
        },
        discount_amount:{
            type: Sequelize.INTEGER,

        }
    }
)

discount.associate = models =>{
    discount.hasMany(models.order, {
        onDelete: 'cascade'
    })
}
module.exports = discount;