import { expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { test } from '../fixtures/basePage';

test.describe('Payment tests', () => {
  test('simple payment', async ({
    page,
    loginPage,
    pulpitPage,
    paymentPage,
  }) => {
    await page.goto('/');
    await loginPage.login(loginData.login, loginData.password);
    await pulpitPage.sideMenu.paymentTab.click();
    // Arrange
    const transferAmount = '222';
    const accountNumber = '12 3123 1231 2312 3333 3333';
    const reciver = 'Jan nowak';

    //Act
    await paymentPage.makeTransfer(reciver, accountNumber, transferAmount);

    //Assert
    await expect(pulpitPage.confirmationMessage).toHaveText(
      'Przelew wykonany! 222,00PLN dla Jan nowak',
    );
  });
});
