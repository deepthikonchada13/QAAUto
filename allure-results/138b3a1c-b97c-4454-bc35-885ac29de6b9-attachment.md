# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: StaffDashboard.spec.js >> Staff Dashboard - All Scenarios >> AddPatient | Boundary: age at minimum boundary value 1 is accepted
- Location: tests\StaffDashboard.spec.js:56:3

# Error details

```
Error: locator.click: Error: strict mode violation: getByRole('combobox').filter({ hasText: 'Select Relation' }) resolved to 2 elements:
    1) <div tabindex="0" role="combobox" aria-expanded="false" aria-disabled="false">…</div> aka getByRole('combobox').filter({ hasText: /^Select Relation$/ })
    2) <div tabindex="0" role="combobox" aria-expanded="false" aria-disabled="false">…</div> aka getByRole('combobox').filter({ hasText: 'Select Relationship' })

Call log:
  - waiting for getByRole('combobox').filter({ hasText: 'Select Relation' })

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - complementary [ref=e4]:
    - generic [ref=e5]:
      - img "Sunshine Logo" [ref=e7]
      - button "Toggle sidebar" [ref=e8] [cursor=pointer]: ❮
    - navigation [ref=e9]:
      - generic [ref=e10]:
        - button "📊 Dashboard" [ref=e12] [cursor=pointer]:
          - generic [ref=e13]:
            - generic [ref=e14]: 📊
            - generic [ref=e15]: Dashboard
        - button "✅ Check-In" [ref=e17] [cursor=pointer]:
          - generic [ref=e18]:
            - generic [ref=e19]: ✅
            - generic [ref=e20]: Check-In
        - button "📅 Appointments ❯" [ref=e22] [cursor=pointer]:
          - generic [ref=e23]:
            - generic [ref=e24]: 📅
            - generic [ref=e25]: Appointments
            - generic [ref=e26]: ❯
        - generic [ref=e27]:
          - button "👥 Patients ❯" [ref=e28] [cursor=pointer]:
            - generic [ref=e29]:
              - generic [ref=e30]: 👥
              - generic [ref=e31]: Patients
              - generic [ref=e32]: ❯
          - generic [ref=e33]:
            - button "📋 All Patients" [ref=e35] [cursor=pointer]:
              - generic [ref=e36]:
                - generic [ref=e37]: 📋
                - generic [ref=e38]: All Patients
            - button "➕ Register Patient" [ref=e40] [cursor=pointer]:
              - generic [ref=e41]:
                - generic [ref=e42]: ➕
                - generic [ref=e43]: Register Patient
            - button "🔍 Search" [ref=e45] [cursor=pointer]:
              - generic [ref=e46]:
                - generic [ref=e47]: 🔍
                - generic [ref=e48]: Search
        - button "💰 Billing ❯" [ref=e50] [cursor=pointer]:
          - generic [ref=e51]:
            - generic [ref=e52]: 💰
            - generic [ref=e53]: Billing
            - generic [ref=e54]: ❯
        - button "🎫 Support & Helpdesk ❯" [ref=e56] [cursor=pointer]:
          - generic [ref=e57]:
            - generic [ref=e58]: 🎫
            - generic [ref=e59]: Support & Helpdesk
            - generic [ref=e60]: ❯
        - button "👤 My Profile" [ref=e62] [cursor=pointer]:
          - generic [ref=e63]:
            - generic [ref=e64]: 👤
            - generic [ref=e65]: My Profile
    - generic [ref=e66]:
      - generic "Go to My Profile" [ref=e67] [cursor=pointer]:
        - generic [ref=e68]: SN
        - generic [ref=e69]:
          - generic [ref=e70]: Staff New
          - generic [ref=e71]: Staff
          - generic "New Branch" [ref=e72]: 📍
          - generic [ref=e75]: Active
      - button "🚪" [ref=e77] [cursor=pointer]
  - generic [ref=e78]:
    - banner [ref=e79]:
      - generic [ref=e80]:
        - generic [ref=e82]:
          - heading "Register Patient" [level=1] [ref=e83]
          - generic [ref=e84]:
            - generic [ref=e85]: Staff
            - generic [ref=e86]: ›
            - generic [ref=e87]: Register Patient
        - generic [ref=e88]:
          - button "🔔 2" [ref=e89] [cursor=pointer]:
            - text: 🔔
            - generic [ref=e90]: "2"
          - button "🎫" [ref=e91] [cursor=pointer]
          - generic "Staff New - Click for options" [ref=e92] [cursor=pointer]:
            - generic [ref=e93]: SN
            - generic [ref=e94]:
              - generic [ref=e95]: Staff
              - generic [ref=e96]: staff
    - main [ref=e99]:
      - generic [ref=e100]:
        - generic [ref=e101]:
          - heading "Register New Patient" [level=1] [ref=e102]
          - paragraph [ref=e103]: Add a new patient to the system
        - generic [ref=e105]:
          - generic [ref=e107]:
            - generic [ref=e108]: 🏥
            - generic [ref=e109]:
              - generic [ref=e110]: Registering at Branch
              - generic [ref=e111]: New Branch
          - generic [ref=e112]:
            - heading "Personal Information" [level=3] [ref=e113]
            - generic [ref=e114]:
              - generic [ref=e115]:
                - generic [ref=e116]: First Name *
                - textbox "Enter first name" [ref=e119]: Patgymj
              - generic [ref=e120]:
                - generic [ref=e121]: Last Name *
                - textbox "Enter last name" [ref=e124]: Testxjm
              - generic [ref=e125]:
                - generic [ref=e126]: Age * (years)
                - textbox "Enter age (1-150)" [ref=e129]: "1"
                - generic [ref=e130]: Enter patient's age in years (1-150)
              - generic [ref=e131]:
                - generic [ref=e132]: Gender *
                - combobox [ref=e134] [cursor=pointer]:
                  - generic [ref=e135]: Female
              - generic [ref=e138]:
                - generic [ref=e139]: Blood Group
                - combobox [ref=e141] [cursor=pointer]:
                  - generic [ref=e142]: B-
              - generic [ref=e145]:
                - generic [ref=e146]: Aadhar Number *
                - textbox "12-digit Aadhar number" [ref=e149]: "799191657983"
                - generic [ref=e150]: Mandatory for registration (12/12 digits)
              - generic [ref=e151]:
                - generic [ref=e152]: ABHA ID (ABDM)
                - textbox "14-digit ABHA number" [ref=e155]
                - generic [ref=e156]: Ayushman Bharat Health Account (optional)
          - generic [ref=e157]:
            - heading "Source Information" [level=3] [ref=e158]
            - generic [ref=e159]:
              - generic [ref=e160]:
                - generic [ref=e161]: How did patient find us? *
                - combobox [ref=e163] [cursor=pointer]:
                  - generic [ref=e164]: Referral-Patient
              - generic [ref=e167]:
                - generic [ref=e168]: Referral Details
                - textbox "Doctor/Hospital/Patient name" [ref=e171]
          - generic [ref=e172]:
            - heading "Patient Identification" [level=3] [ref=e173]
            - generic [ref=e174]:
              - generic [ref=e175]: UHID (Unique Health ID)
              - generic [ref=e176]: A unique Patient ID will be auto-generated on registration to ensure uniqueness.
          - generic [ref=e178]:
            - heading "Contact Information" [level=3] [ref=e179]
            - generic [ref=e180]:
              - generic [ref=e181]:
                - generic [ref=e182]: Phone *
                - textbox "10-digit mobile number" [ref=e185]: "9827901032"
                - generic [ref=e186]:
                  - generic [ref=e187]: ✓
                  - generic [ref=e188]: New patient - ready to register
              - generic [ref=e189]:
                - generic [ref=e190]: Email
                - textbox "email@example.com (optional)" [ref=e193]: patgymj.testxjm@testmail.com
                - generic [ref=e194]: If provided, a patient portal account will be created and login credentials sent via email.
              - generic [ref=e195]:
                - generic [ref=e196]: Address
                - textbox "Street address" [ref=e199]
              - generic [ref=e200]:
                - generic [ref=e201]: State
                - combobox [ref=e203] [cursor=pointer]:
                  - generic [ref=e204]: Select State
              - generic [ref=e207]:
                - generic [ref=e208]: City / District
                - textbox "Select a State first" [disabled] [ref=e211]
              - generic [ref=e212]:
                - generic [ref=e213]: Zip Code
                - textbox "Zip/PIN Code" [ref=e216]
          - generic [ref=e217]:
            - heading "Emergency Contact" [level=3] [ref=e218]
            - generic [ref=e219]:
              - generic [ref=e220]:
                - generic [ref=e221]: Contact Name *
                - textbox "Emergency contact name" [ref=e224]: EC13cx
              - generic [ref=e225]:
                - generic [ref=e226]: Contact Phone *
                - textbox "Phone number" [active] [ref=e229]: "8281077054"
              - generic [ref=e230]:
                - generic [ref=e231]: Relationship *
                - combobox [ref=e233] [cursor=pointer]:
                  - generic [ref=e234]: Select Relation
          - generic [ref=e237]:
            - heading "Reason for Visit" [level=3] [ref=e238]
            - generic [ref=e239]:
              - generic [ref=e240]:
                - generic [ref=e241]: Chief Complaint
                - textbox "Primary reason for visit (e.g., Fever, Back pain, Routine checkup)" [ref=e244]
              - generic [ref=e245]:
                - generic [ref=e246]: Symptoms / Notes
                - textbox "Describe symptoms in detail - duration, severity, any triggers..." [ref=e247]
                - generic [ref=e248]: 0/2000 characters
          - generic [ref=e249]:
            - heading "Medical Information" [level=3] [ref=e250]
            - generic [ref=e251]:
              - generic [ref=e252]:
                - generic [ref=e253]: Medical History
                - textbox "Any existing medical conditions, surgeries, etc." [ref=e254]
              - generic [ref=e255]:
                - generic [ref=e256]: Allergies
                - textbox "e.g., Penicillin, Peanuts, Latex" [ref=e259]
              - generic [ref=e260]:
                - generic [ref=e261]: Current Medications
                - textbox "List current medications" [ref=e264]
          - generic [ref=e265]:
            - heading "Insurance Details" [level=3] [ref=e266]
            - generic [ref=e267]:
              - generic [ref=e268]:
                - generic [ref=e269]: Insurance Company Name
                - textbox "e.g., Star Health, HDFC Ergo" [ref=e272]
              - generic [ref=e273]:
                - generic [ref=e274]: Policy Number
                - textbox "Insurance policy number" [ref=e277]
              - generic [ref=e278]:
                - generic [ref=e279]: Policy Amount
                - textbox "Coverage/eligibility amount under this policy" [ref=e282]
          - generic [ref=e283]:
            - heading "Guardian Information (Required — Patient is under 18 years)" [level=4] [ref=e284]
            - generic [ref=e285]:
              - generic [ref=e286]:
                - generic [ref=e287]: Guardian Name *
                - textbox "Full name of guardian" [ref=e288]
              - generic [ref=e289]:
                - generic [ref=e290]: Guardian Phone *
                - textbox "10-digit mobile number" [ref=e291]
            - generic [ref=e292]:
              - generic [ref=e293]: Guardian Relationship *
              - combobox [ref=e295] [cursor=pointer]:
                - generic [ref=e296]: Select Relationship
            - generic [ref=e300] [cursor=pointer]:
              - checkbox "I confirm that I am the legal guardian of this patient and authorize medical treatment and care for this minor. *" [ref=e301]
              - generic [ref=e302]: I confirm that I am the legal guardian of this patient and authorize medical treatment and care for this minor. *
          - generic [ref=e304] [cursor=pointer]:
            - 'checkbox "Patient Consent: I confirm that the patient has been informed about our Privacy Policy and Terms of Service, and has verbally consented to the collection and use of their personal health information for healthcare purposes. *" [ref=e305]'
            - generic [ref=e306]:
              - strong [ref=e307]: "Patient Consent:"
              - text: I confirm that the patient has been informed about our
              - strong [ref=e308]: Privacy Policy
              - text: and
              - strong [ref=e309]: Terms of Service
              - text: ", and has verbally consented to the collection and use of their personal health information for healthcare purposes. *"
          - generic [ref=e310]:
            - button "Cancel" [ref=e311] [cursor=pointer]
            - button "Register Patient" [ref=e313] [cursor=pointer]
```

