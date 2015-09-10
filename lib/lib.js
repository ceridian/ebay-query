var e = require('../lib/ebay.js');
var models = require('../models');
var salt = '$2y$04$STZa7rpdGZI4CK59fwQbMO';
var tb = require('twin-bcrypt');
//var passPreHash = "$2y$04$STZa7rpdGZI4CK59fwQbMOR6iPo7ZtVji1FZum0Y9jUHeoXJnVfsO";
/*global debugFlag*/

module.exports = {
  messageSummary: function(store, callback){
    models.STORES.findOne({where: {storeName: store}, include: [models.TOKENS]}).then(function(res){
      var token = res.dataValues.TOKEN.dataValues.token;
      var params = {
        'authToken': token,
        'DetailLevel': 'ReturnHeaders'
      };
      var opType = 'GetMyMessages';
      var serviceName = 'Trading';
      e.postXML(params, opType, serviceName, function(err, data){
        if(err){
          callback(err, null);
        }else{
          callback(null, data);
        }
      });
    }).catch(function(err){
      if(debugFlag == true){ console.log('lib.js: messageSummary: finding store by name: '+err); };
    });
  },

  messageDetail: function(msgID, store, callback){
    console.log(msgID, store);
    models.STORES.findOne({where: {storeName: store}, include: [models.TOKENS]}).then(function(res){
      var token = res.dataValues.TOKEN.dataValues.token;
      var params = {
        'authToken': token,
        'DetailLevel': 'ReturnMessages',
        'MessageIDs': msgID
      };
      var opType = 'GetMyMessages';
      var serviceName = 'Trading';
      e.postXML(params, opType, serviceName, function(err, data){
        if(err){
          callback(err, null);
        }else{
          callback(null, data);
        }
      });
    }).catch(function(err){
      if(debugFlag == true){ console.log('lib.js: messageSummary: finding store by name: '+err); };
    });
  },

  checkUser: function(user, pass, callback){
    var obj = {};
    obj.status = null;
    obj.user = user;
    obj.group = null;
    var hash = tb.hashSync(pass, salt);
    models.USER.find({where: {user: user}}).then(function(res){
      console.log(res.dataValues.pass, hash);
      if(res){
        if(res.dataValues.pass == hash){
          obj.status = 'ok';
          obj.group = res.dataValues.group;
          callback(null, obj);
        }else{
          obj.status = 'Incorrect Password';
          callback(null, obj);
        }
      }else{
        obj.status = 'Incorrect Username';
        callback(null, obj);
      }
    }).catch(function(err){
      if(debugFlag == true){ console.log('lib.js: checkUser: finding user: '+err); };
    });
  }
}
