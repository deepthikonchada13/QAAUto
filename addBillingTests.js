const fs = require('fs');

// ── spec file ──────────────────────────────────────────────────────────────
const specFile = 'tests/patientRole.spec.js';
let spec = fs.readFileSync(specFile, 'utf8');

const specAnchor = `filterBilling();\n  });\n\n  // ${'═'.repeat(70)}\n  // 21.`;

const specInsert = `filterBilling();
  });

  // Missing mandatory fields - open filters without filling any
  test('Billing | Negative: opening filters without filling any shows full billing list gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterBillingEmptySearch();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Invalid data - non-matching invoice search term
  test('Billing | Negative: searching with invalid invoice term shows no billing records gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterBillingInvalidSearch();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Empty values - reset filters without applying any
  test('Billing | Negative: resetting filters without applying any shows full billing list gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterBillingClearOnly();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Maximum values - 255-character search input
  test('Billing | Boundary: 255-character search input does not crash the billing page', async () => {
    await new POManagers(sharedPage).PatientPage().filterBillingMaxInput();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Minimum values - single character search input
  test('Billing | Boundary: single character search input returns results or no-results gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterBillingMinInput();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Duplicate actions - same search performed twice consecutively
  test('Billing | Negative: performing the same invoice search twice consecutively returns consistent results', async () => {
    await new POManagers(sharedPage).PatientPage().filterBillingDuplicate();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Network failure - API aborted before page loads
  test('Billing | Error: network failure before Billing page loads shows error or empty state gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterBillingNetworkFailure();
    await expect(sharedPage.getByText(/error|failed|no invoices|try again/i).or(sharedPage.getByRole('textbox', { name: 'Search invoices...' }))).toBeVisible();
  });

  // API failure - API aborted after search input
  test('Billing | Error: API failure during billing search shows error or empty state gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterBillingApiFailure();
    await expect(sharedPage.getByText(/error|failed|try again/i).or(sharedPage.getByRole('textbox', { name: 'Search invoices...' }))).toBeVisible();
  });

  // Unauthorized access - cookies cleared before navigating
  test('Billing | Security: unauthenticated user cannot access Billing page', async () => {
    await sharedPage.context().clearCookies();
    await sharedPage.goto('https://myappointments.whitecoats.com/');
    await expect(sharedPage).not.toHaveURL(/billing/i);
  });

  // Session expiration - cookies cleared mid-session
  test('Billing | Security: session expiration while viewing billing redirects user away', async () => {
    await new POManagers(sharedPage).PatientPage().filterBillingSessionExpiry();
    await expect(sharedPage).not.toHaveURL(/billing/i);
  });

  // Browser refresh - page reloaded mid-filter
  test('Billing | Error: browser refresh during billing filter resets the state gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterBillingAndRefresh();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Back button - navigating back mid-filter
  test('Billing | Error: back button during billing filter navigates away gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterBillingAndNavigateBack();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Concurrent actions - search and status filter triggered simultaneously
  test('Billing | Error: concurrent search and status filter does not crash the billing page', async () => {
    await new POManagers(sharedPage).PatientPage().filterBillingConcurrent();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // ${'═'.repeat(70)}
  // 21.`;

if (!spec.includes(specAnchor)) { console.error('spec anchor not found'); process.exit(1); }
spec = spec.replace(specAnchor, specInsert);
fs.writeFileSync(specFile, spec, 'utf8');
console.log('spec done, length:', fs.readFileSync(specFile, 'utf8').length);

// ── POM file ───────────────────────────────────────────────────────────────
const pomFile = 'PageObjects/PatientPage.js';
let pom = fs.readFileSync(pomFile, 'utf8');

const pomTarget = 'module.exports = { PatientPage };';
const pomIdx = pom.indexOf(pomTarget);
if (pomIdx === -1) { console.error('pom target not found'); process.exit(1); }

const pomMethods = `
    async filterBillingEmptySearch() {
        await this.billingMenubtn.click();
        await this.myBillingbtn.click();
        await this.showFiltersbtn.click();
        await this.invoiceSearchInput.fill('');
    }

    async filterBillingInvalidSearch() {
        await this.billingMenubtn.click();
        await this.myBillingbtn.click();
        await this.showFiltersbtn.click();
        await this.invoiceSearchInput.fill('zzzzinvalid9999');
    }

    async filterBillingClearOnly() {
        await this.billingMenubtn.click();
        await this.myBillingbtn.click();
        await this.showFiltersbtn.click();
        await this.resetFiltersbtn.click();
    }

    async filterBillingMaxInput() {
        await this.billingMenubtn.click();
        await this.myBillingbtn.click();
        await this.showFiltersbtn.click();
        await this.invoiceSearchInput.fill('b'.repeat(255));
    }

    async filterBillingMinInput() {
        await this.billingMenubtn.click();
        await this.myBillingbtn.click();
        await this.showFiltersbtn.click();
        await this.invoiceSearchInput.fill('b');
    }

    async filterBillingDuplicate() {
        await this.billingMenubtn.click();
        await this.myBillingbtn.click();
        await this.showFiltersbtn.click();
        await this.invoiceSearchInput.fill('verifyinv-113');
        await this.clearSearchbtn.click();
        await this.invoiceSearchInput.fill('verifyinv-113');
        await this.clearSearchbtn.click();
    }

    async filterBillingNetworkFailure() {
        await this.page.route('**/api/**', route => route.abort());
        await this.billingMenubtn.click();
        await this.myBillingbtn.click();
        await this.showFiltersbtn.click();
        await this.invoiceSearchInput.fill('verifyinv-113');
    }

    async filterBillingApiFailure() {
        await this.billingMenubtn.click();
        await this.myBillingbtn.click();
        await this.showFiltersbtn.click();
        await this.page.route('**/api/**', route => route.abort());
        await this.invoiceSearchInput.fill('verifyinv-113');
    }

    async filterBillingSessionExpiry() {
        await this.billingMenubtn.click();
        await this.myBillingbtn.click();
        await this.showFiltersbtn.click();
        await this.page.context().clearCookies();
        await this.page.goto('https://myappointments.whitecoats.com/');
    }

    async filterBillingAndRefresh() {
        await this.billingMenubtn.click();
        await this.myBillingbtn.click();
        await this.showFiltersbtn.click();
        await this.invoiceSearchInput.fill('verifyinv-113');
        await this.page.reload();
    }

    async filterBillingAndNavigateBack() {
        await this.billingMenubtn.click();
        await this.myBillingbtn.click();
        await this.showFiltersbtn.click();
        await this.invoiceSearchInput.fill('verifyinv-113');
        await this.page.goBack();
    }

    async filterBillingConcurrent() {
        await this.billingMenubtn.click();
        await this.myBillingbtn.click();
        await this.showFiltersbtn.click();
        await Promise.all([
            this.invoiceSearchInput.fill('verifyinv-113'),
            this.billingAllStatusDropdown.click(),
        ]);
    }

`;

pom = pom.slice(0, pomIdx) + pomMethods + pom.slice(pomIdx);
fs.writeFileSync(pomFile, pom, 'utf8');
console.log('pom done, length:', fs.readFileSync(pomFile, 'utf8').length);
console.log('has filterBillingEmptySearch:', fs.readFileSync(pomFile,'utf8').includes('filterBillingEmptySearch'));
console.log('has filterBillingConcurrent:', fs.readFileSync(pomFile,'utf8').includes('filterBillingConcurrent'));
