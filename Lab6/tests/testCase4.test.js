const { Builder, By, until } = require('selenium-webdriver');
let driver;

beforeAll(async () => {
  driver = await new Builder().forBrowser('chrome').build();
  await driver.get('http://automationexercise.com');
}, 30000);

afterAll(async () => { await driver.quit(); });

test('TC04 – Logout User', async () => {
  // 1. Клік на Signup / Login
  await driver.findElement(By.linkText('Signup / Login')).click();

  // 2. Реєстрація нового акаунта
  await driver.findElement(By.css('input[data-qa="signup-name"]')).sendKeys('TestUser');
  const uniqueEmail = `test${Date.now()}@mail.com`;
  await driver.findElement(By.css('input[data-qa="signup-email"]')).sendKeys(uniqueEmail);

  const signupBtn = await driver.findElement(By.css('button[data-qa="signup-button"]'));
  await driver.executeScript("arguments[0].click();", signupBtn);

  // 3. Заповнення форми
  await driver.wait(until.elementLocated(By.css('input[data-qa="password"]')), 20000);
  await driver.findElement(By.css('input[data-qa="password"]')).sendKeys('Password123');
  await driver.findElement(By.css('input[data-qa="first_name"]')).sendKeys('Test');
  await driver.findElement(By.css('input[data-qa="last_name"]')).sendKeys('User');
  await driver.findElement(By.css('input[data-qa="address"]')).sendKeys('Test address');
  await driver.findElement(By.css('select[data-qa="country"]')).sendKeys('Canada');
  await driver.findElement(By.css('input[data-qa="state"]')).sendKeys('Test');
  await driver.findElement(By.css('input[data-qa="city"]')).sendKeys('Test');
  await driver.findElement(By.css('input[data-qa="zipcode"]')).sendKeys('12345');
  await driver.findElement(By.css('input[data-qa="mobile_number"]')).sendKeys('123456789');

  const createBtn = await driver.findElement(By.css('button[data-qa="create-account"]'));
  await driver.executeScript("arguments[0].click();", createBtn);

  // 4. Перевірка створення акаунта (точний селектор #form h2 b)
  await driver.wait(until.elementLocated(By.css('#form h2 b')), 30000);
  const createdMsg = await driver.findElement(By.css('#form h2 b')).getText();
  console.log("Created message:", createdMsg);
  expect(createdMsg).toBe('ACCOUNT CREATED!');

  const continueBtn = await driver.findElement(By.linkText('Continue'));
  await driver.executeScript("arguments[0].click();", continueBtn)});