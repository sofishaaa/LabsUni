const { chromium } = require('playwright');

test('TC08 – Verify All Products and Product Detail Page', async () => {
  // 1. Запускаємо браузер у видимому режимі та задаємо User-Agent
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
  });

  // 2. Переходимо на сайт
  await page.goto('https://automationexercise.com', { waitUntil: 'domcontentloaded' });

  // 3. Перевіряємо, що домашня сторінка відкрита
  await page.waitForSelector('body', { timeout: 30000 });

  // 4. Клікаємо на кнопку "Products"
  await page.click('text=Products');

  // 5. Перевіряємо, що відкрито сторінку ALL PRODUCTS
  await page.waitForSelector('text=All Products', { timeout: 30000 });

  // 6. Перевіряємо, що список продуктів відображається
  await page.waitForSelector('.features_items', { timeout: 30000 });

  // 7. Клікаємо "View Product" у першого продукту
  await page.click('.features_items .product-image-wrapper:first-child a:has-text("View Product")');

  // 8. Перевіряємо, що відкрито сторінку деталей продукту
  await page.waitForSelector('.product-information', { timeout: 30000 });

  // 9. Перевіряємо, що відображається інформація про продукт
  const name = await page.locator('.product-information h2').innerText();
  const category = await page.locator('.product-information p:has-text("Category")').innerText();
  const price = await page.locator('.product-information span span').innerText();
  const availability = await page.locator('.product-information p:has-text("Availability")').innerText();
  const condition = await page.locator('.product-information p:has-text("Condition")').innerText();
  const brand = await page.locator('.product-information p:has-text("Brand")').innerText();

  console.log('Назва продукту:', name);
  console.log('Категорія:', category);
  console.log('Ціна:', price);
  console.log('Доступність:', availability);
  console.log('Стан:', condition);
  console.log('Бренд:', brand);

  // Закриваємо браузер
  await browser.close();
});
