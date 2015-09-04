
angular.module('msg', ['angularModalService'])
.controller('EmailCtrl', function($scope, $http, ModalService){

  $scope.emails = [];
	$scope.isPopupVisible = false;

  $scope.showPopup = function(email) {
    console.log(email);
    ModalService.showModal({
      templateUrl: '/temps/email.html',
      controller: "ModalCtrl"
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(result) {
        $scope.message = "You said " + result;
      });
    });
  };

  $scope.closePopup = function() {

  };

  $scope.messages = function(){
    $http.post('/messages', {store: 'jakes'}).success(function(data, status, headers, config){
      console.log(data);
      console.log(data.Messages.Message);
      $scope.emails = data.Messages.Message;
    }).error(function(data, status, headers, config) {
      console.log(data);
		});
  }
  $scope.messages();
}).controller('ModalCtrl', function($scope, close){
  $scope.close = function(result) {
   	close(result, 500); // close, but give 500ms for bootstrap to animate
   };
});
