angular
  .module('MainController', [
    'appUsers',
  ])
  .controller('MainController', [
    '$window',
    '$location',
    'users',
    function ($window, $location, users) {
      var mainCtrl = this;

      mainCtrl.minHeight = $window.innerHeight;
    },
  ]);
