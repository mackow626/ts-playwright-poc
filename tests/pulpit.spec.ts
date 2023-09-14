import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Pulpit tests', () => {
  const transferAmount = '120';
  const title = 'zwrot';
  let publicPage: PulpitPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.login(loginData.login, loginData.password);
    publicPage = new PulpitPage(page);
  });

  test('basic transfer', async ({ page }) => {
    //Act
    await publicPage.transferToInput.selectOption('2');
    await publicPage.transferAmountInput.fill(transferAmount);
    await publicPage.transferTitleInput.fill(title);
    await publicPage.sendTransferButton.click();
    await publicPage.closeConfiramtionButton.click();

    //Assert
    await expect(publicPage.confirmationMessage).toHaveText(
      `Przelew wykonany! Chuck Demobankowy - ${transferAmount},00PLN  - ${title}`,
    );
  });

  test('balance test', async ({ page }) => {
    //Arrange
    const initialBalance = await publicPage.moneyBalance.innerText();
    const expectedBalance = Number(initialBalance) - Number(transferAmount);

    //Act
    await publicPage.transferToInput.selectOption('2');
    await publicPage.transferAmountInput.fill(transferAmount);
    await publicPage.transferTitleInput.fill(title);
    await publicPage.sendTransferButton.click();
    await publicPage.closeConfiramtionButton.click();

    //Assert
    await expect(publicPage.moneyBalance).toHaveText(`${expectedBalance}`);
  });
});
