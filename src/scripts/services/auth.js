angular
.module('appAuth', [
  'appUsers',
])
.factory('authFuncs', [
  '$q',
  'users',
  '$location',
  '$firebaseAuth',
  function($q, users, $location, $firebaseAuth) {
    var ref = new Firebase("https://remto.firebaseio.com");
    auth = $firebaseAuth(ref);
    // var remToData = {
    //   users: {
    //     name: 'name'
    //   }
    // };
    // console.log(remToData);
    // ref.set(remToData);

    //var authData = ref.getAuth();

    var authFuncs = {

      create: function(email, password, cb) {
        var cred = {
          email: email,
          password: password
        };

        auth
          .$createUser(cred)
          .then(function(userData) {
            console.log("User " + userData.uid + " created successfully!");
            users.create(userData, cred);
            authFuncs.login(cred.email, cred.password, cb);
          })
          .then(function(authData) {
            console.log("Logged in as:", authData.uid);
          })
          .catch(function(error) {
            console.error("Error: ", error);
            cb(error, null);
          });





        // ref.createUser(cred, function(err, userData) {
        //   if (err) {
        //     //loginCtrl.errorMessage = err;
        //     console.log(err);
        //   }
        //   else {
        //     console.log(userData);
        //     users.create(userData, cred);
        //     auth.login(cred.email, cred.password);
        //   }
        //   cb(err, userData);
        // });
      },

      login: function(email, password, cb) {

        auth.$authWithPassword({
          email: email,
          password: password
        }).then(function(authData) {
          console.log("Logged in as:", authData.uid);
          $location.url('/lists');
        }).catch(function(error) {
          console.error("Authentication failed:", error);
          cb(error, null);
        });




        // Create a callback to handle the result of the authentication
        // function authHandler(error, authData) {
        //   if (error) {
        //     console.log("Login Failed!", error);
        //   } else {
        //     console.log("Authenticated successfully with payload:", authData);
        //     auth.isLoggedIn();
        //   }
        // }
        // // Authenticate users with an email/password combination
        // ref.authWithPassword({
        //   email    : email,
        //   password : password
        // }, authHandler);
      },

      logout: function() {
        auth.$unauth();
        $location.url('/login');
      },

      isLoggedIn: function() {
        //synchronously check authentication state
        var authData = auth.$getAuth();

        console.log(authData);
        // Logs the current auth state
        if (authData) {
          $location.url('/lists');
          console.log("User " + authData.uid + " is logged in with " + authData.provider);
        } else {
          $location.url('/login');
          console.log("User is logged out");
        }
      },

      resetPass: function(email, cb) {
        auth.$resetPassword({
          email: email
        }).then(function() {
          var alert = 'Password reset email sent successfully!';
          console.log(alert);
          cb(alert, null);
        }).catch(function(error) {
          console.error("Error: ", error);
          cb(error, null);
        });
      }
    };

    return authFuncs;
  },
]);
