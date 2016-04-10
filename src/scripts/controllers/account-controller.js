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

      accountCtrl.errorMessage = null;

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

      accountCtrl.deleteAccountInputs = {
        email: '',
        oldPassword: '',
        newPassword: 'asdfasdfasdfasdf'
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
        accountCtrl.deleteAccountInputs.email = accountCtrl.settings.email;
        console.log(accountCtrl.settings);
      });

      accountCtrl.saveName = function(nameString) {
        $rootScope.rsLoading = true;
        userSettings.update(accountCtrl.uid, 'name', nameString, function() {
          console.log('user settings name updated successfully');
          $location.url('/settings');
        });
      };
      accountCtrl.newEmail = function(credObj) {
        accountCtrl.errorMessage = null;
        $rootScope.rsLoading = true;
        userSettings.updateEmail(accountCtrl.uid, credObj, function(error) {
          if (error) {
            accountCtrl.emailInputs.password = '';
            accountCtrl.errorMessage = 'password incorrect';
            $rootScope.rsLoading = false;
          }
          else {
            console.log('user settings email updated successfully');
            $location.url('/settings');
          }
        });
      };
      accountCtrl.newPassword = function(credObj) {
        accountCtrl.errorMessage = null;
        $rootScope.rsLoading = true;
        userSettings.updatePassword(accountCtrl.uid, credObj, function(error) {
          if (error) {
            accountCtrl.passwordInputs.oldPassword = '';
            accountCtrl.passwordInputs.newPassword = '';
            accountCtrl.errorMessage = 'password incorrect';
            $rootScope.rsLoading = false;
          }
          else {
            $location.url('/settings');
          }
        });
      };
      accountCtrl.deleteAccount = function(credObj) {
        accountCtrl.errorMessage = null;
        $rootScope.rsLoading = true;
        userSettings.updatePassword(accountCtrl.uid, credObj, function(error) {
          if (error) {
            accountCtrl.deleteAccountInputs.oldPassword = '';
            accountCtrl.errorMessage = 'password incorrect';
            $rootScope.rsLoading = false;
          }
          else {
            credObj = {
              'email': credObj.email,
              'password': credObj.newPassword
            };
            userSettings.deleteAccount(accountCtrl.uid, credObj, function() {
              console.log('completed');
              $location.url('/');
            });
          }
        });
      };

    },
  ]);
