angular
  .module('loadingDirective', [
  ])
  .directive('loading', [
    function() {
      return {
        restrict: 'AE',
        scope: {},
        template: '',
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
