angular
.module('appAuth', [
  'appUsers',
])
.factory('authFuncs', [
  '$rootScope',
  '$q',
  'users',
  '$location',
  '$timeout',
  '$firebaseAuth',
  function( $rootScope, $q, users, $location, $timeout, $firebaseAuth) {
    var ref = new Firebase("https://remto.firebaseio.com");
    auth = $firebaseAuth(ref);

    //ref.set({});

    //var authData = ref.getAuth();

    var authFuncs = {

      clearAll: function() {
        ref.set({});
      },

      create: function(email, password, remember, cb) {
        var cred = {
          email: email,
          password: password
        };

        auth
          .$createUser(cred)
            .then(function(userData) {
              console.log("User " + userData.uid + " created successfully!");
              authFuncs.login(cred.email, cred.password, remember, function(err, succ) {
                if (err) {
                  console.log(err);
                }
                else {
                  users.create(userData, cred);
                }
              });
            })
            .catch(function(error) {
              console.error("Error: ", error);
              cb(error, false);
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

      login: function(email, password, remember, cb) {

        auth.$authWithPassword({
          email: email,
          password: password
        },
        {
          'remember' : (remember ? "default" : "sessionOnly")
        }).then(function(authData) {
          console.log("Logged in as:", authData.uid);
          cb(false, true);
          $location.url('/lists');
        }).catch(function(error) {
          console.error("Authentication failed:", error);
          cb(error, false);
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

      logout: function(cb) {
        auth.$unauth();
        cb();
      },

      isLoggedIn: function(cb) {
        //synchronously check authentication state
        var authData = auth.$getAuth();

        //console.log(authData);
        // Logs the current auth state
        if (authData) {
          cb(null, authData);
          if ($location.path() === '/login') {
            $location.url('/lists');
          }
          //console.log("User " + authData.uid + " is logged in with " + authData.provider);
        } else {
          cb(null, null);
          $location.url('/login');
          //console.log("User is logged out");
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
