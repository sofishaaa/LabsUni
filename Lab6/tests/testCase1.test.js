const { chromium } = require('playwright');

test('TC01 – Register User', async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto('https://automationexercise.com');
  await page.click('text=Signup / Login');

  await page.fill('[data-qa="signup-name"]', 'TestUser');
  await page.fill(
    '[data-qa="signup-email"]',
    `test${Date.now()}@mail.com`
  );

  await page.click('[data-qa="signup-button"]');
  await page.waitForSelector('text=ENTER ACCOUNT INFORMATION');

  await browser.close();
});
