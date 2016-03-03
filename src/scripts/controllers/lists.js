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

    // listsCtrl.inputType = 'signin';
    //
    // listsCtrl.submit = function(email, password) {
    //   listsCtrl.errorMessage = null;
    //
    //   listsCtrl[listsCtrl.inputType](email, password);
    // };
    //
    // listsCtrl.signin = function(email, password) {
    //   return authFuncs.login(email, password);
    // };
    //
    // listsCtrl.signup = function(email, password) {
    //   return authFuncs.create(email, password);
    // };
    // return listsCtrl;
  },
]);
