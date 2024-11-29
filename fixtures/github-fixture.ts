import {test as base} from "@playwright/test";
import {GitHubHomePage} from "../page/GitHubHomePage";
import {GitHubLoginPage} from "../page/GitHubLoginPage";

type MyFixtures = {
    gitHubHomePage: GitHubHomePage;
    gitHubLoginPage: GitHubLoginPage;
}

export const test = base.extend<MyFixtures>({


    gitHubHomePage: async({ page }, use) => {

      const gitHubHomePage = new GitHubHomePage(page);
      await gitHubHomePage.goto();
     

      await use(gitHubHomePage)

    },

    gitHubLoginPage: async({ page }, use) => {

      const gitHubLoginPage = new GitHubLoginPage(page);

      await gitHubLoginPage.goto();
      await gitHubLoginPage.clickSignInBtn();

      await use(gitHubLoginPage);

    }
  })
  
  export { expect } from '@playwright/test'