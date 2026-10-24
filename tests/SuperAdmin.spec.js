const { test, expect } = require('@playwright/test');
const { POManagers } = require('../PageObjects/POManagers');
const { generateTenantData } = require('../testData/testDataGenerator');

test.describe('Super Admin tenant creation', () => {
  test.beforeEach(async ({ page }) => {
    const pomanager = new POManagers(page);
    await page.goto('https://myappointments.whitecoats.com/');
    await pomanager.Loginpage().validLogin();
  });

  // ── Positive Tests ────────────────────────────────────────────────────────

  test('Positive: should create a new tenant with valid data', async ({ page }) => {
    const { hospitalName, subdomain, email, phone } = generateTenantData();
    await new POManagers(page).SuperAdminPage().CrerateTentant(hospitalName, subdomain, email, phone, email);
  });

  // ── Negative: CreateTenant ───────────────────────────────────────────────

  test('Negative: should fail to create tenant without hospital name', async ({ page }) => {
    const { subdomain, email, phone } = generateTenantData();
    await new POManagers(page).SuperAdminPage().createTenantWithoutHospitalName(subdomain, email, phone, email);
  });

  test('Negative: should fail to create tenant with invalid email', async ({ page }) => {
    const { hospitalName, subdomain, phone, email } = generateTenantData();
    await new POManagers(page).SuperAdminPage().createTenantWithInvalidEmail(hospitalName, subdomain, phone, email);
  });

  test('Negative: should fail to create tenant with invalid phone number', async ({ page }) => {
    const { hospitalName, subdomain, email } = generateTenantData();
    await new POManagers(page).SuperAdminPage().createTenantWithInvalidPhone(hospitalName, subdomain, email, email);
  });

  test('Negative: should fail to create tenant without selecting a plan', async ({ page }) => {
    const { hospitalName, subdomain, email, phone } = generateTenantData();
    await new POManagers(page).SuperAdminPage().createTenantWithoutPlan(hospitalName, subdomain, email, phone, email);
  });
});
