const { chromium } = require('playwright');

test(
  'TC05 – Register with existing email',
  async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    // 1. Відкриваємо сайт і створюємо акаунт
    await page.goto('http://automationexercise.com');
    await page.click('text=Signup / Login');
    await page.fill('[data-qa="signup-name"]', 'TestUser');
    const uniqueEmail = `test${Date.now()}@mail.com`; // унікальний email для першої реєстрації
    await page.fill('[data-qa="signup-email"]', uniqueEmail);
    await page.click('[data-qa="signup-button"]');

    // 2. Заповнюємо форму реєстрації
    await page.waitForSelector('[data-qa="password"]', { timeout: 90000 });
    await page.fill('[data-qa="password"]', 'Password123');
    await page.fill('[data-qa="first_name"]', 'Test');
    await page.fill('[data-qa="last_name"]', 'User');
    await page.fill('[data-qa="address"]', 'Test address');
    await page.selectOption('[data-qa="country"]', 'Canada');
    await page.fill('[data-qa="state"]', 'Test');
    await page.fill('[data-qa="city"]', 'Test');
    await page.fill('[data-qa="zipcode"]', '12345');
    await page.fill('[data-qa="mobile_number"]', '123456789');

    // Натискаємо "Create Account"
    await page.click('[data-qa="create-account"]');
    await page.waitForSelector('text=ACCOUNT CREATED!', { timeout: 90000 });
    await page.click('text=Continue');

    // Відкриваємо нову вкладку для перевірки існуючого email
    const page2 = await browser.newPage();
    await page2.goto('http://automationexercise.com');
    await page2.click('text=Signup / Login');
    await page2.fill('[data-qa="signup-name"]', 'TestUser');
    await page2.fill('[data-qa="signup-email"]', uniqueEmail);
    await page2.click('[data-qa="signup-button"]');

    // Чекаємо повідомлення про існуючий email
    await page2.waitForSelector('text=Email Address already exist!', { timeout: 90000 });

    console.log('TC05 пройшов успішно!');

    await browser.close();
  },
  180000 // Jest таймаут 3 хв
);
