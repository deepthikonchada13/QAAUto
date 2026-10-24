const { test, expect } = require('@playwright/test');
const { POManagers } = require('../PageObjects/POManagers');
const {
    generateBranchDoctorData,
    generateBranchScheduleData,
    generateBranchStaffData,
    generateBranchPatientData,
    generateBranchInvoiceData,
    generateBranchAdHocServiceData,
    getDynamicDate,
    getDynamicTimeSlot,
} = require('../testData/testDataGenerator');

// ─── Login ────────────────────────────────────────────────────────────────────
test.describe('Hospital Admin Branch creation', () => {
  test.beforeEach(async ({ page }) => {
    const poManager = new POManagers(page);
    await page.goto('https://emr.whitecoats.com/');
    await poManager.BranchLoginPage().validLogin();
    
});

// ─── Departments ──────────────────────────────────────────────────────────────

test('Search Department - valid partial name @search', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    await branchPortalPage.searchDepartment('cardi');
});

test('Search Department - full name @search ', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    await branchPortalPage.searchDepartment('Cardiac Issue Dept');
});

test('Search Department - single character (min length)', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    await branchPortalPage.searchDepartment('c');
});

test('Search Department - blank/spaces only @search', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    await branchPortalPage.searchDepartment('   ');
});

test('Search Department - special characters @search', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    await branchPortalPage.searchDepartment('@#$%^&*');
});

test('Search Department - no matching results @search', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    await branchPortalPage.searchDepartment('zzzzzzzzz');
});

// ─── Doctors ──────────────────────────────────────────────────────────────────

test('Add Doctor - valid data @adddoc', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchDoctorData();
    await branchPortalPage.addDoctor({
        firstName: data.firstName, lastName: data.lastName, dob: data.dob,
        gender: 'Male', email: data.email, mobile: data.mobile, regNo: data.regNum,
        aadhar: data.aadhar, qualification: data.qualification, experience: data.experience,
        department: 'Cardiology', specialization: 'Cardiology Specializzation Testt',
        inPersonFee: data.inPersonFee, videoFee: data.videoFee,
    });
});

// test('Add Doctor - submit empty form (required field validation) @adddoc', async ({ page }) => {
//     const poManager = new POManagers(page);
//     const branchPortalPage = poManager.BranchPortalPage();
//     await branchPortalPage.submitDoctorFormEmpty();
// });

test('Add Doctor - mobile 9 digits (below min boundary) @adddoc', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchDoctorData();
    await branchPortalPage.addDoctor({
        firstName: data.firstName, lastName: data.lastName, dob: data.dob,
        gender: 'Male', email: data.email, mobile: '987654321',
        regNo: data.regNum, aadhar: data.aadhar, qualification: data.qualification,
        experience: data.experience, department: 'Cardiology',
        specialization: 'Cardiology Specializzation Testt',
        inPersonFee: data.inPersonFee, videoFee: data.videoFee,
    });
});

test('Add Doctor - mobile exactly 10 digits (boundary) @adddoc', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchDoctorData();
    await branchPortalPage.addDoctor({
        firstName: data.firstName, lastName: data.lastName, dob: data.dob,
        gender: 'Male', email: data.email, mobile: '9876543210',
        regNo: data.regNum, aadhar: data.aadhar, qualification: data.qualification,
        experience: data.experience, department: 'Cardiology',
        specialization: 'Cardiology Specializzation Testt',
        inPersonFee: data.inPersonFee, videoFee: data.videoFee,
    });
});

test('Add Doctor - mobile 11 digits (above max boundary) @adddoc', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchDoctorData();
    await branchPortalPage.addDoctor({
        firstName: data.firstName, lastName: data.lastName, dob: data.dob,
        gender: 'Male', email: data.email, mobile: '98765432101',
        regNo: data.regNum, aadhar: data.aadhar, qualification: data.qualification,
        experience: data.experience, department: 'Cardiology',
        specialization: 'Cardiology Specializzation Testt',
        inPersonFee: data.inPersonFee, videoFee: data.videoFee,
    });
});

test('Add Doctor - aadhar 11 digits (below boundary) @adddoc', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchDoctorData();
    await branchPortalPage.addDoctor({
        firstName: data.firstName, lastName: data.lastName, dob: data.dob,
        gender: 'Male', email: data.email, mobile: data.mobile,
        regNo: data.regNum, aadhar: '12345678901',
        qualification: data.qualification, experience: data.experience,
        department: 'Cardiology', specialization: 'Cardiology Specializzation Testt',
        inPersonFee: data.inPersonFee, videoFee: data.videoFee,
    });
});

test('Add Doctor - aadhar exactly 12 digits (boundary) @adddoc', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchDoctorData();
    await branchPortalPage.addDoctor({
        firstName: data.firstName, lastName: data.lastName, dob: data.dob,
        gender: 'Male', email: data.email, mobile: data.mobile,
        regNo: data.regNum, aadhar: '123456789012',
        qualification: data.qualification, experience: data.experience,
        department: 'Cardiology', specialization: 'Cardiology Specializzation Testt',
        inPersonFee: data.inPersonFee, videoFee: data.videoFee,
    });
});

