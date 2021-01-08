const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const dbCaller = require("./db_define");
const { stat } = require("fs");
const server = require('http').Server(app);

const io = require('socket.io')(server, {
        cors: {
          origin: "http://192.168.1.22:8080",
          methods: ["GET", "POST"]
        }
});
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + "/uploaded"));
app.get('/', (req,res)=>{
    res.send('Hello world');
})

app.use("/api/v2", require("./api"))

io.on("connection", socket =>{
    console.log("connected by " + socket.id);
    socket.on("initial_data_acc", async () => {
        const getOrder = await require('./api_order').getOrder()
        
        io.sockets.emit('getData',getOrder)
      });
    socket.on("putOrder", () => {
        io.sockets.emit("changeData");
    });

    socket.on("initial_data_chef", async () => {
        const getOrderProduct = await require('./api_order').getOrderProduct()
        
        io.sockets.emit('getData',getOrderProduct)
      });
    socket.on("accept_order", async (data) =>{
        const {id,status_id} = data
        const updateResult = await require('./api_order').changeOrderProductStatus(id,status_id)
        io.sockets.emit("changeData");
    })
    
})

server.listen(8081, ()=>{
    console.log("Server is running.. on port 8081")
})

// console.log(__dirname)
//////////////////////////

// console.log(io)



