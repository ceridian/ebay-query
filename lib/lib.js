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
    models.STORES.findOne({where: {storeName: store}, include: [models.TOKENS]}).then(function(res){
      var token = res.dataValues.TOKEN.dataValues.token;
      var params = {
        'authToken': token,
        'DetailLevel': 'ReturnMessages',
        'MessageIDs': [msgID]
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
  }
}
