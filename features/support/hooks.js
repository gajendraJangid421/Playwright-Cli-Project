const { After, Before, Status, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium, request } = require('playwright');
const path = require('node:path');
const fs = require('node:fs/promises');
const { SauceDemoPage } = require('../pages/saucedemo.page');
const { SauceDemoApi } = require('./saucedemo.api');

setDefaultTimeout(30_000);

Before(async function () {
  this.browser = await chromium.launch({ headless: process.env.CI === 'true' });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
  this.sauceDemoPage = new SauceDemoPage(this.page, this.baseUrl);

  const requestContext = await request.newContext({ baseURL: this.baseUrl });
  this.api = new SauceDemoApi(requestContext);
});

After(async function (scenario) {
  try {
    if (scenario.result?.status === Status.FAILED && this.page) {
      const filename = scenario.pickle.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      const screenshotPath = path.resolve(
        process.cwd(),
        'artifacts',
        'saucedemo',
        'failures',
        `${filename}.png`,
      );
      await fs.mkdir(path.dirname(screenshotPath), { recursive: true });
      await this.page.screenshot({ path: screenshotPath, fullPage: true });
    }
  } finally {
    try {
      if (this.api) {
        await this.api.dispose();
      }
    } finally {
      if (this.browser) {
        await this.browser.close();
      }
    }
  }
});
