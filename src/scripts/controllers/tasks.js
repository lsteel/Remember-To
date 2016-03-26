angular
.module('TasksController', [
  'appAuth',
  'appUsers',
  'appLists',
  'appTasks',
])
.controller('TasksController', [
  'authFuncs',
  'users',
  'lists',
  'tasks',
  '$filter',
  '$location',
  '$firebaseAuth',
  '$firebaseObject',
  '$routeParams',
  function (authFuncs, users, lists, tasks, $filter, $location, $firebaseAuth, $firebaseObject, $routeParams) {
    var tasksCtrl = this;
    tasksCtrl.loading = true;

    tasksCtrl.listID = $routeParams.lid;

    (function() {
      authFuncs.isLoggedIn(function(err, data) {
        if (data) {
          tasksCtrl.uid = data.uid;
        }
        else if (err) {
          console.log(err);
        }
        else {}
      });
    })();

    tasksCtrl.dragControlListeners = {
      longTouch: true,
      dragEnd: function() {
        i = 0;
        tasksCtrl.tasks.forEach(function(item, index, array) {
          item.sortOrder = index + 1;
          var tasksRef = new Firebase("https://remto.firebaseio.com/lists/" + tasksCtrl.listID + "/tasks/" + item.tid );
          var fireList = $firebaseObject(tasksRef);

          fireList.$loaded().then(function() {
            fireList.sortOrder = index + 1;
            fireList.$save().then(function(fireList) {
              i++;
              if (i === array.length) {
              }
            });
          });
        });
      }
    };

    tasksCtrl.list = {};
    tasksCtrl.tasks = [];

    lists.watchList(tasksCtrl.listID, function(changed) {
      if (changed) {
        lists.getSingle(tasksCtrl.uid, tasksCtrl.listID, function(list) {
          tasksCtrl.loading = false;
          if (list === null) {
            $location.url('/lists');
          }
          else {
            tasksCtrl.list = list;
            var idx = 0;
            for (var key in tasksCtrl.list.tasks) {
              // skip loop if the property is from prototype
              if (!tasksCtrl.list.tasks.hasOwnProperty(key)) continue;

              var obj = tasksCtrl.list.tasks[key];
              tasksCtrl.tasks[idx] = obj;
              idx++;
            }
            tasksCtrl.tasks = $filter('orderBy')(tasksCtrl.tasks, ['-star', 'sortOrder']);
            console.log(tasksCtrl.tasks);
          }
        });
      }
    });

    tasksCtrl.submit = function(inputs) {

      inputs.star = inputs.star || false;
      tasks.create(inputs, tasksCtrl.listID, function(tid, inputs) {
        console.log(tid);
        tasksCtrl.addTodo = null;
      });

    };

    tasksCtrl.starIt = function(lid, tid) {
      tasks.star(lid, tid);
    };

    tasksCtrl.completeIt = function(lid, tid) {
      tasks.completed(lid, tid);
    };

  },
]);
