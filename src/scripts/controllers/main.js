angular
  .module('MainController', [
    'appUsers',
  ])
  .controller('MainController', [
    '$location',
    'users',
    function ($location, users) {
      var mainCtrl = this;
    },
  ]);
