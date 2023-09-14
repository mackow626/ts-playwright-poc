import { Page } from '@playwright/test';

export class PulpitPage {
  constructor(private page: Page) {}
  userNameLabel = this.page.getByTestId('user-name');
  transferToInput = this.page.locator('#widget_1_transfer_receiver');
  transferAmountInput = this.page.locator('#widget_1_transfer_amount');
  transferTitleInput = this.page.locator('#widget_1_transfer_title');
  sendTransferButton = this.page.locator('#execute_btn');
  closeConfiramtionButton = this.page.getByTestId('close-button');
  confirmationMessage = this.page.locator('#show_messages');
  moneyBalance = this.page.locator('#money_value');
}
