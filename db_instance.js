const Sequelize = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: false
});
// const {customerTable, roleEmployee,customerOrder,orderStatusOrder,
//   orderToOrderProduct,discountOrder,discountTypeTodiscount,orderProductStatusToOrderProduct
//   ,productToOrderProduct, productTypeToProduct,productTostockInProduct,stockInTostockInProduct} = require('./relation')
// const db = [
// 	  require('./models/customer'),
//     require('./models/discount'),
//     require('./models/discountType'),
//     require('./models/employees'),
//     require('./models/order'),
//     require('./models/orderProduct'),
//     require('./models/orderStatus'),
//     require('./models/product'),
//     require('./models/productType'),
//     require('./models/roles'),
//     require('./models/stockIn'),
//     require('./models/stockInProduct'),
//     require('./models/table')

// ]

// We execute any extra setup after the models are defined, such as adding associations.
// customerTable(sequelize);
// roleEmployee(sequelize);
// customerOrder(sequelize);
// orderStatusOrder(sequelize);
// orderToOrderProduct(sequelize);
// discountOrder(sequelize);
// discountTypeTodiscount(sequelize);
// orderProductStatusToOrderProduct(sequelize);
// productToOrderProduct(sequelize);
// productTypeToProduct(sequelize);
// productTostockInProduct(sequelize);
// stockInTostockInProduct(sequelize);
(async () => {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
})();

module.exports = sequelize;