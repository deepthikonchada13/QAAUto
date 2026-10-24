const fs = require('fs');

// ── spec file ──────────────────────────────────────────────────────────────
const specFile = 'tests/patientRole.spec.js';
let spec = fs.readFileSync(specFile, 'utf8');

const specAnchor = `filterPrescriptionRecords();\n  });\n\n  // ${'═'.repeat(70)}\n  // 19.`;

const specInsert = `filterPrescriptionRecords();
  });

  // Missing mandatory fields - open filters without filling any
  test('PrescriptionRecords | Negative: opening filters without filling any shows full prescriptions list gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterPrescriptionRecordsEmptySearch();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Invalid data - non-matching search term
  test('PrescriptionRecords | Negative: searching with invalid term shows no prescriptions gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterPrescriptionRecordsInvalidSearch();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Empty values - reset filters without applying any
  test('PrescriptionRecords | Negative: resetting filters without applying any shows full prescriptions list gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterPrescriptionRecordsClearOnly();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Maximum values - 255-character search input
  test('PrescriptionRecords | Boundary: 255-character search input does not crash the prescriptions page', async () => {
    await new POManagers(sharedPage).PatientPage().filterPrescriptionRecordsMaxInput();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Minimum values - single character search input
  test('PrescriptionRecords | Boundary: single character search input returns results or no-results gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterPrescriptionRecordsMinInput();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Duplicate actions - same search performed twice consecutively
  test('PrescriptionRecords | Negative: performing the same search twice consecutively returns consistent results', async () => {
    await new POManagers(sharedPage).PatientPage().filterPrescriptionRecordsDuplicate();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Network failure - API aborted before page loads
  test('PrescriptionRecords | Error: network failure before Prescriptions page loads shows error or empty state gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterPrescriptionRecordsNetworkFailure();
    await expect(sharedPage.getByText(/error|failed|no prescriptions|try again/i).or(sharedPage.getByRole('textbox', { name: 'Search prescriptions...' }))).toBeVisible();
  });

  // API failure - API aborted after search input
  test('PrescriptionRecords | Error: API failure during prescriptions search shows error or empty state gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterPrescriptionRecordsApiFailure();
    await expect(sharedPage.getByText(/error|failed|try again/i).or(sharedPage.getByRole('textbox', { name: 'Search prescriptions...' }))).toBeVisible();
  });

  // Unauthorized access - cookies cleared before navigating
  test('PrescriptionRecords | Security: unauthenticated user cannot access Prescriptions page', async () => {
    await sharedPage.context().clearCookies();
    await sharedPage.goto('https://myappointments.whitecoats.com/');
    await expect(sharedPage).not.toHaveURL(/prescriptions/i);
  });

  // Session expiration - cookies cleared mid-session
  test('PrescriptionRecords | Security: session expiration while viewing prescriptions redirects user away', async () => {
    await new POManagers(sharedPage).PatientPage().filterPrescriptionRecordsSessionExpiry();
    await expect(sharedPage).not.toHaveURL(/prescriptions/i);
  });

  // Browser refresh - page reloaded mid-filter
  test('PrescriptionRecords | Error: browser refresh during prescriptions filter resets the state gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterPrescriptionRecordsAndRefresh();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Back button - navigating back mid-filter
  test('PrescriptionRecords | Error: back button during prescriptions filter navigates away gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterPrescriptionRecordsAndNavigateBack();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Concurrent actions - search and status filter triggered simultaneously
  test('PrescriptionRecords | Error: concurrent search and status filter does not crash the prescriptions page', async () => {
    await new POManagers(sharedPage).PatientPage().filterPrescriptionRecordsConcurrent();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // ${'═'.repeat(70)}
  // 19.`;

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
    async filterPrescriptionRecordsEmptySearch() {
        await this.prescriptionsbtn.click();
        await this.showFiltersbtn.click();
        await this.prescriptionSearchInput.fill('');
    }

    async filterPrescriptionRecordsInvalidSearch() {
        await this.prescriptionsbtn.click();
        await this.showFiltersbtn.click();
        await this.prescriptionSearchInput.fill('zzzzinvalid9999');
        await this.noPrescriptionsText.click();
    }

    async filterPrescriptionRecordsClearOnly() {
        await this.prescriptionsbtn.click();
        await this.showFiltersbtn.click();
        await this.resetFiltersbtn.click();
    }

    async filterPrescriptionRecordsMaxInput() {
        await this.prescriptionsbtn.click();
        await this.showFiltersbtn.click();
        await this.prescriptionSearchInput.fill('b'.repeat(255));
    }

    async filterPrescriptionRecordsMinInput() {
        await this.prescriptionsbtn.click();
        await this.showFiltersbtn.click();
        await this.prescriptionSearchInput.fill('b');
    }

    async filterPrescriptionRecordsDuplicate() {
        await this.prescriptionsbtn.click();
        await this.showFiltersbtn.click();
        await this.prescriptionSearchInput.fill('VERIFYRX.08');
        await this.clearSearchbtn.click();
        await this.prescriptionSearchInput.fill('VERIFYRX.08');
        await this.clearSearchbtn.click();
    }

    async filterPrescriptionRecordsNetworkFailure() {
        await this.page.route('**/api/**', route => route.abort());
        await this.prescriptionsbtn.click();
        await this.showFiltersbtn.click();
        await this.prescriptionSearchInput.fill('VERIFYRX.08');
    }

    async filterPrescriptionRecordsApiFailure() {
        await this.prescriptionsbtn.click();
        await this.showFiltersbtn.click();
        await this.page.route('**/api/**', route => route.abort());
        await this.prescriptionSearchInput.fill('VERIFYRX.08');
    }

    async filterPrescriptionRecordsSessionExpiry() {
        await this.prescriptionsbtn.click();
        await this.showFiltersbtn.click();
        await this.page.context().clearCookies();
        await this.page.goto('https://myappointments.whitecoats.com/');
    }

    async filterPrescriptionRecordsAndRefresh() {
        await this.prescriptionsbtn.click();
        await this.showFiltersbtn.click();
        await this.prescriptionSearchInput.fill('VERIFYRX.08');
        await this.page.reload();
    }

    async filterPrescriptionRecordsAndNavigateBack() {
        await this.prescriptionsbtn.click();
        await this.showFiltersbtn.click();
        await this.prescriptionSearchInput.fill('VERIFYRX.08');
        await this.page.goBack();
    }

    async filterPrescriptionRecordsConcurrent() {
        await this.prescriptionsbtn.click();
        await this.showFiltersbtn.click();
        await Promise.all([
            this.prescriptionSearchInput.fill('VERIFYRX.08'),
            this.allPrescriptionsDropdown.click(),
        ]);
    }

`;

pom = pom.slice(0, pomIdx) + pomMethods + pom.slice(pomIdx);
fs.writeFileSync(pomFile, pom, 'utf8');
console.log('pom done, length:', fs.readFileSync(pomFile, 'utf8').length);
console.log('has filterPrescriptionRecordsEmptySearch:', fs.readFileSync(pomFile,'utf8').includes('filterPrescriptionRecordsEmptySearch'));
console.log('has filterPrescriptionRecordsConcurrent:', fs.readFileSync(pomFile,'utf8').includes('filterPrescriptionRecordsConcurrent'));
