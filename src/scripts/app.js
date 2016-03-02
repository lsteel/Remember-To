angular
.module('RemToApp', [
  'ngRoute',
  'LoginController',
  'ListsController',
])
.config([
  '$routeProvider',
  function ($routeProvider) { 'use strict';
    $routeProvider
      .when('/login', {
        templateUrl: '/partials/login-controller.html',
        controller: 'LoginController',
        controllerAs: 'loginCtrl',
      })
      .when('/lists', {
        templateUrl: '/partials/lists-controller.html',
        controller: 'ListsController',
        controllerAs: 'listsCtrl',
      })
      .otherwise('/login');
  },
]);
