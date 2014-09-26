/**
 * App routes
 */
var express = require('express')
var router = express.Router();
module.exports = router.use('/', function(req, res, next) {
      res.send('Hello World');
})
