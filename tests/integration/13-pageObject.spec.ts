import { expect, test } from "@playwright/test";
import { LoginPage } from "../page/LoginPage";


test.describe("Login", { tag: "@regression" }, () => {

  let loginPage: LoginPage
  
  test.beforeEach(async ({ page }) => {

    loginPage = new LoginPage(page)
    await page.goto("/frontend/project-2");

  });

  const successMessage = 'You are logged in';
  const errorMessage = 'Invalid Username entered!';
  const invalidUsername = 'error';
  const invalidPassword = 'error';

  test('Test Positive', async() => {

    await loginPage.userLogin(process.env.USER_NAME!, process.env.USER_PASSWORD!);
    await expect(loginPage.loginMesage).toHaveText(successMessage);

  });

  test('Test Negative', async() => {
 
    await loginPage.userLogin(invalidUsername, invalidPassword);
    await loginPage.clickLoginButton();
    await expect(loginPage.errorMessage).toHaveText(errorMessage);

  });
});