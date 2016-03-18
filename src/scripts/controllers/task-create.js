angular
  .module('TaskCreateController', [
    'appAuth',
    'appUsers',
    'appLists',
  ])
  .controller('TaskCreateController', [
    'authFuncs',
    'users',
    'lists',
    '$location',
    '$routeParams',
    function (authFuncs, users, lists, $location, $routeParams) {
      var taskCreateCtrl = this;

      taskCreateCtrl.listID = $routeParams.lid;

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

      taskCreateCtrl.inputs = {};

      if (taskCreateCtrl.listID !== undefined) {
        lists.getSingle(taskCreateCtrl.uid, taskCreateCtrl.listID, function(list) {
          if (list === null) {
            $location.url('/lists');
          }
          else {
            taskCreateCtrl.list = list;
            taskCreateCtrl.inputs.name = taskCreateCtrl.list.listName;
            taskCreateCtrl.inputs.doNotDisturb = taskCreateCtrl.list.doNotDisturb;
            taskCreateCtrl.inputs.location = taskCreateCtrl.list.location;
            taskCreateCtrl.inputs.color = taskCreateCtrl.list.color;
            taskCreateCtrl.inputs.icon = taskCreateCtrl.list.icon;
            taskCreateCtrl.inputs.users = taskCreateCtrl.list.users;
            taskCreateCtrl.inputs.lsid = taskCreateCtrl.list.userSettingsID;
          }
        });
      }

      taskCreateCtrl.selectOpts = {
        "type": "select",
        "name": "color",
        "values": [ "red", "orange", "yellow", "green",  "blue", "violet"]
      };

      taskCreateCtrl.randomColor = function() {
        var color = taskCreateCtrl.selectOpts.values[Math.floor(Math.random() * taskCreateCtrl.selectOpts.values.length)];
        return color;
      };

      taskCreateCtrl.submit = function(inputs) {
        inputs.users = inputs.users || taskCreateCtrl.uid;
        inputs.doNotDisturb = inputs.doNotDisturb || false;
        inputs.location = inputs.location || null;
        inputs.color = inputs.color || taskCreateCtrl.randomColor();
        inputs.icon = inputs.icon || "home";

        if (taskCreateCtrl.listID !== undefined) {
          return lists.update(taskCreateCtrl.listID, inputs, function() {
            users.updateList(taskCreateCtrl.uid, inputs.lsid, inputs, taskCreateCtrl.listID);
            taskCreateCtrl.inputs = {};
            $location.url('/list/' + taskCreateCtrl.listID);
          });
        }
        else {
          return lists.create(taskCreateCtrl.uid, inputs, function(listID, inputs) {
            users.addList(taskCreateCtrl.uid, inputs, listID);
            taskCreateCtrl.inputs = {};
            $location.url('/lists');
          });
        }
      };
    },
  ]);