test('Add Doctor - aadhar 13 digits (above boundary) @adddoc', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchDoctorData();
    await branchPortalPage.addDoctor({
        firstName: data.firstName, lastName: data.lastName, dob: data.dob,
        gender: 'Male', email: data.email, mobile: data.mobile,
        regNo: data.regNum, aadhar: '1234567890123',
        qualification: data.qualification, experience: data.experience,
        department: 'Cardiology', specialization: 'Cardiology Specializzation Testt',
        inPersonFee: data.inPersonFee, videoFee: data.videoFee,
    });
});

test('Add Doctor - invalid email format @adddoc', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchDoctorData();
    await branchPortalPage.addDoctor({
        firstName: data.firstName, lastName: data.lastName, dob: data.dob,
        gender: 'Male', email: 'invalidemail',
        mobile: data.mobile, regNo: data.regNum, aadhar: data.aadhar,
        qualification: data.qualification, experience: data.experience,
        department: 'Cardiology', specialization: 'Cardiology Specializzation Testt',
        inPersonFee: data.inPersonFee, videoFee: data.videoFee,
    });
});

test('Add Doctor - email with special characters @adddoc', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchDoctorData();
    await branchPortalPage.addDoctor({
        firstName: data.firstName, lastName: data.lastName, dob: data.dob,
        gender: 'Male', email: 'test@@domain..com',
        mobile: data.mobile, regNo: data.regNum, aadhar: data.aadhar,
        qualification: data.qualification, experience: data.experience,
        department: 'Cardiology', specialization: 'Cardiology Specializzation Testt',
        inPersonFee: data.inPersonFee, videoFee: data.videoFee,
    });
});

test('Add Doctor - first name with special characters @adddoc', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchDoctorData();
    await branchPortalPage.addDoctor({
        firstName: '@#Doc!', lastName: data.lastName, dob: data.dob,
        gender: 'Male', email: data.email,
        mobile: data.mobile, regNo: data.regNum, aadhar: data.aadhar,
        qualification: data.qualification, experience: data.experience,
        department: 'Cardiology', specialization: 'Cardiology Specializzation Testt',
        inPersonFee: data.inPersonFee, videoFee: data.videoFee,
    });
});

test('Add Doctor - first name blank @adddoc', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchDoctorData();
    await branchPortalPage.addDoctor({
        firstName: '', lastName: data.lastName, dob: data.dob,
        gender: 'Male', email: data.email,
        mobile: data.mobile, regNo: data.regNum, aadhar: data.aadhar,
        qualification: data.qualification, experience: data.experience,
        department: 'Cardiology', specialization: 'Cardiology Specializzation Testt',
        inPersonFee: data.inPersonFee, videoFee: data.videoFee,
    });
});

test('Add Doctor - future DOB (invalid) @adddoc', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchDoctorData();
    await branchPortalPage.addDoctor({
        firstName: data.firstName, lastName: data.lastName, dob: '2099-01-01',
        gender: 'Male', email: data.email,
        mobile: data.mobile, regNo: data.regNum, aadhar: data.aadhar,
        qualification: data.qualification, experience: data.experience,
        department: 'Cardiology', specialization: 'Cardiology Specializzation Testt',
        inPersonFee: data.inPersonFee, videoFee: data.videoFee,
    });
});

test('Add Doctor - fee as zero @adddoc', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchDoctorData();
    await branchPortalPage.addDoctor({
        firstName: data.firstName, lastName: data.lastName, dob: data.dob,
        gender: 'Male', email: data.email,
        mobile: data.mobile, regNo: data.regNum, aadhar: data.aadhar,
        qualification: data.qualification, experience: data.experience,
        department: 'Cardiology', specialization: 'Cardiology Specializzation Testt',
        inPersonFee: '0', videoFee: '0',
    });
});

test('Add Doctor - fee as negative value @adddoc', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchDoctorData();
    await branchPortalPage.addDoctor({
        firstName: data.firstName, lastName: data.lastName, dob: data.dob,
        gender: 'Male', email: data.email,
        mobile: data.mobile, regNo: data.regNum, aadhar: data.aadhar,
        qualification: data.qualification, experience: data.experience,
        department: 'Cardiology', specialization: 'Cardiology Specializzation Testt',
        inPersonFee: '-500', videoFee: '-200',
    });
});

test('Add Doctor - duplicate submission (same data twice) @adddoc', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchDoctorData();
    const payload = {
        firstName: data.firstName, lastName: data.lastName, dob: data.dob,
        gender: 'Male', email: data.email,
        mobile: data.mobile, regNo: data.regNum, aadhar: data.aadhar,
        qualification: data.qualification, experience: data.experience,
        department: 'Cardiology', specialization: 'Cardiology Specializzation Testt',
        inPersonFee: data.inPersonFee, videoFee: data.videoFee,
    };
    await branchPortalPage.addDoctor(payload);
    // await branchPortalPage.addDoctor(payload);
});

// ─── Schedules ────────────────────────────────────────────────────────────────

test('Create Schedule - valid data @schedule', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchScheduleData();
    await branchPortalPage.createSchedule({
        doctorName: 'Bhaskar A AinalaaID: NE-DOC-',
        room: data.room, startTime: data.startTime, endTime: data.endTime,
        slotDuration: data.slotDuration, maxPatients: data.maxPatients,
    });
});

