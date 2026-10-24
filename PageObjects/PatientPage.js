const { expect } = require('@playwright/test');
const { generateLabReportData, generateReviewData, generateDocumentData, generateRescheduleData, generateCancelData } = require('../testData/testDataGenerator');
const path = require('path');
const os = require('os');
const DOCUMENT_PATH = path.join(os.homedir(), 'OneDrive - ValueMomentum, Inc', 'Pictures', 'no info but getting data.png');

class PatientPage {
    constructor(page) {
        this.page = page;
        this.bookappointmentbtn = page.getByRole('button', { name: 'Book New Appointment' });
        // this.speciality = page.getByText('Neurology', { exact: true });
        this.speciality = page.getByText('❤️Cardiology Specializzation');
        this.searchbtn = page.getByRole('button', { name: 'Search Doctors (1 selected)' });
        this.bookAppointmen = page.getByRole('button', { name: 'Book Appointment' });
        this.videoappt = page.getByRole('button', { name: 'Video Consultation ₹2 Pay' });
        this.selectdate = page.locator('button:not([disabled])').filter({ hasText: /^\d{1,2}:\d{2} (AM|PM)$/ }).first();
        this.confirmbtn = page.getByRole('button', { name: 'Confirm Appointment' });
        this.description = page.getByRole('textbox', { name: 'Briefly describe your symptoms or reason for the visit (minimum 10 characters)...' });
        this.payandbookbtn = page.getByRole('button', { name: 'Pay & Book - ₹' });
        this.confirmappointmentbtn = page.getByRole('button', { name: 'Book Appointment - ₹' });
        this.back=page.getByRole('button').filter({ hasText: /^$/ });

        this.familymenu = page.getByRole('button', { name: '👨‍👩‍👧‍👦 Family Members' });
        this.addfamilymemberbtn = page.getByRole('button', { name: 'Add Family Member' });
        this.name = page.getByRole('textbox', { name: 'Enter first name' });
        this.lname = page.getByRole('textbox', { name: 'Enter last name' })
        this.gender = page.getByRole('combobox').filter({ hasText: 'Select relation' });
        this.genderoption = page.getByRole('option', { name: 'Son' });
        this.dob = page.locator('form input[type="date"]').first();
        this.relation = page.getByRole('combobox', { name: 'Relation' });
        this.relationoption = page.getByRole('option', { name: 'Mother' });
        this.ph = page.getByRole('textbox', { name: '-digit phone number' });
        this.email = page.getByRole('textbox', { name: 'email@example.com' });
        this.checkbox = page.getByRole('checkbox', { name: 'Mark as emergency contact' });
        this.savebtn = page.locator('button', { hasText: 'Add Member' });
        this.firstNameValidationMsg = page.getByText('First Name is required (minimum 2 characters)');

        this.labreportsmenu = page.getByRole('navigation').getByRole('button', { name: '🧪 Lab Reports' })
        this.labreportsbtn = page.getByRole('button', { name: '📤 Upload Lab Report' });
        // this.labreportfile=page.locator('label').filter({ hasText: '📤Click to upload PDF or Image' });
        this.labreportfile = page.getByText('📤Click to upload PDF or');
        this.ss = page.getByRole('combobox').nth(1);
        this.labreportname = page.getByRole('textbox', { name: 'Report Name' });
        this.labreportdate = page.locator('input[type="date"]');
        this.labreportdescription = page.getByRole('textbox', { name: 'e.g., Apollo Diagnostics,' });
        this.labreportsavebtn = page.getByRole('button', { name: 'Upload Report' });

        this.review = page.getByRole('button', { name: '⭐ Doctor Reviews' });
        this.writereview = page.getByRole('button', { name: '✍️ Write a Review' });
        this.apptselection = page.getByRole('combobox').filter({ hasText: 'Select an appointment to' });
        this.appselectionvalue = page.locator('[role="option"]');
        this.star = page.getByRole('button', { name: '⭐' });
        this.desc = page.getByRole('textbox', { name: 'Share your experience with' });
        this.descriptiontest = page.getByRole('textbox', { name: 'Share your experience with' });
        this.submitreview = page.getByRole('button', { name: 'Submit Review' });

        this.medicalRecordsmenu = page.getByRole('button', { name: '📋 Medical Records ❯' });
        this.allRecordsbtn = page.getByRole('button', { name: '📋 All Records' });
        this.pdff = page.getByRole('button', { name: '📄' }).nth(1);


        this.Documentsbtn = page.getByRole('button', { name: '📄 Documents' });
        this.UploadDocumentbtn = page.getByRole('button', { name: '+ Upload Document' });
        this.ChooseFilebtn = page.locator('input[type="file"]');
        this.DocumentType = page.locator('select');
        this.DocumentDescription = page.getByRole('textbox', { name: 'Add a description for this' });
        this.Uploadbbtn = page.getByRole('button', { name: 'Upload Document', exact: true });
        this.cancelbtn = page.getByRole('button', { name: '×' });
        this.cancelXbtn = page.getByRole('button', { name: 'Close modal' });
        this.downloadbtn = page.locator("//button[@title='Download']").first();
        this.deletebtn = page.locator("//button[@title='Delete']").first();
        this.billingmenu = page.locator('span.nav-item-label:has-text("Billing")');
        this.mybillingsubmenu = page.locator('.nav-item-label:has-text("My Billing")');
        this.btnpaynow = page.getByRole('button', { name: '💳' }).first();
        this.payandbookinpopup = page.locator('button').filter({ hasText: /^Pay Now$/ });
        this.downloadpdf = page.getByRole('button', { name: 'Download PDF' });

        this.reschedulebtn = page.getByRole('button', { name: '🔄 Reschedule' });
        this.rescheduledate = page.locator('input[type="date"]').last();
        this.reschudletimettt = page.locator('button:not([disabled])').filter({ hasText: /^\d{1,2}:\d{2}$/ }).first();
        this.rescheduleconfirm = page.getByRole('button', { name: 'Confirm Reschedule' });

        this.dashboardpage = page.getByRole('button', { name: '📊 Dashboard' });
        this.cancelaptbnt = page.getByRole('button', { name: '✕ Cancel' }).nth(1);
        this.cancelreason = page.getByRole('textbox', { name: 'Please provide a reason...' });
        this.cancelconfirmbtn = page.getByText('Keep AppointmentCancel');

        this.inpersonappt = page.getByRole('button', { name: 'In-Person Visit ₹' });
        this.slotbtn = page.locator('button:not([disabled])').filter({ hasText: /^\d{1,2}:\d{2} (AM|PM)$/ }).first();
        this.dashboardbtn = page.getByRole('button', { name: 'Go to Dashboard' });

        // Search Doctors
        this.enableNotificationsbtn = page.getByRole('button', { name: 'Enable Notifications' });
        this.searchDoctorsbtn = page.getByRole('button', { name: '🔍 Search Doctors' });
        this.hospitalNameInput = page.getByRole('textbox', { name: 'Hospital name...' });
        this.departmentInput = page.getByRole('textbox', { name: 'Department / Category...' });
        this.vkVabKiranResult = page.locator('div').filter({ hasText: 'VKVab KiranCardiology' }).nth(3);
        this.specialityDropdown = page.getByRole('combobox');
        this.cardiologyOption = page.getByRole('option', { name: 'Cardiology Specializzation' });
        this.bhaskarDoctorResult = page.getByRole('button', { name: 'View Profile' });
        this.clearSearchIconbtn = page.getByRole('button').filter({ hasText: /^$/ });
        this.doctorNameInput = page.getByRole('textbox', { name: 'Doctor name...' });
        this.doctorProfileDiv = page.locator('div').filter({ hasText: /^Doctor Profile$/ });

        // My Appointments
        this.appointmentsMenubtn = page.getByRole('button', { name: '📅 Appointments ❯' });
        this.myAppointmentsbtn = page.getByRole('button', { name: '📋 My Appointments' });
        this.apptSearchInput = page.getByRole('textbox', { name: 'Search doctor, hospital, type' });
        this.clearSearchbtn = page.getByRole('button', { name: 'Clear search' });
        this.noAppointmentsText = page.getByText('📅No appointments match your');
        this.page2btn = page.getByRole('button', { name: '2', exact: true });
        this.nextPagebtn = page.getByRole('button', { name: 'Next page' });
        this.previousPagebtn = page.getByRole('button', { name: 'Previous page' });

        // Upcoming Appointments
        this.upcomingbtn = page.getByRole('button', { name: '🔜 Upcoming' });
        this.showFiltersbtn = page.getByRole('button', { name: 'Show Filters ▼' });
        this.upcomingSearchInput = page.getByRole('textbox', { name: 'Search by doctor name or' });
        this.upcomingDateFrom = page.getByRole('textbox').nth(1);
        this.upcomingDateTo = page.getByRole('textbox').nth(2);
        this.resetFiltersbtn = page.getByRole('button', { name: 'Reset Filters' });
        this.allTypesDropdown = page.getByText('All Types');
        this.inPersonOption = page.getByRole('option', { name: 'In-Person' });
        this.inPersonDropdown = page.getByRole('combobox').filter({ hasText: 'In-Person' });
        this.videoCallOption = page.getByRole('option', { name: 'Video Call' });
        this.allDoctorsDropdown = page.getByRole('combobox').filter({ hasText: 'All Doctors' });
        this.bhaskarDoctorOption = page.getByRole('option', { name: 'Bhaskar Ainala K' });

        // History Appointments
        this.historybtn = page.getByRole('button', { name: '📜 History' });
        this.historySearchInput = page.getByRole('textbox', { name: 'Search by doctor, reason, or' });
        this.allStatusDropdown = page.getByText('All Status');
        this.cancelledOption = page.getByRole('option', { name: 'Cancelled' });
        this.noShowOption = page.getByRole('option', { name: 'No Show' });
        this.allStatusOption = page.getByRole('option', { name: 'All Status' });
        this.inPersonHistoryOption = page.getByRole('option', { name: 'In-Person' });
        this.videoOption = page.getByRole('option', { name: 'Video' });
        this.filterTypeSvg = page.locator('.wc-filter-panel-fields > div:nth-child(3) > div > div > svg');
        this.allTypesOption = page.getByRole('option', { name: 'All Types' });
        this.historyDateFrom = page.getByRole('textbox').nth(1);
        this.historyDateTo = page.getByRole('textbox').nth(2);
        this.amithaSaiOption = page.getByRole('option', { name: 'Amitha Sai' });
        this.allDoctorsOption = page.getByRole('option', { name: 'All Doctors' });

        // Health Summary / Visit History
        this.healthSummarybtn = page.getByRole('button', { name: '📊 Health Summary' });
        this.latestVitalSigns = page.getByText('Latest Vital SignsBlood');
        this.visitHistorybtn = page.getByRole('button', { name: '🏥 Visit History' });
        this.visitSearchInput = page.getByRole('textbox', { name: 'Search visits...' });
        this.consultationOption = page.getByRole('option', { name: 'Consultation', exact: true });
        this.consultationCell = page.getByRole('cell', { name: 'Consultation' }).first();
        this.visitDateFrom = page.getByRole('textbox').nth(1);
        this.visitDateTo = page.getByRole('textbox').nth(2);

        // Documents
        this.documentsSearchInput = page.getByRole('textbox', { name: 'Search documents...' });
        this.allDocumentsDropdown = page.getByText('All Documents');
        this.labReportsOption = page.getByRole('option', { name: 'Lab Reports' });
        this.uploadFirstDocumentbtn = page.getByRole('button', { name: 'Upload Your First Document' });
        this.uploadDocumentModal = page.locator('div').filter({ hasText: 'Upload Document×Select File *' }).nth(4);
        this.closeModalXbtn = page.getByRole('button', { name: '×' });
        this.documentTypeDropdown = page.getByRole('combobox');
        this.prescriptionsDocOption = page.getByRole('option', { name: 'Prescriptions' });
        this.noInfoText = page.getByText('💊No Info But Getting Data.');

        // Prescriptions (Medical Records)
        this.prescriptionsbtn = page.getByRole('button', { name: '💊 Prescriptions' });
        this.prescriptionSearchInput = page.getByRole('textbox', { name: 'Search prescriptions...' });
        this.verifyrxCell = page.getByRole('cell', { name: 'VERIFYRX.08' });
        this.allPrescriptionsDropdown = page.getByText('All Prescriptions');
        this.completedPrescOption = page.getByRole('option', { name: 'Completed' });
        this.activePrescOption = page.getByRole('option', { name: 'Active' });
        this.expiredOption = page.getByRole('option', { name: 'Expired' });
        this.noPrescriptionsText = page.getByText('No prescriptions match your');
        this.prescFilterSvg = page.locator('.wc-filter-field > div > div > svg');
        this.allPrescriptionsOption = page.getByRole('option', { name: 'All Prescriptions' });
        this.prescDateFrom = page.getByRole('textbox').nth(1);
        this.prescDateTo = page.getByRole('textbox').nth(2);
        this.perPageDropdown = page.getByRole('combobox').filter({ hasText: '25' });

        // Lab Reports (Medical Records)
        this.labReportsbtn = page.getByRole('button', { name: '🧪 Lab Reports' });
        this.labSearchInput = page.getByRole('textbox', { name: 'Search by report type, doctor' });
        this.labAllStatusDropdown = page.getByRole('combobox').filter({ hasText: 'All Status' });
        this.inProgressOption = page.getByRole('option', { name: 'In Progress' });
        this.noLabReportsText = page.getByText('No lab reports match your');
        this.inProgressText = page.getByText('In Progress');
        this.completedLabOption = page.getByRole('option', { name: 'Completed' });
        this.completedLabText = page.getByText('completed').nth(2);
        this.allLabStatusOption = page.getByRole('option', { name: 'All Status' });
        this.allCategoriesDropdown = page.getByText('All Categories');
        this.bloodTestsOption = page.getByRole('option', { name: 'Blood Tests' });
        this.bloodTestsText = page.getByText('Blood Tests');
        this.urineStoolOption = page.getByRole('option', { name: 'Urine/Stool Tests' });
        this.noLabReportsText2 = page.getByText('No lab reports match your');
        this.urineStoolText = page.getByText('Urine/Stool Tests');
        this.allCategoriesOption = page.getByRole('option', { name: 'All Categories' });
        this.labDateFrom = page.getByRole('textbox').nth(1);
        this.labDateTo = page.getByRole('textbox').nth(2);

        // Billing
        this.billingMenubtn = page.getByRole('button', { name: '💰 Billing ❯' });
        this.myBillingbtn = page.getByRole('button', { name: '📄 My Billing' });
        this.billingFiltersDiv = page.locator('div').filter({ hasText: 'FiltersShow Filters ▼' }).nth(4);
        this.invoiceSearchInput = page.getByRole('textbox', { name: 'Search invoices...' });
        this.verifyinvCell = page.getByRole('cell', { name: 'VERIFYINV-' });
        this.billingFilterSvg = page.locator('.wc-filter-field > div > div > svg');
        this.billingAllStatusDropdown = page.getByRole('combobox').filter({ hasText: 'All Status' });
        this.pendingBillingOption = page.getByRole('option', { name: 'Pending' });
        this.pendingBillingDropdown = page.getByRole('combobox').filter({ hasText: 'Pending' });
        this.allBillingStatusOption = page.getByRole('option', { name: 'All Status' });
        this.billingDateFrom = page.getByRole('textbox').nth(1);
        this.billingDateTo = page.getByRole('textbox').nth(2);

        // Payment History
        this.paymentHistorybtn = page.getByRole('button', { name: '📜 Payment History' });
        this.paymentSearchInput = page.getByRole('textbox', { name: 'Search payments...' });
        this.paymentAllStatusDropdown = page.getByRole('combobox').filter({ hasText: 'All Status' });
        this.failedOption = page.getByRole('option', { name: 'Failed' });
        this.noPaymentsText = page.getByText('No payments match your search');
        this.pendingPaymentOption = page.getByRole('option', { name: 'Pending' });
        this.pendingPaymentText = page.getByText('Pending').nth(1);
        this.paymentDateFrom = page.getByRole('textbox').nth(1);
        this.paymentDateTo = page.getByRole('textbox').nth(2);
        this.paymentFilterSvg = page.locator('.wc-filter-field > div > div > svg');
        this.pendingPaymentDropdown = page.getByRole('combobox').filter({ hasText: 'Pending' });
        this.allPaymentStatusOption = page.getByRole('option', { name: 'All Status' });

        // Family Members filter
        this.familyMembersbtn = page.getByRole('button', { name: '👨‍👩‍👧‍👦 Family Members' });
        this.familySearchInput = page.getByRole('textbox', { name: 'Search members...' });
        this.allRelationsDropdown = page.getByText('All Relations');
        this.sonOption = page.getByRole('option', { name: 'Son' });
        this.sonText = page.getByText('Son').first();
        this.allRelationsOption = page.getByRole('option', { name: 'All Relations' });
        this.familyDateFrom = page.getByRole('textbox').nth(1);
        this.familyDateTo = page.getByRole('textbox').nth(2);

        // Doctor Reviews filter
        this.doctorReviewsbtn = page.getByRole('button', { name: '⭐ Doctor Reviews' });
        this.reviewSearchInput = page.getByRole('textbox', { name: 'Search reviews...' });
        this.allRatingsDropdown = page.getByRole('combobox').filter({ hasText: 'All Ratings' });
        this.fiveStarsOption = page.getByRole('option', { name: '5 Stars' });
        this.noReviewsText = page.getByText('No reviews match your search');
        this.reviewFilterSvg = page.locator('.wc-filter-field > div > div > svg');
        this.fourStarsOption = page.getByRole('option', { name: '4 Stars' });
        this.fourStarCell = page.getByRole('cell', { name: '⭐ ⭐ ⭐ ⭐ ☆' }).first();
        this.allRatingsOption = page.getByRole('option', { name: 'All Ratings' });
        this.reviewDateFrom = page.getByRole('textbox').nth(1);
        this.reviewDateTo = page.getByRole('textbox').nth(2);

        // Patient Profile edit
        this.patientProfilebtn = page.getByRole('button', { name: '👤 Profile' });
        this.editPatientProfilebtn = page.getByRole('button', { name: '✏️ Edit Profile' });
        this.patientNameInput = page.getByRole('textbox').nth(1);
        this.patientDobInput = page.locator('input[type="date"]');
        this.bloodGroupDropdown = page.getByRole('combobox').filter({ hasText: 'A+' });
        this.oMinusOption = page.getByRole('option', { name: 'O-' });
        this.stateDropdown = page.getByRole('combobox').filter({ hasText: 'Andhra Pradesh' });
        this.pinCodeInput = page.getByRole('textbox', { name: 'Enter PIN code' });
        this.emergencyRelationDropdown = page.getByRole('combobox').filter({ hasText: 'Sibling' });
        this.childOption = page.getByRole('option', { name: 'Child' });
        this.allergiesInput = page.getByRole('textbox', { name: 'None reported' }).first();
        this.insuranceCompanyInput = page.getByRole('textbox', { name: 'Insurance company name' });
        this.policyNumberInput = page.getByRole('textbox', { name: 'Policy number' });
        this.coverageAmountInput = page.getByRole('spinbutton', { name: 'Coverage/eligibility amount' });
    }
    async videobookAppointment(description) {
        await this.bookappointmentbtn.click();
        await this.speciality.click();
        await this.searchbtn.click();
        await this.bookAppointmen.first().click();
        await this.videoappt.click();
        await this.selectdate.click();
        await this.description.fill(description);
        // Capture key_id from Razorpay network request before clicking pay
        const keyIdPromise = new Promise(resolve => {
            this.page.on('request', request => {
                const url = request.url();
                if (url.includes('api.razorpay.com') || url.includes('checkout.razorpay.com')) {
                    try {
                        const key = new URL(url).searchParams.get('key');
                        if (key) resolve(key);
                    } catch (_) { }
                }
            });
        });
        await this.payandbookbtn.click();
        const iframe = this.page.locator('iframe');
        await iframe.waitFor({ state: 'visible' });
        const keyId = await keyIdPromise;
        await iframe.contentFrame().getByTestId('netbanking').click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });
        const page1Promise = this.page.waitForEvent('popup');
        await iframe.contentFrame().getByRole('button', { name: 'ICICI Bank ICICI Bank' }).first().click();
        const page1 = await page1Promise;
        await page1.waitForLoadState();
        await page1.goto(`https://api.razorpay.com/v1/gateway/mocksharp/payment?key_id=${keyId}`);
        await page1.getByRole('button', { name: 'Success' }).click();
        await this.page.getByRole('button', { name: 'Go to Dashboard' }).click();
    }


    async inpersonbookAppointment(description) {
        await this.dashboardpage.click();
        await this.bookappointmentbtn.click();
        await this.speciality.click();
        await this.searchbtn.click();
        await this.bookAppointmen.first().click();
        await this.inpersonappt.click();
        await this.slotbtn.click();
        await this.description.fill(description);
        await this.confirmappointmentbtn.click();
        await this.dashboardbtn.click();
    }



    async addFamilyMember(name, lname, dob, phone, email) {
        await this.familymenu.click();
        await this.addfamilymemberbtn.click();
        await this.name.fill(name);
        await this.lname.fill(lname);
        await this.gender.click();
        await this.genderoption.click();
        await this.dob.fill(dob);
        // await this.relation.click();
        // await this.relationoption.click();
        await this.ph.fill(phone);
        await this.email.fill(email);
        await this.checkbox.click();
        await this.savebtn.click();
    }

    async labReportUpload(filePath, reportDescription) {
        const today = new Date().toISOString().split('T')[0];
        await this.labreportsmenu.click();
        await this.labreportsbtn.click();
        await this.labreportfile.click();
        await this.labreportfile.setInputFiles(filePath);
        await this.ss.click();
        await this.ss.selectOption({ label: 'Lipid Profile' });
        await this.labreportdate.fill(today);
        await this.labreportdescription.fill(reportDescription);
        await this.labreportsavebtn.click();
    }

    async PatientReview() {
        const { description } = generateReviewData();
        await this.review.click();
        await this.writereview.click();
        await this.apptselection.click();
        await this.appselectionvalue.nth(2).click();
        await this.star.nth(4).click();
        await this.desc.click();
        await this.descriptiontest.fill(description);
        await this.submitreview.click();
    }

    async addFamilyMemberWithoutFirstName(lname, dob, phone, email) {
        await this.familymenu.click();
        await this.addfamilymemberbtn.click();
        await this.lname.fill(lname);
        await this.gender.click();
        await this.genderoption.click();
        await this.dob.fill(dob);
        await this.ph.fill(phone);
        await this.email.fill(email);
        await this.checkbox.click();
        await this.savebtn.click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });
        await this.cancelbtn.click();
    }

    async addFamilyMemberWithInvalidPhone(name, lname, dob, phone, email) {
        await this.familymenu.click();
        await this.addfamilymemberbtn.click();
        await this.name.fill(name);
        await this.lname.fill(lname);
        await this.gender.click();
        await this.genderoption.click();
        await this.dob.fill(dob);
        await this.ph.fill(phone);
        await this.email.fill(email);
        await this.savebtn.click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });
        await this.cancelbtn.click();
    }

    async addFamilyMemberWithInvalidEmail(name, lname, dob, phone, email) {
        await this.familymenu.click();
        await this.addfamilymemberbtn.click();
        await this.name.fill(name);
        await this.lname.fill(lname);
        await this.gender.click();
        await this.genderoption.click();
        await this.dob.fill(dob);
        await this.ph.fill(phone);
        await this.email.fill(email);
        await this.savebtn.click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });
        await this.cancelbtn.click();
        
    }

    async addFamilyMemberWithFutureDOB(name, lname, dob, phone, email) {
        await this.familymenu.click();
        await this.addfamilymemberbtn.click();
        await this.name.fill(name);
        await this.lname.fill(lname);
        await this.gender.click();
        await this.genderoption.click();
        await this.dob.fill(dob);
        await this.ph.fill(phone);
        await this.email.fill(email);
        await this.savebtn.click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
              
        });
         await this.cancelbtn.click();
    }

    async labReportUploadWithoutFile(reportDescription) {
        const today = new Date().toISOString().split('T')[0];
        await this.labreportsmenu.click();
        await this.labreportsbtn.click();
        await this.ss.click();
        await this.ss.selectOption({ label: 'Lipid Profile' });
        await this.labreportdate.fill(today);
        await this.labreportdescription.fill(reportDescription);
        await this.labreportsavebtn.click();
        
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });
        // await this.cancelXbtn.click();
    }

    async labReportUploadWithoutReportType(filePath, reportDescription) {
        const today = new Date().toISOString().split('T')[0];
        await this.labreportsmenu.click();
        await this.labreportsbtn.click();
        await this.labreportfile.click();
        await this.labreportfile.setInputFiles(filePath);
        await this.labreportdate.fill(today);
        await this.labreportdescription.fill(reportDescription);
        await this.labreportsavebtn.click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });
    }

    async submitReviewWithoutDescription() {
        await this.review.click();
        await this.writereview.click();
        await this.apptselection.click();
        await this.appselectionvalue.nth(2).click();
        await this.star.nth(4).click();
        await expect(this.submitreview).toBeDisabled();
        await this.cancelXbtn.click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });
    }

    async medicalRecords() {
        await this.medicalRecordsmenu.click();
        await this.allRecordsbtn.click();
        // const page1Promise = this.page.waitForEvent('popup');
        await this.pdff.click();
        // const page1 = await page1Promise;
    }

    async Documents() {
        const { description, type } = generateDocumentData();
        await this.medicalRecordsmenu.click();
        await this.Documentsbtn.click();
        await this.UploadDocumentbtn.click();
        await this.ChooseFilebtn.setInputFiles(DOCUMENT_PATH);
        await this.DocumentType.selectOption(type);
        await this.DocumentDescription.click();
        await this.DocumentDescription.fill(description);
        await this.Uploadbbtn.click();
    }

    async bookAppointmentWithoutDescription() {
        await this.bookappointmentbtn.click();
        await this.speciality.click();
        await this.searchbtn.click();
        await this.bookAppointmen.first().click();
        await this.videoappt.click();
        await this.selectdate.click();
        // Skip description — verify form blocks submission
        await this.payandbookbtn.click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });
    }

    async uploadOversizedDocument() {
        const { description, type } = generateDocumentData();
        await this.medicalRecordsmenu.click();
         await this.medicalRecordsmenu.click();
        await this.Documentsbtn.click();
        await this.UploadDocumentbtn.click();
        await this.ChooseFilebtn.setInputFiles("C:\\Users\\DeepthiKonchada\\Downloads\\image (1).png");
        // await this.DocumentType.selectOption(type);
        await this.DocumentDescription.fill(description);
        await this.Uploadbbtn.click();
    }

    async uploadUnsupportedDocumentType() {
        const { description, type } = generateDocumentData();
        await this.medicalRecordsmenu.click();
         await this.medicalRecordsmenu.click();
        await this.Documentsbtn.click();
        await this.UploadDocumentbtn.click();
        await this.ChooseFilebtn.setInputFiles("C:\\Users\\DeepthiKonchada\\Downloads\\GC_Tracker.xlsx");
        await this.DocumentType.selectOption(type);
        await this.DocumentDescription.fill(description);
        await this.Uploadbbtn.click();
    }

    async uploadDocumentWithoutFile() {
        const { description, type } = generateDocumentData();
        await this.medicalRecordsmenu.click();
        await this.medicalRecordsmenu.click();
        await this.Documentsbtn.click();
        await this.UploadDocumentbtn.click();
        // Skip file selection
        await this.DocumentDescription.fill(description);
        await expect(this.Uploadbbtn).toBeDisabled();
        // await this.cancelbtn.click();
    }

    async uploadDocumentWithoutDescription() {
        const { type } = generateDocumentData();
         await this.medicalRecordsmenu.click();
        await this.medicalRecordsmenu.click();
        await this.Documentsbtn.click();
        await this.UploadDocumentbtn.click();
        await this.ChooseFilebtn.setInputFiles(DOCUMENT_PATH);
        // Skip description
        await this.Uploadbbtn.click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });
    }

    async downloadDocument() {
        await this.medicalRecordsmenu.click();
        await this.medicalRecordsmenu.click();
        await this.Documentsbtn.click();
        await this.downloadbtn.click();
    }

    async deleteDocument() {
        await this.medicalRecordsmenu.click();
        await this.medicalRecordsmenu.click();
        await this.Documentsbtn.click();
        await this.deletebtn.click();
    }

    async billingNavigation() {
        await this.billingmenu.click();
        await this.mybillingsubmenu.click();
        await this.btnpaynow.click();
        await this.payandbookinpopup.click();
        await this.downloadpdf.click();

    }

    async rescheduleAppointment() {
        const { date } = generateRescheduleData();
        await this.reschedulebtn.nth(1).click();
        await this.rescheduledate.fill(date);
        await this.rescheduledate.press('Enter');
        // await this.reschudletimettt.waitFor({ state: 'visible' });
        // await this.reschudletimettt.scrollIntoViewIfNeeded();
        await this.reschudletimettt.click();
        await this.rescheduleconfirm.click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });
    }


    async cancelAppointment() {
        const { reason } = generateCancelData();
        // await this.dashboardpage.click();
        await this.cancelaptbnt.click();
        await this.cancelreason.fill(reason);
        await this.cancelconfirmbtn.click();
           this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });
    }

    // async rescheduleWithoutDate() {
    //      await this.dashboardpage.click()
    //     await this.reschedulebtn.nth(1).click();
    //     // Skip date — verify confirm button is disabled
    //     await expect(this.rescheduleconfirm).toBeDisabled();
    // }

    async cancelAppointmentWithoutReason() {
        // await this.dashboardpage.click();
        await this.cancelaptbnt.click();
        // Skip reason
         await this.cancelconfirmbtn.click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });
       
    }

    async inpersonCheckNoSlotsAvailable() {
        await this.dashboardpage.click();
        await this.bookappointmentbtn.click();
        await this.speciality.click();
        await this.searchbtn.click();
        await this.bookAppointmen.first().click();
        await this.inpersonappt.click();
    }

    async inpersonBookAppointmentWithoutDescription() {
        await this.dashboardpage.click()
        await this.bookappointmentbtn.click();
        await this.speciality.click();
        await this.searchbtn.click();
        await this.bookAppointmen.first().click();
        await this.slotbtn.click();
        // Skip description
         await expect(this.confirmappointmentbtn).toBeDisabled();
        await this.back.click();
        await this.back.first().click();
        await this.back.first().click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });

        });
       
    
}

    async searchDoctors() {
        await this.enableNotificationsbtn.click();
        await this.searchDoctorsbtn.click();
        await this.hospitalNameInput.fill('');
        await this.departmentInput.fill('card');
        await this.vkVabKiranResult.click();
        await this.departmentInput.fill('');
        await this.specialityDropdown.click();
        await this.cardiologyOption.click();
        // await this.bhaskarDoctorResult.click();
        // await this.clearSearchIconbtn.click();
        await this.doctorNameInput.fill('bhas');
        await this.bhaskarDoctorResult.first(). click();
        await this.back.first().click();
         await this.back.first().click();
    }

    async filterMyAppointments() {
        await this.appointmentsMenubtn.click();
        await this.myAppointmentsbtn.click();
        await this.apptSearchInput.fill('bhaskar');
        await this.clearSearchbtn.click();
        await this.apptSearchInput.fill('sita');
        await this.noAppointmentsText.click();
        await this.clearSearchbtn.click();
        await this.page2btn.click();
        await this.nextPagebtn.click();
        await this.previousPagebtn.click();
    }

    async filterUpcomingAppointments() {
        await this.upcomingbtn.click();
        await this.showFiltersbtn.click();
        await this.upcomingSearchInput.fill('bhas');
        await this.clearSearchbtn.click();
        await this.showFiltersbtn.click();
        await this.upcomingDateFrom.fill('2026-09-01');
        await this.upcomingDateTo.fill('2026-09-21');
        await this.resetFiltersbtn.click();
        await this.allTypesDropdown.click();
        await this.inPersonOption.click();
        await this.inPersonDropdown.click();
        await this.videoCallOption.click();
        await this.resetFiltersbtn.click();
        await this.allDoctorsDropdown.click();
        await this.bhaskarDoctorOption.click();
    }

    async filterHistoryAppointments() {
        await this.historybtn.click();
        await this.showFiltersbtn.click();
        await this.historySearchInput.fill('bhaskar');
        await this.clearSearchbtn.click();
        await this.allStatusDropdown.click();
        await this.cancelledOption.click();
        await this.noShowOption.click();
        await this.cancelledOption.click();
        await this.nextPagebtn.click();
        await this.allStatusOption.click();
        await this.inPersonHistoryOption.click();
        await this.videoOption.click();
        await this.filterTypeSvg.click();
        await this.allTypesOption.click();
        await this.historyDateFrom.fill('2026-09-01');
        await this.historyDateTo.fill('2026-09-21');
        await this.allDoctorsDropdown.click();
        await this.amithaSaiOption.click();
        await this.allDoctorsOption.click();
        await this.resetFiltersbtn.click();
    }

    async viewMedicalRecords() {
        await this.medicalRecordsmenu.click();
        await this.allRecordsbtn.click();
        await this.healthSummarybtn.click();
        await this.allRecordsbtn.click();
        await this.healthSummarybtn.click();
        await this.latestVitalSigns.click();
    }

    async filterVisitHistory() {
        await this.visitHistorybtn.click();
        await this.showFiltersbtn.click();
        await this.visitSearchInput.fill('cha');
        await this.clearSearchbtn.click();
        await this.allTypesDropdown.click();
        await this.consultationOption.click();
        await this.consultationCell.click();
        await this.allTypesOption.click();
        await this.visitDateFrom.fill('2026-09-01');
        await this.visitDateTo.fill('2026-09-21');
        await this.resetFiltersbtn.click();
    }

    async filterDocuments() {
        await this.Documentsbtn.click();
        await this.showFiltersbtn.click();
        await this.documentsSearchInput.fill('cut');
        await this.clearSearchbtn.click();
        await this.documentsSearchInput.fill('but');
        await this.clearSearchbtn.click();
        await this.allDocumentsDropdown.click();
        await this.labReportsOption.click();
        await this.uploadFirstDocumentbtn.click();
        await this.uploadDocumentModal.click();
        await this.closeModalXbtn.click();
        await this.documentTypeDropdown.click();
        await this.prescriptionsDocOption.click();
        await this.noInfoText.click();
        await this.resetFiltersbtn.click();
    }

    async filterPrescriptionRecords() {
        await this.prescriptionsbtn.click();
        await this.showFiltersbtn.click();
        await this.prescriptionSearchInput.fill('VERIFYRX.08');
        await this.verifyrxCell.click();
        await this.clearSearchbtn.click();
        await this.allPrescriptionsDropdown.click();
        await this.completedPrescOption.click();
        await this.documentTypeDropdown.click();
        await this.activePrescOption.click();
        await this.expiredOption.click();
        await this.noPrescriptionsText.click();
        await this.prescFilterSvg.click();
        await this.allPrescriptionsOption.click();
        await this.prescDateFrom.fill('2026-09-01');
        await this.prescDateTo.fill('2026-09-21');
        await this.resetFiltersbtn.click();
        await this.perPageDropdown.click();
    }

    async filterLabReports() {
        await this.labReportsbtn.click();
        await this.showFiltersbtn.click();
        await this.labSearchInput.fill('lip');
        await this.clearSearchbtn.click();
        await this.labAllStatusDropdown.click();
        await this.inProgressOption.click();
        await this.noLabReportsText.click();
        await this.inProgressText.click();
        await this.completedLabOption.click();
        await this.completedLabText.click();
        await this.allLabStatusOption.click();
        await this.allCategoriesDropdown.click();
        await this.bloodTestsOption.click();
        await this.bloodTestsText.click();
        await this.urineStoolOption.click();
        await this.noLabReportsText2.click();
        await this.urineStoolText.click();
        await this.allCategoriesOption.click();
        await this.labDateFrom.fill('2026-09-01');
        await this.labDateTo.fill('2026-09-21');
        await this.resetFiltersbtn.click();
    }

    async filterBilling() {
        await this.billingMenubtn.click();
        await this.myBillingbtn.click();
        await this.billingFiltersDiv.click();
        await this.showFiltersbtn.click();
        await this.invoiceSearchInput.fill('verifyinv-113');
        await this.clearSearchbtn.click();
        await this.invoiceSearchInput.fill('verifyinv-113');
        await this.verifyinvCell.click();
        await this.clearSearchbtn.click();
        await this.billingFilterSvg.click();
        await this.billingAllStatusDropdown.click();
        await this.pendingBillingOption.click();
        await this.pendingBillingDropdown.click();
        await this.allBillingStatusOption.click();
        await this.billingDateFrom.fill('2026-09-01');
        await this.billingDateTo.fill('2026-09-15');
        await this.resetFiltersbtn.click();
    }

    async filterPaymentHistory() {
        await this.paymentHistorybtn.click();
        await this.showFiltersbtn.click();
        await this.paymentSearchInput.fill('bhas');
        await this.clearSearchbtn.click();
        await this.paymentAllStatusDropdown.click();
        await this.failedOption.click();
        await this.noPaymentsText.click();
        await this.documentTypeDropdown.click();
        await this.pendingPaymentOption.click();
        await this.pendingPaymentText.click();
        await this.paymentDateFrom.fill('2026-09-01');
        await this.paymentDateTo.fill('2026-09-08');
        await this.paymentFilterSvg.click();
        await this.pendingPaymentDropdown.click();
        await this.allPaymentStatusOption.click();
        await this.resetFiltersbtn.click();
    }

    async filterFamilyMembers() {
        await this.familyMembersbtn.click();
        await this.showFiltersbtn.click();
        await this.familySearchInput.fill('chotu');
        await this.clearSearchbtn.click();
        await this.allRelationsDropdown.click();
        await this.sonOption.click();
        await this.sonText.click();
        await this.allRelationsOption.click();
        await this.familyDateFrom.fill('2026-09-01');
        await this.familyDateTo.fill('2026-09-08');
        await this.resetFiltersbtn.click();
    }

    async filterDoctorReviews() {
        await this.doctorReviewsbtn.click();
        await this.showFiltersbtn.click();
        await this.reviewSearchInput.fill('bhas');
        await this.clearSearchbtn.click();
        await this.allRatingsDropdown.click();
        await this.fiveStarsOption.click();
        await this.noReviewsText.click();
        await this.reviewFilterSvg.click();
        await this.fourStarsOption.click();
        await this.fourStarCell.click();
        await this.reviewFilterSvg.click();
        await this.allRatingsOption.click();
        await this.reviewDateFrom.fill('2026-09-01');
        await this.reviewDateTo.fill('2026-09-21');
        await this.resetFiltersbtn.click();
    }

    async editPatientProfile() {
        await this.patientProfilebtn.click();
        await this.editPatientProfilebtn.click();
        await this.patientNameInput.click();
        await this.patientNameInput.fill('Konchada kk');
        await this.patientDobInput.fill('1998-10-13');
        await this.bloodGroupDropdown.click();
        await this.oMinusOption.click();
        await this.stateDropdown.click();
        await this.pinCodeInput.fill('500022');
        await this.emergencyRelationDropdown.click();
        await this.childOption.click();
        await this.allergiesInput.click();
        await this.insuranceCompanyInput.fill('medihub test');
        await this.policyNumberInput.fill('1234567896');
        await this.coverageAmountInput.fill('189992');
    }


    async searchDoctorsWithNoInput() {
        await this.searchDoctorsbtn.click();
        await this.hospitalNameInput.fill('');
        await this.departmentInput.fill('');
        await this.doctorNameInput.fill('');
        await this.back.first().click();
    }

    async searchDoctorsWithInvalidSpeciality() {
        await this.searchDoctorsbtn.click();
        await this.specialityDropdown.click();
        await this.cardiologyOption.click();
        await this.departmentInput.fill('zzzzinvalid9999');
        await this.back.first().click();
    }

    async searchDoctorsWithEmptyDepartment() {
        await this.searchDoctorsbtn.click();
        await this.departmentInput.fill('');
        await this.doctorNameInput.fill('');
        await this.back.first().click();
    }

    async searchDoctorsWithMaxLengthInput() {
        await this.searchDoctorsbtn.click();
        await this.doctorNameInput.fill('b'.repeat(255));
        await this.back.first().click();
    }


    async searchDoctorsWithMinLengthInput() {
        await this.searchDoctorsbtn.click();
        await this.doctorNameInput.fill('b');
        await this.back.first().click();
    }

    async searchDoctorsDuplicate() {
        await this.searchDoctorsbtn.click();
        await this.doctorNameInput.fill('bhas');
        await this.bhaskarDoctorResult.click();
        await this.searchDoctorsbtn.click();
        await this.doctorNameInput.fill('bhas');
        await this.bhaskarDoctorResult.click();
        await this.back.first().click();
        await this.back.first().click();
    }

    async searchDoctorsWithNetworkFailure() {
        await this.page.route('**/api/**', route => route.abort());
        await this.searchDoctorsbtn.click();
        await this.doctorNameInput.fill('bhas');
        await this.back.first().click();
    }

    async searchDoctorsWithApiFailure() {
        await this.searchDoctorsbtn.click();
        await this.page.route('**/api/**', route => route.abort());
        await this.doctorNameInput.fill('bhas');
        await this.back.first().click();
    }

    async searchDoctorsSessionExpiry() {
        await this.searchDoctorsbtn.click();
        await this.page.context().clearCookies();
        await this.page.goto('https://myappointments.whitecoats.com/');
    }

    async searchDoctorsAndRefresh() {
        await this.searchDoctorsbtn.click();
        await this.doctorNameInput.fill('bhas');
        await this.page.reload();
    }

    async searchDoctorsAndNavigateBack() {
        await this.searchDoctorsbtn.click();
        await this.doctorNameInput.fill('bhas');
        await this.page.goBack();
    }

    async searchDoctorsConcurrent() {
        await this.searchDoctorsbtn.click();
        await Promise.all([
            this.doctorNameInput.fill('bhas'),
            this.departmentInput.fill('card'),
        ]);
    }



    async filterMyAppointmentsEmptySearch() {
        await this.appointmentsMenubtn.click();
        await this.myAppointmentsbtn.click();
        await this.apptSearchInput.fill('');
    }

    async filterMyAppointmentsInvalidSearch() {
        await this.appointmentsMenubtn.click();
        await this.myAppointmentsbtn.click();
        await this.apptSearchInput.fill('zzzzinvalid9999');
        await this.noAppointmentsText.click();
    }

    async filterMyAppointmentsClearOnly() {
        await this.appointmentsMenubtn.click();
        await this.myAppointmentsbtn.click();
        await this.clearSearchbtn.click();
    }

    async filterMyAppointmentsMaxInput() {
        await this.appointmentsMenubtn.click();
        await this.myAppointmentsbtn.click();
        await this.apptSearchInput.fill('b'.repeat(255));
    }

    async filterMyAppointmentsMinInput() {
        await this.appointmentsMenubtn.click();
        await this.myAppointmentsbtn.click();
        await this.apptSearchInput.fill('b');
    }

    async filterMyAppointmentsDuplicate() {
        await this.appointmentsMenubtn.click();
        await this.myAppointmentsbtn.click();
        await this.apptSearchInput.fill('bhaskar');
        await this.clearSearchbtn.click();
        await this.apptSearchInput.fill('bhaskar');
        await this.clearSearchbtn.click();
    }

    async filterMyAppointmentsNetworkFailure() {
        await this.page.route('**/api/**', route => route.abort());
        await this.appointmentsMenubtn.click();
        await this.myAppointmentsbtn.click();
        await this.apptSearchInput.fill('bhaskar');
    }

    async filterMyAppointmentsApiFailure() {
        await this.appointmentsMenubtn.click();
        await this.myAppointmentsbtn.click();
        await this.page.route('**/api/**', route => route.abort());
        await this.apptSearchInput.fill('bhaskar');
    }

    async filterMyAppointmentsSessionExpiry() {
        await this.appointmentsMenubtn.click();
        await this.myAppointmentsbtn.click();
        await this.page.context().clearCookies();
        await this.page.goto('https://myappointments.whitecoats.com/');
    }

    async filterMyAppointmentsAndRefresh() {
        await this.appointmentsMenubtn.click();
        await this.myAppointmentsbtn.click();
        await this.apptSearchInput.fill('bhaskar');
        await this.page.reload();
    }

    async filterMyAppointmentsAndNavigateBack() {
        await this.appointmentsMenubtn.click();
        await this.myAppointmentsbtn.click();
        await this.apptSearchInput.fill('bhaskar');
        await this.page.goBack();
    }

    async filterMyAppointmentsConcurrent() {
        await this.appointmentsMenubtn.click();
        await this.myAppointmentsbtn.click();
        await Promise.all([
            this.apptSearchInput.fill('bhaskar'),
            this.page2btn.click(),
        ]);
    }

    async filterUpcomingAppointmentsEmptySearch() {
        await this.upcomingbtn.click();
        await this.showFiltersbtn.click();
        await this.upcomingSearchInput.fill('');
    }

    async filterUpcomingAppointmentsInvalidSearch() {
        await this.upcomingbtn.click();
        await this.showFiltersbtn.click();
        await this.upcomingSearchInput.fill('zzzzinvalid9999');
    }

    async filterUpcomingAppointmentsClearOnly() {
        await this.upcomingbtn.click();
        await this.showFiltersbtn.click();
        await this.resetFiltersbtn.click();
    }

    async filterUpcomingAppointmentsMaxInput() {
        await this.upcomingbtn.click();
        await this.showFiltersbtn.click();
        await this.upcomingSearchInput.fill('b'.repeat(255));
    }

    async filterUpcomingAppointmentsMinInput() {
        await this.upcomingbtn.click();
        await this.showFiltersbtn.click();
        await this.upcomingSearchInput.fill('b');
    }

    async filterUpcomingAppointmentsDuplicate() {
        await this.upcomingbtn.click();
        await this.showFiltersbtn.click();
        await this.upcomingSearchInput.fill('bhas');
        await this.clearSearchbtn.click();
        await this.upcomingSearchInput.fill('bhas');
        await this.clearSearchbtn.click();
    }

    async filterUpcomingAppointmentsNetworkFailure() {
        await this.page.route('**/api/**', route => route.abort());
        await this.upcomingbtn.click();
        await this.showFiltersbtn.click();
        await this.upcomingSearchInput.fill('bhas');
    }

    async filterUpcomingAppointmentsApiFailure() {
        await this.upcomingbtn.click();
        await this.showFiltersbtn.click();
        await this.page.route('**/api/**', route => route.abort());
        await this.upcomingSearchInput.fill('bhas');
    }

    async filterUpcomingAppointmentsSessionExpiry() {
        await this.upcomingbtn.click();
        await this.showFiltersbtn.click();
        await this.page.context().clearCookies();
        await this.page.goto('https://myappointments.whitecoats.com/');
    }

    async filterUpcomingAppointmentsAndRefresh() {
        await this.upcomingbtn.click();
        await this.showFiltersbtn.click();
        await this.upcomingSearchInput.fill('bhas');
        await this.page.reload();
    }

    async filterUpcomingAppointmentsAndNavigateBack() {
        await this.upcomingbtn.click();
        await this.showFiltersbtn.click();
        await this.upcomingSearchInput.fill('bhas');
        await this.page.goBack();
    }

    async filterUpcomingAppointmentsConcurrent() {
        await this.upcomingbtn.click();
        await this.showFiltersbtn.click();
        await Promise.all([
            this.upcomingSearchInput.fill('bhas'),
            this.allTypesDropdown.click(),
        ]);
    }


    async filterHistoryAppointmentsEmptySearch() {
        await this.historybtn.click();
        await this.showFiltersbtn.click();
        await this.historySearchInput.fill('');
    }

    async filterHistoryAppointmentsInvalidSearch() {
        await this.historybtn.click();
        await this.showFiltersbtn.click();
        await this.historySearchInput.fill('zzzzinvalid9999');
    }

    async filterHistoryAppointmentsClearOnly() {
        await this.historybtn.click();
        await this.showFiltersbtn.click();
        await this.resetFiltersbtn.click();
    }

    async filterHistoryAppointmentsMaxInput() {
        await this.historybtn.click();
        await this.showFiltersbtn.click();
        await this.historySearchInput.fill('b'.repeat(255));
    }

    async filterHistoryAppointmentsMinInput() {
        await this.historybtn.click();
        await this.showFiltersbtn.click();
        await this.historySearchInput.fill('b');
    }

    async filterHistoryAppointmentsDuplicate() {
        await this.historybtn.click();
        await this.showFiltersbtn.click();
        await this.historySearchInput.fill('bhaskar');
        await this.clearSearchbtn.click();
        await this.historySearchInput.fill('bhaskar');
        await this.clearSearchbtn.click();
    }

    async filterHistoryAppointmentsNetworkFailure() {
        await this.page.route('**/api/**', route => route.abort());
        await this.historybtn.click();
        await this.showFiltersbtn.click();
        await this.historySearchInput.fill('bhaskar');
    }

    async filterHistoryAppointmentsApiFailure() {
        await this.historybtn.click();
        await this.showFiltersbtn.click();
        await this.page.route('**/api/**', route => route.abort());
        await this.historySearchInput.fill('bhaskar');
    }

    async filterHistoryAppointmentsSessionExpiry() {
        await this.historybtn.click();
        await this.showFiltersbtn.click();
        await this.page.context().clearCookies();
        await this.page.goto('https://myappointments.whitecoats.com/');
    }

    async filterHistoryAppointmentsAndRefresh() {
        await this.historybtn.click();
        await this.showFiltersbtn.click();
        await this.historySearchInput.fill('bhaskar');
        await this.page.reload();
    }

    async filterHistoryAppointmentsAndNavigateBack() {
        await this.historybtn.click();
        await this.showFiltersbtn.click();
        await this.historySearchInput.fill('bhaskar');
        await this.page.goBack();
    }

    async filterHistoryAppointmentsConcurrent() {
        await this.historybtn.click();
        await this.showFiltersbtn.click();
        await Promise.all([
            this.historySearchInput.fill('bhaskar'),
            this.allStatusDropdown.click(),
        ]);
    }


    async viewMedicalRecordsNoSubSection() {
        await this.medicalRecordsmenu.click();
    }

    async viewMedicalRecordsHealthSummaryEmpty() {
        await this.medicalRecordsmenu.click();
        await this.healthSummarybtn.click();
    }

    async viewMedicalRecordsAllTabs() {
        await this.medicalRecordsmenu.click();
        await this.allRecordsbtn.click();
        await this.healthSummarybtn.click();
        await this.visitHistorybtn.click();
        await this.prescriptionsbtn.click();
        await this.labReportsbtn.click();
        await this.Documentsbtn.click();
    }

    async viewMedicalRecordsFirstOnly() {
        await this.medicalRecordsmenu.click();
        await this.allRecordsbtn.click();
    }

    async viewMedicalRecordsDuplicate() {
        await this.medicalRecordsmenu.click();
        await this.healthSummarybtn.click();
        await this.allRecordsbtn.click();
        await this.healthSummarybtn.click();
    }

    async viewMedicalRecordsNetworkFailure() {
        await this.page.route('**/api/**', route => route.abort());
        await this.medicalRecordsmenu.click();
        await this.allRecordsbtn.click();
    }

    async viewMedicalRecordsApiFailure() {
        await this.medicalRecordsmenu.click();
        await this.page.route('**/api/**', route => route.abort());
        await this.allRecordsbtn.click();
    }

    async viewMedicalRecordsSessionExpiry() {
        await this.medicalRecordsmenu.click();
        await this.allRecordsbtn.click();
        await this.page.context().clearCookies();
        await this.page.goto('https://myappointments.whitecoats.com/');
    }

    async viewMedicalRecordsAndRefresh() {
        await this.medicalRecordsmenu.click();
        await this.allRecordsbtn.click();
        await this.page.reload();
    }

    async viewMedicalRecordsAndNavigateBack() {
        await this.medicalRecordsmenu.click();
        await this.allRecordsbtn.click();
        await this.page.goBack();
    }

    async viewMedicalRecordsConcurrent() {
        await this.medicalRecordsmenu.click();
        await Promise.all([
            this.allRecordsbtn.click(),
            this.healthSummarybtn.click(),
        ]);
    }


    async filterVisitHistoryEmptySearch() {
        await this.visitHistorybtn.click();
        await this.showFiltersbtn.click();
        await this.visitSearchInput.fill('');
    }

    async filterVisitHistoryInvalidSearch() {
        await this.visitHistorybtn.click();
        await this.showFiltersbtn.click();
        await this.visitSearchInput.fill('zzzzinvalid9999');
    }

    async filterVisitHistoryClearOnly() {
        await this.visitHistorybtn.click();
        await this.showFiltersbtn.click();
        await this.resetFiltersbtn.click();
    }

    async filterVisitHistoryMaxInput() {
        await this.visitHistorybtn.click();
        await this.showFiltersbtn.click();
        await this.visitSearchInput.fill('b'.repeat(255));
    }

    async filterVisitHistoryMinInput() {
        await this.visitHistorybtn.click();
        await this.showFiltersbtn.click();
        await this.visitSearchInput.fill('b');
    }

    async filterVisitHistoryDuplicate() {
        await this.visitHistorybtn.click();
        await this.showFiltersbtn.click();
        await this.visitSearchInput.fill('cha');
        await this.clearSearchbtn.click();
        await this.visitSearchInput.fill('cha');
        await this.clearSearchbtn.click();
    }

    async filterVisitHistoryNetworkFailure() {
        await this.page.route('**/api/**', route => route.abort());
        await this.visitHistorybtn.click();
        await this.showFiltersbtn.click();
        await this.visitSearchInput.fill('cha');
    }

    async filterVisitHistoryApiFailure() {
        await this.visitHistorybtn.click();
        await this.showFiltersbtn.click();
        await this.page.route('**/api/**', route => route.abort());
        await this.visitSearchInput.fill('cha');
    }

    async filterVisitHistorySessionExpiry() {
        await this.visitHistorybtn.click();
        await this.showFiltersbtn.click();
        await this.page.context().clearCookies();
        await this.page.goto('https://myappointments.whitecoats.com/');
    }

    async filterVisitHistoryAndRefresh() {
        await this.visitHistorybtn.click();
        await this.showFiltersbtn.click();
        await this.visitSearchInput.fill('cha');
        await this.page.reload();
    }

    async filterVisitHistoryAndNavigateBack() {
        await this.visitHistorybtn.click();
        await this.showFiltersbtn.click();
        await this.visitSearchInput.fill('cha');
        await this.page.goBack();
    }

    async filterVisitHistoryConcurrent() {
        await this.visitHistorybtn.click();
        await this.showFiltersbtn.click();
        await Promise.all([
            this.visitSearchInput.fill('cha'),
            this.allTypesDropdown.click(),
        ]);
    }


    async filterDocumentsEmptySearch() {
        await this.Documentsbtn.click();
        await this.showFiltersbtn.click();
        await this.documentsSearchInput.fill('');
    }

    async filterDocumentsInvalidSearch() {
        await this.Documentsbtn.click();
        await this.showFiltersbtn.click();
        await this.documentsSearchInput.fill('zzzzinvalid9999');
    }

    async filterDocumentsClearOnly() {
        await this.Documentsbtn.click();
        await this.showFiltersbtn.click();
        await this.resetFiltersbtn.click();
    }

    async filterDocumentsMaxInput() {
        await this.Documentsbtn.click();
        await this.showFiltersbtn.click();
        await this.documentsSearchInput.fill('b'.repeat(255));
    }

    async filterDocumentsMinInput() {
        await this.Documentsbtn.click();
        await this.showFiltersbtn.click();
        await this.documentsSearchInput.fill('b');
    }

    async filterDocumentsDuplicate() {
        await this.Documentsbtn.click();
        await this.showFiltersbtn.click();
        await this.documentsSearchInput.fill('cut');
        await this.clearSearchbtn.click();
        await this.documentsSearchInput.fill('cut');
        await this.clearSearchbtn.click();
    }

    async filterDocumentsNetworkFailure() {
        await this.page.route('**/api/**', route => route.abort());
        await this.Documentsbtn.click();
        await this.showFiltersbtn.click();
        await this.documentsSearchInput.fill('cut');
    }

    async filterDocumentsApiFailure() {
        await this.Documentsbtn.click();
        await this.showFiltersbtn.click();
        await this.page.route('**/api/**', route => route.abort());
        await this.documentsSearchInput.fill('cut');
    }

    async filterDocumentsSessionExpiry() {
        await this.Documentsbtn.click();
        await this.showFiltersbtn.click();
        await this.page.context().clearCookies();
        await this.page.goto('https://myappointments.whitecoats.com/');
    }

    async filterDocumentsAndRefresh() {
        await this.Documentsbtn.click();
        await this.showFiltersbtn.click();
        await this.documentsSearchInput.fill('cut');
        await this.page.reload();
    }

    async filterDocumentsAndNavigateBack() {
        await this.Documentsbtn.click();
        await this.showFiltersbtn.click();
        await this.documentsSearchInput.fill('cut');
        await this.page.goBack();
    }

    async filterDocumentsConcurrent() {
        await this.Documentsbtn.click();
        await this.showFiltersbtn.click();
        await Promise.all([
            this.documentsSearchInput.fill('cut'),
            this.allDocumentsDropdown.click(),
        ]);
    }


    async filterPrescriptionRecordsEmptySearch() {
        await this.prescriptionsbtn.click();
        await this.showFiltersbtn.click();
        await this.prescriptionSearchInput.fill('');
    }

    async filterPrescriptionRecordsInvalidSearch() {
        await this.prescriptionsbtn.click();
        await this.showFiltersbtn.click();
        await this.prescriptionSearchInput.fill('zzzzinvalid9999');
        await this.noPrescriptionsText.click();
    }

    async filterPrescriptionRecordsClearOnly() {
        await this.prescriptionsbtn.click();
        await this.showFiltersbtn.click();
        await this.resetFiltersbtn.click();
    }

    async filterPrescriptionRecordsMaxInput() {
        await this.prescriptionsbtn.click();
        await this.showFiltersbtn.click();
        await this.prescriptionSearchInput.fill('b'.repeat(255));
    }

    async filterPrescriptionRecordsMinInput() {
        await this.prescriptionsbtn.click();
        await this.showFiltersbtn.click();
        await this.prescriptionSearchInput.fill('b');
    }

    async filterPrescriptionRecordsDuplicate() {
        await this.prescriptionsbtn.click();
        await this.showFiltersbtn.click();
        await this.prescriptionSearchInput.fill('VERIFYRX.08');
        await this.clearSearchbtn.click();
        await this.prescriptionSearchInput.fill('VERIFYRX.08');
        await this.clearSearchbtn.click();
    }

    async filterPrescriptionRecordsNetworkFailure() {
        await this.page.route('**/api/**', route => route.abort());
        await this.prescriptionsbtn.click();
        await this.showFiltersbtn.click();
        await this.prescriptionSearchInput.fill('VERIFYRX.08');
    }

    async filterPrescriptionRecordsApiFailure() {
        await this.prescriptionsbtn.click();
        await this.showFiltersbtn.click();
        await this.page.route('**/api/**', route => route.abort());
        await this.prescriptionSearchInput.fill('VERIFYRX.08');
    }

    async filterPrescriptionRecordsSessionExpiry() {
        await this.prescriptionsbtn.click();
        await this.showFiltersbtn.click();
        await this.page.context().clearCookies();
        await this.page.goto('https://myappointments.whitecoats.com/');
    }

    async filterPrescriptionRecordsAndRefresh() {
        await this.prescriptionsbtn.click();
        await this.showFiltersbtn.click();
        await this.prescriptionSearchInput.fill('VERIFYRX.08');
        await this.page.reload();
    }

    async filterPrescriptionRecordsAndNavigateBack() {
        await this.prescriptionsbtn.click();
        await this.showFiltersbtn.click();
        await this.prescriptionSearchInput.fill('VERIFYRX.08');
        await this.page.goBack();
    }

    async filterPrescriptionRecordsConcurrent() {
        await this.prescriptionsbtn.click();
        await this.showFiltersbtn.click();
        await Promise.all([
            this.prescriptionSearchInput.fill('VERIFYRX.08'),
            this.allPrescriptionsDropdown.click(),
        ]);
    }


    async filterLabReportsEmptySearch() {
        await this.labReportsbtn.click();
        await this.showFiltersbtn.click();
        await this.labSearchInput.fill('');
    }

    async filterLabReportsInvalidSearch() {
        await this.labReportsbtn.click();
        await this.showFiltersbtn.click();
        await this.labSearchInput.fill('zzzzinvalid9999');
        await this.noLabReportsText.click();
    }

    async filterLabReportsClearOnly() {
        await this.labReportsbtn.click();
        await this.showFiltersbtn.click();
        await this.resetFiltersbtn.click();
    }

    async filterLabReportsMaxInput() {
        await this.labReportsbtn.click();
        await this.showFiltersbtn.click();
        await this.labSearchInput.fill('b'.repeat(255));
    }

    async filterLabReportsMinInput() {
        await this.labReportsbtn.click();
        await this.showFiltersbtn.click();
        await this.labSearchInput.fill('b');
    }

    async filterLabReportsDuplicate() {
        await this.labReportsbtn.click();
        await this.showFiltersbtn.click();
        await this.labSearchInput.fill('lip');
        await this.clearSearchbtn.click();
        await this.labSearchInput.fill('lip');
        await this.clearSearchbtn.click();
    }

    async filterLabReportsNetworkFailure() {
        await this.page.route('**/api/**', route => route.abort());
        await this.labReportsbtn.click();
        await this.showFiltersbtn.click();
        await this.labSearchInput.fill('lip');
    }

    async filterLabReportsApiFailure() {
        await this.labReportsbtn.click();
        await this.showFiltersbtn.click();
        await this.page.route('**/api/**', route => route.abort());
        await this.labSearchInput.fill('lip');
    }

    async filterLabReportsSessionExpiry() {
        await this.labReportsbtn.click();
        await this.showFiltersbtn.click();
        await this.page.context().clearCookies();
        await this.page.goto('https://myappointments.whitecoats.com/');
    }

    async filterLabReportsAndRefresh() {
        await this.labReportsbtn.click();
        await this.showFiltersbtn.click();
        await this.labSearchInput.fill('lip');
        await this.page.reload();
    }

    async filterLabReportsAndNavigateBack() {
        await this.labReportsbtn.click();
        await this.showFiltersbtn.click();
        await this.labSearchInput.fill('lip');
        await this.page.goBack();
    }

    async filterLabReportsConcurrent() {
        await this.labReportsbtn.click();
        await this.showFiltersbtn.click();
        await Promise.all([
            this.labSearchInput.fill('lip'),
            this.labAllStatusDropdown.click(),
        ]);
    }


    async filterPaymentHistoryEmptySearch() {
        await this.paymentHistorybtn.click();
        await this.showFiltersbtn.click();
        await this.paymentSearchInput.fill('');
    }

    async filterPaymentHistoryInvalidSearch() {
        await this.paymentHistorybtn.click();
        await this.showFiltersbtn.click();
        await this.paymentSearchInput.fill('zzzzinvalid9999');
        await this.noPaymentsText.click();
    }

    async filterPaymentHistoryClearOnly() {
        await this.paymentHistorybtn.click();
        await this.showFiltersbtn.click();
        await this.resetFiltersbtn.click();
    }

    async filterPaymentHistoryMaxInput() {
        await this.paymentHistorybtn.click();
        await this.showFiltersbtn.click();
        await this.paymentSearchInput.fill('b'.repeat(255));
    }

    async filterPaymentHistoryMinInput() {
        await this.paymentHistorybtn.click();
        await this.showFiltersbtn.click();
        await this.paymentSearchInput.fill('b');
    }

    async filterPaymentHistoryDuplicate() {
        await this.paymentHistorybtn.click();
        await this.showFiltersbtn.click();
        await this.paymentSearchInput.fill('bhas');
        await this.clearSearchbtn.click();
        await this.paymentSearchInput.fill('bhas');
        await this.clearSearchbtn.click();
    }

    async filterPaymentHistoryNetworkFailure() {
        await this.page.route('**/api/**', route => route.abort());
        await this.paymentHistorybtn.click();
        await this.showFiltersbtn.click();
        await this.paymentSearchInput.fill('bhas');
    }

    async filterPaymentHistoryApiFailure() {
        await this.paymentHistorybtn.click();
        await this.showFiltersbtn.click();
        await this.page.route('**/api/**', route => route.abort());
        await this.paymentSearchInput.fill('bhas');
    }

    async filterPaymentHistorySessionExpiry() {
        await this.paymentHistorybtn.click();
        await this.showFiltersbtn.click();
        await this.page.context().clearCookies();
        await this.page.goto('https://myappointments.whitecoats.com/');
    }

    async filterPaymentHistoryAndRefresh() {
        await this.paymentHistorybtn.click();
        await this.showFiltersbtn.click();
        await this.paymentSearchInput.fill('bhas');
        await this.page.reload();
    }

    async filterPaymentHistoryAndNavigateBack() {
        await this.paymentHistorybtn.click();
        await this.showFiltersbtn.click();
        await this.paymentSearchInput.fill('bhas');
        await this.page.goBack();
    }

    async filterPaymentHistoryConcurrent() {
        await this.paymentHistorybtn.click();
        await this.showFiltersbtn.click();
        await Promise.all([
            this.paymentSearchInput.fill('bhas'),
            this.paymentAllStatusDropdown.click(),
        ]);
    }


    async filterBillingEmptySearch() {
        await this.billingMenubtn.click();
        await this.myBillingbtn.click();
        await this.showFiltersbtn.click();
        await this.invoiceSearchInput.fill('');
    }

    async filterBillingInvalidSearch() {
        await this.billingMenubtn.click();
        await this.myBillingbtn.click();
        await this.showFiltersbtn.click();
        await this.invoiceSearchInput.fill('zzzzinvalid9999');
    }

    async filterBillingClearOnly() {
        await this.billingMenubtn.click();
        await this.myBillingbtn.click();
        await this.showFiltersbtn.click();
        await this.resetFiltersbtn.click();
    }

    async filterBillingMaxInput() {
        await this.billingMenubtn.click();
        await this.myBillingbtn.click();
        await this.showFiltersbtn.click();
        await this.invoiceSearchInput.fill('b'.repeat(255));
    }

    async filterBillingMinInput() {
        await this.billingMenubtn.click();
        await this.myBillingbtn.click();
        await this.showFiltersbtn.click();
        await this.invoiceSearchInput.fill('b');
    }

    async filterBillingDuplicate() {
        await this.billingMenubtn.click();
        await this.myBillingbtn.click();
        await this.showFiltersbtn.click();
        await this.invoiceSearchInput.fill('verifyinv-113');
        await this.clearSearchbtn.click();
        await this.invoiceSearchInput.fill('verifyinv-113');
        await this.clearSearchbtn.click();
    }

    async filterBillingNetworkFailure() {
        await this.page.route('**/api/**', route => route.abort());
        await this.billingMenubtn.click();
        await this.myBillingbtn.click();
        await this.showFiltersbtn.click();
        await this.invoiceSearchInput.fill('verifyinv-113');
    }

    async filterBillingApiFailure() {
        await this.billingMenubtn.click();
        await this.myBillingbtn.click();
        await this.showFiltersbtn.click();
        await this.page.route('**/api/**', route => route.abort());
        await this.invoiceSearchInput.fill('verifyinv-113');
    }

    async filterBillingSessionExpiry() {
        await this.billingMenubtn.click();
        await this.myBillingbtn.click();
        await this.showFiltersbtn.click();
        await this.page.context().clearCookies();
        await this.page.goto('https://myappointments.whitecoats.com/');
    }

    async filterBillingAndRefresh() {
        await this.billingMenubtn.click();
        await this.myBillingbtn.click();
        await this.showFiltersbtn.click();
        await this.invoiceSearchInput.fill('verifyinv-113');
        await this.page.reload();
    }

    async filterBillingAndNavigateBack() {
        await this.billingMenubtn.click();
        await this.myBillingbtn.click();
        await this.showFiltersbtn.click();
        await this.invoiceSearchInput.fill('verifyinv-113');
        await this.page.goBack();
    }

    async filterBillingConcurrent() {
        await this.billingMenubtn.click();
        await this.myBillingbtn.click();
        await this.showFiltersbtn.click();
        await Promise.all([
            this.invoiceSearchInput.fill('verifyinv-113'),
            this.billingAllStatusDropdown.click(),
        ]);
    }


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
}

module.exports = { PatientPage };