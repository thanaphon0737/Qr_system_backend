const express = require("express");
const router = express.Router();
const constants = require("./constant");
const order = require("./models/order");
const orderStatus = require('./models/orderStatus')
const orderProduct = require('./models/orderProduct');
const orderProductStatus = require("./models/orderProductStatus");
const product = require("./models/product");
const sequelize = require("./db_instance");
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
        }, {returning: true});
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
    console.log(req.body)
    try{
        //check if out of stock
        let collect_error = []
        for(let i =0 ; i<req.body.data.length; i++){
            let productPrice = await product.findOne({where:{id:req.body.data[i].product_id}})
            let pre_qty = productPrice.product_qty
            if(pre_qty-req.body.data[i].order_qty < 0){
                const outStockError = {
                    product_name:productPrice.product_name,
                    message: `stock have ${req.body.data[i].order_qty}/${pre_qty}`
                }
                collect_error.push(outStockError)
            }
        }
        if(collect_error.length <= 0){
            //create order header
            let createdOrder = await order.create({
                order_date: Date.now(),
                total_price: 0,
                note: "",
                customer_id: req.body.createOrder.customer_id, // {createOrder}
                order_status_id:req.body.createOrder.order_status_id,//
                discount_id: null
            }, {returning: true});

            console.log('Order',createdOrder.id)

            for(let i =0; i<req.body.data.length; i++){
                let productPrice = await product.findOne({where:{id:req.body.data[i].product_id}})
                let pre_qty = productPrice.product_qty
                await product.update({product_qty:pre_qty-req.body.data[i].order_qty},{where:{id:req.body.data[i].product_id}})
                const result = await orderProduct.create({
                     order_id: createdOrder.id,
                     order_product_status_id: req.body.data[i].order_product_status_id,
                     order_qty: req.body.data[i].order_qty,
                     price: productPrice.product_sell_price,
                     product_id: req.body.data[i].product_id
                });
                results.push(result)
            }
            totalPrice = await sequelize.query(`SELECT sum(price*order_qty) as sum_price from orderproducts`);
            let updateTotal = await order.update({total_price:totalPrice[0][0].sum_price},{where:{id:createdOrder.id}})
    
    
            res.json({
                result: constants.kResultOk,
                message: results
            })
        }else {
            e_obj = {status:'out of stock', collect_error}
            throw JSON.stringify(e_obj)
        }
        
    }catch(e){
        console.log(e)
        res.json(e)
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
        datas.push(data)    
        }
        
        res.json(datas)
    }catch(e){
        res.status(400).json(e)
    }
})
module.exports = router;