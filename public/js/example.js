var app = angular.module('ui.bootstrap.demo', ['ngAnimate', 'ui.bootstrap']);

app.factory('socket', ['$rootScope', function ($rootScope) {
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
}]);


app.controller('MsgCtrl', ['socket', '$modal', '$scope', function(socket, $modal, $scope){
  $scope.emails = [];
  socket.emit('messages', {store: 'jakes'});
  socket.on('messages', function(data){
    $scope.emails = data.Messages.Message
  });
  socket.on('error', function(err){
    console.log(err);
  });
  socket.on('msgDetail', function(data){
    console.log(data);
    var modalInstance = $modal.open({
      templateUrl: '/temps/modal.html',
      controller: 'ModalInstanceCtrl',
      size: 'lg',
      scope: $scope
      /*resolve: {
        email: function () {
          return $scope.data;
        }
      }*/
    });
    modalInstance.result.then(function (selectedItem) {
      console.log('done with email');
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  //}).error(function(data, status, headers, config) {
  });

  $scope.open = function (email) {
    console.log(email);
    //$http.post('/msgDetail', {store: 'jakes', msgID: email.MessageID}).success(function(data, status, headers, config){
    socket.emit('msgDetail', {store: 'jakes', msgID: email.MessageID});
  }
}]);

app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, email) {
  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
