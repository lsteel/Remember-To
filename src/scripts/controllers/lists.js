angular
  .module('ListsController', [
    'appAuth',
    'list',
  ])
  .controller('ListsController', [
    'authFuncs',
    'lists',
    '$location',
    '$firebaseAuth',
    function (authFuncs, lists, $location, $firebaseAuth) {
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

      listsCtrl.createList = function() {
        return lists.create(listsCtrl.uid);
      };


    },
  ]);
