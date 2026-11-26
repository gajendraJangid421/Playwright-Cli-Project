const { World, setWorldConstructor } = require('@cucumber/cucumber');

const baseUrl = process.env.SAUCEDEMO_BASE_URL || 'https://www.saucedemo.com/';

class SauceDemoWorld extends World {
  constructor(options) {
    super(options);
    this.baseUrl = baseUrl;
    this.browser = undefined;
    this.context = undefined;
    this.page = undefined;
    this.sauceDemoPage = undefined;
    this.api = undefined;
  }
}

setWorldConstructor(SauceDemoWorld);
