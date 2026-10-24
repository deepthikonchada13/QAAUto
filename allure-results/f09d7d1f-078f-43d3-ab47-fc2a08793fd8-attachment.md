# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: BranchAdmin.spec.js >> Hospital Admin Branch creation >> Add Staff - duplicate submission (same data twice) @staff
- Location: tests\BranchAdmin.spec.js:533:1

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for getByRole('button', { name: 'Enable Notifications' })

```

# Test source

```ts
  168 |         this.refundClearSearchBtn = page.getByRole('button', { name: 'Clear search' });
  169 |         this.refundStatusDropdown = page.getByRole('combobox').filter({ hasText: 'All Status' });
  170 |         this.refundMethodDropdown = page.getByRole('combobox').filter({ hasText: 'All Methods' });
  171 |         this.refundStartDateInput = page.getByRole('textbox').nth(1);
  172 |         this.refundEndDateInput = page.getByRole('textbox').nth(2);
  173 |         this.refundResetFiltersBtn = page.getByRole('button', { name: 'Reset Filters' });
  174 | 
  175 |         // Error messages
  176 |         this.errorMessages = page.locator('.error, .error-message, [class*="error"], [class*="invalid"], .text-red, .text-danger, .alert-error');
  177 |         this.formValidationErrors = page.locator('input:invalid, select:invalid, textarea:invalid');
  178 |     }
  179 | 
  180 |     async searchDepartment(name) {
  181 |         await this.enableNotificationsbtn.click();
  182 |         await this.departmentsBtn.click();
  183 |         await this.deptSearchInput.fill(name);
  184 |         await this.page.getByRole('button', { name: 'Clear search' }).click();
  185 |     }
  186 | 
  187 |     async addDoctor({ firstName, lastName, dob, gender, email, mobile, regNo, aadhar, qualification, experience, department, specialization, inPersonFee, videoFee }) {
  188 |         await this.enableNotificationsbtn.click();
  189 |         await this.doctorsMenuBtn.click();
  190 |         await this.allDoctorsBtn.click();
  191 |         await this.addDoctorBtn.click();
  192 |         await this.doctorFirstNameInput.fill(firstName);
  193 |         await this.doctorLastNameInput.fill(lastName);
  194 |         await this.doctorDobInput.fill(dob);
  195 |         await this.selectGenderDropdown.click();
  196 |         await this.page.getByRole('option', { name: gender, exact: true }).click();
  197 |         await this.doctorEmailInput.fill(email);
  198 |         await this.doctorMobileInput.fill(mobile);
  199 |         await this.doctorRegInput.fill(regNo);
  200 |         await this.doctorAadharInput.fill(aadhar);
  201 |         await this.doctorQualificationInput.fill(qualification);
  202 |         await this.doctorExperienceInput.fill(experience);
  203 |         await this.selectDepartmentDropdown.click();
  204 |         await this.page.getByRole('option', { name: department }).click();
  205 |         await this.selectSpecializationDropdown.click();
  206 |         await this.page.getByRole('option', { name: specialization }).click();
  207 |         await this.doctorInPersonFeeInput.fill(inPersonFee);
  208 |         await this.videoCheckbox.check();
  209 |         await this.doctorVideoFeeInput.fill(videoFee);
  210 |         await this.addDoctorSubmitBtn.click();
  211 | 
  212 |     }
  213 | 
  214 |     async createSchedule({ doctorName, room, startTime, endTime, slotDuration, maxPatients }) {
  215 |         await this.enableNotificationsbtn.click();
  216 |         await this.doctorsMenuBtn.click();
  217 |         await this.schedulesBtn.click();
  218 |         await this.createScheduleBtn.click();
  219 |         await this.scheduleDocSearchInput.click();
  220 |         await this.page.getByText(doctorName).click();
  221 |         await this.scheduleRoomInput.fill(room);
  222 |         await this.scheduleMonBtn.click();
  223 |         await this.scheduleWedBtn.click();
  224 |         await this.scheduleThuBtn.click();
  225 |         await this.scheduleStartTimeInput.fill(startTime);
  226 |         await this.scheduleEndTimeInput.fill(endTime);
  227 |         await this.scheduleSlotDurationDropdown.click();
  228 |         await this.page.getByRole('option', { name: slotDuration }).click();
  229 |         await this.scheduleMaxPatientsInput.fill(maxPatients);
  230 |         await this.scheduleTypeDropdown.click();
  231 |         await this.page.getByRole('option', { name: '🏥📹 Both (In-Person & Video)' }).click();
  232 |         await this.createScheduleSubmitBtn.click();
  233 |         this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
  234 |     }
  235 | 
  236 |     async filterSchedules({ searchText, doctor, day }) {
  237 |         await this.enableNotificationsbtn.click();
  238 |         await this.doctorsMenuBtn.click();
  239 |         await this.schedulesBtn.click();
  240 |         await this.scheduleSearchInput.fill(searchText);
  241 |         await this.scheduleAllDoctorsDropdown.click();
  242 |         await this.page.getByRole('option', { name: doctor }).first().click();
  243 |         await this.page.getByRole('combobox').filter({ hasText: doctor }).click();
  244 |         await this.page.getByRole('option', { name: 'All Doctors' }).first().click();
  245 |         await this.scheduleAllDaysDropdown.click();
  246 |         await this.page.getByRole('option', { name: day }).click();
  247 |         await this.page.getByRole('combobox').filter({ hasText: day }).first().click();
  248 |         await this.page.getByRole('option', { name: 'All Days' }).click();
  249 |         await this.scheduleActiveBtn.click();
  250 |         await this.scheduleAllBtn.click();
  251 |     }
  252 | 
  253 |     async filterSpecializations({ searchText, department }) {
  254 | 
  255 |         await this.enableNotificationsbtn.click();
  256 |         await this.doctorsMenuBtn.click();
  257 |         await this.schedulesBtn.click();
  258 |         await this.specializationsBtn.click();
  259 |         await this.specializationSearchInput.fill(searchText);
  260 |         // await this.page.getByRole('button', { name: 'Clear search' }).click();
  261 |         await this.specializationInactiveBtn.click();
  262 |         // await this.specializationActiveBtn.click();
  263 |         await this.specializationDeptDropdown.click();
  264 |         await this.page.getByRole('option', { name: department }).click();
  265 |     }
  266 | 
  267 |     async addStaff({ firstName, lastName, dob, gender, bloodGroup, email, mobile, role, department, shift, joiningDate, salary }) {
> 268 |         await this.enableNotificationsbtn.click();
      |                                           ^ Error: locator.click: Target page, context or browser has been closed
  269 |         await this.staffMenuBtn.click();
  270 |         await this.allStaffBtn.click();
  271 |         await this.addStaffBtn.click();
  272 |         await this.staffFirstNameInput.fill(firstName);
  273 |         await this.staffLastNameInput.fill(lastName);
  274 |         await this.staffDobInput.fill(dob);
  275 |         await this.staffGenderDropdown.click();
  276 |         await this.page.getByRole('option', { name: gender }).click();
  277 |         await this.staffBloodGroupDropdown.click();
  278 |         await this.page.getByRole('option', { name: bloodGroup }).click();
  279 |         await this.staffEmailInput.fill(email);
  280 |         await this.staffMobileInput.fill(mobile);
  281 |         await this.staffRoleDropdown.click();
  282 |         await this.page.getByRole('option', { name: role }).click();
  283 |         await this.staffDeptDropdown.click();
  284 |         await this.page.getByRole('option', { name: department }).click();
  285 |         await this.staffShiftDropdown.click();
  286 |         await this.page.getByRole('option', { name: shift }).click();
  287 |         await this.staffJoiningDateInput.fill(joiningDate);
  288 |         await this.staffSalaryInput.fill(salary);
  289 |         await this.addStaffSubmitBtn.click();
  290 |         this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
  291 |     }
  292 | 
  293 |     async addPatient({ firstName, lastName, age, gender, bloodGroup, email, mobile, aadhar, source, emergencyName, emergencyMobile, relation, notes }) {
  294 |         await this.enableNotificationsbtn.click();
  295 |         await this.patientsMenuBtn.click();
  296 |         await this.allPatientsBtn.click();
  297 |         await this.addPatientBtn.click();
  298 |         await this.patientFirstNameInput.fill(firstName);
  299 |         await this.patientLastNameInput.fill(lastName);
  300 |         await this.patientAgeInput.fill(age);
  301 |         await this.patientGenderDropdown.click();
  302 |         await this.page.getByRole('option', { name: gender }).click();
  303 |         await this.patientBloodGroupDropdown.click();
  304 |         await this.page.getByRole('option', { name: bloodGroup, exact: true }).click();
  305 |         await this.patientEmailInput.fill(email);
  306 |         await this.patientMobileInput.fill(mobile);
  307 |         await this.patientAadharInput.fill(aadhar);
  308 |         await this.patientSourceDropdown.click();
  309 |         await this.page.getByRole('option', { name: source }).click();
  310 |         await this.patientEmergencyNameInput.fill(emergencyName);
  311 |         await this.patientEmergencyMobileInput.fill(emergencyMobile);
  312 |         await this.patientRelationDropdown.click();
  313 |         await this.page.getByRole('option', { name: relation }).click();
  314 |         await this.patientNotesInput.fill(notes);
  315 |         await this.patientConsentCheckbox.check();
  316 |         await this.addPatientSubmitBtn.click();
  317 |         this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
  318 |     }
  319 | 
  320 |     async bookAppointment({ patientName, patientText, type, visitType, department, specialization, date, doctorName, timeSlot, notes }) {
  321 |         await this.enableNotificationsbtn.click();
  322 |         await this.appointmentsMenuBtn.click();
  323 |         await this.bookAppointmentBtn.click();
  324 |         await this.apptPatientSearchInput.fill(patientText);
  325 |         await this.page.getByText(patientName).click();
  326 |         await this.apptNextDetailsBtn.click();
  327 |         await this.apptTypeDropdown.click();
  328 |         await this.page.getByRole('option', { name: type }).first().click();
  329 |         await this.apptVisitTypeDropdown.click();
  330 |         await this.page.getByRole('option', { name: visitType }).first().click();
  331 |         await this.apptDeptDropdown.click();
  332 |         await this.page.getByRole('option', { name: department }).first().click();
  333 |         await this.apptSpecializationDropdown.click();
  334 |         await this.page.getByRole('option', { name: specialization }).first().click();
  335 |         await this.apptDateInput.fill(date);
  336 |         await this.apptDoctorSearchInput.click();
  337 |         await this.page.getByText(doctorName).click();
  338 |         const preferredSlot = this.page.getByRole('button', { name: timeSlot });
  339 |         const isDisabled = await preferredSlot.isDisabled().catch(() => true);
  340 |         if (isDisabled) {
  341 |             await this.page.locator('button[type="button"]:not([disabled])').filter({ hasText: /^\d{2}:\d{2}$/ }).first().click();
  342 |         } else {
  343 |             await preferredSlot.click();
  344 |         }
  345 |         await this.apptNotesInput.fill(notes);
  346 |         await this.apptNextReviewBtn.click();
  347 |         await this.apptProceedPaymentBtn.click();
  348 |         this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
  349 |         await this.apptSharePaymentLinkBtn.click();
  350 |     }
  351 | 
  352 |     async filterAppointments({ searchText, doctor, startDate, endDate }) {
  353 |         await this.enableNotificationsbtn.click();
  354 |         await this.appointmentsMenuBtn.click();
  355 |         await this.Allappointments.click();
  356 |         await this.apptSearchInput.fill(searchText);
  357 |         // await this.apptClearSearchBtn.click();
  358 |         await this.apptAllDoctorsDropdown.click();
  359 |         await this.page.getByRole('option', { name: doctor }).click();
  360 |         await this.page.getByRole('combobox').filter({ hasText: doctor }).click();
  361 |         await this.page.getByRole('option', { name: 'All Doctors' }).click();
  362 |         await this.apptAllDatesDropdown.click();
  363 |         await this.page.getByRole('option', { name: 'Today' }).click();
  364 |         await this.page.getByRole('combobox').filter({ hasText: 'Today' }).click();
  365 |         await this.page.getByRole('option', { name: 'Custom Range' }).click();
  366 |         await this.apptStartDateInput.fill(startDate);
  367 |         await this.apptEndDateInput.fill(endDate);
  368 |         // await this.page.getByRole('combobox').filter({ hasText: 'Custom Range' }).click();
```