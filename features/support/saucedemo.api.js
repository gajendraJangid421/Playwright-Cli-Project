class SauceDemoApi {
  constructor(requestContext) {
    this.requestContext = requestContext;
  }

  async verifyHomepageAvailable() {
    const response = await this.requestContext.get('/');
    if (!response.ok()) {
      throw new Error(`SauceDemo homepage returned HTTP ${response.status()}`);
    }

    const body = await response.text();
    if (!body.includes('Swag Labs')) {
      throw new Error('SauceDemo homepage response did not contain "Swag Labs"');
    }
  }

  async dispose() {
    await this.requestContext.dispose();
  }
}

module.exports = { SauceDemoApi };
