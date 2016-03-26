angular
  .module('RemToApp', [
    'ngRoute',
    'ngAnimate',
    'as.sortable',
    'LoginController',
    'ListsController',
    'ListCreateController',
    'TasksController',
    'TaskCreateController',
    'TaskEditController',
    'MainController',
    'loadingDirective',
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
        .when('/edit-list/:lid', {
          templateUrl: '/partials/list-creation-controller.html',
          controller: 'ListCreateController',
          controllerAs: 'listCreateCtrl',
        })
        .when('/list/:lid', {
          templateUrl: '/partials/tasks-controller.html',
          controller: 'TasksController',
          controllerAs: 'tasksCtrl',
        })
        .when('/create-task', {
          templateUrl: '/partials/task-creation-controller.html',
          controller: 'TaskCreateController',
          controllerAs: 'taskCreateCtrl',
        })
        .when('/list/:lid/edit-task/:tid', {
          templateUrl: '/partials/task-edit-controller.html',
          controller: 'TaskEditController',
          controllerAs: 'taskEditCtrl',
        })
        .otherwise('/login');
    },
  ]);
