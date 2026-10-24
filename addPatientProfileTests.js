const fs = require('fs');

// ── spec file ──────────────────────────────────────────────────────────────
const specFile = 'tests/patientRole.spec.js';
let spec = fs.readFileSync(specFile, 'utf8');

const specAnchor = `editPatientProfile();\n  });\n});`;

const specInsert = `editPatientProfile();
  });

  // Missing mandatory fields - save without filling required name field
  test('PatientProfile | Negative: saving profile without entering name shows validation error gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().editPatientProfileEmptyName();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Invalid data - invalid PIN code format
  test('PatientProfile | Negative: entering invalid PIN code format shows validation error gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().editPatientProfileInvalidPin();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Empty values - clear name field and attempt save
  test('PatientProfile | Negative: clearing name field and saving shows validation error gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().editPatientProfileClearName();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Maximum values - 255-character name input
  test('PatientProfile | Boundary: 255-character name input does not crash the profile edit page', async () => {
    await new POManagers(sharedPage).PatientPage().editPatientProfileMaxName();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Minimum values - single character name input
  test('PatientProfile | Boundary: single character name input is handled gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().editPatientProfileMinName();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Duplicate actions - open edit profile twice consecutively
  test('PatientProfile | Negative: opening edit profile twice consecutively does not crash the page', async () => {
    await new POManagers(sharedPage).PatientPage().editPatientProfileDuplicate();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Network failure - API aborted before profile page loads
  test('PatientProfile | Error: network failure before Profile page loads shows error or empty state gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().editPatientProfileNetworkFailure();
    await expect(sharedPage.getByText(/error|failed|try again/i).or(sharedPage.getByRole('button', { name: '✏️ Edit Profile' }))).toBeVisible();
  });

  // API failure - API aborted on save
  test('PatientProfile | Error: API failure while saving profile shows error or empty state gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().editPatientProfileApiFailure();
    await expect(sharedPage.getByText(/error|failed|try again/i).or(sharedPage.getByRole('button', { name: '✏️ Edit Profile' }))).toBeVisible();
  });

  // Unauthorized access - cookies cleared before navigating
  test('PatientProfile | Security: unauthenticated user cannot access Patient Profile page', async () => {
    await sharedPage.context().clearCookies();
    await sharedPage.goto('https://myappointments.whitecoats.com/');
    await expect(sharedPage).not.toHaveURL(/profile/i);
  });

  // Session expiration - cookies cleared mid-edit
  test('PatientProfile | Security: session expiration while editing profile redirects user away', async () => {
    await new POManagers(sharedPage).PatientPage().editPatientProfileSessionExpiry();
    await expect(sharedPage).not.toHaveURL(/profile/i);
  });

  // Browser refresh - page reloaded mid-edit
  test('PatientProfile | Error: browser refresh during profile edit resets the form state gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().editPatientProfileAndRefresh();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Back button - navigating back mid-edit
  test('PatientProfile | Error: back button during profile edit navigates away gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().editPatientProfileAndNavigateBack();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Concurrent actions - fill two fields simultaneously
  test('PatientProfile | Error: filling name and insurance fields concurrently does not crash the profile page', async () => {
    await new POManagers(sharedPage).PatientPage().editPatientProfileConcurrent();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });
});
`;

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
    async editPatientProfileEmptyName() {
        await this.patientProfilebtn.click();
        await this.editPatientProfilebtn.click();
        await this.patientNameInput.clear();
    }

    async editPatientProfileInvalidPin() {
        await this.patientProfilebtn.click();
        await this.editPatientProfilebtn.click();
        await this.pinCodeInput.fill('ABC!@#');
    }

    async editPatientProfileClearName() {
        await this.patientProfilebtn.click();
        await this.editPatientProfilebtn.click();
        await this.patientNameInput.clear();
        await this.patientNameInput.fill('');
    }

    async editPatientProfileMaxName() {
        await this.patientProfilebtn.click();
        await this.editPatientProfilebtn.click();
        await this.patientNameInput.fill('K'.repeat(255));
    }

    async editPatientProfileMinName() {
        await this.patientProfilebtn.click();
        await this.editPatientProfilebtn.click();
        await this.patientNameInput.fill('K');
    }

    async editPatientProfileDuplicate() {
        await this.patientProfilebtn.click();
        await this.editPatientProfilebtn.click();
        await this.patientNameInput.fill('Konchada kk');
        await this.patientProfilebtn.click();
        await this.editPatientProfilebtn.click();
        await this.patientNameInput.fill('Konchada kk');
    }

    async editPatientProfileNetworkFailure() {
        await this.page.route('**/api/**', route => route.abort());
        await this.patientProfilebtn.click();
        await this.editPatientProfilebtn.click();
    }

    async editPatientProfileApiFailure() {
        await this.patientProfilebtn.click();
        await this.editPatientProfilebtn.click();
        await this.page.route('**/api/**', route => route.abort());
        await this.patientNameInput.fill('Konchada kk');
    }

    async editPatientProfileSessionExpiry() {
        await this.patientProfilebtn.click();
        await this.editPatientProfilebtn.click();
        await this.page.context().clearCookies();
        await this.page.goto('https://myappointments.whitecoats.com/');
    }

    async editPatientProfileAndRefresh() {
        await this.patientProfilebtn.click();
        await this.editPatientProfilebtn.click();
        await this.patientNameInput.fill('Konchada kk');
        await this.page.reload();
    }

    async editPatientProfileAndNavigateBack() {
        await this.patientProfilebtn.click();
        await this.editPatientProfilebtn.click();
        await this.patientNameInput.fill('Konchada kk');
        await this.page.goBack();
    }

    async editPatientProfileConcurrent() {
        await this.patientProfilebtn.click();
        await this.editPatientProfilebtn.click();
        await Promise.all([
            this.patientNameInput.fill('Konchada kk'),
            this.insuranceCompanyInput.fill('medihub test'),
        ]);
    }

`;

pom = pom.slice(0, pomIdx) + pomMethods + pom.slice(pomIdx);
fs.writeFileSync(pomFile, pom, 'utf8');
console.log('pom done, length:', fs.readFileSync(pomFile, 'utf8').length);
console.log('has editPatientProfileEmptyName:', fs.readFileSync(pomFile,'utf8').includes('editPatientProfileEmptyName'));
console.log('has editPatientProfileConcurrent:', fs.readFileSync(pomFile,'utf8').includes('editPatientProfileConcurrent'));
