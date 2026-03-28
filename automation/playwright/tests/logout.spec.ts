import { test, expect } from '@playwright/test';

test.describe('Logout functionality', () => {

    test.beforeEach(async ({ page }) => {

        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();

        await expect(page).toHaveURL(/inventory/);
    });

    test('TC-LOGOUT-001 - Successful logout', async ({ page }) => {

        await page.locator('[id="react-burger-menu-btn"]').click();
        await page.getByRole('link', { name: 'Logout' }).click();
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await expect(page.locator('[data-test="login-button"]')).toBeVisible();

    });

    test('TC-LOGOUT-002 - User cannot return after logout', async ({ page }) => {

        await page.locator('#react-burger-menu-btn').click();
        await page.locator('#logout_sidebar_link').click();

        await page.goBack();

        await expect(page).toHaveURL('https://www.saucedemo.com/');
    });
});

test('TC-LOGOUT-003 - Auth boundary issue (access without login)', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/inventory.html');

    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.locator('[data-test="error"]'))
        .toHaveText("Epic sadface: You can only access '/inventory.html' when you are logged in.");
});

