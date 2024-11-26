
import {test, expect, Locator} from "@playwright/test";
import { TodoPage } from "../page/ToDoPage";


test.describe('Todo List', () => {
    let todoPage: TodoPage;

    test.beforeEach(async ({page}) => {
        todoPage = new TodoPage(page)
        await page.goto('https://techglobal-training.com/frontend/project-6');
    });
    
    const title = 'My Tasks';
    const tasks = ['1.first', '2. second', '3. third', '4. fourth', '5. fifth'];
    const invalidTask = '1.first, 2.second, 3.third, 4.fourth, 5.fifth';
    const noTaskMessage = 'No tasks found!';
    const errorMessage1 = 'Error: Todo cannot be more than 30 characters!';
    const errorMessage2 = `Error: You already have ${tasks[0]} in your todo list.`

    test('Test Case 01 - Todo-App Modal Verification', async () => {

        await test.step('1. Confirm that the todo-app modal is visible with the title “My Tasks.”', async() => { 

            await expect(todoPage.panelHeading).toHaveText(title);

        });
        
        await test.step('2-3-4.', async() => {
            //Validate that the New todo input field is enabled for text entry.
            //Validate ADD button is enabled.
            //Validate Search field is enabled.

            const arr: Locator[] = await todoPage.formElementsArr() ?? [];

            for(const ele of arr) {
                await expect(ele).toBeEnabled();
            };

        });

        await test.step('5. Validate that the task list is empty, displaying the message “No tasks found!”', async() => {

            await expect(todoPage.controlPanel).toHaveText(noTaskMessage);

       });    
    });

    test('Test Case 02 - Single Task Addition and Removal', async() => {

        await test.step('1. Enter a new task in the todo input field and add it to the list.', async() => {
            
            await todoPage.fillInputField(tasks[0]);

            await todoPage.clickAddBtn();
        });

        await test.step('2. Validate that the new task appears in the task list.', async() => {
            
            await expect(todoPage.taskList).toBeVisible();
        });

        await test.step('3. Validate that the number of tasks in the list is exactly one.', async() => {

            await expect(todoPage.taskList).toHaveCount(1);
        });

        await test.step('4. Mark the task as completed by clicking on it.', async() => {
          
            await todoPage.clickCheckBtn();

        });

        await test.step('5. Validate item is marked as completed.', async() => {
            
            await expect(todoPage.textCrossed).toHaveClass(/has-text-success/);
            
        });  

        await test.step('6. Remove the completed task by clicking the designated removal button.', async() => {
           
            await todoPage.clickRemoveBtn();
        });

        await test.step('7. Validate that the task list is empty, displaying the message “No tasks found!”.', async() => {
            
            await expect(todoPage.controlPanel).toHaveText(noTaskMessage);

        });
        
    });

    test('Test Case 03 - Multiple Task Operations', async() => {

        await test.step('1. Enter and add 5 to-do items individually.', async() => {

                for(const task of tasks) {
                await todoPage.fillInputField(task);
                await todoPage.clickAddBtn();
            };

        });

        await test.step('2. Validate that all added items match the items displayed on the list.', async() => {

            await expect(todoPage.taskList).toHaveText(tasks);

        });

        await test.step('3. Mark all the tasks as completed by clicking on them.', async() => {

            await todoPage.clickCheckBtnArr();
            
        });

        await test.step('4. Click on the “Remove completed tasks!” button to clear them.', async() => {

            await todoPage.clickRemoveBtn();

        });

        await test.step('5. Validate that the task list is empty, displaying the message “No tasks found!”.', async() => {

            await expect(todoPage.controlPanel).toHaveText(noTaskMessage);

        });

     });

    test('Test Case 04 - Search and Filter Functionality in todo App', async() => {

        await test.step('1. Enter and add 5 to-do items individually.', async() => {
        
            for(const task of tasks) {
                await todoPage.fillInputField(task);
                await todoPage.clickAddBtn();
            };

        });

        await test.step('2. Validate that all added items match the items displayed on the list.', async() => {

            await expect(todoPage.taskList).toHaveText(tasks);

        });

        await test.step('3. Enter the complete name of the previously added to-do item into the search bar', async() => {

            await todoPage.fillSearchBar(tasks[0])
        });

        await test.step('4. Validate that the list is now filtered to show only the item you searched for.', async() => {
            
            await expect(todoPage.taskList).toHaveText(tasks[0]);

        });
            
        await test.step('5. Validate that the number of tasks visible in the list is exactly one.', async() => {
            
            await expect(todoPage.taskList).toHaveCount(1);

        });

    });

    test('Test Case 05 - Task Validation and Error Handling', async() => {

        await test.step('1. Attempt to add an empty task to the to-do list.', async() => {

            await todoPage.fillInputField('')
            await todoPage.clickAddBtn();

        });

        await test.step('2. Validate that the task list is empty, displaying the message “No task found!”.', async() => {
    
            await expect(todoPage.controlPanel).toHaveText(noTaskMessage);

        });

        await test.step('3. Enter an item name exceeding 30 characters into the list.', async() => {

            await todoPage.fillInputField(invalidTask);
            await todoPage.clickAddBtn();

        });

        await test.step('4. Validate error message appears and says “Error: Todo cannot be more than 30 characters!”.', async() => {
    
            await expect(todoPage.error).toHaveText(errorMessage1);

        });

        await test.step('5. Add a valid item name to the list.', async() => {

            await todoPage.fillInputField(tasks[0])
            await todoPage.clickAddBtn();

        });

        await test.step('6. Validate that the active task count is exactly one.', async() => {

            await expect(todoPage.taskList).toHaveCount(1);

        });

        await test.step('7. Try to enter an item with the same name already present on the list.', async() => {

            await todoPage.fillInputField(tasks[0]);
            await todoPage.clickAddBtn();

        });

        await test.step('8. Validate that an error message is displayed, indicating “Error: You already have {ITEM} in your todo list.”.', async() => {

            await expect(todoPage.error).toHaveText(errorMessage2);

        });

    });

});


     

