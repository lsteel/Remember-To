angular
  .module('appTasks', [])
  .factory('tasks', [
    '$firebaseObject',
    '$firebaseArray',
    function(users, $firebaseObject, $firebaseArray) {

      var tasks = {

        create: function(userID, inputs, cb) {
          var tasksRef = new Firebase("https://remto.firebaseio.com/tasks/");
          var listPushRef = tasksRef.push();
          var fireLists = $firebaseObject(listPushRef);

          var listKey = fireLists.$id;
          fireLists['list-name'] = inputs.name;
          fireLists.users = [inputs.users];
          fireLists.owners = [inputs.users];

          fireLists.$save().then(function() {
            //console.log('List set.');
            return cb(listKey, inputs);
          }, function(error) {
            console.log("Error:", error);
          });
        },

        get: function(userID, cb) {
          tasks.getUserListsSettings(userID, function(userListsSettings) {
            tasks.getUserLists(userID, userListsSettings, function(userLists) {
              cb(userLists);
            });
          });
        },

        getUserListsSettings: function(userID, cb) {
          var userListsSettingsRef = new Firebase("https://remto.firebaseio.com/users/" + userID + "/tasks/");
          var fireUserListsSettings = $firebaseArray(userListsSettingsRef);

          fireUserListsSettings.$loaded().then(function() {
            cb(fireUserListsSettings);
          });
        },

        getUserLists: function(userID, userListsSettings, cb) {
          var i = 0;
          var userLists = [];
          userListsSettings.forEach(function(item, index, array) {
            var listRef = new Firebase("https://remto.firebaseio.com/tasks/" + item.lid);
            var fireList = $firebaseObject(listRef);
            fireList.$loaded().then(function(fireList) {
              userLists[index] = fireList;
              userLists[index].color = userListsSettings[index].color;
              userLists[index].icon = userListsSettings[index].icon;
              userLists[index].lid = userListsSettings[index].lid;
              i++;
              if (i === array.length) {
                cb(userLists);
              }
            });
          });
        }
      };

      return tasks;
    },
  ]);
