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

  const searchBox = await driver.wait(
    until.elementLocated(By.css('#autosuggest > div:nth-child(1) > input[type=text]')),
    20000
  );
  expect(searchBox).toBeTruthy();

  await searchBox.sendKeys('ноутбук', '\n'); // Enter замість submit()

  const results = await driver.wait(
    until.elementLocated(By.css('.list-item')),
    20000
  );
  expect(results).toBeTruthy();
}, 40000);
