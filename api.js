const express = require("express");
const router = express.Router();

router.use(require("./api_authen"))
router.use(require("./api_product"))
router.use(require("./api_customer"))
router.use(require("./api_employee"))
module.exports = router;
