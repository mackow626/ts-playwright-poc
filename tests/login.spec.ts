import { loginData } from '../test-data/login.data';
import { test } from '../fixtures/basePage';
import { expect } from '@playwright/test';

test.describe('User login to demo bank', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    console.log(await page.context().storageState());
  });

  test('succesfull login', async ({ loginPage, pulpitPage }) => {
    //Act
    await loginPage.login(loginData.login, loginData.password);

    //Assert
    await expect(pulpitPage.userNameLabel).toHaveText('Jan Demobankowy');
  });

  test('unsuccesfull login too short username', async ({ loginPage }) => {
    await loginPage.loginInput.fill('teste');
    await loginPage.loginInput.press('Tab');

    await expect(loginPage.loginError).toHaveText(
      'identyfikator ma min. 8 znaków',
    );
  });

  test('unsuccesfull login too short password', async ({ loginPage }) => {
    await loginPage.loginInput.fill(loginData.login);
    await loginPage.passwordInput.fill('fawf');
    await loginPage.passwordInput.blur();

    await expect(loginPage.passwordError).toHaveText('hasło ma min. 8 znaków');
  });
});
