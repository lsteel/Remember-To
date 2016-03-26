angular
  .module('loadingDirective', [
  ])
  .directive('loading', [
    function() {
      return {
        restrict: 'AE',
        scope: {},
        template: '<img src="/images/remember-to-loading.gif" />',
        link: function(scope, elem, attrs) {
          // scope.logoutClickHandler = function() {
          //   auth.logout().then(function() {
          //     $location.url('/login');
          //   });
          // };
        },
      };
    }
  ]);
