const { expect } = require('@playwright/test');
const { generateEMRData } = require('../testData/testDataGenerator');

class doctorPortalPage {

    constructor(page) {
        this.page = page;
        this.dashboardbtn = page.getByRole('button', { name: '📊 Dashboard' });
        this.appointmentbtn = page.getByRole('button', { name: '📅 Appointments' });
        this.invoicebtn = page.getByRole('button', { name: '💰 Invoices' });
        this.patientbtn = page.getByRole('button', { name: '👤 Patients' });
        this.logoutbtn = page.getByRole('button', { name: 'Logout' });

        this.clinical = page.getByRole('button', { name: '🗂️ Clinical Records ❯' });
        this.allconsultations = page.getByRole('button', { name: '📋 All Consultations' });
        this.editbtn = page.getByRole('button', { name: '✏️ Edit' }).first();
        this.bp = page.getByRole('textbox', { name: '/80 mmHg' });
        this.fever = page.getByRole('textbox', { name: '°F' });
        this.bp2 = page.getByRole('textbox', { name: 'bpm' });
        this.health = page.getByRole('textbox', { name: '/min' });
        this.bp3 = page.getByRole('textbox', { name: '98%' });
        this.weight = page.getByRole('textbox', { name: 'kg' });
        this.height = page.getByRole('textbox', { name: 'cm' });

        this.complaint = page.getByRole('textbox', { name: 'Patient\'s main complaint...' });
        this.symptoms = page.getByRole('textbox', { name: 'Describe symptoms...' });
        this.symptomsoption = page.locator('div:has-text("Cough")');
        this.pain = page.locator('div').filter({ hasText: /^Pain During Erection And Testicular Pain$/ }).first();
        this.history = page.getByRole('textbox', { name: 'Detailed history of current' });
        this.conditions = page.getByRole('textbox', { name: 'Previous conditions,' });
        this.allergy = page.getByRole('textbox', { name: 'Known allergies...' });
        this.medication = page.getByRole('textbox', { name: 'Medications currently being' });
        this.examination = page.getByRole('textbox', { name: 'Examination findings...' });
        this.diagnosis = page.getByRole('textbox', { name: 'Diagnosis...' }).first();
        this.alternative = page.getByRole('textbox', { name: 'Alternative diagnoses...' });
        this.testsordered = page.getByRole('textbox', { name: 'Tests ordered, imaging...' });
        this.treatment = page.getByRole('textbox', { name: 'Treatment approach,' });
        this.clinic = page.getByRole('textbox', { name: 'Any other clinical' });
        this.hpd1 = page.getByRole('textbox', { name: 'e.g., 95 mg/dL' });
        this.hpd2 = page.getByRole('textbox', { name: 'e.g., 140 mg/dL' });
        this.hpd3 = page.getByRole('textbox', { name: 'e.g., 6.5%' });
        this.hpd4 = page.getByRole('textbox', { name: 'Notes on blood sugar trends,' });
        this.hpd5 = page.getByRole('textbox', { name: 'Patient\'s adherence to' });
        this.hpd6 = page.getByRole('textbox', { name: 'Number of missed doses' });
        this.sideeffects = page.getByRole('textbox', { name: 'Any side effects experienced' });
        this.changes = page.getByRole('textbox', { name: 'Any changes to medication' });
        this.diet = page.getByRole('textbox', { name: 'Dietary habits, restrictions' });
        this.activity = page.getByRole('textbox', { name: 'Physical activity level, type' });
        this.smoker = page.getByRole('textbox', { name: 'e.g., Non-smoker' });
        this.alcohol = page.getByRole('textbox', { name: 'e.g., None, Occasional' });
        this.sleep = page.getByRole('textbox', { name: 'e.g., 7-8 hours' });
        this.retino = page.getByRole('textbox', { name: 'Retinopathy screening, visual' });
        this.peripheral = page.getByRole('textbox', { name: 'Peripheral pulses, sensation' });
        this.kidney = page.getByRole('textbox', { name: 'Creatinine, eGFR, urine' });
        this.bpcontrol = page.getByRole('textbox', { name: 'BP control, lipid profile,' });
        this.neuropathy = page.getByRole('textbox', { name: 'Peripheral neuropathy,' });
        this.drugname = page.getByRole('textbox', { name: 'Drug name...' });
        this.drugoption = page.getByText('Dolo 1000 Mg Infusion 100 MlMICRO LABS LTD');
        this.drugdosage = page.getByRole('textbox', { name: '500mg, 10ml...' });
        this.tablet = page.getByText('Tablet');
        this.injection = page.getByRole('option', { name: 'Injection' });
        this.dosagefrequency = page.getByRole('textbox', { name: 'OD, BD, TID, QID...' });
        this.days = page.getByRole('textbox', { name: 'Days' });
        this.qty = page.getByRole('textbox', { name: 'Qty' });
        this.route = page.getByRole('combobox').filter({ hasText: 'Oral' });
        this.routeoption = page.getByRole('option', { name: 'Inhaled' });
        this.aftermeal = page.getByRole('textbox', { name: 'After meals, with water...' });
        this.blooddeposite = page.getByRole('textbox', { name: 'Complete Blood Count Blood' });
        this.diettt = page.getByRole('textbox', { name: 'Diet instructions, lifestyle' });
        this.completebtn = page.getByRole('button', { name: '✅ Update Consultation' });

        this.enableNotificationsbtn = page.getByRole('button', { name: 'Enable Notifications' });
        this.appointmentsMenubtn = page.getByRole('button', { name: '📅 Appointments ❯' });
        this.todaybtn = page.getByRole('button', { name: '📅 Today' });
        this.allStatusDropdown = page.getByText('All Status');
        this.scheduledOption = page.getByRole('option', { name: 'Scheduled' });
        this.scheduledDropdown = page.getByRole('combobox').filter({ hasText: 'Scheduled' });
        this.completedOption = page.getByRole('option', { name: 'Completed' });
        this.completedDropdownImg = page.getByRole('combobox').filter({ hasText: 'Completed' }).getByRole('img');
        this.allStatusOption = page.getByRole('option', { name: 'All Status' });
        this.allTypesDropdown = page.getByRole('combobox').filter({ hasText: 'All Types' });
        this.inPersonOption = page.getByRole('option', { name: 'In-Person' });
        this.inPersonDropdown = page.getByRole('combobox').filter({ hasText: 'In-Person' });
        this.videoOption = page.getByRole('option', { name: 'Video' });
        this.resetFiltersbtn = page.getByRole('button', { name: 'Reset Filters' });

        this.upcomingbtn = page.getByRole('button', { name: '🔜 Upcoming' });
        this.upcomingAllStatusDropdown = page.getByRole('combobox').filter({ hasText: 'All Status' });
        this.confirmedOption = page.getByRole('option', { name: 'Confirmed' });
        this.confirmedDropdown = page.getByRole('combobox').filter({ hasText: 'Confirmed' });
        this.inPersonText = page.getByText('In-Person');
        this.videoDropdown = page.getByRole('combobox').filter({ hasText: 'Video' });
        this.allTypesOption = page.getByRole('option', { name: 'All Types' });
        this.dateFromInput = page.locator('#date-from');
        this.dateToInput = page.locator('#date-to');

        this.historybtn = page.getByRole('button', { name: '📜 History' });
        this.historySearchInput = page.getByRole('textbox', { name: 'Search by patient name, ID,' });
        this.clearSearchbtn = page.getByRole('button', { name: 'Clear search' });
        this.historyDateFrom = page.getByRole('textbox').nth(1);
        this.historyDateTo = page.getByRole('textbox').nth(2);
        this.videoCallOption = page.getByRole('option', { name: 'Video Call' });
        this.videoCallDropdown = page.getByRole('combobox').filter({ hasText: 'Video Call' });
        this.noShowOption = page.getByRole('option', { name: 'No Show' });
        this.noShowDropdown = page.getByRole('combobox').filter({ hasText: 'No Show' });
        this.completedDropdown = page.getByRole('combobox').filter({ hasText: 'Completed' });
        this.page2btn = page.getByRole('button', { name: '2' });
        this.nextPagebtn = page.getByRole('button', { name: 'Next page' });
        this.previousPagebtn = page.getByRole('button', { name: 'Previous page' });

        this.patientsMenubtn = page.getByRole('button', { name: '👥 Patients ❯' });
        this.allPatientsbtn = page.getByRole('button', { name: '📋 All Patients' });
        this.patientSearchInput = page.getByRole('textbox', { name: 'Search by name, phone or' });
        this.allGendersDropdown = page.getByRole('combobox').filter({ hasText: 'All Genders' });
        this.maleOption = page.getByRole('option', { name: 'Male', exact: true });
        this.maleDropdown = page.getByRole('combobox').filter({ hasText: 'Male' });
        this.allGendersOption = page.getByRole('option', { name: 'All Genders' });
        this.allBloodGroupsDropdown = page.getByRole('combobox').filter({ hasText: 'All Blood Groups' });
        this.aPlusOption = page.getByRole('option', { name: 'A+' });
        this.aPlusDropdown = page.getByRole('combobox').filter({ hasText: 'A+' });
        this.allBloodGroupsOption = page.getByRole('option', { name: 'All Blood Groups' });
        this.visitDateFromInput = page.getByRole('textbox', { name: 'Filter patients by visit date', description: 'Filter patients by visit date range. Only shows patients with visits on or after this date.' });
        this.visitDateToInput = page.getByRole('textbox', { name: 'Filter patients by visit date', description: 'Filter patients by visit date range. Only shows patients with visits on or before this date.' });
        this.filtersPanel = page.locator('div').filter({ hasText: '⚙️ Filters▼GenderAll' }).nth(4);
        this.reviewsbtn = page.getByRole('button', { name: '⭐ Reviews' });

        // Reviews
        this.reviewSearchInput = page.getByRole('textbox', { name: 'Search by patient name or' });
        this.allRatingsDropdown = page.getByText('All Ratings');
        this.fourStarsOption = page.getByRole('option', { name: '4 Stars' });
        this.starsDropdown = page.getByRole('combobox').filter({ hasText: 'Stars' });
        this.allRatingsOption = page.getByRole('option', { name: 'All Ratings' });
        this.reviewDateFrom = page.getByRole('textbox').nth(1);
        this.reviewDateTo = page.getByRole('textbox').nth(2);

        // All Consultations
        this.consultationSearchInput = page.getByRole('textbox', { name: 'Search by patient, diagnosis' });
        this.allEmrStatusDropdown = page.getByRole('combobox').filter({ hasText: 'All EMR Status' });
        this.noEmrOption = page.getByRole('option', { name: 'No EMR' });
        this.noEmrDropdown = page.getByRole('combobox').filter({ hasText: 'No EMR' });
        this.allEmrStatusOption = page.getByRole('option', { name: 'All EMR Status' });
        this.allRxStatusDropdown = page.getByRole('combobox').filter({ hasText: 'All Rx Status' });
        this.hasPrescriptionOption = page.getByRole('option', { name: 'Has Prescription' });
        this.hasPrescriptionDropdown = page.getByRole('combobox').filter({ hasText: 'Has Prescription' });
        this.allRxStatusOption = page.getByRole('option', { name: 'All Rx Status' });
        this.consultationDateFrom = page.getByRole('textbox').nth(1);
        this.consultationDateTo = page.getByRole('textbox').nth(2);
        this.page3btn = page.getByRole('button', { name: '3' });
        this.page1btn = page.getByRole('button', { name: '1', exact: true });

        // EMR Cases
        this.emrCasesbtn = page.getByRole('button', { name: '📁 EMR Cases' });
        this.emrCaseSearchInput = page.getByRole('textbox', { name: 'Search by patient, case' });
        this.allStatusDropdownImg = page.getByRole('combobox').filter({ hasText: 'All Status' }).getByRole('img');
        this.pendingReviewOption = page.getByRole('option', { name: 'Pending Review' });
        this.pendingReviewText = page.getByText('pending review').nth(2);
        this.allStatusDropdownCombo = page.getByRole('combobox').filter({ hasText: 'All Status' });
        this.emrCaseDateFrom = page.getByRole('textbox').nth(1);
        this.emrCaseDateTo = page.getByRole('textbox').nth(2);
        this.sortByDateDropdown = page.getByRole('combobox').filter({ hasText: 'Date' });
        this.sortByDateDropdownstatus = page.getByRole('combobox').filter({ hasText: 'Status' }).last();
        this.sortByDateDropdownpatientname = page.getByRole('combobox').filter({ hasText: 'Patient Name' });
        this.sortByStatusOption = page.getByRole('option', { name: 'Status' });
        this.sortByPatientNameOption = page.getByRole('option', { name: 'Patient Name' });
        this.sortByDateOption = page.getByRole('option', { name: 'Date' });

        // Prescriptions
        this.prescriptionsbtn = page.getByRole('button', { name: '💊 Prescriptions' });
        this.prescriptionSearchInput = page.getByRole('textbox', { name: 'Search by patient, Rx number' });
        this.allRxDropdown = page.getByRole('combobox').filter({ hasText: 'All' }).first();
        this.activeOption = page.getByRole('option', { name: 'Active' });
        this.allRxCombobox = page.getByRole('combobox');
        this.allRxOption = page.getByRole('option', { name: 'All' });
        this.prescriptionDateFrom = page.getByRole('textbox').nth(1);
        this.prescriptionDateTo = page.getByRole('textbox').nth(2);

        // Handwritten Prescriptions
        this.handwrittenPrescriptionsbtn = page.getByRole('button', { name: '📝 Handwritten Prescriptions' });
        this.handwrittenSearchInput = page.getByRole('textbox', { name: 'Search by name, mobile, or' });
        this.patientResult = page.getByText('Deepthi Konchada kk').nth(1);
        this.chooseFilebtn = page.getByRole('button', { name: 'Choose File' });
        this.notesInput = page.getByRole('textbox', { name: 'Add any notes for the patient' });
        this.uploadSendbtn = page.getByRole('button', { name: '📤 Upload & Send to Patient' });
        this.viewbtn = page.getByRole('button', { name: 'View' }).nth(1);
        this.closebtn = page.getByRole('button', { name: 'Close', exact: true });
        this.sharebtn = page.getByRole('button', { name: 'Share' }).first();
        this.resendEmailbtn = page.getByRole('button', { name: '📧 Resend to Patient Email' });
        this.deletebtn = page.getByRole('button', { name: 'Delete' }).nth(1);

        // Messages
        this.messagesbtn = page.getByRole('button', { name: '💬 Messages' });
        this.messageThread = page.getByText('👤Deepthi KonchadaSep 3Good');

        // My Schedule
        this.myScheduleMenubtn = page.getByRole('button', { name: '📆 My Schedule ❯' });
        this.schedulerDetailsbtn = page.getByRole('button', { name: '📋 Scheduler Details' });
        this.scheduleStartTime = page.getByRole('textbox').nth(1);
        this.scheduleEndTime = page.getByRole('textbox').nth(2);
        this.slotDurationDropdown = page.getByRole('combobox').filter({ hasText: 'mins' });
        this.tenMinsOption = page.getByRole('option', { name: '10 mins' });
        this.bothModesDropdown = page.getByRole('combobox').filter({ hasText: '🏥📹 Both (In-Person & Video)' });
        this.videoOnlyOption = page.getByRole('option', { name: '📹 Video Only' });
        this.videoOnlyDropdown = page.getByRole('combobox').filter({ hasText: '📹 Video Only' });
        this.bothModesOption = page.getByRole('option', { name: '🏥📹 Both (In-Person & Video)' });
        this.tuebtn = page.getByRole('button', { name: 'Tue' });
        this.updateSchedulebtn = page.getByRole('button', { name: 'Update Schedule' });

        // Earnings
        this.earningsbtn = page.getByRole('button', { name: '💰 Earnings' });
        this.earningsSearchInput = page.getByRole('textbox', { name: 'Search patient or ID...' });
        this.allStatusesDropdown = page.getByRole('combobox').filter({ hasText: 'All Statuses' });
        this.paidOption = page.getByRole('option', { name: '✅ Paid' });
        this.paidstatusDropdown = page.getByRole('combobox').filter({ hasText: 'Paid' });
        this.paidDropdown = page.getByRole('combobox').filter({ hasText: '✅ Paid' });
        this.pendingOption = page.getByRole('option', { name: '⏳ Pending' });
        this.pendingStatusText = page.getByText('Status⏳ Pending');
        this.pendingstatusDropdown = page.getByRole('combobox').filter({ hasText: 'Pending' });
        this.allStatusesOption = page.getByRole('option', { name: 'All Statuses' });
        this.earningsVideoOption = page.getByRole('option', { name: '📹 Video' });
        this.earningsVideoDropdown = page.getByRole('combobox').filter({ hasText: '📹 Video' });
        this.earningsInPersonOption = page.getByRole('option', { name: '🏥 In-Person' });
        this.earningsInPersonDropdown = page.getByRole('combobox').filter({ hasText: '🏥 In-Person' });
        this.earningsDateFrom = page.getByRole('textbox').nth(1);
        this.earningsDateTo = page.getByRole('textbox').nth(2);

        // Profile
        this.profilebtn = page.getByRole('button', { name: '👤 Profile' });
        this.editProfilebtn = page.getByRole('button', { name: 'Edit Profile' });
        this.profileNameInput = page.getByRole('textbox').nth(1);
        this.profileDobInput = page.locator('input[type="date"]');
        this.profileGenderDropdown = page.getByRole('combobox');
        this.updateSignatureLabel = page.getByText('↑ Update Signature');
        this.updateSignatureInput = page.getByLabel('↑ Update Signature');
        this.saveChangesbtn = page.getByRole('button', { name: 'Save Changes' });
        this.prProfessionalbtn = page.getByRole('button', { name: 'PR Professional' });
    }


