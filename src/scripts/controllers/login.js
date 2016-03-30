angular
  .module('LoginController', [
    'appAuth',
  ])
  .controller('LoginController', [
    '$rootScope',
    'authFuncs',
    '$location',
    '$firebaseAuth',
    function ($rootScope, authFuncs, $location, $firebaseAuth) {
      $rootScope.rsLoading = true;
      var loginCtrl = this;
      loginCtrl.show = false;
      loginCtrl.passwordType = "password";
      loginCtrl.inputType = 'signin';

      (function() {
        authFuncs.isLoggedIn(function(err, data) {
          loginCtrl.show = true;
          $rootScope.rsLoading = false;
        });
      })();

      loginCtrl.submit = function(email, password, remember) {
        loginCtrl.errorMessage = null;
        console.log(remember);

        loginCtrl[loginCtrl.inputType](email, password, remember, function(err, userData) {
          var emailError = 'Firebase.authWithPassword failed: First argument must contain the key "email" with type "string"';
          var passError = 'Firebase.authWithPassword failed: First argument must contain the key "password" with type "string"';
          var wrongPass = 'The specified password is incorrect.';
          var noUser = 'The specified user does not exist.';
          var errorMessage;
          var messageAlert;

          if (err.message) {
            errorMessage = err.message;
          }
          else if (err) {
            errorMessage = err;
          }
          else {}

          if (errorMessage === emailError || errorMessage === passError) {
            messageAlert = 'An email address and password are required to login.';
          }
          else if (errorMessage === wrongPass) {
            messageAlert = 'That password seems to be incorrect. Fancy another go?';
          }
          else if (errorMessage === noUser) {
            messageAlert = "I can't find an account with that email address. Is it spelled correctly?";
          }
          else {
            //messageAlert = "Well, this is awkward. I'm not really sure what went wrong.";
          }
          loginCtrl.errorMessage = messageAlert;
        });
      };

      loginCtrl.signin = function(email, password, remember, cb) {
        return authFuncs.login(email, password, remember, cb);
      };

      loginCtrl.signup = function(email, password, remember, cb) {
        return authFuncs.create(email, password, cb);
      };
      loginCtrl.forgot = function(email, password, cb) {
        return authFuncs.resetPass(email, cb);
      };

      loginCtrl.switchInputType = function() {
        if (loginCtrl.passwordType === "password") {
          loginCtrl.passwordType = "text";
        }
        else {
          loginCtrl.passwordType = "password";
        }
      };
    },
  ]);
