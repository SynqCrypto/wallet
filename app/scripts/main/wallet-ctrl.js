'use strict';

var RATES = {
  gbp: 1.00,
  usd: 0.58,
  eur: 0.80
};

angular.module('wallet')
  .controller('WalletCtrl', function ($scope, $localStorage) {
    $scope.currency = 'gbp';
    $scope.total = 1;
    $scope.lastId = 0;

    $scope.transactions = [];

    $scope.newTransaction = function (amount) {
      $scope.transactions.push({
        id: ++$scope.lastId,
        amount: amount,
        date: new Date()
      });
    }

    $scope.inputKeydown = function ($event, exec) {
      if ($event.keyCode === 13) { // Enter key.
        exec();
      }
    };

    $scope.deposit = function () {
      // Normalize amount when depositing.
      var amount = $scope.depositAmount * RATES[$scope.currency];
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
      var amount = $scope.withdrawAmount * RATES[$scope.currency];
      $scope.newTransaction(-amount);
      $scope.total -= amount;
      $scope.withdrawAmount = '';
    };
  })
  .filter('total', function () {
    return function (transactions) {
      var total = 0;
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
      return date.toISOString().slice(11, 19);
    }
  })
  .directive('transactionList', function () {
    return {
      restrict: 'E',
      templateUrl: 'partials/transaction-list.html'
    };
  });
