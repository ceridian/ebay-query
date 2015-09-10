(function(angular){
	'use strict';
angular.module('message', ['ngRoute', 'ngAnimate'])
	.config(['$routeProvider', '$locationProvider', function($routeProvider){
		$routeProvider
			.when('/', {
				redirectTo: '/login'
			})
			.when('/login', {
				templateUrl: 'temps/login.html',
				controller: 'LoginCtrl',
			})
			.when('/messages', {
				templateUrl: 'temps/email.html',
				controller: 'EmailCtrl',
				controllerAs: 'email'
			})
			.otherwise({
				redirectTo: '/login'
			});

	}]);
})(window.angular);