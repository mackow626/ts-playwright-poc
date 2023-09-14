import { Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.component';

export class PaymentPage {
  constructor(private page: Page) {}
  sideMenu = new SideMenuComponent(this.page);
  transferReciverInput = this.page.getByTestId('transfer_receiver');
  transferToInput = this.page.getByTestId('form_account_to');
  amountInput = this.page.getByTestId('form_amount');
  sendTransferButton = this.page.getByRole('button', {
    name: 'wykonaj przelew',
  });
  closeConfiramtionButton = this.page.getByTestId('close-button');

  async makeTransfer(
    reciver: string,
    accountNumber: string,
    transferAmount: string,
  ): Promise<void> {
    await this.transferReciverInput.fill(reciver);
    await this.transferToInput.fill(accountNumber);
    await this.amountInput.fill(transferAmount);
    await this.sendTransferButton.click();
    await this.closeConfiramtionButton.click();
  }
}
