angular.module('ui.bootstrap.demo', ['ngAnimate', 'ui.bootstrap']);
angular.module('ui.bootstrap.demo').controller('MsgCtrl', function ($scope, $modal, $log, $http) {

  $scope.emails = [];

  $scope.open = function (email) {
    $http.post('/messages', {store: 'jakes'}).success(function(data, status, headers, config){
      console.log(data);
      $scope.emails = data.Messages.Message;
      var modalInstance = $modal.open({
        templateUrl: '/temps/modal.html',
        controller: 'ModalInstanceCtrl',
        size: 'lg',
        resolve: {
          email: function () {
            return data;
          }
        }
      });
      modalInstance.result.then(function (selectedItem) {
        console.log('done with email');
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    }
    }).error(function(data, status, headers, config) {
      var modalInstance = $modal.open({
        templateUrl: '/temps/error.html',
        controller: 'ModalInstanceCtrl',
        size: 'lg',
        resolve: {
          email: function () {
            return data;
          }
        }
      });
		});
  }

  $scope.messages = function(){
    $http.post('/messages', {store: 'jakes'}).success(function(data, status, headers, config){
      console.log(data);
      $scope.emails = data.Messages.Message;
    }).error(function(data, status, headers, config) {
      console.log(data);
		});
  }
  $scope.emails = $scope.messages();
});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

angular.module('ui.bootstrap.demo').controller('ModalInstanceCtrl', function ($scope, $modalInstance, email) {
  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
