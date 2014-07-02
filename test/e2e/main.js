'use strict';

describe('Wallet', function () {

  beforeEach(function () {
    browser.get('http://localhost:3000');
  });

  it('should allow you to add transactions', function () {
    var transactionList = element.all(by.repeater('item in $storage.transactions'));

    // Should be 0 transactions at first.
    expect(transactionList.count()).toBe(0);

    var field = element(by.model('depositAmount'));

    field.sendKeys('123');
    field.sendKeys(protractor.Key.ENTER);

    // Should be 1 transaction now.
    expect(transactionList.count()).toBe(1);
  });

});