test('Create Schedule - end time before start time (date validation) @schedule', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchScheduleData();
    await branchPortalPage.createSchedule({
        doctorName: 'Bhaskar A AinalaaID: NE-DOC-',
        room: data.room, startTime: '20:00', endTime: '08:00',
        slotDuration: data.slotDuration, maxPatients: data.maxPatients,
    });
});

test('Create Schedule - same start and end time (boundary) @schedule', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchScheduleData();
    await branchPortalPage.createSchedule({
        doctorName: 'Bhaskar A AinalaaID: NE-DOC-',
        room: data.room, startTime: '10:00', endTime: '10:00',
        slotDuration: data.slotDuration, maxPatients: data.maxPatients,
    });
});

test('Create Schedule - max patients as zero (boundary) @schedule', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchScheduleData();
    await branchPortalPage.createSchedule({
        doctorName: 'Bhaskar A AinalaaID: NE-DOC-',
        room: data.room, startTime: data.startTime, endTime: data.endTime,
        slotDuration: data.slotDuration, maxPatients: '0',
    });
});

test('Create Schedule - room with special characters @schedule', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchScheduleData();
    await branchPortalPage.createSchedule({
        doctorName: 'Bhaskar A AinalaaID: NE-DOC-',
        room: '@#Room!', startTime: data.startTime, endTime: data.endTime,
        slotDuration: data.slotDuration, maxPatients: data.maxPatients,
    });
});

test('Filter Schedules - valid search @schedule', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    await branchPortalPage.filterSchedules({ searchText: 'bhas', doctor: 'Bhaskar A Ainalaa', day: 'Tuesday' });
});

test('Filter Schedules - blank search (shows all) @schedule', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    await branchPortalPage.filterSchedules({ searchText: '', doctor: 'Bhaskar A Ainalaa', day: 'Tuesday' });
});

test('Filter Schedules - no matching search text @schedule', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    await branchPortalPage.filterSchedules({ searchText: 'zzzzzzz', doctor: 'Bhaskar A Ainalaa', day: 'Tuesday' });
});

// ─── Specializations ──────────────────────────────────────────────────────────

test('Filter Specializations - valid search @specialization', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    await branchPortalPage.filterSpecializations({ searchText: 'card', department: 'Cardiology' });
});

test('Filter Specializations - blank search @specialization', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    await branchPortalPage.filterSpecializations({ searchText: '', department: 'Cardiology' });
});

test('Filter Specializations - special characters @specialization', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    await branchPortalPage.filterSpecializations({ searchText: '@#$%', department: 'Cardiology' });
});

test('Filter Specializations - no matching results @specialization', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    await branchPortalPage.filterSpecializations({ searchText: 'zzzzzzzzz', department: 'Cardiology' });
});

// ─── Staff ────────────────────────────────────────────────────────────────────

test('Add Staff - valid data @staff', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchStaffData();
    await branchPortalPage.addStaff({
        firstName: data.firstName, lastName: data.lastName, dob: data.dob,
        gender: 'Female', bloodGroup: 'AB+', email: data.email, mobile: data.mobile,
        role: 'Receptionist', department: 'Cardiology', shift: 'Rotating',
        joiningDate: data.joiningDate, salary: data.salary,
    });
});

test('Add Staff - submit empty form (required field validation)', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    await branchPortalPage.submitStaffFormEmpty();
});

test('Add Staff - mobile 9 digits (below boundary) @staff', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchStaffData();
    await branchPortalPage.addStaff({
        firstName: data.firstName, lastName: data.lastName, dob: data.dob,
        gender: 'Female', bloodGroup: 'AB+', email: data.email, mobile: '987654321',
        role: 'Receptionist', department: 'Cardiology', shift: 'Rotating',
        joiningDate: data.joiningDate, salary: data.salary,
    });
});

test('Add Staff - mobile exactly 10 digits (boundary) @staff', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchStaffData();
    await branchPortalPage.addStaff({
        firstName: data.firstName, lastName: data.lastName, dob: data.dob,
        gender: 'Female', bloodGroup: 'AB+', email: data.email, mobile: '9876543210',
        role: 'Receptionist', department: 'Cardiology', shift: 'Rotating',
        joiningDate: data.joiningDate, salary: data.salary,
    });
});

test('Add Staff - mobile 11 digits (above boundary) @staff', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchStaffData();
    await branchPortalPage.addStaff({
        firstName: data.firstName, lastName: data.lastName, dob: data.dob,
        gender: 'Female', bloodGroup: 'AB+', email: data.email, mobile: '98765432101',
        role: 'Receptionist', department: 'Cardiology', shift: 'Rotating',
        joiningDate: data.joiningDate, salary: data.salary,
    });
});

test('Add Staff - invalid email format @staff', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchStaffData();
    await branchPortalPage.addStaff({
        firstName: data.firstName, lastName: data.lastName, dob: data.dob,
        gender: 'Female', bloodGroup: 'AB+', email: 'notanemail', mobile: data.mobile,
        role: 'Receptionist', department: 'Cardiology', shift: 'Rotating',
        joiningDate: data.joiningDate, salary: data.salary,
    });
});

