const express = require("express");
const router = express.Router();
const customer = require("./models/customer");
const constants = require("./constant");
const table = require('./models/table')
router.get("/customer", async (req, res) => {
    const result = await customer.findAll();
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
router.post("/customer", async (req, res) => {

    try {
        let data = {
            customer_name: req.body.customer_name,
            table_id: req.body.table_id
        }
        const result = await customer.create(data);

        res.json({ result: constants.kResultOk, message: JSON.stringify(result) });

    } catch (error) {

        res.json({ result: constants.kResultNok, message: JSON.stringify(error) });
    }
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
router.get('/customer/:id', async (req, res) => {
    try {

        let customerId = await customer.findOne({ where: { id: req.params.id } })
        if (customerId) {

            res.json({
                result: constants.kResultOk,
                message: customerId
            })
        }else {
            res.json({
                result: constants.kResultNok,
                message: 'cant find customer id'
            })
        }

    } catch (er) {
        res.json(400)
    }

})
module.exports = router;