'use strict';

describe('controllers', function () {
  var scope, ctrl;

  beforeEach(module('wallet'));

  describe('WalletCtrl', function () {
    beforeEach(inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('WalletCtrl', {
        $scope: scope
      });
    }));

    it('should start with 0 transactions', function () {
      expect(angular.isArray(scope.$storage.transactions)).toBeTruthy();
      expect(scope.$storage.transactions.length === 0).toBeTruthy();
    });

    it('should be able to deposit', function () {
      scope.depositAmount = 20;
      scope.deposit();

      expect(scope.$storage.balance === 20).toBeTruthy();
    });
  });
});
