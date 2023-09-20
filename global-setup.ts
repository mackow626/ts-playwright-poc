import { expect } from '@playwright/test';
import { loginData } from './test-data/login.data';
import { test } from './fixtures/basePage';

test('login', async ({ page, loginPage, pulpitPage }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await loginPage.login(loginData.login, loginData.password);
  await expect(pulpitPage.userNameLabel).toHaveText('Jan Demobankowy');

  console.log(await page.context().storageState());
  await page.context().storageState({ path: './LoginAuth.json' });
});
