angular
.module('appUsers', [
  'appAuth',
  'appSettings',
])
.factory('users', [
  '$firebaseObject',
  'userSettings',
  function($firebaseObject, userSettings) {

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
      }
    };

    return users;
  },
]);
