var lib = require('../lib/lib.js');
var models = require('../models');

module.exports = function(io){
	io.on('connection', function(socket){
		console.log('connected io');
		socket.on('messages', function(msg){
			lib.messageSummary(msg.store, function(err, data){
				if(err){
					socket.emit('error', error);
				}else{
					socket.emit('messages', data);
				}
			});
		});
		socket.on('msgDetail', function(msg){
			lib.messageDetail(msg.msgID, msg.store, function(err, data){
				if(err){
					socket.emit('error', error);
				}else{
					socket.emit('msgDetail', data);
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
