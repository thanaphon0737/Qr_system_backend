const express = require("express");
const router = express.Router();
const employee = require("./models/employees");
const role = require("./models/roles")
const bcrypt = require("bcryptjs");
const constants = require("./constant");

router.post("/login", async (req, res) => {
  console.log("login: " + JSON.stringify(req.body));
  const { username, password } = req.body;
  const result = await employee.findOne({ where: { username: username } });
  try {
    if (result) {
      if (bcrypt.compareSync(password, result.password)) {
        res.json({
          result: constants.kResultOk,
          message: JSON.stringify(result)
        });
      } else {
        res.json({ result: constants.kResultNok, message: "Invalid password" });
      }
    } else {
      res.json({ result: constants.kResultNok, message: "Invalid username" });
    }
  } catch (error) {
    res.json({ result: constants.kResultNok, message: JSON.stringify(error) });
  }
});

router.post("/register", async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 8);
    const role_id = await role.findOne({ name: 'none'})
    
    console.log("id", role_id.id)
    const employeeCreated = {
      username: req.body.username,
      password: req.body.password,
      role_id: role_id.id
    }
    
    const result = await employee.create(employeeCreated);
    res.json({ result: constants.kResultOk, message: JSON.stringify(result) });
  } catch (error) {
    res.json({ result: constants.kResultNok, message: JSON.stringify(error) });
  }
});

module.exports = router;
