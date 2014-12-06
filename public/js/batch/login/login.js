'use strict';

angular.module('batch2.login', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/login', {
				controller: 'loginCtrl',
				templateUrl: 'js/batch/login/login.html'
			})
	}])


	.controller('loginCtrl', ['$scope', '$location', '$resource', '$http', function(scope, loc, resource, http) {
		//bleh

		scope.path = loc.path();

		scope.submitLogin = function(){
			console.log('submitLogin called, user object= '+scope.user);
			localStorage.setItem('token', scope.user.name+scope.user.pass);
			loc.path('/');
		};

		var init = function(){
			console.log('loginCtrl initialized')
		};
		init();
	}]);