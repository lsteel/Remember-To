angular
.module('appUsers', [
  'appAuth',
  'appSettings',
])
.factory('users', [
  '$rootScope',
  '$firebaseObject',
  '$firebaseArray',
  'userSettings',
  function($rootScope, $firebaseObject, $firebaseArray, userSettings) {

    var users = {

      create: function(returnedData, userCred) {
        var userURL = "https://remto.firebaseio.com/users/" + returnedData.uid,
            ref = new Firebase(userURL),
            fireUser = $firebaseObject(ref);

        fireUser.email = userCred.email;
        fireUser.name = "";
        fireUser.createdOn = Date.now();
        fireUser.$save().then(function() {
          console.log('User set.');
          //send to initialize user settings
          userSettings.create(fireUser.$id);
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
          "locations": [ inputs.location ]
        };

        lists.$add(listSettings).then();
        lists = $firebaseArray(ref);
        lists.$loaded().then(function() {});

        //lists.$add(listID).then(function() {});
      }
    };

    return users;
  },
]);
