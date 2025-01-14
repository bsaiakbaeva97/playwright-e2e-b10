import { test, expect } from '../../fixtures/test-data-fixture';

test.describe.configure({mode: "serial"})
test.describe("API project", () => {

    let studentId;

    test("Retrieve all students with GET", async ({request}) => {
        const response = await request.get(`${process.env.API_ENDPOINT}`)
        
        const responseCode = response.status()
        expect(responseCode).toBe(200)
        const responseBody = await response.json()
        expect(responseBody.length).toBeGreaterThanOrEqual(2)
        
        if(responseBody.length > 1) {
            for(const student of responseBody) {
                expect(student).toHaveProperty("STUDENT_ID")
            }
        }

        console.log(responseBody)
    })

    test("Create a new student with POST", async ({request, newStudent}) => {
        const response = await request.post(`${process.env.API_ENDPOINT}`, {
            data: newStudent
        })

        const responseCode = response.status();
        expect(responseCode).toBe(201)

        const responseBody = await response.json()
       
        for(const key in newStudent) {
            expect(responseBody[key]).toBe(newStudent[key])
        }  

        studentId = responseBody.STUDENT_ID
        console.log(studentId);
    })

    test("Get newly created student with GET", async ({request, newStudent}) => {
        const response = await request.get(`${process.env.API_ENDPOINT}/${studentId}`)
        const responseCode = response.status();
        expect(responseCode).toBe(200);
        
        const responseBody = await response.json();
        console.log(responseBody)

        for(const key in newStudent) {
            if(key === "DOB"){
                const receivedString = responseBody[key].split("T")[0]
                expect(receivedString).toBe(newStudent[key])
            } else {
                expect(responseBody[key]).toBe(newStudent[key])
            }
            
        }

    })

    test("Update newly created student with PUT", async ({request, updatedStudent}) => {
        const response = await request.put(`${process.env.API_ENDPOINT}/${studentId}`, {
            data: updatedStudent
        })

        const responseCode = response.status();
        expect(responseCode).toBe(200)
        const responseBody = await response.json()
        expect(responseBody.message).toBe(`Successfully updated the student with the STUDENT_ID: ${studentId}`)
    })

    test("Delete newly created student with DELETE", async ({request}) => {
        const response = await request.delete(`${process.env.API_ENDPOINT}/${studentId}`)
        expect(response.status()).toBe(204)
    })
})