test('Add Staff - email with special characters @staff', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchStaffData();
    await branchPortalPage.addStaff({
        firstName: data.firstName, lastName: data.lastName, dob: data.dob,
        gender: 'Female', bloodGroup: 'AB+', email: 'test@@domain..com', mobile: data.mobile,
        role: 'Receptionist', department: 'Cardiology', shift: 'Rotating',
        joiningDate: data.joiningDate, salary: data.salary,
    });
});

test('Add Staff - first name blank @staff', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchStaffData();
    await branchPortalPage.addStaff({
        firstName: '', lastName: data.lastName, dob: data.dob,
        gender: 'Female', bloodGroup: 'AB+', email: data.email, mobile: data.mobile,
        role: 'Receptionist', department: 'Cardiology', shift: 'Rotating',
        joiningDate: data.joiningDate, salary: data.salary,
    });
});

test('Add Staff - first name with special characters @staff', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchStaffData();
    await branchPortalPage.addStaff({
        firstName: '@#Staff!', lastName: data.lastName, dob: data.dob,
        gender: 'Female', bloodGroup: 'AB+', email: data.email, mobile: data.mobile,
        role: 'Receptionist', department: 'Cardiology', shift: 'Rotating',
        joiningDate: data.joiningDate, salary: data.salary,
    });
});

test('Add Staff - future DOB (invalid) @staff', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchStaffData();
    await branchPortalPage.addStaff({
        firstName: data.firstName, lastName: data.lastName, dob: '2099-01-01',
        gender: 'Female', bloodGroup: 'AB+', email: data.email, mobile: data.mobile,
        role: 'Receptionist', department: 'Cardiology', shift: 'Rotating',
        joiningDate: data.joiningDate, salary: data.salary,
    });
});

test('Add Staff - future joining date @staff', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchStaffData();
    await branchPortalPage.addStaff({
        firstName: data.firstName, lastName: data.lastName, dob: data.dob,
        gender: 'Female', bloodGroup: 'AB+', email: data.email, mobile: data.mobile,
        role: 'Receptionist', department: 'Cardiology', shift: 'Rotating',
        joiningDate: '2099-12-31', salary: data.salary,
    });
});

test('Add Staff - salary as zero (boundary) @staff', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchStaffData();
    await branchPortalPage.addStaff({
        firstName: data.firstName, lastName: data.lastName, dob: data.dob,
        gender: 'Female', bloodGroup: 'AB+', email: data.email, mobile: data.mobile,
        role: 'Receptionist', department: 'Cardiology', shift: 'Rotating',
        joiningDate: data.joiningDate, salary: '0',
    });
});

test('Add Staff - salary as negative value @staff', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchStaffData();
    await branchPortalPage.addStaff({
        firstName: data.firstName, lastName: data.lastName, dob: data.dob,
        gender: 'Female', bloodGroup: 'AB+', email: data.email, mobile: data.mobile,
        role: 'Receptionist', department: 'Cardiology', shift: 'Rotating',
        joiningDate: data.joiningDate, salary: '-5000',
    });
});

test('Add Staff - duplicate submission (same data twice) @staff', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchStaffData();
    const payload = {
        firstName: data.firstName, lastName: data.lastName, dob: data.dob,
        gender: 'Female', bloodGroup: 'AB+', email: data.email, mobile: data.mobile,
        role: 'Receptionist', department: 'Cardiology', shift: 'Rotating',
        joiningDate: data.joiningDate, salary: data.salary,
    };
    await branchPortalPage.addStaff(payload);
    await branchPortalPage.addStaff(payload);
});

// ─── Patients ─────────────────────────────────────────────────────────────────

test('Add Patient - valid data @patient', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchPatientData();
    await branchPortalPage.addPatient({
        firstName: data.firstName, lastName: data.lastName, age: data.age,
        gender: 'Female', bloodGroup: 'B-', email: data.email, mobile: data.mobile,
        aadhar: data.aadhar, source: 'Online-Website', emergencyName: data.emergencyName,
        emergencyMobile: data.emergencyMobile, relation: 'Friend', notes: data.notes,
    });
});

// test('Add Patient - submit empty form (required field validation) @patient', async ({ page }) => {
//     const poManager = new POManagers(page);
//     const branchPortalPage = poManager.BranchPortalPage();
//     await branchPortalPage.submitPatientFormEmpty();
// });

test('Add Patient - submit without consent checkbox @patient', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchPatientData();
    await branchPortalPage.submitPatientFormWithoutConsent({
        firstName: data.firstName, lastName: data.lastName, age: data.age,
        gender: 'Female', bloodGroup: 'B-', email: data.email, mobile: data.mobile,
        aadhar: data.aadhar, source: 'Online-Website', emergencyName: data.emergencyName,
        emergencyMobile: data.emergencyMobile, relation: 'Friend', notes: data.notes,
    });
});

test('Add Patient - mobile 9 digits (below boundary) @patient', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchPatientData();
    await branchPortalPage.addPatient({
        firstName: data.firstName, lastName: data.lastName, age: data.age,
        gender: 'Female', bloodGroup: 'B-', email: data.email, mobile: '987654321',
        aadhar: data.aadhar, source: 'Online-Website', emergencyName: data.emergencyName,
        emergencyMobile: data.emergencyMobile, relation: 'Friend', notes: data.notes,
    });
});

