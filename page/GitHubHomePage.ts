import { type Locator, type Page } from "@playwright/test";

export class GitHubHomePage {
    readonly page: Page;
    readonly logo: Locator;
    readonly headerMenuItems: Locator;
    readonly searchInput: Locator;
    readonly signInButton: Locator;
    readonly signUpButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.logo = page.locator('.octicon-mark-github');
        this.headerMenuItems = page.locator('.js-header-menu-item');
        this.searchInput = page.locator('.header-search-button');
        this.signInButton = page.locator('.HeaderMenu-link--sign-in');
        this.signUpButton = page.locator('.HeaderMenu-link--sign-up');
        
    };

    async goto() {
        await this.page.goto('https://github.com/');
    };

}