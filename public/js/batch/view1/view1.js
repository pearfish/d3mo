'use strict';

angular.module('batch2.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'js/batch/view1/view1.html', //wow there has to be a shorter way to reference this
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', [function() {

}]);