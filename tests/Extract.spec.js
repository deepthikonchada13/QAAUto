const { test, expect } = require('@playwright/test');
const { POManagers } = require('../PageObjects/POManagers');
const { generateFamilyMemberData, generateLabReportData, generateAppointmentData, getDynamicDate } = require('../testData/testDataGenerator');
const path = require('path');
const os = require('os');

const FILE_PATH = path.join(os.homedir(), 'OneDrive - ValueMomentum, Inc', 'Pictures', 'no info but getting data.png');

test.describe.serial('Patient Role - All Scenarios', () => {
  let sharedPage;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    sharedPage = await context.newPage();
    const pomanager = new POManagers(sharedPage);
    await sharedPage.goto('https://myappointments.whitecoats.com/');
    await pomanager.PatientLoginPage().validLogin();
  });

  test.afterAll(async () => {
    await sharedPage.context().close();
  });

  // ══════════════════════════════════════════════════════════════════════
  // 1. videobookAppointment
  // ══════════════════════════════════════════════════════════════════════

  // Positive
  test('Video | Positive: video appointment booked successfully with valid description', async () => {
    const { description } = generateAppointmentData();
    await new POManagers(sharedPage).PatientPage().videobookAppointment(description);
  });

  // Negative
  // test('Video | Negative: video appointment blocked when description is missing', async () => {
  //   await new POManagers(sharedPage).PatientPage().bookAppointmentWithoutDescription();
  //   await expect(sharedPage.getByRole('button', { name: 'Pay & Book - ₹' })).toBeDisabled();
  // });

  // Boundary
  // test('Video | Boundary: video appointment with exactly 10-character description (minimum)', async () => {
  //   await new POManagers(sharedPage).PatientPage().videobookAppointment('Headache!!');
  // });

  // Validation
  // test('Video | Validation: Pay & Book button stays disabled until description has 10+ characters', async () => {
  //   await new POManagers(sharedPage).PatientPage().bookAppointmentWithoutDescription();
  //   await expect(sharedPage.getByRole('button', { name: 'Pay & Book - ₹' })).toBeDisabled();
  // });

  // Authorization / Security
  // test('Video | Security: unauthenticated user is redirected away from booking page', async () => {
  //   await sharedPage.goto('https://myappointments.whitecoats.com/book-appointment');
  //   await expect(sharedPage).toHaveURL(/login|signin/);
  // });

  // Error Handling
  // test('Video | Error: Razorpay payment failure shows appropriate error message', async () => {
  //   const { description } = generateAppointmentData();
  //   await new POManagers(sharedPage).PatientPage().videobookAppointment(description);
  //   await expect(sharedPage.getByText(/failed|error|try again/i)).toBeVisible();
  // });

  // Data Validation
  // test('Video | Data: description with only whitespace is rejected', async () => {
  //   await new POManagers(sharedPage).PatientPage().videobookAppointment('          ');
  //   await expect(sharedPage.getByText(/invalid|required|minimum/i)).toBeVisible();
  // });

  // ══════════════════════════════════════════════════════════════════════
  // 2. inpersonbookAppointment
  // ══════════════════════════════════════════════════════════════════════

  // Positive
  test('InPerson | Positive: in-person appointment booked successfully with valid slot and description', async () => {
    const { description } = generateAppointmentData();
    await new POManagers(sharedPage).PatientPage().inpersonbookAppointment(description);
  });

  // Negative
  // test('InPerson | Negative: Book Appointment button disabled when description is missing', async () => {
  //   await new POManagers(sharedPage).PatientPage().inpersonBookAppointmentWithoutDescription();
  //   await expect(sharedPage.getByRole('button', { name: 'Book Appointment - ₹' })).toBeDisabled();
  // });

  // Boundary
  // test('InPerson | Boundary: in-person appointment with exactly 10-character description (minimum)', async () => {
  //   await new POManagers(sharedPage).PatientPage().inpersonbookAppointment('Chest pain');
  // });

  // Validation
  // test('InPerson | Validation: slot must be selected before description field is enabled', async () => {
  //   await new POManagers(sharedPage).PatientPage().inpersonBookAppointmentWithoutDescription();
  //   await expect(sharedPage.getByRole('button', { name: 'Book Appointment - ₹' })).toBeDisabled();
  // });

  // Authorization / Security
  // test('InPerson | Security: unauthenticated user cannot access in-person booking', async () => {
  //   await sharedPage.goto('https://myappointments.whitecoats.com/book-appointment');
  //   await expect(sharedPage).toHaveURL(/login|signin/);
  // });

  // Error Handling
  // test('InPerson | Error: no available slots shows appropriate message on UI', async () => {
  //   await expect(sharedPage.getByText(/no slots|unavailable|fully booked/i)).toBeVisible();
  // });

  // Data Validation
  // test('InPerson | Data: description with special characters only is rejected', async () => {
  //   await new POManagers(sharedPage).PatientPage().inpersonbookAppointment('!@#$%^&*()');
  //   await expect(sharedPage.getByText(/invalid|required/i)).toBeVisible();
  // });

  // ══════════════════════════════════════════════════════════════════════
  // 3. addFamilyMember
  // ══════════════════════════════════════════════════════════════════════

  // Positive
  // test('Family | Positive: family member added successfully with all valid data', async () => {
  //   const { firstName, lastName, dob, phone, email } = generateFamilyMemberData();
  //   await new POManagers(sharedPage).PatientPage().addFamilyMember(firstName, lastName, dob, phone, email);
  // });

  // Negative
  // test('Family | Negative: add family member fails without first name', async () => {
  //   const { lastName, dob, phone, email } = generateFamilyMemberData();
  //   await new POManagers(sharedPage).PatientPage().addFamilyMemberWithoutFirstName(lastName, dob, phone, email);
  //   await expect(sharedPage.getByText('First Name is required (minimum 2 characters)')).toBeVisible();
  // });

  // test('Family | Negative: add family member fails with invalid phone number', async () => {
  //   const { firstName, lastName, dob, email } = generateFamilyMemberData();
  //   await new POManagers(sharedPage).PatientPage().addFamilyMemberWithInvalidPhone(firstName, lastName, dob, '123', email);
  //   await expect(sharedPage.getByText(/invalid|phone/i)).toBeVisible();
  // });

  // test('Family | Negative: add family member fails with invalid email format', async () => {
  //   const { firstName, lastName, dob, phone } = generateFamilyMemberData();
  //   await new POManagers(sharedPage).PatientPage().addFamilyMemberWithInvalidEmail(firstName, lastName, dob, phone, 'invalid-email');
  //   await expect(sharedPage.getByText(/invalid|email/i)).toBeVisible();
  // });

  // Boundary
  // test('Family | Boundary: first name with exactly 2 characters is accepted (minimum)', async () => {
  //   const { lastName, dob, phone, email } = generateFamilyMemberData();
  //   await new POManagers(sharedPage).PatientPage().addFamilyMember('Ab', lastName, dob, phone, email);
  // });

  // test('Family | Boundary: first name with 1 character is rejected (below minimum)', async () => {
  //   const { lastName, dob, phone, email } = generateFamilyMemberData();
  //   await new POManagers(sharedPage).PatientPage().addFamilyMemberWithoutFirstName(lastName, dob, phone, email);
  //   await expect(sharedPage.getByText('First Name is required (minimum 2 characters)')).toBeVisible();
  // });

  // Validation
  // test('Family | Validation: future date of birth is rejected', async () => {
  //   const { firstName, lastName, phone, email } = generateFamilyMemberData();
  //   await new POManagers(sharedPage).PatientPage().addFamilyMemberWithFutureDOB(firstName, lastName, getDynamicDate(-1), phone, email);
  //   await expect(sharedPage.getByText(/invalid|future|date/i)).toBeVisible();
  // });

  // Authorization / Security
  // test('Family | Security: family members section only visible to logged-in patient', async () => {
  //   await expect(sharedPage.getByRole('button', { name: '👨‍👩‍👧‍👦 Family Members' })).toBeVisible();
  // });

  // Error Handling
  // test('Family | Error: phone number with letters is rejected', async () => {
  //   const { firstName, lastName, dob, email } = generateFamilyMemberData();
  //   await new POManagers(sharedPage).PatientPage().addFamilyMemberWithInvalidPhone(firstName, lastName, dob, 'abcdefghij', email);
  //   await expect(sharedPage.getByText(/invalid|phone/i)).toBeVisible();
  // });

  // Data Validation
  // test('Family | Data: 10-digit phone number starting with valid digit is accepted', async () => {
  //   const { firstName, lastName, dob, email } = generateFamilyMemberData();
  //   await new POManagers(sharedPage).PatientPage().addFamilyMember(firstName, lastName, dob, '9876543210', email);
  // });

  // ══════════════════════════════════════════════════════════════════════
  // 4. labReportUpload
  // ══════════════════════════════════════════════════════════════════════

  // Positive
  // test('LabReport | Positive: lab report uploaded successfully with file, type and description', async () => {
  //   const { description } = generateLabReportData();
  //   await new POManagers(sharedPage).PatientPage().labReportUpload(FILE_PATH, description);
  // });

  // Negative
  // test('LabReport | Negative: upload fails without selecting a file', async () => {
  //   const { description } = generateLabReportData();
  //   await new POManagers(sharedPage).PatientPage().labReportUploadWithoutFile(description);
  //   await expect(sharedPage.getByText(/required|upload|file/i)).toBeVisible();
  // });

  // test('LabReport | Negative: upload fails without selecting report type', async () => {
  //   const { description } = generateLabReportData();
  //   await new POManagers(sharedPage).PatientPage().labReportUploadWithoutReportType(FILE_PATH, description);
  //   await expect(sharedPage.getByText(/required|report type/i)).toBeVisible();
  // });

  // Boundary
  // test('LabReport | Boundary: upload report with today as report date (current date boundary)', async () => {
  //   const { description } = generateLabReportData();
  //   await new POManagers(sharedPage).PatientPage().labReportUpload(FILE_PATH, description);
  // });

  // Validation
  // test('LabReport | Validation: Upload Report button disabled when no file is selected', async () => {
  //   const { description } = generateLabReportData();
  //   await new POManagers(sharedPage).PatientPage().labReportUploadWithoutFile(description);
  //   await expect(sharedPage.getByRole('button', { name: 'Upload Report' })).toBeDisabled();
  // });

  // Authorization / Security
  // test('LabReport | Security: lab reports visible only to the logged-in patient', async () => {
  //   await expect(sharedPage.getByRole('navigation').getByRole('button', { name: '🧪 Lab Reports' })).toBeVisible();
  // });

  // Error Handling
  // test('LabReport | Error: uploading unsupported file type shows error message', async () => {
  //   const { description } = generateLabReportData();
  //   const txtPath = path.join(os.homedir(), 'test.txt');
  //   await new POManagers(sharedPage).PatientPage().labReportUpload(txtPath, description);
  //   await expect(sharedPage.getByText(/invalid|unsupported|format/i)).toBeVisible();
  // });

  // Data Validation
  // test('LabReport | Data: future date for report date is rejected', async () => {
  //   await expect(sharedPage.getByText(/invalid|future|date/i)).toBeVisible();
  // });

  // ══════════════════════════════════════════════════════════════════════
  // 5. PatientReview
  // ══════════════════════════════════════════════════════════════════════

  // Positive
  // test('Review | Positive: review submitted successfully with star rating and description', async () => {
  //   await new POManagers(sharedPage).PatientPage().PatientReview();
  // });

  // Negative
  // test('Review | Negative: Submit Review button disabled when description is missing', async () => {
  //   await new POManagers(sharedPage).PatientPage().submitReviewWithoutDescription();
  //   await expect(sharedPage.getByRole('button', { name: 'Submit Review' })).toBeDisabled();
  // });

  // Boundary
  // test('Review | Boundary: review submitted with 1-star rating (minimum)', async () => {
  //   await new POManagers(sharedPage).PatientPage().PatientReview();
  // });

  // Validation
  // test('Review | Validation: Submit Review button disabled without description filled', async () => {
  //   await new POManagers(sharedPage).PatientPage().submitReviewWithoutDescription();
  //   await expect(sharedPage.getByRole('button', { name: 'Submit Review' })).toBeDisabled();
  // });

  // Authorization / Security
  // test('Review | Security: review only allowed for appointments belonging to logged-in patient', async () => {
  //   await expect(sharedPage.getByRole('combobox').filter({ hasText: 'Select an appointment to' })).toBeVisible();
  // });

  // Error Handling
  // test('Review | Error: submitting review without selecting an appointment shows error', async () => {
  //   await expect(sharedPage.getByText(/select|appointment|required/i)).toBeVisible();
  // });

  // Data Validation
  // test('Review | Data: review description with only spaces is rejected', async () => {
  //   await expect(sharedPage.getByText(/invalid|required/i)).toBeVisible();
  // });

  // ══════════════════════════════════════════════════════════════════════
  // 6. Documents (upload / download / delete)
  // ══════════════════════════════════════════════════════════════════════

  // Positive
  // test('Documents | Positive: document uploaded successfully with file, type and description', async () => {
  //   await new POManagers(sharedPage).PatientPage().Documents();
  // });

  // test('Documents | Positive: document downloaded successfully', async () => {
  //   await new POManagers(sharedPage).PatientPage().downloadDocument();
  // });

  // test('Documents | Positive: document deleted successfully', async () => {
  //   await new POManagers(sharedPage).PatientPage().deleteDocument();
  // });

  // Negative
  // test('Documents | Negative: Upload Document button disabled when no file is selected', async () => {
  //   await new POManagers(sharedPage).PatientPage().uploadDocumentWithoutFile();
  //   await expect(sharedPage.getByRole('button', { name: 'Upload Document', exact: true })).toBeDisabled();
  // });

  // test('Documents | Negative: upload fails without entering description', async () => {
  //   await new POManagers(sharedPage).PatientPage().uploadDocumentWithoutDescription();
  //   await expect(sharedPage.getByText(/required|description/i)).toBeVisible();
  // });

  // Boundary
  // test('Documents | Boundary: upload document with minimum 1-character description', async () => {
  //   await new POManagers(sharedPage).PatientPage().uploadDocumentWithoutDescription();
  // });

  // Validation
  // test('Documents | Validation: Upload Document button disabled until file is chosen', async () => {
  //   await new POManagers(sharedPage).PatientPage().uploadDocumentWithoutFile();
  //   await expect(sharedPage.getByRole('button', { name: 'Upload Document', exact: true })).toBeDisabled();
  // });

  // Authorization / Security
  // test('Documents | Security: documents section accessible only to logged-in patient', async () => {
  //   await expect(sharedPage.getByRole('button', { name: '📄 Documents' })).toBeVisible();
  // });

  // Error Handling
  // test('Documents | Error: uploading oversized file shows size limit error', async () => {
  //   await expect(sharedPage.getByText(/size|too large|limit/i)).toBeVisible();
  // });

  // Data Validation
  // test('Documents | Data: unsupported file type is rejected on upload', async () => {
  //   await expect(sharedPage.getByText(/invalid|unsupported|format/i)).toBeVisible();
  // });

  // ══════════════════════════════════════════════════════════════════════
  // 7. billingNavigation
  // ══════════════════════════════════════════════════════════════════════

  // Positive
  // test('Billing | Positive: billing navigation, payment and PDF download completed successfully', async () => {
  //   await new POManagers(sharedPage).PatientPage().billingNavigation();
  // });

  // Negative
  // test('Billing | Negative: Pay Now button not visible when no pending bills exist', async () => {
  //   await expect(sharedPage.getByRole('button', { name: 'Pay Now' })).not.toBeVisible();
  // });

  // Boundary
  // test('Billing | Boundary: download PDF for the first billing record in the list', async () => {
  //   await new POManagers(sharedPage).PatientPage().billingNavigation();
  // });

  // Validation
  // test('Billing | Validation: Download PDF button visible only after successful payment', async () => {
  //   await new POManagers(sharedPage).PatientPage().billingNavigation();
  //   await expect(sharedPage.getByRole('button', { name: 'Download PDF' })).toBeVisible();
  // });

  // Authorization / Security
  // test('Billing | Security: billing section accessible only to logged-in patient', async () => {
  //   await expect(sharedPage.locator('span.nav-item-label:has-text("Billing")')).toBeVisible();
  // });

  // Error Handling
  // test('Billing | Error: payment gateway failure shows appropriate error message', async () => {
  //   await expect(sharedPage.getByText(/failed|error|try again/i)).toBeVisible();
  // });

  // Data Validation
  // test('Billing | Data: billing amount displayed matches the appointment consultation fee', async () => {
  //   await new POManagers(sharedPage).PatientPage().billingNavigation();
  // });

  // ══════════════════════════════════════════════════════════════════════
  // 8. rescheduleAppointment
  // ══════════════════════════════════════════════════════════════════════

  // Positive
  // test('Reschedule | Positive: appointment rescheduled successfully with valid future date and slot', async () => {
  //   await new POManagers(sharedPage).PatientPage().rescheduleAppointment();
  // });

  // Negative
  // test('Reschedule | Negative: Confirm Reschedule button disabled when no date is selected', async () => {
  //   await new POManagers(sharedPage).PatientPage().rescheduleWithoutDate();
  //   await expect(sharedPage.getByRole('button', { name: 'Confirm Reschedule' })).toBeDisabled();
  // });

  // Boundary
  // test('Reschedule | Boundary: reschedule to tomorrow (minimum valid future date)', async () => {
  //   await new POManagers(sharedPage).PatientPage().rescheduleAppointment();
  // });

  // test('Reschedule | Boundary: reschedule to 30 days from today (maximum boundary)', async () => {
  //   await new POManagers(sharedPage).PatientPage().rescheduleAppointment();
  // });

  // Validation
  // test('Reschedule | Validation: Confirm Reschedule button disabled without date and slot selection', async () => {
  //   await new POManagers(sharedPage).PatientPage().rescheduleWithoutDate();
  //   await expect(sharedPage.getByRole('button', { name: 'Confirm Reschedule' })).toBeDisabled();
  // });

  // Authorization / Security
  // test('Reschedule | Security: patient cannot reschedule another patient appointment', async () => {
  //   await expect(sharedPage.getByRole('button', { name: '🔄 Reschedule' })).toBeVisible();
  // });

  // Error Handling
  // test('Reschedule | Error: selecting a past date shows invalid date error', async () => {
  //   await expect(sharedPage.getByText(/invalid|past|date/i)).toBeVisible();
  // });

  // Data Validation
  // test('Reschedule | Data: rescheduled appointment reflects updated date on dashboard', async () => {
  //   await new POManagers(sharedPage).PatientPage().rescheduleAppointment();
  //   await expect(sharedPage.getByText(/rescheduled|updated/i)).toBeVisible();
  // });

  // ══════════════════════════════════════════════════════════════════════
  // 9. cancelAppointment
  // ══════════════════════════════════════════════════════════════════════

  // Positive
  test('Cancel | Positive: appointment cancelled successfully with valid reason', async () => {
    await new POManagers(sharedPage).PatientPage().cancelAppointment();
  });

  // Negative
  test('Cancel | Negative: cancel appointment fails without entering a reason', async () => {
    await new POManagers(sharedPage).PatientPage().cancelAppointmentWithoutReason();
  });

  // Boundary
  // test('Cancel | Boundary: cancel reason with exactly 1 character is rejected (minimum boundary)', async () => {
  //   await expect(sharedPage.getByText(/required|minimum/i)).toBeVisible();
  // });

  // Validation
  // test('Cancel | Validation: Cancel confirm button blocked when reason field is empty', async () => {
  //   await new POManagers(sharedPage).PatientPage().cancelAppointmentWithoutReason();
  //   await expect(sharedPage.getByText(/required|reason/i)).toBeVisible();
  // });

  // Authorization / Security
  // test('Cancel | Security: patient cannot cancel another patient appointment', async () => {
  //   await expect(sharedPage.getByRole('button', { name: '✕ Cancel' })).toBeVisible();
  // });

  // Error Handling
  // test('Cancel | Error: cancelling an already cancelled appointment shows error', async () => {
  //   await expect(sharedPage.getByText(/already cancelled|invalid/i)).toBeVisible();
  // });

  // Data Validation
  // test('Cancel | Data: cancelled appointment status updated to Cancelled on dashboard', async () => {
  //   await new POManagers(sharedPage).PatientPage().cancelAppointment();
  //   await expect(sharedPage.getByText(/cancelled/i)).toBeVisible();
  // });

  // ══════════════════════════════════════════════════════════════════════
  // 10. medicalRecords
  // ══════════════════════════════════════════════════════════════════════

  // Positive
  // test('MedicalRecords | Positive: medical record PDF opens in new tab successfully', async () => {
  //   await new POManagers(sharedPage).PatientPage().medicalRecords();
  // });

  // Negative
  // test('MedicalRecords | Negative: no records available shows empty state message', async () => {
  //   await expect(sharedPage.getByText(/no records|empty/i)).toBeVisible();
  // });

  // Boundary
  // test('MedicalRecords | Boundary: open the second PDF record in the list', async () => {
  //   await new POManagers(sharedPage).PatientPage().medicalRecords();
  // });

  // Validation
  // test('MedicalRecords | Validation: PDF viewer opens with correct record content', async () => {
  //   await new POManagers(sharedPage).PatientPage().medicalRecords();
  // });

  // Authorization / Security
  // test('MedicalRecords | Security: medical records accessible only to the logged-in patient', async () => {
  //   await expect(sharedPage.getByRole('button', { name: '📋 Medical Records ❯' })).toBeVisible();
  // });

  // Error Handling
  // test('MedicalRecords | Error: broken PDF link does not crash the page', async () => {
  //   await expect(sharedPage.getByText(/error|unavailable/i)).not.toBeVisible();
  // });

  // Data Validation
  // test('MedicalRecords | Data: record date and doctor name match the original appointment details', async () => {
  //   await new POManagers(sharedPage).PatientPage().medicalRecords();
  // });

});
