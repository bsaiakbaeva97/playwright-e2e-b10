import { expect, test } from "@playwright/test";
import { clickLink } from "../../helpers/clickHelpers";

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
 
    expect(teslaURL).toContain('tesla')
    

  })





