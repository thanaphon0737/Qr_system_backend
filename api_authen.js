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
  const result = await employee.findOne({where:{username:username}},{include:[role]})
  const role_name = await role.findOne({where: {id:result.role_id}})
  const data = {
    username: result.username,
    role_name:role_name.name,
    id:result.id
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
