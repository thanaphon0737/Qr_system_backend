const express = require("express");
const router = express.Router();
const customer = require("./models/customer");
const constants = require("./constant");
const Sequelize = require("sequelize");
router.get("/customer", async (req, res) => {
    const result = await customer.findAll();
    res.json(result);
});


router.post("/customer", async (req, res) => {
    
    try {
        
        const result = await customer.create({name:req.body.name});
        
        
        console.log(result)
        res.json({ result: constants.kResultOk, message: JSON.stringify(result) });
        
    } catch (error) {
        console.log(error)
        res.json({ result: constants.kResultNok, message: JSON.stringify(error) });
    }
});

router.get('/customer/:id', (req,res)=> {
    res.end(`this is table${req.params.id}`);
})
module.exports = router;