var path = require('path');
var lib = require('../lib/lib.js');

module.exports = function(app) {
  app.get('/', function(req, res){
    res.redirect('/login');
  });

  app.get('/login', function(req, res){
    res.sendFile(path.join(__dirname, '../public', 'login.html'));
  });

  app.get('/login/:pass', function(req, res){
    var pass = req.params.pass;
    var user = req.params.user;
    console.log(pass, user);
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
}
