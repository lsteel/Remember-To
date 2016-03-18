angular
  .module('ListsController', [
    'appAuth',
    'appUsers',
    'appLists',
  ])
  .controller('ListsController', [
    'authFuncs',
    'users',
    'lists',
    '$location',
    '$firebaseAuth',
    "$timeout",
    function (authFuncs, users, lists, $location, $firebaseAuth, $timeout) {
      var listsCtrl = this;

      listsCtrl.userLists = [];

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


      lists.getAll(listsCtrl.uid, function(fireLists) {
        listsCtrl.userLists = fireLists;
        console.log(listsCtrl.userLists);
      });




      listsCtrl.signout = function(email, password) {
        return authFuncs.logout();
      };

      listsCtrl.clearEverything = function() {
        return authFuncs.clearAll();
      };


    },
  ]);
