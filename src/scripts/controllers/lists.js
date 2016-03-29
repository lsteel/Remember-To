angular
  .module('ListsController', [
    'appAuth',
    'appSettings',
    'appUsers',
    'appLists',
  ])
  .controller('ListsController', [
    '$rootScope',
    'md5',
    'authFuncs',
    'users',
    'userSettings',
    'lists',
    '$timeout',
    '$location',
    '$firebaseAuth',
    '$firebaseObject',
    '$filter',
    function ($rootScope, md5, authFuncs, users, userSettings, lists, $timeout, $location, $firebaseAuth, $firebaseObject, $filter) {
      var listsCtrl = this;
      $rootScope.loading = true;

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
          $rootScope.loading = true;
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
                $rootScope.loading = false;
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
        listsCtrl.userLists.forEach(function(item, index, array) {
          lists.watchList(item.lid, function(changed) {
            if (changed) {
              getLists(function() {console.log('lists changed and updated.');});
            }
          });
        });
      });

      userSettings.get(listsCtrl.uid, function(settingsObj) {
        listsCtrl.settings = settingsObj;
        //http://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200
        listsCtrl.gravatarURL = 'http://www.gravatar.com/avatar/' + md5.createHash(listsCtrl.settings.email.trim() || '') + '.jpg';
        console.log(listsCtrl.settings);
      });

      lists.watchSettings(listsCtrl.uid, function(changed) {
        if (changed) {
          $rootScope.loading = true;
          getLists(function() {
            console.log('lists settings updated.');
            $rootScope.loading = false;
          });
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
