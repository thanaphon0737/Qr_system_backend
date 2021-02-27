const express = require("express");
const router = express.Router();
const constants = require("./constant");
const order = require("./models/order");
const orderStatus = require('./models/orderStatus')
const orderProduct = require('./models/orderProduct');
const orderProductStatus = require("./models/orderProductStatus");
const product = require("./models/product");
const sequelize = require("./db_instance");
const customer = require("./models/customer")


async function getOrder() {
    return new Promise(async function (data, err) {
        try {
            const result = await order.findAll({ include: [orderStatus] })
            data(result)
        } catch (err) {
            err(err)
        }

    })

}

async function getOrderProduct() {
    return new Promise(async function (data, err) {
        try {
            const result = await orderProduct.findAll({ include: [product, orderProductStatus, order] })
            data(result)
        } catch (err) {
            console.log(err)
        }

    })

}

function changeOrderProductStatus(id, status_id,cookedBy,order_qty) {
    return new Promise(async function (resolve, reject) {
        try {
            let result = null;
            console.log("orderqty",order_qty)
            if(status_id === 999){

                let findproduct = await orderProduct.findOne({where:{id}})
                let productObject = await product.findOne({where:{id:findproduct.product_id}})
                await product.update({product_qty:productObject.product_qty + order_qty},{where:{id:findproduct.product_id}})
            }
            if(cookedBy === undefined){

               result = await orderProduct.update({ order_product_status_id: status_id }, { where: { id: id } })
            }else{
               result = await orderProduct.update({ order_product_status_id: status_id,cookedBy }, { where: { id: id } })
            }
            resolve(result)
        } catch (err) {
            console.log(err)
        }
    })
}

router.put('/orderProductStatus', async (req, res) => {
    const id = req.body.id
    const status_id = req.body.status_id
    const result = await changeOrderProductStatus(id, status_id)
    res.json({
        result: constants.kResultOk,
        message: result
    })

})
router.get('/order', async (req, res) => {
    const result = await getOrder();
    res.json(result)
});

router.get('/orderProduct', async (req, res) => {
    const result = await getOrderProduct();
    res.json(result)
});
router.post('/order', async (req, res) => {
    try {
        let result = await order.create({
            order_date: Date.now(),
            total_price: 0,
            note: "",
            customer_id: req.body.customer_id,
            order_status_id: req.body.order_status_id,
            discount_id: null
        }, { returning: true });
        res.json(result)
    } catch (e) {
        res.status(400).json(e)
    }
})

router.post('/orderStatus', async (req, res) => {

    try {
        let result = await orderStatus.create({
            name: req.body.name,
            note: req.body.note
        });
        res.json(result)
    } catch (e) {
        res.status(400).json(e)
    }
})

router.post('/orderProduct', async (req, res) => {
    let results = [];
    // console.log(req.body)
    try {
        //check if out of stock
        let collect_error = []
        for (let i = 0; i < req.body.data.length; i++) {
            let productPrice = await product.findOne({ where: { id: req.body.data[i].product_id } })
            let pre_qty = productPrice.product_qty
            if (pre_qty - req.body.data[i].order_qty < 0) {
                const outStockError = {
                    product_name: productPrice.product_name,
                    message: `stock have ${req.body.data[i].order_qty}/${pre_qty}`
                }
                collect_error.push(outStockError)
            }
        }
        if (collect_error.length <= 0) {
            //create order header
            let createdOrder = await order.create({
                order_date: Date.now(),
                total_price: 0,
                note: "",
                customer_id: req.body.createOrder.customer_id, // {createOrder}
                order_status_id: req.body.createOrder.order_status_id,//
                discount_id: null
            }, { returning: true });

            // console.log('Order',createdOrder.id)

            for (let i = 0; i < req.body.data.length; i++) {
                let productPrice = await product.findOne({ where: { id: req.body.data[i].product_id } })
                let pre_qty = productPrice.product_qty
                await product.update({ product_qty: pre_qty - req.body.data[i].order_qty }, { where: { id: req.body.data[i].product_id } })
                const result = await orderProduct.create({
                    order_id: createdOrder.id,
                    order_product_status_id: req.body.data[i].order_product_status_id,
                    order_qty: req.body.data[i].order_qty,
                    price: productPrice.product_sell_price,
                    product_id: req.body.data[i].product_id
                });
                results.push(result)
            }
            totalPrice = await sequelize.query(`SELECT sum(price*order_qty) as sum_price from orderproducts where order_id = ${createdOrder.id}`);
            let updateTotal = await order.update({ total_price: totalPrice[0][0].sum_price }, { where: { id: createdOrder.id } })


            res.json({
                result: constants.kResultOk,
                message: results
            })
        } else {
            e_obj = { status: 'out of stock', collect_error }
            throw JSON.stringify(e_obj)
        }

    } catch (e) {
        // console.log(e)
        res.json(e)
    }
})

