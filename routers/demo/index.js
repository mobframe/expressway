/**
 * Created by mdemo on 14/11/4.
 */
var actions = require('../../app/demo/actions');

var express = require('express');
var router = express.Router();
router.get('/', actions.demo);

module.exports = router;