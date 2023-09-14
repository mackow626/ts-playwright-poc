import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('User login to demo bank', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    loginPage = new LoginPage(page);
  });

  test('succesfull login', async ({ page }) => {
    //Act
    await loginPage.login(loginData.login, loginData.password);

    //Assert
    await expect(new PulpitPage(page).userNameLabel).toHaveText(
      'Jan Demobankowy',
    );
  });

  test('unsuccesfull login too short username', async ({ page }) => {
    await loginPage.loginInput.fill('teste');
    await loginPage.loginInput.press('Tab');

    await expect(loginPage.loginError).toHaveText(
      'identyfikator ma min. 8 znaków',
    );
  });

  test('unsuccesfull login too short password', async ({ page }) => {
    await loginPage.loginInput.fill(loginData.login);
    await loginPage.passwordInput.fill('fawf');
    await loginPage.passwordInput.blur();

    await expect(loginPage.passwordError).toHaveText('hasło ma min. 8 znaków');
  });
});
