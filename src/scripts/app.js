angular
  .module('RemToApp', [
    'angulartics',
    'angulartics.google.analytics',
    'ngRoute',
    'ngAnimate',
    'angular-md5',
    'as.sortable',
    'LoginController',
    'SettingsController',
    'AccountController',
    'ListsController',
    'ListCreateController',
    'TasksController',
    // 'TaskCreateController',
    'TaskEditController',
    'MainController',
    'loadingDirective',
    'firebase',
  ])
  .config([
    '$routeProvider',
    '$locationProvider',
    function ($routeProvider, $locationProvider) {
      'use strict';
      $routeProvider
        .when('/login', {
          templateUrl: '/partials/login-controller.html',
          controller: 'LoginController',
          controllerAs: 'loginCtrl'
        })
        .when('/settings', {
          templateUrl: '/partials/settings-controller.html',
          controller: 'SettingsController',
          controllerAs: 'settingsCtrl'
        })
        .when('/account-details', {
          templateUrl: '/partials/account-controller.html',
          controller: 'AccountController',
          controllerAs: 'accountCtrl'
        })
        .when('/lists', {
          templateUrl: '/partials/lists-controller.html',
          controller: 'ListsController',
          controllerAs: 'listsCtrl'
        })
        .when('/create-list', {
          templateUrl: '/partials/list-creation-controller.html',
          controller: 'ListCreateController',
          controllerAs: 'listCreateCtrl'
        })
        .when('/edit-list/:lid', {
          templateUrl: '/partials/list-creation-controller.html',
          controller: 'ListCreateController',
          controllerAs: 'listCreateCtrl'
        })
        .when('/list/:lid', {
          templateUrl: '/partials/tasks-controller.html',
          controller: 'TasksController',
          controllerAs: 'tasksCtrl'
        })
        // .when('/create-task', {
        //   templateUrl: '/partials/task-creation-controller.html',
        //   controller: 'TaskCreateController',
        //   controllerAs: 'taskCreateCtrl'
        // })
        .when('/list/:lid/edit-task/:tid', {
          templateUrl: '/partials/task-edit-controller.html',
          controller: 'TaskEditController',
          controllerAs: 'taskEditCtrl'
        })
        .otherwise('/login');
    },
  ]);
