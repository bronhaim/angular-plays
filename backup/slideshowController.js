angular.module("myApp").directive("slideshow", [
    function() {
      return {
        restrict: 'E',
        scope: {
        },
        templateUrl: 'slideshow.tpl.html',
      }
    }
  ]);

  function Ctrl($scope, $timeout) {
    $scope.timeInMs = 0;
  
    var countUp = function() {
        $scope.timeInMs+= 500;
        $timeout(countUp, 500);
    }      
}

angular.module("myApp").controller('Ctrl', Ctrl);