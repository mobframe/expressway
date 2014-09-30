/**
 * App routes
 */
var express = require('express')
var router = express.Router();
router.use('/message', function(req, res, next) {
      res.send('Hello World');
})
module.exports = router;
