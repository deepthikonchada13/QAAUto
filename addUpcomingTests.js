const fs = require('fs');
const file = 'tests/patientRole.spec.js';
let c = fs.readFileSync(file, 'utf8');

const anchor = `filterUpcomingAppointments();\n  });\n\n  // ${'═'.repeat(70)}\n  // 14.`;

const newTests = `filterUpcomingAppointments();
  });

  // Missing mandatory fields - all filter inputs empty
  test('UpcomingAppointments | Negative: searching with empty input shows all upcoming appointments gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterUpcomingAppointmentsEmptySearch();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Invalid data - non-matching search term
  test('UpcomingAppointments | Negative: searching with invalid term shows no upcoming appointments gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterUpcomingAppointmentsInvalidSearch();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Empty values - reset filters without applying any
  test('UpcomingAppointments | Negative: resetting filters without applying any shows full upcoming list gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterUpcomingAppointmentsClearOnly();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Maximum values - 255-character search input
  test('UpcomingAppointments | Boundary: 255-character search input does not crash the upcoming appointments page', async () => {
    await new POManagers(sharedPage).PatientPage().filterUpcomingAppointmentsMaxInput();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Minimum values - single character search input
  test('UpcomingAppointments | Boundary: single character search input returns results or no-results gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterUpcomingAppointmentsMinInput();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Duplicate actions - same search performed twice consecutively
  test('UpcomingAppointments | Negative: performing the same search twice consecutively returns consistent results', async () => {
    await new POManagers(sharedPage).PatientPage().filterUpcomingAppointmentsDuplicate();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
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
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Back button - navigating back mid-filter
  test('UpcomingAppointments | Error: back button during upcoming appointments filter navigates away gracefully', async () => {
    await new POManagers(sharedPage).PatientPage().filterUpcomingAppointmentsAndNavigateBack();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // Concurrent actions - search and type filter triggered simultaneously
  test('UpcomingAppointments | Error: concurrent search and type filter does not crash the upcoming appointments page', async () => {
    await new POManagers(sharedPage).PatientPage().filterUpcomingAppointmentsConcurrent();
    await expect(sharedPage).toHaveURL(/myappointments\\.whitecoats\\.com/);
  });

  // ${'═'.repeat(70)}
  // 14.`;

if (!c.includes(anchor)) { console.error('anchor not found'); process.exit(1); }
const result = c.replace(anchor, newTests);
fs.writeFileSync(file, result, 'utf8');
console.log('done, new length:', fs.readFileSync(file, 'utf8').length);
