angular.module("myApp").directive("mygallery", [
    function() {
      return {
        restrict: 'E',
        scope: {
        },
        templateUrl: 'views/gallery.tpl.html',
      }
    }
  ]);

  angular.module("myApp").controller('galleryController', function() {
    return;
  });