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

      lists.getSingle(tasksCtrl.uid, tasksCtrl.listID, function(list) {
        if (list === null) {
          $location.url('/lists');
        }
        else {
          tasksCtrl.list = list;
          console.log(list);
        }
      });

    },
  ]);
