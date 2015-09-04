
angular.module('msg', [])
.controller('EmailCtrl', function($scope, $http){

  $scope.emails = [];
	$scope.isPopupVisible = false;

  $scope.showPopup = function(email) {
      $scope.isPopupVisible = true;
      $scope.selectedEmail = email;
  };

  $scope.closePopup = function() {
      $scope.isPopupVisible = false;
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
});
