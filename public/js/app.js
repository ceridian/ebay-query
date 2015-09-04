
angular.module('msg', ['bootstrap.ui'])
.controller('EmailCtrl', function($scope, $http, $modal){

  $scope.emails = [];
	$scope.isPopupVisible = false;

  $scope.showPopup = function(email) {
    console.log(email);
    var modalInstance = $modal.open({
      templateUrl: '/temps/email.html',
      controller: 'ModalCtrl',
      resolve: {
        emails: function () {
          return $scope.emails;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
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
}).controller('ModalCtrl', function ($scope, $modalInstance, emails) {

  $scope.emails = emails;
  $scope.selected = {
    item: $scope.emails[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.email);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
