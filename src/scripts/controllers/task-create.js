angular
  .module('TaskCreateController', [
    'appAuth',
    'appUsers',
    'appTasks',
  ])
  .controller('TaskCreateController', [
    '$rootScope',
    'authFuncs',
    'users',
    'tasks',
    '$location',
    '$routeParams',
    function ($rootScope, authFuncs, users, tasks, $location, $routeParams) {
      $rootScope.rsLoading = false;
      var taskCreateCtrl = this;
      taskCreateCtrl.show = false;

      //
      // taskCreateCtrl.listID = $routeParams.lid;
      // taskCreateCtrl.taskID = $routeParams.tid;
      //
      (function() {
        authFuncs.isLoggedIn(function(err, data) {
          if (err) {
            console.log(err);
          }
          else {
            taskCreateCtrl.uid = data.uid;
            taskCreateCtrl.show = true;
          }
        });
      })();
      //
      //
      // taskCreateCtrl.selectOpts = {
      //   "type": "select",
      //   "name": "color",
      //   "values": [ "red", "orange", "yellow", "green",  "blue", "violet"]
      // };
      //
      // taskCreateCtrl.inputs = {};
      //
      // if (taskCreateCtrl.taskID !== undefined) {
      //   tasks.watchTask(taskCreateCtrl.listID, taskCreateCtrl.taskID, function(changed) {
      //     if (changed) {
      //       tasks.getSingle(taskCreateCtrl.listID, taskCreateCtrl.taskID, function(task) {
      //         if (task === null) {
      //           $location.url('/list/' + taskCreateCtrl.listID);
      //         }
      //         else {
      //           console.log(task);
      //           taskCreateCtrl.task = task;
      //           taskCreateCtrl.inputs.name = taskCreateCtrl.task.name;
      //           taskCreateCtrl.inputs.sortOrder = taskCreateCtrl.task.sortOrder;
      //         }
      //       });
      //     }
      //   });
      // }
      //
      // taskCreateCtrl.submit = function(inputs) {
      //
      //   if (taskCreateCtrl.taskID !== undefined) {
      //     // return lists.update(taskCreateCtrl.listID, inputs, function() {
      //     //   users.updateList(taskCreateCtrl.uid, inputs.lsid, inputs, taskCreateCtrl.listID);
      //     //   taskCreateCtrl.inputs = {};
      //     //   $location.url('/list/' + taskCreateCtrl.listID);
      //     // });
      //   }
      //   else {
      //     // return lists.create(taskCreateCtrl.uid, inputs, function(listID, inputs) {
      //     //   users.addList(taskCreateCtrl.uid, inputs, listID);
      //     //   taskCreateCtrl.inputs = {};
      //     //   $location.url('/lists');
      //     // });
      //   }
      //
      // };
    },
  ]);
