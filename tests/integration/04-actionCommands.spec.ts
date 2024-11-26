import { test } from "@playwright/test";
import { clickButton, clickLink } from "../../helpers/clickHelpers";

test.describe("User Actions", { tag: '@regression' }, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.techglobal-training.com/frontend");
    await clickLink(page, "HTML Elements");
  });

  test('User Actions - Click and Hover', async({ page }) => {

    const testingNavDropdown = page.locator('#dropdown-testing')
    await testingNavDropdown.hover()

    await clickButton(page, 'Register')

    console.log(page.viewportSize())
  })

  test('User Actions - Fill', async({ page }) => {

    const textInput1 = page.locator('#text_input1')
    

    await textInput1.fill('Cypress')
    await textInput1.fill('TechGlobal')

    // in Cypress expected is      => CypressTechGlobal
    // in Playwright expected is => TechGlobal
  })

  test('User Actions - Checkbox and Radio Buttons', async({ page }) => {

    const apple = page.getByRole('checkbox', { name: 'Apple' })
    // const microsoft = page.getByRole('checkbox', { name: 'Microsoft' })
    // const tesla = page.getByRole('checkbox', { name: 'Tesla' })

    await apple.check()
    await apple.uncheck()

    const checkboxGroup = await page.locator('#checkbox-button-group input').all()

    for(const checkbox of checkboxGroup) {
      await checkbox.check()
      await checkbox.uncheck()
    }
  })

  test('User Actions - Dropdowns', async({ page }) => {

    const companyDropdown = page.locator('#company_dropdown1')
    
    // select the option by index
    await companyDropdown.selectOption({ index: 1}) 

    // select the option by text
    await companyDropdown.selectOption({ label: 'Apple'}) 
  })

  test('User Actions - Calendar | Date Picker', async({ page }) => {

    const date1 = page.locator('#date_input1')
    const date2 = page.locator('#date_input2')
    
    await date1.fill('01/01/2000')
    await page.keyboard.press('Enter')

    await date2.fill('01/01/2000')
    await page.keyboard.press('Escape')
  })
});