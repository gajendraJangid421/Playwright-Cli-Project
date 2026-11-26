const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('I am on the SauceDemo login page', async function () {
  await this.api.verifyHomepageAvailable();
  await this.sauceDemoPage.openLoginPage();
});

When('I sign in as {string} with password {string}', async function (username, password) {
  await this.sauceDemoPage.signIn(username, password);
});

Then('I should see the Products page', async function () {
  await this.sauceDemoPage.expectProductsPage();
});

When('I add {string} to the cart', async function (productName) {
  await this.sauceDemoPage.addProductToCart(productName);
});

When('I open the cart and proceed to checkout', async function () {
  await this.sauceDemoPage.openCartAndStartCheckout();
});

When(
  'I enter first name {string}, last name {string}, and postal code {string}',
  async function (firstName, lastName, postalCode) {
    await this.sauceDemoPage.enterCheckoutInformation(firstName, lastName, postalCode);
  },
);

When('I continue and finish the checkout', async function () {
  await this.sauceDemoPage.continueAndFinishCheckout();
});

Then('I should see {string}', async function (confirmation) {
  await expect(this.page.getByRole('heading', { name: confirmation })).toBeVisible();
});

Then('I should see the error {string}', async function (message) {
  await this.sauceDemoPage.expectLoginError(message);
});

Then('I save a screenshot as {string}', async function (relativePath) {
  await this.sauceDemoPage.saveScreenshot(relativePath);
});
