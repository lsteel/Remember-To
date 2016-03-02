angular
.module('appAuth', [
  'appUsers',
])
.factory('auth', [
  '$q',
  'users',
  '$location',
  function($q, users, $location) {
    var refData = new Firebase("https://remto.firebaseio.com");
    // var remToData = {
    //   users: {
    //     name: 'name'
    //   }
    // };
    // console.log(remToData);
    // refData.set(remToData);

    var authData = refData.getAuth();

    var auth = {

      create: function(email, password) {
        var cred = {
          email: email,
          password: password
        };
        refData.createUser(cred, function(err, userData) {
          if (err) {
            //loginCtrl.errorMessage = err;
            console.log(err);
          }
          else {
            console.log(userData);
            users.create(userData);
            auth.login(cred.email, cred.password);
          }
        });
      },

      login: function(email, password) {
        // Create a callback to handle the result of the authentication
        function authHandler(error, authData) {
          if (error) {
            console.log("Login Failed!", error);
          } else {
            console.log("Authenticated successfully with payload:", authData);
          }
        }
        // Authenticate users with an email/password combination
        refData.authWithPassword({
          email    : email,
          password : password
        }, authHandler);
      },

      logout: function() {
        console.log('reached auth logout');
        refData.unauth();
      },

      isLoggedIn: function() {
        //synchronously check authentication state
        var authData = refData.getAuth();
        authDataCheck(authData);


        function authDataCheck(authData) {
          // Logs the current auth state
          if (authData) {
            $location.url('/lists');
            console.log("User " + authData.uid + " is logged in with " + authData.provider);
          } else {
            $location.url('/login');
            console.log("User is logged out");
          }
        }
      }
    };

    return auth;
  },
]);
