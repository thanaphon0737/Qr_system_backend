const express = require("express");
const router = express.Router();
const employee = require("./models/employees");
const role = require("./models/roles")
const bcrypt = require("bcryptjs");
const constants = require("./constant");
const sequelize = require("./db_instance");
const { QueryTypes } = require('sequelize');
router.post("/login", async (req, res) => {
  console.log("login: " + JSON.stringify(req.body));
  const { username, password } = req.body;
  try{
  const result = await sequelize.query(`
    SELECT * FROM employees,roles WHERE employees.username = '${username}' AND employees.role_id = roles.id `)
  console.log(result[0][0])
  const data = {
    username: result[0][0].username,
    role_name:result[0][0].name,
    id:result[0][0].id
  }
    if (result[0][0]) {
      if (bcrypt.compareSync(password, result[0][0].password)) {
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
    
    const role_id = await role.findOne({where:{name: 'None'} })
    
    
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

module.exports = router;
