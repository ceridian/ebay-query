var path = require('path');
var lib = require('../lib/lib.js');


exports.home = function(req, res){
  res.sendFile(path.join(__dirname, '../public', 'home.html'));
};

exports.messages = function(req, res){
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
}

esports.msgDetail = function(req, res){
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
}
