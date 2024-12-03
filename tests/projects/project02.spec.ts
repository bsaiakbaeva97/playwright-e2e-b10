import {test, expect} from "../../fixtures/shoppingCart-fixture"
import { ShoppingCartPage } from "../../page/ShoppingCartPage";


test.describe('Shopping Cart', () => {

    const headingText = 'Available Courses'
    const expectedCourseName = ['SDET Course | Cypress Playwright', 'Playwright Automation Testing', 'Cypress Automation Course']
    const addCartText = 'Add to Cart'
    const cartHeadingText = 'Items Added to Cart'
    const defaultPrice = '$0'
    const placeOrderText = 'Place Order'

    test('Test Case 01 - Available Courses Section Validation', async({ shoppingCartPage }) => {
        
        await test.step('1. Validate the heading is “Available Courses”', async() => {
            await expect(shoppingCartPage.heading).toHaveText(headingText)
        });

        await test.step('2. Validate that there are 3 courses displayed', async() => {
            const courseImages = await shoppingCartPage.courseImgArr()
                 
            for (const courseImage of courseImages) {
                await expect(courseImage).toBeVisible(); 
            };
        });

        await test.step('3. Validate that each course has an image, name, TechGlobal School tag, and a price of more than zero', async() => {
            await expect(shoppingCartPage.courseName).toHaveText(expectedCourseName);

            const coursePriceArr = await shoppingCartPage.coursePriceArr()
            for (const coursePrice of coursePriceArr) {
                const priceStr = await coursePrice.textContent();
                const priceNum = Number(priceStr?.replace(/[^\d]+/, ''))
                expect(priceNum).toBeGreaterThan(1)
            };
        });

        await test.step('4. Validate the first 2 courses have discount tags', async() => {
            const discountTags = await shoppingCartPage.coursesWithDiscountArr();

            for(const discountTag of discountTags){
                await expect(discountTag).toBeVisible();
            };
        });

        await test.step('5. Validate that there is an “Add to Cart” button under each course which is displayed, enabled, and has the text “Add to Cart”', async() => {
            
            await expect(shoppingCartPage.addToCartBtn).toHaveCount(3);

            const buttons = await shoppingCartPage.AddToCartBtnArr();
            for(const button of buttons){
                await expect(button).toBeEnabled();
                await expect(button).toHaveText(addCartText);
            };
        });
    });


    test('Test Case 02 - Cart Section Validation', async({ shoppingCartPage }) => {

        await test.step('1. Validate the heading is “Items Added to Cart”', async() => {
            await expect(shoppingCartPage.cartHeading).toHaveText(cartHeadingText);
        });

        await test.step('2. Validate that the cart is empty by default', async() => {
            await expect(shoppingCartPage.cartItems).not.toBeVisible();
        });

        await test.step('3. Validate that the total price is zero “$0” by default', async() => {
            const totalPriceAll = await shoppingCartPage.totalPrice.textContent();
            const totalPriceNum = totalPriceAll?.replace(/[^$\d]+/, '');
            expect(totalPriceNum).toBe(defaultPrice);
        });

        await test.step('4. Validate that there is a “Place Order” button is displayed, disabled, and has the text “Place Order”', async() => {
            await expect(shoppingCartPage.placeOrder).toBeDisabled();
            await expect(shoppingCartPage.placeOrder).toHaveText(placeOrderText);
        });
    })
});



/*
Navigate to https://techglobal-training.com/frontend/project-8
Validate the heading is “Items Added to Cart”
Validate that the cart is empty by default
Validate that the total price is zero “$0” by default
Validate that there is a “Place Order” button is displayed, disabled, and has the text “Place Order”
*/