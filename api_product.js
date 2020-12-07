const express = require("express");
const router = express.Router();
const product = require("./models/product");
const productType = require('./models/productType')
const Sequelize = require("sequelize");
const formidable = require("formidable");
const path = require("path")
const fs = require("fs-extra");
const constants = require("./constant");


router.get("/product", async (req, res) => {
  const result = await product.findAll({ order: Sequelize.literal("id DESC") });
  res.json(result);
});

router.get("/productType", async (req, res) => {
  const result = await productType.findAll({ order: Sequelize.literal("id DESC") });
  res.json(result);
});
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
      let result = await product.findOne({where:{id: req.params.id}})
      if (result){
          res.json(result)
      }else{
          res.json({});
      }
  }catch(error){
      res.json({});
  }
})

module.exports = router;
