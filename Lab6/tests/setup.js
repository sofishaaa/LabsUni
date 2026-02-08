const { chromium } = require('playwright');

let browser;
let page;

beforeAll(async () => {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  await page.goto('https://automationexercise.com');
});

afterAll(async () => {
  await browser.close();
});

module.exports = { page };
