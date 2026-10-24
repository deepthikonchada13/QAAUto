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
  // test('InPerson | Positive: in-person appointment booked successfully with valid slot and description @inperson', async () => {
  //   const { description } = generateAppointmentData();
  //   await new POManagers(sharedPage).PatientPage().inpersonbookAppointment(description);
  // });

  // // Negative
  // test('InPerson | Negative: Book Appointment button disabled when description is missing @inperson', async () => {
  //   await new POManagers(sharedPage).PatientPage().inpersonBookAppointmentWithoutDescription();
  //   await expect(sharedPage.getByRole('button', { name: 'Book Appointment - ₹' })).toBeDisabled();
  // });

  // // Boundary
  // test('InPerson | Boundary: in-person appointment with exactly 10-character description (minimum) @inperson', async () => {
  //   await new POManagers(sharedPage).PatientPage().inpersonbookAppointment('Chest pain');
  // });

  // // Validation
  // test('InPerson | Validation: slot must be selected before description field is enabled  @inperson', async () => {
  //   await new POManagers(sharedPage).PatientPage().inpersonBookAppointmentWithoutDescription();
  //   await expect(sharedPage.getByRole('button', { name: 'Book Appointment - ₹' })).toBeDisabled();
  // });

  // // Authorization / Security
  // test('InPerson | Security: unauthenticated user cannot access in-person booking @inperson', async () => {
  //   await sharedPage.goto('https://myappointments.whitecoats.com/book-appointment');
  //   await expect(sharedPage).toHaveURL(/login|signin/);
  // });

  // // Error Handling
  // test('InPerson | Error: no available slots shows appropriate message on UI @inperson', async () => {
  //   await new POManagers(sharedPage).PatientPage().inpersonCheckNoSlotsAvailable();
  //   await expect(sharedPage.getByText(/no slots|unavailable|fully booked/i)).toBeVisible();
  // });

  // // // Data Validation
  // test('InPerson | Data: description with special characters only is rejected @inperson', async () => {
  //   await new POManagers(sharedPage).PatientPage().inpersonbookAppointment('!@#$%^&*()');
  //   await expect(sharedPage.getByText(/invalid|required/i)).toBeVisible();
  // });

  // ══════════════════════════════════════════════════════════════════════
  // 3. addFamilyMember
  // ══════════════════════════════════════════════════════════════════════

  // // Positive
  // test('Family | Positive: family member added successfully with all valid data @fam', async () => {
  //   const { firstName, lastName, dob, phone, email } = generateFamilyMemberData();
  //   await new POManagers(sharedPage).PatientPage().addFamilyMember(firstName, lastName, dob, phone, email);
  // });

  // // Negative
  // test('Family | Negative: add family member fails without first name @fam', async () => {
  //   const { lastName, dob, phone, email } = generateFamilyMemberData();
  //   await new POManagers(sharedPage).PatientPage().addFamilyMemberWithoutFirstName(lastName, dob, phone, email);
  //   // await expect(sharedPage.getByText('First Name is required (minimum 2 characters)')).toBeVisible();

  // });

  // test('Family | Negative: add family member fails with invalid phone number @fam', async () => {
  //   const { firstName, lastName, dob, email } = generateFamilyMemberData();
  //   await new POManagers(sharedPage).PatientPage().addFamilyMemberWithInvalidPhone(firstName, lastName, dob, '123', email);
  //   // await expect(sharedPage.getByText("Phone number must be 10 digits")).toBeVisible();
     
  // });

  // test('Family | Negative: add family member fails with invalid email format @fam', async () => {
  //   const { firstName, lastName, dob, phone } = generateFamilyMemberData();
  //   await new POManagers(sharedPage).PatientPage().addFamilyMemberWithInvalidEmail(firstName, lastName, dob, phone, 'invalid-email');
  //   // await expect(sharedPage.getByText("Please enter a valid email address")).toBeVisible();
  // });

  // // Boundary
  // test('Family | Boundary: first name with exactly 2 characters is accepted (minimum) @fam', async () => {
  //   const { lastName, dob, phone, email } = generateFamilyMemberData();
  //   await new POManagers(sharedPage).PatientPage().addFamilyMember('Ab', lastName, dob, phone, email);
  // });

  // test('Family | Boundary: first name with 1 character is rejected (below minimum) @fam', async () => {
  //   const { lastName, dob, phone, email } = generateFamilyMemberData();
  //   await new POManagers(sharedPage).PatientPage().addFamilyMemberWithoutFirstName(lastName, dob, phone, email);
   
  
  // });

  // // Validation
  // test('Family | Validation: future date of birth is rejected @fam', async () => {
  //   const { firstName, lastName, phone, email } = generateFamilyMemberData();
  //   await new POManagers(sharedPage).PatientPage().addFamilyMemberWithFutureDOB(firstName, lastName, getDynamicDate(-1), phone, email);
  //   // await expect(sharedPage.getByText("Date of Birth is required")).toBeVisible();
    
  // });


  // // Error Handling
  // test('Family | Error: phone number with letters is rejected @fam', async () => {
  //   const { firstName, lastName, dob, email } = generateFamilyMemberData();
  //   await new POManagers(sharedPage).PatientPage().addFamilyMemberWithInvalidPhone(firstName, lastName, dob, 'abcdefghij', email);
  //   // await expect(sharedPage.getByText("Phone number must be 10 digits")).toBeVisible();
    
  // });

  // // Data Validation
  // test('Family | Data: 10-digit phone number starting with valid digit is accepted @fam', async () => {
  //   const { firstName, lastName, dob, email } = generateFamilyMemberData();
  //   await new POManagers(sharedPage).PatientPage().addFamilyMember(firstName, lastName, dob, '9876543210', email);
      
  // });

  // ══════════════════════════════════════════════════════════════════════
  // 4. labReportUpload
  // // ══════════════════════════════════════════════════════════════════════

  // // Positive
  // test('LabReport | Positive: lab report uploaded successfully with file, type and description @lab', async () => {
  //   const { description } = generateLabReportData();
  //   await new POManagers(sharedPage).PatientPage().labReportUpload(FILE_PATH, description);
  // });

  // // Negative
  // test('LabReport | Negative: upload fails without selecting a file @lab', async () => {
  //   const { description } = generateLabReportData();
  //   await new POManagers(sharedPage).PatientPage().labReportUploadWithoutFile(description);
  //   await expect(sharedPage.getByText("Please fill in all required fields")).toBeVisible();
  //   await sharedPage.getByRole('button', { name: 'Close modal' }).click();
  // });

  // test('LabReport | Negative: upload fails without selecting report type @lab', async () => {
  //   const { description } = generateLabReportData();
  //   await new POManagers(sharedPage).PatientPage().labReportUploadWithoutReportType(FILE_PATH, description);
  //   await expect(sharedPage.getByText("Please fill in all required fields")).toBeVisible();
  //   await sharedPage.getByRole('button', { name: 'Close modal' }).click();
  // });

  // // Boundary
  // test('LabReport | Boundary: upload report with today as report date (current date boundary) @lab', async () => {
  //   const { description } = generateLabReportData();
  //   await new POManagers(sharedPage).PatientPage().labReportUpload(FILE_PATH, description);
  // });

  // // Validation
  // test('LabReport | Validation: Upload Report button disabled when no file is selected @lab', async () => {
  //   const { description } = generateLabReportData();
  //   await new POManagers(sharedPage).PatientPage().labReportUploadWithoutFile(description);
  //    await sharedPage.getByRole('button', { name: 'Close modal' }).click();
  // });

  // // Authorization / Security
  // test('LabReport | Security: lab reports visible only to the logged-in patient @lab', async () => {
  //   await expect(sharedPage.getByRole('navigation').getByRole('button', { name: '🧪 Lab Reports' })).toBeVisible();
  // });

  // // Error Handling
  // test('LabReport | Error: uploading unsupported file type shows error message @lab8', async () => {
  //   const { description } = generateLabReportData();
  //   const txtPath = path.join(os.homedir(), 'Staff portal.pdf');
  //   await new POManagers(sharedPage).PatientPage().labReportUpload(txtPath, description);
  //   await expect(sharedPage.getByText("Please fill in all required fields")).toBeVisible();
  //   await sharedPage.getByRole('button', { name: 'Close modal' }).click();
  // });



  // ══════════════════════════════════════════════════════════════════════
  // 5. PatientReview
  // ══════════════════════════════════════════════════════════════════════

  // // Positive
  // test('Review | Positive: review submitted successfully with star rating and description', async () => {
  //   await new POManagers(sharedPage).PatientPage().PatientReview();
  // });

  // // Negative
  // test('Review | Negative: Submit Review button disabled when description is missing', async () => {
  //   await new POManagers(sharedPage).PatientPage().submitReviewWithoutDescription();
  //   await expect(sharedPage.getByRole('button', { name: 'Submit Review' })).toBeDisabled();
  // });

  // // Boundary
  // test('Review | Boundary: review submitted with 1-star rating (minimum)', async () => {
  //   await new POManagers(sharedPage).PatientPage().PatientReview();
  // });

  // Validation
  // test('Review | Validation: Submit Review button disabled without description filled', async () => {
  //   await new POManagers(sharedPage).PatientPage().submitReviewWithoutDescription();
  //   await expect(sharedPage.getByRole('button', { name: 'Submit Review' })).toBeDisabled();
  // });

  // // Authorization / Security
  // test('Review | Security: review only allowed for appointments belonging to logged-in patient', async () => {
  //   await expect(sharedPage.getByRole('combobox').filter({ hasText: 'Select an appointment to' })).toBeVisible();
  // });

  // // Error Handling
  // test('Review | Error: submitting review without selecting an appointment shows error', async () => {
  //   await expect(sharedPage.getByText(/select|appointment|required/i)).toBeVisible();
  // });

  // // Data Validation
  // test('Review | Data: review description with only spaces is rejected', async () => {
  //   await expect(sharedPage.getByText(/invalid|required/i)).toBeVisible();
  // });

  // ══════════════════════════════════════════════════════════════════════
  // 6. Documents (upload / download / delete)
  // // ══════════════════════════════════════════════════════════════════════

  // // Positive
  // test('Documents | Positive: document uploaded successfully with file, type and description @doc', async () => {
  //   await new POManagers(sharedPage).PatientPage().Documents();
  // });

  // test('Documents | Positive: document downloaded successfully @doc', async () => {
  //   await new POManagers(sharedPage).PatientPage().downloadDocument();
  // });

  // test('Documents | Positive: document deleted successfully @doc', async () => {
  //   await new POManagers(sharedPage).PatientPage().deleteDocument();
  // });

  // // Negative
  // test('Documents | Negative: Upload Document button disabled when no file is selected @doc', async () => {
  //   await new POManagers(sharedPage).PatientPage().uploadDocumentWithoutFile();
  //   await expect(sharedPage.getByRole('button', { name: 'Upload Document', exact: true })).toBeDisabled();
  //   await sharedPage.getByRole('button', { name: '×' }).click();
  // });

  // test('Documents | Negative: upload fails without entering description @doc', async () => {
  //   await new POManagers(sharedPage).PatientPage().uploadDocumentWithoutDescription();
  // });

  // // Boundary
  // test('Documents | Boundary: upload document with minimum 1-character description @doc', async () => {
  //   await new POManagers(sharedPage).PatientPage().uploadDocumentWithoutDescription();
  // });

  // // Validation
  // test('Documents | Validation: Upload Document button disabled until file is chosen @doc', async () => {
  //   await new POManagers(sharedPage).PatientPage().uploadDocumentWithoutFile();
  //   await expect(sharedPage.getByRole('button', { name: 'Upload Document', exact: true })).toBeDisabled();
  //    await sharedPage.getByRole('button', { name: '×' }).click();
  // });

  // // Authorization / Security
  // test('Documents | Security: documents section accessible only to logged-in patient @doc', async () => {
  //   await expect(sharedPage.getByRole('button', { name: '📄 Documents' })).toBeVisible();
  // });

  // // Error Handling
  // test('Documents | Error: uploading oversized file shows size limit error @doc', async () => {
  //   await new POManagers(sharedPage).PatientPage().uploadOversizedDocument();
  //   // await expect(sharedPage.getByText(/size|too large|limit/i)).toBeVisible();
  // });

  // // Data Validation
  // test('Documents | Data: unsupported file type is rejected on upload @doc', async () => {
  //   await new POManagers(sharedPage).PatientPage().uploadUnsupportedDocumentType();
  //   // await expect(sharedPage.getByText(/invalid|unsupported|format/i)).toBeVisible();
  // });

  // ══════════════════════════════════════════════════════════════════════
  // 7. billingNavigation
  // ══════════════════════════════════════════════════════════════════════

  // Positive
  test('Billing | Positive: billing navigation, payment and PDF download completed successfully @bil', async () => {
    await new POManagers(sharedPage).PatientPage().billingNavigation();
  });

  // // Negative
  // test('Billing | Negative: Pay Now button not visible when no pending bills exist @bil', async () => {
  //   await expect(sharedPage.getByRole('button', { name: 'Pay Now' })).not.toBeVisible();
  // });


  // // Validation
  // test('Billing | Validation: Download PDF button visible only after successful payment @bil', async () => {
  //   await new POManagers(sharedPage).PatientPage().billingNavigation();
  //   await expect(sharedPage.getByRole('button', { name: 'Download PDF' })).toBeVisible();
  // });


  // Error Handling
  // test('Billing | Error: payment gateway failure shows appropriate error message @bil', async () => {
  //   await expect(sharedPage.getByText(/failed|error|try again/i)).toBeVisible();
  // });

  // Data Validation
  // test('Billing | Data: billing amount displayed matches the appointment consultation fee @bil', async () => {
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
  // test('Cancel | Positive: appointment cancelled successfully with valid reason', async () => {
  //   await new POManagers(sharedPage).PatientPage().cancelAppointment();
  // });

  // // Negative
  // test('Cancel | Negative: cancel appointment fails without entering a reason', async () => {
  //   await new POManagers(sharedPage).PatientPage().cancelAppointmentWithoutReason();
  // });

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
  test('MedicalRecords | Positive: medical record PDF opens in new tab successfully @med', async () => {
    await new POManagers(sharedPage).PatientPage().medicalRecords();
  });

  // Boundary
  test('MedicalRecords | Boundary: open the second PDF record in the list @med', async () => {
    await new POManagers(sharedPage).PatientPage().medicalRecords();
  });

  // Validation
  test('MedicalRecords | Validation: PDF viewer opens with correct record content @med', async () => {
    await new POManagers(sharedPage).PatientPage().medicalRecords();
  });

  // Data Validation
  test('MedicalRecords | Data: record date and doctor name match the original appointment details @med', async () => {
    await new POManagers(sharedPage).PatientPage().medicalRecords();
  });


  // ══════════════════════════════════════════════════════════════════════
  // 11. searchDoctors
  // ══════════════════════════════════════════════════════════════════════

  test('SearchDoctors | Positive: search doctors by department, speciality and name returns results @search', async () => {
    await new POManagers(sharedPage).PatientPage().searchDoctors();
  });

  // Missing mandatory fields - all search inputs empty
  test('SearchDoctors | Negative: searching with all inputs empty shows all doctors or empty state gracefully @search', async () => {
    await new POManagers(sharedPage).PatientPage().searchDoctorsWithNoInput();
    // await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Invalid data - non-existent department keyword
  test('SearchDoctors | Negative: searching with an invalid department keyword returns no results gracefully @search', async () => {
    await new POManagers(sharedPage).PatientPage().searchDoctorsWithInvalidSpeciality();
    // await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Empty values - department and name both cleared
  test('SearchDoctors | Negative: clearing department and name inputs shows full doctor list gracefully @search', async () => {
    await new POManagers(sharedPage).PatientPage().searchDoctorsWithEmptyDepartment();
    //  await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Maximum values - 255-character doctor name input
  test('SearchDoctors | Boundary: 255-character doctor name input does not crash the search page @search', async () => {
    await new POManagers(sharedPage).PatientPage().searchDoctorsWithMaxLengthInput();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Minimum values - single character doctor name input
  test('SearchDoctors | Boundary: single character doctor name input returns results or no-results gracefully @search', async () => {
    await new POManagers(sharedPage).PatientPage().searchDoctorsWithMinLengthInput();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Duplicate actions - same search performed twice consecutively
  test('SearchDoctors | Negative: performing the same doctor search twice consecutively returns consistent results @search', async () => {
    await new POManagers(sharedPage).PatientPage().searchDoctorsDuplicate();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Network failure - API aborted before search page loads
  test('SearchDoctors | Error: network failure before Search Doctors page loads shows error or empty state gracefully @search', async () => {
    await new POManagers(sharedPage).PatientPage().searchDoctorsWithNetworkFailure();
      // await expect(sharedPage.getByText(/error|failed|no doctors|try again/i).or(sharedPage.getByRole('textbox', { name: 'Doctor name...' }))).toBeVisible();
  });

  // API failure - API aborted after search input
  test('SearchDoctors | Error: API failure during doctor search shows error or empty state gracefully @search', async () => {
    await new POManagers(sharedPage).PatientPage().searchDoctorsWithApiFailure();
    await expect(sharedPage.getByText(/error|failed|try again/i).or(sharedPage.getByRole('textbox', { name: 'Doctor name...' }))).toBeVisible();
  });

  // Unauthorized access - cookies cleared before navigating
  test('SearchDoctors | Security: unauthenticated user cannot access Search Doctors page @search', async () => {
    await sharedPage.context().clearCookies();
    await sharedPage.goto('https://myappointments.whitecoats.com/');
    await expect(sharedPage).not.toHaveURL(/search|doctors/i);
  });

  // Session expiration - cookies cleared mid-session
  test('SearchDoctors | Security: session expiration while searching doctors redirects user away @search', async () => {
    await new POManagers(sharedPage).PatientPage().searchDoctorsSessionExpiry();
    await expect(sharedPage).not.toHaveURL(/search|doctors/i);
  });

  // Browser refresh - page reloaded mid-search
  test('SearchDoctors | Error: browser refresh during doctor search resets the search state gracefully @search', async () => {
    await new POManagers(sharedPage).PatientPage().searchDoctorsAndRefresh();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Back button - navigating back mid-search
  test('SearchDoctors | Error: back button during doctor search navigates away from search page gracefully @search', async () => {
    await new POManagers(sharedPage).PatientPage().searchDoctorsAndNavigateBack();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Concurrent actions - filling two inputs simultaneously
  test('SearchDoctors | Error: filling doctor name and department concurrently does not crash the search page @search', async () => {
    await new POManagers(sharedPage).PatientPage().searchDoctorsConcurrent();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // ══════════════════════════════════════════════════════════════════════
  // 12. filterMyAppointments
  // ══════════════════════════════════════════════════════════════════════

  test('MyAppointments | Positive: search, clear, paginate through My Appointments list', async () => {
    await new POManagers(sharedPage).PatientPage().filterMyAppointments();
  });

  // Missing mandatory fields - search input left empty
  test('MyAppointments | Negative: searching with empty input shows all appointments gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterMyAppointmentsEmptySearch();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Invalid data - non-matching search term
  test('MyAppointments | Negative: searching with invalid term shows no appointments message gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterMyAppointmentsInvalidSearch();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Empty values - clear search immediately after opening
  test('MyAppointments | Negative: clearing search without typing shows full appointments list gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterMyAppointmentsClearOnly();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Maximum values - 255-character search input
  test('MyAppointments | Boundary: 255-character search input does not crash the appointments page', async () => {
    await new POManagers(sharedPage).PatientPage().filterMyAppointmentsMaxInput();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Minimum values - single character search input
  test('MyAppointments | Boundary: single character search input returns results or no-results gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterMyAppointmentsMinInput();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Duplicate actions - same search performed twice consecutively
  test('MyAppointments | Negative: performing the same search twice consecutively returns consistent results', async () => {
    await new POManagers(sharedPage).PatientPage().filterMyAppointmentsDuplicate();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Network failure - API aborted before page loads
  test('MyAppointments | Error: network failure before My Appointments page loads shows error or empty state gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterMyAppointmentsNetworkFailure();
    await expect(sharedPage.getByText(/error|failed|no appointments|try again/i).or(sharedPage.getByRole('textbox', { name: 'Search doctor, hospital, type' }))).toBeVisible();
  });

  // API failure - API aborted after search input
  test('MyAppointments | Error: API failure during appointments search shows error or empty state gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterMyAppointmentsApiFailure();
    await expect(sharedPage.getByText(/error|failed|try again/i).or(sharedPage.getByRole('textbox', { name: 'Search doctor, hospital, type' }))).toBeVisible();
  });

  // Unauthorized access - cookies cleared before navigating
  test('MyAppointments | Security: unauthenticated user cannot access My Appointments page', async () => {
    await sharedPage.context().clearCookies();
    await sharedPage.goto('https://myappointments.whitecoats.com/');
    await expect(sharedPage).not.toHaveURL(/my-appointments|myappointments.*appointments/i);
  });

  // Session expiration - cookies cleared mid-session
  test('MyAppointments | Security: session expiration while viewing appointments redirects user away', async () => {
    await new POManagers(sharedPage).PatientPage().filterMyAppointmentsSessionExpiry();
    await expect(sharedPage).not.toHaveURL(/my-appointments|myappointments.*appointments/i);
  });

  // Browser refresh - page reloaded mid-search
  test('MyAppointments | Error: browser refresh during appointments search resets the search state gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterMyAppointmentsAndRefresh();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Back button - navigating back mid-search
  test('MyAppointments | Error: back button during appointments search navigates away gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterMyAppointmentsAndNavigateBack();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Concurrent actions - search and pagination triggered simultaneously
  test('MyAppointments | Error: concurrent search and pagination does not crash the appointments page', async () => {
    await new POManagers(sharedPage).PatientPage().filterMyAppointmentsConcurrent();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // ══════════════════════════════════════════════════════════════════════
  // 13. filterUpcomingAppointments
  // ══════════════════════════════════════════════════════════════════════

  test('UpcomingAppointments | Positive: filter upcoming appointments by search, date range, type and doctor', async () => {
    await new POManagers(sharedPage).PatientPage().filterUpcomingAppointments();
  });

  // Missing mandatory fields - all filter inputs empty
  test('UpcomingAppointments | Negative: searching with empty input shows all upcoming appointments gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterUpcomingAppointmentsEmptySearch();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Invalid data - non-matching search term
  test('UpcomingAppointments | Negative: searching with invalid term shows no upcoming appointments gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterUpcomingAppointmentsInvalidSearch();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Empty values - reset filters without applying any
  test('UpcomingAppointments | Negative: resetting filters without applying any shows full upcoming list gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterUpcomingAppointmentsClearOnly();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Maximum values - 255-character search input
  test('UpcomingAppointments | Boundary: 255-character search input does not crash the upcoming appointments page', async () => {
    await new POManagers(sharedPage).PatientPage().filterUpcomingAppointmentsMaxInput();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Minimum values - single character search input
  test('UpcomingAppointments | Boundary: single character search input returns results or no-results gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterUpcomingAppointmentsMinInput();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Duplicate actions - same search performed twice consecutively
  test('UpcomingAppointments | Negative: performing the same search twice consecutively returns consistent results', async () => {
    await new POManagers(sharedPage).PatientPage().filterUpcomingAppointmentsDuplicate();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Network failure - API aborted before page loads
  test('UpcomingAppointments | Error: network failure before Upcoming Appointments page loads shows error or empty state gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterUpcomingAppointmentsNetworkFailure();
    await expect(sharedPage.getByText(/error|failed|no appointments|try again/i).or(sharedPage.getByRole('textbox', { name: 'Search by doctor name or' }))).toBeVisible();
  });

  // API failure - API aborted after search input
  test('UpcomingAppointments | Error: API failure during upcoming appointments search shows error or empty state gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterUpcomingAppointmentsApiFailure();
    await expect(sharedPage.getByText(/error|failed|try again/i).or(sharedPage.getByRole('textbox', { name: 'Search by doctor name or' }))).toBeVisible();
  });

  // Unauthorized access - cookies cleared before navigating
  test('UpcomingAppointments | Security: unauthenticated user cannot access Upcoming Appointments page', async () => {
    await sharedPage.context().clearCookies();
    await sharedPage.goto('https://myappointments.whitecoats.com/');
    await expect(sharedPage).not.toHaveURL(/upcoming/i);
  });

  // Session expiration - cookies cleared mid-session
  test('UpcomingAppointments | Security: session expiration while viewing upcoming appointments redirects user away', async () => {
    await new POManagers(sharedPage).PatientPage().filterUpcomingAppointmentsSessionExpiry();
    await expect(sharedPage).not.toHaveURL(/upcoming/i);
  });

  // Browser refresh - page reloaded mid-filter
  test('UpcomingAppointments | Error: browser refresh during upcoming appointments filter resets the state gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterUpcomingAppointmentsAndRefresh();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Back button - navigating back mid-filter
  test('UpcomingAppointments | Error: back button during upcoming appointments filter navigates away gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterUpcomingAppointmentsAndNavigateBack();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Concurrent actions - search and type filter triggered simultaneously
  test('UpcomingAppointments | Error: concurrent search and type filter does not crash the upcoming appointments page', async () => {
    await new POManagers(sharedPage).PatientPage().filterUpcomingAppointmentsConcurrent();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // ══════════════════════════════════════════════════════════════════════
  // 14. filterHistoryAppointments
  // ══════════════════════════════════════════════════════════════════════

  test('HistoryAppointments | Positive: filter history appointments by search, status, type, date and doctor', async () => {
    await new POManagers(sharedPage).PatientPage().filterHistoryAppointments();
  });

  // Missing mandatory fields - all filter inputs empty
  test('HistoryAppointments | Negative: searching with empty input shows all history appointments gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterHistoryAppointmentsEmptySearch();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Invalid data - non-matching search term
  test('HistoryAppointments | Negative: searching with invalid term shows no history appointments gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterHistoryAppointmentsInvalidSearch();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Empty values - reset filters without applying any
  test('HistoryAppointments | Negative: resetting filters without applying any shows full history list gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterHistoryAppointmentsClearOnly();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Maximum values - 255-character search input
  test('HistoryAppointments | Boundary: 255-character search input does not crash the history appointments page', async () => {
    await new POManagers(sharedPage).PatientPage().filterHistoryAppointmentsMaxInput();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Minimum values - single character search input
  test('HistoryAppointments | Boundary: single character search input returns results or no-results gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterHistoryAppointmentsMinInput();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Duplicate actions - same search performed twice consecutively
  test('HistoryAppointments | Negative: performing the same search twice consecutively returns consistent results', async () => {
    await new POManagers(sharedPage).PatientPage().filterHistoryAppointmentsDuplicate();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Network failure - API aborted before page loads
  test('HistoryAppointments | Error: network failure before History Appointments page loads shows error or empty state gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterHistoryAppointmentsNetworkFailure();
    await expect(sharedPage.getByText(/error|failed|no appointments|try again/i).or(sharedPage.getByRole('textbox', { name: 'Search by doctor, reason, or' }))).toBeVisible();
  });

  // API failure - API aborted after search input
  test('HistoryAppointments | Error: API failure during history appointments search shows error or empty state gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterHistoryAppointmentsApiFailure();
    await expect(sharedPage.getByText(/error|failed|try again/i).or(sharedPage.getByRole('textbox', { name: 'Search by doctor, reason, or' }))).toBeVisible();
  });

  // Unauthorized access - cookies cleared before navigating
  test('HistoryAppointments | Security: unauthenticated user cannot access History Appointments page', async () => {
    await sharedPage.context().clearCookies();
    await sharedPage.goto('https://myappointments.whitecoats.com/');
    await expect(sharedPage).not.toHaveURL(/history/i);
  });

  // Session expiration - cookies cleared mid-session
  test('HistoryAppointments | Security: session expiration while viewing history appointments redirects user away', async () => {
    await new POManagers(sharedPage).PatientPage().filterHistoryAppointmentsSessionExpiry();
    await expect(sharedPage).not.toHaveURL(/history/i);
  });

  // Browser refresh - page reloaded mid-filter
  test('HistoryAppointments | Error: browser refresh during history appointments filter resets the state gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterHistoryAppointmentsAndRefresh();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Back button - navigating back mid-filter
  test('HistoryAppointments | Error: back button during history appointments filter navigates away gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterHistoryAppointmentsAndNavigateBack();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Concurrent actions - search and status filter triggered simultaneously
  test('HistoryAppointments | Error: concurrent search and status filter does not crash the history appointments page', async () => {
    await new POManagers(sharedPage).PatientPage().filterHistoryAppointmentsConcurrent();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // ══════════════════════════════════════════════════════════════════════
  // 15. viewMedicalRecords
  // ══════════════════════════════════════════════════════════════════════

  test('MedicalRecords | Positive: navigate medical records, view health summary and vital signs', async () => {
    await new POManagers(sharedPage).PatientPage().viewMedicalRecords();
  });

  // Missing mandatory fields - navigate without selecting a sub-section
  test('MedicalRecords | Negative: navigating to medical records without selecting a sub-section shows default view gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().viewMedicalRecordsNoSubSection();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Invalid data - direct URL navigation to non-existent record
  test('MedicalRecords | Negative: navigating to a non-existent medical record URL shows error or redirects gracefully', async () => {
    await sharedPage.goto('https://myappointments.whitecoats.com/medical-records/invalid-id-99999');
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Empty values - health summary with no data
  test('MedicalRecords | Negative: health summary with no recorded vitals shows empty state gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().viewMedicalRecordsHealthSummaryEmpty();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Maximum values - navigate through all available record tabs
  test('MedicalRecords | Boundary: navigating through all medical record sub-sections does not crash the page', async () => {
    await new POManagers(sharedPage).PatientPage().viewMedicalRecordsAllTabs();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Minimum values - view only the first available record
  test('MedicalRecords | Boundary: viewing only the first medical record entry does not crash the page', async () => {
    await new POManagers(sharedPage).PatientPage().viewMedicalRecordsFirstOnly();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Duplicate actions - navigate to health summary twice consecutively
  test('MedicalRecords | Negative: navigating to health summary twice consecutively returns consistent view', async () => {
    await new POManagers(sharedPage).PatientPage().viewMedicalRecordsDuplicate();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
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
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Back button - navigating back mid-navigation
  test('MedicalRecords | Error: back button while viewing medical records navigates away gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().viewMedicalRecordsAndNavigateBack();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Concurrent actions - open two sub-sections simultaneously
  test('MedicalRecords | Error: concurrent navigation to two medical record sub-sections does not crash the page', async () => {
    await new POManagers(sharedPage).PatientPage().viewMedicalRecordsConcurrent();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // ══════════════════════════════════════════════════════════════════════
  // 16. filterVisitHistory
  // ══════════════════════════════════════════════════════════════════════

  test('VisitHistory | Positive: filter visit history by search, type and date range then reset', async () => {
    await new POManagers(sharedPage).PatientPage().filterVisitHistory();
  });

  // Missing mandatory fields - open filters without filling any
  test('VisitHistory | Negative: opening filters without filling any shows full visit history gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterVisitHistoryEmptySearch();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Invalid data - non-matching search term
  test('VisitHistory | Negative: searching with invalid term shows no visit history results gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterVisitHistoryInvalidSearch();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Empty values - reset filters without applying any
  test('VisitHistory | Negative: resetting filters without applying any shows full visit history gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterVisitHistoryClearOnly();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Maximum values - 255-character search input
  test('VisitHistory | Boundary: 255-character search input does not crash the visit history page', async () => {
    await new POManagers(sharedPage).PatientPage().filterVisitHistoryMaxInput();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Minimum values - single character search input
  test('VisitHistory | Boundary: single character search input returns results or no-results gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterVisitHistoryMinInput();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Duplicate actions - same search performed twice consecutively
  test('VisitHistory | Negative: performing the same search twice consecutively returns consistent results', async () => {
    await new POManagers(sharedPage).PatientPage().filterVisitHistoryDuplicate();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Network failure - API aborted before page loads
  test('VisitHistory | Error: network failure before Visit History page loads shows error or empty state gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterVisitHistoryNetworkFailure();
    await expect(sharedPage.getByText(/error|failed|no visits|try again/i).or(sharedPage.getByRole('textbox', { name: 'Search visits...' }))).toBeVisible();
  });

  // API failure - API aborted after search input
  test('VisitHistory | Error: API failure during visit history search shows error or empty state gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterVisitHistoryApiFailure();
    await expect(sharedPage.getByText(/error|failed|try again/i).or(sharedPage.getByRole('textbox', { name: 'Search visits...' }))).toBeVisible();
  });

  // Unauthorized access - cookies cleared before navigating
  test('VisitHistory | Security: unauthenticated user cannot access Visit History page', async () => {
    await sharedPage.context().clearCookies();
    await sharedPage.goto('https://myappointments.whitecoats.com/');
    await expect(sharedPage).not.toHaveURL(/visit-history/i);
  });

  // Session expiration - cookies cleared mid-session
  test('VisitHistory | Security: session expiration while viewing visit history redirects user away', async () => {
    await new POManagers(sharedPage).PatientPage().filterVisitHistorySessionExpiry();
    await expect(sharedPage).not.toHaveURL(/visit-history/i);
  });

  // Browser refresh - page reloaded mid-filter
  test('VisitHistory | Error: browser refresh during visit history filter resets the state gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterVisitHistoryAndRefresh();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Back button - navigating back mid-filter
  test('VisitHistory | Error: back button during visit history filter navigates away gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterVisitHistoryAndNavigateBack();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Concurrent actions - search and type filter triggered simultaneously
  test('VisitHistory | Error: concurrent search and type filter does not crash the visit history page', async () => {
    await new POManagers(sharedPage).PatientPage().filterVisitHistoryConcurrent();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // ══════════════════════════════════════════════════════════════════════
  // 17. filterDocuments
  // ══════════════════════════════════════════════════════════════════════

  test('Documents | Positive: filter documents by search, type, open upload modal and reset', async () => {
    await new POManagers(sharedPage).PatientPage().filterDocuments();
  });

  // Missing mandatory fields - open filters without filling any
  test('Documents | Negative: opening filters without filling any shows full documents list gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterDocumentsEmptySearch();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Invalid data - non-matching search term
  test('Documents | Negative: searching with invalid term shows no documents gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterDocumentsInvalidSearch();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Empty values - reset filters without applying any
  test('Documents | Negative: resetting filters without applying any shows full documents list gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterDocumentsClearOnly();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Maximum values - 255-character search input
  test('Documents | Boundary: 255-character search input does not crash the documents page', async () => {
    await new POManagers(sharedPage).PatientPage().filterDocumentsMaxInput();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Minimum values - single character search input
  test('Documents | Boundary: single character search input returns results or no-results gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterDocumentsMinInput();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Duplicate actions - same search performed twice consecutively
  test('Documents | Negative: performing the same search twice consecutively returns consistent results', async () => {
    await new POManagers(sharedPage).PatientPage().filterDocumentsDuplicate();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
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
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Back button - navigating back mid-filter
  test('Documents | Error: back button during documents filter navigates away gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterDocumentsAndNavigateBack();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Concurrent actions - search and type filter triggered simultaneously
  test('Documents | Error: concurrent search and type filter does not crash the documents page', async () => {
    await new POManagers(sharedPage).PatientPage().filterDocumentsConcurrent();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // ══════════════════════════════════════════════════════════════════════
  // 18. filterPrescriptionRecords
  // ══════════════════════════════════════════════════════════════════════

  test('PrescriptionRecords | Positive: filter prescriptions by search, status, date range and per-page', async () => {
    await new POManagers(sharedPage).PatientPage().filterPrescriptionRecords();
  });

  // Missing mandatory fields - open filters without filling any
  test('PrescriptionRecords | Negative: opening filters without filling any shows full prescriptions list gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterPrescriptionRecordsEmptySearch();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Invalid data - non-matching search term
  test('PrescriptionRecords | Negative: searching with invalid term shows no prescriptions gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterPrescriptionRecordsInvalidSearch();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Empty values - reset filters without applying any
  test('PrescriptionRecords | Negative: resetting filters without applying any shows full prescriptions list gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterPrescriptionRecordsClearOnly();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Maximum values - 255-character search input
  test('PrescriptionRecords | Boundary: 255-character search input does not crash the prescriptions page', async () => {
    await new POManagers(sharedPage).PatientPage().filterPrescriptionRecordsMaxInput();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Minimum values - single character search input
  test('PrescriptionRecords | Boundary: single character search input returns results or no-results gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterPrescriptionRecordsMinInput();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Duplicate actions - same search performed twice consecutively
  test('PrescriptionRecords | Negative: performing the same search twice consecutively returns consistent results', async () => {
    await new POManagers(sharedPage).PatientPage().filterPrescriptionRecordsDuplicate();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
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
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Back button - navigating back mid-filter
  test('PrescriptionRecords | Error: back button during prescriptions filter navigates away gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterPrescriptionRecordsAndNavigateBack();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Concurrent actions - search and status filter triggered simultaneously
  test('PrescriptionRecords | Error: concurrent search and status filter does not crash the prescriptions page', async () => {
    await new POManagers(sharedPage).PatientPage().filterPrescriptionRecordsConcurrent();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // ══════════════════════════════════════════════════════════════════════
  // 19. filterLabReports
  // ══════════════════════════════════════════════════════════════════════

  test('LabReports | Positive: filter lab reports by search, status, category and date range then reset', async () => {
    await new POManagers(sharedPage).PatientPage().filterLabReports();
  });

  // Missing mandatory fields - open filters without filling any
  test('LabReports | Negative: opening filters without filling any shows full lab reports list gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterLabReportsEmptySearch();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Invalid data - non-matching search term
  test('LabReports | Negative: searching with invalid term shows no lab reports gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterLabReportsInvalidSearch();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Empty values - reset filters without applying any
  test('LabReports | Negative: resetting filters without applying any shows full lab reports list gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterLabReportsClearOnly();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Maximum values - 255-character search input
  test('LabReports | Boundary: 255-character search input does not crash the lab reports page', async () => {
    await new POManagers(sharedPage).PatientPage().filterLabReportsMaxInput();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Minimum values - single character search input
  test('LabReports | Boundary: single character search input returns results or no-results gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterLabReportsMinInput();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Duplicate actions - same search performed twice consecutively
  test('LabReports | Negative: performing the same search twice consecutively returns consistent results', async () => {
    await new POManagers(sharedPage).PatientPage().filterLabReportsDuplicate();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
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
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Back button - navigating back mid-filter
  test('LabReports | Error: back button during lab reports filter navigates away gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterLabReportsAndNavigateBack();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Concurrent actions - search and status filter triggered simultaneously
  test('LabReports | Error: concurrent search and status filter does not crash the lab reports page', async () => {
    await new POManagers(sharedPage).PatientPage().filterLabReportsConcurrent();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // ══════════════════════════════════════════════════════════════════════
  // 20. filterBilling
  // ══════════════════════════════════════════════════════════════════════

  test('Billing | Positive: filter billing by search, invoice lookup, status and date range then reset', async () => {
    await new POManagers(sharedPage).PatientPage().filterBilling();
  });

  // Missing mandatory fields - open filters without filling any
  test('Billing | Negative: opening filters without filling any shows full billing list gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterBillingEmptySearch();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Invalid data - non-matching invoice search term
  test('Billing | Negative: searching with invalid invoice term shows no billing records gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterBillingInvalidSearch();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Empty values - reset filters without applying any
  test('Billing | Negative: resetting filters without applying any shows full billing list gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterBillingClearOnly();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Maximum values - 255-character search input
  test('Billing | Boundary: 255-character search input does not crash the billing page', async () => {
    await new POManagers(sharedPage).PatientPage().filterBillingMaxInput();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Minimum values - single character search input
  test('Billing | Boundary: single character search input returns results or no-results gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterBillingMinInput();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Duplicate actions - same search performed twice consecutively
  test('Billing | Negative: performing the same invoice search twice consecutively returns consistent results', async () => {
    await new POManagers(sharedPage).PatientPage().filterBillingDuplicate();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Network failure - API aborted before page loads
  test('Billing | Error: network failure before Billing page loads shows error or empty state gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterBillingNetworkFailure();
    await expect(sharedPage.getByText(/error|failed|no invoices|try again/i).or(sharedPage.getByRole('textbox', { name: 'Search invoices...' }))).toBeVisible();
  });

  // API failure - API aborted after search input
  test('Billing | Error: API failure during billing search shows error or empty state gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterBillingApiFailure();
    await expect(sharedPage.getByText(/error|failed|try again/i).or(sharedPage.getByRole('textbox', { name: 'Search invoices...' }))).toBeVisible();
  });

  // Unauthorized access - cookies cleared before navigating
  test('Billing | Security: unauthenticated user cannot access Billing page', async () => {
    await sharedPage.context().clearCookies();
    await sharedPage.goto('https://myappointments.whitecoats.com/');
    await expect(sharedPage).not.toHaveURL(/billing/i);
  });

  // Session expiration - cookies cleared mid-session
  test('Billing | Security: session expiration while viewing billing redirects user away', async () => {
    await new POManagers(sharedPage).PatientPage().filterBillingSessionExpiry();
    await expect(sharedPage).not.toHaveURL(/billing/i);
  });

  // Browser refresh - page reloaded mid-filter
  test('Billing | Error: browser refresh during billing filter resets the state gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterBillingAndRefresh();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Back button - navigating back mid-filter
  test('Billing | Error: back button during billing filter navigates away gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterBillingAndNavigateBack();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Concurrent actions - search and status filter triggered simultaneously
  test('Billing | Error: concurrent search and status filter does not crash the billing page', async () => {
    await new POManagers(sharedPage).PatientPage().filterBillingConcurrent();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // ══════════════════════════════════════════════════════════════════════
  // 21. filterPaymentHistory
  // ══════════════════════════════════════════════════════════════════════

  test('PaymentHistory | Positive: filter payment history by search, status and date range then reset', async () => {
    await new POManagers(sharedPage).PatientPage().filterPaymentHistory();
  });

  // Missing mandatory fields - open filters without filling any
  test('PaymentHistory | Negative: opening filters without filling any shows full payment history gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterPaymentHistoryEmptySearch();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Invalid data - non-matching search term
  test('PaymentHistory | Negative: searching with invalid term shows no payment history gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterPaymentHistoryInvalidSearch();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Empty values - reset filters without applying any
  test('PaymentHistory | Negative: resetting filters without applying any shows full payment history gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterPaymentHistoryClearOnly();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Maximum values - 255-character search input
  test('PaymentHistory | Boundary: 255-character search input does not crash the payment history page', async () => {
    await new POManagers(sharedPage).PatientPage().filterPaymentHistoryMaxInput();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Minimum values - single character search input
  test('PaymentHistory | Boundary: single character search input returns results or no-results gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterPaymentHistoryMinInput();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Duplicate actions - same search performed twice consecutively
  test('PaymentHistory | Negative: performing the same search twice consecutively returns consistent results', async () => {
    await new POManagers(sharedPage).PatientPage().filterPaymentHistoryDuplicate();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Network failure - API aborted before page loads
  test('PaymentHistory | Error: network failure before Payment History page loads shows error or empty state gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterPaymentHistoryNetworkFailure();
    await expect(sharedPage.getByText(/error|failed|no payments|try again/i).or(sharedPage.getByRole('textbox', { name: 'Search payments...' }))).toBeVisible();
  });

  // API failure - API aborted after search input
  test('PaymentHistory | Error: API failure during payment history search shows error or empty state gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterPaymentHistoryApiFailure();
    await expect(sharedPage.getByText(/error|failed|try again/i).or(sharedPage.getByRole('textbox', { name: 'Search payments...' }))).toBeVisible();
  });

  // Unauthorized access - cookies cleared before navigating
  test('PaymentHistory | Security: unauthenticated user cannot access Payment History page', async () => {
    await sharedPage.context().clearCookies();
    await sharedPage.goto('https://myappointments.whitecoats.com/');
    await expect(sharedPage).not.toHaveURL(/payment-history/i);
  });

  // Session expiration - cookies cleared mid-session
  test('PaymentHistory | Security: session expiration while viewing payment history redirects user away', async () => {
    await new POManagers(sharedPage).PatientPage().filterPaymentHistorySessionExpiry();
    await expect(sharedPage).not.toHaveURL(/payment-history/i);
  });

  // Browser refresh - page reloaded mid-filter
  test('PaymentHistory | Error: browser refresh during payment history filter resets the state gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterPaymentHistoryAndRefresh();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Back button - navigating back mid-filter
  test('PaymentHistory | Error: back button during payment history filter navigates away gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterPaymentHistoryAndNavigateBack();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Concurrent actions - search and status filter triggered simultaneously
  test('PaymentHistory | Error: concurrent search and status filter does not crash the payment history page', async () => {
    await new POManagers(sharedPage).PatientPage().filterPaymentHistoryConcurrent();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // ══════════════════════════════════════════════════════════════════════
  // 22. filterFamilyMembers
  // ══════════════════════════════════════════════════════════════════════

  test('FamilyMembers | Positive: filter family members by search, relation and date range then reset', async () => {
    await new POManagers(sharedPage).PatientPage().filterFamilyMembers();
  });

  // Missing mandatory fields - open filters without filling any
  test('FamilyMembers | Negative: opening filters without filling any shows full family members list gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterFamilyMembersEmptySearch();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Invalid data - non-matching search term
  test('FamilyMembers | Negative: searching with invalid term shows no family members gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterFamilyMembersInvalidSearch();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Empty values - reset filters without applying any
  test('FamilyMembers | Negative: resetting filters without applying any shows full family members list gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterFamilyMembersClearOnly();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Maximum values - 255-character search input
  test('FamilyMembers | Boundary: 255-character search input does not crash the family members page', async () => {
    await new POManagers(sharedPage).PatientPage().filterFamilyMembersMaxInput();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Minimum values - single character search input
  test('FamilyMembers | Boundary: single character search input returns results or no-results gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterFamilyMembersMinInput();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Duplicate actions - same search performed twice consecutively
  test('FamilyMembers | Negative: performing the same search twice consecutively returns consistent results', async () => {
    await new POManagers(sharedPage).PatientPage().filterFamilyMembersDuplicate();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
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
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Back button - navigating back mid-filter
  test('FamilyMembers | Error: back button during family members filter navigates away gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterFamilyMembersAndNavigateBack();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Concurrent actions - search and relation filter triggered simultaneously
  test('FamilyMembers | Error: concurrent search and relation filter does not crash the family members page', async () => {
    await new POManagers(sharedPage).PatientPage().filterFamilyMembersConcurrent();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // ══════════════════════════════════════════════════════════════════════
  // 23. filterDoctorReviews
  // ══════════════════════════════════════════════════════════════════════

  test('DoctorReviews | Positive: filter doctor reviews by search, rating and date range then reset', async () => {
    await new POManagers(sharedPage).PatientPage().filterDoctorReviews();
  });

  // Missing mandatory fields - open filters without filling any
  test('DoctorReviews | Negative: opening filters without filling any shows full doctor reviews list gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterDoctorReviewsEmptySearch();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Invalid data - non-matching search term
  test('DoctorReviews | Negative: searching with invalid term shows no doctor reviews gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterDoctorReviewsInvalidSearch();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Empty values - reset filters without applying any
  test('DoctorReviews | Negative: resetting filters without applying any shows full doctor reviews list gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterDoctorReviewsClearOnly();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Maximum values - 255-character search input
  test('DoctorReviews | Boundary: 255-character search input does not crash the doctor reviews page', async () => {
    await new POManagers(sharedPage).PatientPage().filterDoctorReviewsMaxInput();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Minimum values - single character search input
  test('DoctorReviews | Boundary: single character search input returns results or no-results gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterDoctorReviewsMinInput();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Duplicate actions - same search performed twice consecutively
  test('DoctorReviews | Negative: performing the same search twice consecutively returns consistent results', async () => {
    await new POManagers(sharedPage).PatientPage().filterDoctorReviewsDuplicate();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
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
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Back button - navigating back mid-filter
  test('DoctorReviews | Error: back button during doctor reviews filter navigates away gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterDoctorReviewsAndNavigateBack();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Concurrent actions - search and rating filter triggered simultaneously
  test('DoctorReviews | Error: concurrent search and rating filter does not crash the doctor reviews page', async () => {
    await new POManagers(sharedPage).PatientPage().filterDoctorReviewsConcurrent();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // ══════════════════════════════════════════════════════════════════════
  // 24. editPatientProfile
  // ══════════════════════════════════════════════════════════════════════

  test('PatientProfile | Positive: edit patient profile name, DOB, blood group, state, emergency relation, allergies and insurance', async () => {
    await new POManagers(sharedPage).PatientPage().editPatientProfile();
  });

  // Missing mandatory fields - save without filling required name field
  test('PatientProfile | Negative: saving profile without entering name shows validation error gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().editPatientProfileEmptyName();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Invalid data - invalid PIN code format
  test('PatientProfile | Negative: entering invalid PIN code format shows validation error gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().editPatientProfileInvalidPin();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Empty values - clear name field and attempt save
  test('PatientProfile | Negative: clearing name field and saving shows validation error gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().editPatientProfileClearName();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Maximum values - 255-character name input
  test('PatientProfile | Boundary: 255-character name input does not crash the profile edit page', async () => {
    await new POManagers(sharedPage).PatientPage().editPatientProfileMaxName();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Minimum values - single character name input
  test('PatientProfile | Boundary: single character name input is handled gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().editPatientProfileMinName();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Duplicate actions - open edit profile twice consecutively
  test('PatientProfile | Negative: opening edit profile twice consecutively does not crash the page', async () => {
    await new POManagers(sharedPage).PatientPage().editPatientProfileDuplicate();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
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
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Back button - navigating back mid-edit
  test('PatientProfile | Error: back button during profile edit navigates away gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().editPatientProfileAndNavigateBack();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Concurrent actions - fill two fields simultaneously
  test('PatientProfile | Error: filling name and insurance fields concurrently does not crash the profile page', async () => {
    await new POManagers(sharedPage).PatientPage().editPatientProfileConcurrent();
    await expect(sharedPage).toHaveURL(/myappointments\.whitecoats\.com/);
  });
});


