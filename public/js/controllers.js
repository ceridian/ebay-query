(function(angular){
	'use strict';
	var app = angular.module('message');
	
	app.controller('ViewCtrl', ['$scope', function($scope){
		
	}]);
	
	app.controller('EmailCtrl', ['$scope', function($scope){
		
	}])
	
	app.controller('LoginCtrl', ['$http', '$rootScope', '$location', '$scope', function($http, $rootScope, $location, $scope){
	  $scope.pass = '';
	  $scope.user = '';
	  $scope.login = function(){
	
	    var salt = '$2y$04$STZa7rpdGZI4CK59fwQbMO'
	    var pass = $scope.pass;
	    var user = $scope.user;
	    console.log(user, pass);
	    var hash = TwinBcrypt.hashSync(pass, salt);
	    console.log(hash);
	    $http.post('/login', {user: user, pass: hash}).success(function(data, status, headers, config){
				var status = data.status;
				var user = data.user;
				var group = data.group;
				if(status == 'ok'){
					$rootScope.loggedInUser = user;
					$location.path('/messages');
				}else{
					console.log(status);
				}
			}).error(function(data, status, headers, config) {
	      console.log(data.status);
	    });
	  };
	}]);
	
	//app.controller('notifications', ['$rootScope', 'socket', function($rootScope, socket){
	app.controller('notifications', ['$rootScope', function($rootScope){
		$rootScope.notes = [];
		/*socket.on('alert', function(msg){
			console.log(msg);
			$rootScope.notes.push(msg);
		});*/
	}]);
	
	app.controller('MsgCtrl', ['socket', '$scope', function(socket, $scope){
	  $scope.emails = [];
	  $scope.modalShow = false;
	  socket.emit('messages', {store: 'jakes'});
	  socket.on('messages', function(data){
	    $scope.emails = data.Messages.Message;
	  });
	  socket.on('error', function(err){
	    console.log(err);
	  });
	  socket.on('msgDetail', function(data){
	    var mess = data.Messages.Message;
	    //var m = $('<div>').html(mess.Text).text();
	    //mess.Text = m;
	    var frame = $('#iframe').contents().find('body');
	    frame.append(mess.Text);
	    $scope.selectedEmail = mess;
	    console.log(data);
	    $("#emailModal").modal();
	  });
	
	  $scope.open = function (email) {
	    socket.emit('msgDetail', {store: 'jakes', msgID: email.MessageID});
	  }
	}]);
})(window.angular);		
