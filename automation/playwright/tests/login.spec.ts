import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Authentication - Login', () => {
    test.describe('Positive', () => {
        test('TC-LOGIN-001 - Successful login with valid credentials [smoke][auth]', async ({ page }) => {
            const loginPage = new LoginPage(page);
            const inventoryPage = new InventoryPage(page);

            await test.step('Open login page', async () => {
                await loginPage.open();
            });

            await test.step('Login with valid credentials', async () => {
                await loginPage.login('standard_user', 'secret_sauce');
            });

            await test.step('Verify user is redirected to Inventory page', async () => {
                await inventoryPage.expectLoaded();

                await expect(page.locator('[data-test="title"]')).toHaveText('Products');
            });
        });
    });

    test.describe('Negative - Validation & Errors', () => {
        test('TC-LOGIN-002 - Invalid credentials [negative][auth]', async ({ page }) => {
            const loginPage = new LoginPage(page);

            await test.step('Open login page', async () => {
                await loginPage.open();
            });

            await test.step('Submit invalid username + password', async () => {
                await loginPage.login('invalid_user', 'invalid_password');
            });

            await test.step('Verify correct error message and no redirect', async () => {
                await loginPage.expectErrorContains(
                    'Epic sadface: Username and password do not match any user in this service'
                );
                await expect(page).toHaveURL(/\/$/);
            });
        });

        test('TC-LOGIN-003 - Empty username [negative][auth]', async ({ page }) => {
            const loginPage = new LoginPage(page);

            await loginPage.open();
            await loginPage.login('', 'secret_sauce');

            await loginPage.expectErrorContains('Epic sadface: Username is required');
            await expect(page).toHaveURL(/\/$/);
        });

        test('TC-LOGIN-004 - Empty password [negative][auth]', async ({ page }) => {
            const loginPage = new LoginPage(page);

            await loginPage.open();
            await loginPage.login('standard_user', '');

            await loginPage.expectErrorContains('Epic sadface: Password is required');
            await expect(page).toHaveURL(/\/$/);
        });

        test('TC-LOGIN-005 - Both fields empty (validation order) [negative][auth]', async ({ page }) => {
            const loginPage = new LoginPage(page);

            await loginPage.open();
            await loginPage.login('', '');

            await loginPage.expectErrorContains('Epic sadface: Username is required');
            await expect(page).toHaveURL(/\/$/);
        });
    });
});