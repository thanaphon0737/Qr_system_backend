const express = require("express");
const router = express.Router();
const product = require("./models/product");
const productType = require('./models/productType')
const Sequelize = require("sequelize");
const sequelize = require("./db_instance");
const formidable = require("formidable");
const path = require("path")
const fs = require("fs-extra");
const constants = require("./constant");


router.get("/product", async (req, res) => {
  const result = await product.findAll({include:[{model:productType}]});
  res.json(result);
});

router.get("/productType", async (req, res) => {
  const result = await productType.findAll({ order: Sequelize.literal("id DESC") });
  res.json(result);
});

router.post("/productType", async(req, res) =>{
  const data = {
    name:req.body.name,
    note:req.body.note
  }
  console.log(data)
  try{
    const result = await productType.create(data)
      res.json({
        result: constants.kResultOk,
        message: JSON.stringify(result)
      })
  }catch(error){
    res.json({ result: constants.kResultNok, message: JSON.stringify(error) });
  }
  
})
// Upload Image
uploadImage = async (files, doc) => {
  console.log(files)
  if (files.image != null) {
    var fileExtention = files.image.name.split(".")[1];
    doc.image = `${doc.product_name}.${fileExtention}`;
    var newpath = path.resolve(__dirname + "/uploaded/images/") + "/" + doc.image;    

    if (fs.stat(newpath)) {
      await fs.remove(newpath);
    }
    await fs.moveSync(files.image.path, newpath);

    // Update database
    let result = product.update(
      { product_image: doc.image },
      { where: { id: doc.id } }
    );
    return result;
  }
};

router.post("/product", (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async (error, fields, files) => {
      console.log('add:',fields)
      let result = await product.create(fields);

      result = await uploadImage(files, result);

      res.json({
        result: constants.kResultOk,
        message: JSON.stringify(result)
      });
    });
  } catch (error) {
    res.json({ result: constants.kResultNok, message: JSON.stringify(error) });
  }
});

router.put("/product", (req, res)=>{
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async (error, fields, files) => {
      console.log(fields)
      let result = await product.update(fields, {where : {id: fields.id}});
      
      result = await uploadImage(files, fields);
      res.json({
        result: constants.kResultOk,
        message: JSON.stringify(result)
      });
    });
  } catch (error) {
    res.json({ result: constants.kResultNok, message: JSON.stringify(error) });
  }
})

router.delete("/product/id/:id", async (req, res)=>{
  try{
    const {id} = req.params
    let result = await product.findOne({where: {id}})
    await fs.remove(__dirname + "/uploaded/images/" + result.image)
    result = await product.destroy({ where: { id: id } });
    res.json({ result: constants.kResultOk, message: JSON.stringify(result) });
  }catch(err){
    console.log(err)
    res.json({ result: constants.kResultNok, message: JSON.stringify(err) });
  }
})


router.get("/product/id/:id", async (req, res)=>{
  try{
      let result = await product.findOne({where:{id: req.params.id}});
      let product_type = await productType.findOne({where:{id:result.product_type_id}});
      let data = {
        id:result.id,
        product_name:result.product_name,
        product_serving:result.product_serving,
        product_image:result.product_image,
        product_sell_price:result.product_sell_price,
        product_buy_price:result.product_buy_price,
        product_qty:result.product_qty,
        note:result.note,
        product_type_id:result.product_type_id,
        product_type_name:product_type.name
      }
      
      if (data){
          res.json(data)
      }else{
          res.json({});
      }
  }catch(error){
      res.json({});
  }
})

router.get('/getAllProductName', async (req, res) =>{
  try{
    const result = await sequelize.query(`SELECT product_name 
    FROM products
    GROUP BY id`)
    res.json(result[0])
  }catch(err){
    console.log(err)
    res.json(err)
  }
})
module.exports = router;
