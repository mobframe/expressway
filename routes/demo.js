/**
 * App routes
 */

var actions = require('../app/demo/actions')
module.exports = require('express').Router()
    .get('/demo', actions.demo)
    /*
    .use('/demo', function(req, res, next) {

        res.send('Hello World');
    })
    */

/* vim: set expandtab ts=4 sw=4 sts=4 tw=100: */
