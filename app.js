process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('./config/express_config'),
    mongoose = require('./config/mongoose');

var db = mongoose();
var app = express();
app.listen(3000);
module.exports = app;

console.log('Server running at localhost');
