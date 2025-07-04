import {test,expect} from '@playwright/test';
test.describe('Login flow',()=>{
    test('should log in successfully and redirect to /home',async({page})=>{
        await page.goto('/login');
        await page.fill('input[placeholder="Email"]','arnav@example.com');
        await page.fill('input[placeholder="Password"]','pass123');
        await page.click('button[type="submit"]');
        await page.waitForURL('**/home');
        await expect(page.locator('text=BSE Sensex 50 Data')).toBeVisible();
    });
    test('should show error for invalid credentials',async({page})=>{
        await page.goto('/login');
        await page.fill('input[placeholder="Email"]','invalid@example.com');
        await page.fill('input[placeholder="Password"]','wrongpass');
        await page.click('button[type="submit"]');
        await expect(page.locator('text=Invalid credentials')).toBeVisible();
    });
});