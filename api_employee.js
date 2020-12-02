const express = require("express");
const router = express.Router();
const employee = require("./models/employees");
const role = require("./models/roles");
const constants = require("./constant");
const Sequelize = require("sequelize");
const sequelize = require("./db_instance");

router.get("/employee", async (req, res) => {
    const result = await employee.findAll({include:[role]})
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
    
    let result = await await sequelize.query(`
    SELECT * FROM employees,roles WHERE employees.id = '${req.params.id}' AND employees.role_id = roles.id `)
    console.log(result[0][0])
    
    try {
        res.json({
            result: constants.kResultOk,
            message: JSON.stringify(result[0][0])
        });
      
    } catch (error) {
      res.json({ result: constants.kResultNok, message: JSON.stringify(error) });
    }
  })


  router.put("/employee/id/:id", async (req, res)=>{
      console.log("hellow form front")
      console.log(req.body)
    try {
        const role_id_query = await role.findOne({where: {name: req.body.role}});
        const result = await employee.update(
        {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            role_id : Number(role_id_query.id.toString()),
            contact: req.body.contact
        },
         {where : {id: req.params.id}});
        // console.log(role_id_query.id)
        res.json({
            result: constants.kResultOk,
            message: JSON.stringify(result)
        });
    } catch (error) {
      res.json({ result: constants.kResultNok, message: req.body });
    }
  })

  router.delete("/employee/id/:id", async (req, res)=>{
    try{
      const {id} = req.params
      let result = await employee.findOne({where: {id}})
      result = await employee.destroy({ where: { id: id } });
      res.json({ result: constants.kResultOk, message: JSON.stringify(result) });
    }catch(err){
      console.log(err)
      res.json({ result: constants.kResultNok, message: JSON.stringify(err) });
    }
  })
module.exports = router;