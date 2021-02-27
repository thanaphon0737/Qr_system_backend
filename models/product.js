const Sequelize = require("sequelize");
const sequelize = require("./../db_instance");

const product = sequelize.define(
    "product",
    {      
      product_name: {
        type: Sequelize.STRING,
        unique: true
      },
      product_serving:{
        type: Sequelize.INTEGER,
        defaultValue: 0
        
      },
      product_image: {
        type: Sequelize.STRING,
        defaultValue: "-"
      },
      product_sell_price: {
        type: Sequelize.DECIMAL(13,2),
        defaultValue: 0
        // allowNull defaults to true
      },
      product_buy_price: {
        type: Sequelize.DECIMAL(13,2),
        defaultValue: 0
        // allowNull defaults to true
      },
      product_qty: {
        type: Sequelize.INTEGER,
        defaultValue: 0
        // allowNull defaults to true
      },
      product_limit_time:{
        type: Sequelize.INTEGER,
        defaultValue:0
      },
      note:{
        type: Sequelize.STRING
      }
    },
    {
      // options
    }
  );





module.exports = product;
