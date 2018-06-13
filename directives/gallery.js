angular.module("myApp")
  .directive("mygallery", ['photos', 'PagerService',
    function(photos, PagerService) {
      return {
        restrict: 'E',
        templateUrl: 'views/gallery.tpl.html',
        scope: {          
          displaySearch: '=',
          pagination: '=',
          resultsPerPage: '@',
          sortReverse: '=',
          autoRotateTime: '@'
        },
        link: function(scope) {      
          scope.currentPage = 1;
          scope.feed = [];
          scope.setPage = function(page, resultsPerPage) {
            if (page < 1 || page > scope.pager.totalPages) {
                return;
            }       
            scope.pager = PagerService.GetPager(scope.feed.length, page, parseInt(resultsPerPage));
            scope.items = scope.feed.slice(scope.pager.startIndex, scope.pager.endIndex + 1);
          };

          scope.initController = function() {
            // initialize to page 1
            scope.setPage(1, scope.resultsPerPage);
          };
          
          scope.setResultsCount = function(n) {
            scope.resultsPerPage = n;
            scope.setPage(1, n);
          }                                          

          photos.success(function(data) {
            scope.feed = data
            scope.pager = {};
            scope.setSearch = function(text) {
              scope.searchTitle = text; 
            };
            scope.searchTitle = "";                                   
            scope.sortType = 'title'                        
            scope.currSliderIndx = 0;
            scope.slideImage = scope.feed[0].url;
            scope.sliderFunc = function() {
              scope.currSliderIndx += 1;
              if (scope.currSliderIndx == scope.feed.length) {
                scope.currSliderIndx = 0;
              }
              scope.slideImage = scope.feed[scope.currSliderIndx].url;         
              setTimeout(scope.sliderFunc, 3000);
            };

            setTimeout(scope.sliderFunc, 3000);
            scope.initController();
           });
        }
      }
    }
  ]);

  angular.module("myApp").controller('galleryController', function() {
    // for now we don't need controller at all
    return;
  });