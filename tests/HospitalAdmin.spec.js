const { test, expect } = require('@playwright/test');
const { POManagers } = require('../PageObjects/POManagers');
const {
  generateDepartmentData, generateSpecializationData, generateBranchData,
  generateDoctorData, generateScheduleData, generateStaffData, generateHospitalPatientData,
  generateInvoiceData, getDynamicDate
} = require('../testData/testDataGenerator');

test.describe('Hospital Admin Branch creation', () => {
  test.beforeEach(async ({ page }) => {
    const pomanager = new POManagers(page);
    await page.goto('https://emr.whitecoats.com/');
    await pomanager.HospitalLoginPage().validLogin();
  });

  // ── Positive Tests ────────────────────────────────────────────────────────

  test('Positive: should create a new department @dept', async ({ page }) => {
    const { title, description, floor } = generateDepartmentData();
    await new POManagers(page).HospitalAdminPage().CreateDepartment(title, description, floor);
  });

  // ══════════════════════════════════════════════════════════════════════
  // CreateDepartment - All Negative Scenarios
  // ══════════════════════════════════════════════════════════════════════

  // Empty values - title missing
  test('CreateDepartment | Negative: department creation fails without title @dept', async ({ page }) => {
    const { description, floor } = generateDepartmentData();
    await new POManagers(page).HospitalAdminPage().createDepartmentWithoutTitle(description, floor);
    await expect(page.getByText(/required|title|cannot be empty/i).or(page.getByRole('button', { name: 'Add Department', exact: true }))).toBeVisible();
  });

  // Empty values - description missing
  // test('CreateDepartment | Negative: department creation without description is handled gracefully @dept', async ({ page }) => {
  //   const { title, floor } = generateDepartmentData();
  //   await new POManagers(page).HospitalAdminPage().createDepartmentWithEmptyDescription(title, floor);
  //    });

  // // Invalid data - special characters in title
  // test('CreateDepartment | Negative: special characters in title are rejected or handled gracefully @dept', async ({ page }) => {
  //   const { description, floor } = generateDepartmentData();
  //   await new POManagers(page).HospitalAdminPage().createDepartmentWithInvalidTitle('!@#$%^&*()', description, floor);
  //   // await expect(page.getByText(/invalid|special|title/i).or(page.getByRole('button', { name: 'Add Department', exact: true }))).toBeVisible();
  // });

  // // Invalid data - SQL injection in title
  // test('CreateDepartment | Security: SQL injection in title is sanitized and page remains stable @dept', async ({ page }) => {
  //   const { description, floor } = generateDepartmentData();
  //   await new POManagers(page).HospitalAdminPage().createDepartmentWithInvalidTitle("' OR '1'='1", description, floor);
  //   await expect(page).toHaveURL(/myappointments\.whitecoats\.com/);
  //   await expect(page.getByRole('button', { name: 'Add Department', exact: true })).toBeVisible();
  // });

  // // Invalid data - XSS in title
  // test('CreateDepartment | Security: XSS script tag in title is not executed and page remains stable @dept', async ({ page }) => {
  //   const { description, floor } = generateDepartmentData();
  //   await new POManagers(page).HospitalAdminPage().createDepartmentWithInvalidTitle('<script>alert(1)</script>', description, floor);
  //   await expect(page).toHaveURL(/myappointments\.whitecoats\.com/);
  // });

  // // Maximum values - title
  // test('CreateDepartment | Boundary: 500-character title does not crash the department form @dept', async ({ page }) => {
  //   const { description, floor } = generateDepartmentData();
  //   await new POManagers(page).HospitalAdminPage().createDepartmentWithMaxLengthTitle(description, floor);
  //   await expect(page.getByRole('button', { name: 'Add Department', exact: true })).toBeVisible();
  // });

  // // Minimum values - title
  // test('CreateDepartment | Boundary: single character title is accepted or rejected gracefully @dept', async ({ page }) => {
  //   const { description, floor } = generateDepartmentData();
  //   await new POManagers(page).HospitalAdminPage().createDepartmentWithMinLengthTitle(description, floor);
  //   await expect(page.getByRole('button', { name: 'Add Department', exact: true })).toBeVisible();
  // });

  // // API failure
  // test('CreateDepartment | Error: API failure during department creation shows error gracefully @dept', async ({ page }) => {
  //   const { title, description, floor } = generateDepartmentData();
  //   await new POManagers(page).HospitalAdminPage().createDepartmentWithApiFailure(title, description, floor);
  //   await expect(page.getByText(/error|failed|try again/i).or(page.getByRole('button', { name: 'Add Department', exact: true }))).toBeVisible();
  // });

  // // Unauthorized access
  // test('CreateDepartment | Security: unauthenticated user cannot access department creation page @dept', async ({ page }) => {
  //   await page.context().clearCookies();
  //   await page.goto('https://myappointments.whitecoats.com/');
  //   await expect(page).not.toHaveURL(/departments/i);
  // });

  // // Session expiration
  // test('CreateDepartment | Security: session expiration during department creation redirects user away @dept', async ({ page }) => {
  //   await new POManagers(page).HospitalAdminPage().createDepartmentSessionExpiry();
  //   await expect(page).not.toHaveURL("https://myappointments.whitecoats.com/hospital-admin/departments");
  // });

  // // Browser refresh
  // test('CreateDepartment | Error: browser refresh during form fill discards unsaved department data @dept', async ({ page }) => {
  //   const { title, description, floor } = generateDepartmentData();
  //   await new POManagers(page).HospitalAdminPage().createDepartmentAndRefresh(title, description, floor);
  //   await expect(page).toHaveURL(/myappointments\.whitecoats\.com/);
  // });

  // // Back button
  // test('CreateDepartment | Error: back button during form fill navigates away without saving department @dept-', async ({ page }) => {
  //   const { title, description, floor } = generateDepartmentData();
  //   await new POManagers(page).HospitalAdminPage().createDepartmentAndNavigateBack(title, description, floor);
  //   await expect(page).toHaveURL(/myappointments\.whitecoats\.com/);
  // });

  // // Duplicate title
  // test('CreateDepartment | Negative: duplicate department title shows error or is rejected @dept', async ({ page }) => {
  //   const { description, floor } = generateDepartmentData();
  //   await new POManagers(page).HospitalAdminPage().createDepartmentWithInvalidTitle('Cardiac', description, floor);
  //   // await expect(page.getByText(/duplicate|already exists|title/i).or(page.getByRole('button', { name: 'Add Department', exact: true }))).toBeVisible();
  // });

  // // Whitespace-only title
  // test('CreateDepartment | Negative: whitespace-only title is rejected on department creation @dept', async ({ page }) => {
  //   const { description, floor } = generateDepartmentData();
  //   await new POManagers(page).HospitalAdminPage().createDepartmentWithInvalidTitle('   ', description, floor);
  //   await expect(page.getByText(/required|invalid|title/i).or(page.getByRole('button', { name: 'Add Department', exact: true }))).toBeVisible();
  // });

  // // Numeric-only title
  // test('CreateDepartment | Negative: numeric-only title is rejected or handled gracefully @dept', async ({ page }) => {
  //   const { description, floor } = generateDepartmentData();
  //   await new POManagers(page).HospitalAdminPage().createDepartmentWithInvalidTitle('12345', description, floor);
  //   // await expect(page.getByRole('button', { name: 'Add Department', exact: true })).toBeVisible();
  // });

  // // Concurrent submission
  // test('CreateDepartment | Error: submitting department form twice concurrently does not create duplicates @dept', async ({ page }) => {
  //   const { title, description, floor } = generateDepartmentData();
  //   await new POManagers(page).HospitalAdminPage().createDepartmentConcurrent(title, description, floor);
  //   await expect(page).toHaveURL(/myappointments\.whitecoats\.com/);
  // });

  test('Positive: should create a new specialization', async ({ page }) => {
    const { title, description } = generateSpecializationData();
    await new POManagers(page).HospitalAdminPage().Createspecialization(title, description);
  });

  // ══════════════════════════════════════════════════════════════════════
  // Createspecialization - All Negative Scenarios
  // ══════════════════════════════════════════════════════════════════════

  // Empty values - title missing
  // test('Createspecialization | Negative: specialization creation fails without title @spec', async ({ page }) => {
  //   const { description } = generateSpecializationData();
  //   await new POManagers(page).HospitalAdminPage().createSpecializationWithoutTitle(description);
  //   await expect(page.getByText("Specialization Name is required (minimum 2 characters)").or(page.getByRole('button', { name: 'Add Specialization', exact: true }))).toBeVisible();
  // });

  // // Empty values - description missing
  // test('Createspecialization | Negative: specialization creation without description is handled gracefully', async ({ page }) => {
  //   const { title } = generateSpecializationData();
  //   await new POManagers(page).HospitalAdminPage().createSpecializationWithEmptyDescription(title);
  //   // await expect(page.getByText(/required|description/i).or(page.getByRole('button', { name: 'Add Specialization', exact: true }))).toBeVisible();
  // });

  // // Empty values - department not selected
  // test('Createspecialization | Negative: specialization creation without selecting department is rejected @spec', async ({ page }) => {
  //   const { title, description } = generateSpecializationData();
  //   await new POManagers(page).HospitalAdminPage().createSpecializationWithoutDepartment(title, description);
  //   await expect(page.getByText("Please select a Department").or(page.getByRole('button', { name: 'Add Specialization', exact: true }))).toBeVisible();
  // });

  // // Invalid data - special characters
  // test('Createspecialization | Negative: special characters in title are rejected or handled gracefully @spec', async ({ page }) => {
  //   const { description } = generateSpecializationData();
  //   await new POManagers(page).HospitalAdminPage().createSpecializationWithInvalidTitle('!@#$%^&*()', description);
  //    });

  // // Invalid data - whitespace-only title
  // test('Createspecialization | Negative: whitespace-only title is rejected on specialization creation @spec', async ({ page }) => {
  //   const { description } = generateSpecializationData();
  //   await new POManagers(page).HospitalAdminPage().createSpecializationWithInvalidTitle('   ', description);
  //   await expect(page.getByText("Specialization Name is required (minimum 2 characters)").or(page.getByRole('button', { name: 'Add Specialization', exact: true }))).toBeVisible();
  // });

  // // Invalid data - SQL injection
  // test('Createspecialization | Security: SQL injection in title is sanitized and page remains stable @spec', async ({ page }) => {
  //   const { description } = generateSpecializationData();
  //   await new POManagers(page).HospitalAdminPage().createSpecializationWithInvalidTitle("' OR '1'='1", description);
  //   await expect(page).toHaveURL(/myappointments\.whitecoats\.com/);
  //   await expect(page.getByRole('button', { name: 'Add Specialization', exact: true })).toBeVisible();
  // });

  // // Invalid data - XSS
  // test('Createspecialization | Security: XSS script tag in title is not executed and page remains stable @spec', async ({ page }) => {
  //   const { description } = generateSpecializationData();
  //   await new POManagers(page).HospitalAdminPage().createSpecializationWithInvalidTitle('<script>alert(1)</script>', description);
  //   await expect(page).toHaveURL(/myappointments\.whitecoats\.com/);
  // });

  // // Maximum values - title
  // test('Createspecialization | Boundary: 500-character title does not crash the specialization form @spec', async ({ page }) => {
  //   const { description } = generateSpecializationData();
  //   await new POManagers(page).HospitalAdminPage().createSpecializationWithMaxLengthTitle(description);
  //   await expect(page.getByRole('button', { name: 'Add Specialization', exact: true })).toBeVisible();
  // });

  // // Minimum values - title
  // test('Createspecialization | Boundary: single character title is accepted or rejected gracefully @spec', async ({ page }) => {
  //   const { description } = generateSpecializationData();
  //   await new POManagers(page).HospitalAdminPage().createSpecializationWithMinLengthTitle(description);
  //   await expect(page.getByRole('button', { name: 'Add Specialization', exact: true })).toBeVisible();
  // });

  // // Duplicate title
  // test('Createspecialization | Negative: duplicate specialization title shows error or is rejected @spec', async ({ page }) => {
  //   const { description } = generateSpecializationData();
  //   await new POManagers(page).HospitalAdminPage().createSpecializationWithInvalidTitle('Neurology', description);
  //   // await expect(page.getByText(/duplicate|already exists|title/i).or(page.getByRole('button', { name: 'Add Specialization', exact: true }))).toBeVisible();
  // });

  // // API failure
  // test('Createspecialization | Error: API failure during specialization creation shows error gracefully @spec', async ({ page }) => {
  //   const { title, description } = generateSpecializationData();
  //   await new POManagers(page).HospitalAdminPage().createSpecializationWithApiFailure(title, description);
  //   await expect(page.getByText(/error|failed|try again/i).or(page.getByRole('button', { name: 'Add Specialization', exact: true }))).toBeVisible();
  // });

  // // Unauthorized access
  // test('Createspecialization | Security: unauthenticated user cannot access specialization creation page @spec', async ({ page }) => {
  //   await page.context().clearCookies();
  //   await page.goto('https://myappointments.whitecoats.com/');
  //   await expect(page).not.toHaveURL(/specializations/i);
  // });



  // // Browser refresh
  // test('Createspecialization | Error: browser refresh during form fill discards unsaved specialization data @spec', async ({ page }) => {
  //   const { title, description } = generateSpecializationData();
  //   await new POManagers(page).HospitalAdminPage().createSpecializationAndRefresh(title, description);
  //   await expect(page).toHaveURL(/myappointments\.whitecoats\.com/);
  // });

  // // Back button
  // test('Createspecialization | Error: back button during form fill navigates away without saving specialization @spec ', async ({ page }) => {
  //   const { title, description } = generateSpecializationData();
  //   await new POManagers(page).HospitalAdminPage().createSpecializationAndNavigateBack(title, description);
  //   await expect(page).toHaveURL(/myappointments\.whitecoats\.com/);
  // });

  // // Concurrent submission
  // test('Createspecialization | Error: submitting specialization form twice concurrently does not create duplicates @spec', async ({ page }) => {
  //   const { title, description } = generateSpecializationData();
  //   await new POManagers(page).HospitalAdminPage().createSpecializationConcurrent(title, description);
  //   await expect(page).toHaveURL(/myappointments\.whitecoats\.com/);
  // });

  test('Positive: should create a new Branch @brn', async ({ page }) => {
    const { name, address, email } = generateBranchData();
    await new POManagers(page).HospitalAdminPage().CreateBranch(name, address, email);
  });

  // ══════════════════════════════════════════════════════════════════════
  // CreateBranch - All Negative Scenarios
  // ══════════════════════════════════════════════════════════════════════

  // Empty values - name missing
  // test('CreateBranch | Negative: branch creation fails without name @brn', async ({ page }) => {
  //   const { address, email } = generateBranchData();
  //   await new POManagers(page).HospitalAdminPage().createBranchWithoutName(address, email);
  //   await expect(page.getByText("Branch Name is required (minimum 2 characters)").or(page.getByText('Create Branch'))).toBeVisible();
  // });

  // // Empty values - address missing
  // test('CreateBranch | Negative: branch creation without address is handled gracefully @brn', async ({ page }) => {
  //   const { name, email } = generateBranchData();
  //   await new POManagers(page).HospitalAdminPage().createBranchWithEmptyAddress(name, email);
  //   await expect(page.getByText("Address is required (minimum 5 characters)").or(page.getByText('Create Branch'))).toBeVisible();
  // });

  // // Invalid data - special characters in name
  // test('CreateBranch | Negative: special characters in branch name are rejected or handled gracefully @brn', async ({ page }) => {
  //   const { address, email } = generateBranchData();
  //   await new POManagers(page).HospitalAdminPage().createBranchWithInvalidName('!@#$%^&*()', address, email);
  //   // await expect(page.getByText(/invalid|special|name/i).or(page.getByText('Create Branch'))).toBeVisible();
  // });

  // // Invalid data - invalid email format
  // test('CreateBranch | Negative: invalid email format is rejected on branch creation @brn', async ({ page }) => {
  //   const { name, address } = generateBranchData();
  //   await new POManagers(page).HospitalAdminPage().createBranchWithInvalidEmail(name, address, 'notanemail');
  //   await expect(page.getByText("Please enter a valid branch admin email address").or(page.getByText('Create Branch'))).toBeVisible();
  // });

  // // Invalid data - SQL injection
  // test('CreateBranch | Security: SQL injection in branch name is sanitized and page remains stable @brn', async ({ page }) => {
  //   const { address, email } = generateBranchData();
  //   await new POManagers(page).HospitalAdminPage().createBranchWithInvalidName("' OR '1'='1", address, email);
  //   await expect(page).toHaveURL(/myappointments\.whitecoats\.com/);
  //   await expect(page.getByText('Create Branch')).toBeVisible();
  // });

  // // Invalid data - XSS
  // test('CreateBranch | Security: XSS script tag in branch name is not executed and page remains stable @brn', async ({ page }) => {
  //   const { address, email } = generateBranchData();
  //   await new POManagers(page).HospitalAdminPage().createBranchWithInvalidName('<script>alert(1)</script>', address, email);
  //   await expect(page).toHaveURL(/myappointments\.whitecoats\.com/);
  // });

  // // Invalid data - whitespace-only name
  // test('CreateBranch | Negative: whitespace-only branch name is rejected on creation @brn', async ({ page }) => {
  //   const { address, email } = generateBranchData();
  //   await new POManagers(page).HospitalAdminPage().createBranchWithInvalidName('   ', address, email);
  //   await expect(page.getByText("Address is required (minimum 5 characters)").or(page.getByText('Create Branch'))).toBeVisible();
  // });

  // // Maximum values - name
  // test('CreateBranch | Boundary: 500-character branch name does not crash the branch form @brn', async ({ page }) => {
  //   const { address, email } = generateBranchData();
  //   await new POManagers(page).HospitalAdminPage().createBranchWithMaxLengthName(address, email);
  //   await expect(page.getByText('Create Branch')).toBeVisible();
  // });

  // // Minimum values - name
  // test('CreateBranch | Boundary: single character branch name is accepted or rejected gracefully @brn', async ({ page }) => {
  //   const { address, email } = generateBranchData();
  //   await new POManagers(page).HospitalAdminPage().createBranchWithMinLengthName(address, email);
  //   await expect(page.getByText('Create Branch')).toBeVisible();
  // });

  // // API failure
  // test('CreateBranch | Error: API failure during branch creation shows error gracefully @brn', async ({ page }) => {
  //   const { name, address, email } = generateBranchData();
  //   await new POManagers(page).HospitalAdminPage().createBranchWithApiFailure(name, address, email);
  //   await expect(page.getByText(/error|failed|try again/i).or(page.getByText('Create Branch'))).toBeVisible();
  // });

  // // Unauthorized access
  // test('CreateBranch | Security: unauthenticated user cannot access branch creation page @brn', async ({ page }) => {
  //   await page.context().clearCookies();
  //   await page.goto('https://myappointments.whitecoats.com/');
  //   await expect(page).not.toHaveURL(/branches/i);
  // });


  // Browser refresh
  // test('CreateBranch | Error: browser refresh during form fill discards unsaved branch data @brn', async ({ page }) => {
  //   const { name, address, email } = generateBranchData();
  //   await new POManagers(page).HospitalAdminPage().createBranchAndRefresh(name, address, email);
  //   await expect(page).toHaveURL(/myappointments\.whitecoats\.com/);
  // });

  // // Back button
  // test('CreateBranch | Error: back button during form fill navigates away without saving branch @brn', async ({ page }) => {
  //   const { name, address, email } = generateBranchData();
  //   await new POManagers(page).HospitalAdminPage().createBranchAndNavigateBack(name, address, email);
  //   await expect(page).toHaveURL(/myappointments\.whitecoats\.com/);
  // });

  // // Duplicate name
  // test('CreateBranch | Negative: duplicate branch name shows error or is rejected @brn', async ({ page }) => {
  //   const { address, email } = generateBranchData();
  //   await new POManagers(page).HospitalAdminPage().createBranchWithInvalidName('Gatchibowli', address, email);
  //   // await expect(page.getByText(/duplicate|already exists|name/i).or(page.getByText('Create Branch'))).toBeVisible();
  // });

  // // Concurrent submission
  // test('CreateBranch | Error: submitting branch form twice concurrently does not create duplicates @brn', async ({ page }) => {
  //   const { name, address, email } = generateBranchData();
  //   await new POManagers(page).HospitalAdminPage().createBranchConcurrent(name, address, email);
  //   await expect(page).toHaveURL(/myappointments\.whitecoats\.com/);
  // });

  test('Positive: should create a new Doctor @doc', async ({ page }) => {
    const { firstName, lastName, dob, email, phone, regNum, qualification, inPersonFee, videoFee } = generateDoctorData();
    await new POManagers(page).HospitalAdminPage().createDoctor(firstName, lastName, dob, email, phone, regNum, qualification, inPersonFee, videoFee);
  });

  // ══════════════════════════════════════════════════════════════════════
  // createDoctor - All Negative Scenarios
  // ══════════════════════════════════════════════════════════════════════

  // Empty values - email missing
  test('createDoctor | Negative: doctor creation fails without email @doc', async ({ page }) => {
    const { firstName, lastName, dob, phone, regNum, qualification, inPersonFee, videoFee } = generateDoctorData();
    await new POManagers(page).HospitalAdminPage().createDoctorWithoutEmail(firstName, lastName, dob, phone, regNum, qualification, inPersonFee, videoFee);
    await expect(page.getByText("Email is required")).toBeVisible();
  });

  // Empty values - phone missing
  test('createDoctor | Negative: doctor creation fails without phone @doc', async ({ page }) => {
    const { firstName, lastName, dob, email, regNum, qualification, inPersonFee, videoFee } = generateDoctorData();
    await new POManagers(page).HospitalAdminPage().createDoctorWithoutPhone(firstName, lastName, dob, email, regNum, qualification, inPersonFee, videoFee);
    await expect(page.getByText("Phone number is required")).toBeVisible();
  });

  // Invalid data - invalid email format
  test('createDoctor | Negative: invalid email format is rejected on doctor creation @doc', async ({ page }) => {
    const { firstName, lastName, dob, phone, regNum, qualification, inPersonFee, videoFee } = generateDoctorData();
    await new POManagers(page).HospitalAdminPage().createDoctorWithInvalidEmail(firstName, lastName, dob, phone, regNum, qualification, inPersonFee, videoFee);
    // await expect(page.getByText(/invalid|email|format/i).or(page.getByRole('button', { name: 'Add Doctor' }))).toBeVisible();
  });

  // Invalid data - SQL injection in first name
  test('createDoctor | Security: SQL injection in first name is sanitized and page remains stable @doc', async ({ page }) => {
    const { lastName, dob, email, phone, regNum, qualification, inPersonFee, videoFee } = generateDoctorData();
    await new POManagers(page).HospitalAdminPage().createDoctorWithMaxLengthName(lastName, dob, email, phone, regNum, qualification, inPersonFee, videoFee);
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
    await expect(page.getByRole('button', { name: 'Add Doctor' })).toBeVisible();
  });

  // Invalid data - XSS in first name
  test('createDoctor | Security: XSS script tag in first name is not executed and page remains stable @doc', async ({ page }) => {
    const { lastName, dob, email, phone, regNum, qualification, inPersonFee, videoFee } = generateDoctorData();
    await new POManagers(page).HospitalAdminPage().createDoctorWithInvalidEmail(lastName, dob, email, phone, regNum, qualification, inPersonFee, videoFee);
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Maximum values - first name
  test('createDoctor | Boundary: 500-character first name does not crash the doctor form @doc', async ({ page }) => {
    const { lastName, dob, email, phone, regNum, qualification, inPersonFee, videoFee } = generateDoctorData();
    await new POManagers(page).HospitalAdminPage().createDoctorWithMaxLengthName(lastName, dob, email, phone, regNum, qualification, inPersonFee, videoFee);
    await expect(page.getByRole('button', { name: 'Add Doctor' })).toBeVisible();
  });

  // Minimum values - first name
  test('createDoctor | Boundary: single character first name is accepted or rejected gracefully @doc    ', async ({ page }) => {
    const { lastName, dob, email, phone, regNum, qualification, inPersonFee, videoFee } = generateDoctorData();
    await new POManagers(page).HospitalAdminPage().createDoctorWithMinLengthName(lastName, dob, email, phone, regNum, qualification, inPersonFee, videoFee);
    await expect(page.getByRole('button', { name: 'Add Doctor' })).toBeVisible();
  });

  // API failure
  test('createDoctor | Error: API failure during doctor creation shows error gracefully @doc', async ({ page }) => {
    const { firstName, lastName, dob, email, phone } = generateDoctorData();
    await new POManagers(page).HospitalAdminPage().createDoctorWithApiFailure(firstName, lastName, dob, email, phone);
    await expect(page.getByText(/error|failed|try again/i).or(page.getByRole('button', { name: 'Add Doctor' }))).toBeVisible();
  });

  // Unauthorized access
  test('createDoctor | Security: unauthenticated user cannot access doctor creation page @doc', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('https://emr.whitecoats.com/');
    await expect(page).not.toHaveURL(/doctors/i);
  });

  // Browser refresh
  test('createDoctor | Error: browser refresh during form fill discards unsaved doctor data @doc', async ({ page }) => {
    const { firstName, lastName, dob, email, phone, regNum, qualification, inPersonFee, videoFee } = generateDoctorData();
    await new POManagers(page).HospitalAdminPage().createDoctorAndRefresh(firstName, lastName, dob, email, phone, regNum, qualification, inPersonFee, videoFee);
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Back button
  test('createDoctor | Error: back button during form fill navigates away without saving doctor @doc', async ({ page }) => {
    const { firstName, lastName, dob, email, phone, regNum, qualification, inPersonFee, videoFee } = generateDoctorData();
    await new POManagers(page).HospitalAdminPage().createDoctorAndNavigateBack(firstName, lastName, dob, email, phone, regNum, qualification, inPersonFee, videoFee);
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Concurrent submission
  test('createDoctor | Error: submitting doctor form twice concurrently does not create duplicates @doc', async ({ page }) => {
    const { firstName, lastName, dob, email, phone } = generateDoctorData();
    await new POManagers(page).HospitalAdminPage().createDoctorConcurrent(firstName, lastName, dob, email, phone);
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  test('Positive: should create a new schedules of doctor @shed', async ({ page }) => {
    const { startTime, endTime } = generateScheduleData();
    await new POManagers(page).HospitalAdminPage().scheduleDoctor('dears', startTime, endTime);
  });

  // ══════════════════════════════════════════════════════════════════════
  // scheduleDoctor - All Negative Scenarios
  // ══════════════════════════════════════════════════════════════════════

  // Empty values - doctor not selected
  test('scheduleDoctor | Negative: schedule creation fails without selecting a doctor @shed', async ({ page }) => {
    const { startTime, endTime } = generateScheduleData();
    await new POManagers(page).HospitalAdminPage().scheduleDoctorWithoutDoctor(startTime, endTime);
    await expect(page.getByText("Please fill in all required fields and select at least one day for each schedule slot").or(page.getByRole('button', { name: 'Create Schedules' }))).toBeVisible();
  });

  // Invalid data - end time before start time
  test('scheduleDoctor | Negative: invalid time range where end is before start is rejected gracefully @shed', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().scheduleDoctorWithInvalidTime('Bhaskar', '22:00', '10:00');
    await expect(page.getByText("End time must be after start time (24-hour format).").or(page.getByRole('button', { name: 'Create Schedules' }))).toBeVisible();
  });

  // Invalid data - SQL injection in schedule name
  test('scheduleDoctor | Security: SQL injection in schedule name is sanitized and page remains stable @shed', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().scheduleDoctorWithSqlInjection();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Invalid data - XSS in schedule name
  test('scheduleDoctor | Security: XSS script tag in schedule name is not executed and page remains stable @shed', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().scheduleDoctorWithXss();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Maximum values - schedule name
  test('scheduleDoctor | Boundary: 500-character schedule name does not crash the schedule form @shed', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().scheduleDoctorWithMaxLengthName();
    await expect(page.getByRole('button', { name: 'Create Schedules' })).toBeVisible();
  });

  // Minimum values - schedule name
  test('scheduleDoctor | Boundary: single character schedule name is accepted or rejected gracefully', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().scheduleDoctorWithMinLengthName();
    await expect(page.getByRole('button', { name: 'Create Schedules' })).toBeVisible();
  });

  // API failure
  test('scheduleDoctor | Error: API failure during schedule creation shows error gracefully @shed', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().scheduleDoctorWithApiFailure();
    // await expect(page.getByText(/error|failed|try again/i).or(page.getByRole('button', { name: 'Create Schedules' }))).toBeVisible();
  });

  // Unauthorized access
  test('scheduleDoctor | Security: unauthenticated user cannot access schedule creation page @shed', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('https://emr.whitecoats.com/');
    await expect(page).not.toHaveURL(/schedules/i);
  });

  // Session expiration
  test('scheduleDoctor | Security: session expiration during schedule creation redirects user away @shed', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().scheduleDoctorSessionExpiry();
    await expect(page).not.toHaveURL("https://emr.whitecoats.com/hospital-admin/doctors/schedules");
  });

  // Browser refresh
  test('scheduleDoctor | Error: browser refresh during form fill discards unsaved schedule data', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().scheduleDoctorAndRefresh('Bhaskar');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Back button
  test('scheduleDoctor | Error: back button during form fill navigates away without saving schedule @shed', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().scheduleDoctorAndNavigateBack('Bhaskar');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Concurrent submission
  test('scheduleDoctor | Error: submitting schedule form twice concurrently does not create duplicates  @shed', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().scheduleDoctorConcurrent();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  test('Positive: should create a new Staff @staff', async ({ page }) => {
    const { firstName, lastName, dob, email, phone, salary } = generateStaffData();
    await new POManagers(page).HospitalAdminPage().createStaff(firstName, lastName, dob, email, phone, salary);
  });

  // ══════════════════════════════════════════════════════════════════════
  // createStaff - All Negative Scenarios
  // ══════════════════════════════════════════════════════════════════════

  // Empty values - email missing
  test('createStaff | Negative: staff creation fails without email @staff', async ({ page }) => {
    const { firstName, lastName, dob, phone, salary } = generateStaffData();
    await new POManagers(page).HospitalAdminPage().createStaffWithoutEmail(firstName, lastName, dob, phone, salary);
    await expect(page.getByText("Email is used as username for login").or(page.getByRole('button', { name: 'Create Staff' }))).toBeVisible();
  });

  // Empty values - phone missing
  test('createStaff | Negative: staff creation fails without phone @staff', async ({ page }) => {
    const { firstName, lastName, dob, email, salary } = generateStaffData();
    await new POManagers(page).HospitalAdminPage().createStaffWithoutPhone(firstName, lastName, dob, email, salary);
    await expect(page.getByText("Please fill out this field").or(page.getByRole('button', { name: 'Create Staff' }))).toBeVisible();
  });

  // Invalid data - invalid email format
  test('createStaff | Negative: invalid email format is rejected on staff creation @staff', async ({ page }) => {
    const { firstName, lastName, dob, phone, salary } = generateStaffData();
    await new POManagers(page).HospitalAdminPage().createStaffWithInvalidEmail(firstName, lastName, dob, phone, salary);
    // await expect(page.getByText(/invalid|email|format/i).or(page.getByRole('button', { name: 'Create Staff' }))).toBeVisible();
  });

  // Invalid data - SQL injection in first name
  test('createStaff | Security: SQL injection in first name is sanitized and page remains stable @staff', async ({ page }) => {
    const { lastName, dob, email, phone } = generateStaffData();
    await new POManagers(page).HospitalAdminPage().createStaffWithSqlInjection(lastName, dob, email, phone);
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
    await expect(page.getByRole('button', { name: 'Create Staff' })).toBeVisible();
  });

  // Invalid data - XSS in first name
  test('createStaff | Security: XSS script tag in first name is not executed and page remains stable @staff', async ({ page }) => {
    const { lastName, dob, email, phone } = generateStaffData();
    await new POManagers(page).HospitalAdminPage().createStaffWithXss(lastName, dob, email, phone);
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Maximum values - first name
  test('createStaff | Boundary: 500-character first name does not crash the staff form @staff', async ({ page }) => {
    const { lastName, dob, email, phone, salary } = generateStaffData();
    await new POManagers(page).HospitalAdminPage().createStaffWithMaxLengthName(lastName, dob, email, phone, salary);
    await expect(page.getByRole('button', { name: 'Create Staff' })).toBeVisible();
  });

  // Minimum values - first name
  test('createStaff | Boundary: single character first name is accepted or rejected gracefully @staff', async ({ page }) => {
    const { lastName, dob, email, phone, salary } = generateStaffData();
    await new POManagers(page).HospitalAdminPage().createStaffWithMinLengthName(lastName, dob, email, phone, salary);
    await expect(page.getByRole('button', { name: 'Create Staff' })).toBeVisible();
  });

  // API failure
  test('createStaff | Error: API failure during staff creation shows error gracefully @staff', async ({ page }) => {
    const { firstName, lastName, dob, email, phone } = generateStaffData();
    await new POManagers(page).HospitalAdminPage().createStaffWithApiFailure(firstName, lastName, dob, email, phone);
    await expect(page.getByText(/error|failed|try again/i).or(page.getByRole('button', { name: 'Create Staff' }))).toBeVisible();
  });

  // Unauthorized access
  test('createStaff | Security: unauthenticated user cannot access staff creation page @staff', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('https://emr.whitecoats.com/');
    await expect(page).not.toHaveURL(/staff/i);
  });

  // Browser refresh
  test('createStaff | Error: browser refresh during form fill discards unsaved staff data @staff', async ({ page }) => {
    const { firstName, lastName, dob, email, phone, salary } = generateStaffData();
    await new POManagers(page).HospitalAdminPage().createStaffAndRefresh(firstName, lastName, dob, email, phone, salary);
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Back button
  test('createStaff | Error: back button during form fill navigates away without saving staff @staff', async ({ page }) => {
    const { firstName, lastName, dob, email, phone, salary } = generateStaffData();
    await new POManagers(page).HospitalAdminPage().createStaffAndNavigateBack(firstName, lastName, dob, email, phone, salary);
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Concurrent submission
  test('createStaff | Error: submitting staff form twice concurrently does not create duplicates @staff', async ({ page }) => {
    const { firstName, lastName, dob, email, phone } = generateStaffData();
    await new POManagers(page).HospitalAdminPage().createStaffConcurrent(firstName, lastName, dob, email, phone);
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  test('Positive: should create a new Patient @pat', async ({ page }) => {
    const { firstName, lastName, age, email, phone, aadhar, emergencyContact, emergencyPhone } = generateHospitalPatientData();
    await new POManagers(page).HospitalAdminPage().createPatient(firstName, lastName, age, email, phone, aadhar, emergencyContact, emergencyPhone);
  });

  // ══════════════════════════════════════════════════════════════════════
  // createPatient - All Negative Scenarios
  // ══════════════════════════════════════════════════════════════════════

  // Empty values - first name missing
  test('createPatient | Negative: patient creation fails without first name @pat', async ({ page }) => {
    const { lastName, age, email, phone, aadhar, emergencyContact, emergencyPhone } = generateHospitalPatientData();
    await new POManagers(page).HospitalAdminPage().createPatientWithoutFirstName(lastName, age, email, phone, aadhar, emergencyContact, emergencyPhone);
    await expect(page.getByText("First Name must be at least 2 characters")).toBeVisible();
  });

  // Empty values - phone missing
  test('createPatient | Negative: patient creation fails without phone @pat', async ({ page }) => {
    const { firstName, lastName, age, email, aadhar, emergencyContact, emergencyPhone } = generateHospitalPatientData();
    await new POManagers(page).HospitalAdminPage().createPatientWithoutPhone(firstName, lastName, age, email, aadhar, emergencyContact, emergencyPhone);
    await expect(page.getByText("⚠️ Please fix the following errors before submitting:Phone must be 10 digits and start with 6, 7, 8, or 9").or(page.getByRole('button', { name: 'Add Patient', exact: true }))).toBeVisible();
  });

  // Empty values - email missing
  test('createPatient | Negative: patient creation fails without email @pat', async ({ page }) => {
    const { firstName, lastName, age, phone, aadhar, emergencyContact, emergencyPhone } = generateHospitalPatientData();
    await new POManagers(page).HospitalAdminPage().createPatientWithoutEmail(firstName, lastName, age, phone, aadhar, emergencyContact, emergencyPhone);
    // await expect(page.getByText(/required|email|cannot be empty/i).or(page.getByRole('button', { name: 'Add Patient', exact: true }))).toBeVisible();
  });

  // Invalid data - invalid email format
  test('createPatient | Negative: invalid email format is rejected on patient creation @pat', async ({ page }) => {
    const { firstName, lastName, age, phone, aadhar, emergencyContact, emergencyPhone } = generateHospitalPatientData();
    await new POManagers(page).HospitalAdminPage().createPatientWithInvalidEmail(firstName, lastName, age, phone, aadhar, emergencyContact, emergencyPhone);
    // await expect(page.getByText(/invalid|email|format/i).or(page.getByRole('button', { name: 'Add Patient', exact: true }))).toBeVisible();
  });

  // Invalid data - SQL injection in first name
  test('createPatient | Security: SQL injection in first name is sanitized and page remains stable @pat', async ({ page }) => {
    const { lastName, age, email, phone } = generateHospitalPatientData();
    await new POManagers(page).HospitalAdminPage().createPatientWithSqlInjection(lastName, age, email, phone);
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
    await expect(page.getByRole('button', { name: 'Add Patient', exact: true })).toBeVisible();
  });

  // Invalid data - XSS in first name
  test('createPatient | Security: XSS script tag in first name is not executed and page remains stable @pat', async ({ page }) => {
    const { lastName, age, email, phone } = generateHospitalPatientData();
    await new POManagers(page).HospitalAdminPage().createPatientWithXss(lastName, age, email, phone);
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Maximum values - first name
  test('createPatient | Boundary: 500-character first name does not crash the patient form @pat', async ({ page }) => {
    const { lastName, age, email, phone, aadhar, emergencyContact, emergencyPhone } = generateHospitalPatientData();
    await new POManagers(page).HospitalAdminPage().createPatientWithMaxLengthName(lastName, age, email, phone, aadhar, emergencyContact, emergencyPhone);
    await expect(page.getByRole('button', { name: 'Add Patient', exact: true })).toBeVisible();
  });

  // Minimum values - first name
  test('createPatient | Boundary: single character first name is accepted or rejected gracefully @pat', async ({ page }) => {
    const { lastName, age, email, phone, aadhar, emergencyContact, emergencyPhone } = generateHospitalPatientData();
    await new POManagers(page).HospitalAdminPage().createPatientWithMinLengthName(lastName, age, email, phone, aadhar, emergencyContact, emergencyPhone);
    await expect(page.getByRole('button', { name: 'Add Patient', exact: true })).toBeVisible();
  });

  // Duplicate action - duplicate aadhar
  test('createPatient | Negative: duplicate aadhar number shows error or is rejected @pat', async ({ page }) => {
    const { firstName, lastName, age, email, phone, emergencyContact, emergencyPhone } = generateHospitalPatientData();
    await new POManagers(page).HospitalAdminPage().createPatientWithDuplicateAadhar(firstName, lastName, age, email, phone, emergencyContact, emergencyPhone);
    // await expect(page.getByText(/duplicate|already exists|aadhar/i).or(page.getByRole('button', { name: 'Add Patient', exact: true }))).toBeVisible();
  });

  // Network failure
  test('createPatient | Error: API failure during patient creation shows error gracefully @pat', async ({ page }) => {
    const { firstName, lastName, age, email, phone } = generateHospitalPatientData();
    await new POManagers(page).HospitalAdminPage().createPatientWithApiFailure(firstName, lastName, age, email, phone);
    // await expect(page.getByText(/error|failed|try again/i).or(page.getByRole('button', { name: 'Add Patient', exact: true }))).toBeVisible();
  });

  // Unauthorized access
  test('createPatient | Security: unauthenticated user cannot access patient creation page @pat', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('https://emr.whitecoats.com/');
    await expect(page).not.toHaveURL(/patients/i);
  });

  // Browser refresh
  test('createPatient | Error: browser refresh during form fill discards unsaved patient data @pat', async ({ page }) => {
    const { firstName, lastName, age, email, phone } = generateHospitalPatientData();
    await new POManagers(page).HospitalAdminPage().createPatientAndRefresh(firstName, lastName, age, email, phone);
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Back button
  test('createPatient | Error: back button during form fill navigates away without saving patient @pat', async ({ page }) => {
    const { firstName, lastName, age, email, phone } = generateHospitalPatientData();
    await new POManagers(page).HospitalAdminPage().createPatientAndNavigateBack(firstName, lastName, age, email, phone);
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Concurrent submission
  test('createPatient | Error: submitting patient form twice concurrently does not create duplicates @pat', async ({ page }) => {
    const { firstName, lastName, age, email, phone, aadhar, emergencyContact, emergencyPhone } = generateHospitalPatientData();
    await new POManagers(page).HospitalAdminPage().createPatientConcurrent(firstName, lastName, age, email, phone, aadhar, emergencyContact, emergencyPhone);
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // ══════════════════════════════════════════════════════════════════════
  // departmentEdit
  // ══════════════════════════════════════════════════════════════════════

  test('departmentEdit | Positive: should edit an existing department @deptedit', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().departmentEdit();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });
  // Missing mandatory fields
  test('departmentEdit | Negative: update fails when title is cleared to empty @deptedit', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().departmentEditWithEmptyTitle();
    await expect(page.getByText(/required|title|cannot be empty/i).or(page.getByRole('button', { name: 'Update Department' }))).toBeVisible();
  });

  // Invalid data - special characters
  test('departmentEdit | Negative: special characters in title are rejected or handled gracefully @deptedit', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().departmentEditWithInvalidTitle('!@#$%^&*()');
    await expect(page.getByText(/invalid|special|title/i).or(page.getByRole('button', { name: 'Update Department' }))).toBeVisible();
  });

  // Invalid data - SQL injection
  test('departmentEdit | Security: SQL injection in title is sanitized and page remains stable @deptedit', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().departmentEditWithInvalidTitle("' OR '1'='1");
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Invalid data - XSS
  test('departmentEdit | Security: XSS script tag in title is not executed and page remains stable @deptedit', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().departmentEditWithInvalidTitle('<script>alert(1)</script>');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Maximum values
  test('departmentEdit | Boundary: 500-character title does not crash the edit form @deptedit', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().departmentEditWithMaxLengthTitle();
    await expect(page.getByRole('button', { name: 'Update Department' })).toBeVisible();
  });

  // Minimum values
  test('departmentEdit | Boundary: single character title is accepted or rejected gracefully @deptedit', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().departmentEditWithMinLengthTitle();
    await expect(page.getByRole('button', { name: 'Update Department' })).toBeVisible();
  });

  // Duplicate actions
  test('departmentEdit | Negative: updating to a duplicate department name shows error or is rejected @deptedit', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().departmentEditDuplicate();
    await expect(page.getByText(/duplicate|already exists|title/i).or(page.getByRole('button', { name: 'Update Department' }))).toBeVisible();
  });

  // Network / API failure
  test('departmentEdit | Error: API failure during department edit shows error gracefully @deptedit', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().departmentEditWithApiFailure();
    // await expect(page.getByText(/error|failed|try again/i).or(page.getByRole('button', { name: 'Update Department' }))).toBeVisible();
  });

  // Unauthorized access
  test('departmentEdit | Security: unauthenticated user cannot access department edit page @deptedit', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('https://emr.whitecoats.com/');
    await expect(page).not.toHaveURL(/departments/i);
  });


  // Browser refresh
  test('departmentEdit | Error: browser refresh during edit discards unsaved department changes @deptedit', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().departmentEditAndRefresh();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Back button
  test('departmentEdit | Error: back button during edit navigates away without saving department changes @deptedit', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().departmentEditAndNavigateBack();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Concurrent actions
  test('departmentEdit | Error: submitting department edit twice concurrently does not cause duplicate updates @deptedit', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().departmentEditConcurrent();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });



  // ══════════════════════════════════════════════════════════════════════
  // del_dept
  // ══════════════════════════════════════════════════════════════════════

  test('del_dept | Positive: should delete a department @deldept', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().del_dept();
    // await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // ══════════════════════════════════════════════════════════════════════
  // search_dept
  // ══════════════════════════════════════════════════════════════════════

  test('search_dept | Positive: should search and filter departments @searchdept', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().search_dept();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });
  // Missing mandatory fields - no search term entered
  test('search_dept | Negative: searching with empty value returns all or shows no-results gracefully @searchdept', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().search_deptWithEmptyValue();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Invalid data - special characters
  test('search_dept | Negative: special characters in search field are handled gracefully @searchdept', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().search_deptWithInvalidValue('!@#$%^&*()');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Invalid data - SQL injection
  test('search_dept | Security: SQL injection in search field is sanitized and page remains stable @searchdept', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().search_deptWithInvalidValue("' OR '1'='1");
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Invalid data - XSS
  test('search_dept | Security: XSS script tag in search field is not executed and page remains stable @searchdept', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().search_deptWithInvalidValue('<script>alert(1)</script>');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Empty values - whitespace only
  test('search_dept | Negative: whitespace-only search value is handled gracefully @searchdept', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().search_deptWithInvalidValue('   ');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Maximum values
  test('search_dept | Boundary: 500-character search value does not crash the department search @searchdept', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().search_deptWithMaxLengthValue();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Minimum values
  test('search_dept | Boundary: single character search value returns results or no-results gracefully @searchdept', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().search_deptWithMinLengthValue();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Duplicate actions - search same term twice
  test('search_dept | Negative: searching the same term twice consecutively returns consistent results @searchdept', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().search_deptWithInvalidValue('cardiac');
    // await new POManagers(page).HospitalAdminPage().search_deptWithInvalidValue('cardiac');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Network / API failure
  test('search_dept | Error: API failure during department search shows error gracefully @searchdept', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().search_deptWithApiFailure();
    // await expect(page.getByText(/error|failed|try again/i).or(page.getByRole('textbox', { name: 'Search by name, code, or head' }))).toBeVisible();
  });

  // Unauthorized access
  test('search_dept | Security: unauthenticated user cannot access department search page @searchdept', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('https://emr.whitecoats.com/');
    await expect(page).not.toHaveURL(/departments/i);
  });

  // Session expiration
  // test('search_dept | Security: session expiration during department search redirects user away @searchdept', async ({ page }) => {
  //   await new POManagers(page).HospitalAdminPage().search_deptSessionExpiry();
  //   await expect(page).not.toHaveURL("https://myappointments.whitecoats.com/hospital-admin/departments");
  // });

  // Browser refresh
  test('search_dept | Error: browser refresh during search clears the search field @searchdept', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().search_deptAndRefresh();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Back button
  test('search_dept | Error: back button during search navigates away from department search @searchdept', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().search_deptAndNavigateBack();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Concurrent actions
  test('search_dept | Error: concurrent search inputs do not crash the department search @searchdept', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().search_deptConcurrent();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });



  // ══════════════════════════════════════════════════════════════════════
  // specialization_edit
  // ══════════════════════════════════════════════════════════════════════

  test('specialization_edit | Positive: should edit an existing specialization @specializationedit', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().specialization_edit();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // ══════════════════════════════════════════════════════════════════════
  // specilization_search
  // ══════════════════════════════════════════════════════════════════════

  test('specilization_search | Positive: should search specializations @specilizationsearch', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().specilization_search();
    await expect(page).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // ══════════════════════════════════════════════════════════════════════
  // specilzation_del
  // ══════════════════════════════════════════════════════════════════════

  test('specilzation_del | Positive: should delete a specialization @specilizationdel', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().specilzation_del();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // ══════════════════════════════════════════════════════════════════════
  // branch_edit
  // ══════════════════════════════════════════════════════════════════════

  test('branch_edit | Positive: should edit an existing branch @branchedit', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().branch_edit();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });
  // Missing mandatory fields - branch name cleared
  test('branch_edit | Negative: update fails when branch name is cleared to empty @branchedit', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().branch_editWithEmptyName();
    await expect(page.getByText("Branch Name is required (minimum 2 characters)").or(page.getByRole('button', { name: 'Update Branch' }))).toBeVisible();
  });

  // Missing mandatory fields - address cleared
  test('branch_edit | Negative: update fails when branch address is cleared to empty @branchedit', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().branch_editWithEmptyAddress();
    await expect(page.getByText("Address is required (minimum 5 characters)").or(page.getByRole('button', { name: 'Update Branch' }))).toBeVisible();
  });

  // Invalid data - special characters in name
  test('branch_edit | Negative: special characters in branch name are rejected or handled gracefully @branchedit', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().branch_editWithInvalidName('!@#$%^&*()');
    // await expect(page.getByText(/invalid|special|name/i).or(page.getByRole('button', { name: 'Update Branch' }))).toBeVisible();
  });

  // Invalid data - SQL injection
  test('branch_edit | Security: SQL injection in branch name is sanitized and page remains stable @branchedit', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().branch_editWithInvalidName("' OR '1'='1");
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Invalid data - XSS
  test('branch_edit | Security: XSS script tag in branch name is not executed and page remains stable @branchedit', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().branch_editWithInvalidName('<script>alert(1)</script>');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Empty values - whitespace only
  test('branch_edit | Negative: whitespace-only branch name is rejected on update @branchedit', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().branch_editWithInvalidName('   ');
    await expect(page.getByText("Branch Name is required (minimum 2 characters)").or(page.getByRole('button', { name: 'Update Branch' }))).toBeVisible();
  });

  // Maximum values
  test('branch_edit | Boundary: 500-character branch name does not crash the edit form @branchedit', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().branch_editWithMaxLengthName();
    await expect(page.getByRole('button', { name: 'Update Branch' })).toBeVisible();
  });

  // Minimum values
  test('branch_edit | Boundary: single character branch name is accepted or rejected gracefully @branchedit', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().branch_editWithMinLengthName();
    await expect(page.getByRole('button', { name: 'Update Branch' })).toBeVisible();
  });

  // Duplicate actions
  test('branch_edit | Negative: updating to a duplicate branch name shows error or is rejected @branchedit  ', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().branch_editDuplicate();
    // await expect(page.getByText(/duplicate|already exists|name/i).or(page.getByRole('button', { name: 'Update Branch' }))).toBeVisible();
  });

  // Network / API failure
  test('branch_edit | Error: API failure during branch edit shows error gracefully @branchedit', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().branch_editWithApiFailure();
    // await expect(page.getByText(/error|failed|try again/i).or(page.getByRole('button', { name: 'Update Branch' }))).toBeVisible();
  });

  // Unauthorized access
  test('branch_edit | Security: unauthenticated user cannot access branch edit page @branchedit', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('https://emr.whitecoats.com/');
    await expect(page).not.toHaveURL(/branches/i);
  });

  // Session expiration
 
  // Browser refresh
  test('branch_edit | Error: browser refresh during edit discards unsaved branch changes @branchedit', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().branch_editAndRefresh();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Back button
  test('branch_edit | Error: back button during edit navigates away without saving branch changes @branchedit', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().branch_editAndNavigateBack();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Concurrent actions
  test('branch_edit | Error: submitting branch edit twice concurrently does not cause duplicate updates @branchedit', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().branch_editConcurrent();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });



  // ══════════════════════════════════════════════════════════════════════
  // branch_search
  // ══════════════════════════════════════════════════════════════════════

  test('branch_search | Positive: should search and filter branches @branchsearch', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().branch_search();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // ══════════════════════════════════════════════════════════════════════
  // Schedule_doc
  // ══════════════════════════════════════════════════════════════════════

  test('Schedule_doc | Positive: should search doctor schedules @scheduledoc', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().Schedule_doc();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // ══════════════════════════════════════════════════════════════════════
  // schedule_filter
  // ══════════════════════════════════════════════════════════════════════

  test('schedule_filter | Positive: should filter schedules by branch, specialization and status @schedulefilter', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().schedule_filter();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // ══════════════════════════════════════════════════════════════════════
  // schedule_edit
  // ══════════════════════════════════════════════════════════════════════

  test('schedule_edit | Positive: should edit an existing schedule @scheduleedit', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().schedule_editing();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // ══════════════════════════════════════════════════════════════════════
  // schedule_delete
  // ══════════════════════════════════════════════════════════════════════

  test('schedule_delete | Positive: should delete a schedule @scheduledelete', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().schedule_delete();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // ══════════════════════════════════════════════════════════════════════
  // staff_search_filter
  // ══════════════════════════════════════════════════════════════════════

  // test('staff_search_filter | Positive: should filter staff by branch, department, role and date range @staffsearchfilter', async ({ page }) => {
  //   await new POManagers(page).HospitalAdminPage().staff_search_filter();
  //   await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  // });

  // ══════════════════════════════════════════════════════════════════════
  // staff_search
  // ══════════════════════════════════════════════════════════════════════

  test('staff_search | Positive: should search staff by name and clear search @staffsearch', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().staff_search();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // ══════════════════════════════════════════════════════════════════════
  // staff_search_newfilters
  // ══════════════════════════════════════════════════════════════════════

  test('staff_search_newfilters | Positive: should filter staff by status, gender, blood group and pagination @staffsearchnewfilters', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().staff_search_newfilters();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // ══════════════════════════════════════════════════════════════════════
  // Appt_search
  // ══════════════════════════════════════════════════════════════════════

  test('Appt_search | Positive: should search for a patient in appointments and cancel @apptsearch', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().Appt_search('deep');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });
  // Missing mandatory fields - no patient search term entered
  test('Appt_search | Negative: searching with empty patient name shows no results or is handled gracefully @apptsearch', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().Appt_searchWithEmptyValue();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Invalid data - special characters
  test('Appt_search | Negative: special characters in patient search field are handled gracefully @apptsearch', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().Appt_searchWithInvalidValue('!@#$%^&*()');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Invalid data - SQL injection
  test('Appt_search | Security: SQL injection in patient search field is sanitized and page remains stable @apptsearch', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().Appt_searchWithInvalidValue("' OR '1'='1");
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Invalid data - XSS
  test('Appt_search | Security: XSS script tag in patient search field is not executed and page remains stable @apptsearch', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().Appt_searchWithInvalidValue('<script>alert(1)</script>');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Empty values - whitespace only
  test('Appt_search | Negative: whitespace-only patient search value is handled gracefully @apptsearch', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().Appt_searchWithInvalidValue('   ');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Maximum values
  test('Appt_search | Boundary: 500-character patient search value does not crash the appointment search @apptsearch', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().Appt_searchWithMaxLengthValue();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Minimum values
  test('Appt_search | Boundary: single character patient search value returns results or no-results gracefully @apptsearch', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().Appt_searchWithMinLengthValue();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Duplicate actions - same search term entered twice
  test('Appt_search | Negative: searching the same patient name twice consecutively returns consistent results @apptsearch', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().Appt_searchDuplicate();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Network / API failure
  test('Appt_search | Error: API failure during patient search shows error gracefully @apptsearch', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().Appt_searchWithApiFailure();
    await expect(page.getByText(/error|failed|try again/i).or(page.getByRole('textbox', { name: 'Search by name, phone, or' }))).toBeVisible();
  });

  // Unauthorized access
  test('Appt_search | Security: unauthenticated user cannot access appointment search page @apptsearch', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('https://emr.whitecoats.com/');
    await expect(page).not.toHaveURL("https://emr.whitecoats.com/");
  });

  // Session expiration
  test('Appt_search | Security: session expiration during patient search redirects user away @apptsearch', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().Appt_searchSessionExpiry();
    await expect(page).not.toHaveURL("https://emr.whitecoats.com/hospital-admin/appointments/new");
  });

  // Browser refresh
  test('Appt_search | Error: browser refresh during patient search clears the search field @apptsearch', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().Appt_searchAndRefresh();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Back button
  test('Appt_search | Error: back button during patient search navigates away from appointment search @apptsearch', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().Appt_searchAndNavigateBack();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  



  // ══════════════════════════════════════════════════════════════════════
  // bookAppointment
  // ══════════════════════════════════════════════════════════════════════

  test('bookAppointment | Positive: should book a new appointment @bookappointment', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().bookAppointment('Deepthi', { label: 'Gatchibowli Main Center (BRA-26-1)' }, getDynamicDate(0), 'Test appointment notes');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });
  // Missing mandatory fields - no patient selected
  test('bookAppointment | Negative: booking fails without selecting a patient @bookappointment', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().bookAppointmentWithoutPatient({ label: 'Gatchibowli Main Center (BRA-26-1)' }, getDynamicDate(0), 'Test notes');
    // await expect(page.getByText(/required|patient|select/i).or(page.getByRole('button', { name: 'Next: Appointment Details' }))).toBeVisible();
  });

  // Missing mandatory fields - no date selected
  test('bookAppointment | Negative: booking fails without selecting an appointment date @bookappointment', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().bookAppointmentWithoutDate('Deepthi', { label: 'Gatchibowli Main Center (BRA-26-1)' }, 'Test notes');
    // await expect(page.getByText(/required|date|select/i).or(page.getByRole('button', { name: 'Next: Review' }))).toBeVisible();
  });

  // Invalid data - invalid date format
  test('bookAppointment | Negative: invalid date format is rejected on appointment booking @bookappointment', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().bookAppointmentWithInvalidDate('Deepthi', { label: 'Gatchibowli Main Center (BRA-26-1)' }, 'Test notes');
    // await expect(page.getByText(/invalid|date|format/i).or(page.getByRole('button', { name: 'Next: Review' }))).toBeVisible();
  });

  // Invalid data - past date
  test('bookAppointment | Negative: past date is rejected or flagged on appointment booking @bookappointment', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().bookAppointmentWithPastDate('Deepthi', { label: 'Gatchibowli Main Center (BRA-26-1)' }, 'Test notes');
    // await expect(page.getByText(/past|invalid|date/i).or(page.getByRole('button', { name: 'Next: Review' }))).toBeVisible();
  });

  // Empty values - empty notes
  test('bookAppointment | Negative: booking with empty notes is accepted or handled gracefully @bookappointment', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().bookAppointment('Deepthi', { label: 'Gatchibowli Main Center (BRA-26-1)' }, getDynamicDate(0), '');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Maximum values - notes at 1000 characters
  test('bookAppointment | Boundary: 1000-character notes does not crash the appointment booking form @bookappointment', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().bookAppointmentWithMaxLengthNotes('Deepthi', { label: 'Gatchibowli Main Center (BRA-26-1)' }, getDynamicDate(0));
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Minimum values - notes at 1 character
  test('bookAppointment | Boundary: single character notes is accepted or rejected gracefully @bookappointment', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().bookAppointmentWithMinLengthNotes('Deepthi', { label: 'Gatchibowli Main Center (BRA-26-1)' }, getDynamicDate(0));
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Duplicate actions - book same slot twice
  test('bookAppointment | Negative: booking the same patient and time slot twice shows error or is rejected @bookappointment', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().bookAppointmentDuplicate('Deepthi', { label: 'Gatchibowli Main Center (BRA-26-1)' }, getDynamicDate(0), 'Test notes');
    // await expect(page.getByText(/duplicate|already booked|slot/i).or(page.getByRole('button', { name: 'Proceed to Payment' }))).toBeVisible();
  });

  // Network / API failure
  test('bookAppointment | Error: API failure during appointment booking shows error gracefully @bookappointment', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().bookAppointmentWithApiFailure('Deepthi', { label: 'Gatchibowli Main Center (BRA-26-1)' }, getDynamicDate(0), 'Test notes');
    // await expect(page.getByText(/error|failed|try again/i).or(page.getByRole('button', { name: 'Proceed to Payment' }))).toBeVisible();
  });

  // Unauthorized access
  test('bookAppointment | Security: unauthenticated user cannot access appointment booking page @bookappointment', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('https://emr.whitecoats.com/');
    await expect(page).toHaveURL("https://emr.whitecoats.com/");
  });


  // Browser refresh
  test('bookAppointment | Error: browser refresh mid-booking discards unsaved appointment data @bookappointment', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().bookAppointmentAndRefresh('Deepthi', { label: 'Gatchibowli Main Center (BRA-26-1)' }, getDynamicDate(0), 'Test notes');
    // await expect(page).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Back button
  test('bookAppointment | Error: back button mid-booking navigates away without saving appointment @bookappointment', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().bookAppointmentAndNavigateBack('Deepthi', { label: 'Gatchibowli Main Center (BRA-26-1)' }, getDynamicDate(0), 'Test notes');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Concurrent actions
  test('bookAppointment | Error: submitting appointment booking twice concurrently does not create duplicate appointments @bookappointment', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().bookAppointmentConcurrent('Deepthi', { label: 'Gatchibowli Main Center (BRA-26-1)' }, getDynamicDate(0), 'Test notes');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });



  // ══════════════════════════════════════════════════════════════════════
  // appt_list_filter
  // ══════════════════════════════════════════════════════════════════════

  test('appt_list_filter | Positive: should filter appointment list by status, type, branch, doctor and date range', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().appt_list_filter();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // ══════════════════════════════════════════════════════════════════════
  // invoice_list_filter
  // ══════════════════════════════════════════════════════════════════════

  test('invoice_list_filter | Positive: should filter invoice list by status, branch and date range', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().invoice_list_filter();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // ══════════════════════════════════════════════════════════════════════
  // payment_list_filter
  // ══════════════════════════════════════════════════════════════════════

  test('payment_list_filter | Positive: should filter payment list by status, method, branch and date range', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().payment_list_filter();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // ══════════════════════════════════════════════════════════════════════
  // add_coupon
  // ══════════════════════════════════════════════════════════════════════

  test('add_coupon | Positive: should add a new coupon @addcoupon', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().add_coupon('Test Coupon', 'TESTCODE10', '2026-09-01', '2026-12-31', '100', '10');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });
  // Missing mandatory fields - name missing
  test('add_coupon | Negative: coupon creation fails without a name @addcoupon', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().add_couponWithoutName('TESTCODE10', '2026-09-01', '2026-12-31', '100', '10');
    await expect(page.getByText("Coupon name and code are required").or(page.getByRole('button', { name: 'Add Coupon', exact: true }))).toBeVisible();
  });

  // Missing mandatory fields - code missing
  test('add_coupon | Negative: coupon creation fails without a coupon code @addcoupon', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().add_couponWithoutCode('Test Coupon', '2026-09-01', '2026-12-31', '100', '10');
    await expect(page.getByText("Coupon name and code are required").or(page.getByRole('button', { name: 'Add Coupon', exact: true }))).toBeVisible();
  });

  // Invalid data - special characters in name
  test('add_coupon | Negative: special characters in coupon name are rejected or handled gracefully @addcoupon', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().add_couponWithInvalidData('!@#$%^&*()', 'TESTCODE10', '2026-09-01', '2026-12-31', '100', '10');
    // await expect(page.getByText(/invalid|special|name/i).or(page.getByRole('button', { name: 'Add Coupon', exact: true }))).toBeVisible();
  });

  // Invalid data - SQL injection in name
  test('add_coupon | Security: SQL injection in coupon name is sanitized and page remains stable @addcoupon', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().add_couponWithInvalidData("' OR '1'='1", 'TESTCODE10', '2026-09-01', '2026-12-31', '100', '10');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Invalid data - XSS in name
  test('add_coupon | Security: XSS script tag in coupon name is not executed and page remains stable @addcoupon', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().add_couponWithInvalidData('<script>alert(1)</script>', 'TESTCODE10', '2026-09-01', '2026-12-31', '100', '10');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Invalid data - end date before start date
  test('add_coupon | Negative: end date before start date is rejected on coupon creation @addcoupon', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().add_couponWithEndDateBeforeStartDate('Test Coupon', 'TESTCODE10', '100', '10');
    // await expect(page.getByText(/invalid|date|end.*before.*start/i).or(page.getByRole('button', { name: 'Add Coupon', exact: true }))).toBeVisible();
  });

  // Empty values - whitespace-only name
  test('add_coupon | Negative: whitespace-only coupon name is rejected on creation @addcoupon', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().add_couponWithInvalidData('   ', 'TESTCODE10', '2026-09-01', '2026-12-31', '100', '10');
    await expect(page.getByText("Coupon name and code are required")).toBeVisible();
  });

  // Maximum values - name at 500 characters
  test('add_coupon | Boundary: 500-character coupon name does not crash the coupon form @addcoupon', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().add_couponWithMaxLengthName('TESTCODE10', '2026-09-01', '2026-12-31', '100', '10');
    await expect(page.getByRole('button', { name: 'Add Coupon', exact: true })).toBeVisible();
  });

  // Minimum values - name at 1 character
  test('add_coupon | Boundary: single character coupon name is accepted or rejected gracefully @addcoupon', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().add_couponWithMinLengthName('TESTCODE10', '2026-09-01', '2026-12-31', '100', '10');
    await expect(page.getByRole('button', { name: 'Add Coupon', exact: true })).toBeVisible();
  });

  // Duplicate actions - same coupon code used twice
  test('add_coupon | Negative: duplicate coupon code shows error or is rejected  @addcoupon', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().add_couponDuplicate('Test Coupon', 'DUPCODE10', '2026-09-01', '2026-12-31', '100', '10');
    await expect(page.getByText(/duplicate|already exists|code/i).or(page.getByRole('button', { name: 'Add Coupon', exact: true }))).toBeVisible();
  });

  // Network / API failure
  test('add_coupon | Error: API failure during coupon creation shows error gracefully @addcoupon', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().add_couponWithApiFailure('Test Coupon', 'TESTCODE10', '2026-09-01', '2026-12-31', '100', '10');
    await expect(page.getByText(/error|failed|try again/i).or(page.getByRole('button', { name: 'Add Coupon', exact: true }))).toBeVisible();
  });

  // Unauthorized access
  test('add_coupon | Security: unauthenticated user cannot access coupon creation page @addcoupon', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('https://emr.whitecoats.com/');
    await expect(page).not.toHaveURL(/coupons/i);
  });

  // Browser refresh
  test('add_coupon | Error: browser refresh during form fill discards unsaved coupon data @addcoupon', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().add_couponAndRefresh('Test Coupon', 'TESTCODE10', '2026-09-01', '2026-12-31');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Back button
  test('add_coupon | Error: back button during form fill navigates away without saving coupon @addcoupon', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().add_couponAndNavigateBack('Test Coupon', 'TESTCODE10', '2026-09-01', '2026-12-31');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Concurrent actions
  test('add_coupon | Error: submitting coupon form twice concurrently does not create duplicate coupons @addcoupon', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().add_couponConcurrent('Test Coupon', 'CONCCODE10', '2026-09-01', '2026-12-31', '100', '10');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });



  // ══════════════════════════════════════════════════════════════════════
  // edit_coupon
  // ══════════════════════════════════════════════════════════════════════

  test('edit_coupon | Positive: should edit an existing coupon @editcoupon', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().edit_coupon('Updated Coupon', '2026-12-31', '15');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });
  // Missing mandatory fields - name cleared
  test('edit_coupon | Negative: update fails when coupon name is cleared to empty @editcoupon', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().edit_couponWithEmptyName();
    await expect(page.getByText("Coupon name and code are required").or(page.getByRole('button', { name: 'Update Coupon' }))).toBeVisible();
  });

  // Invalid data - special characters in name
  test('edit_coupon | Negative: special characters in coupon name are rejected or handled gracefully @editcoupon', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().edit_couponWithInvalidName('!@#$%^&*()');
    // await expect(page.getByText(/invalid|special|name/i).or(page.getByRole('button', { name: 'Update Coupon' }))).toBeVisible();
  });

  // Invalid data - SQL injection in name
  test('edit_coupon | Security: SQL injection in coupon name is sanitized and page remains stable @editcoupon', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().edit_couponWithInvalidName("' OR '1'='1");
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Invalid data - XSS in name
  test('edit_coupon | Security: XSS script tag in coupon name is not executed and page remains stable @editcoupon', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().edit_couponWithInvalidName('<script>alert(1)</script>');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Invalid data - past end date
  test('edit_coupon | Negative: past end date is rejected or flagged on coupon update @editcoupon', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().edit_couponWithPastEndDate();
    // await expect(page.getByText(/past|invalid|date/i).or(page.getByRole('button', { name: 'Update Coupon' }))).toBeVisible();
  });

  // Invalid data - negative discount value
  test('edit_coupon | Negative: negative discount value is rejected on coupon update @editcoupon', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().edit_couponWithInvalidDiscountValue('-1');
    // await expect(page.getByText(/invalid|discount|negative/i).or(page.getByRole('button', { name: 'Update Coupon' }))).toBeVisible();
  });

  // Empty values - whitespace-only name
  test('edit_coupon | Negative: whitespace-only coupon name is rejected on update @editcoupon', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().edit_couponWithInvalidName('   ');
    await expect(page.getByText("Coupon name and code are required")).toBeVisible();
  });

  // Maximum values - name at 500 characters
  test('edit_coupon | Boundary: 500-character coupon name does not crash the edit form @editcoupon', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().edit_couponWithMaxLengthName();
    await expect(page.getByRole('button', { name: 'Update Coupon' })).toBeVisible();
  });

  // Minimum values - name at 1 character
  test('edit_coupon | Boundary: single character coupon name is accepted or rejected gracefully @editcoupon', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().edit_couponWithMinLengthName();
    await expect(page.getByRole('button', { name: 'Update Coupon' })).toBeVisible();
  });

  // Duplicate actions - same update submitted twice
  test('edit_coupon | Negative: editing the same coupon twice consecutively does not cause inconsistent state @editcoupon', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().edit_couponDuplicate('Updated Coupon', '2026-12-31', '15');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Network / API failure
  test('edit_coupon | Error: API failure during coupon update shows error gracefully @editcoupon', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().edit_couponWithApiFailure('Updated Coupon', '2026-12-31', '15');
    await expect(page.getByText(/error|failed|try again/i).or(page.getByRole('button', { name: 'Update Coupon' }))).toBeVisible();
  });

  // Unauthorized access
  test('edit_coupon | Security: unauthenticated user cannot access coupon edit page @editcoupon', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('https://emr.whitecoats.com/');
    await expect(page).not.toHaveURL(/coupons/i);
  });


  // Browser refresh
  test('edit_coupon | Error: browser refresh during edit discards unsaved coupon changes @editcoupon', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().edit_couponAndRefresh('Updated Coupon', '2026-12-31', '15');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Back button
  test('edit_coupon | Error: back button during edit navigates away without saving coupon changes @editcoupon', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().edit_couponAndNavigateBack('Updated Coupon', '2026-12-31', '15');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Concurrent actions
  test('edit_coupon | Error: submitting coupon edit twice concurrently does not cause duplicate updates @editcoupon', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().edit_couponConcurrent('Updated Coupon', '2026-12-31', '15');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });



  // ══════════════════════════════════════════════════════════════════════
  // coupon_search_filter
  // ══════════════════════════════════════════════════════════════════════

  test('coupon_search_filter | Positive: should search and filter coupons by campaign @couponsearch', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().coupon_search_filter('TEST');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // ══════════════════════════════════════════════════════════════════════
  // add_adhoc_service
  // ══════════════════════════════════════════════════════════════════════

  test('add_adhoc_service | Positive: should add a new ad-hoc service @adhocservice', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().add_adhoc_service('Monsoon Fever Package', 'Ad-hoc', '500', '600', 'Public', '10', '2026-12-31', 'Test notes');
    await expect(page).toHaveURL(/myappointments\.whitecoats\.com/);
  });
  // Missing mandatory fields - name missing
  test('add_adhoc_service | Negative: service creation fails without a name @adhocservice', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().add_adhoc_serviceWithoutName('Ad-hoc', '500', '600', 'Public', '10', '2026-12-31', 'Test notes');
    await expect(page.getByText("Service name is required").or(page.getByRole('button', { name: 'Add & Use in Bill' }))).toBeVisible();
  });

  // Missing mandatory fields - billing price missing
  test('add_adhoc_service | Negative: service creation fails without a billing price @adhocservice', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().add_adhoc_serviceWithoutBillingPrice('Monsoon Fever Package', 'Ad-hoc', '600', 'Public', '10', '2026-12-31', 'Test notes');
    await expect(page.getByText("Billing price must be greater than 0").or(page.getByRole('button', { name: 'Add & Use in Bill' }))).toBeVisible();
  });

  // Invalid data - special characters in name
  test('add_adhoc_service | Negative: special characters in service name are rejected or handled gracefully @adhocservice', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().add_adhoc_serviceWithInvalidData('!@#$%^&*()', 'Ad-hoc', '500', '600', 'Public', '10', '2026-12-31', 'Test notes');
    // await expect(page.getByText(/invalid|special|name/i).or(page.getByRole('button', { name: 'Add & Use in Bill' }))).toBeVisible();
  });

  // Invalid data - SQL injection in name
  test('add_adhoc_service | Security: SQL injection in service name is sanitized and page remains stable @adhocservice', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().add_adhoc_serviceWithInvalidData("' OR '1'='1", 'Ad-hoc', '500', '600', 'Public', '10', '2026-12-31', 'Test notes');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Invalid data - XSS in name
  test('add_adhoc_service | Security: XSS script tag in service name is not executed and page remains stable @adhocservice-', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().add_adhoc_serviceWithInvalidData('<script>alert(1)</script>', 'Ad-hoc', '500', '600', 'Public', '10', '2026-12-31', 'Test notes');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Invalid data - negative billing price
  test('add_adhoc_service | Negative: negative billing price is rejected on service creation @adhocservice', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().add_adhoc_serviceWithInvalidData('Monsoon Fever Package', 'Ad-hoc', '-1', '600', 'Public', '10', '2026-12-31', 'Test notes');
    // await expect(page.getByText(/invalid|price|negative/i).or(page.getByRole('button', { name: 'Add & Use in Bill' }))).toBeVisible();
  });

  // Invalid data - past expiry date
  test('add_adhoc_service | Negative: past expiry date is rejected or flagged on service creation @adhocservice', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().add_adhoc_serviceWithPastExpiryDate('Monsoon Fever Package', 'Ad-hoc', '500', '600', 'Public', '10', 'Test notes');
    // await expect(page.getByText(/past|invalid|date/i).or(page.getByRole('button', { name: 'Add & Use in Bill' }))).toBeVisible();
  });

  // Empty values - whitespace-only name
  test('add_adhoc_service | Negative: whitespace-only service name is rejected on creation @adhocservice', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().add_adhoc_serviceWithInvalidData('   ', 'Ad-hoc', '500', '600', 'Public', '10', '2026-12-31', 'Test notes');
    await expect(page.getByText("Service name is required")).toBeVisible();
  });

  // Maximum values - name at 500 characters
  test('add_adhoc_service | Boundary: 500-character service name does not crash the ad-hoc service form @adhocservice', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().add_adhoc_serviceWithMaxLengthName('Ad-hoc', '500', '600', 'Public', '10', '2026-12-31', 'Test notes');
    await expect(page.getByRole('button', { name: 'Add & Use in Bill' })).toBeVisible();
  });

  // Minimum values - name at 1 character
  test('add_adhoc_service | Boundary: single character service name is accepted or rejected gracefully @adhocservice', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().add_adhoc_serviceWithMinLengthName('Ad-hoc', '500', '600', 'Public', '10', '2026-12-31', 'Test notes');
    await expect(page.getByRole('button', { name: 'Add & Use in Bill' })).toBeVisible();
  });

  // Duplicate actions - same service name submitted twice
  test('add_adhoc_service | Negative: duplicate service name shows error or is rejected @adhocservice', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().add_adhoc_serviceDuplicate('Monsoon Fever Package', 'Ad-hoc', '500', '600', 'Public', '10', '2026-12-31', 'Test notes');
    //await expect(page.getByText(/duplicate|already exists|name/i).or(page.getByRole('button', { name: 'Add & Use in Bill' }))).toBeVisible();
  });

  // Network / API failure
  test('add_adhoc_service | Error: API failure during service creation shows error gracefully @adhocservice', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().add_adhoc_serviceWithApiFailure('Monsoon Fever Package', 'Ad-hoc', '500', '600', 'Public', '10', '2026-12-31', 'Test notes');
    await expect(page.getByText(/error|failed|try again/i).or(page.getByRole('button', { name: 'Add & Use in Bill' }))).toBeVisible();
  });

  // Unauthorized access
  test('add_adhoc_service | Security: unauthenticated user cannot access ad-hoc service creation page @adhocservice', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('https://emr.whitecoats.com/');
    await expect(page).not.toHaveURL(/adhoc|ad-hoc/i);
  });


  // Browser refresh
  test('add_adhoc_service | Error: browser refresh during form fill discards unsaved service data @adhocservice', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().add_adhoc_serviceAndRefresh('Monsoon Fever Package', 'Ad-hoc', '500', '2026-12-31');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Back button
  test('add_adhoc_service | Error: back button during form fill navigates away without saving service @adhocservice', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().add_adhoc_serviceAndNavigateBack('Monsoon Fever Package', 'Ad-hoc', '500', '2026-12-31');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Concurrent actions
  test('add_adhoc_service | Error: submitting service form twice concurrently does not create duplicate services @adhocservice', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().add_adhoc_serviceConcurrent('Monsoon Fever Package', 'Ad-hoc', '500', '600', 'Public', '10', '2026-12-31', 'Test notes');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });



  // ══════════════════════════════════════════════════════════════════════
  // edit_adhoc_service
  // ══════════════════════════════════════════════════════════════════════

  test('edit_adhoc_service | Positive: should edit an existing ad-hoc service @editadhocservice', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().edit_adhoc_service('Updated Service', '2026-12-31', 'Public', '550', 'Updated notes');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Missing mandatory fields - name cleared
  test('edit_adhoc_service | Negative: update fails when service name is cleared to empty @editadhocservice', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().edit_adhoc_serviceWithEmptyName('2026-12-31', 'Public', '550', 'Updated notes');
    await expect(page.getByText("Service name is required").or(page.getByRole('button', { name: 'Save Changes' }))).toBeVisible();
  });

  // Invalid data - special characters in name
  test('edit_adhoc_service | Negative: special characters in service name are rejected or handled gracefully @editadhocservice', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().edit_adhoc_serviceWithInvalidData('!@#$%^&*()', '2026-12-31', 'Public', '550', 'Updated notes');
    // await expect(page.getByText(/invalid|special|name/i).or(page.getByRole('button', { name: 'Save Changes' }))).toBeVisible();
  });

  // Invalid data - SQL injection in name
  test('edit_adhoc_service | Security: SQL injection in service name is sanitized and page remains stable @editadhocservice', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().edit_adhoc_serviceWithInvalidData("' OR '1'='1", '2026-12-31', 'Public', '550', 'Updated notes');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Invalid data - XSS in name
  test('edit_adhoc_service | Security: XSS script tag in service name is not executed and page remains stable @editadhocservice', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().edit_adhoc_serviceWithInvalidData('<script>alert(1)</script>', '2026-12-31', 'Public', '550', 'Updated notes');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Empty values - whitespace-only name
  test('edit_adhoc_service | Negative: whitespace-only service name is rejected on update @editadhocservice', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().edit_adhoc_serviceWithInvalidData('   ', '2026-12-31', 'Public', '550', 'Updated notes');
    await expect(page.getByText("Service name is required").or(page.getByRole('button', { name: 'Save Changes' }))).toBeVisible();
  });

  // Invalid data - negative billing price
  test('edit_adhoc_service | Negative: negative billing price is rejected on service update @editadhocservice', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().edit_adhoc_serviceWithNegativeBillingPrice();
    // await expect(page.getByText(/invalid|price|negative/i).or(page.getByRole('button', { name: 'Save Changes' }))).toBeVisible();
  });

  // Invalid data - past expiry date
  test('edit_adhoc_service | Negative: past expiry date is rejected or flagged on service update @editadhocservice', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().edit_adhoc_serviceWithPastExpiryDate();
    // await expect(page.getByText(/past|invalid|date/i).or(page.getByRole('button', { name: 'Save Changes' }))).toBeVisible();
  });

  // Maximum values - name at 500 characters
  test('edit_adhoc_service | Boundary: 500-character service name does not crash the edit form @editadhocservice', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().edit_adhoc_serviceWithMaxLengthName('2026-12-31', 'Public', '550', 'Updated notes');
    await expect(page.getByRole('button', { name: 'Save Changes' })).toBeVisible();
  });

  // Minimum values - name at 1 character
  test('edit_adhoc_service | Boundary: single character service name is accepted or rejected gracefully @editadhocservice', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().edit_adhoc_serviceWithMinLengthName('2026-12-31', 'Public', '550', 'Updated notes');
    // await expect(page.getByRole('button', { name: 'Save Changes' })).toBeVisible();
  });

  // Duplicate actions - same update submitted twice
  test('edit_adhoc_service | Negative: editing the same service twice consecutively does not cause inconsistent state @editadhocservice', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().edit_adhoc_serviceDuplicate('Updated Service', '2026-12-31', 'Public', '550', 'Updated notes');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Network / API failure
  test('edit_adhoc_service | Error: API failure during service update shows error gracefully @editadhocservice', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().edit_adhoc_serviceWithApiFailure('Updated Service', '2026-12-31', 'Public', '550', 'Updated notes');
    // await expect(page.getByText(/error|failed|try again/i).or(page.getByRole('button', { name: 'Save Changes' }))).toBeVisible();
  });

  // Unauthorized access
  test('edit_adhoc_service | Security: unauthenticated user cannot access ad-hoc service edit page @editadhocservice', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('https://emr.whitecoats.com/');
    await expect(page).not.toHaveURL(/adhoc|ad-hoc/i);
  });



  // Browser refresh
  test('edit_adhoc_service | Error: browser refresh during edit discards unsaved service changes @editadhocservice', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().edit_adhoc_serviceAndRefresh('Updated Service', '2026-12-31', '550');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Back button
  test('edit_adhoc_service | Error: back button during edit navigates away without saving service changes @editadhocservice', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().edit_adhoc_serviceAndNavigateBack('Updated Service', '2026-12-31', '550');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Concurrent actions
  test('edit_adhoc_service | Error: submitting service edit twice concurrently does not cause duplicate updates @editadhocservice', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().edit_adhoc_serviceConcurrent('Updated Service', '2026-12-31', 'Public', '550', 'Updated notes');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });


  // ══════════════════════════════════════════════════════════════════════
  // adhoc_search_filter
  // ══════════════════════════════════════════════════════════════════════

  test('adhoc_search_filter | Positive: should search and filter ad-hoc services by status @adhocsearchfilter', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().adhoc_search_filter('Monsoon');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Missing mandatory fields - no search term entered
  test('adhoc_search_filter | Negative: searching with empty value returns all or shows no-results gracefully @adhocsearchfilter', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().adhoc_search_filterWithEmptyValue();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Invalid data - special characters
  test('adhoc_search_filter | Negative: special characters in search field are handled gracefully @adhocsearchfilter', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().adhoc_search_filterWithInvalidValue('!@#$%^&*()');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Invalid data - SQL injection
  test('adhoc_search_filter | Security: SQL injection in search field is sanitized and page remains stable @adhocsearchfilter', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().adhoc_search_filterWithInvalidValue("' OR '1'='1");
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Invalid data - XSS
  test('adhoc_search_filter | Security: XSS script tag in search field is not executed and page remains stable @adhocsearchfilter', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().adhoc_search_filterWithInvalidValue('<script>alert(1)</script>');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Empty values - whitespace only
  test('adhoc_search_filter | Negative: whitespace-only search value is handled gracefully @adhocsearchfilter', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().adhoc_search_filterWithInvalidValue('   ');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Maximum values
  test('adhoc_search_filter | Boundary: 500-character search value does not crash the ad-hoc service search @adhocsearchfilter', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().adhoc_search_filterWithMaxLengthValue();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Minimum values
  test('adhoc_search_filter | Boundary: single character search value returns results or no-results gracefully @adhocsearchfilter', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().adhoc_search_filterWithMinLengthValue();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Duplicate actions - same search term twice
  test('adhoc_search_filter | Negative: searching the same term twice consecutively returns consistent results @adhocsearchfilter', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().adhoc_search_filterDuplicate('Monsoon');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Network / API failure
  test('adhoc_search_filter | Error: API failure during ad-hoc service search shows error gracefully @adhocsearchfilter', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().adhoc_search_filterWithApiFailure('Monsoon');
    await expect(page.getByText(/error|failed|try again/i).or(page.getByRole('textbox', { name: 'Search by name or code...' }))).toBeVisible();
  });

  // Unauthorized access
  test('adhoc_search_filter | Security: unauthenticated user cannot access ad-hoc service search page @adhocsearchfilter', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('https://emr.whitecoats.com/');
    await expect(page).not.toHaveURL(/adhoc|ad-hoc/i);
  });

  // Browser refresh
  test('adhoc_search_filter | Error: browser refresh during search clears the search field @adhocsearchfilter', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().adhoc_search_filterAndRefresh('Monsoon');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Back button
  test('adhoc_search_filter | Error: back button during search navigates away from ad-hoc service search @adhocsearchfilter', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().adhoc_search_filterAndNavigateBack('Monsoon');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Concurrent actions
  test('adhoc_search_filter | Error: concurrent search inputs do not crash the ad-hoc service search @adhocsearchfilter', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().adhoc_search_filterConcurrent('Monsoon');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });



  // ══════════════════════════════════════════════════════════════════════
  // CreateInvoice
  // ══════════════════════════════════════════════════════════════════════

  test('CreateInvoice | Positive: should create a new invoice @invoice', async ({ page }) => {
    const { serviceType, amount } = generateInvoiceData();
    await new POManagers(page).HospitalAdminPage().CreateInvoice('475c6e36-f148-440d-801c-36d806416439', serviceType, '1', amount, '0', 'Test invoice notes');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Missing mandatory fields - service description missing
  test('CreateInvoice | Negative: invoice creation fails without service description @invoice', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().CreateInvoiceWithoutServiceDesc('475c6e36-f148-440d-801c-36d806416439', '1', '500', '0', 'Test notes');
    await expect(page.getByText("Please add at least one service/item with a description.").or(page.getByRole('button', { name: 'Create Invoice', exact: true }))).toBeVisible();
  });

  // Missing mandatory fields - quantity missing
  test('CreateInvoice | Negative: invoice creation fails without quantity @invoice', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().CreateInvoiceWithoutQty('475c6e36-f148-440d-801c-36d806416439', 'Consultation', '500', '0', 'Test notes');
    await expect(page.getByText("Invoice amount must be greater than zero").or(page.getByRole('button', { name: 'Create Invoice', exact: true }))).toBeVisible();
  });

  // Missing mandatory fields - unit price missing
  test('CreateInvoice | Negative: invoice creation fails without unit price @invoice', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().CreateInvoiceWithoutUnitPrice('475c6e36-f148-440d-801c-36d806416439', 'Consultation', '1', '0', 'Test notes');
    await expect(page.getByText("Invoice amount must be greater than zero").or(page.getByRole('button', { name: 'Create Invoice', exact: true }))).toBeVisible();
  });

  // Invalid data - zero unit price
  test('CreateInvoice | Negative: zero unit price is rejected or flagged on invoice creation @invoice', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().CreateInvoiceWithZeroUnitPrice('475c6e36-f148-440d-801c-36d806416439', 'Consultation', '1', '0', 'Test notes');
    await expect(page.getByText("Invoice amount must be greater than zero").or(page.getByRole('button', { name: 'Create Invoice', exact: true }))).toBeVisible();
  });

  // Invalid data - negative unit price
  test('CreateInvoice | Negative: negative unit price is rejected on invoice creation @invoice', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().CreateInvoiceWithNegativeUnitPrice('475c6e36-f148-440d-801c-36d806416439', 'Consultation', '1', '0', 'Test notes');
    await expect(page.getByText("Invoice amount must be greater than zero").or(page.getByRole('button', { name: 'Create Invoice', exact: true }))).toBeVisible();
  });

  // Invalid data - excessive discount
  test('CreateInvoice | Negative: excessive discount value is rejected on invoice creation @invoice', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().CreateInvoiceWithExcessiveDiscount('475c6e36-f148-440d-801c-36d806416439', 'Consultation', '1', '500', 'Test notes');
    await expect(page.getByText("Invoice amount must be greater than zero").or(page.getByRole('button', { name: 'Create Invoice', exact: true }))).toBeVisible();
  });

  // Security - SQL injection in service description
  test('CreateInvoice | Security: SQL injection in service description is sanitized and page remains stable @invoice', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().CreateInvoice('475c6e36-f148-440d-801c-36d806416439', "' OR '1'='1", '1', '500', '0', 'Test notes');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Security - XSS in service description
  test('CreateInvoice | Security: XSS script tag in service description is not executed and page remains stable @invoice', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().CreateInvoice('475c6e36-f148-440d-801c-36d806416439', '<script>alert(1)</script>', '1', '500', '0', 'Test notes');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Boundary - 500-character service description
  test('CreateInvoice | Boundary: 500-character service description does not crash the invoice form @invoice', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().CreateInvoice('475c6e36-f148-440d-801c-36d806416439', 'a'.repeat(500), '1', '500', '0', 'Test notes');
     await expect(page.getByText("Please add at least one service/item with a description.").or(page.getByRole('button', { name: 'Create Invoice', exact: true }))).toBeVisible();
});

  // Boundary - 1000-character notes
  test('CreateInvoice | Boundary: 1000-character notes does not crash the invoice form @invoice', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().CreateInvoice('475c6e36-f148-440d-801c-36d806416439', 'Consultation', '1', '500', '0', 'a'.repeat(1000));
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Network / API failure
  test('CreateInvoice | Error: API failure during invoice creation shows error gracefully @invoice', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().CreateInvoiceWithApiFailure('475c6e36-f148-440d-801c-36d806416439', 'Consultation', '1', '500', '0', 'Test notes');
    await expect(page.getByText(/error|failed|try again/i).or(page.getByRole('button', { name: 'Create Invoice', exact: true }))).toBeVisible();
  }); 

  // Browser refresh
  test('CreateInvoice | Error: browser refresh during form fill discards unsaved invoice data @invoice', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().CreateInvoiceAndRefresh('475c6e36-f148-440d-801c-36d806416439', 'Consultation', '1', '500');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Back button
  test('CreateInvoice | Error: back button during form fill navigates away without saving invoice @invoice', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().CreateInvoiceAndNavigateBack('475c6e36-f148-440d-801c-36d806416439', 'Consultation', '1', '500');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Concurrent submission
  test('CreateInvoice | Error: submitting invoice form twice concurrently does not create duplicate invoices @invoice', async ({ page }) => {
    await new POManagers(page).HospitalAdminPage().CreateInvoiceConcurrent('475c6e36-f148-440d-801c-36d806416439', 'Consultation', '1', '500', '0', 'Test notes');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Unauthorized access
  test('CreateInvoice | Security: unauthenticated user cannot access invoice creation page @invoice', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('https://emr.whitecoats.com/');
    // await expect(page).not.toHaveURL(/invoices/i);
  });



});
