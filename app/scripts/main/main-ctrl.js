'use strict';

var RATES = {
  gbp: 1.00,
  usd: 0.58,
  eur: 0.80
};

angular.module('wallet')
  .controller('WalletCtrl', function ($scope) {
    $scope.currency = 'gbp';
    $scope.total = 1;

    $scope.deposit = function () {
      // Normalize amount when depositing.
      $scope.total += $scope.depositAmount * RATES[$scope.currency];
    };

    $scope.withdraw = function () {
      if ($scope.total - $scope.withdrawAmount < 0) {
        // Handle this.
        console.log('Not enough funds.');
        return;
      }
      $scope.total -= $scope.withdrawAmount * RATES[$scope.currency];
    };
  })
  .filter('icon', function () {
    return function (name) {
      return 'fa-' + name;
    };
  })
  .filter('currency', function () {
    return function (amount, curr) {
      return (amount / RATES[curr]).toFixed(2);
    };
  });
