import { expect, test } from "@playwright/test";
import { clickButton, clickLink } from "../../helpers/clickHelpers";

test.describe("iFrames", { tag: "@regression" }, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.techglobal-training.com/frontend");
    await clickLink(page, "IFrames");
  });

  test("iFrames Example", async ({ page }) => {
    // Use frameLocator() API to target iFrame first
    const frameLocator = page.frameLocator("#form_frame");

    // After you target the iFrame, user locator() API as usual by chaining with frameLocator()
    // so you can target any element you want inside the iframe.
    await frameLocator.locator("#first_name").fill("TechGlobal");
  });

  /**
   * Go to https://techglobal-training.com/frontend/
   * Click on the "IFrames" card
   * Enter "John" into the first name input box
   * Enter "Doe" into the last name input box
   * Click on the "SUBMIT" button
   * Validate the result equals "You entered: John Doe"
   */

  test('iFrames Test Case', async({ page }) => {

    const frameLocator = page.frameLocator("#form_frame");
    const inptuFields = frameLocator.locator('#first_name, #last_name')

    await inptuFields.last().waitFor({ state: 'visible' })

    const inputFieldsCount = await inptuFields.count()
    const result = page.locator('#result')

    const name = 'John'
    const lastName = 'Doe'

    for(let i = 0; i < inputFieldsCount; i++) {
      await inptuFields.nth(i).fill(i === 0 ? name : lastName)
    }

    await clickButton.call(this, frameLocator, 'SUBMIT')

    await expect(result).toHaveText(`You entered: ${name} ${lastName}`)
  })
});