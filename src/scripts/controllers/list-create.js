angular
  .module('ListCreateController', [
    'appAuth',
    'appUsers',
    'appLists',
  ])
  .controller('ListCreateController', [
    'authFuncs',
    'users',
    'lists',
    '$location',
    function (authFuncs, users, lists, $location) {
      var listCreateCtrl = this;

      (function() {
        authFuncs.isLoggedIn(function(err, data) {
          if (err) {
            console.log(err);
          }
          else {
            listCreateCtrl.uid = data.uid;
          }
        });
      })();

      listCreateCtrl.inputs = {};

      listCreateCtrl.selectOpts = {
        "type": "select",
        "name": "color",
        "values": [ "red", "orange", "yellow", "green",  "blue", "violet"]
      };

      listCreateCtrl.randomColor = function() {
        var color = listCreateCtrl.selectOpts.values[Math.floor(Math.random() * listCreateCtrl.selectOpts.values.length)];
        return color;
      };

      listCreateCtrl.submit = function(inputs) {
        inputs.users = inputs.users || listCreateCtrl.uid;
        inputs.doNotDisturb = inputs.doNotDisturb || false;
        inputs.location = inputs.location || null;
        inputs.color = inputs.color || listCreateCtrl.randomColor();
        inputs.icon = inputs.icon || "home";
        return lists.create(listCreateCtrl.uid, inputs, function(listID, inputs) {
          users.addList(listCreateCtrl.uid, inputs, listID);
          console.log(inputs);

          listCreateCtrl.inputs = {};
        });
      };
    },
  ]);
