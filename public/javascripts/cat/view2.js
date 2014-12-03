'use strict';

angular.module('batch2.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/cat', {
    templateUrl: '/cat.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', [function() {

}]);


/**
 * Created by Alpere on 12/2/2014.
 */
'use strict';

angular.module('myApp.cats', ['ngRoute'])

    .controller('catCtrl', [function() {
      //bleh

      var init = function(){
        console.log('quack');
      };
      init();
    }]);