# Test source

```ts
  82  |         this.bookaptt = page.getByRole('button', { name: 'Book Appointment', exact: true });
  83  |         this.slots = page.locator('button:not([disabled])').filter({ hasText: /^\d{2}:\d{2}$/ }).first();
  84  |         this.bookbtn = page.getByRole('button', { name: 'Book Appointment', exact: true });
  85  | 
  86  |         this.invoiceMenu = page.getByRole('button', { name: '💰 Billing ❯' });
  87  |         this.invoicebtn = page.getByRole('button', { name: '➕ Create Invoice' });
  88  |         this.patientname = page.getByRole('textbox', { name: 'Search patient by name, phone' });
  89  |         this.patientnameoption = page.getByText('Deepthi K Konchada ');
  90  |         this.textbox = page.getByRole('textbox');
  91  |         this.servicedesc = page.getByRole('textbox', { name: 'Service description' });
  92  |         this.amount = page.getByRole('textbox', { name: '0' });
  93  |         this.doc = page.getByText('Select Doctor');
  94  |         this.docoptions = page.getByRole('option', { name: 'Dr. Whitecoats Doctor' });
  95  |         this.createinvoicebtn = page.locator('button.btn.btn-primary:has-text("Create Invoice")');
  96  |         this.createInvoiceBtndis = page.locator('button[disabled]:has-text("Create Invoice")');
  97  | 
  98  | 
  99  |         this.allappts = page.getByRole('button', { name: '📋 All Appointments' });
  100 |         this.searchtextbox = page.getByRole('textbox', { name: 'Search patient name, phone,' });
  101 |         this.customrange = page.getByRole('combobox').filter({ hasText: 'Custom Range' });
  102 |         this.customrangeoption = page.getByRole('option', { name: 'All Dates' });
  103 |         this.alldocdrpdwn = page.getByRole('combobox').filter({ hasText: 'All Doctors' });
  104 |         this.docoption = page.getByRole('option', { name: 'Dr. Bhaskar Ainala' });
  105 |         this.pagenation = page.getByRole('button', { name: '2' });
  106 |         this.pagenation2 = page.getByRole('button', { name: '3', exact: true });
  107 |         this.pagenationnext = page.getByRole('button', { name: 'Next page' });
  108 |         this.pagenationprevious = page.getByRole('button', { name: 'Previous page' });
  109 | 
  110 |         this.genderdrop = page.getByText('All Genders');
  111 |         this.genderdrpoption = page.getByRole('option', { name: 'Female' });
  112 |         this.status = page.getByText('All Status');
  113 |         this.active = page.getByRole('option', { name: 'Active', exact: true });
  114 |         this.bloodgrpdropdwn = page.getByRole('combobox').filter({ hasText: 'All Blood Groups' });
  115 |         this.bloodgrpoptiondropdown = page.getByRole('option', { name: 'A+' });
  116 |         this.patientSearchBox = page.getByRole('textbox', { name: 'Search by name, phone, email' });
  117 |         this.patientListPage2 = page.getByRole('button', { name: '2' });
  118 |         this.patientListNext = page.getByRole('button', { name: 'Next page' });
  119 |         this.patientListPrev = page.getByRole('button', { name: 'Previous page' });
  120 |         this.billingInvoicesBtn = page.getByRole('button', { name: '📄 Billing & Invoices' });
  121 |         this.reset = page.getByRole('button', { name: 'Reset Filters' });
  122 |         this.searchtextbox_invoice = page.getByRole('textbox', { name: 'Search by invoice number,' });
  123 |         this.statusoption_paid = page.getByRole('option', { name: 'Paid', exact: true });
  124 |         this.view = page.getByRole('button', { name: 'View' });
  125 |         this.printinvoice = page.getByRole('button', { name: 'Print Invoice' });
  126 |         this.email = page.getByRole('button', { name: 'Send Email' });
  127 |         this.cancelnow = page.getByRole('button', { name: '×' });
  128 | 
  129 |         // Edit Patient locators
  130 |         this.editBtn = page.getByRole('button', { name: 'Edit' }).first();
  131 |         this.editBloodGroupDrop = page.getByText('Select Blood Group');
  132 |         this.editBloodGroupBPlus = page.getByRole('option', { name: 'B+', exact: true });
  133 |         this.editGenderDrop = page.getByText('Female');
  134 |         this.editGenderFemale = page.getByRole('option', { name: 'Female' });
  135 |         this.editAbhaNumber = page.getByRole('textbox', { name: '14-digit number' });
  136 |         this.editAadharNumber = page.getByRole('textbox', { name: '12-digit number' });
  137 |         this.editEmergencyPhone = page.locator('input[type="tel"]').nth(1);
  138 |         this.editRelationDrop = page.getByText('Select Relation');
  139 |         this.editRelationSibling = page.getByRole('option', { name: 'Sibling' });
  140 |         this.editSourceDrop = page.getByRole('combobox').filter({ hasText: 'Select Source' });
  141 |         this.editSourceOnline = page.getByRole('option', { name: 'Online-Website' });
  142 |         this.editDoctorHospital = page.getByRole('textbox', { name: 'Doctor/Hospital name' });
  143 |         this.editSymptomsField = page.locator('div:nth-child(4) > div:nth-child(5) > div:nth-child(2) > input');
  144 |         this.updatePatientBtn = page.getByRole('button', { name: 'Update Patient' });
  145 | 
  146 |         // View patient / profile
  147 |         this.viewicon = page.getByRole('button').filter({ hasText: /^$/ }).nth(2);
  148 |         this.viewdetails = page.getByRole('button', { name: 'View Details' });
  149 |         this.printBtn = page.getByRole('button', { name: 'Print' });
  150 |         this.proffile = page.getByRole('button', { name: '👤 My Profile' });
  151 |         this.editprofile = page.getByRole('button', { name: 'Edit Profile' });
  152 |         this.agestaff = page.getByRole('textbox', { name: 'Staff member must be at least' });
  153 |         this.namestaff = page.locator('input[type="text"]');
  154 |         this.savechanges = page.getByRole('button', { name: 'Save Changes' });
  155 | 
  156 | 
  157 | 
  158 | 
  159 | 
  160 |     }
  161 | 
  162 | 
  163 |     async addPatient(PName, Plname, age, addhar, phnum, email, econtact, eph, syptoms, allergies, medication) {
  164 |         await this.enableNotificationsbtn.click();
  165 |         await this.AddNewPatient.click();
  166 |         await this.AllPatients.click();
  167 |         await this.AddPatient.click();
  168 |         await this.FirstName.fill(PName);
  169 |         await this.LastName.fill(Plname);
  170 |         await this.Age.fill(age);
  171 |         await this.Gender.first().click();
  172 |         await this.genderoption.click();
  173 |         await this.bloodGroup.click();
  174 |         await this.bloodgrpoption.click();
  175 |         await this.AadharNumber.fill(addhar);
  176 |         await this.Source.click();
  177 |         await this.sourceoption.click();
  178 |         await this.MobileNumber.first().fill(phnum);
  179 |         await this.Email.fill(email);
  180 |         await this.EmergencyContact.fill(econtact);
  181 |         await this.EmergencyContactPhone.fill(eph);
> 182 |         await this.Relation.click();
      |                             ^ Error: locator.click: Error: strict mode violation: getByRole('combobox').filter({ hasText: 'Select Relation' }) resolved to 2 elements:
  183 |         await this.relationoption.click();
  184 |         await this.Reason.click();
  185 |         await this.Symptoms.fill(syptoms);
  186 |         await this.Allergies.fill(allergies);
  187 |         await this.Medication.fill(medication);
  188 |         await this.checkbox.check();
  189 |         await this.savebtn.click();
  190 | 
  191 | 
  192 | 
  193 |     }
  194 | 
  195 |     async bookAppointment(searchText, searchOptionText, date, description, doctorName, hospitalName) {
  196 |         await this.enableNotificationsbtn.click();
  197 |         await this.apptMenu.click();
  198 |         await this.bookappt.click();
  199 |         await this.search.fill(searchText);
  200 |         await this.searchoption(searchOptionText).first().click();
  201 |         await this.next.click();
  202 |         await this.department.click();
  203 |         await this.departmentOption.click();
  204 |         await this.specializationdoctor.click();
  205 |         // await this.specializationoption.click();
  206 |         await this.fillDate(date);
  207 |         await this.doctor.click();
  208 |         await this.doctoroption.click();
  209 |         await this.page.locator('button:not([disabled])').filter({ hasText: /^\d{2}:\d{2}$/ }).first().click();
  210 |         await this.desc.fill(description);
  211 |         await this.referral.click();
  212 |         await this.doctorname.fill(doctorName);
  213 |         await this.hospitalname.fill(hospitalName);
  214 |         await this.reviewbtn.click();
  215 |         await this.proceedbtn.click();
  216 |         await this.page.pause();
  217 |         await this.payment.click();
  218 |         this.page.once('dialog', dialog => {
  219 |             console.log(`Dialog message: ${dialog.message()}`);
  220 |             dialog.dismiss().catch(() => { });
  221 |         });
  222 | 
  223 |     }
  224 | 
  225 |     async Reschedule() {
  226 |         await this.enableNotificationsbtn.click();
  227 |         await this.apptMenu.click();
  228 |         await this.Reschedulebtn.click();
  229 |         await this.resbtn.first().click();
  230 |         await this.rescheduleslot.click();
  231 |         await this.confirmschedule.click();
  232 |         this.page.once('dialog', dialog => {
  233 |             console.log(`Dialog message: ${dialog.message()}`);
  234 |             dialog.dismiss().catch(() => { });
  235 |         });
  236 |     }
  237 | 
  238 |     async rescheduleWithoutSlot() {
  239 |         await this.enableNotificationsbtn.click();
  240 |         await this.apptMenu.click();
  241 |         await this.Reschedulebtn.click();
  242 |         await this.resbtn.first().click();
  243 |         // intentionally skip slot selection — button should remain disabled
  244 |         await expect(this.confirmschedule).toBeDisabled();
  245 |     }
  246 |     async Cancel() {
  247 |          await this.enableNotificationsbtn.click();
  248 |         await this.apptMenu.click();
  249 |         await this.cancel.click();
  250 |         this.page.once('dialog', dialog => {
  251 |             console.log(`Dialog message: ${dialog.message()}`);
  252 |             dialog.dismiss().catch(() => { });
  253 |         });
  254 | 
  255 |     }
  256 | 
  257 |     async Followup() {
  258 |          await this.enableNotificationsbtn.click();
  259 |         await this.apptMenu.click();
  260 |         await this.followup.click();
  261 |         await this.contextmenu.first().click();
  262 |         await this.bookaptt.click();
  263 |         await this.slots.click();
  264 |         await this.bookbtn.click();
  265 |     }
  266 | 
  267 |     async Createinvoice(patientname, date, type, amount) {
  268 |          await this.enableNotificationsbtn.click();
  269 |         await this.invoiceMenu.click();
  270 |         //await this.page.pause();
  271 |         await this.invoicebtn.click();
  272 |         await this.patientname.fill(patientname);
  273 |         await this.patientnameoption.first().click();
  274 |         await this.textbox.nth(1).fill(date);
  275 |         await this.servicedesc.fill(type);
  276 |         await this.amount.fill(amount);
  277 |         // await this.doc.click();
  278 |         // await this.docoptions.click();
  279 |         await this.createinvoicebtn.click();
  280 |         // this.page.once('dialog', dialog => {
  281 |         //     console.log(`Dialog message: ${dialog.message()}`);
  282 |         //     dialog.dismiss().catch(() => { });
```