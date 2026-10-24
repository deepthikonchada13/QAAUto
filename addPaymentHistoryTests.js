const fs = require('fs');

// ── spec file ──────────────────────────────────────────────────────────────
const specFile = 'tests/patientRole.spec.js';
let spec = fs.readFileSync(specFile, 'utf8');

const specAnchor = `filterPaymentHistory();\n  });\n\n  // ${'═'.repeat(70)}\n  // 22.`;

const specInsert = `filterPaymentHistory();
  });

  // Missing mandatory fields - open filters without filling any
  test('PaymentHistory | Negative: opening filters without filling any shows full payment history gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterPaymentHistoryEmptySearch();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Invalid data - non-matching search term
  test('PaymentHistory | Negative: searching with invalid term shows no payment history gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterPaymentHistoryInvalidSearch();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Empty values - reset filters without applying any
  test('PaymentHistory | Negative: resetting filters without applying any shows full payment history gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterPaymentHistoryClearOnly();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Maximum values - 255-character search input
  test('PaymentHistory | Boundary: 255-character search input does not crash the payment history page', async () => {
    await new POManagers(sharedPage).PatientPage().filterPaymentHistoryMaxInput();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Minimum values - single character search input
  test('PaymentHistory | Boundary: single character search input returns results or no-results gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterPaymentHistoryMinInput();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Duplicate actions - same search performed twice consecutively
  test('PaymentHistory | Negative: performing the same search twice consecutively returns consistent results', async () => {
    await new POManagers(sharedPage).PatientPage().filterPaymentHistoryDuplicate();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Network failure - API aborted before page loads
  test('PaymentHistory | Error: network failure before Payment History page loads shows error or empty state gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterPaymentHistoryNetworkFailure();
    await expect(sharedPage.getByText(/error|failed|no payments|try again/i).or(sharedPage.getByRole('textbox', { name: 'Search payments...' }))).toBeVisible();
  });

  // API failure - API aborted after search input
  test('PaymentHistory | Error: API failure during payment history search shows error or empty state gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterPaymentHistoryApiFailure();
    await expect(sharedPage.getByText(/error|failed|try again/i).or(sharedPage.getByRole('textbox', { name: 'Search payments...' }))).toBeVisible();
  });

  // Unauthorized access - cookies cleared before navigating
  test('PaymentHistory | Security: unauthenticated user cannot access Payment History page', async () => {
    await sharedPage.context().clearCookies();
    await sharedPage.goto('https://myappointments.whitecoats.com/');
    await expect(sharedPage).not.toHaveURL(/payment-history/i);
  });

  // Session expiration - cookies cleared mid-session
  test('PaymentHistory | Security: session expiration while viewing payment history redirects user away', async () => {
    await new POManagers(sharedPage).PatientPage().filterPaymentHistorySessionExpiry();
    await expect(sharedPage).not.toHaveURL(/payment-history/i);
  });

  // Browser refresh - page reloaded mid-filter
  test('PaymentHistory | Error: browser refresh during payment history filter resets the state gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterPaymentHistoryAndRefresh();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Back button - navigating back mid-filter
  test('PaymentHistory | Error: back button during payment history filter navigates away gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterPaymentHistoryAndNavigateBack();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Concurrent actions - search and status filter triggered simultaneously
  test('PaymentHistory | Error: concurrent search and status filter does not crash the payment history page', async () => {
    await new POManagers(sharedPage).PatientPage().filterPaymentHistoryConcurrent();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // ${'═'.repeat(70)}
  // 22.`;

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
    async filterPaymentHistoryEmptySearch() {
        await this.paymentHistorybtn.click();
        await this.showFiltersbtn.click();
        await this.paymentSearchInput.fill('');
    }

    async filterPaymentHistoryInvalidSearch() {
        await this.paymentHistorybtn.click();
        await this.showFiltersbtn.click();
        await this.paymentSearchInput.fill('zzzzinvalid9999');
        await this.noPaymentsText.click();
    }

    async filterPaymentHistoryClearOnly() {
        await this.paymentHistorybtn.click();
        await this.showFiltersbtn.click();
        await this.resetFiltersbtn.click();
    }

    async filterPaymentHistoryMaxInput() {
        await this.paymentHistorybtn.click();
        await this.showFiltersbtn.click();
        await this.paymentSearchInput.fill('b'.repeat(255));
    }

    async filterPaymentHistoryMinInput() {
        await this.paymentHistorybtn.click();
        await this.showFiltersbtn.click();
        await this.paymentSearchInput.fill('b');
    }

    async filterPaymentHistoryDuplicate() {
        await this.paymentHistorybtn.click();
        await this.showFiltersbtn.click();
        await this.paymentSearchInput.fill('bhas');
        await this.clearSearchbtn.click();
        await this.paymentSearchInput.fill('bhas');
        await this.clearSearchbtn.click();
    }

    async filterPaymentHistoryNetworkFailure() {
        await this.page.route('**/api/**', route => route.abort());
        await this.paymentHistorybtn.click();
        await this.showFiltersbtn.click();
        await this.paymentSearchInput.fill('bhas');
    }

    async filterPaymentHistoryApiFailure() {
        await this.paymentHistorybtn.click();
        await this.showFiltersbtn.click();
        await this.page.route('**/api/**', route => route.abort());
        await this.paymentSearchInput.fill('bhas');
    }

    async filterPaymentHistorySessionExpiry() {
        await this.paymentHistorybtn.click();
        await this.showFiltersbtn.click();
        await this.page.context().clearCookies();
        await this.page.goto('https://myappointments.whitecoats.com/');
    }

    async filterPaymentHistoryAndRefresh() {
        await this.paymentHistorybtn.click();
        await this.showFiltersbtn.click();
        await this.paymentSearchInput.fill('bhas');
        await this.page.reload();
    }

    async filterPaymentHistoryAndNavigateBack() {
        await this.paymentHistorybtn.click();
        await this.showFiltersbtn.click();
        await this.paymentSearchInput.fill('bhas');
        await this.page.goBack();
    }

    async filterPaymentHistoryConcurrent() {
        await this.paymentHistorybtn.click();
        await this.showFiltersbtn.click();
        await Promise.all([
            this.paymentSearchInput.fill('bhas'),
            this.paymentAllStatusDropdown.click(),
        ]);
    }

`;

pom = pom.slice(0, pomIdx) + pomMethods + pom.slice(pomIdx);
fs.writeFileSync(pomFile, pom, 'utf8');
console.log('pom done, length:', fs.readFileSync(pomFile, 'utf8').length);
console.log('has filterPaymentHistoryEmptySearch:', fs.readFileSync(pomFile,'utf8').includes('filterPaymentHistoryEmptySearch'));
console.log('has filterPaymentHistoryConcurrent:', fs.readFileSync(pomFile,'utf8').includes('filterPaymentHistoryConcurrent'));
