var e = require('../lib/ebay.js');
var models = require('../models');

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
      if(debugFlag == true){ console.log('io.js: messageSummary: finding store by name: '+err); };
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
      if(debugFlag == true){ console.log('io.js: messageSummary: finding store by name: '+err); };
    });
  },

  checkUser: function(body, callback){
    var user = body.user;
    var pass = body.pass;
    var obj = {};
    obj.status = null;
    obj.user = user;
    obj.group = null;
    models.USER.find({where: {user: user}}).complete(function(err, result){
      if(err){
        callback(err, null);
      }else{
        if(result){
          if(result.pass == pass){
            obj.status = 'ok';
            obj.group = result.group;
            callback(null, obj);
          }else{
            obj.status = 'Incorrect Password';
            callback(null, obj);
          }
        }else{
          obj.status = 'Incorrect Username';
          callback(null, obj);
        }
      }
    });
  }
}
