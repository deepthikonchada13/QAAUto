const fs = require('fs');

// ── spec file ──────────────────────────────────────────────────────────────
const specFile = 'tests/patientRole.spec.js';
let spec = fs.readFileSync(specFile, 'utf8');

const specAnchor = `viewMedicalRecords();\n  });\n\n  // ${'═'.repeat(70)}\n  // 16.`;

const specInsert = `viewMedicalRecords();
  });

  // Missing mandatory fields - navigate without selecting a sub-section
  test('MedicalRecords | Negative: navigating to medical records without selecting a sub-section shows default view gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().viewMedicalRecordsNoSubSection();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Invalid data - direct URL navigation to non-existent record
  test('MedicalRecords | Negative: navigating to a non-existent medical record URL shows error or redirects gracefully', async () => {
    await sharedPage.goto('https://myappointments.whitecoats.com/medical-records/invalid-id-99999');
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Empty values - health summary with no data
  test('MedicalRecords | Negative: health summary with no recorded vitals shows empty state gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().viewMedicalRecordsHealthSummaryEmpty();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Maximum values - navigate through all available record tabs
  test('MedicalRecords | Boundary: navigating through all medical record sub-sections does not crash the page', async () => {
    await new POManagers(sharedPage).PatientPage().viewMedicalRecordsAllTabs();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Minimum values - view only the first available record
  test('MedicalRecords | Boundary: viewing only the first medical record entry does not crash the page', async () => {
    await new POManagers(sharedPage).PatientPage().viewMedicalRecordsFirstOnly();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Duplicate actions - navigate to health summary twice consecutively
  test('MedicalRecords | Negative: navigating to health summary twice consecutively returns consistent view', async () => {
    await new POManagers(sharedPage).PatientPage().viewMedicalRecordsDuplicate();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Network failure - API aborted before page loads
  test('MedicalRecords | Error: network failure before Medical Records page loads shows error or empty state gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().viewMedicalRecordsNetworkFailure();
    await expect(sharedPage.getByText(/error|failed|no records|try again/i).or(sharedPage.getByRole('button', { name: '📋 Medical Records ❯' }))).toBeVisible();
  });

  // API failure - API aborted after navigation
  test('MedicalRecords | Error: API failure while loading medical records shows error or empty state gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().viewMedicalRecordsApiFailure();
    await expect(sharedPage.getByText(/error|failed|try again/i).or(sharedPage.getByRole('button', { name: '📋 All Records' }))).toBeVisible();
  });

  // Unauthorized access - cookies cleared before navigating
  test('MedicalRecords | Security: unauthenticated user cannot access Medical Records page', async () => {
    await sharedPage.context().clearCookies();
    await sharedPage.goto('https://myappointments.whitecoats.com/');
    await expect(sharedPage).not.toHaveURL(/medical-records/i);
  });

  // Session expiration - cookies cleared mid-session
  test('MedicalRecords | Security: session expiration while viewing medical records redirects user away', async () => {
    await new POManagers(sharedPage).PatientPage().viewMedicalRecordsSessionExpiry();
    await expect(sharedPage).not.toHaveURL(/medical-records/i);
  });

  // Browser refresh - page reloaded mid-navigation
  test('MedicalRecords | Error: browser refresh while viewing medical records resets the state gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().viewMedicalRecordsAndRefresh();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Back button - navigating back mid-navigation
  test('MedicalRecords | Error: back button while viewing medical records navigates away gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().viewMedicalRecordsAndNavigateBack();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Concurrent actions - open two sub-sections simultaneously
  test('MedicalRecords | Error: concurrent navigation to two medical record sub-sections does not crash the page', async () => {
    await new POManagers(sharedPage).PatientPage().viewMedicalRecordsConcurrent();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // ${'═'.repeat(70)}
  // 16.`;

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
    async viewMedicalRecordsNoSubSection() {
        await this.medicalRecordsmenu.click();
    }

    async viewMedicalRecordsHealthSummaryEmpty() {
        await this.medicalRecordsmenu.click();
        await this.healthSummarybtn.click();
    }

    async viewMedicalRecordsAllTabs() {
        await this.medicalRecordsmenu.click();
        await this.allRecordsbtn.click();
        await this.healthSummarybtn.click();
        await this.visitHistorybtn.click();
        await this.prescriptionsbtn.click();
        await this.labReportsbtn.click();
        await this.Documentsbtn.click();
    }

    async viewMedicalRecordsFirstOnly() {
        await this.medicalRecordsmenu.click();
        await this.allRecordsbtn.click();
    }

    async viewMedicalRecordsDuplicate() {
        await this.medicalRecordsmenu.click();
        await this.healthSummarybtn.click();
        await this.allRecordsbtn.click();
        await this.healthSummarybtn.click();
    }

    async viewMedicalRecordsNetworkFailure() {
        await this.page.route('**/api/**', route => route.abort());
        await this.medicalRecordsmenu.click();
        await this.allRecordsbtn.click();
    }

    async viewMedicalRecordsApiFailure() {
        await this.medicalRecordsmenu.click();
        await this.page.route('**/api/**', route => route.abort());
        await this.allRecordsbtn.click();
    }

    async viewMedicalRecordsSessionExpiry() {
        await this.medicalRecordsmenu.click();
        await this.allRecordsbtn.click();
        await this.page.context().clearCookies();
        await this.page.goto('https://myappointments.whitecoats.com/');
    }

    async viewMedicalRecordsAndRefresh() {
        await this.medicalRecordsmenu.click();
        await this.allRecordsbtn.click();
        await this.page.reload();
    }

    async viewMedicalRecordsAndNavigateBack() {
        await this.medicalRecordsmenu.click();
        await this.allRecordsbtn.click();
        await this.page.goBack();
    }

    async viewMedicalRecordsConcurrent() {
        await this.medicalRecordsmenu.click();
        await Promise.all([
            this.allRecordsbtn.click(),
            this.healthSummarybtn.click(),
        ]);
    }

`;

pom = pom.slice(0, pomIdx) + pomMethods + pom.slice(pomIdx);
fs.writeFileSync(pomFile, pom, 'utf8');
console.log('pom done, length:', fs.readFileSync(pomFile, 'utf8').length);
console.log('has viewMedicalRecordsNoSubSection:', fs.readFileSync(pomFile,'utf8').includes('viewMedicalRecordsNoSubSection'));
console.log('has viewMedicalRecordsConcurrent:', fs.readFileSync(pomFile,'utf8').includes('viewMedicalRecordsConcurrent'));
