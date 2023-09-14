import { Page } from '@playwright/test';

export class PaymentPage {
  constructor(private page: Page) {}
  transferReciverInput = this.page.getByTestId('transfer_receiver');
  transferToInput = this.page.getByTestId('form_account_to');
  amountInput = this.page.getByTestId('form_amount');
  sendTransferButton = this.page.getByRole('button', {
    name: 'wykonaj przelew',
  });
  closeConfiramtionButton = this.page.getByTestId('close-button');
}
