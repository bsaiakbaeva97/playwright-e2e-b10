import { expect, test } from "@playwright/test";
import { clickLink } from "../../helpers/clickHelpers";

test.describe("Advanced user Actions", { tag: "@regression" }, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.techglobal-training.com/frontend");
    await clickLink(page, "Actions");
  });

  test("Mouse Actions", async ({ page }) => {

    // Right-click the element
    await page.click('#right-click', { button: 'right' })

    // Double-click the element
    await page.dblclick('#double-click')

    // Drag and drop the element
    await page.dragAndDrop('#drag_element', '#drop_element')
  })

  test("Keyboard Actions", async ({ page }) => {

    const inputBox = page.locator('#input_box')

    await inputBox.focus()

    // await page.keyboard.down('Shift')
    // await page.keyboard.press('KeyA')
    // await page.keyboard.up('Shift')
    // await page.keyboard.press('KeyB')

    // Shift here only effects other keyboard actions in the same argument
    await page.keyboard.press('Shift+KeyA+KeyB')
    // It will not effect below code
    await page.keyboard.press('KeyX')
    // Output here will be 'ABx'


    await page.keyboard.press('Shift+KeyA+KeyB+KeyC')
    await page.keyboard.press('ArrowLeft')
    await page.keyboard.press('KeyA+KeyB+KeyC')
    await page.keyboard.press('Backspace')
    // ABabC

    await inputBox.clear()

    // Imagine a scenario that you want to send 'Hello World!' to input box
    // And than modify text with keyboard actions and leave 'Hello!' only

    await page.keyboard.type('Hello World!')
    await page.keyboard.press('ArrowLeft')
    
    // for(let i = 0; i <= 'World'.length; i++) {
    //   await page.keyboard.press('Backspace')
    // }

    await page.keyboard.down('Shift')

    for(let i = 0; i <= 'World'.length; i++) {
      await page.keyboard.press('ArrowLeft')
    }

    await page.keyboard.up('Shift')
    await page.keyboard.press('Backspace')
  })
})