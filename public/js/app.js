(function(){
  var app = angular.module('phonecatApp', []);


  app.controller('EmailCtrl', ['$scope' '$http', function($scope, $http){
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
        if(status == 'ok'){
          console.log(data);
          $scope.emails = data.Messages.Message;
        }else{
          console.log(data);
        }
      }).error(function(data, status, headers, config) {
        console.log(data.status);
			});
    }
    this.messages();
	} ]);
});
