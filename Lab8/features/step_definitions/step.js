const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { Builder, By, until } = require('selenium-webdriver');

let driver;

// Збільшуємо таймаут для всіх кроків до 60 секунд
setDefaultTimeout(60 * 1000);

Given('I open the browser', async function () {
  driver = await new Builder().forBrowser('chrome').build();
});

When('I navigate to the homepage', async function () {
  await driver.get('http://automationexercise.com');
});

When('I click on Signup Login', async function () {
  await driver.findElement(By.linkText('Signup / Login')).click();
});

// Генеруємо унікальний email, якщо у .feature файлі написано "unique"
When('I enter name {string} and email {string}', async function (name, email) {
  let finalEmail = email;
  if (email === 'unique') {
    finalEmail = `test${Date.now()}@mail.com`;
  }
  await driver.findElement(By.css('input[data-qa="signup-name"]')).sendKeys(name);
  await driver.findElement(By.css('input[data-qa="signup-email"]')).sendKeys(finalEmail);
});

When('I click Signup button', async function () {
  const btn = await driver.findElement(By.css('button[data-qa="signup-button"]'));
  await driver.executeScript("arguments[0].click();", btn);
});

// Заповнення деталей акаунта (для TC04)
When('I fill account details', async function () {
  // Title (Mr.)
  await driver.findElement(By.id('id_gender1')).click();

  // Пароль
  await driver.findElement(By.css('input[data-qa="password"]')).sendKeys('TestPassword123');

  // Дата народження
  await driver.findElement(By.css('select[data-qa="days"]')).sendKeys('10');
  await driver.findElement(By.css('select[data-qa="months"]')).sendKeys('May');
  await driver.findElement(By.css('select[data-qa="years"]')).sendKeys('1995');

  // Чекбокси (через JS, щоб обійти перекриття рекламою)
  try {
    const newsletter = await driver.findElement(By.id('newsletter'));
    await driver.executeScript("arguments[0].click();", newsletter);
    const optin = await driver.findElement(By.id('optin'));
    await driver.executeScript("arguments[0].click();", optin);
  } catch (e) {
    console.log("Checkboxes skipped due to overlay");
  }

  // Ім’я та прізвище
  await driver.findElement(By.css('input[data-qa="first_name"]')).sendKeys('Test');
  await driver.findElement(By.css('input[data-qa="last_name"]')).sendKeys('User');

  // Компанія
  await driver.findElement(By.css('input[data-qa="company"]')).sendKeys('TestCompany');

  // Адреса
  await driver.findElement(By.css('input[data-qa="address"]')).sendKeys('123 Test Street');
  await driver.findElement(By.css('input[data-qa="address2"]')).sendKeys('Suite 456');

  // Країна
  await driver.findElement(By.css('select[data-qa="country"]')).sendKeys('India');

  // Штат, місто, поштовий код
  await driver.findElement(By.css('input[data-qa="state"]')).sendKeys('Delhi');
  await driver.findElement(By.css('input[data-qa="city"]')).sendKeys('New Delhi');
  await driver.findElement(By.css('input[data-qa="zipcode"]')).sendKeys('110001');

  // Телефон
  await driver.findElement(By.css('input[data-qa="mobile_number"]')).sendKeys('+911234567890');
});

// Кнопка Create Account
When('I click Create Account button', async function () {
  const createBtn = await driver.findElement(
    By.css('#form > div > div > div > div > form > button')
  );
  await driver.executeScript("arguments[0].click();", createBtn);
  await driver.sleep(3000); // невелика пауза, щоб сторінка оновилась
});

Then('I should see {string}', async function (expected) {
  let locator;

  if (expected.toUpperCase() === 'ACCOUNT CREATED!') {
    locator = By.xpath("//*[normalize-space(text())='Account Created!']");
  } else if (expected.toUpperCase() === 'ENTER ACCOUNT INFORMATION') {
    locator = By.css('#form > div > div > div > div > h2');
  } else if (expected.toUpperCase() === 'ADDRESS INFORMATION') {
    locator = By.css('#form > div > div > div > div > form > h2');
  } else {
    locator = By.xpath(`//*[contains(text(),'${expected}')]`);
  }

  await driver.wait(until.elementLocated(locator), 20000);
  const text = await driver.findElement(locator).getText();
  if (!text.toUpperCase().includes(expected.toUpperCase())) {
    throw new Error(`Expected "${expected}", but got "${text}"`);
  }
});

Then('I close the browser', async function () {
  await driver.quit();
});
