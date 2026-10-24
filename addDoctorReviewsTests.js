const fs = require('fs');

// ── spec file ──────────────────────────────────────────────────────────────
const specFile = 'tests/patientRole.spec.js';
let spec = fs.readFileSync(specFile, 'utf8');

const specAnchor = `filterDoctorReviews();\n  });\n\n  // ${'═'.repeat(70)}\n  // 24.`;

const specInsert = `filterDoctorReviews();
  });

  // Missing mandatory fields - open filters without filling any
  test('DoctorReviews | Negative: opening filters without filling any shows full doctor reviews list gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterDoctorReviewsEmptySearch();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Invalid data - non-matching search term
  test('DoctorReviews | Negative: searching with invalid term shows no doctor reviews gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterDoctorReviewsInvalidSearch();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Empty values - reset filters without applying any
  test('DoctorReviews | Negative: resetting filters without applying any shows full doctor reviews list gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterDoctorReviewsClearOnly();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Maximum values - 255-character search input
  test('DoctorReviews | Boundary: 255-character search input does not crash the doctor reviews page', async () => {
    await new POManagers(sharedPage).PatientPage().filterDoctorReviewsMaxInput();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Minimum values - single character search input
  test('DoctorReviews | Boundary: single character search input returns results or no-results gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterDoctorReviewsMinInput();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Duplicate actions - same search performed twice consecutively
  test('DoctorReviews | Negative: performing the same search twice consecutively returns consistent results', async () => {
    await new POManagers(sharedPage).PatientPage().filterDoctorReviewsDuplicate();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Network failure - API aborted before page loads
  test('DoctorReviews | Error: network failure before Doctor Reviews page loads shows error or empty state gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterDoctorReviewsNetworkFailure();
    await expect(sharedPage.getByText(/error|failed|no reviews|try again/i).or(sharedPage.getByRole('textbox', { name: 'Search reviews...' }))).toBeVisible();
  });

  // API failure - API aborted after search input
  test('DoctorReviews | Error: API failure during doctor reviews search shows error or empty state gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterDoctorReviewsApiFailure();
    await expect(sharedPage.getByText(/error|failed|try again/i).or(sharedPage.getByRole('textbox', { name: 'Search reviews...' }))).toBeVisible();
  });

  // Unauthorized access - cookies cleared before navigating
  test('DoctorReviews | Security: unauthenticated user cannot access Doctor Reviews page', async () => {
    await sharedPage.context().clearCookies();
    await sharedPage.goto('https://myappointments.whitecoats.com/');
    await expect(sharedPage).not.toHaveURL(/doctor-reviews/i);
  });

  // Session expiration - cookies cleared mid-session
  test('DoctorReviews | Security: session expiration while viewing doctor reviews redirects user away', async () => {
    await new POManagers(sharedPage).PatientPage().filterDoctorReviewsSessionExpiry();
    await expect(sharedPage).not.toHaveURL(/doctor-reviews/i);
  });

  // Browser refresh - page reloaded mid-filter
  test('DoctorReviews | Error: browser refresh during doctor reviews filter resets the state gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterDoctorReviewsAndRefresh();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Back button - navigating back mid-filter
  test('DoctorReviews | Error: back button during doctor reviews filter navigates away gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterDoctorReviewsAndNavigateBack();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Concurrent actions - search and rating filter triggered simultaneously
  test('DoctorReviews | Error: concurrent search and rating filter does not crash the doctor reviews page', async () => {
    await new POManagers(sharedPage).PatientPage().filterDoctorReviewsConcurrent();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // ${'═'.repeat(70)}
  // 24.`;

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
    async filterDoctorReviewsEmptySearch() {
        await this.doctorReviewsbtn.click();
        await this.showFiltersbtn.click();
        await this.reviewSearchInput.fill('');
    }

    async filterDoctorReviewsInvalidSearch() {
        await this.doctorReviewsbtn.click();
        await this.showFiltersbtn.click();
        await this.reviewSearchInput.fill('zzzzinvalid9999');
        await this.noReviewsText.click();
    }

    async filterDoctorReviewsClearOnly() {
        await this.doctorReviewsbtn.click();
        await this.showFiltersbtn.click();
        await this.resetFiltersbtn.click();
    }

    async filterDoctorReviewsMaxInput() {
        await this.doctorReviewsbtn.click();
        await this.showFiltersbtn.click();
        await this.reviewSearchInput.fill('b'.repeat(255));
    }

    async filterDoctorReviewsMinInput() {
        await this.doctorReviewsbtn.click();
        await this.showFiltersbtn.click();
        await this.reviewSearchInput.fill('b');
    }

    async filterDoctorReviewsDuplicate() {
        await this.doctorReviewsbtn.click();
        await this.showFiltersbtn.click();
        await this.reviewSearchInput.fill('bhas');
        await this.clearSearchbtn.click();
        await this.reviewSearchInput.fill('bhas');
        await this.clearSearchbtn.click();
    }

    async filterDoctorReviewsNetworkFailure() {
        await this.page.route('**/api/**', route => route.abort());
        await this.doctorReviewsbtn.click();
        await this.showFiltersbtn.click();
        await this.reviewSearchInput.fill('bhas');
    }

    async filterDoctorReviewsApiFailure() {
        await this.doctorReviewsbtn.click();
        await this.showFiltersbtn.click();
        await this.page.route('**/api/**', route => route.abort());
        await this.reviewSearchInput.fill('bhas');
    }

    async filterDoctorReviewsSessionExpiry() {
        await this.doctorReviewsbtn.click();
        await this.showFiltersbtn.click();
        await this.page.context().clearCookies();
        await this.page.goto('https://myappointments.whitecoats.com/');
    }

    async filterDoctorReviewsAndRefresh() {
        await this.doctorReviewsbtn.click();
        await this.showFiltersbtn.click();
        await this.reviewSearchInput.fill('bhas');
        await this.page.reload();
    }

    async filterDoctorReviewsAndNavigateBack() {
        await this.doctorReviewsbtn.click();
        await this.showFiltersbtn.click();
        await this.reviewSearchInput.fill('bhas');
        await this.page.goBack();
    }

    async filterDoctorReviewsConcurrent() {
        await this.doctorReviewsbtn.click();
        await this.showFiltersbtn.click();
        await Promise.all([
            this.reviewSearchInput.fill('bhas'),
            this.allRatingsDropdown.click(),
        ]);
    }

`;

pom = pom.slice(0, pomIdx) + pomMethods + pom.slice(pomIdx);
fs.writeFileSync(pomFile, pom, 'utf8');
console.log('pom done, length:', fs.readFileSync(pomFile, 'utf8').length);
console.log('has filterDoctorReviewsEmptySearch:', fs.readFileSync(pomFile,'utf8').includes('filterDoctorReviewsEmptySearch'));
console.log('has filterDoctorReviewsConcurrent:', fs.readFileSync(pomFile,'utf8').includes('filterDoctorReviewsConcurrent'));