router.post('/orderProductStatus', async (req, res) => {

    try {
        let result = await orderProductStatus.create({
            name: req.body.name,
            note: req.body.note
        });
        res.json(result)
    } catch (e) {
        res.status(400).json(e)
    }
})

router.get('/orderProduct/order-id/:id', async (req, res) => {
    try {

        let result = await orderProduct.findAll({ where: { order_id: req.params.id } });
        // console.log(result)
        let datas = [];
        for (let i = 0; i < result.length; i++) {
            let statusName = await orderProductStatus.findOne({ where: { id: result[i].order_product_status_id } });
            let productName = await product.findOne({ where: { id: result[i].product_id } })
            // console.log(productName)

            let data = {
                product_id: result[i].product_id,
                product_name: productName.product_name,
                order_qty: result[i].order_qty,
                product_status_name: statusName.name,
                price: result[i].price,
                cookedBy: result[i].cookedBy
            }
            datas.push(data)
        }

        res.json(datas)
    } catch (e) {
        res.status(400).json(e)
    }
})


async function getOrderProductByCustomerId(id) {
    return new Promise(async function (data, err) {
        try {
            const result = await orderProduct.findAll({ include: [product, orderProductStatus, order] })
            let filterdata = [];
            result.forEach(element => {
                if (element.order.customer_id == id) {

                    filterdata.push(element)
                }
            });
            data(filterdata)
        } catch (err) {
            console.log(err)
        }

    })

}

async function putOrderProductByCustomerId(id, status_id) {
    return new Promise(async function (resolve, reject) {
        try {
            const result = await sequelize.query(`
        UPDATE orderproducts as A
        INNER JOIN orders as B ON A.order_id = B.id
        SET order_product_status_id = ${status_id}
        WHERE B.customer_id = ${id}
        AND A.order_product_status_id <> 999`);
            let checkSuccess = await getOrderProductByCustomerId(id)
            let checkflag = false;
            checkSuccess.forEach(async (el) => {
                if (el.order_product_status_id == 999 || el.order_product_status_id != 4) {
                    await order.update({ order_status_id: 1 }, { where: { customer_id: id } })
                    checkflag = true;
                    return
                }
                
            })
            if (!checkflag) {
                await order.update({ order_status_id: 2 }, { where: { customer_id: id } })
                await customer.update({ table_id: null},{ where: {id:id}})
            }
            resolve(result)
        } catch (err) {
            reject(err)
        }
    })
}
router.get('/orderProduct/customer-id/:id', async (req, res) => {

    try {
        const result = await getOrderProductByCustomerId(req.params.id)

        res.json(result)
    } catch (e) {
        console.log(e)
        res.status(400).json(e)
    }
})

router.put('/orderProduct/customer-id/:id', async (req, res) => {

    try {
        const result = await putOrderProductByCustomerId(req.params.id, req.body.status_id)

        res.json(result)
    } catch (e) {
        console.log(e)
        res.status(400).json(e)
    }
})

router.get('/ordersPriceAllYear', async (req, res) => {
    try {
        const result = await sequelize.query(`
        SELECT SUM(total_price) as totalPriceInMonth, MONTH(order_date) as Month, YEAR(order_date) as Year
        FROM orders
        WHERE orders.order_status_id = 2
        GROUP BY Month
        `)
        res.json(result[0])
    } catch (err) {
        res.status(400).send(err)
    }
})

router.get('/orderTypeQtyAllTime', async (req, res) => {
    try {
        const result = await sequelize.query(`
        SELECT B.product_name, SUM(A.order_qty) as qty
        FROM orderproducts as A 
        INNER JOIN products as B on A.product_id = B.id
        WHERE A.order_product_status_id = 5
        GROUP BY B.product_name
        ORDER BY B.id`)
        res.json(result[0])
    } catch (err) {
        res.status(400).send(err)
    }
})

router.put('/updatePriceinOrder', async(req,res) =>{
    try{
        req.body.forEach(async el =>{
            let origTotalPrice = await order.findOne({where:{id:el.order_id}})
            await order.update({total_price:origTotalPrice.total_price - el.totalPrice},{where:{id:el.order_id}})
        })
        
        res.json({message:'success'})
    }catch(err){
        console.log(err)
        res.json(err)
    }
})

router.get('/checkDelivered/:cust_id', async(req,res) =>{
    try{
       
        
        const result = await sequelize.query(`
        SELECT customer_id, order_product_status_id
        FROM orderproducts as A JOIN orders as B ON A.order_id = B.id
        WHERE B.customer_id = ${req.params.cust_id}`
        );
        let checkDelivered = true
        result[0].forEach(el =>{
            if (el.order_product_status_id != 4 && el.order_product_status_id != 999){
                checkDelivered = false
                return
            }
        })
        
        
        
        res.json({DeliveredAll:checkDelivered})
    }catch(err){
        console.log(err)
    }
})
module.exports = { router, getOrder, getOrderProduct, changeOrderProductStatus, getOrderProductByCustomerId, putOrderProductByCustomerId };