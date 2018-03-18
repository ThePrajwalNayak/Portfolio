'use strict'


angular.module('TheNayakNews').controller('navController', ['$scope', '$location', function ($scope, $location) {
  $scope.isCurrentPath = function (path) {
    return $location.path() == path;
  };

}]);
