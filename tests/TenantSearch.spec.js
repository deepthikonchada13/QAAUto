const { test, expect } = require('@playwright/test');
const { POManagers } = require('../PageObjects/POManagers');

test.describe('Super Admin — Tenant search', () => {
  test.beforeEach(async ({ page }) => {
    const pomanager = new POManagers(page);
    await page.goto('https://myappointments.whitecoats.com/');
    await pomanager.Loginpage().validLogin();
  });

  test('Positive: search returns existing tenant', async ({ page }) => {
    const pomanager = new POManagers(page);
    const superAdmin = pomanager.SuperAdminPage();

    const rows = page.locator('table tbody tr');
    await superAdmin.searchTenant('Santi');
    await expect(rows).toContainText('Santi');
  });

  test('Negative: search for non-existent tenant shows no results', async ({ page }) => {
    const pomanager = new POManagers(page);
    const superAdmin = pomanager.SuperAdminPage();

    const rows = page.locator('table tbody tr');
    await superAdmin.searchTenant('no-such-tenant-12345');
    await expect(rows).toHaveCount(0);
  });
});
