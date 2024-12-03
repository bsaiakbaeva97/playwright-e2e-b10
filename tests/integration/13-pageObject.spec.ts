import { expect, test } from "../../fixtures/page-object-fixtures";

test.describe("Login", { tag: "@regression" }, () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto("/frontend/project-2");
  });

  test('Test Positive', async({ loginPage, page }) => {
    await page.pause()
    await loginPage.userLogin(process.env.USER_NAME!, process.env.USER_PASSWORD!)
    await expect(loginPage.loginMesage).toHaveText('You are logged in')

    // debugger
    //console.log(loginPage.errorMessage._selector)
  })

  test('Test Negative', async({ loginPage }) => {
    
    await loginPage.userLogin('error', 'error')
    await expect(loginPage.errorMessage).toHaveText('Invalid Username entered!')
  });
});