const { Builder, By, until } = require('selenium-webdriver');

let driver;

beforeAll(async () => {
  driver = await new Builder().forBrowser('chrome').build();
}, 40000);

afterAll(async () => {
  await driver.quit();
});

test('Пошукове поле доступне на Hotline', async () => {
  await driver.get('https://hotline.ua/');

  // Знаходимо поле пошуку
  const searchBox = await driver.wait(
    until.elementLocated(By.css('#autosuggest > div:nth-child(1) > input[type=text]')),
    20000
  );

  // Переконуємось, що воно видиме
  await driver.wait(until.elementIsVisible(searchBox), 10000);

  // Вводимо запит і натискаємо Enter
  await searchBox.sendKeys('ноутбук', '\n');

  // Перевіряємо, що з’явились результати
  const results = await driver.wait(
    until.elementLocated(By.css('.list-item')),
    20000
  );
  expect(results).toBeTruthy();
}, 40000);
