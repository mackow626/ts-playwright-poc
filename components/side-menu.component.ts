import { Page } from '@playwright/test';

export class SideMenuComponent {
  constructor(private page: Page) {}
  paymentTab = this.page.getByRole('link', { name: 'płatności' });
}
