const express = require("express");
const app = express();
const cors = require("cors")
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())
app.use(express.static(__dirname + "/uploaded"))

app.use("/api/v2", require("./api"))

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs

app.listen(8081, ()=>{
    console.log("Server is running..")
})
