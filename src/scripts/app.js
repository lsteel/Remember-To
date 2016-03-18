angular
  .module('RemToApp', [
    'ngRoute',
    'LoginController',
    'ListsController',
    'ListCreateController',
    'TasksController',
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
        .when('/update-list/:lid', {
          templateUrl: '/partials/list-creation-controller.html',
          controller: 'ListCreateController',
          controllerAs: 'listCreateCtrl',
        })
        .when('/list/:lid', {
          templateUrl: '/partials/tasks-controller.html',
          controller: 'TasksController',
          controllerAs: 'tasksCtrl',
        })
        .otherwise('/login');
    },
  ]);
