angular
  .module('TasksController', [
    'appAuth',
    'appUsers',
  ])
  .controller('TasksController', [
    'authFuncs',
    'users',
    '$location',
    '$firebaseAuth',
    function (authFuncs, users, $location, $firebaseAuth) {
      var tasksCtrl = this;

      (function() {
        authFuncs.isLoggedIn(function(err, data) {
          if (data) {
            tasksCtrl.uid = data.uid;
          }
          else if (err) {
            console.log(err);
          }
          else {}
        });
      })();

      tasksCtrl.signout = function(email, password) {
        return authFuncs.logout();
      };

      tasksCtrl.clearEverything = function() {
        return authFuncs.clearAll();
      };


    },
  ]);
