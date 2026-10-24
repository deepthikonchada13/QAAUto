const { expect } = require('@playwright/test');

class SubscriptionPlanPage {
  constructor(page) {
    this.page = page;
    this.subscriptionplan = page.getByRole('navigation').getByRole('button', { name: '💎 Subscription Plans' });
    this.addnewplan = page.getByRole('button', { name: '➕ Add New Plan' });
    this.planDetailsModal = page.locator('div', { hasText: '📦 Plan Details' }).first();
    this.planNameInput = this.planDetailsModal.getByRole('textbox', { name: /Plan Name/i }).first();
    this.formTextboxes = this.planDetailsModal.locator('input[type="text"], input[type="number"]');
    this.unlimited = this.planDetailsModal.getByRole('checkbox', { name: 'Unlimited' });
    this.createPlanButton = this.planDetailsModal.getByRole('button', { name: /Create Plan/i });
    this.saveChangesButton = this.planDetailsModal.getByRole('button', { name: /Save Plan|Save Changes/i });
    this.planRows = page.locator('table tbody tr');
    this.validationErrors = page.locator(/plan name.*required|required|field is required|invalid|already exists/i);
  }

  async navigateToSubscriptionPlans() {
    await this.subscriptionplan.click();
    await expect(this.addnewplan).toBeVisible({ timeout: 10000 });
  }

  async openAddNewPlan() {
    await this.addnewplan.click();
    await expect(this.planNameInput).toBeVisible({ timeout: 10000 });
    await expect(this.createPlanButton).toBeVisible({ timeout: 10000 });
  }

  async fillPlanFields({ planName, field1, field2, field3, field4, field5, field6, monthlyPrice, quarterlyPrice, halfYearlyPrice, yearlyPrice, useUnlimited = false }) {
    const resolvedMonthlyPrice = monthlyPrice ?? field1;
    const resolvedQuarterlyPrice = quarterlyPrice ?? field2;
    const resolvedHalfYearlyPrice = halfYearlyPrice ?? field3;
    const resolvedYearlyPrice = yearlyPrice ?? field4;

    if (planName !== undefined) {
      await this.planNameInput.click();
      await this.planNameInput.fill(planName);
    }

    if (resolvedMonthlyPrice !== undefined) {
      await this.formTextboxes.nth(2).click();
      await this.formTextboxes.nth(2).fill(String(resolvedMonthlyPrice));
    }
    if (resolvedQuarterlyPrice !== undefined) {
      await this.formTextboxes.nth(3).click();
      await this.formTextboxes.nth(3).fill(String(resolvedQuarterlyPrice));
    }
    if (resolvedHalfYearlyPrice !== undefined) {
      await this.formTextboxes.nth(4).click();
      await this.formTextboxes.nth(4).fill(String(resolvedHalfYearlyPrice));
    }
    if (resolvedYearlyPrice !== undefined) {
      await this.formTextboxes.nth(5).click();
      await this.formTextboxes.nth(5).fill(String(resolvedYearlyPrice));
    }

    if (useUnlimited) {
      await this.unlimited.check();
    }
  }

  async createSubscriptionPlan(options) {
    await this.navigateToSubscriptionPlans();
    await this.openAddNewPlan();
    await this.fillPlanFields(options);
    await this.createPlanButton.click();
  }

  async expectPlanCreated(planName) {
    const row = this.planRows.filter({ hasText: planName }).first();
    await expect(row).toBeVisible({ timeout: 15000 });
  }

  async expectPlanNotCreated(planName) {
    const row = this.planRows.filter({ hasText: planName });
    await expect(row).toHaveCount(0, { timeout: 10000 });
  }

  async expectCreatePlanModalVisible() {
    await expect(this.createPlanButton).toBeVisible({ timeout: 10000 });
  }

  async expectInvalidInput() {
    await expect(this.validationErrors).toBeVisible({ timeout: 10000 });
  }

  getPlanRow(planName) {
    return this.planRows.filter({ hasText: planName }).first();
  }

  async getRowActionButton(planName, iconText) {
    const row = this.getPlanRow(planName);
    await expect(row).toBeVisible({ timeout: 10000 });
    return row.locator('button, [role="button"], a, span').filter({ hasText: iconText }).first();
  }

  async editSubscriptionPlan(planName, updatedPlanName) {
    await this.navigateToSubscriptionPlans();
    const editButton = await this.getRowActionButton(planName, '✏️');
    await editButton.click();
    await expect(this.planNameInput).toBeVisible({ timeout: 10000 });
    if (updatedPlanName !== undefined) {
      await this.planNameInput.fill(updatedPlanName);
    }
    await this.saveChangesButton.click();
    const updatedRow = this.getPlanRow(updatedPlanName || planName);
    await expect(updatedRow).toBeVisible({ timeout: 15000 });
  }

  async deleteSubscriptionPlan(planName) {
    await this.navigateToSubscriptionPlans();
    const deleteButton = await this.getRowActionButton(planName, '🗑️');
    await deleteButton.scrollIntoViewIfNeeded();
    await deleteButton.click({ force: true });

    const confirmButton = this.page.getByRole('button', { name: /^(Yes|Confirm|Delete|Proceed)/i }).first();
    if (await confirmButton.count() > 0) {
      await confirmButton.click({ force: true });
    }

    const row = this.planRows.filter({ hasText: planName });
    await expect(row).toHaveCount(0, { timeout: 15000 });
  }
}

module.exports = { SubscriptionPlanPage };