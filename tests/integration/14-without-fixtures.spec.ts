/**
 * Visits the todo page
 * Before every test it will add 'item1' and `item2' to the list
 * On the first test, we will add their own todo for ex. Test Case-1: 'own item'
 * On the second test, we will remove any todo item from the list, for ex. Test Case-2: remove 'item1'
 * After each test we will remove everything from the todo list
 */

import test from "@playwright/test";
import { TodoListPage } from "../../page/TodoListPage";

test.describe('todo tests', () => {
  let todoPage: TodoListPage

  test.beforeEach(async({ page }) => {
    todoPage = new TodoListPage(page)
    await todoPage.goto()

    await todoPage.addTodo('item1')
    await todoPage.addTodo('item2')
  })

  test('Should add an item', async () => {
    await todoPage.addTodo('My Item')
  })

  test('Should remove an item', async () => {
    await todoPage.remove('item1')
  })

  test.afterEach(async() => {
    await todoPage.removeAll()
  })
})






