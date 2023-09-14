import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';

test.describe('Payment tests', () => {
  const transferAmount = '120';
  const title = 'zwrot';

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(loginData.login);
    await loginPage.passwordInput.fill(loginData.login);
    await loginPage.loginButton.click();
    await page.getByRole('link', { name: 'płatności' }).click();
  });

  test('simple payment', async ({ page }) => {
    // Arrange
    const transferAmount = '222';
    const accountNumber = '12 3123 1231 2312 3333 3333';
    const reciver = 'Jan nowak';

    //Act
    await page.getByTestId('transfer_receiver').fill(reciver);
    await page.getByTestId('form_account_to').fill(accountNumber);
    await page.getByTestId('form_amount').fill(transferAmount);
    await page.getByRole('button', { name: 'wykonaj przelew' }).click();
    await page.getByTestId('close-button').click();

    //Assert
    await expect(page.locator('#show_messages')).toHaveText(
      'Przelew wykonany! 222,00PLN dla Jan nowak',
    );
  });
});
