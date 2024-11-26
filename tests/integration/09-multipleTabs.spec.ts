import { expect, test } from "@playwright/test";
import { clickLink } from "../../helpers/clickHelpers";

test.describe("Interacting Multiple Tabs", { tag: "@regression" }, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.techglobal-training.com/frontend");
    await clickLink(page, "Multiple Windows");
  });

  test("Create a new Tab", async ({ page, context }) => {
    // const newTab = await page.context().newPage()
    const newTab = await context.newPage();

    await newTab.goto("https://www.apple.com/");

    const newTab2 = await context.newPage();

    await newTab2.goto("https://www.tesla.com/");

    await page.bringToFront();

    await page.goBack();
    await clickLink(page, "HTML Elements");

    const textInput1 = page.locator("#text_input1");
    await textInput1.fill("TechGlobal");
  });

  test("Interacting/Switching to a new tab", async ({ page }) => {
    // await clickLink(page, 'Apple')

    // const newTab = await page.waitForEvent('popup')

    // await expect(newTab).toHaveTitle('Apple')

    // await clickLink(page, 'Microsoft')

    // const newTab2 = await page.waitForEvent('popup')

    // await expect(newTab2).toHaveTitle('Microsoft – AI, Cloud, Productivity, Computing, Gaming & Apps')

    // await page.bringToFront()

    const [newTab] = await Promise.all([
      page.waitForEvent("popup"),
      clickLink(page, "Apple"),
    ]);

    await expect(newTab).toHaveTitle("Apple");

    const numbers = [1, 2, 3];
    const [first, second] = numbers;

    console.log(first);
    console.log(second);

    const [newTab2] = await Promise.all([
      page.waitForEvent("popup"),
      clickLink(page, "Microsoft"),
    ]);

    await expect(newTab2).toHaveTitle(
      "Microsoft – AI, Cloud, Productivity, Computing, Gaming & Apps"
    );
  });

  test("Homework", async ({ page }) => {

    // Click on the "Apple" link and validate URL contains "Apple"
    await clickLink(page, 'Apple');

    const appleTab = await page.waitForEvent('popup');

    const appleURL = appleTab.url();
    console.log(appleURL);
    expect(appleURL).toContain('apple');

    //Click on the "Microsoft" link and validate URL contains "Microsoft"
    const [microsoftTab] = await Promise.all([
        page.waitForEvent('popup'),
        clickLink(page, 'Microsoft')
    ]);

    const microsoftURL = microsoftTab.url();
    expect(microsoftURL).toContain('microsoft');

    //Click on the "Tesla" link and validate URL contains "Tesla"
    await clickLink(page, 'Tesla');

    const teslaTab = await page.waitForEvent('popup');
  
    const teslaURL = teslaTab.url();
    console.log(teslaURL);
    expect(teslaURL).toContain('tesla');

  })

  /**
   * Go to await page.goto('https://www.techglobal-training.com/frontend/');
   * Click on the "Multiple Windows" card
   * Click on the "Apple" link and validate URL contains "Apple"
   * Click on the "Microsoft" link and validate URL contains "Microsoft"
   * Click on the "Tesla" link and validate URL contains "Tesla"
   */


});