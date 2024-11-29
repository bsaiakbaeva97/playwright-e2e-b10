import { expect, test } from "@playwright/test";
import { clickLink } from "../../helpers/clickHelpers";
import fs from 'fs'
import path from 'path'

test.describe.configure({ mode: 'serial' })

test.describe("Downlad & Upload", { tag: "@regression" }, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.techglobal-training.com/frontend");
    await clickLink(page, "File Download & Upload");
  });

  test("Download a file", async ({ page }) => {

    const [download] = await Promise.all([
      page.waitForEvent("download"),
      page.click("#file_download"),
    ]);

    // const path = await download.path()
    // console.log(path)

    /**
     * Provide the correct path to save the file
     * const downloadPath = downloads/fileName 
     */


    // Sometimes paths that are working on the iOS might not work on the Windows, or Ubuntu machines
    // Ex. attachmentFolders/loginPageFolder/downloads.txt
    // const downloadPath = `downloads/${download.suggestedFilename()}`
    const downloadPath = path.resolve('downloads', download.suggestedFilename())

    await download.saveAs(downloadPath)

    const isDownloaded = fs.existsSync(downloadPath)
    console.log(isDownloaded)

    expect(isDownloaded, { message: 'Test is FAILED' }).toBeTruthy()
  });

  test('Upload a file', async({ page }) => {
    const uploadLink = page.locator('#file_upload')
    const uploadPath = path.join('downloads', 'SampleText.txt')

    await uploadLink.setInputFiles(uploadPath)
  })
});