angular
  .module('ListsController', [
    'appAuth',
    'appUsers',
  ])
  .controller('ListsController', [
    'authFuncs',
    'users',
    '$location',
    '$firebaseAuth',
    function (authFuncs, users, $location, $firebaseAuth) {
      var listsCtrl = this;

      (function() {
        authFuncs.isLoggedIn(function(err, data) {
          if (data) {
            listsCtrl.uid = data.uid;
          }
          else if (err) {
            console.log(err);
          }
          else {}
        });
      })();

      listsCtrl.signout = function(email, password) {
        return authFuncs.logout();
      };

      listsCtrl.clearEverything = function() {
        return authFuncs.clearAll();
      };


    },
  ]);