    async navigateToDashboard() {
        await this.dashboardbtn.click();
    }

    async navigateToAppointments() {
        await this.appointmentbtn.click();
    }

    async navigateToInvoices() {
        await this.invoicebtn.click();
    }


    async navigateToPatients() {
        await this.patientbtn.click();
    }

    async logout() {
        await this.logoutbtn.click();
    }

    async filterTodayAppointments() {
        await this.enableNotificationsbtn.click();
        await this.appointmentsMenubtn.click();
        await this.todaybtn.click();
        await this.allStatusDropdown.click();
        // await this.scheduledOption.click();
        await this.scheduledDropdown.click();
        await this.completedOption.click();
        // await this.completedDropdownImg.click();
        await this.allStatusOption.click();
        await this.allTypesDropdown.click();
        // await this.inPersonOption.click();
        await this.inPersonDropdown.click();
        await this.videoOption.click();
        await this.resetFiltersbtn.click();
    }

    async filterUpcomingAppointments() {
        await this.enableNotificationsbtn.click();
        await this.appointmentsMenubtn.click();
        await this.upcomingbtn.click();
        await this.upcomingAllStatusDropdown.click();
        // await this.scheduledOption.click();
        await this.scheduledDropdown.click();
        await this.confirmedOption.click();
        await this.allTypesDropdown.click();
        await this.inPersonOption.click();
        // await this.inPersonText.click();
        // await this.videoOption.click();
        await this.videoDropdown.click();
        await this.allTypesOption.click();
        // await this.confirmedDropdown.click();
        await this.allStatusOption.click();
        await this.dateFromInput.fill('2026-09-18');
        await this.dateToInput.fill('2026-09-28');
        await this.resetFiltersbtn.click();
    }

