const express = require("express");
const router = express.Router();

router.use(require("./api_authen"))
router.use(require("./api_stock"))
router.use(require("./api_customer"))
module.exports = router;
