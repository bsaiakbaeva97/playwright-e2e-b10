import { test, expect } from "@playwright/test";
import takeAndCompareScreenshot from "../../helpers/takeAndCompareScreenshot";

test.describe("Visual Regression", () => {
  test("Should take a screenshot of a page", async ({ page }, testInfo) => {
    console.log(testInfo.title);
    await page.goto("/");

    await expect(page).toHaveScreenshot(`${testInfo.title} homepage.png`);
  });

  test("Should take a screenshot of a web element", async ({ page }) => {
    await page.goto("/");

    const sect = page.locator(".Header_header__HXQOm");
    await expect(sect).toHaveScreenshot("section.png", { threshold: 0.2 });
  });

  test("Should take a screenshot of a fullpage", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveScreenshot("fullHomePage.png", { fullPage: true });
  });

  test("Should take a screenshot of a page, but ignore some web elements", async ({
    page,
  }) => {
    await page.goto("/frontend");

    const card3 = page.locator("#card-3");
    const card5 = page.locator("#card-5");
    const card7 = page.locator("#card-7");

    await expect(page).toHaveScreenshot("frontendPage.png", {
      mask: [card3, card5, card7],
      threshold: 0.3,
    });
  });

  test("Take a screenshot and validate", async ({ page }) => {
    await page.goto("/frontend");

    const cards = page.locator(".CardGrids_CardGrids__qDdyI");
    const card5 = page.locator("#card-5");
    const card8 = page.locator("#card-8");

    const snap = await cards.screenshot({ mask: [card5, card8], maskColor: 'yellow' });

    expect(snap).toMatchSnapshot('frontendCards_2.png')
  });

  test('Should compare screenshot using method', async({ page }) => {
    await page.goto("/frontend");

    const cards = page.locator(".CardGrids_CardGrids__qDdyI");
    const card8 = page.locator("#card-8");

    await takeAndCompareScreenshot(cards)
    await takeAndCompareScreenshot(cards, 'allCardsMasked.png', { mask: [card8] })

    await takeAndCompareScreenshot.call(this, page)
  })
});