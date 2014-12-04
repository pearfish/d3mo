'use strict';

angular.module('batch2.login', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/login', {
				controller: 'loginCtrl',
				templateUrl: 'javascripts/batch/login/login.html'
			})
	}])


	.controller('loginCtrl', ['$scope', '$location', '$resource', '$http', function(scope, loc, resource, http) {
		//bleh

		scope.path = loc.path();

		var init = function(){
			console.log('loginCtrl initialized')
		};
		init();
	}]);