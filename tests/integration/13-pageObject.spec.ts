import { expect, test } from "../../fixtures/page-object-fixtures";

test.describe("Login", { tag: "@regression" }, () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto("/frontend/project-2");
  });

  test('Test Positive', async({ loginPage }) => {
    await loginPage.userLogin(process.env.USER_NAME!, process.env.USER_PASSWORD!)
    await expect(loginPage.loginMesage).toHaveText('You are logged in')
  })

  test('Test Negative', async({ loginPage }) => {
    
    await loginPage.userLogin('error', 'error')
    await expect(loginPage.errorMessage).toHaveText('Invalid Username entered!')
  })
})