var e = require('../lib/ebay.js');
var models = require("../models");

io.on('connection', function(socket){
	if(debugFlag){
		console.log('connected io');
	}
});

io.prototype.messageSummary = function(store){
	models.STORES.find({were: {storeName: store}}).complete(function(err, res){
		if(err){
			if(debugFlag == true){ console.log('io.js: messageSummary: finding store by name: '+err); }
		}else{
			console.log(res);
		}
	});
}
