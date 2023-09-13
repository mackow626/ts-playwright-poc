import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';

test.describe('Pulpit tests', () => {
  const transferAmount = '120';
  const title = 'zwrot';

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('login-input').fill(loginData.login);
    await page.getByTestId('password-input').fill(loginData.password);
    await page.getByTestId('login-button').click();
  });

  test('basic transfer', async ({ page }) => {
    //Act
    await page.locator('#widget_1_transfer_receiver').selectOption('2');
    await page.locator('#widget_1_transfer_amount').click();
    await page.locator('#widget_1_transfer_amount').fill(transferAmount);
    await page.locator('#widget_1_transfer_title').click();
    await page.locator('#widget_1_transfer_title').fill(title);
    await page.locator('#execute_btn').click();
    await page.getByTestId('close-button').click();

    //Assert
    await expect(page.locator('#show_messages')).toHaveText(
      `Przelew wykonany! Chuck Demobankowy - ${transferAmount},00PLN - ${title}`,
    );
  });

  test('balance test', async ({ page }) => {
    //Arrange
    const initialBalance = await page.locator('#money_value').innerText();
    const expectedBalance = Number(initialBalance) - Number(transferAmount);

    //Act
    await page.locator('#widget_1_transfer_receiver').selectOption('2');
    await page.locator('#widget_1_transfer_amount').click();
    await page.locator('#widget_1_transfer_amount').fill(transferAmount);
    await page.locator('#widget_1_transfer_title').click();
    await page.locator('#widget_1_transfer_title').fill(title);
    await page.locator('#execute_btn').click();
    await page.getByTestId('close-button').click();

    //Assert
    await expect(page.locator('#money_value')).toHaveText(`${expectedBalance}`);
  });
});
