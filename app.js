var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

debugFlag = true;

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./routes/router.js')(app);

app.get('/404', function(req, res, next){
  next();
});

// 404

app.use(function(req, res, next){
  res.redirect('/');
});

// error handlers

app.use(function(err, req, res, next) {
  if(err){
  	res.status(err.status || 500);
  	res.send(err);
  }else{
    res.redirect('/');
  }
});

module.exports = app;
