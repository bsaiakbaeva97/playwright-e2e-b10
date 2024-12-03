import { test as teardown, expect } from "@playwright/test";

teardown("do logout", async ({ page }) => {
  await page.goto("https://www.demoblaze.com/");

  const logoutButton = page.locator("#logout2");

  await expect(logoutButton).toBeVisible();

  await logoutButton.click();

  console.log("LOGGED OUT");
});