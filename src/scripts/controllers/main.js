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

      $rootScope.loading = true;

      $rootScope.$on('$routeChangeStart', function () {
        $rootScope.loading = true;
      });
    },
  ]);
