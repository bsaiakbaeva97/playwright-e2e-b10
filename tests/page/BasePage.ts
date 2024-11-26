import { type Locator, type Page } from "@playwright/test";

export class BasePage {
  readonly page: Page
  readonly logo: Locator
  readonly testingDropdown: Locator
  readonly exerciseDropdown: Locator
  readonly heading: Locator

  constructor(page: Page) {
    this.page = page
    this.logo = page.locator('#logo')
    this.testingDropdown = page.locator('#dropdown-testing')
    this.exerciseDropdown = page.locator('#dropdown-exercises')
    this.heading = page.locator('#main_heading')
  }
}