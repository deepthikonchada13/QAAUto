const { expect } = require('@playwright/test');
class SuperAdminPage{
    constructor(page)
    {
    this.page=page;
    this.tenantpage=page.locator("span.nav-item-label:has-text('Tenants')");
    this.addtenant=page.locator("span.btn-content:has-text('➕ Add Tenant ▾')");
    this.generatepaymentlink=page.getByText("🔗 Generate Payment Link");
    this.hopitalname=page.locator("[placeholder='Apollo Hospitals']");
    this.hopitalname2=page.locator("[placeholder='apollo']");
    this.phone=page.locator("[placeholder='contact@apollo.com']");
    this.phnum=page.locator("[type='tel']");
    this.adminemail=page.locator("[placeholder='admin@apollo.com']");
    this.category=page.getByText('Select Category');
    this.categoryoption=page.getByRole('option', {name: 'Individual Practice'});
    this.bedsize=page.getByText("Select Bed Size");
    this.bedsizeoptions=page.getByRole('option', {name :'51-100 Beds'});
    this.stream=page.getByText("Select Stream");
    this.streamoption=page.getByRole('option', {name :'Homeopathy'});
    this.selectype=page.getByText("Select Type");
    this.selectoption=page.getByRole('option', {name :'Multi-Specialty'});
    this.combo=page.locator("div[role='combobox']:has-text('Select a plan')");
    this.combooption=page.getByRole('option', {name :'Premium Testing 100 - ₹1000/month'});
    this.generatepaymentbtn=page.locator("span.btn-content:has-text('Generate Payment Link')")
    this.sendbtn=page.locator("button span:has-text('Send')")
    this.searchbox = page.getByPlaceholder('Search by name, subdomain, email, or category...');
    this.tenantSaveButton = page.getByRole('button', { name: /Save|Update|Confirm/ });
    this.subscriptionMonthsInput = page.locator('div[role="dialog"] input[type="number"]');

    }


