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

      $rootScope.$on("$locationChangeStart", function (event, next, current) {
        $rootScope.path = $location.path();
        $rootScope.rsLoading = true;
      });
    },
  ]);
