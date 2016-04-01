angular
.module('MainController', [
  'appUsers',
  'appAuth',
])
.controller('MainController', [
  '$rootScope',
  '$window',
  '$location',
  '$timeout',
  '$firebaseAuth',
  'authFuncs',
  'users',
  function ($rootScope, $window, $location, $timeout, $firebaseAuth, authFuncs, users) {
    var mainCtrl = this;
    $rootScope.rsLoading = true;
    $rootScope.path = $location.path();
    $rootScope.standalone = ($window.navigator.standalone ? true : false);

    var domain = $window.location.pathname;

    $rootScope.$on("$locationChangeStart", function (event, next, current) {
      $('html, body').animate({
        scrollTop: $('body').offset().top
      }, 750);
      $rootScope.path = next.replace(/^.*\/\/[^\/]+/, '');
      $rootScope.prevPath = current.replace(/^.*\/\/[^\/]+/, '');
      console.log($rootScope.prevPath + ', ' + $rootScope.path);
      $rootScope.rsLoading = true;

      authFuncs.isLoggedIn(function(err, data) {
        if (err) {
          console.log(err);
        }
        else if (data) {
          var ref = new Firebase("https://remto.firebaseio.com");
          auth = $firebaseAuth(ref);
          var sessionTimeout = auth.$getAuth().expires * 1000;
          var d = new Date();
          var n = d.getTime();

          var timer = sessionTimeout - n;

          console.log((timer / 1000) + " seconds until session expiration.");

          $timeout(function() {
            $location.path("/");
          },timer);
        }
      });

    });
  },
]);
