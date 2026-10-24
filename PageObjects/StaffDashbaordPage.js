const { expect } = require('@playwright/test');

class StaffDashbaordPage {
    constructor(page) {
        this.page = page;
        this.AddNewPatient = page.getByRole('button', { name: '👥 Patients ❯' });
        this.AllPatients = page.getByRole('button', { name: '📋 All Patients' });
        this.AddPatient = page.getByRole('button', { name: '+ Add Patient' });
        this.FirstName = page.getByRole('textbox', { name: 'Enter first name' });
        this.LastName = page.getByRole('textbox', { name: 'Enter last name' });
        this.Age = page.getByRole('textbox', { name: 'Enter age (1-150)' });
        // this.Gender = page.locator('span:has-text("Select...")');
        this.Gender = page.getByRole('combobox').nth(0);
        this.genderoption = page.getByRole('option', { name: 'Female' });
        this.enableNotificationsbtn = page.getByRole('button', { name: 'Enable Notifications' });

        // this.BloodGroup = page.getByRole('combobox').nth(1);
        this.bloodGroup = page.getByRole('combobox').filter({ hasText: 'Select...' });
        this.bloodgrpoption = page.getByRole('option', { name: 'B-', exact: true })
        this.AadharNumber = page.locator("[placeholder='12-digit Aadhar number']");
        this.Source = page.getByRole('combobox').filter({ hasText: 'Select Source' });
        this.sourceoption = page.getByRole('option', { name: 'Referral-Patient' });
        this.MobileNumber = page.locator("[placeholder='10-digit mobile number']");
        this.Email = page.locator("[placeholder='email@example.com (optional)']");
        this.EmergencyContact = page.locator("[placeholder='Emergency contact name']");
        this.EmergencyContactPhone = page.locator("[placeholder='Phone number']");
        this.Relation = page.getByRole('combobox').filter({ hasText: 'Select Relation' });
        this.relationoption = page.getByRole('option', { name: 'Sibling' });
        this.Reason = page.locator("input[placeholder*='Primary reason for visit']");
        this.Symptoms = page.locator("[placeholder*='Describe symptoms in detail']");
        this.Allergies = page.locator("[placeholder*='e.g., Penicillin, Peanuts, ']");
        this.Medication = page.locator("[placeholder='List current medications']");
        this.checkbox = page.getByRole('checkbox', { name: 'Patient Consent: I confirm' })
        this.savebtn = page.getByRole('button', { name: 'Register Patient', exact: true });

        this.apptMenu = page.getByRole('button', { name: '📅 Appointments ❯' });
        this.bookappt = page.getByRole('button', { name: '➕ Book Appointment' });
        this.search = page.getByRole('textbox', { name: 'Search by name, phone, or' });
        this.searchoption = (text) => page.getByText(text);
        this.next = page.getByRole('button', { name: 'Next: Appointment Details' });
        // this.consultiontype = page.getByRole('combobox').filter({ hasText: 'In-Person Visit' });
        // this.consultiontypeoff = page.getByRole('option', { name: 'Video Consultation' });
        // this.regularoption = page.getByRole('combobox').filter({ hasText: 'Regular' });
        this.department = page.getByRole('combobox').filter({ hasText: 'Select Department' });
        this.departmentOption = page.getByRole('option', { name: 'Cardiology' });
        this.specializationdoctor = page.getByRole('combobox').filter({ hasText: 'All Specializations' });
        this.specializationoption = page.getByRole('option', { name: 'Cardiology Specializzation Testt' });
        this.ddaate = page.locator('input[type="date"]');
        this.fillDate = async (dateStr) => {
            // dateStr must be YYYY-MM-DD
            await page.evaluate((val) => {
                const el = document.querySelector('input[type="date"]');
                if (el) {
                    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
                    nativeInputValueSetter.call(el, val);
                    el.dispatchEvent(new Event('input', { bubbles: true }));
                    el.dispatchEvent(new Event('change', { bubbles: true }));
                }
            }, dateStr);
        };
        this.doctor = page.getByRole('textbox', { name: 'Select or search doctor...' });
        this.doctoroption = page.getByText('Dr. Bhaskar A Ainalaa').nth(0);
        this.time = (dtime) => page.locator('button', { hasText: dtime }).first();
        this.desc = page.getByRole('textbox', { name: 'Brief description of the reason for appointment' });
        this.referral = page.getByText('Is the patient referred by a doctor?');
        this.doctorname = page.getByRole('textbox', { name: 'Doctor\'s name' });
        this.hospitalname = page.getByRole('textbox', { name: 'Hospital name' });
        this.reviewbtn = page.getByRole('button', { name: 'Next: Review' });
        this.proceedbtn = page.getByRole('button', { name: 'Proceed to Payment' });
        this.payment = page.getByRole('button', { name: 'Pay on Visit' });

        this.Reschedulebtn = page.getByRole('button', { name: 'Reschedule' });
        this.resbtn = page.getByRole('button', { name: 'Reschedule', exact: true });
        this.rescheduleslot = page.locator('button:not([disabled])').filter({ hasText: /^\d{2}:\d{2}$/ }).first();
        this.confirmschedule = page.getByRole('button', { name: 'Confirm Reschedule' });

        this.cancel = page.getByRole('button', { name: '❌ Cancel' });
        this.cancelbtn = page.getByText('Cancel');

        this.followup = page.getByRole('button', { name: '🔔 Follow-ups' });
        this.contextmenu = page.getByRole('button').filter({ hasText: /^$/ });
        this.bookaptt = page.getByRole('button', { name: 'Book Appointment', exact: true });
        this.slots = page.locator('button:not([disabled])').filter({ hasText: /^\d{2}:\d{2}$/ }).first();
        this.bookbtn = page.getByRole('button', { name: 'Book Appointment', exact: true });

        this.invoiceMenu = page.getByRole('button', { name: '💰 Billing ❯' });
        this.invoicebtn = page.getByRole('button', { name: '➕ Create Invoice' });
        this.patientname = page.getByRole('textbox', { name: 'Search patient by name, phone' });
        this.patientnameoption = page.getByText('Deepthi K Konchada ');
        this.textbox = page.getByRole('textbox');
        this.servicedesc = page.getByRole('textbox', { name: 'Service description' });
        this.amount = page.getByRole('textbox', { name: '0' });
        this.doc = page.getByText('Select Doctor');
        this.docoptions = page.getByRole('option', { name: 'Dr. Whitecoats Doctor' });
        this.createinvoicebtn = page.locator('button.btn.btn-primary:has-text("Create Invoice")');
        this.createInvoiceBtndis = page.locator('button[disabled]:has-text("Create Invoice")');


        this.allappts = page.getByRole('button', { name: '📋 All Appointments' });
        this.searchtextbox = page.getByRole('textbox', { name: 'Search patient name, phone,' });
        this.customrange = page.getByRole('combobox').filter({ hasText: 'Custom Range' });
        this.customrangeoption = page.getByRole('option', { name: 'All Dates' });
        this.alldocdrpdwn = page.getByRole('combobox').filter({ hasText: 'All Doctors' });
        this.docoption = page.getByRole('option', { name: 'Dr. Bhaskar Ainala' });
        this.pagenation = page.getByRole('button', { name: '2' });
        this.pagenation2 = page.getByRole('button', { name: '3', exact: true });
        this.pagenationnext = page.getByRole('button', { name: 'Next page' });
        this.pagenationprevious = page.getByRole('button', { name: 'Previous page' });

        this.genderdrop = page.getByText('All Genders');
        this.genderdrpoption = page.getByRole('option', { name: 'Female' });
        this.status = page.getByText('All Status');
        this.active = page.getByRole('option', { name: 'Active', exact: true });
        this.bloodgrpdropdwn = page.getByRole('combobox').filter({ hasText: 'All Blood Groups' });
        this.bloodgrpoptiondropdown = page.getByRole('option', { name: 'A+' });
        this.patientSearchBox = page.getByRole('textbox', { name: 'Search by name, phone, email' });
        this.patientListPage2 = page.getByRole('button', { name: '2' });
        this.patientListNext = page.getByRole('button', { name: 'Next page' });
        this.patientListPrev = page.getByRole('button', { name: 'Previous page' });
        this.billingInvoicesBtn = page.getByRole('button', { name: '📄 Billing & Invoices' });
        this.reset = page.getByRole('button', { name: 'Reset Filters' });
        this.searchtextbox_invoice = page.getByRole('textbox', { name: 'Search by invoice number,' });
        this.statusoption_paid = page.getByRole('option', { name: 'Paid', exact: true });
        this.view = page.getByRole('button', { name: 'View' });
        this.printinvoice = page.getByRole('button', { name: 'Print Invoice' });
        this.email = page.getByRole('button', { name: 'Send Email' });
        this.cancelnow = page.getByRole('button', { name: '×' });

        // Edit Patient locators
        this.editBtn = page.getByRole('button', { name: 'Edit' }).first();
        this.editBloodGroupDrop = page.getByText('Select Blood Group');
        this.editBloodGroupBPlus = page.getByRole('option', { name: 'B+', exact: true });
        this.editGenderDrop = page.getByText('Female');
        this.editGenderFemale = page.getByRole('option', { name: 'Female' });
        this.editAbhaNumber = page.getByRole('textbox', { name: '14-digit number' });
        this.editAadharNumber = page.getByRole('textbox', { name: '12-digit number' });
        this.editEmergencyPhone = page.locator('input[type="tel"]').nth(1);
        this.editRelationDrop = page.getByText('Select Relation');
        this.editRelationSibling = page.getByRole('option', { name: 'Sibling' });
        this.editSourceDrop = page.getByRole('combobox').filter({ hasText: 'Select Source' });
        this.editSourceOnline = page.getByRole('option', { name: 'Online-Website' });
        this.editDoctorHospital = page.getByRole('textbox', { name: 'Doctor/Hospital name' });
        this.editSymptomsField = page.locator('div:nth-child(4) > div:nth-child(5) > div:nth-child(2) > input');
        this.updatePatientBtn = page.getByRole('button', { name: 'Update Patient' });

        // View patient / profile
        this.viewicon = page.getByRole('button').filter({ hasText: /^$/ }).nth(2);
        this.viewdetails = page.getByRole('button', { name: 'View Details' });
        this.printBtn = page.getByRole('button', { name: 'Print' });
        this.proffile = page.getByRole('button', { name: '👤 My Profile' });
        this.editprofile = page.getByRole('button', { name: 'Edit Profile' });
        this.agestaff = page.getByRole('textbox', { name: 'Staff member must be at least' });
        this.namestaff = page.locator('input[type="text"]');
        this.savechanges = page.getByRole('button', { name: 'Save Changes' });





    }


