const Sequelize = require("sequelize");
const sequelize = require("./../db_instance");
const discount = require('./discount')
const discountCont = sequelize.define(
    "discountCont",
    {
        name:{
            type: Sequelize.STRING
        },
        note: {
            type: Sequelize.STRING
        }
    }
)

discountCont.hasMany(discount)
module.exports = discountCont;