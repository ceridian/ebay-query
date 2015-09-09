var app = angular.module('login', []);

app.controller('LoginCtrl', ['$http', '$scope', function($http, $scope){
  this.login = function(main){
    var user = main.user;
    var pass = main.pass;
    var salt = genSalt(4);
    console.log(salt);
    $http.post('/login', {user: user, pass: pass}).success(function(data, status, headers, config){

    }).error(function(data, status, headers, config) {
      console.log(data.status);
    });
  };
}]);
