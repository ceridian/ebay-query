var lib = require('../lib/lib.js');
var models = require('../models');

module.exports = function(io){
	io.on('connection', function(socket){
		socket.on('messages', function(msg){
			lib.messageSummary('jakes', function(err, data){
				if(err){
					socket.emit('error', error);
				}else{
					socket.emit('messages', data);
				}
			});
		});
	});
}


/*module.exports = {
	messageSummary: function(store){
		models.STORES.findOne({where: {storeName: store}, include: [models.TOKENS]}).then(function(res){
			console.log(res);
		}).catch(function(err){
			if(debugFlag == true){ console.log('io.js: messageSummary: finding store by name: '+err); };
		});
	}
}*/