    async filterHistoryAppointments() {
        await this.enableNotificationsbtn.click();
        await this.appointmentsMenubtn.click();
        await this.historybtn.click();
        await this.historySearchInput.click();
        await this.historySearchInput.fill('deepthi');
        await this.clearSearchbtn.click();
        await this.historyDateFrom.fill('2026-09-01');
        await this.historyDateTo.fill('2026-09-18');
        await this.resetFiltersbtn.click();
        await this.allTypesDropdown.click();
        await this.inPersonOption.click();
        await this.allTypesDropdown.click();
        await this.videoCallOption.first().click();
        await this.allTypesOption.click();
        // await this.upcomingAllStatusDropdown.click();
        // await this.noShowOption.click();
        await this.noShowDropdown.click();
        // await this.completedOption.click();
        await this.completedDropdown.click();
        await this.allStatusOption.click();
        await this.page2btn.click();
        await this.nextPagebtn.click();
        await this.previousPagebtn.click();
    }

    async filterAllPatients() {
        await this.patientsMenubtn.click();
        await this.allPatientsbtn.click();
        await this.patientSearchInput.fill('deepthi');
        await this.clearSearchbtn.click();
        await this.allGendersDropdown.click();
        // await this.maleOption.click();
        await this.maleDropdown.click();
        await this.allGendersOption.click();
        await this.allBloodGroupsDropdown.click();
        // await this.aPlusOption.click();
        await this.aPlusDropdown.click();
        await this.allBloodGroupsOption.click();
        await this.visitDateFromInput.fill('2026-09-01');
        await this.visitDateToInput.fill('2026-09-18');
        // await this.filtersPanel.click();
        await this.resetFiltersbtn.click();
        // await this.reviewsbtn.click();
    }

    async filterReviews() {
        await this.enableNotificationsbtn.click();
        await this.reviewsbtn.click();
        await this.reviewSearchInput.fill('deepthi');
        await this.clearSearchbtn.click();
        await this.allRatingsDropdown.click();
        await this.fourStarsOption.click();
        await this.starsDropdown.click();
        await this.allRatingsOption.click();
        await this.reviewDateFrom.fill('2026-09-01');
        await this.reviewDateTo.fill('2026-09-18');
        await this.resetFiltersbtn.click();
    }

    async filterAllConsultations() {
        await this.enableNotificationsbtn.click();
        await this.clinical.click();
        await this.allconsultations.click();
        await this.consultationSearchInput.fill('deepthi');
        await this.clearSearchbtn.click();
        await this.allEmrStatusDropdown.click();
        await this.noEmrOption.click();
        // await this.noEmrDropdown.click();
        await this.allEmrStatusOption.click();
        await this.allRxStatusDropdown.click();
        await this.hasPrescriptionOption.click();
        // await this.hasPrescriptionDropdown.click();
        await this.allRxStatusOption.click();
        await this.consultationDateFrom.fill('2026-09-01');
        await this.consultationDateTo.fill('2026-09-18');
        await this.resetFiltersbtn.click();
        await this.page2btn.click();
        await this.page3btn.click();
        await this.page1btn.click();
        await this.nextPagebtn.click();
        await this.previousPagebtn.click();
    }

    async filterEMRCases() {
        await this.enableNotificationsbtn.click();
        await this.clinical.click();
        await this.emrCasesbtn.click();
        await this.emrCaseSearchInput.click();
        await this.emrCaseSearchInput.fill('deepthi');
        await this.clearSearchbtn.click();
        await this.allStatusDropdownImg.click();
        await this.pendingReviewOption.click();
        await this.emrCaseDateFrom.fill('2026-09-01');
        await this.emrCaseDateTo.fill('2026-09-18');
        await this.resetFiltersbtn.click();
        await this.sortByDateDropdown.click();
        await this.sortByStatusOption.click();
        await this.sortByDateDropdownstatus.click();
        await this.sortByPatientNameOption.click();
        await this.sortByDateDropdownpatientname.click();
        await this.sortByDateOption.click();
    }

    async filterPrescriptions() {
        await this.enableNotificationsbtn.click();
        await this.clinical.click();
        await this.prescriptionsbtn.click();
        await this.prescriptionSearchInput.fill('deepthi');
        await this.clearSearchbtn.click();
        await this.allRxDropdown.click();
        await this.activeOption.click();
        await this.completedOption.click();
        await this.allRxCombobox.click();
        // await this.allRxOption.click();
        await this.prescriptionDateFrom.fill('2026-09-01');
        await this.prescriptionDateTo.fill('2026-09-18');
        await this.resetFiltersbtn.click();
        await this.page2btn.click();
        await this.previousPagebtn.click();
        await this.nextPagebtn.click();
        await this.previousPagebtn.click();
    }

