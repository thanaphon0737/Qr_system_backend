const express = require("express");
const router = express.Router();
const constants = require("./constant");
const order = require("./models/order");
const orderStatus = require('./models/orderStatus')
const orderProduct = require('./models/orderProduct');
const orderProductStatus = require("./models/orderProductStatus");
router.get('/order',async (req,res) => {
    const result = await order.findAll({include:[orderStatus]})
});

router.post('/order', async (req,res) =>{
    try{
        let result = await order.create();
    }catch(e){

    }
})

router.post('/orderStatus', async (req,res) =>{
    
    try{
        let result = await orderStatus.create({
            name:req.body.name,
            note:req.body.note
        });
        res.json(result)
    }catch(e){
        res.status(400).json(e)
    }
})

router.post('/orderProduct', async (req,res) =>{
    try{
        let result = await orderProduct.create({
             order_id: req.body.order_id,
             order_product_status_id: req.body.order_product_status_id,
             order_qty: req.body.order_qty,
             price: req.body.price,
             product_id: req.body.product_id
        });

        res.json({
            result: constants.kResultOk,
            message: result
        })
    }catch(e){
        res.status(400).json(e)
    }
})

router.post('/orderProductStatus', async (req,res) =>{
    
    try{
        let result = await orderProductStatus.create({
            name:req.body.name,
            note:req.body.note
        });
        res.json(result)
    }catch(e){

    }
})


module.exports = router;