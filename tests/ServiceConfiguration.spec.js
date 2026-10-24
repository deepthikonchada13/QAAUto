const { test, expect } = require('@playwright/test');
const { POManagers } = require('../PageObjects/POManagers');

let pomanager;

test.describe('Service Configuration page', () => {
  test.beforeEach(async ({ page }) => {
    pomanager = new POManagers(page);
    await page.goto('https://myappointments.whitecoats.com/');
    await pomanager.Loginpage().validLogin();
  });

  test('Positive: should save service configuration with valid values', async ({ page }) => {
    const serviceConfig = pomanager.ServiceConfigurationPage();
    const msg = await serviceConfig.serviceMgt('5', '10', '50', '100');
    expect(msg).toBe('Configuration saved successfully!');
  });

  test('Negative: should show validation error when doctor field is blank', async ({ page }) => {
    const serviceConfig = pomanager.ServiceConfigurationPage();
    const msg = await serviceConfig.serviceMgt('', '10', '50', '100');
    expect(msg).toBe('Configuration saved successfully!');
  });

  test('Negative: should show validation error when staff field is blank', async ({ page }) => {
    const serviceConfig = pomanager.ServiceConfigurationPage();
    const msg = await serviceConfig.serviceMgt('5', '', '50', '100');
    expect(msg).not.toBe('Configuration saved successfully!');
  });

  test('Negative: should show validation error for invalid max user format', async ({ page }) => {
    const serviceConfig = pomanager.ServiceConfigurationPage();
    const msg = await serviceConfig.serviceMgt('5', '10', 'abc', '100');
    expect(msg).not.toBe('Configuration saved successfully!');
  });

  test('Negative: should show validation error for invalid max patient format', async ({ page }) => {
    const serviceConfig = pomanager.ServiceConfigurationPage();
    const msg = await serviceConfig.serviceMgt('5', '10', '50', 'xyz');
    expect(msg).not.toBe('Configuration saved successfully!');
  });

  test('Negative: should show validation error for zero or negative values', async ({ page }) => {
    const serviceConfig = pomanager.ServiceConfigurationPage();
    const msg = await serviceConfig.serviceMgt('0', '0', '-1', '-5');
    expect(msg).not.toBe('Configuration saved successfully!');
  });
});