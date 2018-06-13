angular.module("myApp")
  .directive("galleryImage", [
    function() {
      return {
        restrict: 'E',
        templateUrl: 'views/gallery_image.tpl.html',
        scope: {
            title: '@',
            url: '@',
            index: '@',
            feed: '=',
            currentImage: '@?'
        },
        link: function(scope) {          
          scope.currIndx = 0;

          scope.setCurrentImage = function() {
            scope.currIndx = scope.index;
            scope.currentImage = scope.feed[scope.currIndx].url;
          }
          scope.prvCurrentImage = function() {
            if (scope.currIndx > 1) {
                scope.currIndx -= 1;
            }
            scope.currentImage = scope.feed[scope.currIndx].url;
          }
     
          scope.nextCurrentImage = function() {
            if (scope.currIndx < scope.feed.length) {
                scope.currIndx += 1;
            }
    
            scope.currentImage = scope.feed[scope.currIndx].url;
          }      
        }
      }
    }
]);