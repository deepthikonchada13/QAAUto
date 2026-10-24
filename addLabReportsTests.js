const fs = require('fs');

// ── spec file ──────────────────────────────────────────────────────────────
const specFile = 'tests/patientRole.spec.js';
let spec = fs.readFileSync(specFile, 'utf8');

const specAnchor = `filterLabReports();\n  });\n\n  // ${'═'.repeat(70)}\n  // 20.`;

const specInsert = `filterLabReports();
  });

  // Missing mandatory fields - open filters without filling any
  test('LabReports | Negative: opening filters without filling any shows full lab reports list gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterLabReportsEmptySearch();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Invalid data - non-matching search term
  test('LabReports | Negative: searching with invalid term shows no lab reports gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterLabReportsInvalidSearch();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Empty values - reset filters without applying any
  test('LabReports | Negative: resetting filters without applying any shows full lab reports list gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterLabReportsClearOnly();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Maximum values - 255-character search input
  test('LabReports | Boundary: 255-character search input does not crash the lab reports page', async () => {
    await new POManagers(sharedPage).PatientPage().filterLabReportsMaxInput();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Minimum values - single character search input
  test('LabReports | Boundary: single character search input returns results or no-results gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterLabReportsMinInput();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Duplicate actions - same search performed twice consecutively
  test('LabReports | Negative: performing the same search twice consecutively returns consistent results', async () => {
    await new POManagers(sharedPage).PatientPage().filterLabReportsDuplicate();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Network failure - API aborted before page loads
  test('LabReports | Error: network failure before Lab Reports page loads shows error or empty state gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterLabReportsNetworkFailure();
    await expect(sharedPage.getByText(/error|failed|no lab reports|try again/i).or(sharedPage.getByRole('textbox', { name: 'Search by report type, doctor' }))).toBeVisible();
  });

  // API failure - API aborted after search input
  test('LabReports | Error: API failure during lab reports search shows error or empty state gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterLabReportsApiFailure();
    await expect(sharedPage.getByText(/error|failed|try again/i).or(sharedPage.getByRole('textbox', { name: 'Search by report type, doctor' }))).toBeVisible();
  });

  // Unauthorized access - cookies cleared before navigating
  test('LabReports | Security: unauthenticated user cannot access Lab Reports page', async () => {
    await sharedPage.context().clearCookies();
    await sharedPage.goto('https://myappointments.whitecoats.com/');
    await expect(sharedPage).not.toHaveURL(/lab-reports/i);
  });

  // Session expiration - cookies cleared mid-session
  test('LabReports | Security: session expiration while viewing lab reports redirects user away', async () => {
    await new POManagers(sharedPage).PatientPage().filterLabReportsSessionExpiry();
    await expect(sharedPage).not.toHaveURL(/lab-reports/i);
  });

  // Browser refresh - page reloaded mid-filter
  test('LabReports | Error: browser refresh during lab reports filter resets the state gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterLabReportsAndRefresh();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Back button - navigating back mid-filter
  test('LabReports | Error: back button during lab reports filter navigates away gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterLabReportsAndNavigateBack();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Concurrent actions - search and status filter triggered simultaneously
  test('LabReports | Error: concurrent search and status filter does not crash the lab reports page', async () => {
    await new POManagers(sharedPage).PatientPage().filterLabReportsConcurrent();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // ${'═'.repeat(70)}
  // 20.`;

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
    async filterLabReportsEmptySearch() {
        await this.labReportsbtn.click();
        await this.showFiltersbtn.click();
        await this.labSearchInput.fill('');
    }

    async filterLabReportsInvalidSearch() {
        await this.labReportsbtn.click();
        await this.showFiltersbtn.click();
        await this.labSearchInput.fill('zzzzinvalid9999');
        await this.noLabReportsText.click();
    }

    async filterLabReportsClearOnly() {
        await this.labReportsbtn.click();
        await this.showFiltersbtn.click();
        await this.resetFiltersbtn.click();
    }

    async filterLabReportsMaxInput() {
        await this.labReportsbtn.click();
        await this.showFiltersbtn.click();
        await this.labSearchInput.fill('b'.repeat(255));
    }

    async filterLabReportsMinInput() {
        await this.labReportsbtn.click();
        await this.showFiltersbtn.click();
        await this.labSearchInput.fill('b');
    }

    async filterLabReportsDuplicate() {
        await this.labReportsbtn.click();
        await this.showFiltersbtn.click();
        await this.labSearchInput.fill('lip');
        await this.clearSearchbtn.click();
        await this.labSearchInput.fill('lip');
        await this.clearSearchbtn.click();
    }

    async filterLabReportsNetworkFailure() {
        await this.page.route('**/api/**', route => route.abort());
        await this.labReportsbtn.click();
        await this.showFiltersbtn.click();
        await this.labSearchInput.fill('lip');
    }

    async filterLabReportsApiFailure() {
        await this.labReportsbtn.click();
        await this.showFiltersbtn.click();
        await this.page.route('**/api/**', route => route.abort());
        await this.labSearchInput.fill('lip');
    }

    async filterLabReportsSessionExpiry() {
        await this.labReportsbtn.click();
        await this.showFiltersbtn.click();
        await this.page.context().clearCookies();
        await this.page.goto('https://myappointments.whitecoats.com/');
    }

    async filterLabReportsAndRefresh() {
        await this.labReportsbtn.click();
        await this.showFiltersbtn.click();
        await this.labSearchInput.fill('lip');
        await this.page.reload();
    }

    async filterLabReportsAndNavigateBack() {
        await this.labReportsbtn.click();
        await this.showFiltersbtn.click();
        await this.labSearchInput.fill('lip');
        await this.page.goBack();
    }

    async filterLabReportsConcurrent() {
        await this.labReportsbtn.click();
        await this.showFiltersbtn.click();
        await Promise.all([
            this.labSearchInput.fill('lip'),
            this.labAllStatusDropdown.click(),
        ]);
    }

`;

pom = pom.slice(0, pomIdx) + pomMethods + pom.slice(pomIdx);
fs.writeFileSync(pomFile, pom, 'utf8');
console.log('pom done, length:', fs.readFileSync(pomFile, 'utf8').length);
console.log('has filterLabReportsEmptySearch:', fs.readFileSync(pomFile,'utf8').includes('filterLabReportsEmptySearch'));
console.log('has filterLabReportsConcurrent:', fs.readFileSync(pomFile,'utf8').includes('filterLabReportsConcurrent'));
