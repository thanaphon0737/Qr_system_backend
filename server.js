const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser")
const customer = require('./models/customer')
const discount = require('./models/discount')
const discontCont = require('./models/discountConditional')
const employee = require('./models/employees')
const order = require('./models/order')
const orderProduct = require('./models/orderProduct')
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


customer.sync({ force: false });
discount.sync({ force: false });
discontCont.sync({ force: false });
employee.sync({ force: false });
order.sync({ force: false });
orderProduct.sync({ force: false });
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