test('Add Patient - mobile exactly 10 digits (boundary) @patient', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchPatientData();
    await branchPortalPage.addPatient({
        firstName: data.firstName, lastName: data.lastName, age: data.age,
        gender: 'Female', bloodGroup: 'B-', email: data.email, mobile: '9876543210',
        aadhar: data.aadhar, source: 'Online-Website', emergencyName: data.emergencyName,
        emergencyMobile: data.emergencyMobile, relation: 'Friend', notes: data.notes,
    });
});

test('Add Patient - mobile 11 digits (above boundary) @patient', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchPatientData();
    await branchPortalPage.addPatient({
        firstName: data.firstName, lastName: data.lastName, age: data.age,
        gender: 'Female', bloodGroup: 'B-', email: data.email, mobile: '98765432101',
        aadhar: data.aadhar, source: 'Online-Website', emergencyName: data.emergencyName,
        emergencyMobile: data.emergencyMobile, relation: 'Friend', notes: data.notes,
    });
});

test('Add Patient - aadhar 11 digits (below boundary) @patient', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchPatientData();
    await branchPortalPage.addPatient({
        firstName: data.firstName, lastName: data.lastName, age: data.age,
        gender: 'Female', bloodGroup: 'B-', email: data.email, mobile: data.mobile,
        aadhar: '12345678901', source: 'Online-Website', emergencyName: data.emergencyName,
        emergencyMobile: data.emergencyMobile, relation: 'Friend', notes: data.notes,
    });
});

test('Add Patient - aadhar exactly 12 digits (boundary) @patient', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchPatientData();
    await branchPortalPage.addPatient({
        firstName: data.firstName, lastName: data.lastName, age: data.age,
        gender: 'Female', bloodGroup: 'B-', email: data.email, mobile: data.mobile,
        aadhar: '123456789012', source: 'Online-Website', emergencyName: data.emergencyName,
        emergencyMobile: data.emergencyMobile, relation: 'Friend', notes: data.notes,
    });
});

test('Add Patient - aadhar 13 digits (above boundary) @patient', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchPatientData();
    await branchPortalPage.addPatient({
        firstName: data.firstName, lastName: data.lastName, age: data.age,
        gender: 'Female', bloodGroup: 'B-', email: data.email, mobile: data.mobile,
        aadhar: '1234567890123', source: 'Online-Website', emergencyName: data.emergencyName,
        emergencyMobile: data.emergencyMobile, relation: 'Friend', notes: data.notes,
    });
});

test('Add Patient - invalid email format @patient', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchPatientData();
    await branchPortalPage.addPatient({
        firstName: data.firstName, lastName: data.lastName, age: data.age,
        gender: 'Female', bloodGroup: 'B-', email: 'notanemail', mobile: data.mobile,
        aadhar: data.aadhar, source: 'Online-Website', emergencyName: data.emergencyName,
        emergencyMobile: data.emergencyMobile, relation: 'Friend', notes: data.notes,
    });
});

test('Add Patient - email with special characters @patient', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchPatientData();
    await branchPortalPage.addPatient({
        firstName: data.firstName, lastName: data.lastName, age: data.age,
        gender: 'Female', bloodGroup: 'B-', email: 'test@@domain..com', mobile: data.mobile,
        aadhar: data.aadhar, source: 'Online-Website', emergencyName: data.emergencyName,
        emergencyMobile: data.emergencyMobile, relation: 'Friend', notes: data.notes,
    });
});

test('Add Patient - first name blank @patient', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchPatientData();
    await branchPortalPage.addPatient({
        firstName: '', lastName: data.lastName, age: data.age,
        gender: 'Female', bloodGroup: 'B-', email: data.email, mobile: data.mobile,
        aadhar: data.aadhar, source: 'Online-Website', emergencyName: data.emergencyName,
        emergencyMobile: data.emergencyMobile, relation: 'Friend', notes: data.notes,
    });
});

test('Add Patient - first name with special characters @patient', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchPatientData();
    await branchPortalPage.addPatient({
        firstName: '@#Pat!', lastName: data.lastName, age: data.age,
        gender: 'Female', bloodGroup: 'B-', email: data.email, mobile: data.mobile,
        aadhar: data.aadhar, source: 'Online-Website', emergencyName: data.emergencyName,
        emergencyMobile: data.emergencyMobile, relation: 'Friend', notes: data.notes,
    });
});

// test('Add Patient - age as zero (boundary) @patient', async ({ page }) => {
//     const poManager = new POManagers(page);
//     const branchPortalPage = poManager.BranchPortalPage();
//     const data = generateBranchPatientData();
//     await branchPortalPage.addPatient({
//         firstName: data.firstName, lastName: data.lastName, age: '0',
//         gender: 'Female', bloodGroup: 'B-', email: data.email, mobile: data.mobile,
//         aadhar: data.aadhar, source: 'Online-Website', emergencyName: data.emergencyName,
//         emergencyMobile: data.emergencyMobile, relation: 'Friend', notes: data.notes,
// // Pause the test to allow manual inspection of the form submission
//     });
// });

