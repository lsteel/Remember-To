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
      listsCtrl.loading = true;

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
        longTouch: true,
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

      // lists.getAll(listsCtrl.uid, function(fireLists) {
      //   listsCtrl.userLists = fireLists;
      //   console.log(listsCtrl.userLists);
      //   listsCtrl.userLists = $filter('orderBy')(listsCtrl.userLists, 'sortOrder');
      // });

      function getLists(cb) {
        lists.getAll(listsCtrl.uid, function(fireLists) {
          listsCtrl.userLists = fireLists;
          listsCtrl.userLists = $filter('orderBy')(listsCtrl.userLists, 'sortOrder');
          cb();
        });
      }

      getLists(function() {
        listsCtrl.loading = false;
        listsCtrl.userLists.forEach(function(item, index, array) {
          lists.watchList(item.lid, function(changed) {
            if (changed) {
              getLists(function() {console.log('lists changed and updated.');});
            }
          });
        });
      });

      lists.watchSettings(listsCtrl.uid, function(changed) {
        if (changed) {
          getLists(function() {console.log('lists settings updated.');});
        }
      });

      listsCtrl.signout = function(email, password) {
        return authFuncs.logout();
      };

      listsCtrl.clearEverything = function() {
        return authFuncs.clearAll();
      };


    },
  ]);
