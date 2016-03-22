angular
  .module('TaskCreateController', [
    'appAuth',
    'appUsers',
    'appTasks',
  ])
  .controller('TaskCreateController', [
    'authFuncs',
    'users',
    'tasks',
    '$location',
    '$routeParams',
    function (authFuncs, users, tasks, $location, $routeParams) {
      var taskCreateCtrl = this;

      taskCreateCtrl.listID = $routeParams.lid;
      taskCreateCtrl.taskID = $routeParams.tid;

      (function() {
        authFuncs.isLoggedIn(function(err, data) {
          if (err) {
            console.log(err);
          }
          else {
            taskCreateCtrl.uid = data.uid;
          }
        });
      })();


      taskCreateCtrl.selectOpts = {
        "type": "select",
        "name": "color",
        "values": [ "red", "orange", "yellow", "green",  "blue", "violet"]
      };

      taskCreateCtrl.inputs = {};

      if (taskCreateCtrl.taskID !== undefined) {
        // lists.watchList(taskCreateCtrl.listID, function(changed) {
        //   if (changed) {
        //     lists.getSingle(taskCreateCtrl.uid, taskCreateCtrl.listID, function(list) {
        //       if (list === null) {
        //         $location.url('/lists');
        //       }
        //       else {
        //         taskCreateCtrl.list = list;
        //         taskCreateCtrl.inputs.name = taskCreateCtrl.list.listName;
        //         taskCreateCtrl.inputs.sortOrder = taskCreateCtrl.list.sortOrder;
        //       }
        //     });
        //   }
        // });
      }

      taskCreateCtrl.submit = function(inputs) {

        if (taskCreateCtrl.taskID !== undefined) {
          // return lists.update(taskCreateCtrl.listID, inputs, function() {
          //   users.updateList(taskCreateCtrl.uid, inputs.lsid, inputs, taskCreateCtrl.listID);
          //   taskCreateCtrl.inputs = {};
          //   $location.url('/list/' + taskCreateCtrl.listID);
          // });
        }
        else {
          // return lists.create(taskCreateCtrl.uid, inputs, function(listID, inputs) {
          //   users.addList(taskCreateCtrl.uid, inputs, listID);
          //   taskCreateCtrl.inputs = {};
          //   $location.url('/lists');
          // });
        }

      };
    },
  ]);
