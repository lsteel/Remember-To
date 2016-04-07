angular
  .module('SettingsController', [
    'appAuth',
  ])
  .controller('SettingsController', [
    '$rootScope',
    'authFuncs',
    '$location',
    '$firebaseAuth',
    function ($rootScope, authFuncs, $location, $firebaseAuth) {

      $rootScope.rsLoading = false;
      var settingsCtrl = this;
      settingsCtrl.show = false;

      (function() {
        authFuncs.isLoggedIn(function(err, data) {
          if (data) {
            settingsCtrl.uid = data.uid;
            settingsCtrl.show = true;
          }
          else if (err) {
            console.log(err);
          }
          else {}
        });
      })();

    },
  ]);
