angular
  .module('LogoutController', [
    'appAuth',
  ])
  .controller('LogoutController', [
    'authFuncs',
    '$location',
    function (authFuncs, $location) {
      var logoutCtrl = this;

    },
  ]);
