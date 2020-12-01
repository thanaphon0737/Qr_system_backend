const express = require("express");
const router = express.Router();
const employee = require("./models/employees");
const role = require("./models/roles");
const constants = require("./constant");
const Sequelize = require("sequelize");
const sequelize = require("./db_instance");

router.get("/employee", async (req, res) => {
    const result = await sequelize.query("SELECT * FROM employees, roles WHERE employees.role_id = roles.id ")
    res.json(result);
});

router.get("/role", async (req,res) => {
    const result = await role.findAll();
    res.json(result);
})

router.post("/role", async (req, res) => {
    
    try {
        
        const result = await role.create({name:req.body.name});
        
        
        console.log(result)
        res.json({ result: constants.kResultOk, message: JSON.stringify(result) });
        
    } catch (error) {
        console.log(error)
        res.json({ result: constants.kResultNok, message: JSON.stringify(error) });
    }
});

router.get("/employee/id/:id", async (req, res)=>{
    
    let result = await employee.findAll({where:{id:req.params.id}},{include:[{model:role}]});
    console.log(result)
    try {
        res.json({
            result: constants.kResultOk,
            message: result
        });
      
    } catch (error) {
      res.json({ result: constants.kResultNok, message: JSON.stringify(error) });
    }
  })

router.put("/employee/role/:id", async (req, res)=>{
    try {
        let result = await employee.update(
        {
            role_id : req.body.role_id
        },
         {where : {id: req.params.id}});
        console.log(result)
        res.json({
            result: constants.kResultOk,
            message: JSON.stringify(result)
        });
      
    } catch (error) {
      res.json({ result: constants.kResultNok, message: JSON.stringify(error) });
    }
  })
module.exports = router;