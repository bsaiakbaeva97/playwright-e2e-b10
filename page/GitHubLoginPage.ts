import { type Locator, type Page } from "@playwright/test";
import { GitHubHomePage } from "./GitHubHomePage";

export class GitHubLoginPage extends GitHubHomePage {
    
    readonly headerLogo: Locator;
    readonly formHeader: Locator;
    readonly userNameInput: Locator;
    readonly userNameLabel: Locator;
    readonly passwordInput: Locator;
    readonly passwordLabel: Locator;
    readonly forgotPasswordLink: Locator;
    readonly LoginPageSignInBtn: Locator;
    readonly passKeySignInBtn: Locator;
    readonly createAccountLink: Locator;
    readonly footerLinks: Locator;
    readonly errorMessage: Locator

    constructor(page: Page) {
        super(page);
        this.headerLogo = page.locator('.header-logo');
        this.formHeader = page.locator('#login h1');
        this.userNameInput = page.locator('#login_field');
        this.userNameLabel = page.locator('[for="login_field"]');
        this.passwordInput = page.locator('#password');
        this.passwordLabel = page.locator('[for="password"]');
        this.forgotPasswordLink = page.locator('#forgot-password');
        this.LoginPageSignInBtn = page.locator('.js-sign-in-button');
        this.passKeySignInBtn = page.locator('.login-callout .Button');
        this.createAccountLink = page.locator('.mt-1>a');
        this.footerLinks = page.locator('.list-style-none>li');
        this.errorMessage = page.locator('.js-flash-alert');
     
    };

    async clickSignInBtn() {
        await this.signInButton.click();
    };

    async clickLoginPageSignInBtn() {
        await this.LoginPageSignInBtn.click();
    };


};