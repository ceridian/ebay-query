var path = require('path');
var lib = require('../lib/lib.js');

module.exports = function(app) {
  app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
  });

  app.post('/messages', function(req, res){
    lib.messageSummary(req.body.store, function(err, data){
      if(err){
        res.send(err);
      }else{
        res.send(data);
      }
    });
  });
}
