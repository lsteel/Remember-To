angular
  .module('RemToApp', [
    'ngRoute',
    'LoginController',
    'ListsController',
    'ListCreateController',
    'MainController',
    'firebase',
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
        .when('/create-list', {
          templateUrl: '/partials/list-creation-controller.html',
          controller: 'ListCreateController',
          controllerAs: 'listCreateCtrl',
        })
        .when('/:lid', {
          templateUrl: '/partials/tasks-controller.html',
          controller: 'TasksController',
          controllerAs: 'tasksCtrl',
        })
        .otherwise('/login');
    },
  ]);
