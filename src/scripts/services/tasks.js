angular
.module('appTasks', [])
.factory('tasks', [
  '$firebaseObject',
  '$firebaseArray',
  function($firebaseObject, $firebaseArray) {

    var tasks = {

      create: function(inputs, lid, cb) {
        var tasksRef = new Firebase("https://remto.firebaseio.com/lists/" + lid + "/tasks/");
        var fireTasks = $firebaseArray(tasksRef);

        var task = {
          'name': inputs.name.trim().toLowerCase(),
          'star': inputs.star,
          'completed': false
        };

        fireTasks.$add(task).then(function(ref) {
          var taskKey = ref.key();
          tasksRef.child(taskKey).child('tid').set(taskKey);
          return cb(taskKey, inputs);
        }, function(error) {
          console.log("Error:", error);
        });
      },

      delete: function(lid, tid, cb) {
        var taskRef = new Firebase("https://remto.firebaseio.com/lists/" + lid + "/tasks/" + tid);
        var fireTask = $firebaseObject(taskRef);

        fireTask.$remove().then(function(ref) {
          cb(lid);
        }, function(error) {
          console.log("Error:", error);
        });
      },

      watchTask: function(lid, tid, cb) {
        var taskRef = new Firebase("https://remto.firebaseio.com/lists/" + lid + "/tasks/" + tid);
        var fireTask = $firebaseObject(taskRef);
        fireTask.$watch(function() {
          cb(true);
        });
      },

      getSingle: function(lid, tid, cb) {
        var taskRef = new Firebase("https://remto.firebaseio.com/lists/" + lid + "/tasks/" + tid);
        var fireTask = $firebaseObject(taskRef);

        fireTask.$loaded().then(function() {
          cb(fireTask);
        });
      },

      star: function(lid, tid) {
        var tasksRef = new Firebase("https://remto.firebaseio.com/lists/" + lid + "/tasks/" + tid);
        var fireTask = $firebaseObject(tasksRef);

        fireTask.$loaded().then(function() {
          tasksRef.update({'star': !fireTask.star});
        });
      },

      completed: function(lid, tid) {
        var tasksRef = new Firebase("https://remto.firebaseio.com/lists/" + lid + "/tasks/" + tid);
        var fireTask = $firebaseObject(tasksRef);

        fireTask.$loaded().then(function() {
          tasksRef.update({'completed': !fireTask.completed});
        });
      },

      update: function(lid, tid, inputs, cb) {
        var taskRef = new Firebase("https://remto.firebaseio.com/lists/" + lid + "/tasks/" + tid);
        var fireTask = $firebaseObject(taskRef);

        fireTask.$loaded().then(function() {
          console.log('loaded');
          fireTask.name = inputs.name.trim().toLowerCase();
          fireTask.repeat = inputs.repeat;
          fireTask.notes = inputs.notes;
          fireTask.tags = inputs.tags;
          fireTask.$save().then(function() {
            console.log('saved');
            cb();
          });
        });
      }
      //
      // get: function(userID, cb) {
      //   tasks.getUserListsSettings(userID, function(userListsSettings) {
      //     tasks.getUserLists(userID, userListsSettings, function(userLists) {
      //       cb(userLists);
      //     });
      //   });
      // },
      //
      // getUserListsSettings: function(userID, cb) {
      //   var userListsSettingsRef = new Firebase("https://remto.firebaseio.com/users/" + userID + "/tasks/");
      //   var fireUserListsSettings = $firebaseArray(userListsSettingsRef);
      //
      //   fireUserListsSettings.$loaded().then(function() {
      //     cb(fireUserListsSettings);
      //   });
      // },
      //
      // getUserLists: function(userID, userListsSettings, cb) {
      //   var i = 0;
      //   var userLists = [];
      //   userListsSettings.forEach(function(item, index, array) {
      //     var listRef = new Firebase("https://remto.firebaseio.com/tasks/" + item.lid);
      //     var fireList = $firebaseObject(listRef);
      //     fireList.$loaded().then(function(fireList) {
      //       userLists[index] = fireList;
      //       userLists[index].color = userListsSettings[index].color;
      //       userLists[index].icon = userListsSettings[index].icon;
      //       userLists[index].lid = userListsSettings[index].lid;
      //       i++;
      //       if (i === array.length) {
      //         cb(userLists);
      //       }
      //     });
      //   });
      //  }
    };

    return tasks;
  },
]);
