angular
.module('appUsers', [
  'appAuth',
])
.factory('users', [
  function() {
    var ref = new Firebase("https://remto.firebaseio.com/");
    var users = {
      create: function(returnedData, userCred) {
        userObj = {
          users: {}
        };
        userObj.users[returnedData.uid] = {
          email: userCred.email,
          createdOn: Date.now()
        };
        ref.push(userObj);
      }
    };

    return users;
  },
]);
