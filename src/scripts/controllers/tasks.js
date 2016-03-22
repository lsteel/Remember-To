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
    '$location',
    '$firebaseAuth',
    '$routeParams',
    function (authFuncs, users, lists, tasks, $location, $firebaseAuth, $routeParams) {
      var tasksCtrl = this;

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

      tasksCtrl.list = {};

      lists.watchList(tasksCtrl.listID, function(changed) {
        if (changed) {
          lists.getSingle(tasksCtrl.uid, tasksCtrl.listID, function(list) {
            if (list === null) {
              $location.url('/lists');
            }
            else {
              tasksCtrl.list = list;
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

    },
  ]);
