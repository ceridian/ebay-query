var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var models = require("../models");
var http = require('http');

var app = express();

debugFlag = true;

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '../public', 'home.html'));
});

app.post('/messages', function(req, response){
  var body = req.body;
  var store = body.store;
  console.log(body, store);
  if(body.length === 0 || store === undefined){
    response.send('no store sent');
  }else{
    lib.messageSummary(store, function(err, data){
      if(err){
        response.send(err);
      }else{
        response.send(data);
      }
    });
  }
});

app.post('/msgDetail', function(req, res){
  var body = req.body;
  var store = body.store;
  var msgID = body.msgID;
  if(body.length === 0 || store === undefined || msgID === undefined){
    response.send('no store or msgID sent');
  }else{
    lib.messageDetail(msgID, store, function(err, data){
      if(err){
        response.send(err);
      }else{
        response.send(data);
      }
    });
  }
});

models.sequelize.sync().then(function () {
  var server = http.createServer(app);
  //io = require("socket.io").listen(server);
  server.listen(3000);
  //require('../lib/io.js')(io);
  console.log(3000);
});
