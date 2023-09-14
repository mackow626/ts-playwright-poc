import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}
  loginInput = this.page.getByTestId('login-input');
  passwordInput = this.page.getByTestId('password-input');
  loginButton = this.page.getByTestId('login-button');
  loginError = this.page.getByTestId('error-login-id');
  passwordError = this.page.getByTestId('error-login-password');

  async login(user: string, password: string): Promise<void> {
    await this.loginInput.fill(user);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
