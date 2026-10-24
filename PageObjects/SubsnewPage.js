const { expect } = require('@playwright/test');

class SubsnewPage {

    constructor(page) {

        this.page = page;

        // Navigation
        this.subscriptionPlans = page.getByRole('span', { name: '💎 Subscription Plans' });

        this.addNewPlan = page.getByRole('button', {
            name: '➕ Add New Plan'
        });

        // Form
        this.planName = page.getByRole('textbox', {
            name: 'e.g., Premium'
        });

        this.textboxes = page.getByRole('textbox');

        this.unlimitedCheckbox = page.getByRole('checkbox', {
            name: 'Unlimited'
        });

        this.createPlanBtn = page.getByRole('button', {
            name: /Create Plan|Save Plan/i
        });

        // Table
        this.planRows = page.locator("table tbody tr");

        // Toast / Messages
        this.toast = page.locator(".Toastify__toast-body");

        // Validation Messages
        this.validationError = page.locator(".text-danger,.error,.invalid-feedback");
    }

    //-------------------------------------
    // Navigation
    //-------------------------------------

    async openSubscriptionPlans() {

        await this.subscriptionPlans.click();

        await expect(this.addNewPlan).toBeVisible();

    }

    async clickAddNewPlan() {

        await this.addNewPlan.click();

        await expect(this.planName).toBeVisible();

    }

    //-------------------------------------
    // Form Filling
    //-------------------------------------

    async enterPlanName(name) {

        await this.planName.fill(name);

    }

    async enterMonthlyPrice(value) {

        await this.textboxes.nth(2).fill(value);

    }

    async enterQuarterlyPrice(value) {

        await this.textboxes.nth(3).fill(value);

    }

    async enterHalfYearlyPrice(value) {

        await this.textboxes.nth(4).fill(value);

    }

    async enterYearlyPrice(value) {

        await this.textboxes.nth(5).fill(value);

    }

    async checkUnlimited() {

        await this.unlimitedCheckbox.check();

    }

    async clickCreatePlan() {

        await this.createPlanBtn.click();

    }

    //-------------------------------------
    // Complete Flow
    //-------------------------------------

    async createPlan(data) {

        await this.openSubscriptionPlans();

        await this.clickAddNewPlan();

        if (data.planName !== undefined)
            await this.enterPlanName(data.planName);

        if (data.monthlyPrice !== undefined)
            await this.enterMonthlyPrice(data.monthlyPrice);

        if (data.quarterlyPrice !== undefined)
            await this.enterQuarterlyPrice(data.quarterlyPrice);

        if (data.halfYearlyPrice !== undefined)
            await this.enterHalfYearlyPrice(data.halfYearlyPrice);

        if (data.yearlyPrice !== undefined)
            await this.enterYearlyPrice(data.yearlyPrice);

        if (data.useUnlimited)
            await this.checkUnlimited();

        await this.clickCreatePlan();

    }

    //-------------------------------------
    // Assertions
    //-------------------------------------

    async verifyPlanCreated(planName) {

        await expect(
            this.planRows.filter({ hasText: planName })
        ).toBeVisible();

    }

    async verifyPlanDeleted(planName) {

        await expect(
            this.planRows.filter({ hasText: planName })
        ).toHaveCount(0);

    }

    async verifyPlanNameRequired() {

        await expect(
            this.page.getByText(/plan name.*required|required/i)
        ).toBeVisible();

    }

    async verifyDuplicatePlanError() {

        await expect(
            this.page.getByText(/already exists/i)
        ).toBeVisible();

    }

    async verifySuccessMessage() {

        await expect(this.toast).toContainText(/success/i);

    }

}

module.exports = { SubsnewPage };