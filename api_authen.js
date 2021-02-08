const express = require("express");
const router = express.Router();
const employee = require("./models/employees");
const role = require("./models/roles")
const bcrypt = require("bcryptjs");
const constants = require("./constant");
const table = require("./models/table");
const orderStatus = require("./models/orderStatus");
const orderProductStatus = require("./models/orderProductStatus");

router.post("/login", async (req, res) => {
  console.log("login: " + JSON.stringify(req.body));
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
        res.json({
          result: constants.kResultOk,
          message: data
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
    await orderProductStatus.create({ id: 999 }, { name: "cancel" });
    res.json({message:"success"});
  } catch (err) {
    console.log(err);
  }

})

module.exports = router;
