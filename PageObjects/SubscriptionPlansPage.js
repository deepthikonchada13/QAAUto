const { expect } = require('@playwright/test');

class SubscriptionPlansPage {
  constructor(page) {
    this.page = page;
    this.subscriptionPlansNav = page.getByRole('navigation').getByRole('button', { name: '💎 Subscription Plans' });
    this.addNewPlanButton = page.getByRole('button', { name: '➕ Add New Plan' });
    this.planDetailsModal = page.locator('div', { hasText: '📦 Plan Details' }).first();
    this.planNameInput = this.planDetailsModal.locator('input[type="text"]').first();
    this.statusDropdown = this.planDetailsModal.getByRole('combobox', { name: /Status/i }).first();
    this.pricingInputs = this.planDetailsModal.locator('input[type="number"]');
    this.checkboxUnlimited = this.planDetailsModal.getByRole('checkbox', { name: 'Unlimited' });
    this.createPlanButton = this.planDetailsModal.getByRole('button', { name: /Create Plan/i });
    this.savePlanButton = this.planDetailsModal.getByRole('button', { name: /Save Plan|Save Changes/i });
    this.cancelButton = this.planDetailsModal.getByRole('button', { name: /Cancel/i });
    this.planRows = page.locator('table tbody tr');
    this.validationErrors = this.planDetailsModal.getByText(/required|invalid|already exists|please/i);
  }

  async navigate() {
    await this.subscriptionPlansNav.click();
    await expect(this.addNewPlanButton).toBeVisible({ timeout: 10000 });
  }

  async openNewPlanModal() {
    await this.addNewPlanButton.click();
    await expect(this.planDetailsModal).toBeVisible({ timeout: 10000 });
    await expect(this.planNameInput).toBeVisible({ timeout: 10000 });
  }

  async fillPlan({ planName, monthlyPrice, quarterlyPrice, halfYearlyPrice, yearlyPrice, useUnlimited = false }) {
    if (planName !== undefined) {
      await this.planNameInput.fill(planName);
    }
    if (monthlyPrice !== undefined) {
      await this.pricingInputs.nth(0).fill(String(monthlyPrice));
    }
    if (quarterlyPrice !== undefined) {
      await this.pricingInputs.nth(1).fill(String(quarterlyPrice));
    }
    if (halfYearlyPrice !== undefined) {
      await this.pricingInputs.nth(2).fill(String(halfYearlyPrice));
    }
    if (yearlyPrice !== undefined) {
      await this.pricingInputs.nth(3).fill(String(yearlyPrice));
    }
    if (useUnlimited) {
      await this.checkboxUnlimited.check();
    }
  }

  async createPlan(plan) {
    await this.navigate();
    await this.openNewPlanModal();
    await this.fillPlan(plan);
    await this.createPlanButton.click();
  }

  async getPlanRow(planName) {
    return this.planRows.filter({ hasText: planName }).first();
  }

  async expectPlanExists(planName) {
    await expect(this.getPlanRow(planName)).toBeVisible({ timeout: 15000 });
  }

  async expectPlanNotExists(planName) {
    await expect(this.planRows.filter({ hasText: planName })).toHaveCount(0, { timeout: 15000 });
  }

  async editPlan(planName, updatedPlanName) {
    await this.navigate();
    const row = this.getPlanRow(planName);
    await expect(row).toBeVisible({ timeout: 10000 });
    await row.locator('button:has-text("✏️")').first().click();
    await expect(this.planNameInput).toBeVisible({ timeout: 10000 });
    if (updatedPlanName !== undefined) {
      await this.planNameInput.fill(updatedPlanName);
    }
    await this.savePlanButton.click();
  }

  async deletePlan(planName) {
    await this.navigate();
    const row = this.getPlanRow(planName);
    await expect(row).toBeVisible({ timeout: 10000 });
    await row.locator('button:has-text("🗑️")').first().click();
    const confirmButton = this.page.getByRole('button', { name: /^(Yes|Confirm|Delete|Proceed)/i }).first();
    if (await confirmButton.count() > 0) {
      await confirmButton.click({ force: true });
    }
    await this.expectPlanNotExists(planName);
  }

  async expectValidationError() {
    await expect(this.validationErrors).toBeVisible({ timeout: 10000 });
  }
}

module.exports = { SubscriptionPlansPage };