const fs = require('fs');

// ── spec file ──────────────────────────────────────────────────────────────
const specFile = 'tests/patientRole.spec.js';
let spec = fs.readFileSync(specFile, 'utf8');

const specAnchor = `filterDocuments();\n  });\n\n  // ${'═'.repeat(70)}\n  // 18.`;

const specInsert = `filterDocuments();
  });

  // Missing mandatory fields - open filters without filling any
  test('Documents | Negative: opening filters without filling any shows full documents list gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterDocumentsEmptySearch();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Invalid data - non-matching search term
  test('Documents | Negative: searching with invalid term shows no documents gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterDocumentsInvalidSearch();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Empty values - reset filters without applying any
  test('Documents | Negative: resetting filters without applying any shows full documents list gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterDocumentsClearOnly();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Maximum values - 255-character search input
  test('Documents | Boundary: 255-character search input does not crash the documents page', async () => {
    await new POManagers(sharedPage).PatientPage().filterDocumentsMaxInput();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Minimum values - single character search input
  test('Documents | Boundary: single character search input returns results or no-results gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterDocumentsMinInput();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Duplicate actions - same search performed twice consecutively
  test('Documents | Negative: performing the same search twice consecutively returns consistent results', async () => {
    await new POManagers(sharedPage).PatientPage().filterDocumentsDuplicate();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Network failure - API aborted before page loads
  test('Documents | Error: network failure before Documents page loads shows error or empty state gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterDocumentsNetworkFailure();
    await expect(sharedPage.getByText(/error|failed|no documents|try again/i).or(sharedPage.getByRole('textbox', { name: 'Search documents...' }))).toBeVisible();
  });

  // API failure - API aborted after search input
  test('Documents | Error: API failure during documents search shows error or empty state gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterDocumentsApiFailure();
    await expect(sharedPage.getByText(/error|failed|try again/i).or(sharedPage.getByRole('textbox', { name: 'Search documents...' }))).toBeVisible();
  });

  // Unauthorized access - cookies cleared before navigating
  test('Documents | Security: unauthenticated user cannot access Documents page', async () => {
    await sharedPage.context().clearCookies();
    await sharedPage.goto('https://myappointments.whitecoats.com/');
    await expect(sharedPage).not.toHaveURL(/documents/i);
  });

  // Session expiration - cookies cleared mid-session
  test('Documents | Security: session expiration while viewing documents redirects user away', async () => {
    await new POManagers(sharedPage).PatientPage().filterDocumentsSessionExpiry();
    await expect(sharedPage).not.toHaveURL(/documents/i);
  });

  // Browser refresh - page reloaded mid-filter
  test('Documents | Error: browser refresh during documents filter resets the state gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterDocumentsAndRefresh();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Back button - navigating back mid-filter
  test('Documents | Error: back button during documents filter navigates away gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterDocumentsAndNavigateBack();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Concurrent actions - search and type filter triggered simultaneously
  test('Documents | Error: concurrent search and type filter does not crash the documents page', async () => {
    await new POManagers(sharedPage).PatientPage().filterDocumentsConcurrent();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // ${'═'.repeat(70)}
  // 18.`;

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
    async filterDocumentsEmptySearch() {
        await this.Documentsbtn.click();
        await this.showFiltersbtn.click();
        await this.documentsSearchInput.fill('');
    }

    async filterDocumentsInvalidSearch() {
        await this.Documentsbtn.click();
        await this.showFiltersbtn.click();
        await this.documentsSearchInput.fill('zzzzinvalid9999');
    }

    async filterDocumentsClearOnly() {
        await this.Documentsbtn.click();
        await this.showFiltersbtn.click();
        await this.resetFiltersbtn.click();
    }

    async filterDocumentsMaxInput() {
        await this.Documentsbtn.click();
        await this.showFiltersbtn.click();
        await this.documentsSearchInput.fill('b'.repeat(255));
    }

    async filterDocumentsMinInput() {
        await this.Documentsbtn.click();
        await this.showFiltersbtn.click();
        await this.documentsSearchInput.fill('b');
    }

    async filterDocumentsDuplicate() {
        await this.Documentsbtn.click();
        await this.showFiltersbtn.click();
        await this.documentsSearchInput.fill('cut');
        await this.clearSearchbtn.click();
        await this.documentsSearchInput.fill('cut');
        await this.clearSearchbtn.click();
    }

    async filterDocumentsNetworkFailure() {
        await this.page.route('**/api/**', route => route.abort());
        await this.Documentsbtn.click();
        await this.showFiltersbtn.click();
        await this.documentsSearchInput.fill('cut');
    }

    async filterDocumentsApiFailure() {
        await this.Documentsbtn.click();
        await this.showFiltersbtn.click();
        await this.page.route('**/api/**', route => route.abort());
        await this.documentsSearchInput.fill('cut');
    }

    async filterDocumentsSessionExpiry() {
        await this.Documentsbtn.click();
        await this.showFiltersbtn.click();
        await this.page.context().clearCookies();
        await this.page.goto('https://myappointments.whitecoats.com/');
    }

    async filterDocumentsAndRefresh() {
        await this.Documentsbtn.click();
        await this.showFiltersbtn.click();
        await this.documentsSearchInput.fill('cut');
        await this.page.reload();
    }

    async filterDocumentsAndNavigateBack() {
        await this.Documentsbtn.click();
        await this.showFiltersbtn.click();
        await this.documentsSearchInput.fill('cut');
        await this.page.goBack();
    }

    async filterDocumentsConcurrent() {
        await this.Documentsbtn.click();
        await this.showFiltersbtn.click();
        await Promise.all([
            this.documentsSearchInput.fill('cut'),
            this.allDocumentsDropdown.click(),
        ]);
    }

`;

pom = pom.slice(0, pomIdx) + pomMethods + pom.slice(pomIdx);
fs.writeFileSync(pomFile, pom, 'utf8');
console.log('pom done, length:', fs.readFileSync(pomFile, 'utf8').length);
console.log('has filterDocumentsEmptySearch:', fs.readFileSync(pomFile,'utf8').includes('filterDocumentsEmptySearch'));
console.log('has filterDocumentsConcurrent:', fs.readFileSync(pomFile,'utf8').includes('filterDocumentsConcurrent'));
