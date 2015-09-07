var e = require('../lib/ebay.js');
var models = require('../models');

io.on('connection', function(socket){
	console.log('connected io');
});

/*module.exports = {
	messageSummary: function(store){
		models.STORES.findOne({where: {storeName: store}, include: [models.TOKENS]}).then(function(res){
			console.log(res);
		}).catch(function(err){
			if(debugFlag == true){ console.log('io.js: messageSummary: finding store by name: '+err); };
		});
	}
}*/
