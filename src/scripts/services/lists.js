angular
.module('appLists', [
  'appUsers',
  'appTasks',
])
.factory('lists', [
  'users',
  'tasks',
  '$firebaseObject',
  '$firebaseArray',
  function(users, tasks, $firebaseObject, $firebaseArray) {

    var lists = {

      watchList: function(lid, cb) {
        var watchListsRef = new Firebase("https://remto.firebaseio.com/lists/" + lid);
        var watchListsArr = $firebaseArray(watchListsRef);
        watchListsArr.$watch(function() {
          cb(true);
        });
      },

      watchSettings: function(uid, cb) {
        var watchListsRef = new Firebase("https://remto.firebaseio.com/users/" + uid + '/lists/');
        var watchListsArr = $firebaseArray(watchListsRef);
        watchListsArr.$watch(function() {
          cb(true);
        });
      },

      create: function(userID, inputs, cb) {
        var listsRef = new Firebase("https://remto.firebaseio.com/lists/");
        var listPushRef = listsRef.push();
        var fireLists = $firebaseObject(listPushRef);

        var listKey = fireLists.$id;
        fireLists.listName = inputs.name.trim().toLowerCase();
        fireLists.users = [inputs.users];
        fireLists.owners = [inputs.users];

        fireLists.$save().then(function() {
          return cb(listKey, inputs);
        }, function(error) {
          console.log("Error:", error);
        });
      },

      update: function(lid, inputs, cb) {
        var listRef = new Firebase("https://remto.firebaseio.com/lists/" + lid);
        var fireList = $firebaseObject(listRef);
        fireList.$loaded().then(function() {
          fireList.listName = inputs.name.trim().toLowerCase();
          fireList.users = inputs.users;
          fireList.owners = inputs.users;
          cb();
          fireList.$save().then(function() {
          });
        });

        // var fireList = $firebaseObject(listRef);
        //
        // fireList.listName = inputs.name;
        // fireList.users = inputs.users;
        // fireList.owners = inputs.users;
        // fireList.tasks = fireList.tasks || null;
        //
        // fireList.$save().then(function() {
        //   //console.log('List set.');
        //   return cb();
        // }, function(error) {
        //   console.log("Error:", error);
        // });
      },

      delete: function(userID, lid, lsid, cb) {
        lists.deleteSettings(userID, lid, lsid, function(lid) {
          var listRef = new Firebase("https://remto.firebaseio.com/lists/" + lid);
          var fireList = $firebaseObject(listRef);
          fireList.$remove().then(function() {
            cb();
          });
        });
      },

      deleteSettings: function(userID, lid, lsid, cb) {
        var userListsSettingsRef = new Firebase("https://remto.firebaseio.com/users/" + userID + "/lists/" + lsid);
        var fireUserListsSettings = $firebaseObject(userListsSettingsRef);

        fireUserListsSettings.$remove().then(function() {
          cb(lid);
        });
      },

      getSingle: function(userID, lid, cb) {
        lists.getSingleSettings(userID, lid, function(listSettings, lid) {
          var list = {};
          var listRef = new Firebase("https://remto.firebaseio.com/lists/" + lid);
          var fireList = $firebaseObject(listRef);
          fireList.$loaded().then(function(fireList) {
            if (fireList.$value === null) {
              cb(null);
            }
            else {
              list = fireList;
              list.doNotDisturb = listSettings[0].doNotDisturb;
              list.location = listSettings[0].location;
              list.color = listSettings[0].color;
              list.icon = listSettings[0].icon;
              list.lid = listSettings[0].lid;
              list.sortOrder = listSettings[0].sortOrder;
              list.userSettingsID = listSettings[0].$id;
              cb(list);
            }
          });
        });
      },

      getSingleSettings: function(userID, lid, cb) {
        var userListsSettingsRef = new Firebase("https://remto.firebaseio.com/users/" + userID + "/lists/");
        var fireUserListsSettings = $firebaseArray(userListsSettingsRef);

        fireUserListsSettings.$loaded().then(function() {
          function isList(obj) {
            return obj.lid == lid;
          }
          var singleListSettings = fireUserListsSettings.filter(isList);
          cb(singleListSettings, lid);
        });
      },

      getAll: function(userID, cb) {
        lists.getUserListsSettings(userID, function(userListsSettings) {
          lists.getUserLists(userID, userListsSettings, function(userLists) {
            cb(userLists);
          });
        });
      },

      getUserListsSettings: function(userID, cb) {
        var userListsSettingsRef = new Firebase("https://remto.firebaseio.com/users/" + userID + "/lists/");
        var fireUserListsSettings = $firebaseArray(userListsSettingsRef);

        fireUserListsSettings.$loaded().then(function() {
          cb(fireUserListsSettings);
        });
      },

      getUserLists: function(userID, userListsSettings, cb) {
        var i = 0;
        var userLists = [];
        if (userListsSettings.length === 0) {
          cb(userLists);
          return;
        }
        userListsSettings.forEach(function(item, index, array) {
          var listRef = new Firebase("https://remto.firebaseio.com/lists/" + item.lid);
          var fireList = $firebaseObject(listRef);
          fireList.$loaded().then(function(fireList) {
            userLists[index] = fireList;
            userLists[index].color = userListsSettings[index].color;
            userLists[index].icon = userListsSettings[index].icon;
            userLists[index].lid = userListsSettings[index].lid;
            userLists[index].doNotDisturb = userListsSettings[index].doNotDisturb;
            userLists[index].locations = userListsSettings[index].locations || null;
            userLists[index].userSettingsID = userListsSettings[index].$id;
            userLists[index].sortOrder = userListsSettings[index].sortOrder;
            i++;
            if (i === array.length) {
              cb(userLists);
            }
          }).catch(function(error) {
            console.error("Error:", error);
          });
        });
      }
    };

    return lists;
  },
]);
