import { expect, test } from "@playwright/test";
import { clickLink } from "../../helpers/clickHelpers";

test.describe("Element Properties", { tag: '@regression' }, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.techglobal-training.com/frontend");
    await clickLink(page, "HTML Elements");
  });

  test('Getting the Element Ptate', async({ page }) => {

    const headings = page.locator('[data-identifier="Headings"]')

    // Will alwys return an array
    const allInnerText = await headings.allInnerTexts()

    // Returns a single string, which already has the child elements
    const innerText = await headings.innerText()

    console.log(`All inner text: ${allInnerText}`)
    console.log(`Inner text: ${innerText}`)

    // Returns all the web elements of given web element
    const innerHtml = await headings.innerHTML()

    console.log(`Inner HTML: ${innerHtml}`)


    const textContent = await headings.textContent()
    console.log(`Inner TextContent: ${textContent}`)

    const innerElements = headings.locator('h4')
    console.log(`Count of web element returned: ${await innerElements.count()}`)

    const attr = await headings.getAttribute('data-identifier')
    console.log(`Value returned from the attribute: ${attr}`)

    // const links = page.locator('[data-identifier="Links"]')
    // await expect(links).toHaveClass(/is-flex/)

    const companyDropdown = page.locator('#company_dropdown1')
    await companyDropdown.selectOption({ index: 1})

    const valueOfDropdown = await companyDropdown.inputValue()
    console.log(`Company dropdown selected option: ${valueOfDropdown}`)
  })

  test('Executing JavaScript code in Playwright', async({ page }) => {

    const title = await page.title()
    console.log(title)

    const pageTitle = await page.evaluate(() => {
      return document.title
    })

    console.log(pageTitle)

    const pageUrl = await page.evaluate(() => {
      return document.location.href
    })

    console.log(pageUrl)

    const element = page.locator('#main_heading')

    const getColor = await element.evaluate((el) => {
      return window.getComputedStyle(el).getPropertyValue('color')
    })

    console.log(getColor)
  })
})