const { chromium } = require('playwright');

test('TC02 – Login with correct email and password', async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  const email = `test${Date.now()}@mail.com`;
  const password = 'Password123';

  // 1. Open site
  await page.goto('https://automationexercise.com');

  // 2. Register user
  await page.click('text=Signup / Login');
  await page.fill('[data-qa="signup-name"]', 'TestUser');
  await page.fill('[data-qa="signup-email"]', email);
  await page.click('[data-qa="signup-button"]');

  await page.waitForSelector('text=ENTER ACCOUNT INFORMATION');
  await page.fill('[data-qa="password"]', password);
  await page.selectOption('[data-qa="days"]', '1');
  await page.selectOption('[data-qa="months"]', '1');
  await page.selectOption('[data-qa="years"]', '2000');

  await page.fill('[data-qa="first_name"]', 'Test');
  await page.fill('[data-qa="last_name"]', 'User');
  await page.fill('[data-qa="address"]', 'Test address');
  await page.selectOption('[data-qa="country"]', 'Canada');
  await page.fill('[data-qa="state"]', 'Test');
  await page.fill('[data-qa="city"]', 'Test');
  await page.fill('[data-qa="zipcode"]', '12345');
  await page.fill('[data-qa="mobile_number"]', '123456789');

  await page.click('[data-qa="create-account"]');
  await page.waitForSelector('text=ACCOUNT CREATED!');
  await page.click('text=Continue');

  // 3. Logout
  await page.click('text=Logout');

  // 4. Login with correct credentials
  await page.fill('[data-qa="login-email"]', email);
  await page.fill('[data-qa="login-password"]', password);
  await page.click('[data-qa="login-button"]');

  // 5. Verify login
  await page.waitForSelector('text=Logged in as');

  await browser.close();
});
