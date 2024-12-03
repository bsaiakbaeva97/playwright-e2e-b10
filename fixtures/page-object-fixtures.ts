import { test as base } from "@playwright/test";
import { LoginPage } from "../page/LoginPage";
import { BasePage } from "../page/BasePage";
import { TodoListPage } from "../page/TodoListPage";
import { WaitsPage } from "../page/WaitsPage";

type MyFixtures = { 
  basePage: BasePage
  todoPage: TodoListPage,
  loginPage: LoginPage,
  waitsPage: WaitsPage,
};

// Extend the Playwright test runner to create your custom fixtures
export const test = base.extend<MyFixtures>({

  basePage: async({page}, use) => {
    const basePage = new BasePage(page)
    await use(basePage)
  },
  loginPage: async({page}, use) => {
    const loginPage = new LoginPage(page)
    await use(loginPage)
  },
  todoPage: async({page}, use) => {
    const todoPage = new TodoListPage(page)
    await use(todoPage)
  },

  waitsPage: async({page}, use) => {
    const waitsPage = new WaitsPage(page)
    await use(waitsPage)
  },


})

export { expect } from '@playwright/test'