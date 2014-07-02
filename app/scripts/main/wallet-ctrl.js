'use strict';

var RATES = {
  gbp: 1.00,
  usd: 0.58,
  eur: 0.80
};

// Tests for a float with either period or comma, and also for just an empty string.
var FLOAT_REGEXP = /^\-?\d+((\.|\,)\d+)?$|^$/;

angular.module('wallet')
  .controller('WalletCtrl', function ($scope, $localStorage) {
    $scope.$storage = $localStorage.$default({
      currency: 'gbp',
      lastId: 0,
      transactions: [],
      balance: 0
    });

    $scope.newTransaction = function (amount) {
      $scope.$storage.transactions.push({
        id: ++$scope.$storage.lastId,
        amount: amount,
        date: +new Date()
      });
    };

    $scope.inputKeydown = function ($event, exec) {
      if ($event.keyCode === 13) { // Enter key.
        exec();
      }
    };

    $scope.deposit = function () {
      if (!$scope.depositAmount) { // If empty string.
        return;
      }

      // Normalize amount when depositing.
      var amount = $scope.depositAmount * RATES[$scope.$storage.currency];
      $scope.newTransaction(amount);
      $scope.$storage.balance += amount;
      $scope.depositAmount = '';
    };

    $scope.withdraw = function () {
      if (!$scope.withdrawAmount) { // If empty string.
        return;
      }

      if ($scope.form.withdrawAmount.$error.overdraft) {
        return;
      }
      // Normalize amount when withdrawing.
      var amount = $scope.withdrawAmount * RATES[$scope.$storage.currency];
      $scope.newTransaction(-amount);
      $scope.$storage.balance -= amount;
      $scope.withdrawAmount = '';
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
    };
  })
  .directive('transactionList', function () {
    return {
      restrict: 'E',
      templateUrl: 'partials/transaction-list.html'
    };
  })
  .directive('smartFloat', function () {
    return {
      require: 'ngModel',
      link: function (scope, elm, attrs, ctrl) {
        ctrl.$parsers.unshift(function (viewValue) {
          if (FLOAT_REGEXP.test(viewValue)) {
            ctrl.$setValidity('float', true);
            return parseFloat(viewValue.replace(',', '.'));
          } else {
            ctrl.$setValidity('float', false);
            return undefined;
          }
        });
      }
    };
  })
  .directive('noOverdraft', function () {
    return {
      require: 'ngModel',
      link: function (scope, elm, attrs, ctrl) {
        ctrl.$parsers.unshift(function (viewValue) {
          if (viewValue <= scope.$storage.balance) {
            ctrl.$setValidity('overdraft', true);
          } else {
            ctrl.$setValidity('overdraft', false);
          }
          return viewValue;
        });
      }
    };
  });
