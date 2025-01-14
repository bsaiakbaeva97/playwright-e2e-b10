// import { test, expect } from "../../fixtures/test-data-fixture";
// import runQuery from "../../helpers/dbUtils";
// import { BackendPage } from "../../page/BackendPage";

// //const backendPage = new BackendPage(page);

// test.describe.configure({ mode: "serial" });

// test.describe("DB test with UI", () => {
//   test.beforeEach(async ({ page }) => {
//     await page.goto("/backend");
//   });

//   // test('Test DB Connection', async() => {
//   //   const query = 'SELECT * FROM students'
//   //   const result = await runQuery(query)
//   //   console.log(result)
//   // })

//   /**
//    * Test Case 1
//    *
//    * 1. Visit "https://techglobal-training.com/backend"
//    * 2. Create a valid user
//    * 3. Run a query to validate that the user was created
//    */

//   test("Create a new student", async ({ backendPage, newStudent, page }) => {
//     await backendPage.addNewStudent(
//       newStudent.FIRST_NAME,
//       newStudent.LAST_NAME,
//       newStudent.EMAIL,
//       newStudent.DOB
//     );

//     // wait for count to be more than 2
//     await page.waitForFunction(async () => {
//       return document.querySelectorAll(".common_list__UR80V").length > 2;
//     });

//     const query = `SELECT * FROM students WHERE email = '${newStudent.EMAIL}'`;

//     const result = await runQuery(query);
//     console.log(result);

//     expect(result).toBeDefined();
//     expect(result.length).toBe(1);

//     const dbRow = result[0];
//     console.log(dbRow);
//     // console.log(dbRow[3] + ' NAME IN THE QUERY')
//     console.log(dbRow.FIRST_NAME + " NAME IN THE QUERY");

//     expect(dbRow.FIRST_NAME).toBe(newStudent.FIRST_NAME);
//     expect(dbRow.EMAIL).toBe(newStudent.EMAIL);
//   });

//   /**
//    * Test Case 2
//    *
//    * 1. Visit "https://techglobal-training.com/backend"
//    * 2. Update a valid user
//    * 3. Run a query to validate that the user was updated
//    */

//   test("Update existing student", async ({
//     backendPage,
//     newStudent,
//     updatedStudent,
//   }) => {
//     await backendPage.clickEditButtonByName(newStudent.EMAIL);

//     await backendPage.updateStudent({
//       firstName: updatedStudent.FIRST_NAME,
//       email: updatedStudent.EMAIL,
//     });

//     await expect(backendPage.editStudentModal).not.toBeVisible();

//     const query = `SELECT * FROM students WHERE email = '${updatedStudent.EMAIL}'`;

//     const result = await runQuery(query);

//     expect(result).toBeDefined();
//     expect(result.length).toBe(1);

//     const dbRow = result[0];

//     expect(dbRow.FIRST_NAME).toBe(updatedStudent.FIRST_NAME);
//     expect(dbRow.EMAIL).toBe(updatedStudent.EMAIL);
//   });

//   /**
//    * Test Case 3
//    * 1. Visit "https://techglobal-training.com/backend"
//    * 2. Delete the user you created
//    * 3. Run a query to validate that the user was deleted
//    */

//   test("Delete existing student", async ({ backendPage, updatedStudent }) => {
//     await backendPage.removeUserByName(updatedStudent.EMAIL);

//     const deletedStudent = backendPage.getUserByName(updatedStudent.EMAIL);
//     await expect(deletedStudent).not.toBeVisible();

//     const query = `SELECT * FROM students WHERE email = '${updatedStudent.EMAIL}'`;
//     const result = await runQuery(query);

//     expect(result.length).toBe(0);
//     expect(result).toEqual([]);
//   });
// });