const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const dbCaller = require("./db_define");
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
    socket.on("initial_data", async () => {
        const getOrder = await require('./api_order').getOrder()
        // console.log(getOrder)
        io.sockets.emit('getData',getOrder)
      });
    socket.on("putOrder", () => {
        io.sockets.emit("changeData");
    });
    
})

server.listen(8081, ()=>{
    console.log("Server is running.. on port 8081")
})

// console.log(__dirname)
//////////////////////////

// console.log(io)



