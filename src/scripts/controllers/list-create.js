angular
  .module('ListCreateController', [
    'appAuth',
    'appUsers',
    'appLists',
  ])
  .controller('ListCreateController', [
    '$rootScope',
    'authFuncs',
    'users',
    'lists',
    '$location',
    '$routeParams',
    function ($rootScope, authFuncs, users, lists, $location, $routeParams) {
      $rootScope.rsLoading = false;
      var listCreateCtrl = this;
      listCreateCtrl.show = false;


      listCreateCtrl.listID = $routeParams.lid;

      (function() {
        authFuncs.isLoggedIn(function(err, data) {
          if (err) {
            console.log(err);
          }
          else {
            listCreateCtrl.uid = data.uid;
            listCreateCtrl.show = true;
          }
        });
      })();


      listCreateCtrl.colors = [ "red", "orange", "yellow", "green",  "blue", "violet"];

      listCreateCtrl.selectedColor;

      listCreateCtrl.selectColor = function(index) {
         listCreateCtrl.selectedColor = index;
      };

      listCreateCtrl.randomColor = function() {
        var num = Math.floor(Math.random() * listCreateCtrl.colors.length);
        var color = listCreateCtrl.colors[num];
        listCreateCtrl.selectedColor = num;
        return color;
      };

      var color = listCreateCtrl.randomColor();

      listCreateCtrl.icons = [
        'cross',
        'interface',
        'interface-1',
        'music',
        'crown',
        'weapon',
        'clock',
        'peace',
        'school',
        'favorite',
        'night',
        'favorite-1',
        'web',
        'vintage',
        'time',
        'time-1',
        'wrench',
        'transport',
        'technology-3',
        'sunglasses',
        'luxury',
        'medical',
        'medical-1',
        'medieval',
        'commerce',
        'restaurant-1',
        'transport-1',
        'school-1',
        'technology-2',
        'notebook',
        'reading',
        'restaurant',
        'furniture',
        'moon',
        'night-1',
        'night-2',
        'briefcase',
        'suitcase',
        'business',
        'networking',
        'technology-15',
        'people-1',
        'people-2',
        'people-3',
        'monitor',
        'folder',
        'party',
        'party-1',
        'party-2',
        'party-3',
        'food',
        'food-1',
        'food-2',
        'food-3',
        'present',
        'present-1',
        'technology',
        'technology-1',
        'technology-10',
        'technology-11',
        'technology-12',
        'technology-13',
        'technology-14',
        'technology-16',
        'technology-4',
        'technology-5',
        'technology-6',
        'technology-7',
        'technology-8',
        'technology-9'
      ];

      listCreateCtrl.selectedIcon;

      listCreateCtrl.selectIcon = function(index) {
         listCreateCtrl.selectedIcon = index;
      };

      listCreateCtrl.randomIcon = function() {
        var num = Math.floor(Math.random() * listCreateCtrl.icons.length);
        var icon = listCreateCtrl.colors[num];
        listCreateCtrl.selectedIcon = num;
        return icon;
      };

      var icon = listCreateCtrl.randomIcon();

      listCreateCtrl.inputs = {
        "color": color,
        "icon": icon
      };

      if (listCreateCtrl.listID !== undefined) {
        $rootScope.rsLoading = true;
        lists.watchList(listCreateCtrl.listID, function(changed) {
          $rootScope.rsLoading = true;
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
                listCreateCtrl.selectedColor = listCreateCtrl.colors.indexOf(listCreateCtrl.list.color);
                listCreateCtrl.inputs.color = listCreateCtrl.colors[listCreateCtrl.colors.indexOf(listCreateCtrl.list.color)];
                console.log(listCreateCtrl.inputs.color);
                listCreateCtrl.inputs.sortOrder = listCreateCtrl.list.sortOrder;
                listCreateCtrl.selectedIcon = listCreateCtrl.icons.indexOf(listCreateCtrl.list.icon);
                listCreateCtrl.inputs.icon = listCreateCtrl.icons[listCreateCtrl.icons.indexOf(listCreateCtrl.list.icon)];
                console.log(listCreateCtrl.inputs.icon);
                listCreateCtrl.inputs.users = listCreateCtrl.list.users;
                listCreateCtrl.inputs.lsid = listCreateCtrl.list.userSettingsID;
                $rootScope.rsLoading = false;
              }
            });
          }
        });
      }
      else {
        $rootScope.rsLoading = false;
      }

      listCreateCtrl.submit = function(inputs) {
        inputs.users = inputs.users || listCreateCtrl.uid;
        inputs.doNotDisturb = inputs.doNotDisturb || false;
        inputs.location = inputs.location || null;
        inputs.color = inputs.color || listCreateCtrl.randomColor();
        inputs.icon = inputs.icon || listCreateCtrl.randomIcon();

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

      listCreateCtrl.delete = function() {
        if (listCreateCtrl.listID !== undefined) {
          angular.element('.modal-backdrop').remove();
          return lists.delete(listCreateCtrl.uid, listCreateCtrl.listID, listCreateCtrl.list.userSettingsID, function() {
            listCreateCtrl.inputs = {};
            $location.url('/lists');
          });
        }
      };
    },
  ]);
