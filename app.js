/**
 * App dependencies.
 */

var http = require('http')
var cluster = require('cluster')
var express = require('express')
var debug = require('debug')('expressway')

/**
 * Load app routes and configures.
 */

var routes = require('./routes')
var config = require('./conf')

/**
 * Load middleware
 */
var bodyParser = require('body-parser')
var timeout = require('connect-timeout')
var logger = require('morgan')
/**
 * Create app.
 */

var app = express()

app.set('env', config.env)
    .set('port', config.server.port)
    .disable('x-powered-by')
    //.use(require('serve-favicon')(config.favicon_path)(req, res, function(err){
    //    if (err) return require('finalhandler')(err);
    //    res.statusCode = 404;
    //    res.end();
    //}))
    .use(bodyParser.json()) // create application/json parser
    .use(bodyParser.urlencoded({ extended: true })) // create application/x-www-form-urlencoded parser
    .use(routes)
    .use(timeout(config.server.timeout))
    .use(express.static(config.static_dir))
    .use(logger(config.log_format))

/**
 * Set configures.
 */

//Set condition of opening debug mode 
if(config.env == 'development'){
    app.use(logger('dev'))
    config.cluster.workerNum = 1
}

if(typeof config.global.httpAgentMaxSocks == 'number'){
    http.globalAgent.maxSockets = config.global.httpAgentMaxSocks
}

var processNum = config.cluster.workerNum ? config.cluster.workerNum: require('os').cpus().length
var port = config.port;

/**
 * Start Server.
 */

if(config.cluster.enable && cluster.isMaster){
    console.log('Master start up. Processes number: '+ processNum + ' port: ' + port + ' max crawler number: ' + config.server.max_crawler_num);
    for(var i = 0; i< processNum; i++){
        cluster.fork()
    }
    cluster.on('exit', function(worker, code, signal){ //if app exits, restart it.
        var exit_message = 'worker pid:'+worker.process.pid+' exit at '+ new Date()+' code:'+code+' signal:'+signal;
        cluster.fork()
    });
    cluster.on('online', function(worker) {
        var online_message = 'worker pid:' + worker.process.pid + ' online at ' + new Date();
        console.log(online_message);
    });
    cluster.on('listening', function(worker, address) {
        var listen_message = 'worker pid:' + worker.process.pid + ' listen at port:'+ address.port +' '+ new Date();
        console.log(listen_message);
    });
}else{
    console.log('App start up.')
    if (!config.cluster.enable){
        console.log('Single process run.');
    }else{
        console.log('Process start up. ');
    }

    http.createServer(app)
        .listen(port, function(){
            console.log('worker pid:' + process.pid + ' '+config.appname+" server listening on port " + port, new Date());
        });
}
