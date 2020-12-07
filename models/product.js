const Sequelize = require("sequelize");
const sequelize = require("./../db_instance");

const product = sequelize.define(
    "product",
    {      
      product_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      product_serving:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      product_image: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "-"
      },
      product_sell_price: {
        type: Sequelize.DECIMAL
        // allowNull defaults to true
      },
      product_buy_price: {
        type: Sequelize.DECIMAL
        // allowNull defaults to true
      },
      product_qty: {
        type: Sequelize.NUMBER
        // allowNull defaults to true
      },
      product_type_id: {
        type: Sequelize.INTEGER,
            allowNull: false,
            
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