// test('Add Patient - age as negative value @patient', async ({ page }) => {
//     const poManager = new POManagers(page);
//     const branchPortalPage = poManager.BranchPortalPage();
//     const data = generateBranchPatientData();
//     await branchPortalPage.addPatient({
//         firstName: data.firstName, lastName: data.lastName, age: '-5',
//         gender: 'Female', bloodGroup: 'B-', email: data.email, mobile: data.mobile,
//         aadhar: data.aadhar, source: 'Online-Website', emergencyName: data.emergencyName,
//         emergencyMobile: data.emergencyMobile, relation: 'Friend', notes: data.notes,
//     });
// });

test('Add Patient - age above max (999) @patient', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchPatientData();
    await branchPortalPage.addPatient({
        firstName: data.firstName, lastName: data.lastName, age: '999',
        gender: 'Female', bloodGroup: 'B-', email: data.email, mobile: data.mobile,
        aadhar: data.aadhar, source: 'Online-Website', emergencyName: data.emergencyName,
        emergencyMobile: data.emergencyMobile, relation: 'Friend', notes: data.notes,
    });
});

test('Add Patient - notes with special characters @patient', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchPatientData();
    await branchPortalPage.addPatient({
        firstName: data.firstName, lastName: data.lastName, age: data.age,
        gender: 'Female', bloodGroup: 'B-', email: data.email, mobile: data.mobile,
        aadhar: data.aadhar, source: 'Online-Website', emergencyName: data.emergencyName,
        emergencyMobile: data.emergencyMobile, relation: 'Friend', notes: '@#$%^&*()_+',
    });
});

test('Add Patient - duplicate submission (same data twice) @patient', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchPatientData();
    const payload = {
        firstName: data.firstName, lastName: data.lastName, age: data.age,
        gender: 'Female', bloodGroup: 'B-', email: data.email, mobile: data.mobile,
        aadhar: data.aadhar, source: 'Online-Website', emergencyName: data.emergencyName,
        emergencyMobile: data.emergencyMobile, relation: 'Friend', notes: data.notes,
    };
    await branchPortalPage.addPatient(payload);
     // await branchPortalPage.addPatient(payload);
});

// ─── Appointments ─────────────────────────────────────────────────────────────

test('Book Appointment - valid data @appt', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    await branchPortalPage.bookAppointment({
        patientText: 'dee', patientName: 'Deepthi K Konchada9346393986 • NE-PAT-26-1',
        type: 'Video Consultation', visitType: 'Follow-Up',
        department: 'Cardiology', specialization: 'Cardiology Specializzation Testt',
        date: getDynamicDate(0), doctorName: 'Dr. Bhaskar A Ainalaa',
        timeSlot: getDynamicTimeSlot(), notes: 'Follow-up consultation',
    });
});

test('Book Appointment - past date (invalid) @appt', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    await branchPortalPage.bookAppointment({
        patientText: 'dee', patientName: 'Deepthi K Konchada9346393986 • NE-PAT-26-1',
        type: 'Video Consultation', visitType: 'Follow-Up',
        department: 'Cardiology ', specialization: 'Cardiology Specializzation',
        date: '2020-01-01', doctorName: 'Dr. Bhaskar A Ainalaa',
        timeSlot: getDynamicTimeSlot(), notes: 'test',
    });
});

test('Book Appointment - today as date (boundary) @appt', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const today = new Date().toISOString().split('T')[0];
    await branchPortalPage.bookAppointment({
        patientText: 'dee', patientName: 'Deepthi K Konchada9346393986 • NE-PAT-26-1',
        type: 'Video Consultation', visitType: 'Follow-Up',
        department: 'Cardiology', specialization: 'Cardiology Specializzation Testt',
        date: today, doctorName: 'Dr. Bhaskar A Ainalaa',
        timeSlot: getDynamicTimeSlot(), notes: 'test',
    });
});

test('Book Appointment - notes blank @appt', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    await branchPortalPage.bookAppointment({
        patientText: 'dee', patientName: 'Deepthi K Konchada9346393986 • NE-PAT-26-1',
        type: 'Video Consultation', visitType: 'Follow-Up',
        department: 'Cardiology', specialization: 'Cardiology Specializzation',
        date: getDynamicDate(0), doctorName: 'Dr. Bhaskar A Ainalaa',
        timeSlot: getDynamicTimeSlot(), notes: '',
    });
});

test('Book Appointment - notes with special characters @appt', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    await branchPortalPage.bookAppointment({
        patientText: 'dee', patientName: 'Deepthi K Konchada9346393986 • NE-PAT-26-1',
        type: 'Video Consultation', visitType: 'Follow-Up',
        department: 'Cardiology', specialization: 'Cardiology Specializzation Testt',
        date: getDynamicDate(0), doctorName: 'Dr. Bhaskar A Ainalaa',
        timeSlot: getDynamicTimeSlot(), notes: '@#$%^&*()',
    });
});

