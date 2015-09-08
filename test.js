var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var models = require("./models");
var http = require('http');
var lib = require('./lib/lib.js');
var request = require('request');

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
    models.STORES.findOne({where: {storeName: store}, include: [models.TOKENS]}).then(function(res){
      var token = res.dataValues.TOKEN.dataValues.token;
      var xml = '<?xml version="1.0" encoding="utf-8"?><GetMyMessagesRequest xmlns="urn:ebay:apis:eBLBaseComponents"><RequesterCredentials><eBayAuthToken>'+token+'</eBayAuthToken></RequesterCredentials><DetailLevel>ReturnHeaders</DetailLevel>';
      var postRequest = {
        host: "api.ebay.com",
        path: "/ws/api.dll",
        port: 443,
        method: "POST",
        headers: {
          'X-EBAY-API-COMPATIBILITY-LEVEL': '859',
          'X-EBAY-API-SITEID': '0', // US
          'X-EBAY-API-DEV-NAME': "ccfd19da-b8a8-4636-9583-42aa3ecf6f2a",
          'X-EBAY-API-CERT-NAME': "c34588c1-cd71-4843-acde-2560c7b326be",
          'X-EBAY-API-APP-NAME': "jacobvan-87d2-4b6b-b584-4096cdbcd4b0",
          'X-EBAY-API-CALL-NAME': 'GetMyMessages',
          'DetailLevel': 'ReturnHeaders',
          'Content-Type': 'text/xml',
          'Content-Length': Buffer.byteLength(xml)
        }
      };

      var buffer = "";
      var req = http.request( postRequest, function( res )    {
        console.log( res.statusCode );
        var buffer = "";
        res.on( "data", function( data ) { buffer = buffer + data; } );
        res.on( "end", function( data ) { console.log( buffer ); } );
      });

      req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
      });

      req.write( body );
      req.end();
      /*var params = {
        'authToken': token,
        'DetailLevel': 'ReturnHeaders'
      };
      var opType = 'GetMyMessages';
      var serviceName = 'Trading';
      var object = {
        'method': 'POST',
        'url': 'https://api.ebay.com/ws/api.dll',
        'headers': {
          'X-EBAY-API-COMPATIBILITY-LEVEL': '859',
          'X-EBAY-API-SITEID': '0', // US
          'X-EBAY-API-DEV-NAME': "ccfd19da-b8a8-4636-9583-42aa3ecf6f2a",
          'X-EBAY-API-CERT-NAME': "c34588c1-cd71-4843-acde-2560c7b326be",
          'X-EBAY-API-APP-NAME': "jacobvan-87d2-4b6b-b584-4096cdbcd4b0",
          'X-EBAY-API-CALL-NAME': 'GetMyMessages',
          'DetailLevel': 'ReturnHeaders',
          'RequesterCredentials': {
            'eBayAuthToken': token
          }
        }
      }
      var xmlData = '<?xml version="1.0" encoding="utf-8"?>'
        + '<GetMyMessagesRequest xmlns="urn:ebay:apis:eBLBaseComponents">'
        + '<RequesterCredentials> <eBayAuthToken>'
        + token + '</eBayAuthToken> </RequesterCredentials>'
        + ' </GetMyMessagesRequest>';
      request(object, function(err, res, result){
        console.log(err, result);
        response.send(result);
      });*/
      /*e.postXML(params, opType, serviceName, function(err, data){
        if(err){
          callback(err, null);
        }else{
          callback(null, data);
        }
      });*/
    }).catch(function(err){
      if(debugFlag == true){ console.log('io.js: messageSummary: finding store by name: '+err); };
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
