'use strict';

var RATES = {
  gbp: 1.00,
  usd: 0.58,
  eur: 0.80
};

angular.module('wallet')
  .controller('WalletCtrl', function ($scope, $localStorage) {
    $scope.$storage = $localStorage.$default({
      currency: 'gbp',
      lastId: 0,
      transactions: []
    });

    $scope.newTransaction = function (amount) {
      $scope.$storage.transactions.push({
        id: ++$scope.$storage.lastId,
        amount: amount,
        date: +new Date()
      });
    }

    $scope.inputKeydown = function ($event, exec) {
      if ($event.keyCode === 13) { // Enter key.
        exec();
      }
    };

    $scope.deposit = function () {
      // Normalize amount when depositing.
      var amount = $scope.depositAmount * RATES[$scope.$storage.currency];
      $scope.newTransaction(amount);
      $scope.total += amount;
      $scope.depositAmount = '';
    };

    $scope.withdraw = function () {
      if ($scope.total - $scope.withdrawAmount < 0) {
        // Handle this. 
        console.log('Not enough funds.');
        return;
      }
      // Normalize amount when withdrawing.
      var amount = $scope.withdrawAmount * RATES[$scope.$storage.currency];
      $scope.newTransaction(-amount);
      $scope.total -= amount;
      $scope.withdrawAmount = '';
    };
  })
  .filter('total', function () {
    return function (transactions) {
      var total = 0;
      if (!transactions) {
        // Prevents calling undefined.length on $storage.$reset().
        return total;
      }
      for (var i = 0; i < transactions.length; i++) {
        total += transactions[i].amount;
      }
      return total;
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
  })
  .filter('formatDate', function () {
    return function (date) {
      return (new Date(date)).toISOString().slice(11, 19);
    }
  })
  .directive('transactionList', function () {
    return {
      restrict: 'E',
      templateUrl: 'partials/transaction-list.html'
    };
  });
