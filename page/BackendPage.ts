import { BasePage } from "./BasePage";
import { type Locator, type Page } from "@playwright/test";

export class BackendPage extends BasePage {
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly email: Locator;
  readonly DOB: Locator;
  readonly addStudentBUtton: Locator;
  readonly userList: Locator;
  readonly editStudentModal: Locator;
  readonly editModalFirstName: Locator;
  readonly editModalLastName: Locator;
  readonly editModalEmail: Locator;
  readonly editModalDOB: Locator;
  readonly editModalUpdateButton: Locator;

  constructor(page: Page) {
    super(page);
    this.firstName = page.locator('[name="FIRST_NAME"]');
    this.lastName = page.locator('[name="LAST_NAME"]');
    this.email = page.locator('[name="EMAIL"]');
    this.DOB = page.locator('[name="DOB"]');
    this.addStudentBUtton = page.locator('button[type="submit"]');
    this.userList = page.locator(".common_list__UR80V");
    this.editStudentModal = page.locator("#mymodal");
    this.editModalFirstName = this.editStudentModal.locator(
      '[name="FIRST_NAME"]'
    );
    this.editModalLastName =
      this.editStudentModal.locator('[name="LAST_NAME"]');
    this.editModalEmail = this.editStudentModal.locator('[name="EMAIL"]');
    this.editModalDOB = this.editStudentModal.locator('[name="DOB"]');
    this.editModalUpdateButton = this.editStudentModal.locator(
      'button[type="submit"]'
    );
  }

  getUserByName(username: string) {
    return this.userList.filter({ hasText: username });
  }

  async clickEditButtonByName(username: string) {
    await this.getUserByName(username)
      .locator(".common_listControls__2tYWs > svg")
      .first()
      .click();
  }

  async removeUserByName(username: string) {
    await this.getUserByName(username)
      .locator(".common_listControls__2tYWs > svg")
      .last()
      .click();
  }

  async clickAddStudentButton() {
    await this.addStudentBUtton.click();
  }

  async addNewStudent(
    firstName: string,
    lastName: string,
    email: string,
    DOB: string
  ) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.email.fill(email);
    await this.DOB.fill(DOB);
    await this.clickAddStudentButton();
  }

  /**
   * Updates the student information in the edit modal.
   * This functio will fill in the provided fields in the edit modal and then click the update button
   * 
   * @param inputs - An object containing the student information to update
   * @param inputs.firstName - The new first name of the student (optional).
   * @param inputs.lastName - The new last name of the student (optional).
   * @param inputs.email - The new email of the student (optional).
   * @param inputs.DOB - The new DOB of the student (optional).
   */
  async updateStudent(inputs: {
    firstName?: string;
    lastName?: string;
    email?: string;
    DOB?: string;
  }) {
    const fieldMap = {
      firstName: this.editModalFirstName,
      lastName: this.editModalLastName,
      email: this.editModalEmail,
      DOB: this.editModalDOB,
    };

    for (const [key, locator] of Object.entries(fieldMap)) {
      if (inputs[key]) {
        await locator.fill(inputs[key]);
      }
    }

    await this.editModalUpdateButton.click()
  }
}