    async addPatient(PName, Plname, age, addhar, phnum, email, econtact, eph, syptoms, allergies, medication) {
        await this.enableNotificationsbtn.click();
        await this.AddNewPatient.click();
        await this.AllPatients.click();
        await this.AddPatient.click();
        await this.FirstName.fill(PName);
        await this.LastName.fill(Plname);
        await this.Age.fill(age);
        await this.Gender.first().click();
        await this.genderoption.click();
        await this.bloodGroup.click();
        await this.bloodgrpoption.click();
        await this.AadharNumber.fill(addhar);
        await this.Source.click();
        await this.sourceoption.click();
        await this.MobileNumber.first().fill(phnum);
        await this.Email.fill(email);
        await this.EmergencyContact.fill(econtact);
        await this.EmergencyContactPhone.fill(eph);
        await this.Relation.click();
        await this.relationoption.click();
        await this.Reason.click();
        await this.Symptoms.fill(syptoms);
        await this.Allergies.fill(allergies);
        await this.Medication.fill(medication);
        await this.checkbox.check();
        await this.savebtn.click();



    }

    async bookAppointment(searchText, searchOptionText, date, description, doctorName, hospitalName) {
        await this.enableNotificationsbtn.click();
        await this.apptMenu.click();
        await this.bookappt.click();
        await this.search.fill(searchText);
        await this.searchoption(searchOptionText).first().click();
        await this.next.click();
        await this.department.click();
        await this.departmentOption.click();
        await this.specializationdoctor.click();
        // await this.specializationoption.click();
        await this.fillDate(date);
        await this.doctor.click();
        await this.doctoroption.click();
        await this.page.locator('button:not([disabled])').filter({ hasText: /^\d{2}:\d{2}$/ }).first().click();
        await this.desc.fill(description);
        await this.referral.click();
        await this.doctorname.fill(doctorName);
        await this.hospitalname.fill(hospitalName);
        await this.reviewbtn.click();
        await this.proceedbtn.click();
        await this.page.pause();
        await this.payment.click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });

    }

    async Reschedule() {
        await this.enableNotificationsbtn.click();
        await this.apptMenu.click();
        await this.Reschedulebtn.click();
        await this.resbtn.first().click();
        await this.rescheduleslot.click();
        await this.confirmschedule.click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });
    }

    async rescheduleWithoutSlot() {
        await this.enableNotificationsbtn.click();
        await this.apptMenu.click();
        await this.Reschedulebtn.click();
        await this.resbtn.first().click();
        // intentionally skip slot selection — button should remain disabled
        await expect(this.confirmschedule).toBeDisabled();
    }
    async Cancel() {
         await this.enableNotificationsbtn.click();
        await this.apptMenu.click();
        await this.cancel.click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });

    }

    async Followup() {
         await this.enableNotificationsbtn.click();
        await this.apptMenu.click();
        await this.followup.click();
        await this.contextmenu.first().click();
        await this.bookaptt.click();
        await this.slots.click();
        await this.bookbtn.click();
    }

    async Createinvoice(patientname, date, type, amount) {
         await this.enableNotificationsbtn.click();
        await this.invoiceMenu.click();
        //await this.page.pause();
        await this.invoicebtn.click();
        await this.patientname.fill(patientname);
        await this.patientnameoption.first().click();
        await this.textbox.nth(1).fill(date);
        await this.servicedesc.fill(type);
        await this.amount.fill(amount);
        // await this.doc.click();
        // await this.docoptions.click();
        await this.createinvoicebtn.click();
        // this.page.once('dialog', dialog => {
        //     console.log(`Dialog message: ${dialog.message()}`);
        //     dialog.dismiss().catch(() => { });
        // });


    }
    async addPatientWithoutFirstName(Plname, age, addhar, phnum, email, econtact, eph, syptoms, allergies, medication) {
        await this.enableNotificationsbtn.click();
        await this.AddNewPatient.click();
        await this.AllPatients.click();
        await this.AddPatient.click();
        await this.LastName.fill(Plname);
        await this.Age.fill(age);
        await this.Gender.first().click();
        await this.genderoption.click();
        await this.bloodGroup.click();
        await this.bloodgrpoption.click();
        await this.AadharNumber.fill(addhar);
        await this.Source.click();
        await this.sourceoption.click();
        await this.MobileNumber.fill(phnum);
        await this.Email.fill(email);
        await this.EmergencyContact.fill(econtact);
        await this.EmergencyContactPhone.fill(eph);
        await this.Relation.click();
        await this.relationoption.click();
        await this.Symptoms.fill(syptoms);
        await this.Allergies.fill(allergies);
        await this.Medication.fill(medication);
        await this.checkbox.check();
        await this.savebtn.click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });
    }

    async addPatientWithInvalidPhone(PName, Plname, age, addhar, phnum, email, econtact, eph, syptoms, allergies, medication) {
        await this.enableNotificationsbtn.click();
        await this.AddNewPatient.click();
        await this.AllPatients.click();
        await this.AddPatient.click();
        await this.FirstName.fill(PName);
        await this.LastName.fill(Plname);
        await this.Age.fill(age);
        await this.Gender.first().click();
        await this.genderoption.click();
        await this.bloodGroup.click();
        await this.bloodgrpoption.click();
        await this.AadharNumber.fill(addhar);
        await this.Source.click();
        await this.sourceoption.click();
        await this.MobileNumber.fill(phnum);
        await this.Email.fill(email);
        await this.EmergencyContact.fill(econtact);
        await this.EmergencyContactPhone.fill(eph);
        await this.Relation.click();
        await this.relationoption.click();
        await this.Symptoms.fill(syptoms);
        await this.Allergies.fill(allergies);
        await this.Medication.fill(medication);
        await this.checkbox.check();
        // this.page.once('dialog', dialog => dialog.dismiss().catch(() => {}));
        await this.savebtn.click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });
    }

    async addPatientWithInvalidAadhar(PName, Plname, age, addhar, phnum, email, econtact, eph, syptoms, allergies, medication) {
        await this.enableNotificationsbtn.click();
        await this.AddNewPatient.click();
        await this.AllPatients.click();
        await this.AddPatient.click();
        await this.FirstName.fill(PName);
        await this.LastName.fill(Plname);
        await this.Age.fill(age);
        await this.Gender.first().click();
        await this.genderoption.click();
        await this.bloodGroup.click();
        await this.bloodgrpoption.click();
        await this.AadharNumber.fill(addhar);
        await this.Source.click();
        await this.sourceoption.click();
        await this.MobileNumber.fill(phnum);
        await this.Email.fill(email);
        await this.EmergencyContact.fill(econtact);
        await this.EmergencyContactPhone.fill(eph);
        await this.Relation.click();
        await this.relationoption.click();
        await this.Symptoms.fill(syptoms);
        await this.Allergies.fill(allergies);
        await this.Medication.fill(medication);
        await this.checkbox.check();
        // this.page.once('dialog', dialog => dialog.dismiss().catch(() => {}));
        await this.savebtn.click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });
    }

    async bookAppointmentWithoutDate(searchText, searchOptionText, description, doctorName, hospitalName) {
        await this.enableNotificationsbtn.click();
        await this.apptMenu.click();
        await this.bookappt.click();
        await this.search.fill(searchText);
        await this.searchoption(searchOptionText).click();
        await this.next.click();
        await this.department.click();
        await this.departmentOption.click();
        await this.specializationdoctor.click();
        // await this.specializationoption.click();
        // Skip date selection — verify form blocks submission without a date
        await expect(this.reviewbtn).toBeDisabled();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });
    }

    async bookAppointmentWithoutslots(searchText, searchOptionText, date, description, doctorName, hospitalName) {
        await this.enableNotificationsbtn.click();
        await this.apptMenu.click();
        await this.bookappt.click();
        await this.search.fill(searchText);
        await this.searchoption(searchOptionText).click();
        await this.next.click();
        await this.department.click();
        await this.departmentOption.click();
        await this.specializationdoctor.click();
        // await this.specializationoption.click();
        await this.fillDate(date);
        await this.doctor.click();
        await this.doctoroption.click();
        await expect(this.reviewbtn).toBeDisabled();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });
    }

    async bookAppointmentWithPastDate(searchText, searchOptionText, date, description, doctorName, hospitalName) {
        await this.enableNotificationsbtn.click();
        await this.apptMenu.click();
        await this.bookappt.click();
        await this.search.fill(searchText);
        await this.searchoption(searchOptionText).click();
        await this.next.click();
        await this.department.click();
        await this.departmentOption.click();
        await this.specializationdoctor.click();
        await this.fillDate(date);
        await this.doctor.click();
        await this.doctoroption.click();
        await expect(this.reviewbtn).toBeDisabled();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });
    }

    async createInvoiceWithoutPatient(date, type, amount) {
        await this.invoiceMenu.click();
        await this.invoicebtn.click();
        await this.textbox.nth(1).fill(date);
        await this.servicedesc.fill(type);
        await this.amount.fill(amount);
        // await this.doc.click();
        // await this.docoptions.click();
        // this.page.once('dialog', dialog => dialog.dismiss().catch(() => {}));
        await expect(this.createInvoiceBtndis).toBeDisabled();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });
    }

    async createInvoiceWithoutAmount(patientname, date, type) {
        await this.invoiceMenu.click();
        await this.invoicebtn.click();
        await this.patientname.fill(patientname);
        await this.patientnameoption.first().click();
        await this.textbox.nth(1).fill(date);
        await this.servicedesc.fill(type);
        // await this.doc.click();
        // await this.docoptions.click();
        // this.page.once('dialog', dialog => dialog.dismiss().catch(() => {}));
        await this.createinvoicebtn.click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });
    }

    async SearchPatientApptsPage(searchOptionText) {
        await this.apptMenu.click();
        await this.allappts.click();
        await this.searchtextbox.fill(searchOptionText);
        await this.customrange.click();
        await this.customrangeoption.click();
        await this.alldocdrpdwn.click();
        await this.doctoroption.click();
        await this.pagenation.click();
        await this.pagenation2.click();
        await this.pagenationnext.click();
        await this.pagenationprevious.click();
    }

    // ── SearchPatientApptsPage negative scenario helpers ──

    async apptSearchEmpty() {
        await this.enableNotificationsbtn.click();
        await this.apptMenu.click();
        await this.allappts.click();
        await this.searchtextbox.fill('');
        await this.searchtextbox.press('Enter');
    }

    async apptSearchWhitespace() {
        await this.enableNotificationsbtn.click();
        await this.apptMenu.click();
        await this.allappts.click();
        await this.searchtextbox.fill('   ');
        await this.searchtextbox.press('Enter');
    }

    async apptSearchInvalidData(value) {
        await this.enableNotificationsbtn.click();
        await this.apptMenu.click();
        await this.allappts.click();
        await this.searchtextbox.fill(value);
        await this.searchtextbox.press('Enter');
    }

    async apptSearchMaxLength() {
        await this.enableNotificationsbtn.click();
        await this.apptMenu.click();
        await this.allappts.click();
        await this.searchtextbox.fill('a'.repeat(500));
        await this.searchtextbox.press('Enter');
    }

    async apptSearchMinLength() {
        await this.enableNotificationsbtn.click();
        await this.apptMenu.click();
        await this.allappts.click();
        await this.searchtextbox.fill('a');
        await this.searchtextbox.press('Enter');
    }

    async apptSearchAndRefresh(value) {
        await this.enableNotificationsbtn.click();
        await this.apptMenu.click();
        await this.allappts.click();
        await this.searchtextbox.fill(value);
        await this.page.reload();
    }

    async apptSearchAndNavigateBack(value) {
        await this.enableNotificationsbtn.click();
        await this.apptMenu.click();
        await this.allappts.click();
        await this.searchtextbox.fill(value);
        await this.searchtextbox.press('Enter');
        await this.page.goBack();
    }

    async apptSearchConcurrent(value) {
        await this.enableNotificationsbtn.click();
        await this.apptMenu.click();
        await this.allappts.click();
        await this.searchtextbox.fill(value);
        await Promise.all([
            this.searchtextbox.press('Enter'),
            this.customrange.click(),
        ]);
    }

    async searchWithEmptyValue() {
        await this.enableNotificationsbtn.click();
        await this.apptMenu.click();
        await this.allappts.click();
        await this.searchtextbox.fill('');
        await this.searchtextbox.press('Enter');
    }

    async searchWithWhitespaceOnly() {
        await this.enableNotificationsbtn.click();
        await this.apptMenu.click();
        await this.allappts.click();
        await this.searchtextbox.fill('   ');
        await this.searchtextbox.press('Enter');
    }

    async searchWithInvalidData(value) {
        await this.enableNotificationsbtn.click();
        await this.apptMenu.click();
        await this.allappts.click();
        await this.searchtextbox.fill(value);
        await this.searchtextbox.press('Enter');
    }

    async searchWithMaxLengthInput() {
        await this.enableNotificationsbtn.click();
        await this.apptMenu.click();
        await this.allappts.click();
        await this.searchtextbox.fill('a'.repeat(500));
        await this.searchtextbox.press('Enter');
    }

    async searchWithMinInput() {
        await this.enableNotificationsbtn.click();
        await this.apptMenu.click();
        await this.allappts.click();
        await this.searchtextbox.fill('a');
        await this.searchtextbox.press('Enter');
    }

    async searchAndNavigateBack(value) {
        await this.enableNotificationsbtn.click();
        await this.apptMenu.click();
        await this.allappts.click();
        await this.searchtextbox.fill(value);
        await this.searchtextbox.press('Enter');
        await this.page.goBack();
    }

    async searchAndRefreshPage(value) {
        await this.enableNotificationsbtn.click();
        await this.apptMenu.click();
        await this.allappts.click();
        await this.searchtextbox.fill(value);
        await this.page.reload();
    }

    async searchConcurrentActions(value) {
        await this.enableNotificationsbtn.click();
        await this.apptMenu.click();
        await this.allappts.click();
        await this.searchtextbox.fill(value);
        await Promise.all([
            this.searchtextbox.press('Enter'),
            this.customrange.click(),
        ]);
    }

    async SearchPatientallpatientsPage(searchText) {
        await this.enableNotificationsbtn.click();
        await this.AddNewPatient.click();
        await this.AllPatients.click();
        await this.patientSearchBox.fill(searchText);
        await this.genderdrop.click();
        await this.genderdrpoption.click();
        await this.status.click();
        await this.active.click();
        await this.bloodgrpdropdwn.click();
        await this.bloodgrpoptiondropdown.click();
    }

    async patientListSearchEmpty() {
        await this.enableNotificationsbtn.click();
        await this.AddNewPatient.click();
        await this.AllPatients.click();
        await this.patientSearchBox.fill('');
        await this.patientSearchBox.press('Enter');
    }

    async patientListSearchInvalidData(value) {
        await this.enableNotificationsbtn.click();
        await this.AddNewPatient.click();
        await this.AllPatients.click();
        await this.patientSearchBox.fill(value);
        await this.patientSearchBox.press('Enter');
    }

    async patientListSearchWhitespace() {
        await this.enableNotificationsbtn.click();
        await this.AddNewPatient.click();
        await this.AllPatients.click();
        await this.patientSearchBox.fill('   ');
        await this.patientSearchBox.press('Enter');
    }

    async patientListSearchMaxLength() {
        await this.enableNotificationsbtn.click();
        await this.AddNewPatient.click();
        await this.AllPatients.click();
        await this.patientSearchBox.fill('a'.repeat(500));
        await this.patientSearchBox.press('Enter');
    }

    async patientListSearchMinLength() {
        await this.enableNotificationsbtn.click();
        await this.AddNewPatient.click();
        await this.AllPatients.click();
        await this.patientSearchBox.fill('a');
        await this.patientSearchBox.press('Enter');
    }

    async patientListSearchAndRefresh(value) {
        await this.enableNotificationsbtn.click();
        await this.AddNewPatient.click();
        await this.AllPatients.click();
        await this.patientSearchBox.fill(value);
        await this.page.reload();
    }

    async patientListSearchAndNavigateBack(value) {
        await this.enableNotificationsbtn.click();
        await this.AddNewPatient.click();
        await this.AllPatients.click();
        await this.patientSearchBox.fill(value);
        await this.patientSearchBox.press('Enter');
        await this.page.goBack();
    }

    async patientListSearchConcurrent(value) {
        await this.enableNotificationsbtn.click();
        await this.AddNewPatient.click();
        await this.AllPatients.click();
        await this.patientSearchBox.fill(value);
        await Promise.all([
            this.patientSearchBox.press('Enter'),
            this.genderdrop.click(),
        ]);
    }

    async SearchPatientinvoicePage(searchText) {
        await this.enableNotificationsbtn.click();
        await this.invoiceMenu.click();
        await this.billingInvoicesBtn.click();
        await this.reset.click();
        await this.searchtextbox_invoice.fill(searchText);
        await this.status.click();
        await this.statusoption_paid.click();
        await this.view.first().click();
        const page1Promise = this.page.waitForEvent('popup');
        await this.printinvoice.click();
        await page1Promise;
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
        await this.email.click();
        await this.cancelnow.click();
    }

    async billingInvoiceSearchEmpty() {
        await this.enableNotificationsbtn.click();
        await this.invoiceMenu.click();
        await this.billingInvoicesBtn.click();
        await this.searchtextbox_invoice.fill('');
        await this.searchtextbox_invoice.press('Enter');
    }

    async billingInvoiceSearchInvalidData(value) {
        await this.enableNotificationsbtn.click();
        await this.invoiceMenu.click();
        await this.billingInvoicesBtn.click();
        await this.searchtextbox_invoice.fill(value);
        await this.searchtextbox_invoice.press('Enter');
    }

    async billingInvoiceSearchWhitespace() {
        await this.enableNotificationsbtn.click();
        await this.invoiceMenu.click();
        await this.billingInvoicesBtn.click();
        await this.searchtextbox_invoice.fill('   ');
        await this.searchtextbox_invoice.press('Enter');
    }

    async billingInvoiceSearchMaxLength() {
        await this.enableNotificationsbtn.click();
        await this.invoiceMenu.click();
        await this.billingInvoicesBtn.click();
        await this.searchtextbox_invoice.fill('a'.repeat(500));
        await this.searchtextbox_invoice.press('Enter');
    }

    async billingInvoiceSearchMinLength() {
        await this.enableNotificationsbtn.click();
        await this.invoiceMenu.click();
        await this.billingInvoicesBtn.click();
        await this.searchtextbox_invoice.fill('a');
        await this.searchtextbox_invoice.press('Enter');
    }

    async billingInvoiceSearchAndRefresh(value) {
        await this.enableNotificationsbtn.click();
        await this.invoiceMenu.click();
        await this.billingInvoicesBtn.click();
        await this.searchtextbox_invoice.fill(value);
        await this.page.reload();
    }

    async billingInvoiceSearchAndNavigateBack(value) {
        await this.enableNotificationsbtn.click();
        await this.invoiceMenu.click();
        await this.billingInvoicesBtn.click();
        await this.searchtextbox_invoice.fill(value);
        await this.searchtextbox_invoice.press('Enter');
        await this.page.goBack();
    }

    async billingInvoiceSearchConcurrent(value) {
        await this.enableNotificationsbtn.click();
        await this.invoiceMenu.click();
        await this.billingInvoicesBtn.click();
        await this.searchtextbox_invoice.fill(value);
        await Promise.all([
            this.searchtextbox_invoice.press('Enter'),
            this.status.click(),
        ]);
    }

    async editPatient() {
        await this.enableNotificationsbtn.click();
        await this.AddNewPatient.click();
        await this.AllPatients.click();
        await this.editBtn.click();
        await this.editBloodGroupDrop.click();
        await this.editBloodGroupBPlus.click();
        await this.editGenderDrop.click();
        await this.editGenderFemale.click();
        await this.editAbhaNumber.fill('1234567890123');
        await this.editAadharNumber.fill('1234567890123');
        await this.editEmergencyPhone.fill('8186801168');
        await this.editRelationDrop.click();
        await this.editRelationSibling.click();
        await this.editSourceDrop.click();
        await this.editSourceOnline.click();
        await this.editDoctorHospital.fill('deepthi');
        await this.editSymptomsField.fill('fever');
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
        await this.updatePatientBtn.click();
    }

    async EditProfilescreen() {
        await this.enableNotificationsbtn.click();
        await this.proffile.click();
        await this.editprofile.click();
        await this.agestaff.fill('2008-05-18');
        await this.namestaff.fill('Deepthi konchada');
        await this.savechanges.click();
    }

    // ── editPatient negative scenario helpers ──

    async editPatientWithInvalidAbha(abhaValue) {
        await this.enableNotificationsbtn.click();
        await this.AddNewPatient.click();
        await this.AllPatients.click();
        await this.editBtn.click();
        await this.editAbhaNumber.clear();
        await this.editAbhaNumber.fill(abhaValue);
        await this.updatePatientBtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async editPatientWithInvalidAadhar(aadharValue) {
        await this.enableNotificationsbtn.click();
        await this.AddNewPatient.click();
        await this.AllPatients.click();
        await this.editBtn.click();
        await this.editAadharNumber.clear();
        await this.editAadharNumber.fill(aadharValue);
        await this.updatePatientBtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async editPatientWithInvalidPhone(phoneValue) {
        await this.enableNotificationsbtn.click();
        await this.AddNewPatient.click();
        await this.AllPatients.click();
        await this.editBtn.click();
        await this.editEmergencyPhone.clear();
        await this.editEmergencyPhone.fill(phoneValue);
        await this.updatePatientBtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async editPatientWithEmptyDoctorName() {
        await this.enableNotificationsbtn.click();
        await this.AddNewPatient.click();
        await this.AllPatients.click();
        await this.editBtn.click();
        await this.editDoctorHospital.clear();
        await this.updatePatientBtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async editPatientWithMaxLengthSymptoms() {
        await this.enableNotificationsbtn.click();
        await this.AddNewPatient.click();
        await this.AllPatients.click();
        await this.editBtn.click();
        await this.editSymptomsField.fill('a'.repeat(1000));
        await this.updatePatientBtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async editPatientWithMinLengthSymptoms() {
        await this.enableNotificationsbtn.click();
        await this.AddNewPatient.click();
        await this.AllPatients.click();
        await this.editBtn.click();
        await this.editSymptomsField.fill('a');
        await this.updatePatientBtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async editPatientAndRefresh() {
        await this.enableNotificationsbtn.click();
        await this.AddNewPatient.click();
        await this.AllPatients.click();
        await this.editBtn.click();
        await this.editDoctorHospital.fill('test');
        await this.page.reload();
    }

    async editPatientAndNavigateBack() {
        await this.enableNotificationsbtn.click();
        await this.AddNewPatient.click();
        await this.AllPatients.click();
        await this.editBtn.click();
        await this.editDoctorHospital.fill('test');
        await this.page.goBack();
    }

    async editPatientConcurrentSave() {
        await this.enableNotificationsbtn.click();
        await this.AddNewPatient.click();
        await this.AllPatients.click();
        await this.editBtn.click();
        await this.editDoctorHospital.fill('test');
        await Promise.all([
            this.updatePatientBtn.click(),
            this.updatePatientBtn.click(),
        ]);
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    // ── EditProfile negative scenario helpers ──

    async editProfileWithInvalidAge(ageValue) {
        await this.enableNotificationsbtn.click();
        await this.proffile.click();
        await this.editprofile.click();
        await this.agestaff.clear();
        await this.agestaff.fill(ageValue);
        await this.savechanges.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async editProfileWithEmptyName() {
        await this.enableNotificationsbtn.click();
        await this.proffile.click();
        await this.editprofile.click();
        await this.namestaff.clear();
        await this.savechanges.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async editProfileWithMaxLengthName() {
        await this.enableNotificationsbtn.click();
        await this.proffile.click();
        await this.editprofile.click();
        await this.namestaff.clear();
        await this.namestaff.fill('a'.repeat(500));
        await this.savechanges.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async editProfileWithMinLengthName() {
        await this.enableNotificationsbtn.click();
        await this.proffile.click();
        await this.editprofile.click();
        await this.namestaff.clear();
        await this.namestaff.fill('a');
        await this.savechanges.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async editProfileAndRefresh() {
        await this.enableNotificationsbtn.click();
        await this.proffile.click();
        await this.editprofile.click();
        await this.namestaff.fill('Test Name');
        await this.page.reload();
    }

    async editProfileAndNavigateBack() {
        await this.enableNotificationsbtn.click();
        await this.proffile.click();
        await this.editprofile.click();
        await this.namestaff.fill('Test Name');
        await this.page.goBack();
    }

    async editProfileConcurrentSave() {
        await this.enableNotificationsbtn.click();
        await this.proffile.click();
        await this.editprofile.click();
        await this.namestaff.fill('Test Name');
        await Promise.all([
            this.savechanges.click(),
            this.savechanges.click(),
        ]);
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }


}
module.exports = { StaffDashbaordPage };

