const { expect } = require('@playwright/test');
const fs = require('node:fs/promises');
const path = require('node:path');

class SauceDemoPage {
  constructor(page, baseUrl) {
    this.page = page;
    this.baseUrl = baseUrl;
  }

  async openLoginPage() {
    await this.page.goto(this.baseUrl);
  }

  async signIn(username, password) {
    await this.page.getByRole('textbox', { name: 'Username' }).fill(username);
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async expectProductsPage() {
    await expect(this.page).toHaveURL(/inventory\.html$/);
    await expect(this.page.getByText('Products', { exact: true })).toBeVisible();
  }

  async addProductToCart(productName) {
    const product = this.page.locator('.inventory_item').filter({ hasText: productName });
    await expect(product).toBeVisible();
    await product.getByRole('button', { name: 'Add to car' }).click();
  }

  async openCartAndStartCheckout() {
    await this.page.getByRole('button', { name: /^Cart/ }).click();
    await expect(this.page).toHaveURL(/cart\.html$/);
    await this.page.getByRole('button', { name: 'Checkout' }).click();
    await expect(this.page).toHaveURL(/checkout-step-one\.html$/);
  }

  async enterCheckoutInformation(firstName, lastName, postalCode) {
    await this.page.getByRole('textbox', { name: 'First Name' }).fill(firstName);
    await this.page.getByRole('textbox', { name: 'Last Name' }).fill(lastName);
    await this.page.getByRole('textbox', { name: 'Zip/Postal Code' }).fill(postalCode);
  }

  async continueAndFinishCheckout() {
    await this.page.getByRole('button', { name: 'Continue' }).click();
    await expect(this.page).toHaveURL(/checkout-step-two\.html$/);
    await this.page.getByRole('button', { name: 'Finish' }).click();
    await expect(this.page).toHaveURL(/checkout-complete\.html$/);
  }

  async expectLoginError(message) {
    await expect(this.page.getByRole('alert')).toHaveText(message);
  }

  async saveScreenshot(relativePath) {
    const screenshotPath = path.resolve(process.cwd(), relativePath);
    await fs.mkdir(path.dirname(screenshotPath), { recursive: true });
    await this.page.screenshot({ path: screenshotPath, fullPage: true });
  }
}

module.exports = { SauceDemoPage };
