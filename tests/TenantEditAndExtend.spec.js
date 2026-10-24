// const { test, expect } = require('@playwright/test');
// const { POManagers } = require('../PageObjects/POManagers');

// test.describe('Super Admin — Tenant edit fields', () => {
//   test.beforeEach(async ({ page }) => {
//     const pomanager = new POManagers(page);
//     await page.goto('https://myappointments.whitecoats.com/login');
//     await pomanager.Loginpage().validLogin();
//   });

//   test('Positive: edit tenant name and email with valid values', async ({ page }) => {
//     const pomanager = new POManagers(page);
//     const superAdmin = pomanager.SuperAdminPage();

//     await superAdmin.editTenant('Santi', 'Santi Updated', 'santi.updated@example.com');
//     await superAdmin.searchTenant('Santi Updated');
//     const updatedRow = page.locator('table tbody tr').filter({ hasText: 'Santi Updated' }).first();
//     await expect(updatedRow).toContainText('Santi Updated');
//     await expect(updatedRow).toContainText('santi.updated@example.com');
//   });

//   test('Negative: edit tenant with invalid email shows validation error', async ({ page }) => {
//     const pomanager = new POManagers(page);
//     const superAdmin = pomanager.SuperAdminPage();

//     await superAdmin.editTenant('Santi', null, 'invalid-email');
//     await expect(page.locator('text=Please enter a valid email')).toBeVisible();
//   });

//   test('Negative: edit tenant with blank email shows required validation', async ({ page }) => {
//     const pomanager = new POManagers(page);
//     const superAdmin = pomanager.SuperAdminPage();

//     await superAdmin.editTenant('Santi', null, '');
//     await expect(page.locator('text=Email is required')).toBeVisible();
//   });
// });