    async manageHandwrittenPrescriptions() {
        await this.enableNotificationsbtn.click();
        await this.clinical.click();
        await this.prescriptionsbtn.click();
        await this.handwrittenPrescriptionsbtn.click();
        await this.handwrittenSearchInput.fill('dee');
        await this.patientResult.click();
        await this.chooseFilebtn.setInputFiles('C:\\Users\\DeepthiKonchada\\Downloads\\allurereport.png');
        await this.notesInput.fill('test');
        await this.uploadSendbtn.click();
        await this.viewbtn.click();
        await this.closebtn.click();
        await this.sharebtn.click();
        await this.resendEmailbtn.click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });
    }
    async delete_handwitten() {
        await this.enableNotificationsbtn.click();
        await this.clinical.click();
        await this.prescriptionsbtn.click();
        await this.handwrittenPrescriptionsbtn.click();
        await this.deletebtn.click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });
    }

    async navigateToMessages() {
        await this.enableNotificationsbtn.click();
        await this.messagesbtn.click();
        await this.messageThread.click();
    }

    async manageSchedule() {
        await this.enableNotificationsbtn.click();
        await this.myScheduleMenubtn.click();
        await this.schedulerDetailsbtn.click();
        await this.editbtn.click();
        await this.scheduleStartTime.fill('07:00');
        await this.scheduleEndTime.fill('22:00');
        await this.slotDurationDropdown.click();
        await this.tenMinsOption.click();
        await this.bothModesDropdown.click();
        await this.videoOnlyOption.click();
        // // await this.videoOnlyDropdown.click();
        // await this.bothModesOption.click();
        await this.tuebtn.click({ modifiers: ['Shift'] });
        await this.updateSchedulebtn.click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });
    }

    async filterEarnings() {
        await this.enableNotificationsbtn.click();
        await this.earningsbtn.click();
        await this.earningsSearchInput.fill('deepthi');
        await this.clearSearchbtn.click();
        await this.allStatusesDropdown.click();
        await this.paidOption.click();
        // await this.paidDropdown.click();
        await this.paidstatusDropdown.click();
        await this.pendingOption.click();
        // await this.pendingStatusText.click();
        await this.pendingstatusDropdown.click();
        // await this.pendingDropdown.click();
        await this.allStatusesOption.click();
        await this.allTypesDropdown.click();
        await this.earningsVideoOption.click();
        await this.earningsVideoDropdown.click();
        await this.earningsInPersonOption.click();
        await this.earningsInPersonDropdown.click();
        await this.allTypesOption.click();
        await this.earningsDateFrom.fill('2026-09-01');
        await this.earningsDateTo.fill('2026-09-18');
        await this.resetFiltersbtn.click();
        await this.page2btn.click();
        await this.nextPagebtn.click();
        await this.previousPagebtn.click();
    }

    async editProfile() {
        await this.enableNotificationsbtn.click();
        await this.profilebtn.click();
        await this.editProfilebtn.click();
        await this.profileNameInput.click();
        await this.profileNameInput.fill('Ainala k');
        await this.profileDobInput.fill('2005-06-23');
        await this.profileGenderDropdown.click();
        await this.maleOption.click();
        await this.updateSignatureLabel.click();
        await this.updateSignatureInput.setInputFiles('C:\\Users\\DeepthiKonchada\\Downloads\\image.png');
        await this.saveChangesbtn.click();
        await this.editProfilebtn.click();
        await this.prProfessionalbtn.click();
        await this.saveChangesbtn.click();
    }

    async navigateToEMR() {
        await this.enableNotificationsbtn.click();
        const d = generateEMRData();
        await this.clinical.click();
        await this.allconsultations.click();
        await this.editbtn.click();
        await this.bp.fill(d.bp);
        await this.fever.fill(d.fever);
        await this.bp2.fill(d.heartRate);
        await this.health.fill(d.respRate);
        await this.bp3.fill(d.spo2);
        await this.weight.fill(d.weight);
        await this.height.fill(d.height);
        await this.complaint.fill(d.complaint);
        // await this.symptoms.fill('cou');  
        // await this.symptomsoption.last().click();
        // await this.pain.click();
        await this.history.fill(d.history);
        await this.conditions.fill(d.conditions);
        await this.allergy.fill(d.allergy);
        await this.medication.fill(d.medication);
        await this.examination.fill(d.examination);
        await this.diagnosis.fill(d.diagnosis);
        await this.alternative.fill(d.alternative);
        await this.testsordered.fill(d.testsOrdered);
        await this.treatment.fill(d.treatment);
        await this.clinic.fill(d.clinicalNotes);
        await this.hpd1.fill(d.fbs);
        await this.hpd2.fill(d.ppbs);
        await this.hpd3.fill(d.hba1c);
        await this.hpd4.fill(d.sugarNotes);
        await this.hpd5.fill(d.adherence);
        await this.hpd6.fill(d.missedDoses);
        await this.sideeffects.fill(d.sideEffects);
        await this.changes.fill(d.medicationChanges);
        await this.diet.fill(d.diet);
        await this.activity.fill(d.activity);
        await this.smoker.fill(d.smoker);
        await this.alcohol.fill(d.alcohol);
        await this.sleep.fill(d.sleep);
        await this.retino.fill(d.retino);
        await this.peripheral.fill(d.peripheral);
        await this.kidney.fill(d.kidney);
        await this.bpcontrol.fill(d.bpControl);
        await this.neuropathy.fill(d.neuropathy);
        await this.drugname.fill('dolo');
        await this.drugoption.click();
        await this.drugdosage.fill(d.drugDosage);
        await this.dosagefrequency.fill(d.dosageFrequency);
        await this.days.fill(d.days);
        await this.qty.fill(d.qty);
        await this.aftermeal.fill(d.afterMeal);
        await this.blooddeposite.fill(d.bloodTests);
        await this.diettt.fill(d.dietInstructions);
        await this.completebtn.click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });
    }

    async navigateToEMRWithoutDiagnosis() {
        await this.enableNotificationsbtn.click();
        const d = generateEMRData();
        await this.clinical.click();
        await this.allconsultations.click();
        await this.editbtn.click();
        await this.bp.fill(d.bp);
        await this.fever.fill(d.fever);
        await this.bp2.fill(d.heartRate);
        await this.health.fill(d.respRate);
        await this.bp3.fill(d.spo2);
        await this.weight.fill(d.weight);
        await this.height.fill(d.height);
        await this.complaint.fill(d.complaint);
        // await this.symptoms.fill(d.symptoms);
        await this.history.fill(d.history);
        await this.conditions.fill(d.conditions);
        await this.allergy.fill(d.allergy);
        await this.medication.fill(d.medication);
        await this.examination.fill(d.examination);
        // Skip diagnosis
        await this.treatment.fill(d.treatment);
        await this.completebtn.click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });

    }

    async navigateToEMRWithoutComplaint() {
        await this.enableNotificationsbtn.click();
        const d = generateEMRData();
        await this.clinical.click();
        await this.allconsultations.click();
        await this.editbtn.click();
        await this.bp.fill(d.bp);
        await this.fever.fill(d.fever);
        await this.bp2.fill(d.heartRate);
        await this.health.fill(d.respRate);
        await this.bp3.fill(d.spo2);
        await this.weight.fill(d.weight);
        await this.height.fill(d.height);
        // Skip complaint
        // await this.symptoms.fill(d.symptoms);
        await this.history.fill(d.history);
        await this.examination.fill(d.examination);
        await this.diagnosis.fill(d.diagnosis);
        await this.treatment.fill(d.treatment);
        await this.completebtn.click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });

    }

    async navigateToEMRWithoutVitals() {
        await this.enableNotificationsbtn.click();
        const d = generateEMRData();
        await this.clinical.click();
        await this.allconsultations.click();
        await this.editbtn.click();
        // Skip all vitals
        await this.complaint.fill(d.complaint);
        // await this.symptoms.fill(d.symptoms);
        await this.history.fill(d.history);
        await this.examination.fill(d.examination);
        await this.diagnosis.fill(d.diagnosis);
        await this.treatment.fill(d.treatment);
        await this.completebtn.click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });

    }



    // -- navigateToEMR negative scenario helpers --

    async navigateToEMRWithInvalidVitals() {
        await this.enableNotificationsbtn.click();
        await this.clinical.click();
        await this.allconsultations.click();
        await this.editbtn.click();
        await this.bp.fill('999999');
        await this.fever.fill('999999');
        await this.bp2.fill('999999');
        await this.health.fill('999999');
        await this.bp3.fill('999999');
        await this.weight.fill('999999');
        await this.height.fill('999999');
        await this.complaint.fill('Test complaint');
        await this.diagnosis.fill('Test diagnosis');
        await this.treatment.fill('Test treatment');
        await this.completebtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async navigateToEMRWithSqlInjection() {
        await this.enableNotificationsbtn.click();
        await this.clinical.click();
        await this.allconsultations.click();
        await this.editbtn.click();
        await this.complaint.fill("' OR '1'='1");
        await this.diagnosis.fill("' OR '1'='1");
        await this.treatment.fill("' OR '1'='1");
        await this.completebtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async navigateToEMRWithXss() {
        await this.enableNotificationsbtn.click();
        await this.clinical.click();
        await this.allconsultations.click();
        await this.editbtn.click();
        await this.complaint.fill('<script>alert(1)</script>');
        await this.diagnosis.fill('<script>alert(1)</script>');
        await this.treatment.fill('<script>alert(1)</script>');
        await this.completebtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async navigateToEMRWithEmptyFields() {
        await this.enableNotificationsbtn.click();
        await this.clinical.click();
        await this.allconsultations.click();
        await this.editbtn.click();
        await this.complaint.fill('');
        await this.diagnosis.fill('');
        await this.treatment.fill('');
        await this.completebtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async navigateToEMRWithMaxLengthFields() {
        await this.enableNotificationsbtn.click();
        await this.clinical.click();
        await this.allconsultations.click();
        await this.editbtn.click();
        await this.complaint.fill('a'.repeat(1000));
        await this.diagnosis.fill('a'.repeat(1000));
        await this.history.fill('a'.repeat(1000));
        await this.treatment.fill('a'.repeat(1000));
        await this.completebtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async navigateToEMRWithMinLengthFields() {
        await this.enableNotificationsbtn.click();
        await this.clinical.click();
        await this.allconsultations.click();
        await this.editbtn.click();
        await this.complaint.fill('a');
        await this.diagnosis.fill('a');
        await this.treatment.fill('a');
        await this.completebtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async navigateToEMRDuplicate() {

        const { generateEMRData } = require('../testData/testDataGenerator');
        const d = generateEMRData();
        await this.enableNotificationsbtn.click();
        await this.clinical.click();
        await this.allconsultations.click();
        await this.editbtn.click();
        await this.complaint.fill(d.complaint);
        await this.diagnosis.fill(d.diagnosis);
        await this.treatment.fill(d.treatment);
        await this.completebtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
        await this.editbtn.click();
        await this.complaint.fill(d.complaint);
        await this.diagnosis.fill(d.diagnosis);
        await this.treatment.fill(d.treatment);
        await this.completebtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async navigateToEMRWithApiFailure() {

        const { generateEMRData } = require('../testData/testDataGenerator');
        const d = generateEMRData();
        await this.enableNotificationsbtn.click();
        await this.clinical.click();
        await this.allconsultations.click();
        await this.editbtn.click();
        await this.complaint.fill(d.complaint);
        await this.diagnosis.fill(d.diagnosis);
        await this.treatment.fill(d.treatment);
        await this.page.route('**/api/**', route => route.abort());
        await this.completebtn.click();
    }

    async navigateToEMRSessionExpiry() {
        await this.enableNotificationsbtn.click();
        await this.clinical.click();
        await this.allconsultations.click();
        await this.editbtn.click();
        await this.page.context().clearCookies();
        await this.completebtn.click();
    }

    async navigateToEMRAndRefresh() {

        const { generateEMRData } = require('../testData/testDataGenerator');
        const d = generateEMRData();
        await this.enableNotificationsbtn.click();
        await this.clinical.click();
        await this.allconsultations.click();
        await this.editbtn.click();
        await this.complaint.fill(d.complaint);
        await this.diagnosis.fill(d.diagnosis);
        await this.page.reload();
    }

    async navigateToEMRAndNavigateBack() {

        const { generateEMRData } = require('../testData/testDataGenerator');
        const d = generateEMRData();
        await this.enableNotificationsbtn.click();
        await this.clinical.click();
        await this.allconsultations.click();
        await this.editbtn.click();
        await this.complaint.fill(d.complaint);
        await this.diagnosis.fill(d.diagnosis);
        await this.page.goBack();
    }

    async navigateToEMRConcurrent() {
        await this.enableNotificationsbtn.click();
        const { generateEMRData } = require('../testData/testDataGenerator');
        const d = generateEMRData();
        await this.clinical.click();
        await this.allconsultations.click();
        await this.editbtn.click();
        await this.complaint.fill(d.complaint);
        await this.diagnosis.fill(d.diagnosis);
        await this.treatment.fill(d.treatment);
        await Promise.all([this.completebtn.click(), this.completebtn.click()]);
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }


    // -- filterTodayAppointments negative scenario helpers --

    async filterTodayAppointmentsWithNoFilters() {
        await this.enableNotificationsbtn.click();
        await this.appointmentsMenubtn.click();
        await this.todaybtn.click();
        // No filters applied — just land on the page
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterTodayAppointmentsWithInvalidStatus() {
        await this.enableNotificationsbtn.click();
        await this.appointmentsMenubtn.click();
        await this.todaybtn.click();
        await this.allStatusDropdown.click();
        await this.scheduledOption.click();
        await this.scheduledDropdown.click();
        await this.allStatusOption.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterTodayAppointmentsWithEmptySearch() {
        await this.enableNotificationsbtn.click();
        await this.appointmentsMenubtn.click();
        await this.todaybtn.click();
        await this.allStatusDropdown.click();
        await this.allStatusOption.click();
        await this.allTypesDropdown.click();
        await this.allTypesOption.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterTodayAppointmentsWithMaxStatusCycles() {
        await this.enableNotificationsbtn.click();
        await this.appointmentsMenubtn.click();
        await this.todaybtn.click();
        for (let i = 0; i < 10; i++) {
            await this.allStatusDropdown.click();
            await this.scheduledOption.click();
            await this.scheduledDropdown.click();
            await this.allStatusOption.click();
        }
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterTodayAppointmentsWithMinFilters() {
        await this.enableNotificationsbtn.click();
        await this.appointmentsMenubtn.click();
        await this.todaybtn.click();
        await this.allStatusDropdown.click();
        await this.scheduledOption.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterTodayAppointmentsDuplicate() {
        await this.enableNotificationsbtn.click();
        await this.appointmentsMenubtn.click();
        await this.todaybtn.click();
        await this.allStatusDropdown.click();
        await this.scheduledOption.click();
        await this.scheduledDropdown.click();
        await this.allStatusOption.click();
        await this.allStatusDropdown.click();
        await this.scheduledOption.click();
        await this.scheduledDropdown.click();
        await this.allStatusOption.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterTodayAppointmentsWithNetworkFailure() {
        await this.enableNotificationsbtn.click();
        await this.appointmentsMenubtn.click();
        await this.page.route('**/api/**', route => route.abort());
        await this.todaybtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterTodayAppointmentsWithApiFailure() {
        await this.enableNotificationsbtn.click();
        await this.appointmentsMenubtn.click();
        await this.todaybtn.click();
        await this.page.route('**/api/**', route => route.abort());
        await this.allStatusDropdown.click();
        await this.scheduledOption.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterTodayAppointmentsSessionExpiry() {
        await this.enableNotificationsbtn.click();
        await this.appointmentsMenubtn.click();
        await this.page.context().clearCookies();
        await this.todaybtn.click();
    }

    async filterTodayAppointmentsAndRefresh() {
        await this.enableNotificationsbtn.click();
        await this.appointmentsMenubtn.click();
        await this.todaybtn.click();
        await this.allStatusDropdown.click();
        await this.scheduledOption.click();
        await this.page.reload();
    }

    async filterTodayAppointmentsAndNavigateBack() {
        await this.enableNotificationsbtn.click();
        await this.appointmentsMenubtn.click();
        await this.todaybtn.click();
        await this.allStatusDropdown.click();
        await this.scheduledOption.click();
        await this.page.goBack();
    }

    async filterTodayAppointmentsConcurrent() {
        await this.enableNotificationsbtn.click();
        await this.appointmentsMenubtn.click();
        await this.todaybtn.click();
        await Promise.all([
            this.allStatusDropdown.click(),
            this.allTypesDropdown.click()
        ]);
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    // -- filterUpcomingAppointments negative scenario helpers --

    async filterUpcomingAppointmentsWithNoFilters() {
        await this.enableNotificationsbtn.click();
        await this.appointmentsMenubtn.click();
        await this.upcomingbtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterUpcomingAppointmentsWithInvalidDateRange() {
        await this.enableNotificationsbtn.click();
        await this.appointmentsMenubtn.click();
        await this.upcomingbtn.click();
        await this.dateFromInput.fill('2026-12-31');
        await this.dateToInput.fill('2026-01-01');
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterUpcomingAppointmentsWithEmptyDateRange() {
        await this.enableNotificationsbtn.click();
        await this.appointmentsMenubtn.click();
        await this.upcomingbtn.click();
        await this.dateFromInput.fill('');
        await this.dateToInput.fill('');
        await this.resetFiltersbtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterUpcomingAppointmentsWithMaxDateRange() {
        await this.enableNotificationsbtn.click();
        await this.appointmentsMenubtn.click();
        await this.upcomingbtn.click();
        await this.dateFromInput.fill('2000-01-01');
        await this.dateToInput.fill('2099-12-31');
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterUpcomingAppointmentsWithMinFilters() {
        await this.enableNotificationsbtn.click();
        await this.appointmentsMenubtn.click();
        await this.upcomingbtn.click();
        await this.upcomingAllStatusDropdown.click();
        await this.confirmedOption.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterUpcomingAppointmentsDuplicate() {
        await this.enableNotificationsbtn.click();
        await this.appointmentsMenubtn.click();
        await this.upcomingbtn.click();
        await this.upcomingAllStatusDropdown.click();
        await this.confirmedOption.click();
        await this.confirmedDropdown.click();
        await this.allStatusOption.click();
        await this.upcomingAllStatusDropdown.click();
        await this.confirmedOption.click();
        await this.confirmedDropdown.click();
        await this.allStatusOption.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterUpcomingAppointmentsWithNetworkFailure() {
        await this.enableNotificationsbtn.click();
         await this.appointmentsMenubtn.click();
         await this.upcomingbtn.click();
        await this.page.route('**/api/**', route => route.abort());
        
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterUpcomingAppointmentsWithApiFailure() {
        await this.upcomingbtn.click();
        await this.page.route('**/api/**', route => route.abort());
        await this.upcomingAllStatusDropdown.click();
        await this.confirmedOption.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterUpcomingAppointmentsSessionExpiry() {
        await this.enableNotificationsbtn.click();
        await this.page.context().clearCookies();
        await this.appointmentsMenubtn.click();
        await this.upcomingbtn.click();

    }

    async filterUpcomingAppointmentsAndRefresh() {
        await this.enableNotificationsbtn.click();
        await this.appointmentsMenubtn.click();
        await this.upcomingbtn.click();
        await this.upcomingAllStatusDropdown.click();
        await this.confirmedOption.click();
        await this.dateFromInput.fill('2026-09-18');
        await this.page.reload();
    }

    async filterUpcomingAppointmentsAndNavigateBack() {
        await this.enableNotificationsbtn.click();
        await this.appointmentsMenubtn.click();
        await this.upcomingbtn.click();
        await this.upcomingAllStatusDropdown.click();
        await this.confirmedOption.click();
        await this.dateFromInput.fill('2026-09-18');
        await this.page.goBack();
    }

    async filterUpcomingAppointmentsConcurrent() {
        await this.enableNotificationsbtn.click();
        await this.appointmentsMenubtn.click();
        await this.upcomingbtn.click();
        await Promise.all([
            this.upcomingAllStatusDropdown.click(),
            this.allTypesDropdown.click()
        ]);
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }



    // -- filterHistoryAppointments negative scenario helpers --

    async filterHistoryAppointmentsWithNoFilters() {
        await this.enableNotificationsbtn.click();
        await this.appointmentsMenubtn.click();
        await this.historybtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterHistoryAppointmentsWithInvalidDateRange() {
        await this.enableNotificationsbtn.click();
        await this.appointmentsMenubtn.click();
        await this.historybtn.click();
        await this.historyDateFrom.fill('2026-12-31');
        await this.historyDateTo.fill('2026-01-01');
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterHistoryAppointmentsWithEmptySearch() {
        await this.enableNotificationsbtn.click();
        await this.appointmentsMenubtn.click();
        await this.historybtn.click();
        await this.historySearchInput.fill('');
        await this.historyDateFrom.fill('');
        await this.historyDateTo.fill('');
        await this.resetFiltersbtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterHistoryAppointmentsWithMaxDateRange() {
        await this.enableNotificationsbtn.click();
        await this.appointmentsMenubtn.click();
        await this.historybtn.click();
        await this.historyDateFrom.fill('2000-01-01');
        await this.historyDateTo.fill('2099-12-31');
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterHistoryAppointmentsWithMinFilters() {
        await this.enableNotificationsbtn.click();
        await this.appointmentsMenubtn.click();
        await this.historybtn.click();
        await this.historySearchInput.fill('a');
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterHistoryAppointmentsDuplicate() {
        await this.enableNotificationsbtn.click();
        await this.appointmentsMenubtn.click();
        await this.historybtn.click();
        await this.noShowDropdown.first().click();
        await this.completedOption.click();
        await this.completedDropdown.click();
        await this.allStatusOption.click();
        await this.noShowDropdown.click();
        await this.completedOption.click();
        await this.completedDropdown.click();
        await this.allStatusOption.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterHistoryAppointmentsWithNetworkFailure() {

        await this.page.route('**/api/**', route => route.abort());
        await this.appointmentsMenubtn.click();
        await this.historybtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterHistoryAppointmentsWithApiFailure() {
        await this.appointmentsMenubtn.click();
        await this.historybtn.click();
        await this.page.route('**/api/**', route => route.abort());
        await this.historySearchInput.fill('deepthi');
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterHistoryAppointmentsSessionExpiry() {
        await this.enableNotificationsbtn.click();
        await this.page.context().clearCookies();
        await this.appointmentsMenubtn.click();
        await this.historybtn.click();
    }

    async filterHistoryAppointmentsAndRefresh() {
        await this.enableNotificationsbtn.click();
        await this.appointmentsMenubtn.click();
        await this.historybtn.click();
        await this.historySearchInput.fill('deepthi');
        await this.historyDateFrom.fill('2026-09-01');
        await this.page.reload();
    }

    async filterHistoryAppointmentsAndNavigateBack() {
        await this.enableNotificationsbtn.click();
        await this.appointmentsMenubtn.click();
        await this.historybtn.click();
        await this.historySearchInput.fill('deepthi');
        await this.historyDateFrom.fill('2026-09-01');
        await this.page.goBack();
    }

    async filterHistoryAppointmentsConcurrent() {
        await this.enableNotificationsbtn.click();
        await this.appointmentsMenubtn.click();
        await this.historybtn.click();
        await Promise.all([
            this.historySearchInput.fill('deepthi'),
            this.historyDateFrom.fill('2026-09-01')
        ]);
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    // -- filterAllPatients negative scenario helpers --

    async filterAllPatientsWithNoFilters() {
        await this.enableNotificationsbtn.click();
        await this.patientsMenubtn.click();
        await this.allPatientsbtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterAllPatientsWithInvalidDateRange() {
        await this.enableNotificationsbtn.click();
        await this.patientsMenubtn.click();
        await this.allPatientsbtn.click();
        await this.visitDateFromInput.fill('2026-12-31');
        await this.visitDateToInput.fill('2026-01-01');
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterAllPatientsWithEmptySearch() {
        await this.enableNotificationsbtn.click();
        await this.patientsMenubtn.click();
        await this.allPatientsbtn.click();
        await this.patientSearchInput.fill('');
        await this.visitDateFromInput.fill('');
        await this.visitDateToInput.fill('');
        await this.resetFiltersbtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterAllPatientsWithMaxDateRange() {
        await this.enableNotificationsbtn.click();
        await this.patientsMenubtn.click();
        await this.allPatientsbtn.click();
        await this.visitDateFromInput.fill('2000-01-01');
        await this.visitDateToInput.fill('2099-12-31');
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterAllPatientsWithMinFilters() {
        await this.enableNotificationsbtn.click();
        await this.patientsMenubtn.click();
        await this.allPatientsbtn.click();
        await this.patientSearchInput.fill('a');
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterAllPatientsDuplicate() {
        await this.enableNotificationsbtn.click();
        await this.patientsMenubtn.click();
        await this.allPatientsbtn.click();
        await this.allGendersDropdown.click();
        await this.maleOption.click();
        await this.maleDropdown.click();
        await this.allGendersOption.click();
        await this.allGendersDropdown.click();
        await this.maleOption.click();
        await this.maleDropdown.click();
        await this.allGendersOption.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterAllPatientsWithNetworkFailure() {
        await this.page.route('**/api/**', route => route.abort());
        await this.patientsMenubtn.click();
        await this.allPatientsbtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterAllPatientsWithApiFailure() {

        await this.patientsMenubtn.click();
        await this.allPatientsbtn.click();
        await this.page.route('**/api/**', route => route.abort());
        await this.patientSearchInput.fill('deepthi');
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterAllPatientsSessionExpiry() {
        await this.page.context().clearCookies();
        await this.patientsMenubtn.click();
    }

    async filterAllPatientsAndRefresh() {
        await this.patientsMenubtn.click();
        await this.allPatientsbtn.click();
        await this.patientSearchInput.fill('deepthi');
        await this.visitDateFromInput.fill('2026-09-01');
        await this.page.reload();
    }

    async filterAllPatientsAndNavigateBack() {
        await this.patientsMenubtn.click();
        await this.allPatientsbtn.click();
        await this.patientSearchInput.fill('deepthi');
        await this.visitDateFromInput.fill('2026-09-01');
        await this.page.goBack();
    }

    async filterAllPatientsConcurrent() {
        await this.patientsMenubtn.click();
        await this.allPatientsbtn.click();
        await Promise.all([
            this.patientSearchInput.fill('deepthi'),
            this.visitDateFromInput.fill('2026-09-01')
        ]);
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    // -- filterReviews negative scenario helpers --

    async filterReviewsWithNoFilters() {
        await this.reviewsbtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterReviewsWithInvalidDateRange() {
        await this.reviewsbtn.click();
        await this.reviewDateFrom.fill('2026-12-31');
        await this.reviewDateTo.fill('2026-01-01');
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterReviewsWithEmptySearch() {
        await this.reviewsbtn.click();
        await this.reviewSearchInput.fill('');
        await this.reviewDateFrom.fill('');
        await this.reviewDateTo.fill('');
        await this.resetFiltersbtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterReviewsWithMaxDateRange() {
        await this.reviewsbtn.click();
        await this.reviewDateFrom.fill('2000-01-01');
        await this.reviewDateTo.fill('2099-12-31');
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterReviewsWithMinFilters() {
        await this.reviewsbtn.click();
        await this.reviewSearchInput.fill('a');
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterReviewsDuplicate() {
        await this.reviewsbtn.click();
        await this.allRatingsDropdown.click();
        await this.fourStarsOption.click();
        await this.starsDropdown.click();
        await this.allRatingsOption.click();
        await this.allRatingsDropdown.click();
        await this.fourStarsOption.click();
        await this.starsDropdown.click();
        await this.allRatingsOption.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterReviewsWithNetworkFailure() {
        await this.page.route('**/api/**', route => route.abort());
        await this.reviewsbtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterReviewsWithApiFailure() {
        await this.reviewsbtn.click();
        await this.page.route('**/api/**', route => route.abort());
        await this.reviewSearchInput.fill('deepthi');
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterReviewsSessionExpiry() {
        await this.page.context().clearCookies();
        await this.reviewsbtn.click();
    }

    async filterReviewsAndRefresh() {
        await this.reviewsbtn.click();
        await this.reviewSearchInput.fill('deepthi');
        await this.reviewDateFrom.fill('2026-09-01');
        await this.page.reload();
    }

    async filterReviewsAndNavigateBack() {
        await this.reviewsbtn.click();
        await this.reviewSearchInput.fill('deepthi');
        await this.reviewDateFrom.fill('2026-09-01');
        await this.page.goBack();
    }

    async filterReviewsConcurrent() {
        await this.reviewsbtn.click();
        await Promise.all([
            this.reviewSearchInput.fill('deepthi'),
            this.reviewDateFrom.fill('2026-09-01')
        ]);
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    // -- filterAllConsultations negative scenario helpers --

    async filterAllConsultationsWithNoFilters() {
        await this.clinical.click();
        await this.allconsultations.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterAllConsultationsWithInvalidDateRange() {
        await this.clinical.click();
        await this.allconsultations.click();
        await this.consultationDateFrom.fill('2026-12-31');
        await this.consultationDateTo.fill('2026-01-01');
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterAllConsultationsWithEmptySearch() {
        await this.clinical.click();
        await this.allconsultations.click();
        await this.consultationSearchInput.fill('');
        await this.consultationDateFrom.fill('');
        await this.consultationDateTo.fill('');
        await this.resetFiltersbtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterAllConsultationsWithMaxDateRange() {
        await this.clinical.click();
        await this.allconsultations.click();
        await this.consultationDateFrom.fill('2000-01-01');
        await this.consultationDateTo.fill('2099-12-31');
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterAllConsultationsWithMinFilters() {
        await this.clinical.click();
        await this.allconsultations.click();
        await this.consultationSearchInput.fill('a');
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterAllConsultationsDuplicate() {
        await this.clinical.click();
        await this.allconsultations.click();
        await this.allEmrStatusDropdown.click();
        await this.noEmrOption.click();
        await this.noEmrDropdown.click();
        await this.allEmrStatusOption.click();
        await this.allEmrStatusDropdown.click();
        await this.noEmrOption.click();
        await this.noEmrDropdown.click();
        await this.allEmrStatusOption.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterAllConsultationsWithNetworkFailure() {
        await this.page.route('**/api/**', route => route.abort());
        await this.clinical.click();
        await this.allconsultations.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterAllConsultationsWithApiFailure() {
        await this.clinical.click();
        await this.allconsultations.click();
        await this.page.route('**/api/**', route => route.abort());
        await this.consultationSearchInput.fill('deepthi');
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterAllConsultationsSessionExpiry() {
        await this.page.context().clearCookies();
        await this.clinical.click();
    }

    async filterAllConsultationsAndRefresh() {
        await this.clinical.click();
        await this.allconsultations.click();
        await this.consultationSearchInput.fill('deepthi');
        await this.consultationDateFrom.fill('2026-09-01');
        await this.page.reload();
    }

    async filterAllConsultationsAndNavigateBack() {
        await this.clinical.click();
        await this.allconsultations.click();
        await this.consultationSearchInput.fill('deepthi');
        await this.consultationDateFrom.fill('2026-09-01');
        await this.page.goBack();
    }

    async filterAllConsultationsConcurrent() {
        await this.clinical.click();
        await this.allconsultations.click();
        await Promise.all([
            this.consultationSearchInput.fill('deepthi'),
            this.consultationDateFrom.fill('2026-09-01')
        ]);
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    // -- filterEMRCases negative scenario helpers --

    async filterEMRCasesWithNoFilters() {
        await this.enableNotificationsbtn.click();
        await this.clinical.click();
        await this.emrCasesbtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterEMRCasesWithInvalidDateRange() {
        await this.enableNotificationsbtn.click();
        await this.clinical.click();
        await this.emrCasesbtn.click();
        await this.emrCaseDateFrom.fill('2026-12-31');
        await this.emrCaseDateTo.fill('2026-01-01');
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterEMRCasesWithEmptySearch() {
        await this.enableNotificationsbtn.click();
        await this.clinical.click();
        await this.emrCasesbtn.click();
        await this.emrCaseSearchInput.fill('');
        await this.emrCaseDateFrom.fill('');
        await this.emrCaseDateTo.fill('');
        await this.resetFiltersbtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterEMRCasesWithMaxDateRange() {
        await this.enableNotificationsbtn.click();
        await this.clinical.click();
        await this.emrCasesbtn.click();
        await this.emrCaseDateFrom.fill('2000-01-01');
        await this.emrCaseDateTo.fill('2099-12-31');
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterEMRCasesWithMinFilters() {
        await this.enableNotificationsbtn.click();
        await this.clinical.click();
        await this.emrCasesbtn.click();
        await this.emrCaseSearchInput.fill('a');
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterEMRCasesDuplicate() {
        await this.enableNotificationsbtn.click();
        await this.clinical.click();
        await this.emrCasesbtn.click();
        await this.allStatusDropdownCombo.click();
        await this.pendingReviewOption.click();
        await this.allStatusDropdownCombo.click();
        await this.pendingReviewOption.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterEMRCasesWithNetworkFailure() {
        await this.page.route('**/api/**', route => route.abort());
        await this.emrCasesbtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterEMRCasesWithApiFailure() {
        await this.enableNotificationsbtn.click();
        await this.clinical.click();
        await this.emrCasesbtn.click();
        await this.page.route('**/api/**', route => route.abort());
        await this.emrCaseSearchInput.fill('deepthi');
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterEMRCasesSessionExpiry() {
        await this.page.context().clearCookies();
        await this.enableNotificationsbtn.click();
        await this.clinical.click();
        await this.emrCasesbtn.click();
    }

    async filterEMRCasesAndRefresh() {
        await this.enableNotificationsbtn.click();
        await this.clinical.click();
        await this.emrCasesbtn.click();
        await this.emrCaseSearchInput.fill('deepthi');
        await this.emrCaseDateFrom.fill('2026-09-01');
        await this.page.reload();
    }

    async filterEMRCasesAndNavigateBack() {
        await this.enableNotificationsbtn.click();
        await this.clinical.click();
        await this.emrCasesbtn.click();
        await this.emrCaseSearchInput.fill('deepthi');
        await this.emrCaseDateFrom.fill('2026-09-01');
        await this.page.goBack();
    }

    async filterEMRCasesConcurrent() {
        await this.enableNotificationsbtn.click();
        await this.clinical.click();
        await this.emrCasesbtn.click();
        await Promise.all([
            this.emrCaseSearchInput.fill('deepthi'),
            this.emrCaseDateFrom.fill('2026-09-01')
        ]);
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    // -- filterPrescriptions negative scenario helpers --

    async filterPrescriptionsWithNoFilters() {
        await this.enableNotificationsbtn.click();
        await this.clinical.click();
        await this.prescriptionsbtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterPrescriptionsWithInvalidDateRange() {
        await this.enableNotificationsbtn.click();
        await this.clinical.click();
        await this.prescriptionsbtn.click();
        await this.prescriptionDateFrom.fill('2026-12-31');
        await this.prescriptionDateTo.fill('2026-01-01');
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterPrescriptionsWithEmptySearch() {
        await this.enableNotificationsbtn.click();
        await this.clinical.click();
        await this.prescriptionsbtn.click();
        await this.prescriptionSearchInput.fill('');
        await this.prescriptionDateFrom.fill('');
        await this.prescriptionDateTo.fill('');
        await this.resetFiltersbtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterPrescriptionsWithMaxDateRange() {
        await this.enableNotificationsbtn.click();
        await this.clinical.click();
        await this.prescriptionsbtn.click();
        await this.prescriptionDateFrom.fill('2000-01-01');
        await this.prescriptionDateTo.fill('2099-12-31');
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterPrescriptionsWithMinFilters() {
        await this.enableNotificationsbtn.click();
        await this.clinical.click();
        await this.prescriptionsbtn.click();
        await this.prescriptionSearchInput.fill('a');
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterPrescriptionsDuplicate() {
        await this.enableNotificationsbtn.click();
        await this.clinical.click();
        await this.prescriptionsbtn.click();
        await this.allRxDropdown.click();
        await this.activeOption.click();
        await this.allRxCombobox.click();
        await this.allRxOption.click();
        await this.allRxDropdown.click();
        await this.activeOption.click();
        await this.allRxCombobox.click();
        await this.allRxOption.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterPrescriptionsWithNetworkFailure() {
        await this.page.route('**/api/**', route => route.abort());
        await this.enableNotificationsbtn.click();
        await this.clinical.click();
        await this.prescriptionsbtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterPrescriptionsWithApiFailure() {
        await this.prescriptionsbtn.click();
        await this.page.route('**/api/**', route => route.abort());
        await this.prescriptionSearchInput.fill('deepthi');
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterPrescriptionsSessionExpiry() {
        await this.page.context().clearCookies();
        await this.enableNotificationsbtn.click();
        await this.clinical.click();
        await this.prescriptionsbtn.click();
    }

    async filterPrescriptionsAndRefresh() {
        await this.enableNotificationsbtn.click();
        await this.clinical.click();
        await this.prescriptionsbtn.click();
        await this.prescriptionSearchInput.fill('deepthi');
        await this.prescriptionDateFrom.fill('2026-09-01');
        await this.page.reload();
    }

    async filterPrescriptionsAndNavigateBack() {
        await this.enableNotificationsbtn.click();
        await this.clinical.click();
        await this.prescriptionsbtn.click();
        await this.prescriptionSearchInput.fill('deepthi');
        await this.prescriptionDateFrom.fill('2026-09-01');
        await this.page.goBack();
    }

    async filterPrescriptionsConcurrent() {
        await this.enableNotificationsbtn.click();
        await this.clinical.click();
        await this.prescriptionsbtn.click();
        await Promise.all([
            this.prescriptionSearchInput.fill('deepthi'),
            this.prescriptionDateFrom.fill('2026-09-01')
        ]);
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    // -- manageHandwrittenPrescriptions negative scenario helpers --

    async manageHandwrittenPrescriptionsWithNoFile() {
        await this.enableNotificationsbtn.click();
        await this.clinical.click();
        await this.prescriptionsbtn.click();
        await this.handwrittenPrescriptionsbtn.click();
        await this.handwrittenSearchInput.fill('dee');
        await this.patientResult.click();
        await expect(this.uploadSendbtn).toBeDisabled();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async manageHandwrittenPrescriptionsWithInvalidFileType() {
        await this.enableNotificationsbtn.click();
        await this.clinical.click();
        await this.prescriptionsbtn.click();
        await this.handwrittenPrescriptionsbtn.click();
        await this.handwrittenSearchInput.fill('dee');
        await this.patientResult.click();
        await this.chooseFilebtn.setInputFiles({ name: 'test.txt', mimeType: 'text/plain', buffer: Buffer.from('invalid file') });
        await this.uploadSendbtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async manageHandwrittenPrescriptionsWithEmptySearch() {
        await this.enableNotificationsbtn.click();
        await this.clinical.click();
        await this.prescriptionsbtn.click();
        await this.handwrittenPrescriptionsbtn.click();
        await this.handwrittenSearchInput.fill('');
        await expect(this.uploadSendbtn).toBeDisabled();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async manageHandwrittenPrescriptionsWithMaxNotes() {
        await this.enableNotificationsbtn.click();
        await this.clinical.click();
        await this.prescriptionsbtn.click();
        await this.handwrittenPrescriptionsbtn.click();
        await this.handwrittenSearchInput.fill('dee');
        await this.patientResult.click();
        await this.chooseFilebtn.setInputFiles('C:\\Users\\DeepthiKonchada\\Downloads\\allurereport.png');
        await this.notesInput.fill('a'.repeat(1000));
        await this.uploadSendbtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async manageHandwrittenPrescriptionsWithMinNotes() {
        await this.enableNotificationsbtn.click();
        await this.clinical.click();
        await this.prescriptionsbtn.click();
        await this.handwrittenPrescriptionsbtn.click();
        await this.handwrittenSearchInput.fill('dee');
        await this.patientResult.click();
        await this.chooseFilebtn.setInputFiles('C:\\Users\\DeepthiKonchada\\Downloads\\allurereport.png');
        await this.notesInput.fill('a');
        await this.uploadSendbtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async manageHandwrittenPrescriptionsDuplicate() {
        await this.enableNotificationsbtn.click();
        await this.clinical.click();
        await this.prescriptionsbtn.click();
        await this.handwrittenPrescriptionsbtn.click();
        await this.handwrittenSearchInput.fill('dee');
        await this.patientResult.click();
        await this.chooseFilebtn.setInputFiles('C:\\Users\\DeepthiKonchada\\Downloads\\allurereport.png');
        await this.notesInput.fill('test');
        await this.chooseFilebtn.setInputFiles('C:\\Users\\DeepthiKonchada\\Downloads\\EMRPending.png');
        await this.notesInput.fill('test smaaa');
        await this.uploadSendbtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async manageHandwrittenPrescriptionsWithNetworkFailure() {
        await this.page.route('**/api/**', route => route.abort());
        await this.enableNotificationsbtn.click();
        await this.clinical.click();
        await this.prescriptionsbtn.click();
        await this.handwrittenPrescriptionsbtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async manageHandwrittenPrescriptionsWithApiFailure() {
        await this.enableNotificationsbtn.click();
        await this.clinical.click();
        await this.prescriptionsbtn.click();
        await this.handwrittenPrescriptionsbtn.click();
        await this.handwrittenSearchInput.fill('dee');
        await this.patientResult.click();
        await this.chooseFilebtn.setInputFiles('C:\\Users\\DeepthiKonchada\\Downloads\\allurereport.png');
        await this.notesInput.fill('test');
        await this.page.route('**/api/**', route => route.abort());
        await this.uploadSendbtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async manageHandwrittenPrescriptionsSessionExpiry() {
        await this.page.context().clearCookies();
        await this.handwrittenPrescriptionsbtn.click();
    }

    async manageHandwrittenPrescriptionsAndRefresh() {
        await this.enableNotificationsbtn.click();
        await this.clinical.click();
        await this.prescriptionsbtn.click();
        await this.handwrittenPrescriptionsbtn.click();
        await this.handwrittenSearchInput.fill('dee');
        await this.patientResult.click();
        await this.chooseFilebtn.setInputFiles('C:\\Users\\DeepthiKonchada\\Downloads\\allurereport.png');
        await this.notesInput.fill('test');
        await this.page.reload();
    }

    async manageHandwrittenPrescriptionsAndNavigateBack() {
        await this.enableNotificationsbtn.click();
        await this.clinical.click();
        await this.prescriptionsbtn.click();
        await this.handwrittenPrescriptionsbtn.click();
        await this.handwrittenSearchInput.fill('dee');
        await this.patientResult.click();
        await this.chooseFilebtn.setInputFiles('C:\\Users\\DeepthiKonchada\\Downloads\\allurereport.png');
        await this.notesInput.fill('test');
        await this.page.goBack();
    }

    async manageHandwrittenPrescriptionsConcurrent() {
        await this.enableNotificationsbtn.click();
        await this.clinical.click();
        await this.prescriptionsbtn.click();
        await this.handwrittenPrescriptionsbtn.click();
        await this.handwrittenSearchInput.fill('dee');
        await this.patientResult.click();
        await this.chooseFilebtn.setInputFiles('C:\\Users\\DeepthiKonchada\\Downloads\\allurereport.png');
        await this.notesInput.fill('test');
        await Promise.all([this.uploadSendbtn.click(), this.uploadSendbtn.click()]);
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    // -- delete_handwitten negative scenario helpers --

    async deleteHandwrittenWithNoSelection() {
        await this.handwrittenPrescriptionsbtn.click();
        await this.deletebtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async deleteHandwrittenWithInvalidTarget() {
        await this.handwrittenPrescriptionsbtn.click();
        await this.handwrittenSearchInput.fill('zzzznonexistent');
        await this.deletebtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async deleteHandwrittenWithEmptyList() {
        await this.handwrittenPrescriptionsbtn.click();
        await this.handwrittenSearchInput.fill('zzzznonexistent');
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async deleteHandwrittenWithMaxItems() {
        await this.handwrittenPrescriptionsbtn.click();
        for (let i = 0; i < 5; i++) {
            await this.deletebtn.click();
            this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
        }
    }

    async deleteHandwrittenWithMinItems() {
        await this.handwrittenPrescriptionsbtn.click();
        await this.deletebtn.click();
        this.page.once('dialog', dialog => { dialog.accept().catch(() => { }); });
    }

    async deleteHandwrittenDuplicate() {
        await this.handwrittenPrescriptionsbtn.click();
        await this.deletebtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
        await this.deletebtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async deleteHandwrittenWithNetworkFailure() {
        await this.page.route('**/api/**', route => route.abort());
        await this.handwrittenPrescriptionsbtn.click();
        await this.deletebtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async deleteHandwrittenWithApiFailure() {
        await this.handwrittenPrescriptionsbtn.click();
        await this.page.route('**/api/**', route => route.abort());
        await this.deletebtn.click();
        this.page.once('dialog', dialog => { dialog.accept().catch(() => { }); });
    }

    async deleteHandwrittenSessionExpiry() {
        await this.page.context().clearCookies();
        await this.handwrittenPrescriptionsbtn.click();
    }

    async deleteHandwrittenAndRefresh() {
        await this.handwrittenPrescriptionsbtn.click();
        await this.deletebtn.click();
        await this.page.reload();
    }

    async deleteHandwrittenAndNavigateBack() {
        await this.handwrittenPrescriptionsbtn.click();
        await this.deletebtn.click();
        await this.page.goBack();
    }

    async deleteHandwrittenConcurrent() {
        await this.handwrittenPrescriptionsbtn.click();
        await Promise.all([this.deletebtn.click(), this.deletebtn.click()]);
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    // -- manageSchedule negative scenario helpers --

    async manageScheduleWithNoTimings() {
        await this.myScheduleMenubtn.click();
        await this.schedulerDetailsbtn.click();
        await this.editbtn.click();
        await this.scheduleStartTime.fill('');
        await this.scheduleEndTime.fill('');
        await this.updateSchedulebtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async manageScheduleWithInvalidTimings() {
        await this.myScheduleMenubtn.click();
        await this.schedulerDetailsbtn.click();
        await this.editbtn.click();
        await this.scheduleStartTime.fill('23:00');
        await this.scheduleEndTime.fill('01:00');
        await this.updateSchedulebtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async manageScheduleWithEmptyFields() {
        await this.myScheduleMenubtn.click();
        await this.schedulerDetailsbtn.click();
        await this.editbtn.click();
        await this.scheduleStartTime.fill('');
        await this.scheduleEndTime.fill('');
        await this.updateSchedulebtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async manageScheduleWithMaxSlotDuration() {
        await this.myScheduleMenubtn.click();
        await this.schedulerDetailsbtn.click();
        await this.editbtn.click();
        await this.scheduleStartTime.fill('00:00');
        await this.scheduleEndTime.fill('23:59');
        await this.slotDurationDropdown.click();
        await this.tenMinsOption.click();
        await this.updateSchedulebtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async manageScheduleWithMinSlotDuration() {
        await this.myScheduleMenubtn.click();
        await this.schedulerDetailsbtn.click();
        await this.editbtn.click();
        await this.scheduleStartTime.fill('09:00');
        await this.scheduleEndTime.fill('09:10');
        await this.slotDurationDropdown.click();
        await this.tenMinsOption.click();
        await this.updateSchedulebtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async manageScheduleDuplicate() {
        await this.myScheduleMenubtn.click();
        await this.schedulerDetailsbtn.click();
        await this.editbtn.click();
        await this.scheduleStartTime.fill('07:00');
        await this.scheduleEndTime.fill('22:00');
        await this.updateSchedulebtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
        await this.editbtn.click();
        await this.scheduleStartTime.fill('07:00');
        await this.scheduleEndTime.fill('22:00');
        await this.updateSchedulebtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async manageScheduleWithNetworkFailure() {
        await this.page.route('**/api/**', route => route.abort());
        await this.myScheduleMenubtn.click();
        await this.schedulerDetailsbtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async manageScheduleWithApiFailure() {
        await this.myScheduleMenubtn.click();
        await this.schedulerDetailsbtn.click();
        await this.editbtn.click();
        await this.scheduleStartTime.fill('07:00');
        await this.scheduleEndTime.fill('22:00');
        await this.page.route('**/api/**', route => route.abort());
        await this.updateSchedulebtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async manageScheduleSessionExpiry() {
        await this.page.context().clearCookies();
        await this.myScheduleMenubtn.click();
    }

    async manageScheduleAndRefresh() {
        await this.myScheduleMenubtn.click();
        await this.schedulerDetailsbtn.click();
        await this.editbtn.click();
        await this.scheduleStartTime.fill('07:00');
        await this.scheduleEndTime.fill('22:00');
        await this.page.reload();
    }

    async manageScheduleAndNavigateBack() {
        await this.myScheduleMenubtn.click();
        await this.schedulerDetailsbtn.click();
        await this.editbtn.click();
        await this.scheduleStartTime.fill('07:00');
        await this.scheduleEndTime.fill('22:00');
        await this.page.goBack();
    }

    async manageScheduleConcurrent() {
        await this.myScheduleMenubtn.click();
        await this.schedulerDetailsbtn.click();
        await this.editbtn.click();
        await this.scheduleStartTime.fill('07:00');
        await this.scheduleEndTime.fill('22:00');
        await Promise.all([this.updateSchedulebtn.click(), this.updateSchedulebtn.click()]);
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    // -- filterEarnings negative scenario helpers --

    async filterEarningsWithNoFilters() {
         await this.enableNotificationsbtn.click();
        await this.earningsbtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterEarningsWithInvalidDateRange() {
         await this.enableNotificationsbtn.click();
        await this.earningsbtn.click();
        await this.earningsDateFrom.fill('2026-12-31');
        await this.earningsDateTo.fill('2026-01-01');
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterEarningsWithEmptySearch() {
         await this.enableNotificationsbtn.click();
        await this.earningsbtn.click();
        await this.earningsSearchInput.fill('');
        await this.earningsDateFrom.fill('');
        await this.earningsDateTo.fill('');
        await this.resetFiltersbtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterEarningsWithMaxDateRange() {
         await this.enableNotificationsbtn.click();
        await this.earningsbtn.click();
        await this.earningsDateFrom.fill('2000-01-01');
        await this.earningsDateTo.fill('2099-12-31');
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterEarningsWithMinFilters() {
         await this.enableNotificationsbtn.click();
        await this.earningsbtn.click();
        await this.earningsSearchInput.fill('a');
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterEarningsDuplicate() {
         await this.enableNotificationsbtn.click();
        await this.earningsbtn.click();
        await this.allStatusesDropdown.click();
        await this.paidOption.click();
        await this.paidDropdown.click();
        await this.allStatusesOption.click();
        await this.allStatusesDropdown.click();
        await this.paidOption.click();
        await this.paidDropdown.click();
        await this.allStatusesOption.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterEarningsWithNetworkFailure() {
        await this.page.route('**/api/**', route => route.abort());
         await this.enableNotificationsbtn.click();
        await this.earningsbtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterEarningsWithApiFailure() {
         await this.enableNotificationsbtn.click();
        await this.earningsbtn.click();
        await this.page.route('**/api/**', route => route.abort());
        await this.earningsSearchInput.fill('deepthi');
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterEarningsSessionExpiry() {
        await this.page.context().clearCookies();
         await this.enableNotificationsbtn.click();
        await this.earningsbtn.click();
    }

    async filterEarningsAndRefresh() {
         await this.enableNotificationsbtn.click();
        await this.earningsbtn.click();
        await this.earningsSearchInput.fill('deepthi');
        await this.earningsDateFrom.fill('2026-09-01');
        await this.page.reload();
    }

    async filterEarningsAndNavigateBack() {
         await this.enableNotificationsbtn.click();
        await this.earningsbtn.click();
        await this.earningsSearchInput.fill('deepthi');
        await this.earningsDateFrom.fill('2026-09-01');
        await this.page.goBack();
    }

    async filterEarningsConcurrent() {
         await this.enableNotificationsbtn.click();
        await this.earningsbtn.click();
        await Promise.all([
            this.earningsSearchInput.fill('deepthi'),
            this.earningsDateFrom.fill('2026-09-01')
        ]);
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    // -- editProfile negative scenario helpers --

    async editProfileWithNoName() {
        await this.profilebtn.click();
        await this.editProfilebtn.click();
        await this.profileNameInput.clear();
        await this.profileNameInput.fill('');
        await this.saveChangesbtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async editProfileWithInvalidDob() {
        await this.profilebtn.click();
        await this.editProfilebtn.click();
        await this.profileDobInput.fill('2099-01-01');
        await this.saveChangesbtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async editProfileWithEmptyFields() {
        await this.profilebtn.click();
        await this.editProfilebtn.click();
        await this.profileNameInput.fill('');
        await this.profileDobInput.fill('');
        await this.saveChangesbtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async editProfileWithMaxLengthName() {
        await this.profilebtn.click();
        await this.editProfilebtn.click();
        await this.profileNameInput.fill('a'.repeat(255));
        await this.saveChangesbtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async editProfileWithMinLengthName() {
        await this.profilebtn.click();
        await this.editProfilebtn.click();
        await this.profileNameInput.fill('a');
        await this.saveChangesbtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async editProfileDuplicate() {
        await this.profilebtn.click();
        await this.editProfilebtn.click();
        await this.profileNameInput.fill('Ainala k');
        await this.saveChangesbtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
        await this.editProfilebtn.click();
        await this.profileNameInput.fill('Ainala k');
        await this.saveChangesbtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async editProfileWithNetworkFailure() {
        await this.page.route('**/api/**', route => route.abort());
        await this.profilebtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async editProfileWithApiFailure() {
        await this.profilebtn.click();
        await this.editProfilebtn.click();
        await this.profileNameInput.fill('Ainala k');
        await this.page.route('**/api/**', route => route.abort());
        await this.saveChangesbtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async editProfileSessionExpiry() {
        await this.page.context().clearCookies();
        await this.profilebtn.click();
    }

    async editProfileAndRefresh() {
        await this.profilebtn.click();
        await this.editProfilebtn.click();
        await this.profileNameInput.fill('Ainala k');
        await this.page.reload();
    }

    async editProfileAndNavigateBack() {
        await this.profilebtn.click();
        await this.editProfilebtn.click();
        await this.profileNameInput.fill('Ainala k');
        await this.page.goBack();
    }

    async editProfileConcurrent() {
        await this.profilebtn.click();
        await this.editProfilebtn.click();
        await this.profileNameInput.fill('Ainala k');
        await Promise.all([this.saveChangesbtn.click(), this.saveChangesbtn.click()]);
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }
}

module.exports = { doctorPortalPage };
