import { test } from "@playwright/test";
import { clickButton, clickLink } from "../../helpers/clickHelpers";

test.describe("Dialogs", { tag: "@regression" }, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.techglobal-training.com/frontend");
    await clickLink(page, "Alerts");
  });

  test("Handling Dialogs", async ({ page }) => {

    // page.on('dialog', async (dialog) => {
    //   const type = dialog.type()
    //   const message = dialog.message()

    //   await dialog.accept()

    //   console.log(`Type of alert: ${type}`)
    //   console.log(`Message of alert: ${message}`)
    // })
    
    // page.on('dialog', async (dialog) => {
    //   const type = dialog.type()
    //   const message = dialog.message()

    //   if(type === 'alert') {
    //     await dialog.accept()
    //   } else if(type === 'confirm') {
    //     await dialog.dismiss()
    //   } else {
    //     await dialog.accept('My Message')
    //   }
    // })


    page.once('dialog', async (dialog) => {
      const type = dialog.type()
      const message = dialog.message()

      await dialog.accept()

      console.log(`Type of alert: ${type}`)
      console.log(`Message of alert: ${message}`)
    })


    await clickButton(page, 'Warning alert')

    page.once('dialog', async (dialog) => {
      const type = dialog.type()
      const message = dialog.message()

      await dialog.accept()

      console.log(`Type of alert: ${type}`)
      console.log(`Message of alert: ${message}`)
    })

    await clickButton(page, 'Confirmation alert')
    await clickButton(page, 'Prompt alert')

  })
})





