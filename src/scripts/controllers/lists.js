angular
.module('ListsController', [
  'appAuth',
])
.controller('ListsController', [
  'auth',
  '$location',
  function (auth, $location) {
    var listsCtrl = this;

    (function() {
      auth.isLoggedIn();
    })();

    listsCtrl.signout = function(email, password) {
      console.log('logout button pressed.');
      return auth.logout();
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
    //   return auth.login(email, password);
    // };
    //
    // listsCtrl.signup = function(email, password) {
    //   return auth.create(email, password);
    // };
    // return listsCtrl;
  },
]);
