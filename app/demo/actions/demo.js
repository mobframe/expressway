module.exports = function(req, res, next) {
    require('../models/page').demo(res, {}, function(err){
        next();
    });   
}
