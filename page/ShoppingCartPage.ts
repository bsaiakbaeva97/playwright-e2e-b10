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

  constructor(page: Page) {
    super(page);
    this.heading = page.locator('.mt-2');
    this.courseSections = page.locator('[id^= course]');
    this.courseImg = page.locator('[id^= course] img');
    this.courseName = page.locator('[id^= course] h3');
    this.courseTag = page.locator('[id^= course] .my-3');
    this.coursePrice = page.locator('[id^= course] strong');
    this.coursesWithDiscount = page.locator('[data-testid="discount"]');
    this.addToCartBtn = page.locator('[id^= course] button');
    this.cartHeading = page.locator('.mb-2');
    this.cartItems = page.locator('.course-card');
    this.totalPrice = page.locator('#total-price');
    this.placeOrder = page.locator('.Project8_cardBottom__sN8en button')
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

  async AddToCartBtnArr() {
    return await this.addToCartBtn.all()
  }
}