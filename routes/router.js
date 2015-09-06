var path = require('path');
var lib = require('../lib/lib.js');

module.exports = function(app) {
  app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../public', 'home.html'));
  });

  app.post('/messages', function(req, res){
    var body = req.body;
    var store = body.store;
    if(body.length === 0 || store === 'undefined'){
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
    if(body.length == 0){
      res.send('no store sent');
    }else{
      lib.messageDetail(req.body.msgID, req.body.store, function(err, data){
        if(err){
          res.send(err);
        }else{
          res.send(data);
        }
      });
    }
  });
}
