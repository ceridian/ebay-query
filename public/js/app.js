
angular.module('msg', ['ui.bootstrap'])
.controller('EmailCtrl', function($scope, $http, $modal){

  $scope.emails = [];
	$scope.isPopupVisible = false;

  $scope.showPopup = function(email) {
    console.log(email);
    $scope.selectedEmail = email;
    //$scope.isPopupVisible = true;
    //$scope.selectedEmail = email;
    var modalInstance = $modal.open({
      templateUrl: '../temps/email.html',
      controller: 'ModalCtrl',
      size: 'lg',
      resolve: {

      }
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
}).controller('ModalCtrl', function($scope, $modalInstance){
  $scope.ok = function () {
    $modalInstance.close();
  };
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
