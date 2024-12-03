import { Locator, expect } from "@playwright/test";

async function takeAndCompareScreenshot(locator: Locator, fileName?: string, options = {}) {
  const screenshot = await locator.screenshot(options);

  // Compare the screenshot with the baseline image
  // if fileName is undefined, toMatchSnapshot() will use a default naming
  expect(screenshot).toMatchSnapshot(fileName!, { threshold: 0.2 });
}

export default takeAndCompareScreenshot
