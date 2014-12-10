/**
 * @param params `params` contains requests from user and config from app which controllers pass to models.
 * @param models `models` contains models autoloaded by lark-mvc.
 */

module.exports = function(params, models){
    var data = models.dataService.demo.getData(params, function(data){
        res.render('demo.html', data)
        callback();
    })
    if(data.done()){
        return res.render('demo.html', data)
    }
}
