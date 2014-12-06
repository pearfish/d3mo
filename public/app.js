'use strict';

// Declare app level module which depends on views, and components
angular.module('batch2', [
    'ngRoute',
    'batch2.view1',
    'batch2.cat',
    'batch2.login',
    'ngResource'

])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
        //    !!!!!NOTE!!!! there are other routes defined in view1.js and cat.js !!!!ENDNOTE!!!!       //
        .when('/', {
            templateUrl : 'js/views/home.html'
        })


        /*
         .when('/', {
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
          .otherwise({redirectTo: '/login'});
        //TODO: make a faux 404 'shame on you' page
    }])

    .run(['$rootScope', '$location', '$http', function($rootScope, $loc, $http){
        //TODO - in future, flesh out rootScope.token into a more full user object or whatevs
        console.log('run begin');

        $rootScope.token = localStorage.getItem('token') || undefined;

        if ($rootScope.token) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.token;
        }

        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            console.log($rootScope.token);

            var checkToken = localStorage.getItem('token') || false;

            //if ($loc.path() !== '/login' && !$rootScope.token ) {
            if($loc.path() !== '/login' && !checkToken){
                console.log('user not validated- redirecting...');
                $loc.path('/login');
            }
        });
    }])
;
