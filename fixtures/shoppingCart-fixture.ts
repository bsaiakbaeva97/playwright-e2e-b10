import {test as base} from "@playwright/test";
import {ShoppingCartPage} from "../page/ShoppingCartPage"


type MyFixtures = {
    shoppingCartPage: ShoppingCartPage;
}

export const test = base.extend<MyFixtures>({


    shoppingCartPage: async({ page }, use) => {

      const shoppingCartPage = new ShoppingCartPage(page);
      await shoppingCartPage.goto();
      await use(shoppingCartPage)

    }
})

export { expect } from '@playwright/test'