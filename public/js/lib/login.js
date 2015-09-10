var app = angular.module('login', []);

app.controller('LoginCtrl', ['$http', '$scope', function($http, $scope){
  $scope.pass = '';
  $scope.user = '';
  $scope.login = function(){

    var salt = '$2y$04$STZa7rpdGZI4CK59fwQbMO'
    var pass = $scope.pass;
    var user = $scope.user;
    var hash = TwinBcrypt.hashSync(pass, salt);
    $http.get('/login?pass='+hash+'&user='+user, {user: user, pass: pass}).success(function(data, status, headers, config){

    }).error(function(data, status, headers, config) {
      console.log(data.status);
    });
  };
}]);
