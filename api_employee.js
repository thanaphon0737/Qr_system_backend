const express = require("express");
const router = express.Router();
const employee = require("./models/employees");
const role = require("./models/roles");
const constants = require("./constant");
const Sequelize = require("sequelize");
router.get("/employee", async (req, res) => {
    const result = await employee.findAll();
    res.json(result);
});

router.get("/role", async (req,res) => {
    const result = await role.findAll();
    res.json(result);
})

router.post("/role", async (req, res) => {
    
    try {
        
        const result = await role.create({name:req.body.name});
        
        
        console.log(result)
        res.json({ result: constants.kResultOk, message: JSON.stringify(result) });
        
    } catch (error) {
        console.log(error)
        res.json({ result: constants.kResultNok, message: JSON.stringify(error) });
    }
});
module.exports = router;