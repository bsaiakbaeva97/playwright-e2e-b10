import {test, expect} from "../../fixtures/shoppingCart-fixture"
import { ShoppingCartPage } from "../../page/ShoppingCartPage";


test.describe('Shopping Cart', () => {

    const headingText = 'Available Courses'
    const expectedCourseName = ['SDET Course | Cypress Playwright', 'Playwright Automation Testing', 'Cypress Automation Course']
    const addCartText = 'Add to Cart'
    const cartHeadingText = 'Items Added to Cart'
    const defaultPrice = '$0'
    const placeOrderText = 'Place Order'
    const expectedSuccessMessage = 'Your order has been placed.'
    const expCourseNamesInCart = ['SDET Course | Cypress Playwright', 'Playwright Automation Testing']

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
                const priceNum = Number(priceStr?.replace('$', ''))
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

            const buttons = await shoppingCartPage.addToCartBtnArr();
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
    });

    test('Test Case 03 - Add a Course to the Cart and Validate', async({ shoppingCartPage }) => {

        await test.step('1. Click on the “Add to Cart” button for one of the courses', async() => {
            await shoppingCartPage.addCourseAndGetCourse(0);
            await expect(shoppingCartPage.cartItems).toHaveCount(1);
        });

        await test.step('2. Validate that the course is displayed in the cart with its image, name, and discount amount if available', async() => {
          
            
            await expect(shoppingCartPage.cartItemImg).toBeVisible();
            await expect(shoppingCartPage.cartItemName).toHaveText(expectedCourseName[0]);

            const discountAvailable = await shoppingCartPage.cartItemDiscount.isVisible()

                if(discountAvailable) {
                    await expect(shoppingCartPage.cartItemDiscount).toBeVisible();
                };
            
        });

        await test.step('3. Validate that the course price is added to the total price excluding the discount amount', async() => {
           
            const coursePriceNum = await shoppingCartPage.extractNumFromText(shoppingCartPage.coursePrice.first());
            const discountPercentageNum = await shoppingCartPage.extractNumFromText(shoppingCartPage.coursesWithDiscount.first())
            
            const discountedPrice = coursePriceNum - (coursePriceNum * (discountPercentageNum / 100))
            expect(shoppingCartPage.totalPrice).toBe(discountedPrice);

        });

        await test.step('4. Click on the “Place Order” button', async() => {
            await shoppingCartPage.placeOrder.click();
        });

        await test.step('5. Click on the “Place Order” button', async() => {
            await expect(shoppingCartPage.successMsg).toHaveText(expectedSuccessMessage);
        });

        await test.step('6. Validate that the cart is empty', async() => {
            await expect(shoppingCartPage.cartItems).toHaveCount(0);
            //await expect(shoppingCartPage.cartItems).not.toBeVisible();
        });

    });


    test('Test Case 04 - Add Two Courses to the Cart and Validate', async( {shoppingCartPage} ) => {

        await test.step('1. Click on the “Add to Cart” button for one of the courses', async() => {
            await shoppingCartPage.addCourseAndGetCourse(0);
        })

        await test.step('2. Click on the “Add to Cart” button for another course', async() => {
            await shoppingCartPage.addCourseAndGetCourse(1);
        })

        await test.step('3. Validate that the courses are displayed in the cart with their image, name, and discount amount if available', async() => {
            await expect(shoppingCartPage.cartItemImg).toHaveCount(2);
            await expect(shoppingCartPage.courseName).toHaveText(expCourseNamesInCart);

            const discountAvailable = await shoppingCartPage.cartItemDiscount.isVisible()
            if(discountAvailable) {
                await expect(shoppingCartPage.cartItemDiscount).toBeVisible();
            };
        })

        await test.step('4. Validate that the course prices are added to the total price excluding the discount amounts', async() => {
            
            let totalDiscountedPrice = 0;

            for(let i = 0; i < 2; i++) {

                const coursePriceNum = await shoppingCartPage.extractNumFromText(shoppingCartPage.coursePrice);
                const discountPercentageNum = await shoppingCartPage.extractNumFromText(shoppingCartPage.coursesWithDiscount)
                const discountedPrice = coursePriceNum - (coursePriceNum * (discountPercentageNum / 100))    
                
                totalDiscountedPrice += discountedPrice;

            }

            expect(shoppingCartPage.totalPrice).toBe(totalDiscountedPrice);   
        })

        await test.step('5. Click on the “Place Order” button', async() => {
            await shoppingCartPage.placeOrder.click();
        })

        await test.step('6. Validate a success message is displayed with the text “Your order has been placed.”', async() => {
            await expect(shoppingCartPage.successMsg).toHaveText(expectedSuccessMessage);
        })

        await test.step('7. Validate that the cart is empty', async() => {
            await expect(shoppingCartPage.cartItems).toHaveCount(0);
            //await expect(shoppingCartPage.cartItems).not.toBeVisible();
        });

    });


    test('', async({ shoppingCartPage }) => {
        
        await test.step('Click on the “Add to Cart” button for all three courses', async() => {
            const arr = await shoppingCartPage.addToCartBtnArr()
            for(const ele of arr) {
                await ele.click();
            }
        });

        await test.step('Validate that the courses are displayed in the cart with their image, name, and discount amount if available', async() => {
            await expect(shoppingCartPage.cartItemImg).toHaveCount(3);
            await expect(shoppingCartPage.courseName).toHaveText(expectedCourseName);

            const discountAvailable = await shoppingCartPage.cartItemDiscount.isVisible()
            if(discountAvailable) {
                await expect(shoppingCartPage.cartItemDiscount).toBeVisible();
            };
        });

        await test.step('Validate that the course prices are added to the total price excluding the discount amounts', async() => {
            let totalDiscountedPrice = 0;

            for(let i = 0; i <= 2; i++) {

                const coursePriceNum = await shoppingCartPage.extractNumFromText(shoppingCartPage.coursePrice);
                const discountPercentageNum = await shoppingCartPage.extractNumFromText(shoppingCartPage.coursesWithDiscount)
                const discountedPrice = coursePriceNum - (coursePriceNum * (discountPercentageNum / 100))    
                
                totalDiscountedPrice += discountedPrice;

            }

            expect(shoppingCartPage.totalPrice).toBe(totalDiscountedPrice);   
        });

        await test.step('Click on the “Place Order” button', async() => {
            await shoppingCartPage.placeOrder.click();
        });

        await test.step('Validate a success message is displayed with the text “Your order has been placed.”', async() => {
            await expect(shoppingCartPage.successMsg).toHaveText(expectedSuccessMessage);
        });

        await test.step('Validate that the cart is empty', async() => {
            await expect(shoppingCartPage.cartItems).toHaveCount(0);
        });
    })


});



