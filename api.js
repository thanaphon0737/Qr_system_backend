const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const api_order = require("./api_order").router
const api_customer = require("./api_customer").router
router.use(require("./api_authen"))
router.use(verifyToken,require("./api_product"))
router.use(verifyToken,api_customer)
router.use(verifyToken,require("./api_employee"))
router.use(verifyToken,api_order)
router.use(verifyToken,require("./api_discount"))


// Verify Token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
      jwt.verify(req.token, 'secretkey', (err) =>{
          if(err) {
            
              res.sendStatus(401);
          }else {
              next();
          }
      })
    } else {
      // Forbidden
      res.sendStatus(403);
    }
    // next();
  }

module.exports = router;
