/**
 * App dependencies.
 */

var http = require('http')
var cluster = require('cluster')
//var debug = require('debug')('expressway')

/**
 * Load app configures.
 */

var config = require('./conf')

var app = require('./app/index.js')

/**
 * Set configures.
 */

//Set condition of opening debug mode 
if(config.env == 'development'){
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
    console.log('Master start up. Processes number: '+ processNum + ' port: ' + port);
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
    var server = http.createServer(app)
        .listen(port, function(){
            console.log('worker pid:' + process.pid + ' '+config.appname+" server listening on port " + port, new Date());
        });
}
/* vim: set expandtab ts=4 sw=4 sts=4 tw=100: */
