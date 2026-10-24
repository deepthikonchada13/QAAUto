const fs = require('fs');

// ── spec file ──────────────────────────────────────────────────────────────
const specFile = 'tests/patientRole.spec.js';
let spec = fs.readFileSync(specFile, 'utf8');

const specAnchor = `filterHistoryAppointments();\n  });\n\n  // ${'═'.repeat(70)}\n  // 15.`;

const specInsert = `filterHistoryAppointments();
  });

  // Missing mandatory fields - all filter inputs empty
  test('HistoryAppointments | Negative: searching with empty input shows all history appointments gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterHistoryAppointmentsEmptySearch();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Invalid data - non-matching search term
  test('HistoryAppointments | Negative: searching with invalid term shows no history appointments gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterHistoryAppointmentsInvalidSearch();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Empty values - reset filters without applying any
  test('HistoryAppointments | Negative: resetting filters without applying any shows full history list gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterHistoryAppointmentsClearOnly();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Maximum values - 255-character search input
  test('HistoryAppointments | Boundary: 255-character search input does not crash the history appointments page', async () => {
    await new POManagers(sharedPage).PatientPage().filterHistoryAppointmentsMaxInput();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Minimum values - single character search input
  test('HistoryAppointments | Boundary: single character search input returns results or no-results gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterHistoryAppointmentsMinInput();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Duplicate actions - same search performed twice consecutively
  test('HistoryAppointments | Negative: performing the same search twice consecutively returns consistent results', async () => {
    await new POManagers(sharedPage).PatientPage().filterHistoryAppointmentsDuplicate();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Network failure - API aborted before page loads
  test('HistoryAppointments | Error: network failure before History Appointments page loads shows error or empty state gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterHistoryAppointmentsNetworkFailure();
    await expect(sharedPage.getByText(/error|failed|no appointments|try again/i).or(sharedPage.getByRole('textbox', { name: 'Search by doctor, reason, or' }))).toBeVisible();
  });

  // API failure - API aborted after search input
  test('HistoryAppointments | Error: API failure during history appointments search shows error or empty state gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterHistoryAppointmentsApiFailure();
    await expect(sharedPage.getByText(/error|failed|try again/i).or(sharedPage.getByRole('textbox', { name: 'Search by doctor, reason, or' }))).toBeVisible();
  });

  // Unauthorized access - cookies cleared before navigating
  test('HistoryAppointments | Security: unauthenticated user cannot access History Appointments page', async () => {
    await sharedPage.context().clearCookies();
    await sharedPage.goto('https://myappointments.whitecoats.com/');
    await expect(sharedPage).not.toHaveURL(/history/i);
  });

  // Session expiration - cookies cleared mid-session
  test('HistoryAppointments | Security: session expiration while viewing history appointments redirects user away', async () => {
    await new POManagers(sharedPage).PatientPage().filterHistoryAppointmentsSessionExpiry();
    await expect(sharedPage).not.toHaveURL(/history/i);
  });

  // Browser refresh - page reloaded mid-filter
  test('HistoryAppointments | Error: browser refresh during history appointments filter resets the state gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterHistoryAppointmentsAndRefresh();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Back button - navigating back mid-filter
  test('HistoryAppointments | Error: back button during history appointments filter navigates away gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterHistoryAppointmentsAndNavigateBack();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Concurrent actions - search and status filter triggered simultaneously
  test('HistoryAppointments | Error: concurrent search and status filter does not crash the history appointments page', async () => {
    await new POManagers(sharedPage).PatientPage().filterHistoryAppointmentsConcurrent();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // ${'═'.repeat(70)}
  // 15.`;

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
    async filterHistoryAppointmentsEmptySearch() {
        await this.historybtn.click();
        await this.showFiltersbtn.click();
        await this.historySearchInput.fill('');
    }

    async filterHistoryAppointmentsInvalidSearch() {
        await this.historybtn.click();
        await this.showFiltersbtn.click();
        await this.historySearchInput.fill('zzzzinvalid9999');
    }

    async filterHistoryAppointmentsClearOnly() {
        await this.historybtn.click();
        await this.showFiltersbtn.click();
        await this.resetFiltersbtn.click();
    }

    async filterHistoryAppointmentsMaxInput() {
        await this.historybtn.click();
        await this.showFiltersbtn.click();
        await this.historySearchInput.fill('b'.repeat(255));
    }

    async filterHistoryAppointmentsMinInput() {
        await this.historybtn.click();
        await this.showFiltersbtn.click();
        await this.historySearchInput.fill('b');
    }

    async filterHistoryAppointmentsDuplicate() {
        await this.historybtn.click();
        await this.showFiltersbtn.click();
        await this.historySearchInput.fill('bhaskar');
        await this.clearSearchbtn.click();
        await this.historySearchInput.fill('bhaskar');
        await this.clearSearchbtn.click();
    }

    async filterHistoryAppointmentsNetworkFailure() {
        await this.page.route('**/api/**', route => route.abort());
        await this.historybtn.click();
        await this.showFiltersbtn.click();
        await this.historySearchInput.fill('bhaskar');
    }

    async filterHistoryAppointmentsApiFailure() {
        await this.historybtn.click();
        await this.showFiltersbtn.click();
        await this.page.route('**/api/**', route => route.abort());
        await this.historySearchInput.fill('bhaskar');
    }

    async filterHistoryAppointmentsSessionExpiry() {
        await this.historybtn.click();
        await this.showFiltersbtn.click();
        await this.page.context().clearCookies();
        await this.page.goto('https://myappointments.whitecoats.com/');
    }

    async filterHistoryAppointmentsAndRefresh() {
        await this.historybtn.click();
        await this.showFiltersbtn.click();
        await this.historySearchInput.fill('bhaskar');
        await this.page.reload();
    }

    async filterHistoryAppointmentsAndNavigateBack() {
        await this.historybtn.click();
        await this.showFiltersbtn.click();
        await this.historySearchInput.fill('bhaskar');
        await this.page.goBack();
    }

    async filterHistoryAppointmentsConcurrent() {
        await this.historybtn.click();
        await this.showFiltersbtn.click();
        await Promise.all([
            this.historySearchInput.fill('bhaskar'),
            this.allStatusDropdown.click(),
        ]);
    }

`;

pom = pom.slice(0, pomIdx) + pomMethods + pom.slice(pomIdx);
fs.writeFileSync(pomFile, pom, 'utf8');
console.log('pom done, length:', fs.readFileSync(pomFile, 'utf8').length);
console.log('has filterHistoryAppointmentsEmptySearch:', fs.readFileSync(pomFile,'utf8').includes('filterHistoryAppointmentsEmptySearch'));
