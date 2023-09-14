import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PaymentPage } from '../pages/payment.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Payment tests', () => {
  const transferAmount = '120';
  const title = 'zwrot';

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.login(loginData.login, loginData.password);
    await new PulpitPage(page).sideMenu.paymentTab.click();
  });

  test('simple payment', async ({ page }) => {
    // Arrange
    const transferAmount = '222';
    const accountNumber = '12 3123 1231 2312 3333 3333';
    const reciver = 'Jan nowak';

    //Act
    const paymentPage = new PaymentPage(page);
    await paymentPage.makeTransfer(reciver, accountNumber, transferAmount);

    //Assert
    await expect(new PulpitPage(page).confirmationMessage).toHaveText(
      'Przelew wykonany! 222,00PLN dla Jan nowak',
    );
  });
});
