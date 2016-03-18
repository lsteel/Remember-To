angular
  .module('appLists', [
    'appUsers',
  ])
  .factory('lists', [
    'users',
    '$firebaseObject',
    '$firebaseArray',
    function(users, $firebaseObject, $firebaseArray) {

      var lists = {

        create: function(userID, inputs, cb) {
          var listsRef = new Firebase("https://remto.firebaseio.com/lists/");
          var listPushRef = listsRef.push();
          var fireLists = $firebaseObject(listPushRef);

          var listKey = fireLists.$id;
          fireLists.listName = inputs.name;
          fireLists.users = [inputs.users];
          fireLists.owners = [inputs.users];

          fireLists.$save().then(function() {
            //console.log('List set.');
            return cb(listKey, inputs);
          }, function(error) {
            console.log("Error:", error);
          });
        },

        getSingle: function(userID, lid, cb) {
          lists.getSingleSettings(userID, lid, function(listSettings, lid) {
            var list = {};
            var listRef = new Firebase("https://remto.firebaseio.com/lists/" + lid);
            var fireList = $firebaseObject(listRef);
            fireList.$loaded().then(function(fireList) {
              list = fireList;
              list.color = listSettings[0].color;
              list.icon = listSettings[0].icon;
              list.lid = listSettings[0].lid;
              list.userSettingsID = listSettings[0].$id;
              cb(list);
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
          userListsSettings.forEach(function(item, index, array) {
            var listRef = new Firebase("https://remto.firebaseio.com/lists/" + item.lid);
            var fireList = $firebaseObject(listRef);
            fireList.$loaded().then(function(fireList) {
              userLists[index] = fireList;
              userLists[index].color = userListsSettings[index].color;
              userLists[index].icon = userListsSettings[index].icon;
              userLists[index].lid = userListsSettings[index].lid;
              userLists[index].userSettingsID = userListsSettings[index].$id;
              i++;
              if (i === array.length) {
                cb(userLists);
              }
            });
          });
        }
      };

      return lists;
    },
  ]);
