angular
.module('ListsController', [
  'appAuth',
])
.controller('ListsController', [
  'authFuncs',
  '$location',
  '$firebaseAuth',
  function (authFuncs, $location, $firebaseAuth) {
    var listsCtrl = this;

    (function() {
      authFuncs.isLoggedIn();
    })();

    listsCtrl.signout = function(email, password) {
      return authFuncs.logout();
    };
  },
]);
