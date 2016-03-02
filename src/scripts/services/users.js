angular
.module('appUsers', [
  'appAuth',
])
.factory('users', [
  function() {
    var refData = new Firebase("https://remto.firebaseio.com/users");
    var users = {
      create: function(user) {
        refData.push(user);
      }
    };

    return users;
  },
]);
