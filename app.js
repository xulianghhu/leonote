var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var fs = require('fs');
var mongoose = require('mongoose');
var config = require('./config');

// connect to mongodb
var connect = function () {
	var options = { server: { socketOptions: { keepAlive: 1 } } };
	mongoose.connect(config.db, options);
};
connect();
mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: 'leoxu'}));
app.use(express.static(path.join(__dirname, 'public')));

// initialize mongoose schema
fs.readdirSync(path.join(__dirname, 'models')).forEach(function (file) {
	if (~file.indexOf('.js')) require(path.join(__dirname, 'models', file));
});

// initialize routes
require('./routes')(app);


module.exports = app;
