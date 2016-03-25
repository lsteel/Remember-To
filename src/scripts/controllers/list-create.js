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
    '$routeParams',
    function (authFuncs, users, lists, $location, $routeParams) {
      var listCreateCtrl = this;

      listCreateCtrl.listID = $routeParams.lid;

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


      listCreateCtrl.selectOpts = {
        "type": "select",
        "name": "color",
        "values": [ "red", "orange", "yellow", "green",  "blue", "violet"]
      };

      listCreateCtrl.randomColor = function() {
        var color = listCreateCtrl.selectOpts.values[Math.floor(Math.random() * listCreateCtrl.selectOpts.values.length)];
        return color;
      };

      var color = listCreateCtrl.randomColor();

      listCreateCtrl.inputs = {
        "color": color
      };

      if (listCreateCtrl.listID !== undefined) {
        lists.watchList(listCreateCtrl.listID, function(changed) {
          if (changed) {
            lists.getSingle(listCreateCtrl.uid, listCreateCtrl.listID, function(list) {
              if (list === null) {
                $location.url('/lists');
              }
              else {
                listCreateCtrl.list = list;
                listCreateCtrl.inputs.name = listCreateCtrl.list.listName;
                listCreateCtrl.inputs.doNotDisturb = listCreateCtrl.list.doNotDisturb;
                listCreateCtrl.inputs.location = listCreateCtrl.list.location;
                listCreateCtrl.inputs.color = listCreateCtrl.list.color;
                listCreateCtrl.inputs.sortOrder = listCreateCtrl.list.sortOrder;
                listCreateCtrl.inputs.icon = listCreateCtrl.list.icon;
                listCreateCtrl.inputs.users = listCreateCtrl.list.users;
                listCreateCtrl.inputs.lsid = listCreateCtrl.list.userSettingsID;
              }
            });
          }
        });
      }

      listCreateCtrl.submit = function(inputs) {
        inputs.users = inputs.users || listCreateCtrl.uid;
        inputs.doNotDisturb = inputs.doNotDisturb || false;
        inputs.location = inputs.location || null;
        inputs.color = inputs.color || listCreateCtrl.randomColor();
        inputs.icon = inputs.icon || "home";

        if (listCreateCtrl.listID !== undefined) {
          return lists.update(listCreateCtrl.listID, inputs, function() {
            users.updateList(listCreateCtrl.uid, inputs.lsid, inputs, listCreateCtrl.listID);
            listCreateCtrl.inputs = {};
            $location.url('/list/' + listCreateCtrl.listID);
          });
        }
        else {
          return lists.create(listCreateCtrl.uid, inputs, function(listID, inputs) {
            users.addList(listCreateCtrl.uid, inputs, listID);
            $location.url('/list/' + listID);
            listCreateCtrl.inputs = {};
          });
        }
      };
    },
  ]);
