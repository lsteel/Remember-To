angular
  .module('MainController', [
    'appUsers',
  ])
  .controller('MainController', [
    '$rootScope',
    '$window',
    '$location',
    'users',
    function ($rootScope, $window, $location, users) {
      var mainCtrl = this;
      $rootScope.rsLoading = true;
      $rootScope.path = $location.path();

      var domain = $window.location.pathname;

      $rootScope.$on("$locationChangeStart", function (event, next, current) {
        $('html, body').animate({
          scrollTop: $('body').offset().top
        }, 750);
        $rootScope.path = next.replace(/^.*\/\/[^\/]+/, '');
        $rootScope.prevPath = current.replace(/^.*\/\/[^\/]+/, '');
        console.log($rootScope.prevPath + ', ' + $rootScope.path);
        $rootScope.rsLoading = true;
      });
    },
  ]);
