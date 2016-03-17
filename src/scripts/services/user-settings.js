angular
  .module('appSettings', [])
  .factory('userSettings', [
    '$firebaseObject',
    function($firebaseObject) {

      var userSettings = {
        create: function(userID) {
          var settingsURL = "https://remto.firebaseio.com/users/" + userID + "/settings",
              userSettingsRef = new Firebase(settingsURL),
              fireUserSettings = $firebaseObject(userSettingsRef);

          fireUserSettings["star-to-top"] = true;
          fireUserSettings["add-task-to-top"] = false;
          fireUserSettings["list-badge"] = "today";
          fireUserSettings["use-location"] = true;

          fireUserSettings.$save().then(function() {
            console.log('Setting set.');
          }, function(error) {
            console.log("Error:", error);
          });
        }
      };

      return userSettings;
    },
  ]);
