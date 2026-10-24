class BranchPortalPage {
    constructor(page) {
        this.page = page;

        // Departments
        this.departmentsBtn = page.getByRole('button', { name: '🏥 Departments' });
        this.deptSearchInput = page.getByRole('textbox', { name: 'Search by name or code...' });

        // Doctors
        this.enableNotificationsbtn = page.getByRole('button', { name: 'Enable Notifications' });
        this.doctorsMenuBtn = page.getByRole('button', { name: '👨‍⚕️ Doctors ❯' });
        this.allDoctorsBtn = page.getByRole('button', { name: '📋 All Doctors' });
        this.addDoctorBtn = page.getByRole('button', { name: '+ Add Doctor' });
        this.doctorFirstNameInput = page.getByRole('textbox', { name: 'e.g., John' });
        this.doctorLastNameInput = page.getByRole('textbox', { name: 'e.g., Smith' });
        this.doctorDobInput = page.getByRole('textbox').nth(3);
        this.selectGenderDropdown = page.getByText('Select Gender');
        this.doctorEmailInput = page.getByRole('textbox', { name: 'doctor@whitecoats.com' });
        this.doctorMobileInput = page.getByRole('textbox', { name: '-digit mobile number' });
        this.doctorRegInput = page.getByRole('textbox', { name: 'Medical Council registration' });
        this.doctorAadharInput = page.getByRole('textbox', { name: '-digit Aadhar number' });
        this.doctorQualificationInput = page.getByRole('textbox', { name: 'e.g., MBBS' });
        this.doctorExperienceInput = page.getByRole('textbox', { name: 'Years of experience' });
        this.selectDepartmentDropdown = page.getByRole('combobox').filter({ hasText: /^Select Department$/ });
        this.selectSpecializationDropdown = page.getByRole('combobox').filter({ hasText: 'Select Specialization' });
        this.doctorInPersonFeeInput = page.getByRole('textbox', { name: 'Fee' });
        this.videoCheckbox = page.getByRole('checkbox', { name: '📹 Video' });
        this.doctorVideoFeeInput = page.getByRole('textbox', { name: 'Fee' }).nth(1);
        this.addDoctorSubmitBtn = page.getByRole('button', { name: 'Add Doctor', exact: true });
        this.cancelBtn = page.getByRole('button', { name: 'Cancel' });

        // Schedules
        this.schedulesBtn = page.getByRole('button', { name: '📅 Schedules' });
        this.createScheduleBtn = page.getByRole('button', { name: '+ Create Schedule' });
        this.scheduleDocSearchInput = page.getByRole('textbox', { name: 'Select or search doctor...' });
        this.scheduleRoomInput = page.getByRole('textbox', { name: 'e.g.,' });
        this.scheduleMonBtn = page.getByRole('button', { name: 'Mon' });
        this.scheduleWedBtn = page.getByRole('button', { name: 'Wed' });
        this.scheduleThuBtn = page.getByRole('button', { name: 'Thu' });
        this.scheduleStartTimeInput = page.locator('input[type="time"]').first();
        this.scheduleEndTimeInput = page.locator('input[type="time"]').nth(1);
        this.scheduleSlotDurationDropdown = page.getByRole('combobox').filter({ hasText: 'minutes' });
        this.scheduleMaxPatientsInput = page.locator('div:nth-child(4) > .form-input');
        this.scheduleTypeDropdown = page.getByRole('combobox').filter({ hasText: '🏥 In-Person Only' });
        this.createScheduleSubmitBtn = page.getByRole('button', { name: 'Create Schedule', exact: true });
        this.scheduleSearchInput = page.getByRole('textbox', { name: 'Search by doctor name, ID, or' });
        this.scheduleAllDoctorsDropdown = page.getByRole('combobox').filter({ hasText: 'All Doctors' });
        this.scheduleAllDaysDropdown = page.getByRole('combobox').filter({ hasText: 'All Days' });
        this.scheduleActiveBtn = page.getByRole('button', { name: 'Active', exact: true });
        this.scheduleAllBtn = page.getByRole('button', { name: 'All', exact: true });

        // Specializations
        this.specializationsBtn = page.getByRole('button', { name: '🎓 Specializations' });
        this.specializationSearchInput = page.getByRole('textbox', { name: 'Search by name or description' });
        this.specializationInactiveBtn = page.getByRole('button', { name: 'Inactive (0)' });
        this.specializationActiveBtn = page.getByRole('button', { name: 'Active (6)' });
        this.specializationDeptDropdown = page.getByRole('combobox');

        // Staff
        this.staffMenuBtn = page.getByRole('button', { name: '👥 Staff Management ❯' });
        this.allStaffBtn = page.getByRole('button', { name: '📋 All Staff' });
        this.addStaffBtn = page.getByRole('button', { name: '➕ Add Staff Member' });
        this.staffFirstNameInput = page.getByRole('textbox', { name: 'e.g., John' });
        this.staffLastNameInput = page.getByRole('textbox', { name: 'e.g., Smith' });
        this.staffDobInput = page.getByRole('textbox').nth(5);
        this.staffGenderDropdown = page.getByRole('combobox').filter({ hasText: 'Select Gender' });
        this.staffBloodGroupDropdown = page.getByRole('combobox').filter({ hasText: 'Select Blood Group' });
        this.staffEmailInput = page.getByRole('textbox', { name: 'staff@email.com' });
        this.staffMobileInput = page.getByRole('textbox', { name: '-digit mobile number' });
        this.staffRoleDropdown = page.getByRole('combobox').filter({ hasText: 'Select Role' });
        this.staffDeptDropdown = page.getByRole('combobox').filter({ hasText: 'Select Department' });
        this.staffShiftDropdown = page.getByRole('combobox').filter({ hasText: 'Select Shift' });
        this.staffJoiningDateInput = page.locator('input[type="date"]').nth(3);
        this.staffSalaryInput = page.locator('input[type="text"]').nth(4);
        this.addStaffSubmitBtn = page.getByRole('button', { name: 'Add Staff', exact: true });

        // Patients
        this.patientsMenuBtn = page.getByRole('button', { name: '👥 Patients ❯' });
        this.allPatientsBtn = page.getByRole('button', { name: '📋 All Patients' });
        this.addPatientBtn = page.getByRole('button', { name: '+ Add Patient' });
        this.patientFirstNameInput = page.getByRole('textbox', { name: 'e.g., John' });
        this.patientLastNameInput = page.getByRole('textbox', { name: 'e.g., Smith' });
        this.patientAgeInput = page.getByRole('textbox', { name: 'e.g., 35' });
        this.patientgadianname=page.locator("[placeholder='Full name of guardian']");
        this.patiengadianphonenumber=page.locator("[placeholder='10-digit mobile number']");
        this.patientgadianrelation=page.getByRole('combobox').filter({ hasText: 'Father' }).first();
        this.check=page.locator("[type='checkbox']");

        this.patientGenderDropdown = page.getByRole('combobox').filter({ hasText: 'Select Gender' });
        this.patientBloodGroupDropdown = page.getByRole('combobox').filter({ hasText: 'Select Blood Group (Optional)' });
        this.patientEmailInput = page.getByRole('textbox', { name: 'patient@email.com' });
        this.patientMobileInput = page.getByRole('textbox', { name: '-digit mobile number' }).first();
        this.patientAadharInput = page.getByRole('textbox', { name: '-digit Aadhar number' });
        this.patientSourceDropdown = page.getByRole('combobox').filter({ hasText: 'Select Source' });
        this.patientEmergencyNameInput = page.getByRole('textbox', { name: 'e.g., Jane Doe' });
        this.patientEmergencyMobileInput = page.getByRole('textbox', { name: '-digit mobile number' }).nth(1);
        this.patientRelationDropdown = page.getByRole('combobox').filter({ hasText: 'Select Relation' });
        this.patientNotesInput = page.getByRole('textbox', { name: 'Describe symptoms or add' });
        this.patientConsentCheckbox = page.getByRole('checkbox', { name: 'Patient Consent: I confirm' });
        this.addPatientSubmitBtn = page.getByRole('button', { name: 'Add Patient', exact: true });

        // Appointments
        this.appointmentsMenuBtn = page.getByRole('button', { name: '📅 Appointments ❯' });
        this.Allappointments = page.getByRole('button', { name: 'All Appointments' });
        this.bookAppointmentBtn = page.getByRole('button', { name: '➕ Book Appointment' });
        this.apptPatientSearchInput = page.getByRole('textbox', { name: 'Search by name, phone, or' });
        this.apptNextDetailsBtn = page.getByRole('button', { name: 'Next: Appointment Details' });
        this.apptTypeDropdown = page.getByRole('combobox').filter({ hasText: 'In-Person Visit' });
        this.apptVisitTypeDropdown = page.getByRole('combobox').filter({ hasText: 'Regular' });
        this.apptDeptDropdown = page.getByRole('combobox').filter({ hasText: 'Select Department' });
        this.apptSpecializationDropdown = page.getByRole('combobox').filter({ hasText: 'All Specializations' });
        this.apptDateInput = page.locator('input[type="date"]');
        this.apptDoctorSearchInput = page.getByRole('textbox', { name: 'Select or search doctor...' });
        this.apptNotesInput = page.getByRole('textbox', { name: 'Brief description of the' });
        this.apptNextReviewBtn = page.getByRole('button', { name: 'Next: Review' });
        this.apptProceedPaymentBtn = page.getByRole('button', { name: 'Proceed to Payment' });
        this.apptSharePaymentLinkBtn = page.getByRole('button', { name: 'Share Payment Link (SMS)' });
        this.apptSearchInput = page.getByRole('textbox', { name: 'Search patient, phone or' });
        this.apptClearSearchBtn = page.getByRole('button', { name: 'Clear search' });
        this.apptAllDoctorsDropdown = page.getByRole('combobox').filter({ hasText: 'All Doctors' });
        this.apptAllDatesDropdown = page.getByRole('combobox').filter({ hasText: 'All Dates' });
        this.apptStartDateInput = page.getByRole('textbox').nth(1);
        this.apptEndDateInput = page.getByRole('textbox').nth(2);
        this.apptAllTypesDropdown = page.getByRole('combobox').filter({ hasText: 'All Types' });

        // Billing - Invoices
        this.billingMenuBtn = page.getByRole('button', { name: '💰 Billing ❯' });
        this.invoicesBtn = page.getByRole('button', { name: '📄 Invoices' });
        this.createInvoiceBtn = page.getByRole('button', { name: '+ Create Invoice' });
        this.invoicePatientSearchInput = page.getByRole('textbox', { name: 'Search patient by name, phone' });
        this.invoiceServiceDescInput = page.getByRole('textbox', { name: 'Service description' });
        this.invoiceQtyInput = page.getByRole('textbox', { name: '1' });
        this.invoicePriceInput = page.getByRole('textbox', { name: '0' });
        this.invoiceDiscountInput = page.locator('input[type="text"]').nth(2);
        this.createInvoiceSubmitBtn = page.locator('.btn-content').filter({ hasText: 'Create Invoice' }).last();
        this.invoiceSearchInput = page.getByRole('textbox', { name: 'Search by invoice number,' });
        this.invoiceClearSearchBtn = page.getByRole('button', { name: 'Clear search' });
        this.invoiceStartDateInput = page.getByRole('textbox').nth(1);
        this.invoiceEndDateInput = page.getByRole('textbox').nth(2);
        this.invoiceClearFiltersBtn = page.getByRole('button', { name: 'Clear Filters' });
        this.invoiceStatusDropdown = page.getByRole('combobox').filter({ hasText: 'All Status' });

        // Billing - Payments
        this.paymentsBtn = page.getByRole('button', { name: '💳 Payments' });
        this.paymentSearchInput = page.getByRole('textbox', { name: 'Search by payment ID, invoice' });
        this.paymentTimeDropdown = page.getByRole('combobox').filter({ hasText: 'All Time' });
        this.paymentMethodDropdown = page.getByRole('combobox').filter({ hasText: 'All Methods' });
        this.paymentStatusDropdown = page.getByRole('combobox').filter({ hasText: 'All Status' });

        // Billing - Ad-hoc Services
        this.adHocServicesBtn = page.getByRole('button', { name: '🧾 Ad-hoc Services' });
        this.addServiceBtn = page.getByRole('button', { name: '➕ Add Service' });
        this.serviceNameInput = page.getByRole('textbox', { name: 'e.g. Monsoon Fever' });
        this.servicePriceInput = page.getByRole('spinbutton').first();
        this.serviceRefPriceInput = page.getByRole('spinbutton', { name: 'Optional reference price' });
        this.serviceQtyInput = page.getByRole('spinbutton').nth(2);
        this.serviceExpiryInput = page.getByRole('textbox').nth(3);
        this.serviceDescTextarea = page.locator('textarea');
        this.serviceReasonInput = page.getByRole('textbox', { name: 'Why this service is being' });
        this.addAndUseInBillBtn = page.getByRole('button', { name: 'Add & Use in Bill' });
        this.serviceSearchInput = page.getByRole('textbox', { name: 'Search by name or code...' });
        this.serviceClearSearchBtn = page.getByRole('button', { name: 'Clear search' });
        this.serviceStatusDropdown = page.getByRole('combobox').filter({ hasText: 'All Statuses' });

        // Billing - Refunds
        this.refundsBtn = page.getByRole('button', { name: '↩️ Refunds' });
        this.refundSearchInput = page.getByRole('textbox', { name: 'Search by refund ID, invoice' });
        this.refundClearSearchBtn = page.getByRole('button', { name: 'Clear search' });
        this.refundStatusDropdown = page.getByRole('combobox').filter({ hasText: 'All Status' });
        this.refundMethodDropdown = page.getByRole('combobox').filter({ hasText: 'All Methods' });
        this.refundStartDateInput = page.getByRole('textbox').nth(1);
        this.refundEndDateInput = page.getByRole('textbox').nth(2);
        this.refundResetFiltersBtn = page.getByRole('button', { name: 'Reset Filters' });

        // Error messages
        this.errorMessages = page.locator('.error, .error-message, [class*="error"], [class*="invalid"], .text-red, .text-danger, .alert-error');
        this.formValidationErrors = page.locator('input:invalid, select:invalid, textarea:invalid');
    }

    async searchDepartment(name) {
        await this.enableNotificationsbtn.click();
        await this.departmentsBtn.click();
        await this.deptSearchInput.fill(name);
        await this.page.getByRole('button', { name: 'Clear search' }).click();
    }

    async addDoctor({ firstName, lastName, dob, gender, email, mobile, regNo, aadhar, qualification, experience, department, specialization, inPersonFee, videoFee }) {
        await this.enableNotificationsbtn.click();
        await this.doctorsMenuBtn.click();
        await this.allDoctorsBtn.click();
        await this.addDoctorBtn.click();
        await this.doctorFirstNameInput.fill(firstName);
        await this.doctorLastNameInput.fill(lastName);
        await this.doctorDobInput.fill(dob);
        await this.selectGenderDropdown.click();
        await this.page.getByRole('option', { name: gender, exact: true }).click();
        await this.doctorEmailInput.fill(email);
        await this.doctorMobileInput.fill(mobile);
        await this.doctorRegInput.fill(regNo);
        await this.doctorAadharInput.fill(aadhar);
        await this.doctorQualificationInput.fill(qualification);
        await this.doctorExperienceInput.fill(experience);
        await this.selectDepartmentDropdown.click();
        await this.page.getByRole('option', { name: department }).click();
        await this.selectSpecializationDropdown.click();
        await this.page.getByRole('option', { name: specialization }).click();
        await this.doctorInPersonFeeInput.fill(inPersonFee);
        await this.videoCheckbox.check();
        await this.doctorVideoFeeInput.fill(videoFee);
        await this.addDoctorSubmitBtn.click();

    }

    async createSchedule({ doctorName, room, startTime, endTime, slotDuration, maxPatients }) {
        await this.enableNotificationsbtn.click();
        await this.doctorsMenuBtn.click();
        await this.schedulesBtn.click();
        await this.createScheduleBtn.click();
        await this.scheduleDocSearchInput.click();
        await this.page.getByText(doctorName).click();
        await this.scheduleRoomInput.fill(room);
        await this.scheduleMonBtn.click();
        await this.scheduleWedBtn.click();
        await this.scheduleThuBtn.click();
        await this.scheduleStartTimeInput.fill(startTime);
        await this.scheduleEndTimeInput.fill(endTime);
        await this.scheduleSlotDurationDropdown.click();
        await this.page.getByRole('option', { name: slotDuration }).click();
        await this.scheduleMaxPatientsInput.fill(maxPatients);
        await this.scheduleTypeDropdown.click();
        await this.page.getByRole('option', { name: '🏥📹 Both (In-Person & Video)' }).click();
        await this.createScheduleSubmitBtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterSchedules({ searchText, doctor, day }) {
        await this.enableNotificationsbtn.click();
        await this.doctorsMenuBtn.click();
        await this.schedulesBtn.click();
        await this.scheduleSearchInput.fill(searchText);
        await this.scheduleAllDoctorsDropdown.click();
        await this.page.getByRole('option', { name: doctor }).first().click();
        await this.page.getByRole('combobox').filter({ hasText: doctor }).click();
        await this.page.getByRole('option', { name: 'All Doctors' }).first().click();
        await this.scheduleAllDaysDropdown.click();
        await this.page.getByRole('option', { name: day }).click();
        await this.page.getByRole('combobox').filter({ hasText: day }).first().click();
        await this.page.getByRole('option', { name: 'All Days' }).click();
        await this.scheduleActiveBtn.click();
        await this.scheduleAllBtn.click();
    }

    async filterSpecializations({ searchText, department }) {

        await this.enableNotificationsbtn.click();
        await this.doctorsMenuBtn.click();
        await this.schedulesBtn.click();
        await this.specializationsBtn.click();
        await this.specializationSearchInput.fill(searchText);
        // await this.page.getByRole('button', { name: 'Clear search' }).click();
        await this.specializationInactiveBtn.click();
        // await this.specializationActiveBtn.click();
        await this.specializationDeptDropdown.click();
        await this.page.getByRole('option', { name: department }).click();
    }

    async addStaff({ firstName, lastName, dob, gender, bloodGroup, email, mobile, role, department, shift, joiningDate, salary }) {
        await this.enableNotificationsbtn.click();
        await this.staffMenuBtn.click();
        await this.allStaffBtn.click();
        await this.addStaffBtn.click();
        await this.staffFirstNameInput.fill(firstName);
        await this.staffLastNameInput.fill(lastName);
        await this.staffDobInput.fill(dob);
        await this.staffGenderDropdown.click();
        await this.page.getByRole('option', { name: gender }).click();
        await this.staffBloodGroupDropdown.click();
        await this.page.getByRole('option', { name: bloodGroup }).click();
        await this.staffEmailInput.fill(email);
        await this.staffMobileInput.fill(mobile);
        await this.staffRoleDropdown.click();
        await this.page.getByRole('option', { name: role }).click();
        await this.staffDeptDropdown.click();
        await this.page.getByRole('option', { name: department }).click();
        await this.staffShiftDropdown.click();
        await this.page.getByRole('option', { name: shift }).click();
        await this.staffJoiningDateInput.fill(joiningDate);
        await this.staffSalaryInput.fill(salary);
        await this.addStaffSubmitBtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async addPatient({ firstName, lastName, age, gender, bloodGroup, email, mobile, aadhar, source, emergencyName, emergencyMobile, relation, notes }) {
        await this.enableNotificationsbtn.click();
        await this.patientsMenuBtn.click();
        await this.allPatientsBtn.click();
        await this.addPatientBtn.click();
        await this.patientFirstNameInput.fill(firstName);
        await this.patientLastNameInput.fill(lastName);
        await this.patientAgeInput.fill(age);
        await this.patientGenderDropdown.click();
        await this.page.getByRole('option', { name: gender }).click();
        await this.patientBloodGroupDropdown.click();
        await this.page.getByRole('option', { name: bloodGroup, exact: true }).click();
        await this.patientEmailInput.fill(email);
        await this.patientMobileInput.fill(mobile);
        await this.patientAadharInput.fill(aadhar);
        await this.patientSourceDropdown.click();
        await this.page.getByRole('option', { name: source }).click();
        await this.patientEmergencyNameInput.fill(emergencyName);
        await this.patientEmergencyMobileInput.fill(emergencyMobile);
        await this.patientRelationDropdown.click();
        await this.page.getByRole('option', { name: relation }).click();
        await this.patientNotesInput.fill(notes);
        await this.patientConsentCheckbox.check();
        await this.addPatientSubmitBtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async bookAppointment({ patientName, patientText, type, visitType, department, specialization, date, doctorName, timeSlot, notes }) {
        await this.enableNotificationsbtn.click();
        await this.appointmentsMenuBtn.click();
        await this.bookAppointmentBtn.click();
        await this.apptPatientSearchInput.fill(patientText);
        await this.page.getByText(patientName).click();
        await this.apptNextDetailsBtn.click();
        await this.apptTypeDropdown.click();
        await this.page.getByRole('option', { name: type }).first().click();
        await this.apptVisitTypeDropdown.click();
        await this.page.getByRole('option', { name: visitType }).first().click();
        await this.apptDeptDropdown.click();
        await this.page.getByRole('option', { name: department }).first().click();
        await this.apptSpecializationDropdown.click();
        await this.page.getByRole('option', { name: specialization }).first().click();
        await this.apptDateInput.fill(date);
        await this.apptDoctorSearchInput.click();
        await this.page.getByText(doctorName).click();
        const preferredSlot = this.page.getByRole('button', { name: timeSlot });
        const isDisabled = await preferredSlot.isDisabled().catch(() => true);
        if (isDisabled) {
            await this.page.locator('button[type="button"]:not([disabled])').filter({ hasText: /^\d{2}:\d{2}$/ }).first().click();
        } else {
            await preferredSlot.click();
        }
        await this.apptNotesInput.fill(notes);
        await this.apptNextReviewBtn.click();
        await this.apptProceedPaymentBtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
        await this.apptSharePaymentLinkBtn.click();
    }

    async filterAppointments({ searchText, doctor, startDate, endDate }) {
        await this.enableNotificationsbtn.click();
        await this.appointmentsMenuBtn.click();
        await this.Allappointments.click();
        await this.apptSearchInput.fill(searchText);
        // await this.apptClearSearchBtn.click();
        await this.apptAllDoctorsDropdown.click();
        await this.page.getByRole('option', { name: doctor }).click();
        await this.page.getByRole('combobox').filter({ hasText: doctor }).click();
        await this.page.getByRole('option', { name: 'All Doctors' }).click();
        await this.apptAllDatesDropdown.click();
        await this.page.getByRole('option', { name: 'Today' }).click();
        await this.page.getByRole('combobox').filter({ hasText: 'Today' }).click();
        await this.page.getByRole('option', { name: 'Custom Range' }).click();
        await this.apptStartDateInput.fill(startDate);
        await this.apptEndDateInput.fill(endDate);
        // await this.page.getByRole('combobox').filter({ hasText: 'Custom Range' }).click();
        // await this.page.getByRole('option', { name: 'All Dates' }).click();
        await this.apptAllTypesDropdown.click();
        await this.page.getByRole('option', { name: 'In-Person' }).click();
        await this.page.getByRole('combobox').filter({ hasText: 'In-Person' }).click();
        await this.page.getByRole('option', { name: 'Video' }).click();
        await this.page.getByRole('combobox').filter({ hasText: 'Video' }).click();
        await this.page.getByRole('option', { name: 'All Types' }).click();
    }

    async createInvoice({ patientText, patientName, serviceDesc, qty, price, discount }) {
        await this.enableNotificationsbtn.click();
        await this.billingMenuBtn.click();
        await this.invoicesBtn.click();
        await this.createInvoiceBtn.click();
        await this.invoicePatientSearchInput.fill(patientText);
        await this.page.getByText(patientName).click();
        await this.invoiceServiceDescInput.fill(serviceDesc);
        await this.invoiceQtyInput.fill(qty);
        await this.invoicePriceInput.fill(price);
        await this.invoiceDiscountInput.fill(discount);
        await this.createInvoiceSubmitBtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async filterInvoices({ searchText, startDate, endDate }) {
        await this.enableNotificationsbtn.click();
        await this.billingMenuBtn.click();
        await this.invoicesBtn.click();
        await this.invoiceSearchInput.fill(searchText);
        // await this.invoiceClearSearchBtn.click();
        await this.invoiceStartDateInput.fill(startDate);
        await this.invoiceEndDateInput.fill(endDate);
        await this.invoiceClearFiltersBtn.click();
        await this.invoiceStatusDropdown.click();
        await this.page.getByRole('option', { name: 'Paid' }).click();
       await this.page.getByRole('combobox').filter({ hasText: 'Paid' }).click();
        await this.page.getByRole('option', { name: 'Pending' }).click();
        await this.page.getByRole('combobox').filter({ hasText: 'Pending' }).click();
        await this.page.getByRole('option', { name: 'Overdue' }).click();
        await this.invoiceClearFiltersBtn.click();
    }

    async filterPayments({ searchText }) {
        await this.enableNotificationsbtn.click();
        await this.billingMenuBtn.click();
        await this.paymentsBtn.click();
        await this.paymentSearchInput.fill(searchText);
        await this.paymentTimeDropdown.click();
        await this.page.getByRole('option', { name: 'Last 7 Days' }).click();
        await this.page.getByRole('combobox').filter({ hasText: 'Last 7 Days' }).click();
        await this.page.getByRole('option', { name: 'Today' }).click();
        await this.page.getByRole('combobox').filter({ hasText: 'Today' }).click();
        await this.page.getByRole('option', { name: 'All Time' }).click();
        await this.paymentMethodDropdown.click();
        await this.page.getByRole('option', { name: 'Net Banking' }).click();
        await this.page.getByRole('combobox').filter({ hasText: 'Net Banking' }).click();
        await this.page.getByRole('option', { name: 'UPI' }).click();
        await this.page.getByRole('combobox').filter({ hasText: 'UPI' }).click();
        await this.page.getByRole('option', { name: 'Cash' }).click();
        await this.page.getByRole('combobox').filter({ hasText: 'Cash' }).click();
        await this.page.getByRole('option', { name: 'All Methods' }).click();
        await this.paymentStatusDropdown.click();
        await this.page.getByRole('option', { name: 'Pending' }).click();
        await this.page.getByRole('combobox').filter({ hasText: 'Pending' }).click();
        await this.page.getByRole('option', { name: 'Completed' }).click();
        await this.page.getByRole('combobox').filter({ hasText: 'Completed' }).click();
        await this.page.getByRole('option', { name: 'All Status' }).click();
    }

    async addAdHocService({ name, price, refPrice, qty, expiry, description, reason }) {
        await this.enableNotificationsbtn.click();
        await this.billingMenuBtn.click();
        await this.adHocServicesBtn.click();
        await this.addServiceBtn.click();
        await this.serviceNameInput.fill(name);
        await this.servicePriceInput.fill(price);
        await this.serviceRefPriceInput.fill(refPrice);
        await this.serviceQtyInput.fill(qty);
        await this.serviceExpiryInput.fill(expiry);
        await this.serviceDescTextarea.fill(description);
        await this.serviceReasonInput.fill(reason);
        await this.addAndUseInBillBtn.click();
    }

    async filterAdHocServices({ searchText, status }) {
        await this.enableNotificationsbtn.click();
        await this.billingMenuBtn.click();
         await this.adHocServicesBtn.click();
        await this.serviceSearchInput.fill(searchText);
        await this.serviceClearSearchBtn.click();
        await this.serviceStatusDropdown.click();
        await this.page.getByRole('option', { name: status }).click();
        await this.page.getByRole('combobox').filter({ hasText: status }).click();
        await this.page.getByRole('option', { name: 'Active' }).click();
    }

    async filterRefunds({ searchText, startDate, endDate }) {
        await this.enableNotificationsbtn.click();
        await this.billingMenuBtn.click();
        await this.refundsBtn.click();
        await this.refundSearchInput.fill(searchText);
        // await this.refundClearSearchBtn.click();
        await this.refundStatusDropdown.click();
        await this.page.getByRole('option', { name: 'Approved' }).click();
        await this.page.getByRole('combobox').filter({ hasText: 'Approved' }).click();
        await this.page.getByRole('option', { name: 'Pending' }).click();
        await this.page.getByRole('combobox').filter({ hasText: 'Pending' }).click();
        await this.page.getByRole('option', { name: 'All Status' }).click();
        await this.page.getByRole('combobox').filter({ hasText: 'All Status' }).click();
        await this.page.getByRole('option', { name: 'Processing' }).click();
        await this.page.getByRole('option', { name: 'All Status' }).click();
        await this.refundMethodDropdown.click();
        await this.page.getByRole('option', { name: 'Cash' }).click();
        await this.page.getByRole('combobox').filter({ hasText: 'Cash' }).click();
        await this.page.getByRole('option', { name: 'Original Method' }).click();
        await this.page.getByRole('combobox').filter({ hasText: 'Original Method' }).click();
        await this.page.getByRole('option', { name: 'All Methods' }).click();
        await this.refundStartDateInput.fill(startDate);
        await this.refundEndDateInput.fill(endDate);
        await this.refundResetFiltersBtn.click();
    }
}

module.exports = { BranchPortalPage };
