import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ShoppingCartPage extends BasePage {
  readonly heading: Locator;
  readonly courseSections: Locator;
  readonly courseImg: Locator;
  readonly courseName: Locator;
  readonly courseTag: Locator;
  readonly coursePrice: Locator;
  readonly coursesWithDiscount: Locator;
  readonly addToCartBtn: Locator;
  readonly cartHeading: Locator;
  readonly cartItems: Locator;
  readonly totalPrice: Locator;
  readonly placeOrder: Locator;
  readonly cartItemImg: Locator;
  readonly cartItemName: Locator;
  readonly cartItemDiscount: Locator;
  readonly successMsg: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.locator('.mt-2');
    this.courseSections = page.locator('[id^= course]');
    this.courseImg = this.courseSections.locator('img');
    this.courseName = this.courseSections.locator('h3');
    this.courseTag = this.courseSections.locator('.my-3');
    this.coursePrice = this.courseSections.locator('strong');
    this.coursesWithDiscount = page.locator('[data-testid="discount"]');
    this.addToCartBtn = this.courseSections.locator('button');
    this.cartHeading = page.locator('.mb-2');
    this.cartItems = page.locator('.course-card');
    this.totalPrice = page.locator('#total-price');
    this.placeOrder = page.locator('.Project8_cardBottom__sN8en button');
    this.cartItemImg = this.cartItems.locator('img');
    this.cartItemName = this.cartItems.locator('has-text-black');
    this.cartItemDiscount = this.cartItems.locator('[data-testid="discount"]');
    this.successMsg = page.locator('.is-success');
  }

  async goto() {
    await this.page.goto('https://techglobal-training.com/frontend/project-8');
};

  async courseImgArr() {
    return await this.courseImg.all()
  }

  async coursePriceArr() {
    return await this.coursePrice.all()
  }

  async courseTagArr() {
    return await this.courseTag.all()
  }

  async coursesWithDiscountArr() {
    return await this.coursesWithDiscount.all()
  }

  async addToCartBtnArr() {
    return await this.addToCartBtn.all()
  }

  async addCourseAndGetCourse(index) {
    const courseToAdd = this.addToCartBtn.nth(index)
    await courseToAdd.click();
    return courseToAdd;
  }

  async extractNumFromText(locator: Locator) {
     const textContent = await locator.textContent();
     const numericValue = textContent?.replace(/^d+/, '');
     return Number(numericValue);
  }

  
  
}