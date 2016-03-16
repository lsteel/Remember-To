angular
  .module('list', [])
  .factory('lists', [
    '$firebaseObject',
    function($firebaseObject) {

      var lists = {
        create: function(userID) {
          var listsRef = new Firebase("https://remto.firebaseio.com/lists/");

          var listPushRef = listsRef.push();
          var listKey = listPushRef.key();
          console.log(listKey);

          var fireLists = $firebaseObject(listPushRef);

          fireLists['list-name'] = 'random';
          fireLists.users = [userID];
          fireLists.owners = [userID];

          fireLists.$save().then(function() {
            console.log('List set.');
          }, function(error) {
            console.log("Error:", error);
          });
        }
      };

      return lists;
    },
  ]);
