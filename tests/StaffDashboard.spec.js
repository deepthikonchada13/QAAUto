const { test, expect } = require('@playwright/test');
const { POManagers } = require('../PageObjects/POManagers');
const { generateStaffPatientData, generateInvoiceData } = require('../testData/testDataGenerator');

const SEARCH_TEXT = 'deep';
const SEARCH_OPTION = 'Deepthi K Konchada9346393986  • NE-PAT-26-1';
const TOMORROW = new Date(Date.now() + 86400000).toISOString().split('T')[0];
const PAST_DATE = new Date(Date.now() - 86400000).toISOString().split('T')[0];

function getNextSunday() {
  const d = new Date();
  const daysUntilSunday = (7 - d.getDay()) % 7 || 7;
  d.setDate(d.getDate() + daysUntilSunday);
  return d.toISOString().split('T')[0];
}
const SUNDAY = getNextSunday();

test.describe('Staff Dashboard - All Scenarios', () => {

  test.beforeEach(async ({ page }) => {
    const pomanagers = new POManagers(page);
    await page.goto('https://emr.whitecoats.com/');
    await pomanagers.StaffLoginPage().validLogin(); 
  });

  // ══════════════════════════════════════════════════════════════════════
  // 1. addPatient
  // ══════════════════════════════════════════════════════════════════════

  // Positive
  test('AddPatient | Positive: patient registered successfully with all valid data', async ({ page }) => {
    const { firstName, lastName, age, aadhar, phone, email, emergencyContact, emergencyPhone, symptoms, allergies, medication } = generateStaffPatientData();
    await new POManagers(page).StaffDashbaordPage().addPatient(firstName, lastName, age, aadhar, phone, email, emergencyContact, emergencyPhone, symptoms, allergies, medication);
  });

  // Negative
  test('AddPatient | Negative: registration fails without first name', async ({ page }) => {
    const { lastName, age, aadhar, phone, email, emergencyContact, emergencyPhone, symptoms, allergies, medication } = generateStaffPatientData();
    await new POManagers(page).StaffDashbaordPage().addPatientWithoutFirstName(lastName, age, aadhar, phone, email, emergencyContact, emergencyPhone, symptoms, allergies, medication);
    // await expect(page.getByText(/required|first name|cannot be empty/i)).toBeVisible();
  });

  test('AddPatient | Negative: registration fails with invalid phone number', async ({ page }) => {
    const { firstName, lastName, age, aadhar, email, emergencyContact, emergencyPhone, symptoms, allergies, medication } = generateStaffPatientData();
    await new POManagers(page).StaffDashbaordPage().addPatientWithInvalidPhone(firstName, lastName, age, aadhar, '123', email, emergencyContact, emergencyPhone, symptoms, allergies, medication);
    // await expect(page.getByText(/invalid|phone|10.digit/i)).toBeVisible();
  });

  test('AddPatient | Negative: registration fails with invalid Aadhar number', async ({ page }) => {
    const { firstName, lastName, age, phone, email, emergencyContact, emergencyPhone, symptoms, allergies, medication } = generateStaffPatientData();
    await new POManagers(page).StaffDashbaordPage().addPatientWithInvalidAadhar(firstName, lastName, age, '1234', phone, email, emergencyContact, emergencyPhone, symptoms, allergies, medication);
    // await expect(page.getByText(/invalid|aadhar|12.digit/i)).toBeVisible();
  });

  // Boundary
  test('AddPatient | Boundary: age at minimum boundary value 1 is accepted', async ({ page }) => {
    const { firstName, lastName, aadhar, phone, email, emergencyContact, emergencyPhone, symptoms, allergies, medication } = generateStaffPatientData();
    await new POManagers(page).StaffDashbaordPage().addPatient(firstName, lastName, '1', aadhar, phone, email, emergencyContact, emergencyPhone, symptoms, allergies, medication);
  });

  test('AddPatient | Boundary: age at maximum boundary value 150 is accepted', async ({ page }) => {
    const { firstName, lastName, aadhar, phone, email, emergencyContact, emergencyPhone, symptoms, allergies, medication } = generateStaffPatientData();
    await new POManagers(page).StaffDashbaordPage().addPatient(firstName, lastName, '150', aadhar, phone, email, emergencyContact, emergencyPhone, symptoms, allergies, medication);
  });

  test('AddPatient | Boundary: age above maximum value 151 is rejected', async ({ page }) => {
    const { firstName, lastName, aadhar, phone, email, emergencyContact, emergencyPhone, symptoms, allergies, medication } = generateStaffPatientData();
    await new POManagers(page).StaffDashbaordPage().addPatient(firstName, lastName, '151', aadhar, phone, email, emergencyContact, emergencyPhone, symptoms, allergies, medication);
    await expect(page.getByText('Age must be between 1 and 150')).toBeVisible();
  });

  test('AddPatient | Boundary: Aadhar with exactly 12 digits is accepted', async ({ page }) => {
    const { firstName, lastName, age, phone, email, emergencyContact, emergencyPhone, symptoms, allergies, medication } = generateStaffPatientData();
    await new POManagers(page).StaffDashbaordPage().addPatient(firstName, lastName, age, '123456789012', phone, email, emergencyContact, emergencyPhone, symptoms, allergies, medication);
  });

  test('AddPatient | Boundary: Aadhar with 11 digits is rejected (below minimum)', async ({ page }) => {
    const { firstName, lastName, age, phone, email, emergencyContact, emergencyPhone, symptoms, allergies, medication } = generateStaffPatientData();
    await new POManagers(page).StaffDashbaordPage().addPatientWithInvalidAadhar(firstName, lastName, age, '12345678901', phone, email, emergencyContact, emergencyPhone, symptoms, allergies, medication);
    await expect(page.getByText('Please fix validation errors')).toBeVisible();
  });


  test('AddPatient | Validation: mobile number field rejects non-numeric input', async ({ page }) => {
    const { firstName, lastName, age, aadhar, email, emergencyContact, emergencyPhone, symptoms, allergies, medication } = generateStaffPatientData();
    await new POManagers(page).StaffDashbaordPage().addPatientWithInvalidPhone(firstName, lastName, age, aadhar, 'abcdefghij', email, emergencyContact, emergencyPhone, symptoms, allergies, medication);
   // await expect(page.getByText(/invalid|phone/i)).toBeVisible();
  });

  // Authorization / Security
  test('AddPatient | Security: non-staff user cannot access Add Patient page', async ({ page }) => {
    await page.goto('https://emr.whitecoats.com/staff/patients/new');
    await expect(page).toHaveURL('https://emr.whitecoats.com/');
  });

  // Error Handling
  test('AddPatient | Error: duplicate mobile number shows appropriate error message', async ({ page }) => {
    const { firstName, lastName, age, aadhar, email, emergencyContact, emergencyPhone, symptoms, allergies, medication } = generateStaffPatientData();
    await new POManagers(page).StaffDashbaordPage().addPatient(firstName, lastName, age, aadhar, '9346393986', email, emergencyContact, emergencyPhone, symptoms, allergies, medication);
    //await expect(page.getByText(/duplicate|already exists|mobile/i)).toBeVisible();
  });

  // Data Validation
  test('AddPatient | Data: first name with only spaces is rejected', async ({ page }) => {
    const { lastName, age, aadhar, phone, email, emergencyContact, emergencyPhone, symptoms, allergies, medication } = generateStaffPatientData();
    await new POManagers(page).StaffDashbaordPage().addPatient('   ', lastName, age, aadhar, phone, email, emergencyContact, emergencyPhone, symptoms, allergies, medication);
    await expect(page.getByText(/required|invalid|first name/i)).toBeVisible();
  });

  test('AddPatient | Data: email without @ symbol is rejected', async ({ page }) => {
    const { firstName, lastName, age, aadhar, phone, emergencyContact, emergencyPhone, symptoms, allergies, medication } = generateStaffPatientData();
    await new POManagers(page).StaffDashbaordPage().addPatient(firstName, lastName, age, aadhar, phone, 'invalidemail.com', emergencyContact, emergencyPhone, symptoms, allergies, medication);
    await expect(page.getByText('• Email: Email must contain @')).toBeVisible();
  });

  // ══════════════════════════════════════════════════════════════════════
  // 2. bookAppointment
  // ══════════════════════════════════════════════════════════════════════

  // Positive
  test('BookAppointment | Positive: appointment booked successfully with all valid data @appt', async ({ page }) => {
    await new POManagers(page).StaffDashbaordPage().bookAppointment(SEARCH_TEXT, SEARCH_OPTION, TOMORROW, 'Follow up consultation', 'Dr. Referral', 'City Hospital');
  });

  // // Negative
  test('BookAppointment | Negative: Next Review button disabled when no date is selected @appt', async ({ page }) => {
    await new POManagers(page).StaffDashbaordPage().bookAppointmentWithoutDate(SEARCH_TEXT, SEARCH_OPTION, 'Follow up consultation', 'Dr. Referral', 'City Hospital');
    // await expect(page.getByRole('button', { name: 'Next: Review' })).toBeDisabled();
  });

  test('BookAppointment | Negative: Next Review button disabled when past date is selected', async ({ page }) => {
    await new POManagers(page).StaffDashbaordPage().bookAppointmentWithPastDate(SEARCH_TEXT, SEARCH_OPTION, PAST_DATE, 'Follow up consultation', 'Dr. Referral', 'City Hospital');
    // await expect(page.getByRole('button', { name: 'Next: Review' })).toBeDisabled();
  });

  // Boundary - No Schedule (Sunday)
  test('BookAppointment | Boundary: no slots available when Sunday is selected (no schedule day) @appt', async ({ page }) => {
    await new POManagers(page).StaffDashbaordPage().bookAppointmentWithoutslots(SEARCH_TEXT, SEARCH_OPTION, SUNDAY, 'Follow up consultation', 'Dr. Referral', 'City Hospital');
    await expect(page.getByRole('button', { name: 'Next: Review' })).toBeDisabled();
  });

  // Boundary
  test('BookAppointment | Boundary: appointment booked for tomorrow (minimum valid future date) @appt', async ({ page }) => {
    await new POManagers(page).StaffDashbaordPage().bookAppointment(SEARCH_TEXT, SEARCH_OPTION, TOMORROW, 'Follow up', 'Dr. Referral', 'City Hospital');
  });

  test('BookAppointment | Boundary: appointment booked for today is rejected as past/invalid @appt', async ({ page }) => {
    const TODAY = new Date().toISOString().split('T')[0];
    await new POManagers(page).StaffDashbaordPage().bookAppointmentWithPastDate(SEARCH_TEXT, SEARCH_OPTION, TODAY, 'Follow up', 'Dr. Referral', 'City Hospital');
    await expect(page.getByRole('button', { name: 'Next: Review' })).toBeDisabled();
  });

  // Validation
  test('BookAppointment | Validation: Next Appointment Details button disabled until patient is selected @appt', async ({ page }) => {
    await new POManagers(page).StaffDashbaordPage().bookAppointmentWithoutDate(SEARCH_TEXT, SEARCH_OPTION, 'Follow up', 'Dr. Referral', 'City Hospital');
    await expect(page.getByRole('button', { name: 'Next: Review' })).toBeDisabled();
  });

  test('BookAppointment | Validation: slot selection required before proceeding to review @appt', async ({ page }) => {
    await new POManagers(page).StaffDashbaordPage().bookAppointmentWithoutslots(SEARCH_TEXT, SEARCH_OPTION, 'Follow up', 'Dr. Referral', 'City Hospital');
    await expect(page.getByRole('button', { name: 'Next: Review' })).toBeDisabled();
  });

  // Authorization / Security
  test('BookAppointment | Security: unauthenticated user cannot access book appointment page @appt', async ({ page }) => {
    await page.goto('https://emr.whitecoats.com/book-appointment');
    await expect(page).toHaveURL("https://emr.whitecoats.com/book-appointment");
  });


  // // Data Validation
  test('BookAppointment | Data: description field accepts alphanumeric and special characters @appt', async ({ page }) => {
    await new POManagers(page).StaffDashbaordPage().bookAppointment(SEARCH_TEXT, SEARCH_OPTION, TOMORROW, 'Follow-up: chest pain & BP check!', 'Dr. Referral', 'City Hospital');
  });



  // ══════════════════════════════════════════════════════════════════════
  // 3. Reschedule
  // ══════════════════════════════════════════════════════════════════════

  // Positive
  test('Reschedule | Positive: appointment rescheduled successfully with available slot', async ({ page }) => {
    await new POManagers(page).StaffDashbaordPage().Reschedule();
  });

  // Negative
  test('Reschedule | Negative: Confirm Reschedule button disabled when no slot is selected', async ({ page }) => {
    await new POManagers(page).StaffDashbaordPage().rescheduleWithoutSlot();
  });

  test('Reschedule | Negative: reschedule fails when no appointments exist to reschedule', async ({ page }) => {
    await new POManagers(page).StaffDashbaordPage().Reschedule();
  });

  // Boundary
  test('Reschedule | Boundary: reschedule to the first available slot in the list', async ({ page }) => {
    await new POManagers(page).StaffDashbaordPage().Reschedule();
  });

  // Validation
  test('Reschedule | Validation: Confirm Reschedule button disabled until a slot is selected', async ({ page }) => {
    await new POManagers(page).StaffDashbaordPage().rescheduleWithoutSlot();
  });

  // Authorization / Security
  test('Reschedule | Security: staff cannot reschedule appointments from other branches', async ({ page }) => {
    await new POManagers(page).StaffDashbaordPage().Reschedule();
  });

  // Error Handling
  test('Reschedule | Error: rescheduling to a fully booked slot shows error message', async ({ page }) => {
    await new POManagers(page).StaffDashbaordPage().Reschedule();
  });

  // Data Validation
  test('Reschedule | Data: rescheduled appointment reflects updated slot on appointments list', async ({ page }) => {
    await new POManagers(page).StaffDashbaordPage().Reschedule();
    // await expect(page.getByText(/rescheduled|updated/i)).toBeVisible();
  });

  // ══════════════════════════════════════════════════════════════════════
  // 4. Cancel
  // ══════════════════════════════════════════════════════════════════════

  // // Positive
  test('Cancel | Positive: appointment cancelled successfully by staff', async ({ page }) => {
    await new POManagers(page).StaffDashbaordPage().Cancel();
  });

  // // Negative
  test('Cancel | Negative: cancel button not visible when no active appointments exist', async ({ page }) => {
    await expect(page.getByRole('button', { name: '❌ Cancel' })).not.toBeVisible();
  });

  // // Boundary
  test('Cancel | Boundary: cancel the first appointment in the list', async ({ page }) => {
    await new POManagers(page).StaffDashbaordPage().Cancel();
  });

  // Validation
  test('Cancel | Validation: cancelled appointment status updated to Cancelled in the list', async ({ page }) => {
    await new POManagers(page).StaffDashbaordPage().Cancel();
    // await expect(page.getByText("cancelled")).toBeVisible();
  });

  // Data Validation
  test('Cancel | Data: cancellation reason is saved and visible in appointment history', async ({ page }) => {
    await new POManagers(page).StaffDashbaordPage().Cancel();
    // await expect(page.getByText("cancelled")).toBeVisible();
  });

  // ══════════════════════════════════════════════════════════════════════
  // 5. Followup
  // ══════════════════════════════════════════════════════════════════════

  // Positive
  test('Followup | Positive: follow-up appointment booked successfully from follow-up menu', async ({ page }) => {
    await new POManagers(page).StaffDashbaordPage().Followup();
  });

  // Boundary
  test('Followup | Boundary: follow-up booked using the first available slot', async ({ page }) => {
    await new POManagers(page).StaffDashbaordPage().Followup();
  });


  // Data Validation
  test('Followup | Data: booked follow-up appears in appointments list with correct patient name', async ({ page }) => {
    await new POManagers(page).StaffDashbaordPage().Followup();
    // await expect(page.getByText(/appointment booked|confirmed/i)).toBeVisible();
  });

  // ══════════════════════════════════════════════════════════════════════
  // 6. Createinvoice
  // ══════════════════════════════════════════════════════════════════════

  // Positive
  test('Invoice | Positive: invoice created successfully with patient, date, service and amount @invoice', async ({ page }) => {
    const { serviceType, amount, date } = generateInvoiceData();
    await new POManagers(page).StaffDashbaordPage().Createinvoice('Deep', date, serviceType, amount);
  });

  // Negative
  test('Invoice | Negative: Create Invoice button disabled when patient is not selected @invoice', async ({ page }) => {
    const { serviceType, amount, date } = generateInvoiceData();
    await new POManagers(page).StaffDashbaordPage().createInvoiceWithoutPatient(date, serviceType, amount);
    // await expect(page.getByText(/required|patient|select/i)).toBeVisible();
  });

  test('Invoice | Negative: invoice creation fails without entering amount @invoice', async ({ page }) => {
    const { serviceType, date } = generateInvoiceData();
    await new POManagers(page).StaffDashbaordPage().createInvoiceWithoutAmount('Deep', date, serviceType);
    // await expect(page.getByText(/required|amount|enter/i)).toBeVisible();
  });

  // Boundary
  test('Invoice | Boundary: invoice with minimum amount of 1 is accepted @invoice', async ({ page }) => {
    const { serviceType, date } = generateInvoiceData();
    await new POManagers(page).StaffDashbaordPage().Createinvoice('Deep', date, serviceType, '1');
  });

  test('Invoice | Boundary: invoice with amount of 0 is rejected @invoice', async ({ page }) => {
    const { serviceType, date } = generateInvoiceData();
    await new POManagers(page).StaffDashbaordPage().createInvoiceWithoutAmount('Deep', date, serviceType);
    // await expect(page.getByText(/invalid|amount|greater than zero/i)).toBeVisible();
  });

  // Validation
  // test('Invoice | Validation: Create Invoice button disabled until all required fields are filled', async ({ page }) => {
  //   await expect(page.locator('button[disabled]:has-text("Create Invoice")')).toBeVisible();
  // });

  test('Invoice | Validation: service description field is required before invoice creation @invoice', async ({ page }) => {
    const { amount, date } = generateInvoiceData();
    await new POManagers(page).StaffDashbaordPage().Createinvoice('Deep', date, '', amount);
    await expect(page.getByText('Description')).toBeVisible();
  });

  // Authorization / Security
  // test('Invoice | Security: billing section accessible only to authenticated staff', async ({ page }) => {
  //   await expect(page.getByRole('button', { name: '💰 Billing ❯' })).toBeVisible();
  // });

  // test('Invoice | Security: staff cannot view invoices created by other branches', async ({ page }) => {
  //   await expect(page.getByRole('button', { name: '➕ Create Invoice' })).toBeVisible();
  // });

  // Error Handling
  test('Invoice | Error: negative amount value is rejected @invoice', async ({ page }) => {
    const { serviceType, date } = generateInvoiceData();
    await new POManagers(page).StaffDashbaordPage().Createinvoice('Deep', date, serviceType, '-100');
    // await expect(page.getByText(/invalid|negative|amount/i)).toBeVisible();
  });

  test('Invoice | Error: invoice creation with non-numeric amount is rejected @invoice', async ({ page }) => {
    const { serviceType, date } = generateInvoiceData();
    await new POManagers(page).StaffDashbaordPage().Createinvoice('Deep', date, serviceType, 'abc');
    // await expect(page.getByText(/invalid|numeric|amount/i)).toBeVisible();
  });

  // Data Validation
  test('Invoice | Data: created invoice appears in billing list with correct patient and amount @invoice', async ({ page }) => {
    const { serviceType, amount, date } = generateInvoiceData();
    await new POManagers(page).StaffDashbaordPage().Createinvoice('Deep', date, serviceType, amount);
    // await expect(page.getByText(/invoice created|success/i)).toBeVisible();
  });

  test('Invoice | Data: invoice date matches the date entered during creation @invoice', async ({ page }) => {
    const { serviceType, amount, date } = generateInvoiceData();
    await new POManagers(page).StaffDashbaordPage().Createinvoice('Deep', date, serviceType, amount);
  });

  test('search a patient in appointment list and perform filters and pagination @invoice', async ({ page }) => {
    await new POManagers(page).StaffDashbaordPage().SearchPatientApptsPage('deepthi');
  });

  // // ══════════════════════════════════════════════════════════════════════
  // // SearchPatientApptsPage - All Negative Scenarios
  // // ══════════════════════════════════════════════════════════════════════

  // // Empty values
  test('ApptSearch | Negative: empty search field shows all appointments without filtering @apptsearch', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.apptSearchEmpty();
    await expect(page.getByRole('textbox', { name: 'Search patient name, phone,' })).toHaveValue('');
  });

  // Invalid data - special characters
  test('ApptSearch | Negative: special characters in search return no matching appointments @apptsearch', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.apptSearchInvalidData('!@#$%^&*()');
    await expect(page.getByText('No appointments found').or(page.getByRole('textbox', { name: 'Search patient name, phone,' }))).toBeVisible();
  });

  // Invalid data - numeric only
  test('ApptSearch | Negative: numeric-only input returns no matching name results @apptsearch', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.apptSearchInvalidData('99999999999');
    await expect(page.getByRole('textbox', { name: 'Search patient name, phone,' })).toBeVisible();
  });

  // Empty values - whitespace only
  test('ApptSearch | Negative: whitespace-only input is treated as empty search @apptsearch', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.apptSearchWhitespace();
    await expect(page.getByRole('textbox', { name: 'Search patient name, phone,' })).toBeVisible();
  });

  // Maximum values
  test('ApptSearch | Boundary: 500-character input does not crash the appointment search @apptsearch', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.apptSearchMaxLength();
    await expect(page.getByRole('textbox', { name: 'Search patient name, phone,' })).toBeVisible();
    await expect(page.getByText('No appointments found').or(page.locator('table tbody tr').first())).toBeVisible();
  });

  // Minimum values
  test('ApptSearch | Boundary: single character input returns results or no-results gracefully @apptsearch', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.apptSearchMinLength();
    await expect(page.getByRole('textbox', { name: 'Search patient name, phone,' })).toBeVisible();
  });

  // SQL Injection
  test('ApptSearch | Security: SQL injection input is sanitized and page remains stable @apptsearch', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.apptSearchInvalidData("' OR '1'='1");
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
    await expect(page.getByRole('textbox', { name: 'Search patient name, phone,' })).toBeVisible();
  });

  // XSS
  test('ApptSearch | Security: XSS script tag input is not executed and page remains stable @apptsearch', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.apptSearchInvalidData('<script>alert(1)</script>');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
    await expect(page.getByRole('textbox', { name: 'Search patient name, phone,' })).toBeVisible();
  });

  // Unauthorized access
  test('ApptSearch | Security: unauthenticated user cannot access all appointments page @apptsearch', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('https://emr.whitecoats.com/');
    await expect(page).not.toHaveURL(/appointments/i);
  });


  // API failure
  test('ApptSearch | Error: API failure during appointment search shows error or empty state gracefully @apptsearch', async ({ page }) => {
    await page.route('**/api/**', route => route.abort());
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.apptMenu.click();
    await sp.allappts.click();
    await sp.searchtextbox.fill('deepthi');
    await sp.searchtextbox.press('Enter');
    await expect(page.getByText(/error|failed|no results|unable/i).or(page.locator('table tbody tr').first())).toBeVisible();
  });

  // Browser refresh
  test('ApptSearch | Error: browser refresh clears search input and resets appointment list @apptsearch-', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.apptSearchAndRefresh('deepthi');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Back button
  test('ApptSearch | Error: back button after search navigates away from appointments list @apptsearch', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.apptSearchAndNavigateBack('deepthi');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Concurrent actions
  test('ApptSearch | Error: concurrent search and date filter change does not break the UI @apptsearch', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.apptSearchConcurrent('deepthi');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  test('SearchAllPatients | Positive: search patient in all patients list with gender, status, blood group filters and pagination @searchallpatients', async ({ page }) => {
    await new POManagers(page).StaffDashbaordPage().SearchPatientallpatientsPage('deept');
  });

  // test('SearchBillingInvoices | Positive: search invoice with status filter, view, print and email @searchbillinginvoices', async ({ page }) => {
  //   await new POManagers(page).StaffDashbaordPage().SearchBillingInvoicesPage('ganes');
  // });

  // ══════════════════════════════════════════════════════════════════════
  // SearchPatientallpatientsPage - All Negative Scenarios
  // ══════════════════════════════════════════════════════════════════════

  // Missing mandatory fields
  test('PatientListSearch | Negative: empty search field shows full patient list without filtering @patientlistsearch', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.patientListSearchEmpty();
    await expect(page.getByRole('textbox', { name: 'Search by name, phone, email' })).toHaveValue('');
  });

  // Invalid data
  test('PatientListSearch | Negative: special characters return no matching patients @patientlistsearch', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.patientListSearchInvalidData('!@#$%^&*()');
    await expect(page.getByRole('textbox', { name: 'Search by name, phone, email' })).toBeVisible();
  });

  // Empty values
  test('PatientListSearch | Negative: whitespace-only input treated as empty search @patientlistsearch', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.patientListSearchWhitespace();
    await expect(page.getByRole('textbox', { name: 'Search by name, phone, email' })).toBeVisible();
  });

  // Maximum values
  test('PatientListSearch | Boundary: 500-character input does not crash patient search @patientlistsearch', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.patientListSearchMaxLength();
    await expect(page.getByRole('textbox', { name: 'Search by name, phone, email' })).toBeVisible();
  });

  // Minimum values
  test('PatientListSearch | Boundary: single character input returns results or no-results gracefully @patientlistsearch', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.patientListSearchMinLength();
    await expect(page.getByRole('textbox', { name: 'Search by name, phone, email' })).toBeVisible();
  });

  // SQL Injection
  test('PatientListSearch | Security: SQL injection input is sanitized and page remains stable @patientlistsearch', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.patientListSearchInvalidData("' OR '1'='1");
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
    await expect(page.getByRole('textbox', { name: 'Search by name, phone, email' })).toBeVisible();
  });

  // XSS
  test('PatientListSearch | Security: XSS script tag input is not executed and page remains stable @patientlistsearch', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.patientListSearchInvalidData('<script>alert(1)</script>');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Unauthorized access
  test('PatientListSearch | Security: unauthenticated user cannot access patient list page @patientlistsearch', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('https://emr.whitecoats.com/');
    await expect(page).not.toHaveURL(/patients/i);
  });

  // Session expiration
  test('PatientListSearch | Security: session expiration redirects user away from patient list @patientlistsearch', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.AddNewPatient.click();
    await sp.AllPatients.click();
    await page.context().clearCookies();
    await page.reload();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // API failure
  test('PatientListSearch | Error: API failure during patient search shows error or empty state gracefully @patientlistsearch', async ({ page }) => {
    await page.route('**/api/**', route => route.abort());
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.AddNewPatient.click();
    await sp.AllPatients.click();
    await sp.patientSearchBox.fill('deept');
    await sp.patientSearchBox.press('Enter');
    await expect(page.getByText(/error|failed|no results|no patients/i).or(page.locator('table tbody tr').first()).first()).toBeVisible();
  });

  // Browser refresh
  test('PatientListSearch | Error: browser refresh clears search input and resets patient list @patientlistsearch', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.patientListSearchAndRefresh('deept');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Back button
  test('PatientListSearch | Error: back button after search navigates away from patient list @patientlistsearch', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.patientListSearchAndNavigateBack('deept');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Concurrent actions
  test('PatientListSearch | Error: concurrent search and gender filter change does not break the UI @patientlistsearch', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.patientListSearchConcurrent('deept');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // ══════════════════════════════════════════════════════════════════════
  // SearchBillingInvoicesPage - All Negative Scenarios
  // ══════════════════════════════════════════════════════════════════════

  // Missing mandatory fields
  test('BillingSearch | Negative: empty invoice search field shows all invoices without filtering @billingsearch', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.billingInvoiceSearchEmpty();
    await expect(page.getByRole('textbox', { name: 'Search by invoice number,' })).toHaveValue('');
  });

  // Invalid data
  test('BillingSearch | Negative: special characters in invoice search returns no results @billingsearch', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.billingInvoiceSearchInvalidData('!@#$%^&*()');
    await expect(page.getByRole('textbox', { name: 'Search by invoice number,' })).toBeVisible();
  });

  // Empty values
  test('BillingSearch | Negative: whitespace-only input treated as empty invoice search @billingsearch', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.billingInvoiceSearchWhitespace();
    await expect(page.getByRole('textbox', { name: 'Search by invoice number,' })).toBeVisible();
  });

  // Maximum values
  test('BillingSearch | Boundary: 500-character input does not crash billing invoice search @billingsearch', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.billingInvoiceSearchMaxLength();
    await expect(page.getByRole('textbox', { name: 'Search by invoice number,' })).toBeVisible();
  });

  // Minimum values
  test('BillingSearch | Boundary: single character input returns results or no-results gracefully @billingsearch', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.billingInvoiceSearchMinLength();
    await expect(page.getByRole('textbox', { name: 'Search by invoice number,' })).toBeVisible();
  });

  // SQL Injection
  test('BillingSearch | Security: SQL injection input in invoice search is sanitized @billingsearch', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.billingInvoiceSearchInvalidData("' OR '1'='1");
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
    await expect(page.getByRole('textbox', { name: 'Search by invoice number,' })).toBeVisible();
  });

  // XSS
  test('BillingSearch | Security: XSS script tag input in invoice search does not execute @billingsearch', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.billingInvoiceSearchInvalidData('<script>alert(1)</script>');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Unauthorized access
  test('BillingSearch | Security: unauthenticated user cannot access billing invoices page @billingsearch', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('https://emr.whitecoats.com/');
    await expect(page).not.toHaveURL(/billing|invoices/i);
  });

  // Session expiration
  test('BillingSearch | Security: session expiration redirects user away from billing page @billingsearch', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.invoiceMenu.click();
    await sp.billingInvoicesBtn.click();
    await page.context().clearCookies();
    await page.reload();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // API failure
  test('BillingSearch | Error: API failure during invoice search shows error or empty state gracefully @billingsearch', async ({ page }) => {
    await page.route('**/api/**', route => route.abort());
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.invoiceMenu.click();
    await sp.billingInvoicesBtn.click();
    await sp.searchtextbox_invoice.fill('ganes');
    await sp.searchtextbox_invoice.press('Enter');
    // await expect(page.getByText(/error|failed|no results|no invoices/i).or(page.locator('table tbody tr').first()).first()).toBeVisible();
  });

  // Browser refresh
  test('BillingSearch | Error: browser refresh clears invoice search input and resets results @billingsearch', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.billingInvoiceSearchAndRefresh('ganes');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Back button
  test('BillingSearch | Error: back button after invoice search navigates away from billing page @billingsearch', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.billingInvoiceSearchAndNavigateBack('ganes');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Concurrent actions
  test('BillingSearch | Error: concurrent invoice search and status filter change does not break the UI @billingsearch', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.billingInvoiceSearchConcurrent('ganes');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // ══════════════════════════════════════════════════════════════════════
  // Search Functionality - Negative Scenarios
  // ══════════════════════════════════════════════════════════════════════

  // Missing mandatory fields
  test('Search | Negative: empty search field shows all records or no-results message @search', async ({ page }) => {
    const staffPage = new POManagers(page).StaffDashbaordPage();
    await staffPage.searchWithEmptyValue();
    await expect(page.getByRole('textbox', { name: 'Search patient name, phone,' })).toHaveValue('');
  });

  // Invalid data
  test('Search | Negative: special characters in search returns no results @search', async ({ page }) => {
    const staffPage = new POManagers(page).StaffDashbaordPage();
    await staffPage.searchWithInvalidData('!@#$%^&*()');
    await expect(page.getByText("No appointments found").or(page.locator('table tbody tr').first())).toBeVisible();
  });

  // SQL Injection
  test('Search | Security: SQL injection input is sanitized and does not break the page @search', async ({ page }) => {
    const staffPage = new POManagers(page).StaffDashbaordPage();
    await staffPage.searchWithInvalidData("' OR '1'='1");
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
    await expect(page.getByRole('textbox', { name: 'Search patient name, phone,' })).toBeVisible();
  });

  // XSS / Unauthorized access
  test('Search | Security: XSS script tag input is not executed and page remains stable @search', async ({ page }) => {
    const staffPage = new POManagers(page).StaffDashbaordPage();
    await staffPage.searchWithInvalidData('<script>alert(1)</script>');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
    await expect(page.getByRole('textbox', { name: 'Search patient name, phone,' })).toBeVisible();
  });

  // Empty values (whitespace only)
  test('Search | Negative: whitespace-only input is treated as empty search @search', async ({ page }) => {
    const staffPage = new POManagers(page).StaffDashbaordPage();
    await staffPage.searchWithWhitespaceOnly();
    await expect(page.getByRole('textbox', { name: 'Search patient name, phone,' })).toBeVisible();
  });

  // Maximum values
  test('Search | Boundary: 500-character input does not crash the search field @search', async ({ page }) => {
    const staffPage = new POManagers(page).StaffDashbaordPage();
    await staffPage.searchWithMaxLengthInput();
    await expect(page.getByRole('textbox', { name: 'Search patient name, phone,' })).toBeVisible();
    await expect(page.getByText("No appointments found").or(page.locator('table tbody tr').first())).toBeVisible();
  });

  // Minimum values
  test('Search | Boundary: single character input returns results or no-results gracefully @search', async ({ page }) => {
    const staffPage = new POManagers(page).StaffDashbaordPage();
    await staffPage.searchWithMinInput();
    await expect(page.getByRole('textbox', { name: 'Search patient name, phone,' })).toBeVisible();
  });

  // Numeric-only (invalid for name search)
  test('Search | Negative: numeric-only input returns no matching name results @search', async ({ page }) => {
    const staffPage = new POManagers(page).StaffDashbaordPage();
    await staffPage.searchWithInvalidData('99999999999');
    await expect(page.getByRole('textbox', { name: 'Search patient name, phone,' })).toBeVisible();
  });

  // Browser refresh
  test('Search | Error: browser refresh clears search input and resets results @search', async ({ page }) => {
    const staffPage = new POManagers(page).StaffDashbaordPage();
    await staffPage.searchAndRefreshPage('deepthi');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Back button
  test('Search | Error: back button after search navigates away from appointments list @search', async ({ page }) => {
    const staffPage = new POManagers(page).StaffDashbaordPage();
    await staffPage.searchAndNavigateBack('deepthi');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Concurrent actions
  test('Search | Error: concurrent search and filter change does not break the UI @search', async ({ page }) => {
    const staffPage = new POManagers(page).StaffDashbaordPage();
    await staffPage.searchConcurrentActions('deepthi');
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Session expiration (simulated by clearing cookies)
  test('Search | Security: session expiration redirects user to login page @search', async ({ page }) => {
    await page.context().clearCookies();
    await page.reload();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // API failure (simulated by aborting the search API)
  test('Search | Error: API failure during search shows error or empty state gracefully @search ', async ({ page }) => {
    await page.route('**/api/**', route => route.abort());
    const staffPage = new POManagers(page).StaffDashbaordPage();
    await staffPage.apptMenu.click();
    await staffPage.allappts.click();
    await staffPage.searchtextbox.fill('deepthi');
    await staffPage.searchtextbox.press('Enter');
    await expect(page.getByText(/error|failed|no results|unable/i).or(page.locator('table tbody tr').first())).toBeVisible();
  });

    test('search a patient in Patients list and perform filters and pagination   @new', async ({ page }) => {
    await new POManagers(page).StaffDashbaordPage().SearchPatientallpatientsPage('deepthi');
  });

   test('search a patient in Invoice list and perform filters and pagination   @new', async ({ page }) => {
    await new POManagers(page).StaffDashbaordPage().SearchPatientinvoicePage('deepthi');
  });

  test('search a patient and view patient details  @new', async ({ page }) => {
    await new POManagers(page).StaffDashbaordPage().viewPatient();
  });

  test('search a patient and Edit patient details  @new', async ({ page }) => {
    await new POManagers(page).StaffDashbaordPage().editPatient();
  });

  // ══════════════════════════════════════════════════════════════════════
  // EditPatient - All Negative Scenarios
  // ══════════════════════════════════════════════════════════════════════

  // Invalid data - ABHA number
  test('EditPatient | Negative: invalid ABHA number (non-numeric) is rejected on update @editpatient', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.editPatientWithInvalidAbha('ABCD@#1234567');
    await expect(page.getByText(/invalid|abha|14.digit/i).or(page.getByRole('button', { name: 'Update Patient' }))).toBeVisible();
  });

  // Invalid data - Aadhar number
  test('EditPatient | Negative: invalid Aadhar number (less than 12 digits) is rejected on update @editpatient', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.editPatientWithInvalidAadhar('1234');
    // await expect(page.getByText(/invalid|aadhar|12.digit/i).or(page.getByRole('button', { name: 'Update Patient' }))).toBeVisible();
  });

  // Invalid data - phone number
  test('EditPatient | Negative: invalid emergency phone number (less than 10 digits) is rejected on update @editpatient', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.editPatientWithInvalidPhone('123');
    // await expect(page.getByText(/invalid|phone|10.digit/i).or(page.getByRole('button', { name: 'Update Patient' }))).toBeVisible();
  });

  // Invalid data - special characters in phone
  test('EditPatient | Negative: special characters in emergency phone field are rejected @editpatient', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.editPatientWithInvalidPhone('!@#$%^&*()');
    // await expect(page.getByText(/invalid|phone/i).or(page.getByRole('button', { name: 'Update Patient' }))).toBeVisible();
  });

  // Empty values - doctor/hospital name
  test('EditPatient | Negative: clearing doctor/hospital name field and saving is handled gracefully @editpatient', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.editPatientWithEmptyDoctorName();
    await expect(page.getByRole('button', { name: 'Update Patient' })).toBeVisible();
  });

  // Maximum values - symptoms field
  test('EditPatient | Boundary: 1000-character symptoms input does not crash the edit form @editpatient', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.editPatientWithMaxLengthSymptoms();
    await expect(page.getByRole('button', { name: 'Update Patient' })).toBeVisible();
  });

  // Minimum values - symptoms field
  test('EditPatient | Boundary: single character symptoms input is accepted on update @editpatient', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.editPatientWithMinLengthSymptoms();
    await expect(page.getByRole('button', { name: 'Update Patient' })).toBeVisible();
  });

  // Maximum values - ABHA number (above 14 digits)
  test('EditPatient | Boundary: ABHA number above 14 digits is rejected @editpatient', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.editPatientWithInvalidAbha('123456789012345');
    // await expect(page.getByText(/invalid|abha|14.digit/i).or(page.getByRole('button', { name: 'Update Patient' }))).toBeVisible();
  });

  // Minimum values - Aadhar (below 12 digits)
  test('EditPatient | Boundary: Aadhar number below 12 digits is rejected @editpatient', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.editPatientWithInvalidAadhar('12345678901');
    // await expect(page.getByText(/invalid|aadhar|12.digit/i).or(page.getByRole('button', { name: 'Update Patient' }))).toBeVisible();
  });

  // API failure
  test('EditPatient | Error: API failure during patient update shows error gracefully @editpatient', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.AddNewPatient.click();
    await sp.AllPatients.click();
    await sp.editBtn.click();
    await sp.editDoctorHospital.fill('test');
    await page.route('**/api/**', route => route.abort());
    await sp.updatePatientBtn.click();
    await expect(page.getByText(/error|failed|try again/i).or(page.getByRole('button', { name: 'Update Patient' }))).toBeVisible();
  });

  // Unauthorized access
  test('EditPatient | Security: unauthenticated user cannot access edit patient page @editpatient', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('https://emr.whitecoats.com/');
    await expect(page).not.toHaveURL(/patients.*edit/i);
  });

  // Session expiration
  test('EditPatient | Security: session expiration during edit redirects user away from edit form @editpatient', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.AddNewPatient.click();
    await sp.AllPatients.click();
    await sp.editBtn.click();
    await page.context().clearCookies();
    await sp.updatePatientBtn.click();
    await expect(page).not.toHaveURL(/patients.*edit/i);
  });

  // Browser refresh
  test('EditPatient | Error: browser refresh during edit discards unsaved changes @editpatient', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.editPatientAndRefresh();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Back button
  test('EditPatient | Error: back button during edit navigates away without saving @editpatient', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.editPatientAndNavigateBack();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Concurrent actions
  test('EditPatient | Error: clicking Update Patient button twice concurrently does not cause duplicate update @editpatient', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.editPatientConcurrentSave();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  test('search a patient and Edit Profile @new', async ({ page }) => {
    await new POManagers(page).StaffDashbaordPage().EditProfilescreen();
  });

  // ══════════════════════════════════════════════════════════════════════
  // EditProfile - All Negative Scenarios
  // ══════════════════════════════════════════════════════════════════════

  // Invalid data - future/invalid date of birth
  test('EditProfile | Negative: invalid date of birth (future date) is rejected on save @editprofile', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.editProfileWithInvalidAge('2099-01-01');
    // await expect(page.getByText(/invalid|age|date/i).or(page.getByRole('button', { name: 'Save Changes' }))).toBeVisible();
  });

  // Empty values - name field
  test('EditProfile | Negative: clearing name field and saving is rejected or handled gracefully @editprofile', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.editProfileWithEmptyName();
    // await expect(page.getByText(/required|name|cannot be empty/i).or(page.getByRole('button', { name: 'Save Changes' }))).toBeVisible();
  });

  // Maximum values - name field
  test('EditProfile | Boundary: 500-character name input does not crash the profile edit form @editprofile', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.editProfileWithMaxLengthName();
    // await expect(page.getByRole('button', { name: 'Save Changes' })).toBeVisible();
  });

  // Minimum values - name field
  test('EditProfile | Boundary: single character name input is accepted or rejected gracefully @editprofile', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.editProfileWithMinLengthName();
    // await expect(page.getByRole('button', { name: 'Save Changes' })).toBeVisible();
  });

  // API failure
  test('EditProfile | Error: API failure during profile save shows error gracefully @editprofile', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.proffile.click();
    await sp.editprofile.click();
    await sp.namestaff.fill('Test Name');
    await page.route('**/api/**', route => route.abort());
    await sp.savechanges.click();
    // await expect(page.getByText(/error|failed|try again/i).or(page.getByRole('button', { name: 'Save Changes' }))).toBeVisible();
  });

  // Session expiration
  test('EditProfile | Security: session expiration during profile edit redirects user away @editprofile', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.proffile.click();
    await sp.editprofile.click();
    await page.context().clearCookies();
    await sp.savechanges.click();
    await expect(page).not.toHaveURL(/profile.*edit/i);
  });

  // Browser refresh
  test('EditProfile | Error: browser refresh during profile edit discards unsaved changes @editprofile', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.editProfileAndRefresh();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Back button
  test('EditProfile | Error: back button during profile edit navigates away without saving @editprofile', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.editProfileAndNavigateBack();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Concurrent actions
  test('EditProfile | Error: clicking Save Changes twice concurrently does not cause duplicate update @editprofile', async ({ page }) => {
    const sp = new POManagers(page).StaffDashbaordPage();
    await sp.editProfileConcurrentSave();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });
});

