const express = require("express");
const router = express.Router();
const customer = require("./models/customer");
const constants = require("./constant");
const table = require('./models/table');

function getCustomerAll(){
    return new Promise(async (resolve, reject) =>{
        try{
            let result = await customer.findAll();
            resolve(result)
        }catch(err){
            reject(err)
        }
    })
}
router.get("/customer", async (req, res) => {
    const result = await getCustomerAll()
    res.json(result);
});

router.get("/table", async (req, res) => {
    const result = await table.findAll();
    res.json(result)
})

router.post("/table", async (req, res) => {
    try {
        const result = await table.create({ capacity: req.body.capacity });
        res.json({ result: constants.kResultOk, message: JSON.stringify(result) });
    } catch (error) {
        res.json({ result: constants.kResultNok, message: JSON.stringify(error) });
    }
})

function addCustomer(name,table_id){
    return new Promise(async (resolve,reject) =>{
        try {
            const timestamp = Date.now();
            let data = {
                customer_name: name,
                table_id: table_id,
                url_image: `${table_id}/${timestamp}`
            }
            const result = await customer.create(data);
    
            resolve({ result: constants.kResultOk, message: JSON.stringify(result) });
    
        } catch (error) {
    
            reject({ result: constants.kResultNok, message: JSON.stringify(error) });
        }
    })
}
router.post("/customer", async (req, res) => {
    let result =await addCustomer(req.body.customer_name,req.body.table_id)
    res.json(result)
    
});

router.put("/customer", async (req, res) => {
    console.log(req.body)
    const data = {
        customer_name: req.body.customer_name,
        table_id: req.body.table_id
    }
    try {
        let result = await customer.update(data, { where: { id: req.body.id } });
        res.json({
            result: constants.kResultOk,
            message: result
        })
    } catch (error) {
        res.json(400).json(error)
    }
})

function getCustomerById(id){
    return new Promise(async (resolve,reject) =>{
        try{
            let customerId = await customer.findOne({ where: { id } })
        if (customerId) {

            resolve({
                result: constants.kResultOk,
                message: customerId
            })
        }else {
            resolve({
                result: constants.kResultNok,
                message: 'cant find customer id'
            })
        }
        }catch(err){
            reject(err)
        }
    })
}
router.get('/customer/:id', async (req, res) => {
    
    let result = await getCustomerById(req.params.id)
    res.json(result)

})

function getCustomerTableById(id){
    return new Promise(async (resolve,reject) =>{
        try{
            let customerId = await customer.findOne({ where: { table_id:id } })
        if (customerId) {

            resolve({
                result: constants.kResultOk,
                message: customerId
            })
        }else {
            resolve({
                result: constants.kResultNok,
                message: 'cant find customer id'
            })
        }
        }catch(err){
            reject(err)
        }
    })
}
router.get('/customer/table/:id', async (req, res) => {
    
    let result = await getCustomerTableById(req.params.id)
    res.json(result)

})

router.put('/updatePriceCustomer', async (req, res) =>{
    try{

        let result = await customer.update({total_price: req.body.totalPrice},{where:{id:req.body.id}})
        res.json(result)
    }catch(err){
        res.json(err)
    }
})
module.exports = {router,getCustomerById, getCustomerAll,addCustomer,getCustomerTableById};