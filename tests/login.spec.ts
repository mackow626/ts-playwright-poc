import { test, expect } from '@playwright/test';

test.describe('User login to demo bank', () => {

  test('succesfull login', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('tester12');
    await page.getByTestId('password-input').fill('segseggg');
    await page.getByTestId('login-button').click();
    const newLocal = page.getByTestId('user-name');

    await expect(newLocal).toHaveText('Jan Demobankowy');
  });

  test('unsuccesfull login too short username', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('teste');
    await page.getByTestId('login-input').press('Tab');

    await expect(page.getByTestId('error-login-id')).toHaveText('identyfikator ma min. 8 znaków')
  });

  test('unsuccesfull login too short password', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('tester12');
    await page.getByTestId('password-input').fill('fawf');
    await page.getByTestId('password-input').blur();

    await expect(page.getByTestId('error-login-password')).toHaveText('hasło ma min. 8 znaków');
  });

});