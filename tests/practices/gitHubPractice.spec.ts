import {test, expect} from "../../fixtures/github-fixture"

test.describe('Practice04 GitHub HomePage', () => {

    test('TASK-1: Validate the GitHub Home Page Logo and Header Menu Items', async({ gitHubHomePage }) => {
        
        await test.step('2. Validate that the logo is displayed', async() => {
            await expect(gitHubHomePage.logo).toBeVisible();
        });

        await test.step('3. Validate that the header menu items are displayed with their expected texts', async() => {
            const menuHeaderItemsArr = [ 'Product', 'Solutions', 'Resources', 'Open Source', 'Enterprise', 'Pricing' ];
            
            await expect(gitHubHomePage.headerMenuItems).toContainText(menuHeaderItemsArr); // What could be a better assertion???
        });
    });

    test('TASK-2: Validate the GitHub Home Page Search and Signing Header Items', async({ gitHubHomePage }) => {
        
        await test.step('2. Validate that the search input is displayed with the placeholder "Search or jump to..."', async() => {
            await expect(gitHubHomePage.searchInput).toBeVisible();
            await expect(gitHubHomePage.searchInput).toHaveAttribute('placeholder', 'Search or jump to...')
        });

        await test.step('3. Validate that the sign in button is displayed with the text "Sign in"', async() => {
            await expect(gitHubHomePage.signInButton).toBeVisible();
            await expect(gitHubHomePage.signInButton).toContainText(' Sign in ');
        });

        await test.step('3. Validate that the sign up button is displayed with the text "Sign in"', async() => {
            await expect(gitHubHomePage.signUpButton).toBeVisible();
            await expect(gitHubHomePage.signUpButton).toContainText(' Sign up ');
        });
    });

    test('TASK-3: Validate the GitHub Login Page Sign in Form', async({ gitHubLoginPage }) => {
        
        await test.step('1. Validate that the header logo is displayed', async() => {
            
            await expect(gitHubLoginPage.headerLogo).toBeVisible();
        });

        await test.step('2-3-5-7-9-10. Validate that the form header, labels, buttons and link are displayed with the expected text', async() => {
            
            const labelHeaderArr = [
                gitHubLoginPage.formHeader,
                gitHubLoginPage.userNameLabel, 
                gitHubLoginPage.passwordLabel, 
                gitHubLoginPage.forgotPasswordLink,
                gitHubLoginPage.passKeySignInBtn,
                gitHubLoginPage.createAccountLink
            ];

            const expectedText = [
                'Sign in to GitHub',
                'Username or email address',
                'Password',
                'Forgot password?',
                'Sign in with a passkey',
                'Create an account'
            ];

            for (let i = 0; i < labelHeaderArr.length; i++) {
                await expect(labelHeaderArr[i]).toHaveText(expectedText[i]);
            };
        });

        await test.step('4-6. Validate inputs are enabled', async() => {

            await expect(gitHubLoginPage.passwordInput).toBeEnabled();
            await expect(gitHubLoginPage.userNameInput).toBeEnabled();

        });

        await test.step('8. Validate that the sign in button is displayed with the text "Sign in"', async() => {

            await expect(gitHubLoginPage.LoginPageSignInBtn).toHaveValue('Sign in')

        });

    });

    test('TASK-4: Validate the GitHub Login Page Footer Links', async({ gitHubLoginPage }) => {

        await test.step('1. Validate that there are 6 links are displayed in the footer', async() => {

            await expect(gitHubLoginPage.footerLinks).toHaveCount(6);

        });

        await test.step('2. Validate that the footer links are displayed with their expected texts', async() => {
            const expectedText = [
                'Terms', 
                'Privacy',
                'Docs', 
                'Contact GitHub Support', 
                'Manage cookies', 
                'Do not share my personal information'
            ];

            await expect(gitHubLoginPage.footerLinks).toHaveText(expectedText);

        });

    });

    test('TASK-5: Validate the GitHub Login Page Invalid Login Attempt', async({ gitHubLoginPage }) => {

        await test.step('1. Enter "johndoe" to the username or email address input', async() => {

            await gitHubLoginPage.userNameInput.fill('johndoe');
    
        });

        await test.step('2. Enter "test1234" to the password input', async() => {

            await gitHubLoginPage.passwordInput.fill('test1234');
    
        });

        await test.step('3. Click on "Sign in" button', async() => {

            await gitHubLoginPage.clickLoginPageSignInBtn();
    
        });

        await test.step('3. Click on "Sign in" button', async() => {

             await gitHubLoginPage.clickLoginPageSignInBtn();
    
        });

        await test.step('4. Validate that the error message is displayed with the text "Incorrect username or password.', async() => {

            await expect(gitHubLoginPage.errorMessage).toHaveText('Incorrect username or password.');
   
       });

    });

});
