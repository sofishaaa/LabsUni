jest.setTimeout(30000); // 30 секунд

const { Builder, By, until } = require("selenium-webdriver");

describe("Wikipedia тестування з Selenium", () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  test("Завдання 2: пошукове поле та логотип", async () => {
    await driver.get("https://www.wikipedia.org");
    const searchBox = await driver.findElement(By.id("searchInput"));
    const logo = await driver.findElement(
      By.className("central-featured-logo"),
    );
    expect(searchBox).toBeTruthy();
    expect(logo).toBeTruthy();
  });

  test("Завдання 3: пошук Selenium", async () => {
    await driver.get("https://www.wikipedia.org");
    const searchBox = await driver.findElement(By.id("searchInput"));
    await searchBox.sendKeys("Selenium");
    await searchBox.submit();
    await driver.wait(until.titleContains("Selenium"), 5000);
    const title = await driver.getTitle();
    expect(title).toMatch(/Selenium/i);
  });

  test("Завдання 4: локатори на сторінці статті", async () => {
    await driver.get("https://en.wikipedia.org/wiki/Selenium");
    const heading = await driver.findElement(
      By.xpath('//h1[@id="firstHeading"]'),
    );
    const headingText = await heading.getText();
    expect(headingText).toBe("Selenium");

    const navLinks = await driver.findElements(By.css("#mw-navigation a"));
    for (let link of navLinks) {
      const href = await link.getAttribute("href");
      expect(href).toMatch(/^https:\/\/en\.wikipedia\.org/);
    }

    const searchForm = await driver.findElement(By.id("searchform"));
    expect(searchForm).toBeTruthy();
  });

  test("Завдання 5: клік, очікування, CSS властивості", async () => {
    await driver.get("https://en.wikipedia.org/wiki/Selenium");
    const link = await driver.findElement(By.linkText("Oxygen"));
    await link.click();
    await driver.wait(until.titleContains("Oxygen"), 5000);
    const newTitle = await driver.getTitle();
    expect(newTitle).toMatch(/Oxygen/i);
    const heading = await driver.findElement(By.id("firstHeading"));
    const color = await heading.getCssValue("color");
    expect(color).toBeTruthy();
  });
});
