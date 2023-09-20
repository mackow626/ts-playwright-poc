import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';
import { PaymentPage } from '../pages/payment.page';

export const test = base.extend<{
  loginPage: LoginPage;
  pulpitPage: PulpitPage;
  paymentPage: PaymentPage;
}>({
  // Define a fixture. Note that it can use built-in fixture "page"
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  pulpitPage: async ({ page }, use) => {
    await use(new PulpitPage(page));
  },
  paymentPage: async ({ page }, use) => {
    await use(new PaymentPage(page));
  },
});
