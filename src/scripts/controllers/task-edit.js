angular
  .module('TaskEditController', [
    'appAuth',
    'appUsers',
    'appTasks',
  ])
  .controller('TaskEditController', [
    'authFuncs',
    'users',
    'tasks',
    '$filter',
    '$location',
    '$routeParams',
    function (authFuncs, users, tasks, $filter, $location, $routeParams) {
      var taskEditCtrl = this;

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

      console.log(taskEditCtrl.inputs);

      if (taskEditCtrl.taskID !== undefined) {
        tasks.watchTask(taskEditCtrl.listID, taskEditCtrl.taskID, function(changed) {
          if (changed) {
            tasks.getSingle(taskEditCtrl.listID, taskEditCtrl.taskID, function(task) {
              if (task === null) {
                $location.url('/list/' + taskEditCtrl.listID);
              }
              else {
                console.log(task);
                taskEditCtrl.task = task;
                taskEditCtrl.inputs.name = taskEditCtrl.task.name;
                taskEditCtrl.inputs.repeat = taskEditCtrl.task.repeat;
                taskEditCtrl.inputs.notes = taskEditCtrl.task.notes;
                taskEditCtrl.inputs.tags = taskEditCtrl.task.tags;
                taskEditCtrl.inputs.sortOrder = taskEditCtrl.task.sortOrder;
              }
            });
          }
        });
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
        tasks.delete(taskEditCtrl.listID, taskEditCtrl.taskID, function(lid) {
          $location.url('/list/' + lid);
        });
      };
    },
  ]);
