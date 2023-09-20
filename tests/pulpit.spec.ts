import { expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { test } from '../fixtures/basePage';

test.describe('Pulpit tests', () => {
  const transferAmount = '120';
  const title = 'zwrot';

  test.beforeEach(async ({ page, loginPage }) => {
    await page.goto('/');
    await loginPage.login(loginData.login, loginData.password);
  });

  test('basic transfer', async ({ pulpitPage }) => {
    //Act
    await pulpitPage.makeTranser(transferAmount, title);

    //Assert
    await expect(pulpitPage.confirmationMessage).toContainText(
      `Przelew wykonany! Chuck Demobankowy - ${transferAmount}`,
    );
    await expect(pulpitPage.confirmationMessage).toContainText(`${title}`);
  });

  test('balance test', async ({ pulpitPage }) => {
    //Arrange
    const initialBalance = await pulpitPage.moneyBalance.innerText();
    const expectedBalance = Number(initialBalance) - Number(transferAmount);

    //Act
    await pulpitPage.makeTranser(transferAmount, title);

    //Assert
    await expect(pulpitPage.moneyBalance).toHaveText(`${expectedBalance}`);
  });
});
