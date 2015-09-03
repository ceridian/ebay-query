var e = require('../lib/ebay.js');
var models = require('../models');

exports.models = {
  messageSummary: function(store){
    models.STORES.findOne({where: {storeName: store}, include: [models.TOKENS]}).then(function(res){
      var token = res.dataValues.TOKEN.dataValues.token;
      console.log(token);
    }).catch(function(err){
      if(debugFlag == true){ console.log('io.js: messageSummary: finding store by name: '+err); };
    });
  }
}
