import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page.getByRole('banner')).toMatchAriaSnapshot(`
    - heading "Playwright enables reliable end-to-end testing for modern web apps." [level=1]
    - link "Get started"
    - link "Star microsoft/playwright on GitHub"
    - link /[\\d,.]+[bkmBKM]+\\+ stargazers on GitHub/
    `);
});