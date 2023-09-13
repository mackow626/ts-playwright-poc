import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';

test.describe('User login to demo bank', () => {
  //Arrange

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('succesfull login', async ({ page }) => {
    //Act
    await page.getByTestId('login-input').fill(loginData.login);
    await page.getByTestId('password-input').fill(loginData.password);
    await page.getByTestId('login-button').click();

    //Assert
    await expect(page.getByTestId('user-name')).toHaveText('Jan Demobankowy');
  });

  test('unsuccesfull login too short username', async ({ page }) => {
    await page.getByTestId('login-input').fill('teste');
    await page.getByTestId('login-input').press('Tab');

    await expect(page.getByTestId('error-login-id')).toHaveText(
      'identyfikator ma min. 8 znaków',
    );
  });

  test('unsuccesfull login too short password', async ({ page }) => {
    await page.getByTestId('login-input').fill(loginData.login);
    await page.getByTestId('password-input').fill('fawf');
    await page.getByTestId('password-input').blur();

    await expect(page.getByTestId('error-login-password')).toHaveText(
      'hasło ma min. 8 znaków',
    );
  });
});
