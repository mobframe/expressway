var demo = require('../app/demo')
module.exports = function(route){ 
    route.get('/demo', demo.actions.demo)
}

/* vim: set expandtab ts=4 sw=4 sts=4 tw=100: */
