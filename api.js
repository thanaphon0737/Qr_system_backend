const express = require("express");
const router = express.Router();
const api_order = require("./api_order").router
const api_customer = require("./api_customer").router
router.use(require("./api_authen"))
router.use(require("./api_product"))
router.use(api_customer)
router.use(require("./api_employee"))
router.use(api_order)
router.use(require("./api_discount"))
module.exports = router;
