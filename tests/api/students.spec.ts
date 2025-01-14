import { test, expect } from '../../fixtures/test-data-fixture'; 
import compareResponseWithRequest from '../../helpers/compareResponseWithRequest';
import runQuery from '../../helpers/dbUtils';

test.describe.configure({ mode: 'serial' });

test.describe("Students", () => {

  let studentId;

  test('Create a new student using POST', async ({ request, newStudent }) => {

    const response = await request.post(process.env.API_ENDPOINT!, {
      // headers: {
      //   'Content-Type': 'application/json',
      //   'Authorization': `Bearer ${process.env.API_TOKEN}`
      // },
      data: newStudent
    })

    // console.log(JSON.stringify(response, null, 2))

    const statusCode = response.status()
    console.log('Status Code: ', statusCode)

    expect(statusCode).toBe(201)

    expect(response.ok()).toBeTruthy()

    const responseBody = await response.json()
    console.log(responseBody)

    const name = responseBody.FIRST_NAME
    console.log('Name: ', name)

    studentId = responseBody.STUDENT_ID

    console.log(responseBody.DOB + ' DOB')

    // for (const key in newStudent) {
    //   expect(responseBody[key]).toBe(newStudent[key])
    // }

    compareResponseWithRequest(responseBody, newStudent)

     const query = `SELECT * FROM students WHERE email = '${newStudent.EMAIL}'`

     const result = await runQuery(query)
     const dbRow = result[0]
     console.log(dbRow)

    // for (const key in newStudent) {
    //   if(key === 'DOB') {
    //     // ISO date format
    //     const receivedString = dbRow[key].toISOString().split('T')[0]
    //     expect(receivedString).toBe(newStudent[key])
    //   } else {
    //     expect(dbRow[key]).toBe(newStudent[key])
    //   }
    // }

    compareResponseWithRequest(dbRow, newStudent)

     expect(result).toBeDefined()
     expect(result.length).toBe(1)
  })

  /**
   * Test Case 2
   * Send a GET request to retrieve student we CREATED in the previous test
   * Validate the response is 2**
   * Validate the response body matches the student we created
   */

  test('Create a new student using GET', async ({ request, newStudent }) => {
    const response = await request.get(`${process.env.API_ENDPOINT}/${studentId}`)

    expect(response.ok()).toBeTruthy()

    const responseBody = await response.json()
    console.log(responseBody)

    // for (const key in newStudent) {
    //   if(key === 'DOB') {
    //     // ISO date format
    //     const receivedString = responseBody[key].split('T')[0]
    //     expect(receivedString).toBe(newStudent[key])
    //   } else {
    //     expect(responseBody[key]).toBe(newStudent[key])
    //   }
    // }

    compareResponseWithRequest(responseBody, newStudent)
  })

  /**
   * Test Case 3
   * Send a PUT request to update the student we CREATED in the first test
   * Validate the response is 2**
   */

  test('Update a student we created using PUT', async ({ request, updatedStudent }) => {
    
    const response = await request.put(`${process.env.API_ENDPOINT!}/${studentId}`, {
      data: updatedStudent
  })
  
    expect(response.ok()).toBeTruthy()

    const query = `SELECT * FROM students WHERE email = '${updatedStudent.EMAIL}'`

    const result = await runQuery(query)
    const dbRow = result[0]

    compareResponseWithRequest(dbRow, updatedStudent)
  })

  /**
   * Test Case 4
   * Send a DELETE request to delete the student we CREATED in the first test
   * Validate the response is 2**
   * And send a query to validate the student was deleted
   */

  test('Delete a student UPDATED using DELETE', async ({ request, updatedStudent }) => {

    const response = await request.delete(`${process.env.API_ENDPOINT!}/${studentId}`)

    expect(response.ok()).toBeTruthy()

    const query = `SELECT * FROM students WHERE email = '${updatedStudent.EMAIL}'`
    const result = await runQuery(query)

    expect(result.length).toBe(0)
  })
})