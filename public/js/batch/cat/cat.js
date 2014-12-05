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
                templateUrl: 'js/batch/cat/cat.html'
            })
            .when('/cat/:job', {
                controller: 'catCtrl',
                templateUrl: 'js/batch/cat/cat_job.html'
            })
            .when('/cat/:job/:deets', {
                controller: 'catCtrl',
                templateUrl: 'js/batch/cat/cat_job_deets.html'
            });
    }])


    .controller('catCtrl', ['$scope', '$location', '$resource', '$http', function(scope, loc, resource, http) {
        //bleh

        scope.path = loc.path();

        //jobs will eventually be populated by schedResource...hopefully
        scope.jobs = [
            {
                name: 'job1',
                status: 'good'
            },
            {
                name: 'job2',
                status: 'bad'
            },
            {
                name: 'job3',
                status: 'oh, just Fantastic'
            },
            {
                name: 'job4',
                status: 'eh'
            }
        ];

        var schedResource = resource(
            'http://localhost:8090/schedules',
            {
                callback: "JSON_CALLBACK"
            },
            {
                getFriends: {
                    method: "JSONP",
                    isArray: true
            }
        });



        var init = function(){
            console.log('attempting to fetch data, quack quack');
            schedResource.get(function(profiles){
                scope.theStuff = profiles;
            });
        };
        init();
    }]);