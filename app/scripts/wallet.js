'use strict';

angular.module('wallet', ['ngRoute', 'ngStorage'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/wallet.html',
        controller: 'WalletCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
;
