const express = require("express");
const router = express.Router();
const discountType = require('./models/discountType')
const discount = require('./models/discount')
const constants = require('./constant')
router.get("/discountType", async (req, res) => {
    const result = await discountType.findAll();
    res.json(result);
  });

router.get("/discount", async (req, res) => {
    const result = await discount.findAll();
    res.json(result);
  });

router.post("/discount", async(req, res) =>{
    
    try{
    const result = await discount.create({
        discount_code:req.body.discount_code,
        discount_remain:req.body.discount_remain,
        discount_amount:req.body.discount_amount,
        discount_type_id: req.body.discount_type_id
    })
    res.json({
        result: constants.kResultOk,
        message: JSON.stringify(result)
    })
    }catch(error){
    res.json({ result: constants.kResultNok, message: JSON.stringify(error) });
}

  });

router.post("/discountType", async(req, res) =>{
    const data = {  
        name:req.body.name,
        note:req.body.note
    }

    try{
    const result = await discountType.create(data)
    res.json({
        result: constants.kResultOk,
        message: JSON.stringify(result)
    })
    }catch(error){
    res.json({ result: constants.kResultNok, message: JSON.stringify(error) });
}

  });
module.exports = router;