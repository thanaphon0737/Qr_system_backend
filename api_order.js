const express = require("express");
const router = express.Router();
const constants = require("./constant");
const order = require("./models/order");
const orderStatus = require('./models/orderStatus')
const orderProduct = require('./models/orderProduct');
const orderProductStatus = require("./models/orderProductStatus");
const product = require("./models/product");
router.get('/order',async (req,res) => {
    const result = await order.findAll({include:[orderStatus]})
    res.json(result)
});

router.post('/order', async (req,res) =>{
    try{
        let result = await order.create({
            order_date: Date.now(),
            total_price: 0,
            note: "",
            customer_id: req.body.customer_id,
            order_status_id:req.body.order_status_id,
            discount_id: null
        });
        res.json(result)
    }catch(e){
        res.status(400).json(e)
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
    let results = [];
    console.log(req.body.data.length)
    try{
        let totalPrice =0;
        for(let i =0; i<req.body.data.length; i++){
            let productPrice = await product.findOne({where:{id:req.body.data[i].product_id}})
            
            totalPrice += productPrice.product_sell_price;
            const result = await orderProduct.create({
                 order_id: req.body.data[0].order_id,
                 order_product_status_id: req.body.data[i].order_product_status_id,
                 order_qty: req.body.data[i].order_qty,
                 price: productPrice.product_sell_price,
                 product_id: req.body.data[i].product_id
            });
            results.push(result)
        }
        let updateTotal = await order.update({total_price:totalPrice},{where:{id:req.body.data[0].order_id}})


        res.json({
            result: constants.kResultOk,
            message: results
        })
    }catch(e){
        res.status(400).end(e)
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
        res.status(400).json(e)
    }
})

router.get('/orderProduct/order-id/:id',async (req, res) =>{
    try{

        let result = await orderProduct.findAll({where:{order_id:req.params.id}});
        // console.log(result)
        let datas = [];
        for(let i =0; i< result.length;i++){
        let statusName = await orderProductStatus.findOne({where:{id:result[i].order_product_status_id}});
        let productName = await product.findOne({where:{id:result[i].product_id}})
        // console.log(productName)
        
        let data = {
                product_id: result[i].product_id,
                product_name: productName.product_name,
                order_qty: result[i].order_qty,
                product_status_name: statusName.name,
                price: result[i].price
            }
        console.log(data)
        datas.push(data)    
        }
        
        res.json(datas)
    }catch(e){
        res.status(400).json(e)
    }
})
module.exports = router;