// test('Book Appointment - duplicate booking (same patient same slot) @appt', async ({ page }) => {
//     const poManager = new POManagers(page);
//     const branchPortalPage = poManager.BranchPortalPage();
//     const timeSlot = getDynamicTimeSlot();
//     const payload = {
//         patientText: 'dee', patientName: 'Deepthi Konchada Kk9346393986',
//         type: 'Video Consultation', visitType: 'Follow-Up',
//         department: 'Cardiology', specialization: 'Cardiology Specializzation Testt',
//         date: getDynamicDate(0), doctorName: 'Dr. Bhaskar Ainala K',
//         timeSlot, notes: 'duplicate test',
//     };
//     await branchPortalPage.bookAppointment(payload);
//     await branchPortalPage.bookAppointment(payload);
// });

test('Filter Appointments - valid filters @filterappt', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    await branchPortalPage.filterAppointments({
        searchText: 'deepthi', doctor: 'Dr. Bhaskar A Ainalaa',
        startDate: getDynamicDate(0), endDate: getDynamicDate(0),
    });
});

test('Filter Appointments - blank search (shows all) @filterappt', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    await branchPortalPage.filterAppointments({
        searchText: '', doctor: 'Dr. Bhaskar A Ainala K',
        startDate: getDynamicDate(0), endDate: getDynamicDate(0),
    });
});

test('Filter Appointments - special characters in search @filterappt', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    await branchPortalPage.filterAppointments({
        searchText: '@#$%', doctor: 'Dr. Bhaskar A Ainalaa',
        startDate: getDynamicDate(0), endDate: getDynamicDate(0),
    });
});

test('Filter Appointments - no matching patient @filterappt', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    await branchPortalPage.filterAppointments({
        searchText: 'zzzzzzzzz', doctor: 'Dr. Bhaskar A Ainalaa',
        startDate: getDynamicDate(0), endDate: getDynamicDate(0),
    });
});

// ─── Invoices ─────────────────────────────────────────────────────────────────

test('Create Invoice - valid data @invoice', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchInvoiceData();
    await branchPortalPage.createInvoice({
        patientText: 'deepthi', patientName: 'Deepthi K Konchada',
        serviceDesc: data.serviceDesc, qty: data.qty, price: data.price, discount: data.discount,
    });
});

test('Create Invoice - qty as zero (boundary) @invoice', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    await branchPortalPage.createInvoice({
        patientText: 'deepthi', patientName: 'Deepthi K Konchada',
        serviceDesc: 'video consultation', qty: '0', price: '500', discount: '0',
    });
});

test('Create Invoice - qty as 1 (min valid boundary) @invoice', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    await branchPortalPage.createInvoice({
        patientText: 'deepthi', patientName: 'Deepthi K Konchada',
        serviceDesc: 'video consultation', qty: '1', price: '500', discount: '0',
    });
});

test('Create Invoice - price as zero (boundary) @invoice', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    await branchPortalPage.createInvoice({
        patientText: 'deepthi', patientName: 'Deepthi K Konchada',
        serviceDesc: 'video consultation', qty: '1', price: '0', discount: '0',
    });
});

test('Create Invoice - price as negative value @invoice', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    await branchPortalPage.createInvoice({
        patientText: 'deepthi', patientName: 'Deepthi K Konchada',
        serviceDesc: 'video consultation', qty: '1', price: '-100', discount: '0',
    });
});

test('Create Invoice - discount greater than price @invoice', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    await branchPortalPage.createInvoice({
        patientText: 'deepthi', patientName: 'Deepthi K Konchada',
        serviceDesc: 'video consultation', qty: '1', price: '100', discount: '200',
    });
});

test('Create Invoice - service description blank @invoice', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    await branchPortalPage.createInvoice({
        patientText: 'deepthi', patientName: 'Deepthi K Konchada',
        serviceDesc: '', qty: '1', price: '500', discount: '0',
    });
});

test('Create Invoice - service description with special characters @invoice', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    await branchPortalPage.createInvoice({
        patientText: 'deepthi', patientName: 'Deepthi K Konchada',
        serviceDesc: '@#$%^&*()', qty: '1', price: '500', discount: '0',
    });
});

test('Create Invoice - duplicate submission @invoice', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchInvoiceData();
    const payload = {
        patientText: 'deepthi', patientName: 'Deepthi K Konchada',
        serviceDesc: data.serviceDesc, qty: data.qty, price: data.price, discount: data.discount,
    };
    await branchPortalPage.createInvoice(payload);
    // await branchPortalPage.createInvoice(payload);
});

test('Filter Invoices - valid date range @invoice', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    await branchPortalPage.filterInvoices({
        searchText: 'deep', startDate: getDynamicDate(1), endDate: getDynamicDate(0),
    });
});

test('Filter Invoices - blank search (shows all) @invoice', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    await branchPortalPage.filterInvoices({
        searchText: '', startDate: getDynamicDate(1), endDate: getDynamicDate(0),
    });
});

test('Filter Invoices - special characters in search @invoice', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    await branchPortalPage.filterInvoices({
        searchText: '@#$%', startDate: getDynamicDate(1), endDate: getDynamicDate(0),
    });
});

test('Filter Invoices - no matching search @invoice', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    await branchPortalPage.filterInvoices({
        searchText: 'zzzzzzzzz', startDate: getDynamicDate(1), endDate: getDynamicDate(0),
    });
});

// ─── Payments ─────────────────────────────────────────────────────────────────

