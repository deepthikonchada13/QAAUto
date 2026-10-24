# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: BranchAdmin.spec.js >> Hospital Admin Branch creation >> Add Patient - submit without consent checkbox @patient
- Location: tests\BranchAdmin.spec.js:567:1

# Error details

```
TypeError: branchPortalPage.submitPatientFormWithoutConsent is not a function
```

# Page snapshot

```yaml
- generic [active] [ref=e1]: +
```

# Test source

```ts
  471 | });
  472 | 
  473 | test('Add Staff - first name with special characters @staff', async ({ page }) => {
  474 |     const poManager = new POManagers(page);
  475 |     const branchPortalPage = poManager.BranchPortalPage();
  476 |     const data = generateBranchStaffData();
  477 |     await branchPortalPage.addStaff({
  478 |         firstName: '@#Staff!', lastName: data.lastName, dob: data.dob,
  479 |         gender: 'Female', bloodGroup: 'AB+', email: data.email, mobile: data.mobile,
  480 |         role: 'Receptionist', department: 'Cardiology', shift: 'Rotating',
  481 |         joiningDate: data.joiningDate, salary: data.salary,
  482 |     });
  483 | });
  484 | 
  485 | test('Add Staff - future DOB (invalid) @staff', async ({ page }) => {
  486 |     const poManager = new POManagers(page);
  487 |     const branchPortalPage = poManager.BranchPortalPage();
  488 |     const data = generateBranchStaffData();
  489 |     await branchPortalPage.addStaff({
  490 |         firstName: data.firstName, lastName: data.lastName, dob: '2099-01-01',
  491 |         gender: 'Female', bloodGroup: 'AB+', email: data.email, mobile: data.mobile,
  492 |         role: 'Receptionist', department: 'Cardiology', shift: 'Rotating',
  493 |         joiningDate: data.joiningDate, salary: data.salary,
  494 |     });
  495 | });
  496 | 
  497 | test('Add Staff - future joining date @staff', async ({ page }) => {
  498 |     const poManager = new POManagers(page);
  499 |     const branchPortalPage = poManager.BranchPortalPage();
  500 |     const data = generateBranchStaffData();
  501 |     await branchPortalPage.addStaff({
  502 |         firstName: data.firstName, lastName: data.lastName, dob: data.dob,
  503 |         gender: 'Female', bloodGroup: 'AB+', email: data.email, mobile: data.mobile,
  504 |         role: 'Receptionist', department: 'Cardiology', shift: 'Rotating',
  505 |         joiningDate: '2099-12-31', salary: data.salary,
  506 |     });
  507 | });
  508 | 
  509 | test('Add Staff - salary as zero (boundary) @staff', async ({ page }) => {
  510 |     const poManager = new POManagers(page);
  511 |     const branchPortalPage = poManager.BranchPortalPage();
  512 |     const data = generateBranchStaffData();
  513 |     await branchPortalPage.addStaff({
  514 |         firstName: data.firstName, lastName: data.lastName, dob: data.dob,
  515 |         gender: 'Female', bloodGroup: 'AB+', email: data.email, mobile: data.mobile,
  516 |         role: 'Receptionist', department: 'Cardiology', shift: 'Rotating',
  517 |         joiningDate: data.joiningDate, salary: '0',
  518 |     });
  519 | });
  520 | 
  521 | test('Add Staff - salary as negative value @staff', async ({ page }) => {
  522 |     const poManager = new POManagers(page);
  523 |     const branchPortalPage = poManager.BranchPortalPage();
  524 |     const data = generateBranchStaffData();
  525 |     await branchPortalPage.addStaff({
  526 |         firstName: data.firstName, lastName: data.lastName, dob: data.dob,
  527 |         gender: 'Female', bloodGroup: 'AB+', email: data.email, mobile: data.mobile,
  528 |         role: 'Receptionist', department: 'Cardiology', shift: 'Rotating',
  529 |         joiningDate: data.joiningDate, salary: '-5000',
  530 |     });
  531 | });
  532 | 
  533 | test('Add Staff - duplicate submission (same data twice) @staff', async ({ page }) => {
  534 |     const poManager = new POManagers(page);
  535 |     const branchPortalPage = poManager.BranchPortalPage();
  536 |     const data = generateBranchStaffData();
  537 |     const payload = {
  538 |         firstName: data.firstName, lastName: data.lastName, dob: data.dob,
  539 |         gender: 'Female', bloodGroup: 'AB+', email: data.email, mobile: data.mobile,
  540 |         role: 'Receptionist', department: 'Cardiology', shift: 'Rotating',
  541 |         joiningDate: data.joiningDate, salary: data.salary,
  542 |     };
  543 |     await branchPortalPage.addStaff(payload);
  544 |     await branchPortalPage.addStaff(payload);
  545 | });
  546 | 
  547 | // ─── Patients ─────────────────────────────────────────────────────────────────
  548 | 
  549 | test('Add Patient - valid data @patient', async ({ page }) => {
  550 |     const poManager = new POManagers(page);
  551 |     const branchPortalPage = poManager.BranchPortalPage();
  552 |     const data = generateBranchPatientData();
  553 |     await branchPortalPage.addPatient({
  554 |         firstName: data.firstName, lastName: data.lastName, age: data.age,
  555 |         gender: 'Female', bloodGroup: 'B-', email: data.email, mobile: data.mobile,
  556 |         aadhar: data.aadhar, source: 'Online-Website', emergencyName: data.emergencyName,
  557 |         emergencyMobile: data.emergencyMobile, relation: 'Friend', notes: data.notes,
  558 |     });
  559 | });
  560 | 
  561 | // test('Add Patient - submit empty form (required field validation) @patient', async ({ page }) => {
  562 | //     const poManager = new POManagers(page);
  563 | //     const branchPortalPage = poManager.BranchPortalPage();
  564 | //     await branchPortalPage.submitPatientFormEmpty();
  565 | // });
  566 | 
  567 | test('Add Patient - submit without consent checkbox @patient', async ({ page }) => {
  568 |     const poManager = new POManagers(page);
  569 |     const branchPortalPage = poManager.BranchPortalPage();
  570 |     const data = generateBranchPatientData();
> 571 |     await branchPortalPage.submitPatientFormWithoutConsent({
      |                            ^ TypeError: branchPortalPage.submitPatientFormWithoutConsent is not a function
  572 |         firstName: data.firstName, lastName: data.lastName, age: data.age,
  573 |         gender: 'Female', bloodGroup: 'B-', email: data.email, mobile: data.mobile,
  574 |         aadhar: data.aadhar, source: 'Online-Website', emergencyName: data.emergencyName,
  575 |         emergencyMobile: data.emergencyMobile, relation: 'Friend', notes: data.notes,
  576 |     });
  577 | });
  578 | 
  579 | test('Add Patient - mobile 9 digits (below boundary) @patient', async ({ page }) => {
  580 |     const poManager = new POManagers(page);
  581 |     const branchPortalPage = poManager.BranchPortalPage();
  582 |     const data = generateBranchPatientData();
  583 |     await branchPortalPage.addPatient({
  584 |         firstName: data.firstName, lastName: data.lastName, age: data.age,
  585 |         gender: 'Female', bloodGroup: 'B-', email: data.email, mobile: '987654321',
  586 |         aadhar: data.aadhar, source: 'Online-Website', emergencyName: data.emergencyName,
  587 |         emergencyMobile: data.emergencyMobile, relation: 'Friend', notes: data.notes,
  588 |     });
  589 | });
  590 | 
  591 | test('Add Patient - mobile exactly 10 digits (boundary) @patient', async ({ page }) => {
  592 |     const poManager = new POManagers(page);
  593 |     const branchPortalPage = poManager.BranchPortalPage();
  594 |     const data = generateBranchPatientData();
  595 |     await branchPortalPage.addPatient({
  596 |         firstName: data.firstName, lastName: data.lastName, age: data.age,
  597 |         gender: 'Female', bloodGroup: 'B-', email: data.email, mobile: '9876543210',
  598 |         aadhar: data.aadhar, source: 'Online-Website', emergencyName: data.emergencyName,
  599 |         emergencyMobile: data.emergencyMobile, relation: 'Friend', notes: data.notes,
  600 |     });
  601 | });
  602 | 
  603 | test('Add Patient - mobile 11 digits (above boundary) @patient', async ({ page }) => {
  604 |     const poManager = new POManagers(page);
  605 |     const branchPortalPage = poManager.BranchPortalPage();
  606 |     const data = generateBranchPatientData();
  607 |     await branchPortalPage.addPatient({
  608 |         firstName: data.firstName, lastName: data.lastName, age: data.age,
  609 |         gender: 'Female', bloodGroup: 'B-', email: data.email, mobile: '98765432101',
  610 |         aadhar: data.aadhar, source: 'Online-Website', emergencyName: data.emergencyName,
  611 |         emergencyMobile: data.emergencyMobile, relation: 'Friend', notes: data.notes,
  612 |     });
  613 | });
  614 | 
  615 | test('Add Patient - aadhar 11 digits (below boundary) @patient', async ({ page }) => {
  616 |     const poManager = new POManagers(page);
  617 |     const branchPortalPage = poManager.BranchPortalPage();
  618 |     const data = generateBranchPatientData();
  619 |     await branchPortalPage.addPatient({
  620 |         firstName: data.firstName, lastName: data.lastName, age: data.age,
  621 |         gender: 'Female', bloodGroup: 'B-', email: data.email, mobile: data.mobile,
  622 |         aadhar: '12345678901', source: 'Online-Website', emergencyName: data.emergencyName,
  623 |         emergencyMobile: data.emergencyMobile, relation: 'Friend', notes: data.notes,
  624 |     });
  625 | });
  626 | 
  627 | test('Add Patient - aadhar exactly 12 digits (boundary) @patient', async ({ page }) => {
  628 |     const poManager = new POManagers(page);
  629 |     const branchPortalPage = poManager.BranchPortalPage();
  630 |     const data = generateBranchPatientData();
  631 |     await branchPortalPage.addPatient({
  632 |         firstName: data.firstName, lastName: data.lastName, age: data.age,
  633 |         gender: 'Female', bloodGroup: 'B-', email: data.email, mobile: data.mobile,
  634 |         aadhar: '123456789012', source: 'Online-Website', emergencyName: data.emergencyName,
  635 |         emergencyMobile: data.emergencyMobile, relation: 'Friend', notes: data.notes,
  636 |     });
  637 | });
  638 | 
  639 | test('Add Patient - aadhar 13 digits (above boundary) @patient', async ({ page }) => {
  640 |     const poManager = new POManagers(page);
  641 |     const branchPortalPage = poManager.BranchPortalPage();
  642 |     const data = generateBranchPatientData();
  643 |     await branchPortalPage.addPatient({
  644 |         firstName: data.firstName, lastName: data.lastName, age: data.age,
  645 |         gender: 'Female', bloodGroup: 'B-', email: data.email, mobile: data.mobile,
  646 |         aadhar: '1234567890123', source: 'Online-Website', emergencyName: data.emergencyName,
  647 |         emergencyMobile: data.emergencyMobile, relation: 'Friend', notes: data.notes,
  648 |     });
  649 | });
  650 | 
  651 | test('Add Patient - invalid email format @patient', async ({ page }) => {
  652 |     const poManager = new POManagers(page);
  653 |     const branchPortalPage = poManager.BranchPortalPage();
  654 |     const data = generateBranchPatientData();
  655 |     await branchPortalPage.addPatient({
  656 |         firstName: data.firstName, lastName: data.lastName, age: data.age,
  657 |         gender: 'Female', bloodGroup: 'B-', email: 'notanemail', mobile: data.mobile,
  658 |         aadhar: data.aadhar, source: 'Online-Website', emergencyName: data.emergencyName,
  659 |         emergencyMobile: data.emergencyMobile, relation: 'Friend', notes: data.notes,
  660 |     });
  661 | });
  662 | 
  663 | test('Add Patient - email with special characters @patient', async ({ page }) => {
  664 |     const poManager = new POManagers(page);
  665 |     const branchPortalPage = poManager.BranchPortalPage();
  666 |     const data = generateBranchPatientData();
  667 |     await branchPortalPage.addPatient({
  668 |         firstName: data.firstName, lastName: data.lastName, age: data.age,
  669 |         gender: 'Female', bloodGroup: 'B-', email: 'test@@domain..com', mobile: data.mobile,
  670 |         aadhar: data.aadhar, source: 'Online-Website', emergencyName: data.emergencyName,
  671 |         emergencyMobile: data.emergencyMobile, relation: 'Friend', notes: data.notes,
```