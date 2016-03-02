angular
.module('appAuth', [
  'appUsers',
])
.factory('auth', [
  '$q',
  'users',
  '$location',
  function($q, users) {
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
        refData.createUser(cred, function(err, userCred) {
          if (err != null) {
            //loginCtrl.errorMessage = err;
            console.log(err);
          }
          else {
            console.log(userCred);
            users.create(userCred);
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
          email    : 'email',
          password : 'password'
        }, authHandler);
      },

      logout: function() {
        refData.unauth();
      },

      isLoggedIn: function() {
        //synchronously check authentication state
        var authData = refData.getAuth();
        authDataCheck(authData);


        function authDataCheck(authData) {
          // Logs the current auth state
          if (authData) {
            console.log("User " + authData.uid + " is logged in with " + authData.provider);
            $location.url('/lists');
          } else {
            console.log("User is logged out");
          }
        }
      }
    };

    return auth;
  },
]);
