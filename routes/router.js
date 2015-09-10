var path = require('path');
var tb = require("twin-bcrypt")
var lib = require('../lib/lib.js');

module.exports = function(app) {
  app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../public', 'home.html'));
  });

  /*app.get('/login', function(req, res){
    var pass = req.param('pass');
    var user = req.param('user');
    lib.checkUser(user, pass, function(err, obj){
      if(err){
        res.send(err);
      }else{
        res.sendFile(path.join(__dirname, '../public', 'login.html'))
      }
    });
  });*/
  
  app.post('/login', function(req, res) {
    var body = req.body;
    lib.checkUser(body.user, body.pass, function(err, obj){
      if(err){
        res.msg(err);
        res.send(500);
      }else{
        if(obj.status == 'ok'){
          res.send(obj);
        }else{
          res.send(obj);
        }
      }
    })
  });

  app.post('/messages', function(req, res){
    var body = req.body;
    var store = body.store;
    console.log(body, store);
    if(body.length === 0 || store === undefined){
      res.send('no store sent');
    }else{
      lib.messageSummary(store, function(err, data){
        if(err){
          res.send(err);
        }else{
          res.send(data);
        }
      });
    }
  });

  app.post('/msgDetail', function(req, res){
    var body = req.body;
    var store = body.store;
    var msgID = body.msgID;
    if(body.length === 0 || store === undefined || msgID === undefined){
      res.send('no store or msgID sent');
    }else{
      lib.messageDetail(msgID, store, function(err, data){
        if(err){
          res.send(err);
        }else{
          res.send(data);
        }
      });
    }
  });
}
