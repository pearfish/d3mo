/**
 * Created by Alpere on 12/2/2014.
 */
'use strict';

// cat is short for category.  amazing I know


angular.module('batch2.cat', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/cat', {
                controller: 'catCtrl',
                templateUrl: 'miscPartials/cat.html'
            })
            .when('/cat/:job', {
                controller: 'catCtrl',
                templateUrl: 'miscPartials/cat_job.html'
            })
            .when('/cat/:job/:deets', {
                controller: 'catCtrl',
                templateUrl: 'miscPartials/cat_job_deets.html'
            });
    }])


    .controller('catCtrl', [function() {
        //bleh

        var init = function(){
            console.log('quack');
        };
        init();
    }]);