    async CrerateTentant(hosptialname,hosptialname2,email,phone,adminemail)
    {
        await this.tenantpage.click();
        await this.addtenant.click();
        console.log(await this.page.locator("span.btn-content:has-text('➕ Add Tenant ▾')").textContent());
        await expect(this.page.locator("span.btn-content:has-text('➕ Add Tenant ▾')")).toHaveText('➕ Add Tenant ▾');
        await this.generatepaymentlink.click();
        await this.hopitalname.fill(hosptialname);
        await this.hopitalname2.fill(hosptialname2);
        await this.phone.fill(email);
        await this.phnum.fill(phone);
        await this.adminemail.fill(adminemail);
        // await this.page.pause();
        await this.category.first().click();
        // await this.category.click({ force: true });
        const option = this.page.getByRole("option", {
            name: "Individual Practice"
        });
        await option.click();
        await this.bedsize.click();
        await this.bedsizeoptions.click();
        await  this.stream.click();
        await this.streamoption.click();
        await this.selectype.click();
        await this.selectoption.click();
          await this.combo.hover();
        await this.combo.click({ force: true });
        const option2 = this.page.getByRole("option", {
            name: "Enterprise - ₹8/month"
        });
        await option2.click();
        await this.generatepaymentbtn.click();
        await this.sendbtn.click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });
        
    }

    async createTenantWithoutHospitalName(subdomain, email, phone, adminEmail) {
        await this.tenantpage.click();
        await this.addtenant.click();
        await this.generatepaymentlink.click();
        await this.hopitalname2.fill(subdomain);
        await this.phone.fill(email);
        await this.phnum.fill(phone);
        await this.adminemail.fill(adminEmail);
        await this.category.first().click();
        // await this.category.click({ force: true });
        await this.page.getByRole('option', { name: 'Individual Practice' }).click();
        await this.bedsize.click();
        await this.bedsizeoptions.click();
        await this.stream.click();
        await this.streamoption.click();
        await this.selectype.click();
        await this.selectoption.click();
        await this.combo.hover();
        await this.combo.click({ force: true });
        await this.page.getByRole('option', { name: 'Enterprise - ₹8/month' }).click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => {});
        });
        await this.generatepaymentbtn.click();
    }

    async createTenantWithInvalidEmail(hospitalName, subdomain, phone, adminEmail) {
        await this.tenantpage.click();
        await this.addtenant.click();
        await this.generatepaymentlink.click();
        await this.hopitalname.fill(hospitalName);
        await this.hopitalname2.fill(subdomain);
        await this.phone.fill('invalid-email');
        await this.phnum.fill(phone);
        await this.adminemail.fill(adminEmail);
        await this.category.first().click();
        // await this.category.click({ force: true });
        await this.page.getByRole('option', { name: 'Individual Practice' }).click();
        await this.bedsize.click();
        await this.bedsizeoptions.click();
        await this.stream.click();
        await this.streamoption.click();
        await this.selectype.click();
        await this.selectoption.click();
        await this.combo.hover();
        await this.combo.click({ force: true });
        await this.page.getByRole('option', { name: 'Enterprise - ₹8/month' }).click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => {});
        });
        await this.generatepaymentbtn.click();
    }

    async createTenantWithInvalidPhone(hospitalName, subdomain, email, adminEmail) {
        await this.tenantpage.click();
        await this.addtenant.click();
        await this.generatepaymentlink.click();
        await this.hopitalname.fill(hospitalName);
        await this.hopitalname2.fill(subdomain);
        await this.phone.fill(email);
        await this.phnum.fill('123');
        await this.adminemail.fill(adminEmail);
        await this.category.first().click();
        await this.category.click({ force: true });
        await this.page.getByRole('option', { name: 'Individual Practice' }).click();
        await this.bedsize.click();
        await this.bedsizeoptions.click();
        await this.stream.click();
        await this.streamoption.click();
        await this.selectype.click();
        await this.selectoption.click();
        await this.combo.hover();
        await this.combo.click({ force: true });
        await this.page.getByRole('option', { name: 'Enterprise - ₹8/month' }).click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => {});
        });
        await this.generatepaymentbtn.click();
    }

    async createTenantWithoutPlan(hospitalName, subdomain, email, phone, adminEmail) {
        await this.tenantpage.click();
        await this.addtenant.click();
        await this.generatepaymentlink.click();
        await this.hopitalname.fill(hospitalName);
        await this.hopitalname2.fill(subdomain);
        await this.phone.fill(email);
        await this.phnum.fill(phone);
        await this.adminemail.fill(adminEmail);
        await this.category.first().click();
        // await this.category.click({ force: true });
        await this.page.getByRole('option', { name: 'Individual Practice' }).click();
        await this.bedsize.click();
        await this.bedsizeoptions.click();
        await this.stream.click();
        await this.streamoption.click();
        await this.selectype.click();
        await this.selectoption.click();
        // Skip plan selection
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => {});
        });
        await this.generatepaymentbtn.click();
    }

    async searchTenant(query) {
        await this.tenantpage.click();
        await this.searchbox.click();
        await this.searchbox.fill(query);
        const resultRow = this.page.locator('table tbody tr').filter({ hasText: query }).first();
      
    }

    async clickTenantActions(tenantName) {
        const row = this.page.locator('table tbody tr').filter({ hasText: tenantName }).first();
        await expect(row).toBeVisible({ timeout: 10000 });
        const actionsButton = row.locator('button', { hasText: '⋮' }).first();
        await actionsButton.scrollIntoViewIfNeeded();
        await actionsButton.click({ force: true });
        await this.page.waitForTimeout(500);
    }

    async editTenant(tenantName, updatedName, updatedEmail) {
        await this.searchTenant(tenantName);
        await this.clickTenantActions(tenantName);
        await this.page.getByRole('button', { name: '✏️ Edit Tenant' }).click();
        const nameInput = this.page.locator('div[role="dialog"] input[type="text"]').first();
        const emailInput = this.page.locator('div[role="dialog"] input[type="email"]');
        if (updatedName) await nameInput.fill(updatedName);
        if (updatedEmail !== undefined) await emailInput.fill(updatedEmail);
        await this.tenantSaveButton.click();
    }

    async extendTenantSubscription(tenantName, months) {
        await this.searchTenant(tenantName);
        await this.clickTenantActions(tenantName);
        await this.page.getByRole('button', { name: 'Extend Subscription' }).click();
        await this.subscriptionMonthsInput.fill(String(months));
        await this.tenantSaveButton.click();
    }
}
module.exports={SuperAdminPage};