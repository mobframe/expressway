/**
 * App routes
 */

var fs = require('fs')
var path = require('path')
var async = require('async')

module.exports = function(req, res, next){
    var route = require('express').Router()

    function requireDir(filepath, route, req, res, next){
        fs.readdir(filepath, function(err, files){
            async.map(files, function(file, callback){
                fs.stat('./routes/' + file, function(err, stats){
                    if (err){
                        next(err);
                    }
                    if (stats.isFile()){
                        requireFile(file, route, req, res, callback);
                    }else if(stats.isDirectory()){ // @TODO check dir bug
                        requireDir(file, route, req, res, callback)
                    } 
                })
            }, function(err, results){
                route(req, res, next)
            })

        })
    }

    function requireFile(filepath, route, req, res, callback){
        if( path.extname(filepath) == '.js' && filepath != 'index.js'){
            var func = require('./' + filepath)
            func(route)
        }
        callback();
    }

    requireDir('./routes', route, req, res, next)
}

/* vim: set expandtab ts=4 sw=4 sts=4 tw=100: */
