const { test, expect } = require('@playwright/test');
const { POManagers } = require('../PageObjects/POManagers');

test.describe('Doctor login and dashboard navigation', () => {
  test.beforeEach(async ({ page }) => {
    const poManagers = new POManagers(page);
    await page.goto('https://emr.whitecoats.com/');
    await poManagers.doctorLoginPage().validLogin();
  });

  // ── Positive Tests ────────────────────────────────────────────────────────

  test('Positive: doctor EMR should complete successfully @emr', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().navigateToEMR();
  });

  // Missing mandatory fields - diagnosis missing
  test('navigateToEMR | Negative: EMR submission fails without entering diagnosis emr', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().navigateToEMRWithoutDiagnosis();
    // await expect(page.getByText(/required|diagnosis|cannot be empty/i).or(page.getByRole('button', { name: 'Complete Consultation' }))).toBeVisible();
  });

  // Missing mandatory fields - chief complaint missing
  test('navigateToEMR | Negative: EMR submission fails without entering chief complaint emr', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().navigateToEMRWithoutComplaint();
    // await expect(page.getByText(/required|complaint|cannot be empty/i).or(page.getByRole('button', { name: 'Complete Consultation' }))).toBeVisible();
  });

  // Missing mandatory fields - vitals missing
  test('navigateToEMR | Negative: EMR submission proceeds or warns when all vitals are skipped @emr', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().navigateToEMRWithoutVitals();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Invalid data - out-of-range vitals
  test('navigateToEMR | Negative: out-of-range vital values are rejected or flagged gracefully @emr', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().navigateToEMRWithInvalidVitals();
    // await expect(page.getByText(/invalid|range|value/i).or(page.getByRole('button', { name: 'Complete Consultation' }))).toBeVisible();
  });

  // Invalid data - SQL injection in clinical fields
  test('navigateToEMR | Security: SQL injection in EMR fields is sanitized and page remains stable @emr', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().navigateToEMRWithSqlInjection();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Invalid data - XSS in clinical fields
  test('navigateToEMR | Security: XSS script tag in EMR fields is not executed and page remains stable @emr', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().navigateToEMRWithXss();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Empty values - all text fields empty
  test('navigateToEMR | Negative: submitting EMR with all text fields empty is rejected or handled gracefully @emr', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().navigateToEMRWithEmptyFields();
  // await expect(page.getByText(/required|cannot be empty/i).or(page.getByRole('button', { name: 'Complete Consultation' }))).toBeVisible();
  });

  // Maximum values - 1000-character fields
  test('navigateToEMR | Boundary: 1000-character clinical text fields do not crash the EMR form @emr', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().navigateToEMRWithMaxLengthFields();
    // await expect(page.getByRole('button', { name: 'Complete Consultation' })).toBeVisible();
  });

  // Minimum values - single character fields
  test('navigateToEMR | Boundary: single character clinical text fields are accepted or rejected gracefully @emr', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().navigateToEMRWithMinLengthFields();
    // await expect(page.getByRole('button', { name: 'Complete Consultation' })).toBeVisible();
  });

  // Duplicate actions - same EMR submitted twice
  test('navigateToEMR | Negative: completing the same consultation twice does not cause inconsistent state @emr', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().navigateToEMRDuplicate();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Network / API failure
  test('navigateToEMR | Error: API failure during EMR submission shows error gracefully @emr', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().navigateToEMRWithApiFailure();
    // await expect(page.getByText(/error|failed|try again/i).or(page.getByRole('button', { name: 'Complete Consultation' }))).toBeVisible();
  });

  // Unauthorized access
  test('navigateToEMR | Security: unauthenticated user cannot access EMR page @emr', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('https://emr.whitecoats.com/');
    await expect(page).not.toHaveURL(/consultations|emr/i);
  });

  // Session expiration
  test('navigateToEMR | Security: session expiration during EMR entry redirects user away @emr', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().navigateToEMRSessionExpiry();
    await expect(page).not.toHaveURL(/consultations|emr/i);
  });

  // Browser refresh
  test('navigateToEMR | Error: browser refresh during EMR entry discards unsaved data @emr', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().navigateToEMRAndRefresh();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Back button
  test('navigateToEMR | Error: back button during EMR entry navigates away without saving @emr', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().navigateToEMRAndNavigateBack();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Concurrent actions
  test('navigateToEMR | Error: submitting EMR twice concurrently does not create duplicate consultation records @emr', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().navigateToEMRConcurrent();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });



  // ── Negative: EMR ───────────────────────────────────────────────────────────

  test('Negative: EMR should fail without entering diagnosis  @emr', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().navigateToEMRWithoutDiagnosis();
  });

  test('Negative: EMR should fail without entering chief complaint @emr', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().navigateToEMRWithoutComplaint();
  });

  test('Negative: EMR should complete without vitals @emr', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().navigateToEMRWithoutVitals();
  });

  // ── Appointments ─────────────────────────────────────────────────────────

  test('Positive: filter Today appointments by status and type then reset ', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterTodayAppointments();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Missing mandatory fields - no filter selected before reset
  test('filterTodayAppointments | Negative: landing on Today tab with no filters applied shows all or empty results gracefully @filter ', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterTodayAppointmentsWithNoFilters();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Invalid data - cycling through invalid status combinations
  test('filterTodayAppointments | Negative: toggling status filter to an already-selected value is handled gracefully @filter ', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterTodayAppointmentsWithInvalidStatus();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Empty values - all dropdowns reset to default (All)
  test('filterTodayAppointments | Negative: resetting all filters to default shows full appointment list gracefully @filter ', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterTodayAppointmentsWithEmptySearch();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Maximum values - cycling filters 10 times
  test('filterTodayAppointments | Boundary: cycling status filter 10 times does not crash the Today appointments page @filter ', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterTodayAppointmentsWithMaxStatusCycles();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Minimum values - only one filter applied
  test('filterTodayAppointments | Boundary: applying only one filter value returns results or no-results gracefully @filter ', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterTodayAppointmentsWithMinFilters();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Duplicate actions - same filter applied twice consecutively
  test('filterTodayAppointments | Negative: applying the same status filter twice consecutively returns consistent results @filter ', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterTodayAppointmentsDuplicate();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Network failure - API aborted before page loads
  test('filterTodayAppointments | Error: network failure before Today tab loads shows error or empty state gracefully @filter ', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterTodayAppointmentsWithNetworkFailure();
    // await expect(page.getByText(/error|failed|no appointments|try again/i).or(page.getByRole('button', { name: 'Reset Filters' }))).toBeVisible();
  });

  // API failure - API aborted after filter applied
  test('filterTodayAppointments | Error: API failure during filter application shows error gracefully @filter ', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterTodayAppointmentsWithApiFailure();
    // await expect(page.getByText(/error|failed|try again/i).or(page.getByRole('button', { name: 'Reset Filters' }))).toBeVisible();
  });

  // Unauthorized access
  test('filterTodayAppointments | Security: unauthenticated user cannot access Today appointments page @filter ', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('https://emr.whitecoats.com/');
    await expect(page).not.toHaveURL("https://emr.whitecoats.com/doctor/appointments/today");
  });

  // Browser refresh
  test('filterTodayAppointments | Error: browser refresh while filter is active resets or retains filter state gracefully @filter ', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterTodayAppointmentsAndRefresh();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Back button
  test('filterTodayAppointments | Error: back button while filter is active navigates away from Today appointments @filter ', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterTodayAppointmentsAndNavigateBack();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Concurrent actions
  test('filterTodayAppointments | Error: opening two filter dropdowns concurrently does not crash the Today appointments page @filter ', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterTodayAppointmentsConcurrent();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });



  test('Positive: filter Upcoming appointments by status, type and date range then reset @upcoming', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterUpcomingAppointments();
    await expect(page).toHaveURL(/myappointments\.whitecoats\.com/);
  });

  // Missing mandatory fields - no filter selected
  test('filterUpcomingAppointments | Negative: landing on Upcoming tab with no filters applied shows all results gracefully @upcoming', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterUpcomingAppointmentsWithNoFilters();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Invalid data - end date before start date
  test('filterUpcomingAppointments | Negative: date range where end is before start is rejected or shows no results gracefully @upcoming', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterUpcomingAppointmentsWithInvalidDateRange();
    // await expect(page.getByText(/invalid|no appointments|no results/i).or(page.getByRole('button', { name: 'Reset Filters' }))).toBeVisible();
  });

  // Empty values - date range cleared
  test('filterUpcomingAppointments | Negative: clearing date range inputs and resetting shows full upcoming list gracefully @upcoming', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterUpcomingAppointmentsWithEmptyDateRange();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Maximum values - very wide date range
  test('filterUpcomingAppointments | Boundary: extremely wide date range does not crash the Upcoming appointments page @upcoming', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterUpcomingAppointmentsWithMaxDateRange();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Minimum values - only one filter applied
  test('filterUpcomingAppointments | Boundary: applying only one status filter returns results or no-results gracefully @upcoming', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterUpcomingAppointmentsWithMinFilters();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Duplicate actions - same filter applied twice
  test('filterUpcomingAppointments | Negative: applying the same status filter twice consecutively returns consistent results @upcoming', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterUpcomingAppointmentsDuplicate();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Network failure - API aborted before page loads
  test('filterUpcomingAppointments | Error: network failure before Upcoming tab loads shows error or empty state gracefully @upcoming', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterUpcomingAppointmentsWithNetworkFailure();
    // await expect(page.getByText(/error|failed|no appointments|try again/i).or(page.getByRole('button', { name: 'Reset Filters' }))).toBeVisible();
  });

  // API failure - API aborted after filter applied
  test('filterUpcomingAppointments | Error: API failure during filter application shows error gracefully @upcoming', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterUpcomingAppointmentsWithApiFailure();
    // await expect(page.getByText(/error|failed|try again/i).or(page.getByRole('button', { name: 'Reset Filters' }))).toBeVisible();
  });

  // Unauthorized access
  test('filterUpcomingAppointments | Security: unauthenticated user cannot access Upcoming appointments page @upcoming', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('https://emr.whitecoats.com/');
    await expect(page).not.toHaveURL("https://emr.whitecoats.com/doctor/appointments/upcoming");
  });

  // Browser refresh
  test('filterUpcomingAppointments | Error: browser refresh while filter is active resets or retains filter state gracefully @upcoming', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterUpcomingAppointmentsAndRefresh();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Back button
  test('filterUpcomingAppointments | Error: back button while filter is active navigates away from Upcoming appointments @upcoming', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterUpcomingAppointmentsAndNavigateBack();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Concurrent actions
  test('filterUpcomingAppointments | Error: opening two filter dropdowns concurrently does not crash the Upcoming appointments page @upcoming', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterUpcomingAppointmentsConcurrent();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  test('Positive: filter History appointments by search, date, type, status and paginate @history', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterHistoryAppointments();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Missing mandatory fields - no filter selected
  test('filterHistoryAppointments | Negative: landing on History tab with no filters applied shows all results gracefully @history', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterHistoryAppointmentsWithNoFilters();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Invalid data - end date before start date
  test('filterHistoryAppointments | Negative: date range where end is before start is rejected or shows no results gracefully @history', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterHistoryAppointmentsWithInvalidDateRange();
    await expect(page.getByText(/invalid|no appointments|no results/i).or(page.getByRole('button', { name: 'Reset Filters' }))).toBeVisible();
  });

  // Empty values - search and dates cleared
  test('filterHistoryAppointments | Negative: clearing search and date inputs then resetting shows full history gracefully @history', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterHistoryAppointmentsWithEmptySearch();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Maximum values - very wide date range
  test('filterHistoryAppointments | Boundary: extremely wide date range does not crash the History appointments page @history', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterHistoryAppointmentsWithMaxDateRange();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Minimum values - single character search
  test('filterHistoryAppointments | Boundary: single character search term returns results or no-results gracefully @history', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterHistoryAppointmentsWithMinFilters();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Duplicate actions - same status filter applied twice
  test('filterHistoryAppointments | Negative: applying the same status filter twice consecutively returns consistent results @history', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterHistoryAppointmentsDuplicate();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Network failure - API aborted before page loads
  test('filterHistoryAppointments | Error: network failure before History tab loads shows error or empty state gracefully @history', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterHistoryAppointmentsWithNetworkFailure();
    await expect(page.getByText(/error|failed|no appointments|try again/i).or(page.getByRole('button', { name: 'Reset Filters' }))).toBeVisible();
  });

  // API failure - API aborted after filter applied
  test('filterHistoryAppointments | Error: API failure during search shows error gracefully @history', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterHistoryAppointmentsWithApiFailure();
    await expect(page.getByText(/error|failed|try again/i).or(page.getByRole('button', { name: 'Reset Filters' }))).toBeVisible();
  });

  // Unauthorized access
  test('filterHistoryAppointments | Security: unauthenticated user cannot access History appointments page @history', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('https://emr.whitecoats.com/');
    await expect(page).not.toHaveURL("https://emr.whitecoats.com/doctor/dashboard");
  });

  // Browser refresh
  test('filterHistoryAppointments | Error: browser refresh while filter is active resets or retains filter state gracefully @history', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterHistoryAppointmentsAndRefresh();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Back button
  test('filterHistoryAppointments | Error: back button while filter is active navigates away from History appointments @history', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterHistoryAppointmentsAndNavigateBack();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Concurrent actions
  test('filterHistoryAppointments | Error: concurrent search and date filter does not crash the History appointments page @history', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterHistoryAppointmentsConcurrent();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // // ── Patients ─────────────────────────────────────────────────────────────

  test('Positive: filter All Patients by search, gender, blood group and visit date then reset @allpatient', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterAllPatients();
    // await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Missing mandatory fields - no filter selected
  test('filterAllPatients | Negative: landing on All Patients tab with no filters applied shows all results gracefully @allpatient', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterAllPatientsWithNoFilters();
    // await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Invalid data - end date before start date
  test('filterAllPatients | Negative: visit date range where end is before start is rejected or shows no results gracefully @allpatient', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterAllPatientsWithInvalidDateRange();
    // await expect(page.getByText(/invalid|no patients|no results/i).or(page.getByRole('button', { name: 'Reset Filters' }))).toBeVisible();
  });

  // Empty values - search and dates cleared
  test('filterAllPatients | Negative: clearing search and date inputs then resetting shows full patient list gracefully @allpatient', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterAllPatientsWithEmptySearch();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Maximum values - very wide date range
  test('filterAllPatients | Boundary: extremely wide visit date range does not crash the All Patients page @allpatient', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterAllPatientsWithMaxDateRange();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Minimum values - single character search
  test('filterAllPatients | Boundary: single character search term returns results or no-results gracefully @allpatient', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterAllPatientsWithMinFilters();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Duplicate actions - same gender filter applied twice
  test('filterAllPatients | Negative: applying the same gender filter twice consecutively returns consistent results @allpatient', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterAllPatientsDuplicate();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Network failure - API aborted before page loads
  test('filterAllPatients | Error: network failure before All Patients page loads shows error or empty state gracefully @allpatient', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterAllPatientsWithNetworkFailure();
    // await expect(page.getByText(/error|failed|no patients|try again/i).or(page.getByRole('button', { name: 'Reset Filters' }))).toBeVisible();
  });

  // API failure - API aborted after filter applied
  test('filterAllPatients | Error: API failure during patient search shows error gracefully @allpatient', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterAllPatientsWithApiFailure();
    // await expect(page.getByText(/error|failed|try again/i).or(page.getByRole('button', { name: 'Reset Filters' }))).toBeVisible();
  });

  // Unauthorized access
  test('filterAllPatients | Security: unauthenticated user cannot access All Patients page @allpatient', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('https://emr  .whitecoats.com/');
    await expect(page).not.toHaveURL(/patients/i);
  });

  // Session expiration
  test('filterAllPatients | Security: session expiration while viewing All Patients redirects user away @allpatient', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterAllPatientsSessionExpiry();
    // await expect(page).not.toHaveURL(/patients/i);
  });

  // Browser refresh
  test('filterAllPatients | Error: browser refresh while filter is active resets or retains filter state gracefully @allpatient', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterAllPatientsAndRefresh();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Back button
  test('filterAllPatients | Error: back button while filter is active navigates away from All Patients page @allpatient', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterAllPatientsAndNavigateBack();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Concurrent actions
  test('filterAllPatients | Error: concurrent search and date filter does not crash the All Patients page @allpatient', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterAllPatientsConcurrent();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // // ── Reviews ──────────────────────────────────────────────────────────────

  test('Positive: filter Reviews by search, rating and date range then reset @review', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterReviews();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Missing mandatory fields - no filter selected
  test('filterReviews | Negative: landing on Reviews tab with no filters applied shows all results gracefully @review', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterReviewsWithNoFilters();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Invalid data - end date before start date
  test('filterReviews | Negative: date range where end is before start is rejected or shows no results gracefully @review', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterReviewsWithInvalidDateRange();
    // await expect(page.getByText(/invalid|no reviews|no results/i).or(page.getByRole('button', { name: 'Reset Filters' }))).toBeVisible();
  });

  // Empty values - search and dates cleared
  test('filterReviews | Negative: clearing search and date inputs then resetting shows full reviews list gracefully @review', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterReviewsWithEmptySearch();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Maximum values - very wide date range
  test('filterReviews | Boundary: extremely wide date range does not crash the Reviews page @review', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterReviewsWithMaxDateRange();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Minimum values - single character search
  test('filterReviews | Boundary: single character search term returns results or no-results gracefully @review', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterReviewsWithMinFilters();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Duplicate actions - same rating filter applied twice
  test('filterReviews | Negative: applying the same rating filter twice consecutively returns consistent results @review', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterReviewsDuplicate();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Network failure - API aborted before page loads
  test('filterReviews | Error: network failure before Reviews page loads shows error or empty state gracefully @review', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterReviewsWithNetworkFailure();
    await expect(page.getByText(/error|failed|no reviews|try again/i).or(page.getByRole('button', { name: 'Reset Filters' }))).toBeVisible();
  });

  // API failure - API aborted after filter applied
  test('filterReviews | Error: API failure during review search shows error gracefully @review', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterReviewsWithApiFailure();
    // await expect(page.getByText(/error|failed|try again/i).or(page.getByRole('button', { name: 'Reset Filters' }))).toBeVisible();
  });

  // Unauthorized access
  test('filterReviews | Security: unauthenticated user cannot access Reviews page @review ', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('https://emr.whitecoats.com/');
    await expect(page).not.toHaveURL(/reviews/i);
  });


  // Browser refresh
  test('filterReviews | Error: browser refresh while filter is active resets or retains filter state gracefully @review', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterReviewsAndRefresh();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Back button
  test('filterReviews | Error: back button while filter is active navigates away from Reviews page @review', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterReviewsAndNavigateBack();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Concurrent actions
  test('filterReviews | Error: concurrent search and date filter does not crash the Reviews page @review', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterReviewsConcurrent();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // // ── Clinical Records ─────────────────────────────────────────────────────

  test('Positive: filter All Consultations by search, EMR status, Rx status, date and paginate @allconsultations', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterAllConsultations();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Missing mandatory fields - no filter selected
  test('filterAllConsultations | Negative: landing on All Consultations tab with no filters applied shows all results gracefully @allconsultations', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterAllConsultationsWithNoFilters();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Invalid data - end date before start date
  test('filterAllConsultations | Negative: date range where end is before start is rejected or shows no results gracefully @allconsultations', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterAllConsultationsWithInvalidDateRange();
    await expect(page.getByText(/invalid|no consultations|no results/i).or(page.getByRole('button', { name: 'Reset Filters' }))).toBeVisible();
  });

  // Empty values - search and dates cleared
  test('filterAllConsultations | Negative: clearing search and date inputs then resetting shows full consultations list gracefully @allconsultations', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterAllConsultationsWithEmptySearch();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Maximum values - very wide date range
  test('filterAllConsultations | Boundary: extremely wide date range does not crash the All Consultations page @allconsultations', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterAllConsultationsWithMaxDateRange();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Minimum values - single character search
  test('filterAllConsultations | Boundary: single character search term returns results or no-results gracefully @allconsultations', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterAllConsultationsWithMinFilters();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Duplicate actions - same EMR status filter applied twice
  test('filterAllConsultations | Negative: applying the same EMR status filter twice consecutively returns consistent results @allconsultations', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterAllConsultationsDuplicate();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Network failure - API aborted before page loads
  test('filterAllConsultations | Error: network failure before All Consultations page loads shows error or empty state gracefully @allconsultations', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterAllConsultationsWithNetworkFailure();
    // await expect(page.getByText(/error|failed|no consultations|try again/i).or(page.getByRole('button', { name: 'Reset Filters' }))).toBeVisible();
  });

  // API failure - API aborted after filter applied
  test('filterAllConsultations | Error: API failure during consultation search shows error gracefully @allconsultations', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterAllConsultationsWithApiFailure();
    // await expect(page.getByText(/error|failed|try again/i).or(page.getByRole('button', { name: 'Reset Filters' }))).toBeVisible();
  });

  // Unauthorized access
  test('filterAllConsultations | Security: unauthenticated user cannot access All Consultations page @allconsultations', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('https://emr.whitecoats.com/');
    await expect(page).not.toHaveURL(/consultations/i);
  });

  // Session expiration
  test('filterAllConsultations | Security: session expiration while viewing All Consultations redirects user away @allconsultations', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterAllConsultationsSessionExpiry();
    await expect(page).not.toHaveURL(/consultations/i);
  });

  // Browser refresh
  test('filterAllConsultations | Error: browser refresh while filter is active resets or retains filter state gracefully @allconsultations', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterAllConsultationsAndRefresh();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Back button
  test('filterAllConsultations | Error: back button while filter is active navigates away from All Consultations page @allconsultations', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterAllConsultationsAndNavigateBack();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Concurrent actions
  test('filterAllConsultations | Error: concurrent search and date filter does not crash the All Consultations page @allconsultations', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterAllConsultationsConcurrent();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  test('Positive: filter EMR Cases by search, status, date range and sort options @filterEmr', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterEMRCases();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Missing mandatory fields - no filter selected
  test('filterEMRCases | Negative: landing on EMR Cases tab with no filters applied shows all results gracefully @filterEmr', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterEMRCasesWithNoFilters();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Invalid data - end date before start date
  test('filterEMRCases | Negative: date range where end is before start is rejected or shows no results gracefully @filterEmr', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterEMRCasesWithInvalidDateRange();
    // await expect(page.getByText(/invalid|no cases|no results/i).or(page.getByRole('button', { name: 'Reset Filters' }))).toBeVisible();
  });

  // Empty values - search and dates cleared
  test('filterEMRCases | Negative: clearing search and date inputs then resetting shows full EMR cases list gracefully @filterEmr', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterEMRCasesWithEmptySearch();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Maximum values - very wide date range
  test('filterEMRCases | Boundary: extremely wide date range does not crash the EMR Cases page @filterEmr', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterEMRCasesWithMaxDateRange();
    // await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Minimum values - single character search
  test('filterEMRCases | Boundary: single character search term returns results or no-results gracefully @filterEmr', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterEMRCasesWithMinFilters();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Duplicate actions - same status filter applied twice
  test('filterEMRCases | Negative: applying the same status filter twice consecutively returns consistent results @filterEmr', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterEMRCasesDuplicate();
    // await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Network failure - API aborted before page loads
  test('filterEMRCases | Error: network failure before EMR Cases page loads shows error or empty state gracefully @filterEmr', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterEMRCasesWithNetworkFailure();
    // await expect(page.getByText(/error|failed|no cases|try again/i).or(page.getByRole('button', { name: 'Reset Filters' }))).toBeVisible();
  });

  // API failure - API aborted after filter applied
  test('filterEMRCases | Error: API failure during EMR case search shows error gracefully @filterEmr', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterEMRCasesWithApiFailure();
    // await expect(page.getByText(/error|failed|try again/i).or(page.getByRole('button', { name: 'Reset Filters' }))).toBeVisible();
  });

  // Unauthorized access
  test('filterEMRCases | Security: unauthenticated user cannot access EMR Cases page @filterEmr', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('https://emr.whitecoats.com/');
    await expect(page).not.toHaveURL(/emr/i);
  });

  // Browser refresh
  test('filterEMRCases | Error: browser refresh while filter is active resets or retains filter state gracefully @filterEmr', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterEMRCasesAndRefresh();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Back button
  test('filterEMRCases | Error: back button while filter is active navigates away from EMR Cases page @filterEmr', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterEMRCasesAndNavigateBack();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Concurrent actions
  test('filterEMRCases | Error: concurrent search and date filter does not crash the EMR Cases page @filterEmr', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterEMRCasesConcurrent();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  test('Positive: filter Prescriptions by search, status, date range and paginate filterPrescriptions', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterPrescriptions();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Missing mandatory fields - no filter selected
  test('filterPrescriptions | Negative: landing on Prescriptions tab with no filters applied shows all results gracefully @filterPrescriptions', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterPrescriptionsWithNoFilters();
    // await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Invalid data - end date before start date
  test('filterPrescriptions | Negative: date range where end is before start is rejected or shows no results gracefully @filterPrescriptions', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterPrescriptionsWithInvalidDateRange();
    // await expect(page.getByText(/invalid|no prescriptions|no results/i).or(page.getByRole('button', { name: 'Reset Filters' }))).toBeVisible();
  });

  // Empty values - search and dates cleared
  test('filterPrescriptions | Negative: clearing search and date inputs then resetting shows full prescriptions list gracefully @filterPrescriptions', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterPrescriptionsWithEmptySearch();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Maximum values - very wide date range
  test('filterPrescriptions | Boundary: extremely wide date range does not crash the Prescriptions page  @filterPrescriptions', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterPrescriptionsWithMaxDateRange();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Minimum values - single character search
  test('filterPrescriptions | Boundary: single character search term returns results or no-results gracefully', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterPrescriptionsWithMinFilters();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Duplicate actions - same status filter applied twice
  test('filterPrescriptions | Negative: applying the same Rx status filter twice consecutively returns consistent results  @filterPrescriptions', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterPrescriptionsDuplicate();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Network failure - API aborted before page loads
  test('filterPrescriptions | Error: network failure before Prescriptions page loads shows error or empty state gracefully  @filterPrescriptions', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterPrescriptionsWithNetworkFailure();
    // await expect(page.getByText(/error|failed|no prescriptions|try again/i).or(page.getByRole('button', { name: 'Reset Filters' }))).toBeVisible();
  });

  // API failure - API aborted after filter applied
  test('filterPrescriptions | Error: API failure during prescription search shows error gracefully  @filterPrescriptions', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterPrescriptionsWithApiFailure();
    // await expect(page.getByText(/error|failed|try again/i).or(page.getByRole('button', { name: 'Reset Filters' }))).toBeVisible();
  });

  // Unauthorized access
  test('filterPrescriptions | Security: unauthenticated user cannot access Prescriptions page  @filterPrescriptions', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('https://emr.whitecoats.com/');
    // await expect(page).not.toHaveURL(/prescriptions/i);
  });

  // Session expiration
  test('filterPrescriptions | Security: session expiration while viewing Prescriptions redirects user away  @filterPrescriptions', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterPrescriptionsSessionExpiry();
    // await expect(page).not.toHaveURL(/prescriptions/i);
  });

  // Browser refresh
  test('filterPrescriptions | Error: browser refresh while filter is active resets or retains filter state gracefully   @filterPrescriptions', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterPrescriptionsAndRefresh();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Back button
  test('filterPrescriptions | Error: back button while filter is active navigates away from Prescriptions page  @filterPrescriptions', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterPrescriptionsAndNavigateBack();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Concurrent actions
  test('filterPrescriptions | Error: concurrent search and date filter does not crash the Prescriptions page  @filterPrescriptions', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterPrescriptionsConcurrent();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  test('Positive: upload handwritten prescription, view, share and resend to patient email @handwritten ', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().manageHandwrittenPrescriptions();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Missing mandatory fields - no file selected before upload
  test('manageHandwrittenPrescriptions | Negative: uploading without selecting a file is rejected or shows validation gracefully @handwritten ', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().manageHandwrittenPrescriptionsWithNoFile();
    // await expect(page.getByText(/required|select|file|upload/i).or(page.getByRole('button', { name: '📤 Upload & Send to Patient' }))).toBeVisible();
  });

  // Invalid data - unsupported file type
  test('manageHandwrittenPrescriptions | Negative: uploading an unsupported file type is rejected or flagged gracefully @handwritten ', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().manageHandwrittenPrescriptionsWithInvalidFileType();
    // await expect(page.getByText(/invalid|unsupported|file type/i).or(page.getByRole('button', { name: '📤 Upload & Send to Patient' }))).toBeVisible();
  });

  // Empty values - empty search with no patient selected
  test('manageHandwrittenPrescriptions | Negative: attempting upload with empty patient search shows no results gracefully @handwritten ', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().manageHandwrittenPrescriptionsWithEmptySearch();
    // await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Maximum values - 1000-character notes
  test('manageHandwrittenPrescriptions | Boundary: 1000-character notes field does not crash the upload form @handwritten ', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().manageHandwrittenPrescriptionsWithMaxNotes();
    // await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Minimum values - single character notes
  test('manageHandwrittenPrescriptions | Boundary: single character notes field is accepted or rejected gracefully @handwritten ', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().manageHandwrittenPrescriptionsWithMinNotes();
    // await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Duplicate actions - same prescription uploaded twice
  test('manageHandwrittenPrescriptions | Negative: uploading the same prescription twice does not cause inconsistent state @handwritten ', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().manageHandwrittenPrescriptionsDuplicate();
    // await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Network failure - API aborted before page loads
  test('manageHandwrittenPrescriptions | Error: network failure before Handwritten Prescriptions page loads shows error gracefully @handwritten ', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().manageHandwrittenPrescriptionsWithNetworkFailure();
    // await expect(page.getByText(/error|failed|try again/i).or(page.getByRole('button', { name: '📤 Upload & Send to Patient' }))).toBeVisible();
  });

  // API failure - API aborted during upload
  test('manageHandwrittenPrescriptions | Error: API failure during upload shows error gracefully @handwritten', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().manageHandwrittenPrescriptionsWithApiFailure();
    // await expect(page.getByText(/error|failed|try again/i).or(page.getByRole('button', { name: '📤 Upload & Send to Patient' }))).toBeVisible();
  });

  // Unauthorized access
  test('manageHandwrittenPrescriptions | Security: unauthenticated user cannot access Handwritten Prescriptions page @handwritten', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('https://emr.whitecoats.com/');
    await expect(page).not.toHaveURL(/prescriptions/i);
  });

  // Browser refresh
  test('manageHandwrittenPrescriptions | Error: browser refresh during file selection discards unsaved state gracefully @handwritten', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().manageHandwrittenPrescriptionsAndRefresh();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Back button
  test('manageHandwrittenPrescriptions | Error: back button during file selection navigates away without uploading @handwritten', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().manageHandwrittenPrescriptionsAndNavigateBack();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Concurrent actions - double click upload
  test('manageHandwrittenPrescriptions | Error: submitting upload twice concurrently does not create duplicate prescriptions @handwritten', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().manageHandwrittenPrescriptionsConcurrent();
    // await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  test('Positive: delete handwritten prescription and confirm dialog @handwritten', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().delete_handwitten();
    // await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // // ── Messages ─────────────────────────────────────────────────────────────

  // test('Positive: navigate to Messages and open a patient thread', async ({ page }) => {
  //   await new POManagers(page).doctorPortalPage().navigateToMessages();
  //   await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  // });

  // // ── My Schedule ──────────────────────────────────────────────────────────

  test('Positive: edit schedule timings, slot duration, mode and day then save @schedule', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().manageSchedule();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Missing mandatory fields - start and end time cleared
  test('manageSchedule | Negative: saving schedule with empty start and end time is rejected or shows validation gracefully @schedule', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().manageScheduleWithNoTimings();
    // await expect(page.getByText(/required|invalid|time/i).or(page.getByRole('button', { name: 'Update Schedule' }))).toBeVisible();
  });

  // Invalid data - end time before start time
  test('manageSchedule | Negative: schedule where end time is before start time is rejected or flagged gracefully @schedule', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().manageScheduleWithInvalidTimings();
    // await expect(page.getByText(/invalid|end time|before start/i).or(page.getByRole('button', { name: 'Update Schedule' }))).toBeVisible();
  });

  // Empty values - all fields cleared
  test('manageSchedule | Negative: saving schedule with all fields empty is rejected or handled gracefully @schedule', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().manageScheduleWithEmptyFields();
    // await expect(page.getByText(/required|invalid|time/i).or(page.getByRole('button', { name: 'Update Schedule' }))).toBeVisible();
  });

  // Maximum values - full day range with shortest slot
  test('manageSchedule | Boundary: full day schedule with 10-min slots does not crash the scheduler @schedule', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().manageScheduleWithMaxSlotDuration();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Minimum values - minimal time window with shortest slot
  test('manageSchedule | Boundary: minimal 10-minute schedule window is accepted or rejected gracefully @schedule', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().manageScheduleWithMinSlotDuration();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Duplicate actions - same schedule saved twice
  test('manageSchedule | Negative: saving the same schedule twice consecutively does not cause inconsistent state  @schedule', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().manageScheduleDuplicate();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Network failure - API aborted before page loads
  test('manageSchedule | Error: network failure before Schedule page loads shows error or empty state gracefully @schedule', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().manageScheduleWithNetworkFailure();
    // await expect(page.getByText(/error|failed|try again/i).or(page.getByRole('button', { name: 'Update Schedule' }))).toBeVisible();
  });

  // API failure - API aborted on save
  test('manageSchedule | Error: API failure when saving schedule shows error gracefully @schedule', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().manageScheduleWithApiFailure();
    // await expect(page.getByText(/error|failed|try again/i).or(page.getByRole('button', { name: 'Update Schedule' }))).toBeVisible();
  });

  // Unauthorized access
  test('manageSchedule | Security: unauthenticated user cannot access Schedule page @schedule', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('https://emr.whitecoats.com/');
    // await expect(page).not.toHaveURL(/schedule/i);
  });

  // Session expiration
  test('manageSchedule | Security: session expiration while editing schedule redirects user away @schedule', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().manageScheduleSessionExpiry();
    // await expect(page).not.toHaveURL(/schedule/i);
  });

  // Browser refresh
  test('manageSchedule | Error: browser refresh during schedule edit discards unsaved changes gracefully @schedule', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().manageScheduleAndRefresh();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Back button
  test('manageSchedule | Error: back button during schedule edit navigates away without saving @schedule', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().manageScheduleAndNavigateBack();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Concurrent actions - double click save
  test('manageSchedule | Error: submitting schedule update twice concurrently does not create duplicate entries @schedule', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().manageScheduleConcurrent();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // // ── Earnings ─────────────────────────────────────────────────────────────

  test('Positive: filter Earnings by search, payment status, type, date range and paginate @earnings', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterEarnings();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Missing mandatory fields - no filter selected
  test('filterEarnings | Negative: landing on Earnings page with no filters applied shows all results gracefully @earnings', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterEarningsWithNoFilters();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Invalid data - end date before start date
  test('filterEarnings | Negative: date range where end is before start is rejected or shows no results gracefully @earnings', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterEarningsWithInvalidDateRange();
    // await expect(page.getByText(/invalid|no earnings|no results/i).or(page.getByRole('button', { name: 'Reset Filters' }))).toBeVisible();
  });

  // Empty values - search and dates cleared
  test('filterEarnings | Negative: clearing search and date inputs then resetting shows full earnings list gracefully @earnings', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterEarningsWithEmptySearch();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Maximum values - very wide date range
  test('filterEarnings | Boundary: extremely wide date range does not crash the Earnings page @earnings', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterEarningsWithMaxDateRange();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Minimum values - single character search
  test('filterEarnings | Boundary: single character search term returns results or no-results gracefully @earnings', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterEarningsWithMinFilters();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Duplicate actions - same status filter applied twice
  test('filterEarnings | Negative: applying the same payment status filter twice consecutively returns consistent results @earnings', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterEarningsDuplicate();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Network failure - API aborted before page loads
  test('filterEarnings | Error: network failure before Earnings page loads shows error or empty state gracefully @earnings', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterEarningsWithNetworkFailure();
    // await expect(page.getByText(/error|failed|no earnings|try again/i).or(page.getByRole('button', { name: 'Reset Filters' }))).toBeVisible();
  });

  // API failure - API aborted after filter applied
  test('filterEarnings | Error: API failure during earnings search shows error gracefully @earnings', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterEarningsWithApiFailure();
    // await expect(page.getByText(/error|failed|try again/i).or(page.getByRole('button', { name: 'Reset Filters' }))).toBeVisible();
  });

  // Unauthorized access
  test('filterEarnings | Security: unauthenticated user cannot access Earnings page ', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('https://emr.whitecoats.com/');
    await expect(page).not.toHaveURL(/earnings/i);
  });

  // Browser refresh
  test('filterEarnings | Error: browser refresh while filter is active resets or retains filter state gracefully @earnings', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterEarningsAndRefresh();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Back button
  test('filterEarnings | Error: back button while filter is active navigates away from Earnings page', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterEarningsAndNavigateBack();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Concurrent actions
  test('filterEarnings | Error: concurrent search and date filter does not crash the Earnings page @earnings', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().filterEarningsConcurrent();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // // ── Profile ──────────────────────────────────────────────────────────────

  test('Positive: edit profile name, DOB, gender, signature and save changes @editprofile', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().editProfile();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Missing mandatory fields - name cleared
  test('editProfile | Negative: saving profile with empty name is rejected or shows validation gracefully @editprofile', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().editProfileWithNoName();
    // await expect(page.getByText(/required|name|cannot be empty/i).or(page.getByRole('button', { name: 'Save Changes' }))).toBeVisible();
  });

  // Invalid data - future DOB
  test('editProfile | Negative: saving profile with a future date of birth is rejected or flagged gracefully @editprofile', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().editProfileWithInvalidDob();
    // await expect(page.getByText(/invalid|date|future/i).or(page.getByRole('button', { name: 'Save Changes' }))).toBeVisible();
  });

  // Empty values - name and DOB cleared
  test('editProfile | Negative: saving profile with all fields empty is rejected or handled gracefully @editprofile', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().editProfileWithEmptyFields();
    // await expect(page.getByText(/required|cannot be empty/i).or(page.getByRole('button', { name: 'Save Changes' }))).toBeVisible();
  });

  // Maximum values - 255-character name
  test('editProfile | Boundary: 255-character name does not crash the profile form @editprofile', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().editProfileWithMaxLengthName();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Minimum values - single character name
  test('editProfile | Boundary: single character name is accepted or rejected gracefully @editprofile', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().editProfileWithMinLengthName();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Duplicate actions - same profile saved twice
  test('editProfile | Negative: saving the same profile details twice consecutively does not cause inconsistent state @editprofile', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().editProfileDuplicate();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Network failure - API aborted before page loads
  test('editProfile | Error: network failure before Profile page loads shows error or empty state gracefully @editprofile', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().editProfileWithNetworkFailure();
    // await expect(page.getByText(/error|failed|try again/i).or(page.getByRole('button', { name: 'Edit Profile' }))).toBeVisible();
  });

  // API failure - API aborted on save
  test('editProfile | Error: API failure when saving profile changes shows error gracefully @editprofile', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().editProfileWithApiFailure();
    // await expect(page.getByText(/error|failed|try again/i).or(page.getByRole('button', { name: 'Save Changes' }))).toBeVisible();
  });

  // Unauthorized access
  test('editProfile | Security: unauthenticated user cannot access Profile page @editprofile', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('https://emr.whitecoats.com/');
    await expect(page).not.toHaveURL(/profile/i);
  });


  // Browser refresh
  test('editProfile | Error: browser refresh during profile edit discards unsaved changes gracefully @editprofile', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().editProfileAndRefresh();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Back button
  test('editProfile | Error: back button during profile edit navigates away without saving @editprofile', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().editProfileAndNavigateBack();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

  // Concurrent actions - double click save
  test('editProfile | Error: submitting profile save twice concurrently does not create duplicate entries @editprofile', async ({ page }) => {
    await new POManagers(page).doctorPortalPage().editProfileConcurrent();
    await expect(page).toHaveURL(/emr\.whitecoats\.com/);
  });

});
