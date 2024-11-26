import { expect, test } from "@playwright/test";
import { clickLink } from "../../helpers/clickHelpers";
import { LoginPage } from "../page/LoginPage";

test.describe("Login", { tag: "@regression" }, () => {

  let loginPage: LoginPage
  
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    await page.goto("/frontend/project-2");
  });

  test('Test Positive', async({ page }) => {
    await loginPage.userLogin(process.env.USER_NAME!, process.env.USER_PASSWORD!)
    await expect(loginPage.loginMesage).toHaveText('You are logged in')
  })

  test('Test Negative', async({ page }) => {
    
    const username = page.locator('#username')
    const password = page.locator('#password')

    await username.fill('error')
    await password.fill('error')

    await page.click('#login_btn')


    await expect(page.locator('#error_message')).toHaveText('Invalid Username entered!')
  })
})