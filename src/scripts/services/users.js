angular
.module('appUsers', [
  'appAuth',
  'appSettings',
])
.factory('users', [
  '$rootScope',
  '$location',
  '$firebaseObject',
  '$firebaseArray',
  'userSettings',
  function($rootScope, $location, $firebaseObject, $firebaseArray, userSettings) {

    var users = {

      create: function(returnedData, userCred) {
        var userURL = "https://remto.firebaseio.com/users/" + returnedData.uid,
            ref = new Firebase(userURL),
            fireUser = $firebaseObject(ref);

        fireUser.userExists = true;
        fireUser.$save().then(function() {
          userSettings.create(fireUser.$id, userCred);
        }, function(error) {
          console.log("Error:", error);
        });
      },

      update: function(uid, urlValue, value) {
        var refURL = "https://remto.firebaseio.com/users/" + uid + "/" + urlValue,
            ref = new Firebase(refURL);

        ref.update(value);
      },

      addList: function(uid, inputs, listID) {
        var url = "https://remto.firebaseio.com/users/" + uid + "/lists/",
            ref = new Firebase(url),
            lists = $firebaseArray(ref);

        listSettings = {
          "lid": listID,
          "doNotDisturb": inputs.doNotDisturb,
          "color": inputs.color,
          "icon": inputs.icon,
          "locations": [ inputs.location ],
          "isOwner": true
        };

        lists.$add(listSettings).then(function() {
        });
        lists = $firebaseArray(ref);
        lists.$loaded().then(function() {});

        //lists.$add(listID).then(function() {});
      },

      updateList: function(uid, lsid, inputs, lid) {
        var userListsSettingsRef = new Firebase("https://remto.firebaseio.com/users/" + uid + "/lists/" + lsid);
        var fireUserListsSettings = $firebaseObject(userListsSettingsRef);

        fireUserListsSettings.color = inputs.color;
        fireUserListsSettings.doNotDisturb = inputs.doNotDisturb;
        fireUserListsSettings.icon = inputs.icon;
        fireUserListsSettings.lid = lid;
        fireUserListsSettings.sortOrder = inputs.sortOrder || null;
        fireUserListsSettings.location = inputs.location || null;
        fireUserListsSettings.isOwner = true;

        fireUserListsSettings.$save().then(function() {});
      }
      // return lists.update($routeParams.lid, inputs, function() {
      //   users.updateList(listCreateCtrl.uid, inputs, $routeParams.lid);
      //   listCreateCtrl.inputs = {};
      //   $location.url('/list/' + $routeParams.lid);
      // });
    };

    return users;
  },
]);
