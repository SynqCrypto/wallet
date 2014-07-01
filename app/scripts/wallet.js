'use strict';

angular.module('wallet', ['ngRoute'])
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
