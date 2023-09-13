import { test, expect } from '@playwright/test';

test.describe('Pulpit tests', () => {

    test('basic transfer', async ({ page }) => {
        await page.goto('https://demo-bank.vercel.app/');
        await page.getByTestId('login-input').fill('tester12');
        await page.getByTestId('password-input').fill('segseggg');
        await page.getByTestId('login-button').click();
       
        await page.locator('#widget_1_transfer_receiver').selectOption('2');
        await page.locator('#widget_1_transfer_amount').click();
        await page.locator('#widget_1_transfer_amount').fill('120');
        await page.locator('#widget_1_transfer_title').click();
        await page.locator('#widget_1_transfer_title').fill('zwrot');
        await page.locator('#execute_btn').click();
        await page.getByTestId('close-button').click();
        await expect(page.locator('#show_messages')).toHaveText('Przelew wykonany! Chuck Demobankowy - 120,00PLN - zwrot');
      
    });
});