const express = require("express");
const router = express.Router();

router.use(require("./api_authen"))
router.use(require("./api_product"))
router.use(require("./api_customer"))
router.use(require("./api_employee"))
router.use(require("./api_order"))
router.use(require("./api_discount"))
module.exports = router;
