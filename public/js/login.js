var app = angular.module('login', []);

app.controller('LoginCtrl', ['$http', '$scope', function($http, $scope){
  $scope.login = function(){

    var salt = '$2y$04$STZa7rpdGZI4CK59fwQbMO'
    var pas = $scope.pass;
    console.log(pas);
    var hash = TwinBcrypt.hashSync(pas, salt);
    console.log(hash);
    $http.post('/login', {user: $scope.user, pass: $scope.pass}).success(function(data, status, headers, config){

    }).error(function(data, status, headers, config) {
      console.log(data.status);
    });
  };
}]);
