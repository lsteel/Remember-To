angular
  .module('appSettings', [])
  .factory('userSettings', [
    '$firebaseObject',
    function($firebaseObject) {

      var userSettings = {
        create: function(userID, userCred) {
          var settingsURL = "https://remto.firebaseio.com/users/" + userID + "/settings",
              userSettingsRef = new Firebase(settingsURL),
              fireUserSettings = $firebaseObject(userSettingsRef);

          fireUserSettings.starToTop = true;
          fireUserSettings.addTaskToTop = false;
          fireUserSettings.listBadge = "today";
          fireUserSettings.useLocation = true;
          fireUserSettings.createdOn = Date.now();
          fireUserSettings.email = userCred.email;

          fireUserSettings.$save().then(function() {
            console.log('Setting set.');
          }, function(error) {
            console.log("Error:", error);
          });
        },

        get: function(userID, cb) {
          var settingsURL = "https://remto.firebaseio.com/users/" + userID + "/settings",
              userSettingsRef = new Firebase(settingsURL),
              fireUserSettings = $firebaseObject(userSettingsRef);

          fireUserSettings.$loaded().then(function() {
            var settingsObj = fireUserSettings;
            cb(settingsObj);
          });
        }
      };

      return userSettings;
    },
  ]);
