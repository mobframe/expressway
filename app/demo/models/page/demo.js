var dataService = require('../data')

module.exports = function(res, params, callback){
    dataService.demo.getData(params, function(data){
        res.render('demo.html', data)
        callback();
    })
}
