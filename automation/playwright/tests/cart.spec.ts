import { test, expect } from '@playwright/test';

test.describe('Cart functionality', () => {

    test.beforeEach(async ({ page }) => {

        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();

        await expect(page).toHaveURL(/inventory/);
    });

    test.describe('Positive cart scenarios', () => {

        test('TC-CART-001 - Add single item to cart', async ({ page }) => {

            await expect(page.locator('[data-test="title"]')).toHaveText('Products');
            await expect(page.locator('[data-test="inventory-item-name"]').first()).toBeVisible();

            await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

            await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText("1");

            await page.locator('[data-test="shopping-cart-link"]').click();

            await expect(page.locator('[data-test="title"]')).toHaveText("Your Cart");

            const cartItem = page.locator('[data-test="inventory-item"]').first();
            await expect(cartItem).toContainText('Sauce Labs Backpack');
            await expect(cartItem).toContainText('$29.99');
            await expect(cartItem).toBeVisible();
        });

        test('TC-CART-002 - Add multiple items and verify cart badge and list count', async ({ page }) => {
            await expect(page.locator('[data-test="title"]')).toHaveText('Products');
            await expect(page.locator('[data-test="inventory-item-name"]').first()).toBeVisible();

            await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
            await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

            await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
            await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');

            await page.locator('[data-test="shopping-cart-link"]').click();

            const firstItem = page.locator('[data-test="inventory-item"]').nth(0);
            await expect(firstItem).toContainText('Sauce Labs Backpack');
            await expect(firstItem).toContainText('$29.99');

            const secondItem = page.locator('[data-test="inventory-item"]').nth(1);
            await expect(secondItem).toContainText('Sauce Labs Bike Light');
            await expect(secondItem).toContainText('$9.99');

            await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(2);
        });

        test('TC-CART-003 - Remove item from cart and verify badge and list update', async ({ page }) => {
            await expect(page.locator('[data-test="title"]')).toHaveText('Products');
            await expect(page.locator('[data-test="inventory-item-name"]').first()).toBeVisible();

            await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

            await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText("1");

            await page.locator('[data-test="shopping-cart-link"]').click();

            await expect(page.locator('[data-test="title"]')).toHaveText("Your Cart");

            const productInCart = page.locator('[data-test="inventory-item-name"]').first();
            await expect(productInCart).toHaveText('Sauce Labs Backpack');
            await expect(page.locator('[data-test="inventory-item-price"]').first()).toHaveText("$29.99");
            await expect(productInCart).toBeVisible();

            const buttonRemove = page.locator('[data-test="remove-sauce-labs-backpack"]');
            await buttonRemove.click();

            await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(0);
            await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0);
        });

        test('TC-CART-004 - Refresh page does not break cart badge and contents', async ({ page }) => {

            await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
            const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
            await expect(cartBadge).toHaveText("1");

            await page.reload();

            await expect(page.locator('[data-test="title"]')).toHaveText('Products');
            await expect(cartBadge).toHaveText("1");
            await page.locator('[data-test="shopping-cart-link"]').click();

            const firstItem = page.locator('[data-test="inventory-item"]').nth(0);
            await expect(firstItem).toContainText('Sauce Labs Backpack');
            await expect(firstItem).toContainText('$29.99');
        });

    });
});