const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser")
const customer = require('./models/customer')
const discount = require('./models/discount')
const discountType = require('./models/discountType')
const employee = require('./models/employees')
const order = require('./models/order')
const orderProduct = require('./models/orderProduct')
const orderProductStatus = require('./models/orderProductStatus')
const orderStatus = require('./models/orderStatus')
const product = require('./models/product')
const productType = require('./models/productType')
const role = require('./models/roles')
const stockIn = require('./models/stockIn')
const stockInProduct = require('./models/stockInProduct')
const table = require('./models/table')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())
app.use(express.static(__dirname + "/uploaded"))

app.use("/api/v2", require("./api"))

// console.log(__dirname)
//////////////////////////
table.hasOne(customer,{foreignKey:'table_id'});
customer.belongsTo(table,{foreignKey:'table_id'});
role.hasMany(employee, {foreignKey:'role_id'});
employee.belongsTo(role, {foreignKey:'role_id'});
customer.hasMany(order, {foreignKey:'customer_id'});
order.belongsTo(customer,{foreignKey:'customer_id'});
orderStatus.hasMany(order, {foreignKey:'order_status_id'});
order.belongsTo(orderStatus, {foreignKey:'order_status_id'});
order.hasMany(orderProduct, {foreignKey:'order_id'});
orderProduct.belongsTo(order,{foreignKey:'order_id'});
discount.hasMany(order, {foreignKey:'discount_id'});
order.belongsTo(discount, {foreignKey:'discount_id'});
discountType.hasMany(discount, {foreignKey:'discount_type_id'});
discount.belongsTo(discountType, {foreignKey:'discount_type_id'});
orderProductStatus.hasMany(orderProduct, {foreignKey:'order_product_status_id'});
orderProduct.belongsTo(orderProductStatus, {foreignKey:'order_product_status_id'});
product.hasMany(orderProduct, {foreignKey:'product_id'});
orderProduct.belongsTo(product, {foreignKey:'product_id'});
productType.hasMany(product, {foreignKey:'product_type_id'});
product.belongsTo(productType, {foreignKey:'product_type_id'});
product.hasMany(stockInProduct, {foreignKey:'product_id'});
stockInProduct.belongsTo(product, {foreignKey:'product_id'});
stockIn.hasMany(stockInProduct, {foreignKey:'stockin_id'});
stockInProduct.belongsTo(stockIn, {foreignKey:'stockin_id'});
    //////////////////////////

customer.sync({ force: false });
discount.sync({ force: false });
discountType.sync({ force: false });
employee.sync({ force: false });
order.sync({ force: false });
orderProduct.sync({ force: false });
orderProductStatus.sync({ force: false})
orderStatus.sync({ force: false });
product.sync({ force: false });
productType.sync({ force: false });
role.sync({ force: false });
stockIn.sync({ force: false });
stockInProduct.sync({ force: false });
table.sync({ force: false });



app.listen(8081, ()=>{
    console.log("Server is running..")
})