test('Filter Payments - blank search (shows all) @payment', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    await branchPortalPage.filterPayments({ searchText: '' });
});

test('Filter Payments - valid search text @payment', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    await branchPortalPage.filterPayments({ searchText: 'PAY' });
});

test('Filter Payments - special characters in search @payment', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    await branchPortalPage.filterPayments({ searchText: '@#$%' });
});

test('Filter Payments - no matching search @payment', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    await branchPortalPage.filterPayments({ searchText: 'zzzzzzzzz' });
});

// ─── Ad-hoc Services ──────────────────────────────────────────────────────────

test('Add Ad-hoc Service - valid data @adhoc', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchAdHocServiceData();
    await branchPortalPage.addAdHocService({
        name: data.name, price: data.price, refPrice: data.refPrice,
        qty: data.qty, expiry: data.expiry, description: data.description, reason: data.reason,
    });
});


test('Add Ad-hoc Service - price as zero (boundary) @adhoc', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchAdHocServiceData();
    await branchPortalPage.addAdHocService({
        name: data.name, price: '0', refPrice: data.refPrice,
        qty: data.qty, expiry: data.expiry, description: data.description, reason: data.reason,
    });
});

test('Add Ad-hoc Service - price as negative value @adhoc', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchAdHocServiceData();
    await branchPortalPage.addAdHocService({
        name: data.name, price: '-100', refPrice: data.refPrice,
        qty: data.qty, expiry: data.expiry, description: data.description, reason: data.reason,
    });
});

test('Add Ad-hoc Service - qty as zero (boundary) @adhoc', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchAdHocServiceData();
    await branchPortalPage.addAdHocService({
        name: data.name, price: data.price, refPrice: data.refPrice,
        qty: '0', expiry: data.expiry, description: data.description, reason: data.reason,
    });
});

test('Add Ad-hoc Service - past expiry date (invalid) @adhoc', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchAdHocServiceData();
    await branchPortalPage.addAdHocService({
        name: data.name, price: data.price, refPrice: data.refPrice,
        qty: data.qty, expiry: '2020-01-01', description: data.description, reason: data.reason,
    });
});

test('Add Ad-hoc Service - today as expiry date (boundary) @adhoc', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchAdHocServiceData();
    const today = new Date().toISOString().split('T')[0];
    await branchPortalPage.addAdHocService({
        name: data.name, price: data.price, refPrice: data.refPrice,
        qty: data.qty, expiry: today, description: data.description, reason: data.reason,
    });
});

test('Add Ad-hoc Service - name blank @adhoc', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchAdHocServiceData();
    await branchPortalPage.addAdHocService({
        name: '', price: data.price, refPrice: data.refPrice,
        qty: data.qty, expiry: data.expiry, description: data.description, reason: data.reason,
    });
});

test('Add Ad-hoc Service - name with special characters @adhoc', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchAdHocServiceData();
    await branchPortalPage.addAdHocService({
        name: '@#Service!', price: data.price, refPrice: data.refPrice,
        qty: data.qty, expiry: data.expiry, description: data.description, reason: data.reason,
    });
});

test('Add Ad-hoc Service - duplicate submission @adhoc', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    const data = generateBranchAdHocServiceData();
    const payload = {
        name: data.name, price: data.price, refPrice: data.refPrice,
        qty: data.qty, expiry: data.expiry, description: data.description, reason: data.reason,
    };
    await branchPortalPage.addAdHocService(payload);
    await branchPortalPage.addAdHocService(payload);
});

test('Filter Ad-hoc Services - valid search @adhoc', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    await branchPortalPage.filterAdHocServices({ searchText: 'dee', status: 'Deleted' });
});


test('Filter Ad-hoc Services - special characters in search @adhoc', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    await branchPortalPage.filterAdHocServices({ searchText: '@#$%', status: 'Deleted' });
});

test('Filter Ad-hoc Services - no matching results @adhoc', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    await branchPortalPage.filterAdHocServices({ searchText: 'zzzzzzzzz', status: 'Deleted' });
});

// ─── Refunds ──────────────────────────────────────────────────────────────────

test('Filter Refunds - valid search @refunds', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    await branchPortalPage.filterRefunds({
        searchText: 'kavya', startDate: getDynamicDate(1), endDate: getDynamicDate(0),
    });
});

test('Filter Refunds - blank search (shows all) @refunds', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    await branchPortalPage.filterRefunds({
        searchText: '', startDate: getDynamicDate(1), endDate: getDynamicDate(0),
    });
});

test('Filter Refunds - special characters in search @refunds', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    await branchPortalPage.filterRefunds({
        searchText: '@#$%', startDate: getDynamicDate(1), endDate: getDynamicDate(0),
    });
});

test('Filter Refunds - no matching search @refunds', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    await branchPortalPage.filterRefunds({
        searchText: 'zzzzzzzzz', startDate: getDynamicDate(1), endDate: getDynamicDate(0),
    });
});

test('Filter Refunds - end date before start date (invalid range) @refunds', async ({ page }) => {
    const poManager = new POManagers(page);
    const branchPortalPage = poManager.BranchPortalPage();
    await branchPortalPage.filterRefunds({
        searchText: '', startDate: '2026-12-31', endDate: '2026-01-01',
    });

});
});