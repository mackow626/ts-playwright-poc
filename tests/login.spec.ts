import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';

test.describe('User login to demo bank', () => {
  //Arrange

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('succesfull login', async ({ page }) => {
    //Act
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(loginData.login);
    await loginPage.passwordInput.fill(loginData.login);
    await loginPage.loginButton.click();

    //Assert
    await expect(page.getByTestId('user-name')).toHaveText('Jan Demobankowy');
  });

  test('unsuccesfull login too short username', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill('teste');
    await page.getByTestId('login-input').press('Tab');

    await expect(loginPage.loginError).toHaveText(
      'identyfikator ma min. 8 znaków',
    );
  });

  test('unsuccesfull login too short password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(loginData.login);
    await loginPage.passwordInput.fill('fawf');
    await loginPage.passwordInput.blur();

    await expect(loginPage.passwordError).toHaveText('hasło ma min. 8 znaków');
  });
});
