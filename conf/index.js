module.exports = {
    'appname': 'expressway app',
    'server': require('./server'),
    'static_dir': __dirname + '/' + '../public',
    'favicon_path': __dirname + '/' + '../public/favicon.ico',
    'port': 8080,
    'log_format': 'common',
    'cluster': {
        'enable': true
    },
    "global": {
        "httpAgentMaxSocks": 500
    }
}
