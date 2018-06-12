angular.module("myApp").directive("mypagenation", [
    function() {
      return {
        restrict: 'E',
        scope: {
        },
        templateUrl: 'views/pagenation.tpl.html',
      }
    }
  ]);
angular.module("myApp").factory('PagerService', PagerService);

angular.module("myApp").factory('photos', ['$http', function($http) {
  return $http.get('http://localhost:8000/assests/pics.json')
         .success(function(data) {
           return data;
         })
         .error(function(data) {
           alert('Failed to fetch pictures from server');
         });
}]);

angular.module("myApp").directive('errSrc', function() {
  return {
    link: function(scope, element, attrs) {
      element.bind('error', function() {
        if (attrs.src != attrs.errSrc) {
          attrs.$set('src', attrs.errSrc);
        }
      });
    }
  }
});

angular.module("myApp").controller('pageController', function(PagerService, photos) {
    var vm = this;
    
    vm.displaySearch = true;
    vm.pagination = true;
    vm.resultsPerPage = 10;
    
    vm.sorting = true;
    vm.autoRotateTime = 4;
    vm.currentPage = 1;
    vm.currentImage = "http://www.bane-tech.com/wp-content/uploads/2015/10/C.png";
    vm.feeds = [];
      
    photos.success(function(data) {
      vm.feeds = data
      vm.pager = {};
      vm.setSearch = searchFunc;
      vm.searchTitle = "";
      vm.setPage = setPage;
      vm.setResultsCount = setResultsCount
      vm.setCurrentImage = setCurrentImage
      vm.nextCurrentImage = nextCurrentImage
      vm.prvCurrentImage = prvCurrentImage
      vm.resultsPerPage  = 5
      vm.sortType = 'title'
      vm.sortReverse = false;
      vm.currIndx = 0;
      vm.currSliderIndx = 0;
      vm.slideImage = vm.feeds[0].url;
      vm.sliderFunc = function() {
        vm.currSliderIndx += 1;
        if (vm.currSliderIndx == vm.feeds.length) {
            vm.currSliderIndx = 0;
        }
        vm.slideImage = vm.feeds[vm.currSliderIndx].url;         
        setTimeout(vm.sliderFunc, 3000);
      }

      setTimeout(vm.sliderFunc, 3000);
      initController();
    });

    function prvCurrentImage() {
        if (vm.currIndx > 1) {
            vm.currIndx -= 1;
        }
        vm.currentImage = vm.feeds[vm.currIndx].url;
    }
 
    function nextCurrentImage() {
        if (vm.currIndx < vm.feeds.length) {
            vm.currIndx += 1;
        }

        vm.currentImage = vm.feeds[vm.currIndx].url;
    }
    function searchFunc(text) {
        vm.searchTitle = text; 
    }

    function initController() {
        // initialize to page 1
        vm.setPage(1, vm.resultsPerPage);
    }
 
    function setCurrentImage(i) {
      vm.currIndx = i;
      vm.currentImage = vm.feeds[vm.currIndx].url;
    }
    
    function setResultsCount(n) {
      vm.resultsPerPage = n;
      vm.setPage(1, n);
    }
    
    function setPage(page, resultsPerPage) {
        if (page < 1 || page > vm.pager.totalPages) {
            return;
        }
 
        // get pager object from service
        vm.pager = PagerService.GetPager(vm.feeds.length, page, resultsPerPage);
 
        // get current page of items
        vm.items = vm.feeds.slice(vm.pager.startIndex, vm.pager.endIndex + 1);
    }
});

function PagerService() {
    // service definition
    var service = {};
 
    service.GetPager = GetPager;
 
    return service;
 
    // service implementation
    function GetPager(totalItems, currentPage, pageSize) {
        // default to first page
        currentPage = currentPage || 1;
 
        // default page size is 3
        pageSize = pageSize || 3;
 
        // calculate total pages
        var totalPages = Math.ceil(totalItems / pageSize);
 
        var startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }
 
        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
 
        // create an array of pages to ng-repeat in the pager control
        var pages = _.range(startPage, endPage + 1);
 
        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
}

