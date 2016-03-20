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
    '$firebaseObject',
    '$filter',
    function (authFuncs, users, lists, $location, $firebaseAuth, $firebaseObject, $filter) {
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


      listsCtrl.dragControlListeners = {
        dragEnd: function() {
          i = 0;
          listsCtrl.userLists.forEach(function(item, index, array) {
            item.sortOrder = index + 1;
            var listRef = new Firebase("https://remto.firebaseio.com/users/" + listsCtrl.uid + "/lists/" + item.userSettingsID );
            var fireList = $firebaseObject(listRef);
            fireList.sortOrder = index + 1;
            fireList.lid = item.lid;
            fireList.doNotDisturb = item.doNotDisturb;
            fireList.color = item.color;
            fireList.icon = item.icon;
            fireList.locations = item.locations;
            fireList.$save().then(function(fireList) {
              i++;
              if (i === array.length) {
              }
            });
          });
        }
      };

      function listsGetAll() {
        lists.getAll(listsCtrl.uid, function(fireLists) {
          listsCtrl.userLists = fireLists;
          console.log(listsCtrl.userLists);
          listsCtrl.userLists = $filter('orderBy')(listsCtrl.userLists, 'sortOrder');
        });
      }

      lists.watch(listsCtrl.uid, false, listsGetAll);

      listsCtrl.signout = function(email, password) {
        return authFuncs.logout();
      };

      listsCtrl.clearEverything = function() {
        return authFuncs.clearAll();
      };


    },
  ]);
