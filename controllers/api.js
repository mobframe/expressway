var actions = require('../app/api/actions')
module.exports = function(route){
    route.get('/api', actions.demo)
}
/* vim: set expandtab ts=4 sw=4 sts=4 tw=100: */
