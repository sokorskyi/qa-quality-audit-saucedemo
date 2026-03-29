import { test, expect } from 'playwright/test';

test.describe('Checkout functionality', () => {
    test.beforeEach(async ({ page }) => {

        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();

        await expect(page).toHaveURL(/inventory/);
    });

    test.describe('Positive  scenarios', () => {

        test('TC-CHECKOUT-001 - User can open checkout form from cart with added item', async ({ page }) => {

            await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

            const cartLink = page.locator('[data-test="shopping-cart-link"]');
            await cartLink.click();

            await expect(page.locator('[data-test="inventory-item-name"]').first()).toHaveText('Sauce Labs Bike Light');
            await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
            await expect(page.locator('[data-test="inventory-item-price"]').first()).toContainText('$9.99');

            const buttonCheckoutForm = page.locator('[data-test="checkout"]');
            await buttonCheckoutForm.click();

            const titlePageCheckout = page.locator('[data-test="title"]');
            await expect(titlePageCheckout).toBeVisible();
            await expect(titlePageCheckout).toHaveText('Checkout: Your Information');

            await expect(page).toHaveURL(/checkout-step-one/);

            const checkoutForm = {
                firstName: page.locator('[data-test="firstName"]'),
                lastName: page.locator('[data-test="lastName"]'),
                postalCode: page.locator('[data-test="postalCode"]')
            };

            await expect(checkoutForm.firstName).toBeVisible();
            await expect(checkoutForm.lastName).toBeVisible();
            await expect(checkoutForm.postalCode).toBeVisible();
        });

        test('TC-CHECKOUT-002 - User can continue checkout with valid data', async ({ page }) => {
            await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
            await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

            const cartLink = page.locator('[data-test="shopping-cart-link"]');
            await cartLink.click();

            const cartItem = page.locator('[data-test="inventory-item"]').first();
            await expect(cartItem).toContainText('Sauce Labs Bike Light');
            await expect(cartItem).toContainText('$9.99');

            const checkoutButton = page.locator('[data-test="checkout"]');
            await checkoutButton.click();

            const checkoutTitle = page.locator('[data-test="title"]');
            await expect(checkoutTitle).toBeVisible();
            await expect(checkoutTitle).toHaveText('Checkout: Your Information');
            await expect(page).toHaveURL(/checkout-step-one/);

            const checkoutForm = {
                firstName: page.locator('[data-test="firstName"]'),
                lastName: page.locator('[data-test="lastName"]'),
                postalCode: page.locator('[data-test="postalCode"]')
            };

            await checkoutForm.firstName.fill('Steven');
            await checkoutForm.lastName.fill('Vinsent');
            await checkoutForm.postalCode.fill('10001');

            await expect(checkoutForm.firstName).toHaveValue('Steven');
            await expect(checkoutForm.lastName).toHaveValue('Vinsent');
            await expect(checkoutForm.postalCode).toHaveValue('10001');

            const continueButton = page.locator('[data-test="continue"]');
            await continueButton.click();

            await expect(page).toHaveURL(/checkout-step-two/);
            await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Overview');

            const overviewItem = page.locator('[data-test="inventory-item"]').first();
            await expect(overviewItem).toContainText('Sauce Labs Bike Light');
            await expect(overviewItem).toContainText('$9.99');
        });

        test('TC-CHECKOUT-003 - Checkout overview displays correct item and pricing data', async ({ page }) => {

            const buttonAddToCart = page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]');
            await buttonAddToCart.click();

            const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
            await expect(cartBadge).toHaveText('1');

            const cartLink = page.locator('[data-test="shopping-cart-link"]');
            await cartLink.click();

            const cartItem = page.locator('[data-test="inventory-item"]').first();

            await expect(cartItem).toContainText('Sauce Labs Fleece Jacket');
            await expect(cartItem).toContainText('$49.99');

            const buttonCheckout = page.locator('[data-test="checkout"]');
            await buttonCheckout.click();

            const checkoutForm = {
                firstName: page.locator('[data-test="firstName"]'),
                lastName: page.locator('[data-test="lastName"]'),
                postalCode: page.locator('[data-test="postalCode"]')
            };

            await checkoutForm.firstName.fill('Steven');
            await checkoutForm.lastName.fill('Vinsent');
            await checkoutForm.postalCode.fill('10-001');

            await expect(checkoutForm.firstName).toHaveValue('Steven');
            await expect(checkoutForm.lastName).toHaveValue('Vinsent');
            await expect(checkoutForm.postalCode).toHaveValue('10-001');

            const continueButton = page.locator('[data-test="continue"]');
            await continueButton.click();

            await expect(page).toHaveURL(/checkout-step-two/);
            await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Overview');

            const overviewItem = page.locator('[data-test="inventory-item"]').first();
            await expect(overviewItem).toContainText('Sauce Labs Fleece Jacket');
            await expect(overviewItem).toContainText('$49.99');

            const detailInformation = {
                paymentInformation: page.locator('[data-test="payment-info-label"]'),
                shippingInformation: page.locator('[data-test="shipping-info-label"]'),
                totalInfoLabel: page.locator('[data-test="total-info-label"]')
            };

            await expect(detailInformation.paymentInformation).toBeVisible();
            await expect(detailInformation.shippingInformation).toBeVisible();
            await expect(detailInformation.totalInfoLabel).toBeVisible();
            await expect(page.locator('[data-test="total-label"]')).toContainText('$53.99');

        });

        test('TC-CHECKOUT-004 - User can finish order successfully', async ({ page }) => {
            const buttonAddToCart = page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]');
            await buttonAddToCart.click();

            const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
            await expect(cartBadge).toHaveText('1');

            const cartLink = page.locator('[data-test="shopping-cart-link"]');
            await cartLink.click();

            const cartItem = page.locator('[data-test="inventory-item"]').first();

            await expect(cartItem).toContainText('Sauce Labs Fleece Jacket');
            await expect(cartItem).toContainText('$49.99');

            const buttonCheckout = page.locator('[data-test="checkout"]');
            await buttonCheckout.click();

            const checkoutForm = {
                firstName: page.locator('[data-test="firstName"]'),
                lastName: page.locator('[data-test="lastName"]'),
                postalCode: page.locator('[data-test="postalCode"]')
            };

            await checkoutForm.firstName.fill('Steven');
            await checkoutForm.lastName.fill('Vinsent');
            await checkoutForm.postalCode.fill('10-001');

            await expect(checkoutForm.firstName).toHaveValue('Steven');
            await expect(checkoutForm.lastName).toHaveValue('Vinsent');
            await expect(checkoutForm.postalCode).toHaveValue('10-001');

            const continueButton = page.locator('[data-test="continue"]');
            await continueButton.click();

            await expect(page).toHaveURL(/checkout-step-two/);
            await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Overview');

            const overviewItem = page.locator('[data-test="inventory-item"]').first();
            await expect(overviewItem).toContainText('Sauce Labs Fleece Jacket');
            await expect(overviewItem).toContainText('$49.99');

            const detailInformation = {
                paymentInformation: page.locator('[data-test="payment-info-label"]'),
                shippingInformation: page.locator('[data-test="shipping-info-label"]'),
                totalInfoLabel: page.locator('[data-test="total-info-label"]')
            };

            await expect(detailInformation.paymentInformation).toBeVisible();
            await expect(detailInformation.shippingInformation).toBeVisible();
            await expect(detailInformation.totalInfoLabel).toBeVisible();
            await expect(page.locator('[data-test="total-label"]')).toContainText('$53.99');

            const buttonFinish = page.locator('[data-test="finish"]');
            await buttonFinish.click();

            await expect(page).toHaveURL(/checkout-complete/);
            await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Complete!');

            const completeTitle = page.locator('[data-test="complete-header"]');
            await expect(completeTitle).toHaveText('Thank you for your order!');

            const completeDescription = page.locator('[data-test="complete-text"]');
            await expect(completeDescription).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');

        });

        test('TC-CHECKOUT-005 - User can return to inventory after order completion', async ({ page }) => {

            const buttonAddItem = page.locator('[data-test="add-to-cart-sauce-labs-onesie"]');
            await buttonAddItem.click();

            const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
            await expect(cartBadge).toHaveText('1');

            const cartLink = page.locator('[data-test="shopping-cart-link"]');
            await cartLink.click();

            const cartItem = page.locator('[data-test="inventory-item"]').first();

            await expect(cartItem).toContainText('Sauce Labs Onesie');
            await expect(cartItem).toContainText('$7.99');

            const buttonCheckout = page.locator('[data-test="checkout"]');
            await buttonCheckout.click();

            const checkoutForm = {
                firstName: page.locator('[data-test="firstName"]'),
                lastName: page.locator('[data-test="lastName"]'),
                postalCode: page.locator('[data-test="postalCode"]')
            };

            await checkoutForm.firstName.fill('Margo');
            await checkoutForm.lastName.fill('Robens');
            await checkoutForm.postalCode.fill('30-051');

            await expect(checkoutForm.firstName).toHaveValue('Margo');
            await expect(checkoutForm.lastName).toHaveValue('Robens');
            await expect(checkoutForm.postalCode).toHaveValue('30-051');

            const continueButton = page.locator('[data-test="continue"]');
            await continueButton.click();

            await expect(page).toHaveURL(/checkout-step-two/);
            await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Overview');

            const overviewItem = page.locator('[data-test="inventory-item"]').first();
            await expect(overviewItem).toContainText('Sauce Labs Onesie');
            await expect(overviewItem).toContainText('$7.99');

            const detailInformation = {
                paymentInformation: page.locator('[data-test="payment-info-label"]'),
                shippingInformation: page.locator('[data-test="shipping-info-label"]'),
                totalInfoLabel: page.locator('[data-test="total-info-label"]')
            };

            await expect(detailInformation.paymentInformation).toBeVisible();
            await expect(detailInformation.shippingInformation).toBeVisible();
            await expect(detailInformation.totalInfoLabel).toBeVisible();
            await expect(page.locator('[data-test="total-label"]')).toContainText('$8.63');

            const buttonFinish = page.locator('[data-test="finish"]');
            await buttonFinish.click();

            await expect(page).toHaveURL(/checkout-complete/);
            await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Complete!');

            const completeTitle = page.locator('[data-test="complete-header"]');
            await expect(completeTitle).toHaveText('Thank you for your order!');

            const completeDescription = page.locator('[data-test="complete-text"]');
            await expect(completeDescription).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');

            const buttonReturnInventory = page.locator('[data-test="back-to-products"]');
            await buttonReturnInventory.click();

            await expect(page).toHaveURL(/inventory.html/);

        });
    });


    test.describe('Negative  scenarios', () => {

        test('TC-CHECKOUT-NEG-001 - User cannot continue checkout with empty First Name', async ({ page }) => {

            const buttonAddToCart = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
            await buttonAddToCart.click();

            const cartLink = page.locator('[data-test="shopping-cart-link"]');
            await cartLink.click();

            const titleCart = page.locator('[data-test="title"]');
            await expect(titleCart).toHaveText('Your Cart');

            const addedItem = page.locator('[data-test="inventory-item"]');
            await expect(addedItem).toBeVisible();

            const priceItem = page.locator('[data-test="inventory-item-price"]');
            await expect(priceItem).toHaveText('$29.99');

            const buttonCheckout = page.locator('[data-test="checkout"]');
            await buttonCheckout.click();

            const checkoutForm = {
                firstName: page.locator('[data-test="firstName"]'),
                lastName: page.locator('[data-test="lastName"]'),
                postalCode: page.locator('[data-test="postalCode"]')
            };

            await checkoutForm.firstName.fill('');
            await checkoutForm.lastName.fill('Robens');
            await checkoutForm.postalCode.fill('32-051');

            await expect(checkoutForm.firstName).toHaveValue('');
            await expect(checkoutForm.lastName).toHaveValue('Robens');
            await expect(checkoutForm.postalCode).toHaveValue('32-051');

            const continueButton = page.locator('[data-test="continue"]');
            await continueButton.click();

            const errorMessage = page.locator('[data-test="error"]');
            await expect(errorMessage).toBeVisible();
            await expect(errorMessage).toHaveText('Error: First Name is required');

        });

        test('TC-CHECKOUT-NEG-002 - User cannot continue checkout with empty Last Name', async ({ page }) => {

            const buttonAddToCart = page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]');
            await buttonAddToCart.click();

            const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
            await expect(cartBadge).toHaveText('1');

            const cartLink = page.locator('[data-test="shopping-cart-link"]');
            await cartLink.click();

            const cartItem = page.locator('[data-test="inventory-item"]').first();

            await expect(cartItem).toContainText('Sauce Labs Fleece Jacket');
            await expect(cartItem).toContainText('$49.99');

            const buttonCheckout = page.locator('[data-test="checkout"]');
            await buttonCheckout.click();

            const checkoutForm = {
                firstName: page.locator('[data-test="firstName"]'),
                lastName: page.locator('[data-test="lastName"]'),
                postalCode: page.locator('[data-test="postalCode"]')
            };

            await checkoutForm.firstName.fill('Barbara');
            await checkoutForm.lastName.fill('');
            await checkoutForm.postalCode.fill('20-001');

            await expect(checkoutForm.firstName).toHaveValue('Barbara');
            await expect(checkoutForm.lastName).toHaveValue('');
            await expect(checkoutForm.postalCode).toHaveValue('20-001');

            const continueButton = page.locator('[data-test="continue"]');
            await continueButton.click();

            const errorMessage = page.locator('[data-test="error"]');
            await expect(errorMessage).toBeVisible();
            await expect(errorMessage).toHaveText('Error: Last Name is required');

        });

        test('TC-CHECKOUT-NEG-003 - User cannot continue checkout with empty Postal Code', async ({ page }) => {

            const buttonAddToCart = page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]');
            await buttonAddToCart.click();

            const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
            await expect(cartBadge).toHaveText('1');

            const cartLink = page.locator('[data-test="shopping-cart-link"]');
            await cartLink.click();

            const cartItem = page.locator('[data-test="inventory-item"]').first();

            await expect(cartItem).toContainText('Sauce Labs Fleece Jacket');
            await expect(cartItem).toContainText('$49.99');

            const buttonCheckout = page.locator('[data-test="checkout"]');
            await buttonCheckout.click();

            const checkoutForm = {
                firstName: page.locator('[data-test="firstName"]'),
                lastName: page.locator('[data-test="lastName"]'),
                postalCode: page.locator('[data-test="postalCode"]')
            };

            await checkoutForm.firstName.fill('Barbara');
            await checkoutForm.lastName.fill('James');
            await checkoutForm.postalCode.fill('');

            await expect(checkoutForm.firstName).toHaveValue('Barbara');
            await expect(checkoutForm.lastName).toHaveValue('James');
            await expect(checkoutForm.postalCode).toHaveValue('');

            const continueButton = page.locator('[data-test="continue"]');
            await continueButton.click();

            const errorMessage = page.locator('[data-test="error"]');
            await expect(errorMessage).toBeVisible();
            await expect(errorMessage).toHaveText('Error: Postal Code is required');

        });

        test('TC-CHECKOUT-NEG-004 - User should not be able to submit whitespace-only values', async ({ page }) => {
            test.fail(true, 'BUG-002: Validation includes only whitespace-only is broken');
            // BUG reference: https://tatyana-qa.atlassian.net/browse/SCRUM-24

            const buttonAddToCart = page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]');
            await buttonAddToCart.click();

            const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
            await expect(cartBadge).toHaveText('1');

            const cartLink = page.locator('[data-test="shopping-cart-link"]');
            await cartLink.click();

            const cartItem = page.locator('[data-test="inventory-item"]').first();

            await expect(cartItem).toContainText('Sauce Labs Fleece Jacket');
            await expect(cartItem).toContainText('$49.99');

            const buttonCheckout = page.locator('[data-test="checkout"]');
            await buttonCheckout.click();

            const checkoutForm = {
                firstName: page.locator('[data-test="firstName"]'),
                lastName: page.locator('[data-test="lastName"]'),
                postalCode: page.locator('[data-test="postalCode"]')
            };

            await checkoutForm.firstName.fill('  ');
            await checkoutForm.lastName.fill('  ');
            await checkoutForm.postalCode.fill('  ');

            await expect(checkoutForm.firstName).toHaveValue('  ');
            await expect(checkoutForm.lastName).toHaveValue('  ');
            await expect(checkoutForm.postalCode).toHaveValue(' ');

            const continueButton = page.locator('[data-test="continue"]');
            await continueButton.click();

            // Expected: input should be trimmed and validated as empty
            // Actual: whitespace-only input is accepted as valid
            // Risk: data integrity issue (invalid customer data allowed)
            // Conclusion: missing frontend/backend validation

            const errorMessage = page.locator('[data-test="error"]');
            await expect(errorMessage).toBeVisible();
            await expect(errorMessage).toHaveText('Error: First Name cannot be empty or contain only whitespace');

        });

        test('TC-CHECKOUT-NEG-005 - User should not be able to submit special characters only', async ({ page }) => {
            test.fail(true, 'BUG-003: Special characters validation is broken');
            // BUG reference: https://tatyana-qa.atlassian.net/browse/SCRUM-26

            const buttonAddToCart = page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]');
            await buttonAddToCart.click();

            const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
            await expect(cartBadge).toHaveText('1');

            const cartLink = page.locator('[data-test="shopping-cart-link"]');
            await cartLink.click();

            const cartItem = page.locator('[data-test="inventory-item"]').first();

            await expect(cartItem).toContainText('Sauce Labs Fleece Jacket');
            await expect(cartItem).toContainText('$49.99');

            const buttonCheckout = page.locator('[data-test="checkout"]');
            await buttonCheckout.click();

            const checkoutForm = {
                firstName: page.locator('[data-test="firstName"]'),
                lastName: page.locator('[data-test="lastName"]'),
                postalCode: page.locator('[data-test="postalCode"]')
            };

            await checkoutForm.firstName.fill('#$%^');
            await checkoutForm.lastName.fill('*()_+');
            await checkoutForm.postalCode.fill('?>!@#');

            await expect(checkoutForm.firstName).toHaveValue('#$%^');
            await expect(checkoutForm.lastName).toHaveValue('*()_+');
            await expect(checkoutForm.postalCode).toHaveValue('?>!@#');

            const continueButton = page.locator('[data-test="continue"]');
            await continueButton.click();

            // Expected: input should be validated against allowed character set
            // Actual: special characters (*&^%$#) are accepted as valid input
            // Risk: data integrity and potential security concerns (lack of input sanitization)
            // Conclusion: missing frontend/backend validation rules

            const errorMessage = page.locator('[data-test="error"]');
            await expect(errorMessage).toBeVisible();
            await expect(errorMessage).toHaveText('Error: First Name cannot be contain only special characters');

        });

    });
});