import { Locator, test } from "@playwright/test";

test.use({
  launchOptions: {
    slowMo: 500
  }
})

test.describe("Playwright Locators", () => {
  test("Playwright locator() API", async ({ page }) => {
    await page.goto("https://www.techglobal-training.com/");

    // await page.click('#myLocator')

    // let myLocator: Locator;

    // myLocator = page.locator('#myLocator')

    // await myLocator.click()

    await page.locator("#logo").click();

    await page.click("#logo");

    const myLogo = page.locator("#logo");

    await myLogo.click();
  });

  test("Playwright - Custom Pseudo Classes", async ({ page }) => {
    await page.goto("https://www.techglobal-training.com/frontend");

    const cards = page.locator(".card");

    await cards.locator(':has-text("HTML Elements")').click();

    // await page.locator('.card', { hasText: 'HTML Elements'}).click()

    await page.locator('button:has-text("Register")').click();
    await page.locator('button:has-text("Sign in"):enabled').highlight();
    await page.locator('button:has-text("Sign in"):visible').highlight();

    const countOfDivs = await page.locator("#radio-button-group > div").count();

    console.log(countOfDivs + " is the amount of div elements in radio group");

    const javaRadioButton = page.locator("#radio_1_option_1");

    const javaParentDiv = page.locator("#radio-button-group > div", {
      has: javaRadioButton,
    });

    console.log((await javaParentDiv.count()) + " is the real amount we need");

    const noJavaParentDiv = page.locator("#radio-button-group > div", {
      hasNot: javaRadioButton,
    });

    console.log(
      (await noJavaParentDiv.count()) + " is the real amount we need"
    );
  });

  test("Chaining the Locators", async ({ page }) => {
    await page.goto("https://www.techglobal-training.com/frontend");

    await page.locator('.card:has-text("HTML Elements")').click();

    const unorderedList = page.locator("#unordered_list");

    await unorderedList.locator("#unordered_list_item1").highlight();
  });

  test("Handling multiple elements", async ({ page }) => {
    await page.goto("https://www.techglobal-training.com/frontend");

    await page.locator('.card:has-text("HTML Elements")').click();

    const unorderedList = page.locator("#unordered_list > li");

    await unorderedList.first().click();
    await unorderedList.nth(1).click();
    await unorderedList.last().click();

    // This will return a failure becasue Playwright will find more than 1 element which violates 'strict' mode
    // await unorderedList.click()

    const checkboxGroup = page.locator("#checkbox-button-group input");

    const checkboxCount = await checkboxGroup.count();

    for (let i = 0; i < checkboxCount; i++) {
      await checkboxGroup.nth(i).check();
    }

    const checkboxArray = await checkboxGroup.all();

    for (const checkbox of checkboxArray) {
      await checkbox.check();
    }

    // checkboxArray.forEach(async (el) => {
    //   await el.check()
    // })
  });

  test("Playwright built-in locators", async ({ page }) => {
    await page.goto("https://www.techglobal-training.com/frontend");

    await page.getByRole("link", { name: "HTML Elements" }).click();

    await page.getByRole("heading", { name: "HTML Elements" }).highlight();

    await page.getByRole("button", { name: "Register" }).click();

    await page.getByPlaceholder("Enter text here").fill("TechGlobal");
  });

  test("filter() locator API", async ({ page }) => {
    await page.goto("https://www.techglobal-training.com/frontend");

    await page.getByRole("link", { name: "HTML Elements" }).click();

    const testingParagraphs = page.locator("p").filter({ hasText: "testing" });

    await testingParagraphs.highlight()

    const languageHeadings = await page.locator('label').count()

    console.log(`Amount of elements with label tag is: ${languageHeadings}`)

    const noneLanguageHeadings = await page.locator('label').filter({ hasNotText: 'Java'}).count()

    console.log(`Amount of elements with label tag but Java is: ${noneLanguageHeadings}`)

    const wrappers = await page.locator('[data-identifier*="a"]').count()

    console.log(`Located wrappers are: ${wrappers}`)

    const uniquqWrapper = await page.locator('[data-identifier*="a"]').filter({ has: page.locator('#java_radio')}).count()

    console.log(`Located wrappers are: ${uniquqWrapper}`)
  });
});