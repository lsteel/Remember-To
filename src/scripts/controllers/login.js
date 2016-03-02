angular
.module('LoginController', [
  'appAuth',
])
.controller('LoginController', [
  'auth',
  '$location',
  function (auth, $location) {
    var loginCtrl = this;

    (function() {
      auth.isLoggedIn();
    })();

    loginCtrl.inputType = 'signin';

    loginCtrl.submit = function(email, password) {
      loginCtrl.errorMessage = null;

      loginCtrl[loginCtrl.inputType](email, password);
    };

    loginCtrl.signin = function(email, password) {
      return auth.loginCtrl(email, password);
    };

    loginCtrl.signup = function(email, password) {
      return auth.create(email, password);
    };
    return loginCtrl;
  },
]);
