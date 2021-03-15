const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const dbCaller = require("./db_define");
const table = require("./models/table");
const server = require('http').Server(app);
const ip = '192.168.1.22';
const ip2 = '10.80.87.201';
const ipglobal = ip;
const io = require('socket.io')(server, {
  cors: {
    origin: `http://${ipglobal}:80`,
    methods: ["GET", "POST"]
  }
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + "/uploaded"));
const nodeEnv = process.env.NODE_ENV || 'development'
app.get('/', (req, res) => {
    res.json({'Hello world':1,nodeEnv});
})



app.use("/api/v2", require("./api"))


io.on("connection", socket => {
  // console.log("connected by " + socket.id);
  socket.on("initial_data_acc", async () => {
    const getOrder = await require('./api_order').getOrder()

    io.sockets.emit('getDataAcc', getOrder)
  });
  socket.on("putOrder", () => {
    io.sockets.emit("changeData");
  });

  socket.on("initial_data_chef", async () => {
    const getOrderProduct = await require('./api_order').getOrderProduct()

    io.sockets.emit('getDataChef', getOrderProduct)
  });

  socket.on("initial_data_customer", async (data_from_client) => {
    const getOrderProduct = await require('./api_order').getOrderProductByCustomerId(data_from_client.id)
    let label = {customer_id_from_page:data_from_client.id}
    let data = {data: getOrderProduct}
    var packet = Object.assign({}, label, data);
    io.sockets.emit('getDataCustomer', packet)
  });
  socket.on("accept_order", async (data) => {
    const { id, status_id,cookedBy,order_qty } = data
    const updateResult = await require('./api_order').changeOrderProductStatus(id, status_id,cookedBy,order_qty)
    io.sockets.emit("changeData");
  })

  socket.on("payOrder", ()=>{
    io.sockets.emit("changeData")
  })

  socket.on("initial_data_cashier", async () => {
    const getCustomer = await require('./api_customer').getCustomerAll()
    
    io.sockets.emit('getData', getCustomer)
  });
  
  socket.on("initial_data_cashier_qr", async (id) =>{
    const getCustomerHasTable = await require('./api_customer').getCustomerTableById(id.id)
    io.sockets.emit('getDataQr', getCustomerHasTable)
  })
  socket.on("add_customer", async data =>{
    const {customer_name, table_id} = data
    try{

      const addedCustomer = await require('./api_customer').addCustomer(customer_name,table_id)
    }catch(err){
      io.sockets.emit("throwError unique name")
    }
    //just wait 1 sed for see loading page
    setTimeout(()=>{
      io.sockets.emit("changeData")
      io.sockets.emit("changeDataQr")
    }, 200)
    
  })


})

server.listen(8081, () => {
  console.log("Server is running.. on port 8081")
})




