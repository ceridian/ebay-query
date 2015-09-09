var app = angular.module('login', []);

app.controller('LoginCtrl', ['$http', '$scope', function($http, $scope){
  $scope.login = function(){

    var salt = genSalt(4);
    console.log(salt);
    $http.post('/login', {user: $scope.user, pass: $scope.pass}).success(function(data, status, headers, config){

    }).error(function(data, status, headers, config) {
      console.log(data.status);
    });
  };
}]);
