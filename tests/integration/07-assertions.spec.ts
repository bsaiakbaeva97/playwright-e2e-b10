import { expect, test } from "@playwright/test";
import { clickLink } from "../../helpers/clickHelpers";

test.describe("Assertions", { tag: '@regression' }, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.techglobal-training.com/frontend");
    await clickLink(page, "HTML Elements");
  });

  test('Auto-retry, web-first, async locator assertions', async({ page }) => {
    const mainHeading = page.locator('#main_heading')

    // Check if element is visible
    await expect(mainHeading).toBeVisible()

    // Check if element is attached to the DOM
    await expect(mainHeading).toBeAttached()

    // Check if element have 'HTML Elements' text
    await expect(mainHeading).toHaveText('HTML Elements')

    // Check if element contains 'HTML Elements' text
    await expect(mainHeading).toContainText('HTML Elements')

    // Check if element has attribute, or attribute and its value
    await expect(mainHeading).toHaveAttribute('id', 'main_heading')

    // Check the amount of element your locator returns
    await expect(mainHeading).toHaveCount(1)

    const checkbox1 = page.locator('#checkbox_1')
    await expect(checkbox1).toBeEnabled()

    const textInput1 = page.locator('#text_input1')
    await expect(textInput1).toBeEmpty()

    await expect(mainHeading).toHaveCSS('color', 'rgb(105, 105, 105)')

    // Negating matchers
    await expect(mainHeading).not.toBeVisible()
  })

  test('Non-retry Assertions', async({ page }) => {

    expect(true).toBe(true)

    const num = 1

    expect(num).toBe(1)

    expect(num).toBeLessThan(2)

    expect(num).toBeLessThanOrEqual(1)

    expect(num).toBeGreaterThan(0)

    expect(num).toEqual(1)

    const mainHeadingText = await page.locator('#main_heading').textContent()

    expect(mainHeadingText).toBe('HTML Elements')
  })

  test('Creating custom Assertions', async ({ page }) => {
    await page.goto('https://www.techglobal-training.com/frontend')
    await clickLink(page, 'Infinite Scroll')

    const articles = page.locator('.infinite-scroll-component > div')
    const articlesCount = await articles.count()

    console.log(articlesCount + ' is the initial count of Articles')

    await page.locator('.Footer_down__3JJS9').scrollIntoViewIfNeeded()

    await expect(async () => {
      const newCount = await articles.count()
      console.log(`Trying here! ${newCount}`)
  
      expect(newCount).toBeGreaterThan(articlesCount)
    }).toPass({
      timeout: 5000
    })
  })

  test('Soft Assertions', async({ page }) => {
    // const mainHeading = page.locator('#main_heading')
    // await expect.soft(mainHeading).toHaveText('HTML Elementsqwe')

    const checkboxGroup = await page.locator('#checkbox-button-group input').all()

    for(const checkbox of checkboxGroup) {
      await checkbox.check()
      console.log('Checked')
    }
  })
})