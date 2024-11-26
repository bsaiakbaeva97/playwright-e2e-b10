import { BasePage } from "./BasePage";
import { type Locator, type Page } from "@playwright/test";

export class TodoPage extends BasePage {
    readonly panelHeading: Locator;
    readonly formElements: Locator;
    readonly controlPanel: Locator;
    readonly inputField: Locator;
    readonly addBtn: Locator;
    readonly taskList: Locator;
    readonly checkBtn: Locator;
    readonly textCrossed: Locator;
    readonly removeBtn: Locator;
    readonly searchBar: Locator;
    readonly error: Locator;


  constructor(page: Page) {
    super(page);
    this.panelHeading = page.locator('.panel-heading');
    this.formElements = page.locator('[class^=control] > :first-child');
    this.controlPanel = page.locator('.ml-1 > p');
    this.inputField = page.locator('[class^=control] > .new-todo');
    this.addBtn = page.locator('#add-btn');
    this.taskList = page.locator('.todo-item');
    this.checkBtn = page.locator('[data-icon="circle-check"]');
    this.textCrossed = page.locator('#panel span').first();
    this.removeBtn = page.locator('#clear');
    this.searchBar = page.locator('#search');
    this.error = page.locator('.notification');
  }


  async fillInputField(task) {
    await this.inputField.fill(task);
  };

  async clickAddBtn() {
    await this.addBtn.click();
  };

  async checkBtnArr() {
    await this.checkBtn.all();
  };

  async formElementsArr() {
    await this.formElements.all(); 
  };

  async clickCheckBtn() {
    await this.checkBtn.click();
  };

  async clickRemoveBtn() {
    await this.removeBtn.click();
  };
  
  async fillSearchBar(task) {
    await this.searchBar.fill(task);
  };


  async clickCheckBtnArr() {
    
    const arr: Locator[] = await this.checkBtn.all();

    for(let ele of arr){
       await ele.click();
     };

    };  

};
