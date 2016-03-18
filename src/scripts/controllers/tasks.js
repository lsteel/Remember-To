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

      lists.getSingle(tasksCtrl.uid, $routeParams.lid, function(list) {
        tasksCtrl.list = list;
        console.log(list);
      });

    },
  ]);
