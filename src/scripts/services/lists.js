angular
  .module('appLists', [
    'appUsers',
  ])
  .factory('lists', [
    'users',
    '$firebaseObject',
    function(users, $firebaseObject) {

      var lists = {
        create: function(userID, inputs, cb) {
          var listsRef = new Firebase("https://remto.firebaseio.com/lists/");
          var listPushRef = listsRef.push();
          var fireLists = $firebaseObject(listPushRef);

          var listKey = fireLists.$id;
          fireLists['list-name'] = inputs.name;
          fireLists.users = [inputs.users];
          fireLists.owners = [inputs.users];

          fireLists.$save().then(function() {
            console.log('List set.');
            return cb(listKey, inputs);
          }, function(error) {
            console.log("Error:", error);
          });
        }
      };

      return lists;
    },
  ]);
