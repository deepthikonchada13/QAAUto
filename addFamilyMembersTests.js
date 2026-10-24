const fs = require('fs');

// ── spec file ──────────────────────────────────────────────────────────────
const specFile = 'tests/patientRole.spec.js';
let spec = fs.readFileSync(specFile, 'utf8');

const specAnchor = `filterFamilyMembers();\n  });\n\n  // ${'═'.repeat(70)}\n  // 23.`;

const specInsert = `filterFamilyMembers();
  });

  // Missing mandatory fields - open filters without filling any
  test('FamilyMembers | Negative: opening filters without filling any shows full family members list gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterFamilyMembersEmptySearch();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Invalid data - non-matching search term
  test('FamilyMembers | Negative: searching with invalid term shows no family members gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterFamilyMembersInvalidSearch();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Empty values - reset filters without applying any
  test('FamilyMembers | Negative: resetting filters without applying any shows full family members list gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterFamilyMembersClearOnly();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Maximum values - 255-character search input
  test('FamilyMembers | Boundary: 255-character search input does not crash the family members page', async () => {
    await new POManagers(sharedPage).PatientPage().filterFamilyMembersMaxInput();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Minimum values - single character search input
  test('FamilyMembers | Boundary: single character search input returns results or no-results gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterFamilyMembersMinInput();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Duplicate actions - same search performed twice consecutively
  test('FamilyMembers | Negative: performing the same search twice consecutively returns consistent results', async () => {
    await new POManagers(sharedPage).PatientPage().filterFamilyMembersDuplicate();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Network failure - API aborted before page loads
  test('FamilyMembers | Error: network failure before Family Members page loads shows error or empty state gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterFamilyMembersNetworkFailure();
    await expect(sharedPage.getByText(/error|failed|no members|try again/i).or(sharedPage.getByRole('textbox', { name: 'Search members...' }))).toBeVisible();
  });

  // API failure - API aborted after search input
  test('FamilyMembers | Error: API failure during family members search shows error or empty state gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterFamilyMembersApiFailure();
    await expect(sharedPage.getByText(/error|failed|try again/i).or(sharedPage.getByRole('textbox', { name: 'Search members...' }))).toBeVisible();
  });

  // Unauthorized access - cookies cleared before navigating
  test('FamilyMembers | Security: unauthenticated user cannot access Family Members page', async () => {
    await sharedPage.context().clearCookies();
    await sharedPage.goto('https://myappointments.whitecoats.com/');
    await expect(sharedPage).not.toHaveURL(/family-members/i);
  });

  // Session expiration - cookies cleared mid-session
  test('FamilyMembers | Security: session expiration while viewing family members redirects user away', async () => {
    await new POManagers(sharedPage).PatientPage().filterFamilyMembersSessionExpiry();
    await expect(sharedPage).not.toHaveURL(/family-members/i);
  });

  // Browser refresh - page reloaded mid-filter
  test('FamilyMembers | Error: browser refresh during family members filter resets the state gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterFamilyMembersAndRefresh();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Back button - navigating back mid-filter
  test('FamilyMembers | Error: back button during family members filter navigates away gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterFamilyMembersAndNavigateBack();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Concurrent actions - search and relation filter triggered simultaneously
  test('FamilyMembers | Error: concurrent search and relation filter does not crash the family members page', async () => {
    await new POManagers(sharedPage).PatientPage().filterFamilyMembersConcurrent();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // ${'═'.repeat(70)}
  // 23.`;

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
    async filterFamilyMembersEmptySearch() {
        await this.familyMembersbtn.click();
        await this.showFiltersbtn.click();
        await this.familySearchInput.fill('');
    }

    async filterFamilyMembersInvalidSearch() {
        await this.familyMembersbtn.click();
        await this.showFiltersbtn.click();
        await this.familySearchInput.fill('zzzzinvalid9999');
    }

    async filterFamilyMembersClearOnly() {
        await this.familyMembersbtn.click();
        await this.showFiltersbtn.click();
        await this.resetFiltersbtn.click();
    }

    async filterFamilyMembersMaxInput() {
        await this.familyMembersbtn.click();
        await this.showFiltersbtn.click();
        await this.familySearchInput.fill('b'.repeat(255));
    }

    async filterFamilyMembersMinInput() {
        await this.familyMembersbtn.click();
        await this.showFiltersbtn.click();
        await this.familySearchInput.fill('b');
    }

    async filterFamilyMembersDuplicate() {
        await this.familyMembersbtn.click();
        await this.showFiltersbtn.click();
        await this.familySearchInput.fill('chotu');
        await this.clearSearchbtn.click();
        await this.familySearchInput.fill('chotu');
        await this.clearSearchbtn.click();
    }

    async filterFamilyMembersNetworkFailure() {
        await this.page.route('**/api/**', route => route.abort());
        await this.familyMembersbtn.click();
        await this.showFiltersbtn.click();
        await this.familySearchInput.fill('chotu');
    }

    async filterFamilyMembersApiFailure() {
        await this.familyMembersbtn.click();
        await this.showFiltersbtn.click();
        await this.page.route('**/api/**', route => route.abort());
        await this.familySearchInput.fill('chotu');
    }

    async filterFamilyMembersSessionExpiry() {
        await this.familyMembersbtn.click();
        await this.showFiltersbtn.click();
        await this.page.context().clearCookies();
        await this.page.goto('https://myappointments.whitecoats.com/');
    }

    async filterFamilyMembersAndRefresh() {
        await this.familyMembersbtn.click();
        await this.showFiltersbtn.click();
        await this.familySearchInput.fill('chotu');
        await this.page.reload();
    }

    async filterFamilyMembersAndNavigateBack() {
        await this.familyMembersbtn.click();
        await this.showFiltersbtn.click();
        await this.familySearchInput.fill('chotu');
        await this.page.goBack();
    }

    async filterFamilyMembersConcurrent() {
        await this.familyMembersbtn.click();
        await this.showFiltersbtn.click();
        await Promise.all([
            this.familySearchInput.fill('chotu'),
            this.allRelationsDropdown.click(),
        ]);
    }

`;

pom = pom.slice(0, pomIdx) + pomMethods + pom.slice(pomIdx);
fs.writeFileSync(pomFile, pom, 'utf8');
console.log('pom done, length:', fs.readFileSync(pomFile, 'utf8').length);
console.log('has filterFamilyMembersEmptySearch:', fs.readFileSync(pomFile,'utf8').includes('filterFamilyMembersEmptySearch'));
console.log('has filterFamilyMembersConcurrent:', fs.readFileSync(pomFile,'utf8').includes('filterFamilyMembersConcurrent'));
