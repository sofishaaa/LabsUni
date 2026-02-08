const { Builder, By, until } = require("selenium-webdriver");

let driver;

beforeAll(async () => {
  driver = await new Builder().forBrowser("chrome").build();
  await driver.get("https://automationexercise.com/");
}, 30000);

afterAll(async () => {
  await driver.quit();
});

test("Перевірка верхнього меню", async () => {
  const navMenu = await driver.findElement(By.css("ul.nav.navbar-nav"));
  expect(navMenu).toBeDefined();
});

test("Перевірка логотипу", async () => {
  const logo = await driver.findElement(
    By.css('img[alt="Website for automation practice"]'),
  );
  const altText = await logo.getAttribute("alt");
  expect(altText).toBe("Website for automation practice");
});

test("Перевірка кнопки Signup/Login", async () => {
  const signupLoginBtn = await driver.findElement(
    By.linkText("Signup / Login"),
  );
  const text = await signupLoginBtn.getText();
  expect(text).toContain("Signup");
});
