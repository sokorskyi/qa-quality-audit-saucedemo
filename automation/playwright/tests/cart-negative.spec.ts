import { test, expect } from '@playwright/test';

test.describe('TC-CART-NEG-001 - Cart functionality - Negative scenarios', () => {
    test('TC-CART-NEG-001 - User cannot access cart page without login', async ({ page }) => {

        await page.goto('https://www.saucedemo.com/cart.html');

        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await expect(page.locator('[data-test="error"]')).toHaveText(
            "Epic sadface: You can only access '/cart.html' when you are logged in."
        )
    })

    test('TC-CART-NEG-002 - User cannot access inventory page without login', async ({ page }) => {

        await page.goto('https://www.saucedemo.com/inventory.html');

        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await expect(page.locator('[data-test="error"]')).toHaveText(
            "Epic sadface: You can only access '/inventory.html' when you are logged in."
        )
    })

    test('TC-CART-NEG-003 - Cart badge is not displayed when cart is empty', async ({ page }) => {

        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();

        await expect(page).toHaveURL(/inventory/);
        await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0);
    });

    test('TC-CART-NEG-004 - Remove button is not displayed for product not added to cart', async ({ page }) => {

        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();

        await expect(page).toHaveURL(/inventory/);
        await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toHaveCount(0);
        await expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible();
    });

    test('TC-CART-NEG-005 - User cannot proceed to checkout from empty cart', async ({ page }) => {
        test.fail(true, 'BUG-001: Checkout allows proceeding with empty cart');
        // BUG reference: https://tatyana-qa.atlassian.net/browse/SCRUM-21;

        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();

        await expect(page).toHaveURL(/inventory/);

        await page.locator('[data-test="shopping-cart-link"]').click();
        const buttonForPayOrder = page.locator('["data-test="checkout"]');
        await expect(buttonForPayOrder).toBeDisabled();

        // Known issue: Checkout is enabled with empty cart
        // Expected behavior: Checkout should be disabled or inaccessible when cart is empty
        // Related bug: BUG-001 (see Bug_Reports folder)
    });
});

