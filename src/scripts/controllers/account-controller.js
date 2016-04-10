angular
  .module('AccountController', [
    'appAuth',
    'appSettings',
  ])
  .controller('AccountController', [
    '$rootScope',
    'authFuncs',
    'userSettings',
    '$location',
    '$firebaseAuth',
    function ($rootScope, authFuncs, userSettings, $location, $firebaseAuth) {

      $rootScope.rsLoading = false;
      var accountCtrl = this;
      accountCtrl.show = false;

      accountCtrl.emailInputs = {
        oldEmail: '',
        newEmail: '',
        password: ''
      };

      accountCtrl.passwordInputs = {
        email: '',
        oldPassword: '',
        newPassword: ''
      };

      (function() {
        authFuncs.isLoggedIn(function(err, data) {
          if (data) {
            accountCtrl.uid = data.uid;
            accountCtrl.show = true;
          }
          else if (err) {
            console.log(err);
          }
          else {}
        });
      })();

      userSettings.get(accountCtrl.uid, function(settings) {
        accountCtrl.settings = settings;
        accountCtrl.name = accountCtrl.settings.name;
        accountCtrl.emailInputs.oldEmail = accountCtrl.settings.email;
        accountCtrl.passwordInputs.email = accountCtrl.settings.email;
        console.log(accountCtrl.settings);
      });

      accountCtrl.logout = function() {
        authFuncs.logout(function() {
          $location.url('/');
        });
      };

    },
  ]);
