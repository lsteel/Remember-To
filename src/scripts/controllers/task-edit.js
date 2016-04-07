angular
  .module('TaskEditController', [
    'appAuth',
    'appUsers',
    'appLists',
    'appTasks',
  ])
  .controller('TaskEditController', [
    '$rootScope',
    'authFuncs',
    'users',
    'lists',
    'tasks',
    '$filter',
    '$location',
    '$routeParams',
    function ($rootScope, authFuncs, users, lists, tasks, $filter, $location, $routeParams) {
      $rootScope.rsLoading = true;
      var taskEditCtrl = this;
      taskEditCtrl.show = false;


      taskEditCtrl.minDate = $filter("date")(Date.now(), 'yyyy-MM-dd');

      //var date = new Date().toDateInputValue();

      taskEditCtrl.listID = $routeParams.lid;
      taskEditCtrl.taskID = $routeParams.tid;

      $('.date-picker').attr('min', taskEditCtrl.minDate);

      (function() {
        authFuncs.isLoggedIn(function(err, data) {
          if (err) {
            console.log(err);
          }
          else {
            taskEditCtrl.uid = data.uid;
            taskEditCtrl.show = true;
          }
        });
      })();


      taskEditCtrl.repeatOpts = {
        "type": "select",
        "name": "repeat",
        "values": [ "", "daily", "mon", "tue", "wed",  "thu", "fri", "sat", "sun"]
      };

      taskEditCtrl.dueHourOpts = {
        "type": "select",
        "name": "dueHour",
        "values": [ "", "07", "08", "09",  "10", "11", "12", "01", "02", "03", "04", "05", "06"]
      };

      taskEditCtrl.dueMinOpts = {
        "type": "select",
        "name": "dueHour",
        "values": [ "", "07", "08", "09",  "10", "11", "12", "01", "02", "03", "04", "05", "06"]
      };

      taskEditCtrl.dueAmPmOpts = {
        "type": "select",
        "name": "dueAmPm",
        "values": [ "none", "daily", "mon", "tue", "wed",  "thu", "fri", "sat", "sun"]
      };

      taskEditCtrl.inputs = {};

      if (taskEditCtrl.taskID !== undefined) {
        tasks.watchTask(taskEditCtrl.listID, taskEditCtrl.taskID, function(changed) {
          $rootScope.rsLoading = true;
          if (changed) {
            tasks.getSingle(taskEditCtrl.listID, taskEditCtrl.taskID, function(task) {
              if (task === null) {
                $location.url('/list/' + taskEditCtrl.listID);
              }
              else {
                taskEditCtrl.task = task;
                taskEditCtrl.inputs.name = taskEditCtrl.task.name;
                taskEditCtrl.inputs.repeat = taskEditCtrl.task.repeat;
                taskEditCtrl.inputs.notes = taskEditCtrl.task.notes;
                taskEditCtrl.inputs.tags = taskEditCtrl.task.tags;
                taskEditCtrl.inputs.sortOrder = taskEditCtrl.task.sortOrder;
                $rootScope.rsLoading = false;
              }
            });
          }
        });
      }

      if (taskEditCtrl.listID !== undefined) {
        $rootScope.rsLoading = true;
        lists.watchList(taskEditCtrl.listID, function(changed) {
          $rootScope.rsLoading = true;
          if (changed) {
            lists.getSingle(taskEditCtrl.uid, taskEditCtrl.listID, function(list) {
              if (list === null) {
                $location.url('/lists');
              }
              else {
                taskEditCtrl.list = list;
                console.log(list);
                $rootScope.rsLoading = false;
              }
            });
          }
        });
      }
      else {
        $location.url('/lists');
      }

      taskEditCtrl.submit = function(inputs) {

        if (taskEditCtrl.taskID !== undefined) {
          return tasks.update(taskEditCtrl.listID, taskEditCtrl.taskID, inputs, function() {
            $location.url('/list/' + taskEditCtrl.listID);
          });
        }
        else {
          $location.url('/list/' + taskEditCtrl.listID);
        }

      };

      taskEditCtrl.delete = function() {
        angular.element('.modal-backdrop').html('');
        tasks.delete(taskEditCtrl.listID, taskEditCtrl.taskID, function(lid) {
          $location.url('/list/' + lid);
        });
      };
    },
  ]);
