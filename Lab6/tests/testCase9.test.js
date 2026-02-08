const { chromium } = require('playwright');

describe('TC09 – Search Product', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('Search for a product', async () => {
    await page.goto('http://automationexercise.com');
    await page.waitForLoadState('domcontentloaded');

    // Закриваємо попап
    const popupClose = await page.$('button[title="Close"]');
    if (popupClose) await popupClose.click();

    // Переходимо на All Products
    await page.click('a[href="/products"]');
    await page.waitForSelector('text=All Products', { timeout: 30000 });

    // Вводимо назву продукту
    const searchProduct = 'Blue Top';
    await page.fill('#search_product', searchProduct);
    await page.click('#submit_search');

    // Перевіряємо результат
    await page.waitForSelector(`text=${searchProduct}`, { timeout: 10000 });
    console.log(`Знайдено продукт: ${searchProduct}`);
  });
});
