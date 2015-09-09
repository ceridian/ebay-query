var app = angular.module('message', []);

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
    var frame = $('#iframe').contents().find('html');
    frame.append(mess.Text);
    $scope.selectedEmail = mess;
    console.log(data);
    $("#emailModal").modal();
  });

  $scope.open = function (email) {
    socket.emit('msgDetail', {store: 'jakes', msgID: email.MessageID});
  }
}]);
