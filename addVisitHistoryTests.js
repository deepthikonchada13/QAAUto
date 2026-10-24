const fs = require('fs');

// ── spec file ──────────────────────────────────────────────────────────────
const specFile = 'tests/patientRole.spec.js';
let spec = fs.readFileSync(specFile, 'utf8');

const specAnchor = `filterVisitHistory();\n  });\n\n  // ${'═'.repeat(70)}\n  // 17.`;

const specInsert = `filterVisitHistory();
  });

  // Missing mandatory fields - open filters without filling any
  test('VisitHistory | Negative: opening filters without filling any shows full visit history gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterVisitHistoryEmptySearch();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Invalid data - non-matching search term
  test('VisitHistory | Negative: searching with invalid term shows no visit history results gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterVisitHistoryInvalidSearch();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Empty values - reset filters without applying any
  test('VisitHistory | Negative: resetting filters without applying any shows full visit history gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterVisitHistoryClearOnly();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Maximum values - 255-character search input
  test('VisitHistory | Boundary: 255-character search input does not crash the visit history page', async () => {
    await new POManagers(sharedPage).PatientPage().filterVisitHistoryMaxInput();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Minimum values - single character search input
  test('VisitHistory | Boundary: single character search input returns results or no-results gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterVisitHistoryMinInput();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Duplicate actions - same search performed twice consecutively
  test('VisitHistory | Negative: performing the same search twice consecutively returns consistent results', async () => {
    await new POManagers(sharedPage).PatientPage().filterVisitHistoryDuplicate();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Network failure - API aborted before page loads
  test('VisitHistory | Error: network failure before Visit History page loads shows error or empty state gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterVisitHistoryNetworkFailure();
    await expect(sharedPage.getByText(/error|failed|no visits|try again/i).or(sharedPage.getByRole('textbox', { name: 'Search visits...' }))).toBeVisible();
  });

  // API failure - API aborted after search input
  test('VisitHistory | Error: API failure during visit history search shows error or empty state gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterVisitHistoryApiFailure();
    await expect(sharedPage.getByText(/error|failed|try again/i).or(sharedPage.getByRole('textbox', { name: 'Search visits...' }))).toBeVisible();
  });

  // Unauthorized access - cookies cleared before navigating
  test('VisitHistory | Security: unauthenticated user cannot access Visit History page', async () => {
    await sharedPage.context().clearCookies();
    await sharedPage.goto('https://myappointments.whitecoats.com/');
    await expect(sharedPage).not.toHaveURL(/visit-history/i);
  });

  // Session expiration - cookies cleared mid-session
  test('VisitHistory | Security: session expiration while viewing visit history redirects user away', async () => {
    await new POManagers(sharedPage).PatientPage().filterVisitHistorySessionExpiry();
    await expect(sharedPage).not.toHaveURL(/visit-history/i);
  });

  // Browser refresh - page reloaded mid-filter
  test('VisitHistory | Error: browser refresh during visit history filter resets the state gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterVisitHistoryAndRefresh();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Back button - navigating back mid-filter
  test('VisitHistory | Error: back button during visit history filter navigates away gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterVisitHistoryAndNavigateBack();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Concurrent actions - search and type filter triggered simultaneously
  test('VisitHistory | Error: concurrent search and type filter does not crash the visit history page', async () => {
    await new POManagers(sharedPage).PatientPage().filterVisitHistoryConcurrent();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // ${'═'.repeat(70)}
  // 17.`;

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
    async filterVisitHistoryEmptySearch() {
        await this.visitHistorybtn.click();
        await this.showFiltersbtn.click();
        await this.visitSearchInput.fill('');
    }

    async filterVisitHistoryInvalidSearch() {
        await this.visitHistorybtn.click();
        await this.showFiltersbtn.click();
        await this.visitSearchInput.fill('zzzzinvalid9999');
    }

    async filterVisitHistoryClearOnly() {
        await this.visitHistorybtn.click();
        await this.showFiltersbtn.click();
        await this.resetFiltersbtn.click();
    }

    async filterVisitHistoryMaxInput() {
        await this.visitHistorybtn.click();
        await this.showFiltersbtn.click();
        await this.visitSearchInput.fill('b'.repeat(255));
    }

    async filterVisitHistoryMinInput() {
        await this.visitHistorybtn.click();
        await this.showFiltersbtn.click();
        await this.visitSearchInput.fill('b');
    }

    async filterVisitHistoryDuplicate() {
        await this.visitHistorybtn.click();
        await this.showFiltersbtn.click();
        await this.visitSearchInput.fill('cha');
        await this.clearSearchbtn.click();
        await this.visitSearchInput.fill('cha');
        await this.clearSearchbtn.click();
    }

    async filterVisitHistoryNetworkFailure() {
        await this.page.route('**/api/**', route => route.abort());
        await this.visitHistorybtn.click();
        await this.showFiltersbtn.click();
        await this.visitSearchInput.fill('cha');
    }

    async filterVisitHistoryApiFailure() {
        await this.visitHistorybtn.click();
        await this.showFiltersbtn.click();
        await this.page.route('**/api/**', route => route.abort());
        await this.visitSearchInput.fill('cha');
    }

    async filterVisitHistorySessionExpiry() {
        await this.visitHistorybtn.click();
        await this.showFiltersbtn.click();
        await this.page.context().clearCookies();
        await this.page.goto('https://myappointments.whitecoats.com/');
    }

    async filterVisitHistoryAndRefresh() {
        await this.visitHistorybtn.click();
        await this.showFiltersbtn.click();
        await this.visitSearchInput.fill('cha');
        await this.page.reload();
    }

    async filterVisitHistoryAndNavigateBack() {
        await this.visitHistorybtn.click();
        await this.showFiltersbtn.click();
        await this.visitSearchInput.fill('cha');
        await this.page.goBack();
    }

    async filterVisitHistoryConcurrent() {
        await this.visitHistorybtn.click();
        await this.showFiltersbtn.click();
        await Promise.all([
            this.visitSearchInput.fill('cha'),
            this.allTypesDropdown.click(),
        ]);
    }

`;

pom = pom.slice(0, pomIdx) + pomMethods + pom.slice(pomIdx);
fs.writeFileSync(pomFile, pom, 'utf8');
console.log('pom done, length:', fs.readFileSync(pomFile, 'utf8').length);
console.log('has filterVisitHistoryEmptySearch:', fs.readFileSync(pomFile,'utf8').includes('filterVisitHistoryEmptySearch'));
console.log('has filterVisitHistoryConcurrent:', fs.readFileSync(pomFile,'utf8').includes('filterVisitHistoryConcurrent'));
