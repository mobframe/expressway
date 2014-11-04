/**
 * Load app configures.
 */

var config = require('../conf')
var path = require('path')
var eboot = require('eboot')
/*
 * load app routes
 */
//var routes = require('../routes')

/**
 * Load middleware
 */
var bodyParser = require('body-parser')
var timeout = require('connect-timeout')
var logger = require('morgan')

/**
 * Create app.
 */

var express = require('express')
var app = express()

app.set('env', config.env)
    .set('port', config.server.port)
    .set('view engine', 'ejs')
    .set('views', path.join(__dirname, '../template'))
    .engine('html', require('ejs').renderFile)
    .disable('x-powered-by')
    .use(bodyParser.json()) // create application/json parser
    .use(bodyParser.urlencoded({ extended: true })) // create application/x-www-form-urlencoded parser
    .use(express.static(config.static_dir))
    .use(eboot(app))
    .use(timeout(config.server.timeout))
    .use(logger(config.log_format))

//Set condition of opening debug mode 
if(config.env == 'development'){
    app.use(logger('dev'))
}

module.exports = app;
