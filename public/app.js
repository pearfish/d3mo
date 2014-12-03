'use strict';

// Declare app level module which depends on views, and components
angular.module('batch2', [
  'ngRoute',
  'batch2.view1',
  'batch2.cat'
]).
    config(['$routeProvider', function($routeProvider) {
      $routeProvider
        //    !!!!!NOTE!!!! there are other routes defined in view1.js and cat.js !!!!ENDNOTE!!!!       //



        /*
         .when('/users/new', {
         controller : 'NewUserCtrl',
         templateUrl : 'views/newuser.html'
         })
         .when('/users/:userId', {
         controller : 'UsersByIdCtrl',
         templateUrl : 'views/userbyid.html'
         })
         .when('/users', {
         controller : 'UsersCtrl',
         templateUrl : 'views/users.html'
         })

         .otherwise({
         controller : 'SpaCtrl',
         templateUrl: 'views/spahome.html'
         })//;
         */
          .otherwise({redirectTo: '/view1'});
    }]);
