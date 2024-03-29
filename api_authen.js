const express = require("express");
const router = express.Router();
const employee = require("./models/employees");
const role = require("./models/roles")
const bcrypt = require("bcryptjs");
const constants = require("./constant");
const table = require("./models/table");
const orderStatus = require("./models/orderStatus");
const orderProductStatus = require("./models/orderProductStatus");
const jwt = require('jsonwebtoken');
const customer = require("./models/customer");


router.post("/customerRequestToken", async(req,res) =>{
  const {url} = req.body;
  try{
    console.log(url)
    const urlcheck = await customer.findAll({where: {url_image: url}})
    if(urlcheck.length > 0){
      const data = {
        name: urlcheck[0].customer_name,
        tableId: urlcheck[0].table_id
      }
      jwt.sign({data}, 'secretkey', { expiresIn: '8h' }, (err, token) => {
        res.json({
          token
        });
      });
    }else {
      res.sendStatus(401);
    }
  }catch(err){
    console.log(err)
    res.sendStatus(403);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await employee.findOne({ where: { username: username } }, { include: [role] })
    const role_name = await role.findOne({ where: { id: result.role_id } })
    const data = {
      username: result.username,
      role_name: role_name.name,
      id: result.id
    }
    
    if (result) {
      if (bcrypt.compareSync(password, result.password)) {
        // res.json({
        //   result: constants.kResultOk,
        //   message: data
        // });
        jwt.sign({data}, 'secretkey', { expiresIn: '1800s' }, (err, token) => {
          res.json({
            token
          });
        });

      } else {
        res.json({ result: constants.kResultNok, message: "Invalid password" });
      }
    } else {
      res.json({ result: constants.kResultNok, message: "Invalid username" });
    }
  } catch (error) {
    console.log(error)
    res.json({ result: constants.kResultNok, message: 'error' });
  }
});

router.post("/register", async (req, res) => {
  try {

    req.body.password = await bcrypt.hash(req.body.password, 8);

    const role_id = await role.findOne({ where: { name: 'None' } })
    const employeeCreated = {
      username: req.body.username,
      password: req.body.password,
      role_id: role_id.id
    }
    const result = await employee.create(employeeCreated);
    res.json({ result: constants.kResultOk, message: JSON.stringify(result) });
  } catch (error) {
    console.log(error)
    res.json({ result: constants.kResultNok, message: JSON.stringify(error) });
  }
});


router.get("/createNewDataTemp", async (req, res) => {
  try {
    await role.create({ name: "None" });
    await role.create({ name: "Manager" });
    await role.create({ name: "Chef" });
    await role.create({ name: "Waiter" });
    await role.create({ name: "Cashier" });
    // --------------------------------
    let capa = 4;
    for (let i = 0; i < 4; i++) {
      await table.create({ capacity: capa })
    }
    await orderStatus.create({ name: "In Process" })
    await orderStatus.create({ name: "Success" })

    await orderProductStatus.create({ name: "pending" });
    await orderProductStatus.create({ name: "in kitchen" });
    await orderProductStatus.create({ name: "on the way" });
    await orderProductStatus.create({ name: "delivered" });
    await orderProductStatus.create({ name: "billed" });
    await orderProductStatus.create({ id: 999 });
    await orderProductStatus.update({name: "cancel"},{where:{id:999}})
    res.json({message:"success"});
  } catch (err) {
    console.log(err);
  }

})



//test me
router.get('/me', async (req, res) => {
  const result = await role.findAll()
  res.json(result);
});

module.exports = router;
