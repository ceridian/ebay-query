var e = require('../lib/ebay.js');
var models = require('../models');

module.exports = {
	messageSummary: function(store){
		models.STORES.findOne({where: {storeName: store}, include: [TOKENS]}).complete(function(err, res){
			if(err){
				if(debugFlag == true){ console.log('io.js: messageSummary: finding store by name: '+err); }
			}else{
				console.log(res);
			}
		});
	}
}
