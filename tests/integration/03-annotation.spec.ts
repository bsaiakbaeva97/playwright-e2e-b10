import { test, expect } from "@playwright/test";
import { clickLink } from "../../helpers/clickHelpers"

test.describe("Annotations", { tag: '@regression' }, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.techglobal-training.com/frontend");
    await clickLink(page, "HTML Elements");
  });

  // test.fail("Annotations - fail", async ({ page }) => {

  //   // test.fail()

  //   const mainHeading = page.locator('#main_heading')
  //   await expect(mainHeading).toHaveText('HTML asdasddwqdqw')
  // });

  // test.fixme("nnotations - fixme", async ({ page }) => {
  //   const mainHeading = page.locator('#main_heading')
  //   await expect(mainHeading).toHaveText('HTML asdsadsads')
  // });

  test("Annotations - slow", async ({ page }) => {
    test.slow()

    const mainHeading = page.locator('#main_heading')
    await expect(mainHeading).toHaveText('HTML Elements')
  });

  /**
   * 1. Go to 'https://techglobal-training.com/frontend'
   * 2. Click on the 'Html Elements' card
   * 3. Validate Hello World and I Like automation testing! texts are visible
   * 4. Validate their texts are equal to expected texts
   * 5. Validate their id and value
   */

  test("Annotations - step",  { tag: ['@smoke', '@step'] }, async ({ page }) => {
    const paragraphs = page.locator('[data-identifier="Paragraphs"] > p')
    const paragraphsAll = await paragraphs.all()
    const expectedTexts = ['Hello World!', 'I like automation testing!']

    await test.step("1. Go to 'https://techglobal-training.com/frontend'", async() => {
      await page.goto("https://www.techglobal-training.com/frontend");
    })

    await test.step("2. Click on the 'Html Elements' card", async() => {
      await clickLink(page, "HTML Elements");
    })

    await test.step("3. Validate Hello World and I Like automation testing! texts are visible", async() => {
      for(const paragraph of paragraphsAll) {
        await expect(paragraph).toBeVisible()
      }
    })

    await test.step("4. Validate their texts are equal to expected texts", async() => {
      await expect(paragraphs).toHaveText(expectedTexts)
    })

    await test.step("5. Validate their id and value", async() => {
      await expect(paragraphs.first()).toHaveAttribute('id', 'hello_paragraph')
      await expect(paragraphs.last()).toHaveAttribute('id', 'testing_paragraph')
    })
  });
});