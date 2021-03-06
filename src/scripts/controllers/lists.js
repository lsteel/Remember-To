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
      $rootScope.rsLoading = true;
      var listsCtrl = this;
      listsCtrl.show = false;
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

      listsCtrl.clickable = true;


      listsCtrl.dragControlListeners = {
        longTouch: true,
        dragStart: function() {
          listsCtrl.clickable = false;
        },
        dragEnd: function() {
          $timeout(function() {
            listsCtrl.clickable = true;
          }, 500);
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
                $rootScope.rsLoading = false;
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
        $rootScope.rsLoading = true;
        lists.getAll(listsCtrl.uid, function(fireLists) {
          listsCtrl.userLists = fireLists;
          listsCtrl.userLists = $filter('orderBy')(listsCtrl.userLists, 'sortOrder');
          console.log(listsCtrl.userLists);
          listsCtrl.show = true;
          $rootScope.rsLoading = false;
          cb();
        });
      }

      getLists(function() {
        listsCtrl.userLists.forEach(function(item, index, array) {
          lists.watchList(item.lid, function(changed) {
            if (changed) {
              getLists(function() {
                //console.log('lists changed and updated.');
                $rootScope.rsLoading = false;
              });
            }
          });
        });
      });

      userSettings.get(listsCtrl.uid, function(settingsObj) {
        listsCtrl.settings = settingsObj;
        //http://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200
        listsCtrl.gravatarURL = 'http://www.gravatar.com/avatar/' + md5.createHash(listsCtrl.settings.email.trim() || '') + '.jpg?d=' + encodeURIComponent('http://app.remto.xyz/images/remember-to-avatar.jpg');
        //console.log(listsCtrl.settings);
      });

      lists.watchSettings(listsCtrl.uid, function(changed) {
        if (changed) {
          getLists(function() {
            //console.log('lists settings updated.');
          });
        }
      });

      listsCtrl.signout = function(email, password) {
        return authFuncs.logout();
      };

      listsCtrl.clearEverything = function() {
        return authFuncs.clearAll();
      };

      listsCtrl.getNumTasks = function(obj) {
        var taskCount = 0;
        for (var key in obj) {
          if (key !== "__proto__" && !obj[key].completed) {
            taskCount++;
          }
        }
        return taskCount;
      };


    },
  ]);
