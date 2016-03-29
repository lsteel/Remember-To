angular
.module('LoginController', [
  'appAuth',
])
.controller('LoginController', [
  'authFuncs',
  '$location',
  '$firebaseAuth',
  function (authFuncs, $location, $firebaseAuth) {
    var loginCtrl = this;

    (function() {
      authFuncs.isLoggedIn();
    })();

    loginCtrl.inputType = 'signin';

    loginCtrl.submit = function(email, password) {
      loginCtrl.errorMessage = null;

      loginCtrl[loginCtrl.inputType](email, password, function(err, userData) {
        if (err.message) {
          loginCtrl.errorMessage = err.message;
        }
        else if (err) {
          loginCtrl.errorMessage = err;
        }
      });
    };

    loginCtrl.signin = function(email, password, cb) {
      return authFuncs.login(email, password, cb);
    };

    loginCtrl.signup = function(email, password, cb) {
      return authFuncs.create(email, password, cb);
    };
    loginCtrl.forgot = function(email, password, cb) {
      return authFuncs.resetPass(email, cb);
    };
  },
]);
