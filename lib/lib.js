var e = require('../lib/ebay.js');
var models = require('../models');

module.exports = {
  messageSummary: function(store){
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
          console.log(err);
        }else{
          console.log(JSON.stringify(data));
        }
      });
    }).catch(function(err){
      if(debugFlag == true){ console.log('io.js: messageSummary: finding store by name: '+err); };
    });
  }
}
