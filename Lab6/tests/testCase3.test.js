const { chromium } = require('playwright');

test('TC03 – Login with incorrect email and password', async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto('https://automationexercise.com');
  await page.click('text=Signup / Login');

  await page.fill('[data-qa="login-email"]', 'wrong@mail.com');
  await page.fill('[data-qa="login-password"]', 'wrongpass');
  await page.click('[data-qa="login-button"]');

  await page.waitForSelector('text=Your email or password is incorrect!');

  await browser.close();
});
