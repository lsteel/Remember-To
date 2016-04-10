angular
.module('appSettings', [])
.factory('userSettings', [
  '$firebaseAuth',
  '$firebaseObject',
  function($firebaseAuth, $firebaseObject) {

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
      },

      update: function(userID, param, newVal, cb) {
        var settingsURL = "https://remto.firebaseio.com/users/" + userID + "/settings",
        userSettingsRef = new Firebase(settingsURL),
        fireUserSettings = $firebaseObject(userSettingsRef);

        fireUserSettings.$loaded().then(function() {
          updateObject = {};
          updateObject[param] = newVal;
          userSettingsRef.update(updateObject, cb());
        });
      },

      updateEmail: function(userID, cred, cb) {
        var baseURL = "https://remto.firebaseio.com/";
        var baseRef = new Firebase(baseURL);
        var authObj = $firebaseAuth(baseRef);

        authObj.$changeEmail(cred).then(function() {
          console.log("Auth Email changed successfully!");
          userSettings.update(userID, 'email', cred.newEmail, function() {
            cb(null);
          });
        }).catch(function(error) {
          cb(error);
        });
      },

      updatePassword: function(userID, cred, cb) {
        var baseURL = "https://remto.firebaseio.com/";
        var baseRef = new Firebase(baseURL);
        var authObj = $firebaseAuth(baseRef);

        authObj.$changePassword(cred).then(function() {
          console.log("Auth Password changed successfully!");
          cb(null);
        }).catch(function(error) {
          cb(error);
        });
      },

      deleteAccount: function(userID, cred, cb) {
        var baseURL = "https://remto.firebaseio.com/";
        var baseRef = new Firebase(baseURL);
        var authObj = $firebaseAuth(baseRef);

        var userURL = "https://remto.firebaseio.com/users/" + userID,
            userRef = new Firebase(userURL);

        userRef.update({
          'settings': {
            addTaskToTop: null,
            listBadge: null,
            starToTop: null,
            useLocation: null
          },
          'lists': null,
          'userExists': false
        }, function() {
          authObj.$removeUser(cred).then(function() {
            console.log("User removed successfully!");
            cb();
          }).catch(function(error) {
            console.error("Error: ", error);
          });
        });
      }
    };

    return userSettings;
  },
]);
