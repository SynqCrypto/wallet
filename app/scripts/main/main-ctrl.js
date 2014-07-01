'use strict';

angular.module('wallet')
  .controller('WalletCtrl', function ($scope) {
    $scope.currency = 'eur';
    $scope.total = 0;
  })
  .filter('icon', function () {
    return function (name) {
      return 'fa-' + name;
    };
  });
