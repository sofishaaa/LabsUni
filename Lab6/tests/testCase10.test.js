const { chromium } = require('playwright');

describe('TC10 – Verify Subscription in home page', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('Subscribe with email', async () => {
    await page.goto('http://automationexercise.com');
    await page.waitForLoadState('domcontentloaded');

    // Закриваємо попап
    const popupClose = await page.$('button[title="Close"]');
    if (popupClose) await popupClose.click();

    // Прокручуємо до футера
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Вводимо email і підписуємось
    const email = `test${Date.now()}@mail.com`;
    await page.fill('#susbscribe_email', email);
    await page.click('#subscribe');

    // Перевіряємо повідомлення про успішну підписку
    await page.waitForSelector(
      'text=You have been successfully subscribed!',
      { timeout: 10000 }
    );

    console.log(`Підписка пройшла успішно для ${email}`);
  });
});
