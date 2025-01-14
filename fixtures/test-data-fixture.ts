import { test as pageFixtureTest } from "./page-object-fixtures";
import studentsData from '../test-data/studentsData.json'

type StudentInfo = {
  DOB: string;
  EMAIL: string;
  FIRST_NAME: string;
  LAST_NAME: string;
  INSTRUCTOR_ID: number;
};

type StudentInfoTypes = {
  newStudent: StudentInfo
  updatedStudent: StudentInfo
}

// Extend the Playwright test runner to create your custom fixtures
export const test = pageFixtureTest.extend<StudentInfoTypes>({

  newStudent: async({}, use) => {
    await use(studentsData.newStudent)
  },

  updatedStudent: async({}, use) => {
    await use(studentsData.updateStudent)
  }
});

export { expect } from "@playwright/test";