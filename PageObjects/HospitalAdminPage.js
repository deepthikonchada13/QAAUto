const { expect } = require('@playwright/test');
const { TIMEOUT } = require('node:dns');
class HospitalAdminPage {
    constructor(page) {
        this.page = page;
        // this.Department = page.goto('https://myappointments.whitecoats.com/hospital-admin/departments');
        this.Branches = page.getByRole('button', { name: '🏢 Branches ❯' });
        this.deparmentmenu = page.getByRole('button', { name: '🏥 Departments' });
        this.departmentbtn = page.getByRole('button', { name: '➕ Add Department' });
        this.departmentTitle = page.getByRole('textbox', { name: 'e.g., Cardiology Department' });
        this.departmentDescription = page.getByRole('textbox', { name: 'Brief description of the' });
        this.departmentFloor = page.getByRole('textbox', { name: 'e.g., 2nd Floor or Ground' });
        this.savebtn = page.getByRole('button', { name: 'Add Department', exact: true });
        this.Allbranches = page.getByRole('button', { name: '📋 All Branches' });
        this.addbranch = page.locator('button[title="Add new branch"]');
        this.doctormenu = page.getByRole('button', { name: '👨‍⚕️ Doctors' });
        this.Alldoctors = page.getByRole('button', { name: '📋 All Doctors' });
        this.adddoctorbtn = page.getByRole('button', { name: '➕ Add New Doctor' });

        this.speclizationmenu = page.getByRole('button', { name: '🎓 Specializations' });
        this.specialiizationtbn = page.getByRole('button', { name: '➕ Add Specialization' });
        this.addspecilizationbtn = page.getByRole('button', { name: 'Add Specialization', exact: true })
        // this.Speiclization = page.goto('https://myappointments.whitecoats.com/hospital-admin/specializations');
        this.specilizationTitle = page.getByRole('textbox', { name: 'e.g., Cardiology, Neurology,' });
        this.specilizationDescription = page.getByRole('textbox', { name: 'Brief description of the' });
        this.departmdropdwn = page.getByText('Select Department');
        this.departmentvalue = page.getByRole('option', { name: 'Cardiology' });
        // this.CreateBranch = page.goto('https://myappointments.whitecoats.com/hospital-admin/branches');
        this.branchTitle = page.getByRole('textbox', { name: 'e.g., WhiteCoats Central' });
        this.branchDescription = page.getByRole('textbox', { name: 'Brief description of the' });
        this.branchAddress = page.getByRole('textbox', { name: 'Street address' });
        this.branchEmail = page.getByRole('textbox', { name: 'branch@whitecoats.com' });
        this.specilationdrp = page.locator("span:has-text('Select departments...')");
        this.specilationvalue = page.locator("input[type='checkbox']");
        this.specializationDropdown = page.getByText('Select specializations...');
        this.addBranchBtn = page.getByText('Create Branch');
        this.doctorFirstName = page.getByRole('textbox', { name: 'e.g., John' });
        this.doctorLastName = page.getByRole('textbox', { name: 'e.g., Smith' });
        this.doctorDOB = page.getByRole('textbox').nth(3);
        this.Gender = page.getByRole('combobox').filter({ hasText: 'Select Gender' });
        this.genderoption = page.getByRole('option', { name: 'Female' });
        this.doctorEmail = page.getByRole('textbox', { name: 'doctor@whitecoats.com' });
        this.doctorPhone = page.getByRole('textbox', { name: '-digit mobile number' });
        this.doctorCouncilRegistration = page.getByRole('textbox', { name: 'Medical Council registration' });
        this.doctorQualification = page.getByRole('textbox', { name: 'e.g., MBBS' });
        this.branselection = page.getByRole('combobox').filter({ hasText: 'Select Branch' });
        this.branchoption = page.getByRole('option', { name: 'Gatchibowli Main Center' }).last();
        this.departselection = page.getByRole('combobox').filter({ hasText: 'Select Department' });
        this.departoption = page.getByRole('option', { name: 'Cardiology' });
        this.specselection = page.getByRole('combobox').filter({ hasText: 'Select Specialization' });
        this.specaloption = page.getByRole('option', { name: 'Cardiology Specializzation Testt' });
        this.doctorFee = page.getByRole('textbox', { name: 'Fee' });
        this.videocheck = page.getByRole('checkbox', { name: '📹 Video' });
        this.uploadSignature = page.getByText('↑ Upload Signature');
        this.createdoctor = page.getByRole('button', { name: 'Add Doctor' });
        this.doctorschedules = page.getByRole('button', { name: '📅 Schedules' });
        this.addschedule = page.getByRole('button', { name: '➕ Add Schedule' });
        this.docname = page.getByRole('textbox', { name: 'Select or search doctor...' });
        this.docselection = page.locator('div').filter({ hasText: 'Bhaskar A Ainala' }).first();
        this.doctextname = page.getByRole('textbox', { name: 'e.g.,' });
        this.avialaabledate = page.getByRole('button', { name: 'Mon' });
        this.availabledatesss = page.getByRole('button', { name: 'Wed' });
        this.addschedulebtn = page.getByRole('button', { name: 'Create Schedules' });
        this.starttime = page.locator('input[type="time"]');
        // this.endtime = page.getByRole('textbox', { name: 'End Time' });
        this.time = page.locator('input[type="time"]');
        this.staffmenu = page.getByRole('button', { name: '👥 Staff Management ❯' });
        this.staffsubmenu = page.getByRole('button', { name: '📋 All Staff' });
        this.addstaffbtn = page.getByText('➕ Add Staff');
        this.staffFirstName = page.getByRole('textbox', { name: 'e.g., John' });
        this.staffLastName = page.getByRole('textbox', { name: 'e.g., Smith' });
        this.staffDOB = page.getByRole('textbox').nth(5);
        this.gender = page.locator('div[role="combobox"]:has-text("Select Gender")');
        this.genderInput = page.getByText('Male');
        this.bloodtype = page.locator('div[role="combobox"]:has-text("Select Blood Group")');
        this.patientbloodgrp = page.getByRole('combobox').filter({ hasText: 'Select Blood Group (Optional)' });
        this.bloodtypeInput = page.getByRole('option', { name: 'A+' });
        this.role = page.getByRole('combobox').filter({ hasText: 'Select Role' });
        this.roleoption = page.getByRole('option', { name: 'Receptionist' });
        this.dropdownOption = value => page.getByRole('option', { name: value, exact: true }).first();
        this.branchdrpdwn = page.getByText('Select Branch', { exact: true });
        // this.branchoption = page.getByRole('option', { name: 'Geetha - Main Branch' });
        this.departmentdrpdwn = page.getByText('Select Department');
        this.deparmentmenuoption = page.getByRole('option', { name: 'Cardiology' });
        this.shiftdrpdwn = page.getByText('Select Shift');
        this.shiftoption = page.getByRole('option', { name: 'Morning' });
        this.textboxxx = page.locator('input[type="text"]');
        this.createStaffBtn = page.getByRole('button', { name: 'Create Staff' });
        this.staffEmail = page.getByRole('textbox', { name: 'staff@email.com' });
        this.staffPhone = page.getByRole('textbox', { name: '-digit mobile number' });
        this.patientmenu = page.getByRole('button', { name: '👥 Patients' });
        this.Allpatient = page.getByRole('button', { name: 'All Patients' });
        this.addpatientbtn = page.getByRole('button', { name: '➕ Add Patient' });
        this.patientFirstName = page.getByRole('textbox', { name: 'e.g., John' });
        this.patientLastName = page.getByRole('textbox', { name: 'e.g., Smith' });
        this.age = page.getByRole('textbox', { name: 'e.g., 35' })
        this.patientDOB = page.getByRole('textbox').nth(7);
        this.patientEmail = page.getByRole('textbox', { name: 'patient@email.com' });
        this.patientPhone = page.getByRole('textbox', { name: '-digit mobile number' });
        this.patientAadhar = page.getByRole('textbox', { name: 'Aadhar Number' });
        this.patientSource = page.getByText('Select Source');
        this.patientSourceOption = page.getByRole('option', { name: 'Referral' });
        this.patientName = page.getByRole('textbox', { name: 'e.g., Jane Doe' });
        this.patientMobile = page.getByRole('textbox', { name: '-digit mobile number' }).nth(1);
        this.patientRelation = page.getByText('Select Relation');
        this.patientRelationOption = page.getByRole('option', { name: 'Friend' });
        this.patientConsent = page.getByRole('checkbox', { name: 'Patient Consent: I confirm' });
        this.createpatientbtn = page.getByRole('button', { name: 'Add Patient', exact: true })


        this.row1 = page.getByRole('button').filter({ hasText: /^$/ });
        this.edit_dept = page.getByRole('button', { name: 'Edit' });
        this.dept_txt_box = page.getByRole('textbox', { name: 'e.g., Cardiology Department' });
        this.dept_desc = page.getByRole('textbox', { name: 'Brief description of the' });
        this.dept_floor = page.getByRole('textbox', { name: 'e.g., 2nd Floor or Ground' });
        this.dept_update_btn = page.getByRole('button', { name: 'Update Department' });

        this.search_dept = page.getByRole('textbox', { name: 'Search by name, code, or head' });
        this.dept_clear = page.getByRole('button', { name: 'Clear search' });
        this.dept_active = page.getByRole('button', { name: 'Active (9)' });
        this.dept_row = page.getByText('CCardiac IssueDEP-26-1active');
        this.dept_inactive = page.getByRole('button', { name: 'Inactive (1)' });
        this.dept_inactive_row = page.getByText('New Department By Branch LoginDEP-26-3inactive');
        this.dept_row2 = page.locator('.action-menu-trigger').nth(1);
        this.dept_del = page.getByRole('button', { name: 'Delete' });

        this.search_specilization = page.getByRole('textbox', { name: 'Search by name or description' });
        this.clear_specilaitzation = page.getByRole('button', { name: 'Clear search' });
        this.edit_specilization = page.getByRole('button', { name: 'Edit' });
        this.specilaizationtestbox = page.getByRole('textbox', { name: 'e.g., Cardiology, Neurology,' });
        this.specilaizationtestdesc = page.getByText('Cardiac Issue', { exact: true });
        this.update_specilization = page.getByRole('button', { name: 'Update Specialization' });
        this.specilzation_row = page.getByRole('button').filter({ hasText: /^$/ });
        this.delete_speoilization = page.getByRole('button', { name: 'Delete' });


        this.search_branch = page.getByRole('textbox', { name: 'Search branches by name, code' });
        this.edit_branch = page.getByRole('button', { name: '✏️ Edit' }).first();
        this.edit_branch_textbox = page.getByRole('textbox', { name: 'e.g., WhiteCoats Central' });
        this.edit_branch_street = page.getByRole('textbox', { name: 'Street address' });
        this.branch_dept = page.getByRole('button', { name: 'department(s) selected ▼' });
        this.branch_dept_option = page.locator('label').filter({ hasText: 'Cardiology' });
        this.branch_speci = page.getByRole('button', { name: 'specialization(s) selected ▼' });
        this.branch_speci_option = page.getByText('Cardiology Specializzation Testt');
        this.branch_update = page.getByRole('button', { name: 'Update Branch' });


        this.branch_active = page.getByRole('button', { name: 'Active (6)' });
        this.deactive = page.getByTitle('Click to deactivate');
        this.branch_inactive = page.getByRole('button', { name: 'Inactive (1)' });
        this.search_schedule = page.getByRole('textbox', { name: 'Search by doctor name, ID, or' });
        this.search_schedule_clear = page.getByRole('button', { name: 'Clear search' });
        this.search_schedule_status = page.getByRole('combobox').filter({ hasText: 'All Doctors' });
        this.search_schedule_status_option = page.getByRole('option', { name: 'Bhaskar A Ainala' })
        this.search_schedule_filter = page.getByRole('combobox').filter({ hasText: 'All Days' });
        this.search_schedule_filter_option = page.getByRole('option', { name: 'Wednesday' });
        this.allstatus = page.getByRole('button', { name: 'All', exact: true });
        this.allstatus_active = page.getByRole('button', { name: 'Active', exact: true });
        this.allstatus_inactive = page.getByRole('button', { name: 'Inactive' });
        this.allstatus_text = page.getByText('No Schedules Found', { exact: true });

        this.schedule_edit = page.getByRole('button', { name: '✏️' }).nth(1);
        this.schedule_edittext = page.getByRole('button', { name: 'Sat' });
        this.schedule_input = page.locator('.form-input > svg');
        this.consultation = page.getByRole('option', { name: '🏥📹 Both (In-Person & Video)' });
        this.update_shedule = page.getByRole('button', { name: 'Update Schedule' });
        this.delete_scheudule = page.getByRole('button', { name: '🗑️' });




        // await page.getByRole('textbox', { name: 'Search by name, ID, role,' }).fill('deepthi');
        // await page.getByRole('combobox').filter({ hasText: 'All Branches' }).click();


        // this.staff_allbranches = page.getByText('All Branches').click();
        // this.staff_allbranches_option = page.getByRole('option', { name: 'Gatchibowli Main Center' }).click();
        // this.staff_deprt = page.getByText('All Departments', { exact: true }).click();
        // this.staff_deprt_options = page.getByRole('option', { name: 'Cardiac Issue' }).click();
        // this.staff_role = page.getByRole('combobox').filter({ hasText: 'All Roles' }).getByRole('img').click();
        // this.staff_role_option = page.getByRole('option', { name: 'Nurse' }).click();
        // this.staff_start_date = page.getByRole('textbox').nth(1).fill('2026-09-01');
        // this.staff_end_date = page.getByRole('textbox').nth(2).fill('2026-09-17');
        // this.staff_reset = page.getByRole('button', { name: 'Reset Filters' }).click();
        // this.staff_search = page.getByRole('textbox', { name: 'Search by name, ID, email, or' }).fill('deepthi');
        // this.staff_search_clear = page.getByRole('button', { name: 'Clear search' }).click();
        // this.staff_status2 = page.getByText('All Status').click();
        // this.staff_status_inactive = page.getByRole('option', { name: 'Inactive' }).click();
        // this.staff_gender = page.getByRole('combobox').filter({ hasText: 'All Genders' });
        // this.staff_gender_female = page.getByRole('option', { name: 'Female' });
        // this.staff_gender_female_text = page.getByText('Female');
        // this.staff_gender_all = page.getByRole('option', { name: 'All Genders' });
        // this.staff_blood_group = page.getByRole('combobox').filter({ hasText: 'All Blood Groups' });
        // this.staff_blood_group_bplus = page.getByRole('option', { name: 'B+', exact: true });
        // this.staff_blood_group_bplus_selected = page.getByRole('combobox').filter({ hasText: 'B+' });
        // this.staff_blood_group_all = page.getByRole('option', { name: 'All Blood Groups' });
        // this.staff_page2 = page.getByRole('button', { name: '2', exact: true });
        // this.staff_page3 = page.getByRole('button', { name: '3' });
        // this.staff_next_page = page.getByRole('button', { name: 'Next page' });
        // this.staff_prev_page = page.getByRole('button', { name: 'Previous page' });



        this.apptmenu = page.getByRole('navigation').getByRole('button', { name: '📅 Appointments' });
        this.appt_search_btn = page.getByRole('textbox', { name: 'Search by ID, patient, doctor' });
        this.appt_patient_search = page.getByRole('textbox', { name: 'Search by name, phone, or' });
        this.appt_patient_result = page.getByText('PAT-26-1');
        this.appt_cancel_btn = page.getByRole('button', { name: 'Clear search' });
        this.appt_book_btn = page.getByRole('button', { name: '+ Book Appointment' });
        this.appt_patient_result_full = page.getByText('Deepthi K Konchada 9346393986');
        this.appt_next_details_btn = page.getByRole('button', { name: 'Next: Appointment Details' });
        this.appt_branch_select = page.locator('select.branch-selector');
        this.appts_branch_option = page.getByRole('option', { name: 'Gatchibowli Main Center' });
        this.appt_type_dropdown = page.getByRole('combobox').filter({ hasText: 'In-Person Visit' });
        this.appt_type_video = page.getByRole('option', { name: 'Video Consultation' });
        this.appt_visit_type_dropdown = page.getByRole('combobox').filter({ hasText: 'Regular' });
        this.appt_visit_type_first = page.getByRole('option', { name: 'First Consult' });
        this.appt_dept_dropdown = page.getByRole('combobox').filter({ hasText: 'Select Department' });
        this.appt_dept_option = page.getByRole('option', { name: 'Cardiac Issue' });
        this.appt_date = page.locator('input[type="date"]');
        this.appt_doctor_search = page.getByRole('textbox', { name: 'Select or search doctor...' });
        this.appt_doctor_option = page.getByText('Dr. Bhaskar Ainala');
        this.appt_time_slot = page.locator('button[type="button"]:not([disabled])').filter({ hasText: /^\d{2}:\d{2}$/ }).first();
        this.appt_notes = page.getByRole('textbox', { name: 'Brief description of the' });
        this.appt_next_review_btn = page.getByRole('button', { name: 'Next: Review' });
        this.appt_proceed_payment_btn = page.getByRole('button', { name: 'Proceed to Payment' });
        this.appt_share_payment_btn = page.getByRole('button', { name: 'Share Payment Link (SMS)' });
        this.appt_list_search = page.getByRole('textbox', { name: 'Search by ID, patient, doctor' });
        this.appt_list_clear = page.getByRole('button', { name: 'Clear search' });
        this.appt_status_dropdown = page.getByText('All Status');
        this.appt_status_confirmed = page.getByRole('option', { name: 'Confirmed' });
        this.appt_status_confirmed_selected = page.getByRole('combobox').filter({ hasText: 'Confirmed' });
        this.appt_status_scheduled = page.getByRole('option', { name: 'Scheduled' });
        this.appt_status_scheduled_selected = page.getByRole('combobox').filter({ hasText: 'Scheduled' });
        this.appt_status_completed = page.getByRole('option', { name: 'Completed' });
        this.appt_status_completed_selected = page.getByRole('combobox').filter({ hasText: 'Completed' });
        this.appt_status_all = page.getByRole('option', { name: 'All Status' });
        this.appt_type_filter = page.getByRole('combobox').filter({ hasText: 'All Types' });
        this.appt_type_inperson = page.getByRole('option', { name: 'In-Person' });
        this.appt_type_inperson_selected = page.getByRole('combobox').filter({ hasText: 'In-Person' });
        this.appt_type_video_option = page.getByRole('option', { name: 'Video' });
        this.appt_type_video_selected = page.getByRole('combobox').filter({ hasText: 'Video' });
        this.appt_type_all = page.getByRole('option', { name: 'All Types' });
        this.appt_branch_filter = page.getByRole('combobox').filter({ hasText: 'All Branches' });
        this.appt_branch_root_text = page.locator('#root').getByText('All Branches');
        this.appt_branch_gatch = page.getByRole('option', { name: 'Gatchibowli Main Center' });
        this.appt_branch_gatch_selected = page.getByRole('combobox').filter({ hasText: 'Gatchibowli Main Center' });
        this.appt_branch_all = page.getByRole('option', { name: 'All Branches' });
        this.appt_doctor_filter = page.getByRole('combobox').filter({ hasText: 'All Doctors' });
        this.appt_doctor_bhaskar = page.getByRole('option', { name: 'Bhaskar Ainala' });
        this.appt_doctor_bhaskar_selected = page.getByRole('combobox').filter({ hasText: 'Bhaskar Ainala' });
        this.appt_doctor_all = page.getByRole('option', { name: 'All Doctors' });
        this.appt_start_date = page.getByRole('textbox').nth(1);
        this.appt_end_date = page.getByRole('textbox').nth(2);
        this.appt_reset_filters = page.getByRole('button', { name: 'Reset Filters' });
        this.appt_page2 = page.getByRole('button', { name: '2' });
        this.appt_page3 = page.getByRole('button', { name: '3', exact: true });
        this.appt_next_page = page.getByRole('button', { name: 'Next page' });
        this.appt_prev_page = page.getByRole('button', { name: 'Previous page' });

        this.invoice_search = page.getByRole('textbox', { name: 'Search by invoice ID, patient' });
        this.invoice_clear = page.getByRole('button', { name: 'Clear search' });
        this.invoice_status_dropdown = page.getByRole('combobox').filter({ hasText: 'All Status' });
        this.invoice_status_paid = page.getByRole('option', { name: 'Paid' });
        this.invoice_status_paid_selected = page.getByRole('combobox').filter({ hasText: 'Paid' });
        this.invoice_status_all = page.getByRole('option', { name: 'All Status' });
        this.invoice_branch_dropdown = page.getByRole('combobox').filter({ hasText: 'All Branches' });
        this.invoice_branch_gatch = page.getByRole('option', { name: 'Gatchibowli Main Center' });
        this.invoice_branch_gatch_selected = page.getByRole('combobox').filter({ hasText: 'Gatchibowli Main Center' });
        this.invoice_branch_sunrise = page.getByRole('option', { name: 'Sunrise Multi Specialty' });
        this.invoice_branch_sunrise_selected = page.getByRole('combobox').filter({ hasText: 'Sunrise Multi Specialty' });
        this.invoice_branch_all = page.getByRole('option', { name: 'All Branches' });
        this.invoice_start_date = page.getByRole('textbox').nth(1);
        this.invoice_end_date = page.getByRole('textbox').nth(2);
        this.invoice_reset_filters = page.getByRole('button', { name: 'Reset Filters' });
        this.invoice_page2 = page.getByRole('button', { name: '2', exact: true });
        this.invoice_page3 = page.getByRole('button', { name: '3', exact: true });
        this.invoice_next_page = page.getByRole('button', { name: 'Next page' });
        this.invoice_prev_page = page.getByRole('button', { name: 'Previous page' });

        this.payment_menu = page.getByRole('button', { name: '💳 Payments' });
        this.payment_reset_filters = page.getByRole('button', { name: 'Reset Filters' });
        this.payment_search = page.getByRole('textbox', { name: 'Search by payment ID, invoice' });
        this.payment_clear = page.getByRole('button', { name: 'Clear search' });
        this.payment_status_dropdown = page.getByRole('combobox').filter({ hasText: 'All Status' });
        this.payment_status_completed = page.getByRole('option', { name: 'Completed' });
        this.payment_status_completed_selected = page.getByRole('combobox').filter({ hasText: 'Completed' });
        this.payment_status_failed = page.getByRole('option', { name: 'Failed' });
        this.payment_status_failed_selected = page.getByRole('combobox').filter({ hasText: 'Failed' });
        this.payment_status_all = page.getByRole('option', { name: 'All Status' });
        this.payment_method_dropdown = page.getByRole('combobox').filter({ hasText: 'All Methods' });
        this.payment_method_credit = page.getByRole('option', { name: 'Credit Card' });
        this.payment_method_credit_selected = page.getByRole('combobox').filter({ hasText: 'Credit Card' });
        this.payment_method_upi = page.getByRole('option', { name: 'UPI' });
        this.payment_method_upi_selected = page.getByRole('combobox').filter({ hasText: 'UPI' });
        this.payment_method_all = page.getByRole('option', { name: 'All Methods' });
        this.payment_branch_dropdown = page.getByRole('combobox').filter({ hasText: 'All Branches' });
        this.payment_branch_gatch = page.getByRole('option', { name: 'Gatchibowli Main Center' });
        this.payment_branch_gatch_selected = page.getByRole('combobox').filter({ hasText: 'Gatchibowli Main Center' });
        this.payment_branch_ayuman = page.getByRole('option', { name: 'Ayuman Hospitals' });
        this.payment_branch_ayuman_selected = page.getByRole('combobox').filter({ hasText: 'Ayuman Hospitals' });
        this.payment_branch_all = page.getByRole('option', { name: 'All Branches' });
        this.payment_start_date = page.getByRole('textbox').nth(1);
        this.payment_end_date = page.getByRole('textbox').nth(2);
        this.payment_page2 = page.getByRole('button', { name: '2' });
        this.payment_next_page = page.getByRole('button', { name: 'Next page' });
        this.payment_prev_page = page.getByRole('button', { name: 'Previous page' });

        this.bilingMenu = page.getByRole('button', { name: '💰 Billing ❯' });
        this.coupon_menu = page.getByRole('button', { name: '🎟️ Coupons' });
        this.coupon_add_btn = page.getByRole('button', { name: '➕ Add Coupon' });
        this.coupon_name = page.getByRole('textbox', { name: 'e.g., 10% Discount' });
        this.coupon_code = page.getByRole('textbox', { name: 'e.g., SAVE10' });
        this.coupon_type_dropdown = page.getByRole('combobox').filter({ hasText: 'Percentage Discount' });
        this.coupon_type_option = page.getByRole('option', { name: 'Medical Camp (Free' });
        this.coupon_start_date = page.getByRole('textbox').nth(3);
        this.coupon_end_date = page.getByRole('textbox').nth(4);
        this.coupon_usage_limit = page.getByRole('spinbutton', { name: 'Unlimited' });
        this.coupon_discount_value = page.getByRole('spinbutton').nth(1);
        this.coupon_save_btn = page.getByRole('button', { name: 'Add Coupon', exact: true });
        this.coupon_row_btn = page.getByRole('button').filter({ hasText: /^$/ });
        this.coupon_edit_btn = page.getByRole('button', { name: 'Edit' });
        this.coupon_update_btn = page.getByRole('button', { name: 'Update Coupon' });
        this.coupon_search = page.getByRole('textbox', { name: 'Search by name or code...' });
        this.coupon_search_clear = page.getByRole('button', { name: 'Clear search' });
        this.coupon_campaign_dropdown = page.getByText('All Campaigns');
        this.coupon_campaign_none = page.getByRole('option', { name: 'No Campaign' });
        this.coupon_campaign_none_selected = page.getByRole('combobox').filter({ hasText: 'No Campaign' });
        this.coupon_campaign_all = page.getByRole('option', { name: 'All Campaigns' });

        this.adhoc_menu = page.getByRole('button', { name: '🧾 Ad-hoc Services' });
        this.adhoc_add_btn = page.getByRole('button', { name: '➕ Add Service' });
        this.adhoc_name = page.getByRole('textbox', { name: 'e.g. Monsoon Fever' });
        this.adhoc_service_type_label = page.getByText('Service Type *Ad-hocSeasonalPromotionalNew Service (trial)OtherBilling Price');
        this.adhoc_service_type = page.getByRole('combobox').nth(2);
        this.adhoc_billing_price = page.getByRole('spinbutton').first();
        this.adhoc_ref_price = page.getByRole('spinbutton', { name: 'Optional reference price' });
        this.adhoc_visibility = page.getByRole('combobox').nth(3);
        this.adhoc_quantity = page.getByRole('spinbutton').nth(2);
        this.adhoc_expiry_date = page.getByRole('textbox').nth(3);
        this.adhoc_notes = page.locator('textarea');
        this.adhoc_save_btn = page.getByRole('button', { name: 'Add & Use in Bill' });
        this.adhoc_row_btn = page.getByRole('button').filter({ hasText: /^$/ });
        this.adhoc_edit_btn = page.getByRole('button', { name: 'Edit' });
        this.adhoc_update_btn = page.getByRole('button', { name: 'Save Changes' });
        this.adhoc_search = page.getByRole('textbox', { name: 'Search by name or code...' });
        this.adhoc_search_clear = page.getByRole('button', { name: 'Clear search' });
        this.adhoc_status_dropdown = page.getByText('All Statuses');
        this.adhoc_status_deleted = page.getByRole('option', { name: 'Deleted' });
        this.adhoc_status_deleted_text = page.getByText('Deleted').first();
        this.enableNotificationsbtn = page.getByRole('button', { name: 'Enable Notifications' });

        // Create Invoice locators
        this.invoicesSubmenu = page.getByRole('button', { name: '📄 Invoices' });
        this.createInvoiceBtn = page.getByRole('button', { name: '+ Create Invoice' });
        this.invoiceBranchSelect = page.locator('select');
        this.invoicePatientDropdown = page.getByRole('combobox').filter({ hasText: 'Select Patient' });
        this.invoicePatientOption = page.getByRole('option', { name: 'Deepthi K Konchada - 9346393986 - NE-PAT-26-1' });
        this.invoiceServiceDesc = page.getByRole('textbox', { name: 'e.g., Consultation' });
        this.invoiceQty = page.locator('input[type="text"]').nth(2);
        this.invoiceUnitPrice = page.locator('input[type="text"]').nth(3);
        this.invoiceDiscount = page.locator('div:nth-child(6) > div > .form-input');
        this.invoiceNotes = page.getByRole('textbox', { name: 'Additional notes...' });
        this.invoiceSubmitBtn = page.getByRole('button', { name: 'Create Invoice', exact: true });

    }


    async CreateDepartment(departmentTitle, departmentDescription, departmentFloor) {
        {
            await this.enableNotificationsbtn.click();
            await this.Branches.click();
            await this.deparmentmenu.click();
            await this.departmentbtn.click();
            await this.departmentTitle.fill(departmentTitle);
            await this.departmentDescription.fill(departmentDescription);
            await this.departmentFloor.fill(departmentFloor);
            await this.savebtn.click();
            this.page.once('dialog', dialog => {
                console.log(`Dialog message: ${dialog.message()}`);
                dialog.dismiss().catch(() => { });
            });
        }
    }

    async Createspecialization(specializationTitle, specializationDescription) {

        await this.enableNotificationsbtn.click();
        await this.doctormenu.click();
        await this.speclizationmenu.click();
        await this.specialiizationtbn.click();
        await this.specilizationTitle.fill(specializationTitle);
        // await this.specilizationDescription.fill(specializationDescription);
        // await this.page.pause();
        await this.departmdropdwn.click();
        await this.departmentvalue.first().click();
        await this.specilizationDescription.fill(specializationDescription);
        await this.addspecilizationbtn.click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });

    }

    async CreateBranch(BranchName, BranchAddress, BranchEmail) {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.Allbranches.click();
        await this.addbranch.first().click();
        await this.branchTitle.fill(BranchName);
        await this.branchAddress.fill(BranchAddress);
        // await this.branchDescription.fill('Test');
        await this.branchEmail.fill(BranchEmail);
        //  await this.page.pause();
        await this.specilationdrp.click();
        await this.specilationvalue.first().click();
        await this.specializationDropdown.click();
        await this.specilationvalue.first().click();
        await this.addBranchBtn.click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });

    }

    async createDoctor(docname, lasname, dob, email, ph, regnum, qual, inperfee, vidfee) {
        await this.enableNotificationsbtn.click();
        await this.doctormenu.click();
        await this.Alldoctors.click();
        // await this.page.pause();
        await this.adddoctorbtn.click();
        await this.doctorFirstName.fill(docname);
        await this.doctorLastName.fill(lasname);
        await this.doctorDOB.fill(dob);
        await this.Gender.click();
        await this.genderoption.first().click();
        await this.doctorEmail.fill(email);
        await this.doctorPhone.fill(ph);
        await this.doctorCouncilRegistration.fill(regnum);
        await this.doctorQualification.fill(qual);
        await this.branselection.click();
        await this.branchoption.click();
        await this.departselection.first().click();
        await this.departoption.click();
        await this.specselection.first().click();
        await this.specaloption.click();
        await this.doctorFee.fill(inperfee);
        await this.videocheck.click();
        await this.doctorFee.nth(1).fill(vidfee);
        await this.uploadSignature.setInputFiles('C:\\Users\\DeepthiKonchada\\OneDrive - ValueMomentum, Inc\\Pictures\\Patinent issue.png');
        await this.createdoctor.click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });
    }

    async scheduleDoctor(docname, starttime, endtime) {
        await this.enableNotificationsbtn.click();
        await this.doctormenu.click({ TIMEOUT: 2000 });
        await this.doctorschedules.click();
        await this.addschedule.click();
        // await this.page.pause();
        await this.docname.click();
        await this.docselection.click();
        // await this.addschedule.click();
        await this.doctextname.fill('sammmmmdsf');
        await this.avialaabledate.click();
        await this.availabledatesss.click();
        await this.time.first().fill('10:00');
        await this.time.nth(1).first().fill('22:00');
        await this.addschedulebtn.click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });
    }

    async createStaff(fname, lname, dob, email, ph, sal) {
        await this.enableNotificationsbtn.click();
        await this.staffmenu.click();
        await this.staffsubmenu.click();
        await this.addstaffbtn.click();
        await this.staffFirstName.fill(fname);
        await this.staffLastName.fill(lname);
        await this.staffDOB.fill(dob);
        // await this.page.pause();
        await this.gender.first().click();
        await this.genderInput.first().click();
        await this.bloodtype.click();
        await this.bloodtypeInput.first().click();
        await this.staffEmail.fill(email);
        await this.staffPhone.fill(ph);
        await this.role.click();
        await this.roleoption.first().click();
        await this.branchdrpdwn.click();
        await this.branchoption.click();
        await this.departmentdrpdwn.click();
        await this.deparmentmenuoption.click();
        await this.shiftdrpdwn.click();
        await this.shiftoption.click();
        await this.textboxxx.nth(4).fill(sal);
        await this.createStaffBtn.click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });
    }

    async createDepartmentWithoutTitle(departmentDescription, departmentFloor) {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.deparmentmenu.click();
        await this.departmentbtn.click();
        await this.departmentDescription.fill(departmentDescription);
        await this.departmentFloor.fill(departmentFloor);
        await this.savebtn.click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });

    }

    // ── CreateDepartment negative scenario helpers ──

    async createDepartmentWithInvalidTitle(title, description, floor) {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.deparmentmenu.click();
        await this.departmentbtn.click();
        await this.departmentTitle.fill(title);
        await this.departmentDescription.fill(description);
        await this.departmentFloor.fill(floor);
        await this.savebtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async createDepartmentWithEmptyDescription(title, floor) {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.deparmentmenu.click();
        await this.departmentbtn.click();
        await this.departmentTitle.fill(title);
        await this.departmentFloor.fill(floor);
        await this.savebtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async createDepartmentWithMaxLengthTitle(description, floor) {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.deparmentmenu.click();
        await this.departmentbtn.click();
        await this.departmentTitle.fill('a'.repeat(500));
        await this.departmentDescription.fill(description);
        await this.departmentFloor.fill(floor);
        await this.savebtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async createDepartmentWithMinLengthTitle(description, floor) {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.deparmentmenu.click();
        await this.departmentbtn.click();
        await this.departmentTitle.fill('a');
        await this.departmentDescription.fill(description);
        await this.departmentFloor.fill(floor);
        await this.savebtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async createDepartmentAndRefresh(title, description, floor) {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.deparmentmenu.click();
        await this.departmentbtn.click();
        await this.departmentTitle.fill(title);
        await this.departmentDescription.fill(description);
        await this.departmentFloor.fill(floor);
        await this.page.reload();
    }

    async createDepartmentAndNavigateBack(title, description, floor) {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.deparmentmenu.click();
        await this.departmentbtn.click();
        await this.departmentTitle.fill(title);
        await this.departmentDescription.fill(description);
        await this.departmentFloor.fill(floor);
        await this.page.goBack();
    }

    async createSpecializationWithoutTitle(specializationDescription) {
        await this.enableNotificationsbtn.click();
        await this.doctormenu.click();
        await this.speclizationmenu.click();
        await this.specialiizationtbn.click();
        await this.departmdropdwn.click();
        await this.departmentvalue.click();
        await this.specilizationDescription.fill(specializationDescription);
        await this.addspecilizationbtn.click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });
    }

    // ── Createspecialization negative scenario helpers ──

    async createSpecializationWithInvalidTitle(title, description) {
        await this.enableNotificationsbtn.click();
        await this.doctormenu.click();
        await this.speclizationmenu.click();
        await this.specialiizationtbn.click();
        await this.specilizationTitle.fill(title);
        await this.departmdropdwn.click();
        await this.departmentvalue.click();
        await this.specilizationDescription.fill(description);
        await this.addspecilizationbtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async createSpecializationWithEmptyDescription(title) {
        await this.enableNotificationsbtn.click();
        await this.doctormenu.click();
        await this.speclizationmenu.click();
        await this.specialiizationtbn.click();
        await this.specilizationTitle.fill(title);
        await this.departmdropdwn.click();
        await this.departmentvalue.click();
        await this.addspecilizationbtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async createSpecializationWithoutDepartment(title, description) {
        await this.enableNotificationsbtn.click();
        await this.doctormenu.click();
        await this.speclizationmenu.click();
        await this.specialiizationtbn.click();
        await this.specilizationTitle.fill(title);
        await this.specilizationDescription.fill(description);
        await this.addspecilizationbtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async createSpecializationWithMaxLengthTitle(description) {
        await this.enableNotificationsbtn.click();
        await this.doctormenu.click();
        await this.speclizationmenu.click();
        await this.specialiizationtbn.click();
        await this.specilizationTitle.fill('a'.repeat(500));
        await this.departmdropdwn.click();
        await this.departmentvalue.click();
        await this.specilizationDescription.fill(description);
        await this.addspecilizationbtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async createSpecializationWithMinLengthTitle(description) {
        await this.enableNotificationsbtn.click();
        await this.doctormenu.click();
        await this.speclizationmenu.click();
        await this.specialiizationtbn.click();
        await this.specilizationTitle.fill('a');
        await this.departmdropdwn.click();
        await this.departmentvalue.click();
        await this.specilizationDescription.fill(description);
        await this.addspecilizationbtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async createSpecializationAndRefresh(title, description) {
        await this.enableNotificationsbtn.click();
        await this.doctormenu.click();
        await this.speclizationmenu.click();
        await this.specialiizationtbn.click();
        await this.specilizationTitle.fill(title);
        await this.departmdropdwn.click();
        await this.departmentvalue.click();
        await this.specilizationDescription.fill(description);
        await this.page.reload();
    }

    async createSpecializationAndNavigateBack(title, description) {
        await this.enableNotificationsbtn.click();
        await this.doctormenu.click();
        await this.speclizationmenu.click();
        await this.specialiizationtbn.click();
        await this.specilizationTitle.fill(title);
        await this.departmdropdwn.click();
        await this.departmentvalue.click();
        await this.specilizationDescription.fill(description);
        await this.page.goBack();
    }

    async createBranchWithoutName(BranchAddress, BranchEmail) {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.Allbranches.click();
        await this.addbranch.click();
        await this.branchAddress.fill(BranchAddress);
        await this.branchEmail.fill(BranchEmail);
        await this.specilationdrp.click();
        await this.specilationvalue.first().click();
        await this.specializationDropdown.click();
        await this.specilationvalue.first().click();
        await this.addBranchBtn.click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });
    }

    // ── CreateBranch negative scenario helpers ──

    async createBranchWithInvalidName(name, address, email) {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.Allbranches.click();
        await this.addbranch.first().click();
        await this.branchTitle.fill(name);
        await this.branchAddress.fill(address);
        await this.branchEmail.fill(email);
        await this.specilationdrp.click();
        await this.specilationvalue.first().click();
        await this.specializationDropdown.click();
        await this.specilationvalue.first().click();
        await this.addBranchBtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async createBranchWithInvalidEmail(name, address, email) {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.Allbranches.click();
        await this.addbranch.first().click();
        await this.branchTitle.fill(name);
        await this.branchAddress.fill(address);
        await this.branchEmail.fill(email);
        await this.specilationdrp.click();
        await this.specilationvalue.first().click();
        await this.specializationDropdown.click();
        await this.specilationvalue.first().click();
        await this.addBranchBtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async createBranchWithEmptyAddress(name, email) {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.Allbranches.click();
        await this.addbranch.first().click();
        await this.branchTitle.fill(name);
        await this.branchEmail.fill(email);
        await this.specilationdrp.click();
        await this.specilationvalue.first().click();
        await this.specializationDropdown.click();
        await this.specilationvalue.first().click();
        await this.addBranchBtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async createBranchWithMaxLengthName(address, email) {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.Allbranches.click();
        await this.addbranch.first().click();
        await this.branchTitle.fill('a'.repeat(500));
        await this.branchAddress.fill(address);
        await this.branchEmail.fill(email);
        await this.specilationdrp.click();
        await this.specilationvalue.first().click();
        await this.specializationDropdown.click();
        await this.specilationvalue.first().click();
        await this.addBranchBtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async createBranchWithMinLengthName(address, email) {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.Allbranches.click();
        await this.addbranch.first().click();
        await this.branchTitle.fill('a');
        await this.branchAddress.fill(address);
        await this.branchEmail.fill(email);
        await this.specilationdrp.click();
        await this.specilationvalue.first().click();
        await this.specializationDropdown.click();
        await this.specilationvalue.first().click();
        await this.addBranchBtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async createBranchAndRefresh(name, address, email) {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.Allbranches.click();
        await this.addbranch.first().click();
        await this.branchTitle.fill(name);
        await this.branchAddress.fill(address);
        await this.branchEmail.fill(email);
        await this.page.reload();
    }

    async createBranchAndNavigateBack(name, address, email) {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.Allbranches.click();
        await this.addbranch.first().click();
        await this.branchTitle.fill(name);
        await this.branchAddress.fill(address);
        await this.branchEmail.fill(email);
        await this.page.goBack();
    }

    // ── createDoctor negative scenario helpers ──

    async createDoctorWithInvalidEmail(docname, lasname, dob, ph, regnum, qual, inperfee, vidfee) {
        await this.enableNotificationsbtn.click();
        await this.doctormenu.click();
        await this.Alldoctors.click();
        await this.adddoctorbtn.click();
        await this.doctorFirstName.fill(docname);
        await this.doctorLastName.fill(lasname);
        await this.doctorDOB.fill(dob);
        await this.Gender.click();
        await this.genderoption.click();
        await this.doctorEmail.fill('notanemail');
        await this.doctorPhone.fill(ph);
        await this.doctorCouncilRegistration.fill(regnum);
        await this.doctorQualification.fill(qual);
        await this.branselection.click();
        await this.branchoption.click();
        await this.departselection.first().click();
        await this.departoption.click();
        await this.specselection.first().click();
        await this.specaloption.click();
        await this.doctorFee.fill(inperfee);
        await this.videocheck.click();
        await this.doctorFee.nth(1).fill(vidfee);
        await this.createdoctor.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async createDoctorWithMaxLengthName(lasname, dob, email, ph, regnum, qual, inperfee, vidfee) {
        await this.enableNotificationsbtn.click();
        await this.doctormenu.click();
        await this.Alldoctors.click();
        await this.adddoctorbtn.click();
        await this.doctorFirstName.fill('a'.repeat(500));
        await this.doctorLastName.fill(lasname);
        await this.doctorDOB.fill(dob);
        await this.Gender.click();
        await this.genderoption.click();
        await this.doctorEmail.fill(email);
        await this.doctorPhone.fill(ph);
        await this.doctorCouncilRegistration.fill(regnum);
        await this.doctorQualification.fill(qual);
        await this.branselection.click();
        await this.branchoption.click();
        await this.departselection.first().click();
        await this.departoption.click();
        await this.specselection.first().click();
        await this.specaloption.click();
        await this.doctorFee.fill(inperfee);
        await this.videocheck.click();
        await this.doctorFee.nth(1).fill(vidfee);
        await this.createdoctor.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async createDoctorWithMinLengthName(lasname, dob, email, ph, regnum, qual, inperfee, vidfee) {
        await this.enableNotificationsbtn.click();
        await this.doctormenu.click();
        await this.Alldoctors.click();
        await this.adddoctorbtn.click();
        await this.doctorFirstName.fill('a');
        await this.doctorLastName.fill(lasname);
        await this.doctorDOB.fill(dob);
        await this.Gender.click();
        await this.genderoption.click();
        await this.doctorEmail.fill(email);
        await this.doctorPhone.fill(ph);
        await this.doctorCouncilRegistration.fill(regnum);
        await this.doctorQualification.fill(qual);
        await this.branselection.click();
        await this.branchoption.click();
        await this.departselection.first().click();
        await this.departoption.click();
        await this.specselection.first().click();
        await this.specaloption.click();
        await this.doctorFee.fill(inperfee);
        await this.videocheck.click();
        await this.doctorFee.nth(1).fill(vidfee);
        await this.createdoctor.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async createDoctorAndRefresh(docname, lasname, dob, email, ph, regnum, qual, inperfee, vidfee) {
        await this.enableNotificationsbtn.click();
        await this.doctormenu.click();
        await this.Alldoctors.click();
        await this.adddoctorbtn.click();
        await this.doctorFirstName.fill(docname);
        await this.doctorLastName.fill(lasname);
        await this.doctorDOB.fill(dob);
        await this.Gender.click();
        await this.genderoption.click();
        await this.doctorEmail.fill(email);
        await this.doctorPhone.fill(ph);
        await this.page.reload();
    }

    async createDoctorAndNavigateBack(docname, lasname, dob, email, ph, regnum, qual, inperfee, vidfee) {
        await this.enableNotificationsbtn.click();
        await this.doctormenu.click();
        await this.Alldoctors.click();
        await this.adddoctorbtn.click();
        await this.doctorFirstName.fill(docname);
        await this.doctorLastName.fill(lasname);
        await this.doctorDOB.fill(dob);
        await this.Gender.click();
        await this.genderoption.click();
        await this.doctorEmail.fill(email);
        await this.doctorPhone.fill(ph);
        await this.page.goBack();
    }

    async createDoctorWithoutEmail(docname, lasname, dob, ph, regnum, qual, inperfee, vidfee) {
        await this.enableNotificationsbtn.click();
        await this.doctormenu.click();
        await this.Alldoctors.click();
        await this.adddoctorbtn.click();
        await this.doctorFirstName.fill(docname);
        await this.doctorLastName.fill(lasname);
        await this.doctorDOB.fill(dob);
        await this.Gender.click();
        await this.genderoption.click();
        await this.doctorPhone.fill(ph);
        await this.doctorCouncilRegistration.fill(regnum);
        await this.doctorQualification.fill(qual);
        await this.branselection.click();
        await this.branchoption.click();
        await this.departselection.first().click();
        await this.departoption.click();
        await this.specselection.first().click();
        await this.specaloption.click();
        await this.doctorFee.fill(inperfee);
        await this.videocheck.click();
        await this.doctorFee.nth(1).fill(vidfee);
        await this.createdoctor.click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });

    }

    async createDoctorWithoutPhone(docname, lasname, dob, email, regnum, qual, inperfee, vidfee) {
        await this.enableNotificationsbtn.click();
        await this.doctormenu.click();
        await this.Alldoctors.click();
        await this.adddoctorbtn.click();
        await this.doctorFirstName.fill(docname);
        await this.doctorLastName.fill(lasname);
        await this.doctorDOB.fill(dob);
        await this.Gender.click();
        await this.genderoption.click();
        await this.doctorEmail.fill(email);
        await this.doctorCouncilRegistration.fill(regnum);
        await this.doctorQualification.fill(qual);
        await this.branselection.click();
        await this.branchoption.click();
        await this.departselection.first().click();
        await this.departoption.click();
        await this.specselection.first().click();
        await this.specaloption.click();
        await this.doctorFee.fill(inperfee);
        await this.videocheck.click();
        await this.doctorFee.nth(1).fill(vidfee);
        await this.createdoctor.click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });

    }

    // ── scheduleDoctor negative scenario helpers ──

    async scheduleDoctorWithInvalidTime(docname, starttime, endtime) {
        await this.enableNotificationsbtn.click();
        await this.doctormenu.click({ TIMEOUT: 2000 });
        await this.doctorschedules.click();
        await this.addschedule.click();
        await this.docname.click();
        await this.docselection.click();
        await this.doctextname.fill('scheduletest');
        await this.avialaabledate.click();
        await this.time.first().fill(starttime);
        await this.time.nth(1).fill(endtime);
        await this.addschedulebtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async scheduleDoctorAndRefresh(docname) {
        await this.enableNotificationsbtn.click();
        await this.doctormenu.click({ TIMEOUT: 2000 });
        await this.doctorschedules.click();
        await this.addschedule.click();
        await this.docname.click();
        await this.docselection.click();
        await this.doctextname.fill('scheduletest');
        await this.avialaabledate.click();
        await this.page.reload();
    }

    async scheduleDoctorAndNavigateBack(docname) {
        await this.enableNotificationsbtn.click();
        await this.doctormenu.click({ TIMEOUT: 2000 });
        await this.doctorschedules.click();
        await this.addschedule.click();
        await this.docname.click();
        await this.docselection.click();
        await this.doctextname.fill('scheduletest');
        await this.avialaabledate.click();
        await this.page.goBack();
    }

    async scheduleDoctorWithoutDoctor(starttime, endtime) {
        await this.enableNotificationsbtn.click();
        await this.doctormenu.click({ TIMEOUT: 2000 });
        await this.doctorschedules.click();
        await this.addschedule.click();
        await this.doctextname.fill('scheduletest');
        await this.avialaabledate.click();
        await this.time.first().fill(starttime);
        await this.time.nth(1).fill(endtime);
        await this.addschedulebtn.click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });

    }

    // ── createStaff negative scenario helpers ──

    async createStaffWithInvalidEmail(fname, lname, dob, ph, sal) {
        await this.enableNotificationsbtn.click();
        await this.staffmenu.click();
        await this.staffsubmenu.click();
        await this.addstaffbtn.click();
        await this.staffFirstName.fill(fname);
        await this.staffLastName.fill(lname);
        await this.staffDOB.fill(dob);
        await this.gender.first().click();
        await this.genderInput.first().click();
        await this.bloodtype.click();
        await this.bloodtypeInput.first().click();
        await this.staffEmail.fill('notanemail');
        await this.staffPhone.fill(ph);
        await this.role.click();
        await this.roleoption.first().click();
        await this.branchdrpdwn.click();
        await this.branchoption.click();
        await this.departmentdrpdwn.click();
        await this.deparmentmenuoption.click();
        await this.shiftdrpdwn.click();
        await this.shiftoption.click();
        await this.textboxxx.nth(4).fill(sal);
        await this.createStaffBtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async createStaffWithMaxLengthName(lname, dob, email, ph, sal) {
        await this.enableNotificationsbtn.click();
        await this.staffmenu.click();
        await this.staffsubmenu.click();
        await this.addstaffbtn.click();
        await this.staffFirstName.fill('a'.repeat(500));
        await this.staffLastName.fill(lname);
        await this.staffDOB.fill(dob);
        await this.gender.first().click();
        await this.genderInput.first().click();
        await this.bloodtype.click();
        await this.bloodtypeInput.first().click();
        await this.staffEmail.fill(email);
        await this.staffPhone.fill(ph);
        await this.role.click();
        await this.roleoption.first().click();
        await this.branchdrpdwn.click();
        await this.branchoption.click();
        await this.departmentdrpdwn.click();
        await this.deparmentmenuoption.click();
        await this.shiftdrpdwn.click();
        await this.shiftoption.click();
        await this.textboxxx.nth(4).fill(sal);
        await this.createStaffBtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async createStaffWithMinLengthName(lname, dob, email, ph, sal) {
        await this.enableNotificationsbtn.click();
        await this.staffmenu.click();
        await this.staffsubmenu.click();
        await this.addstaffbtn.click();
        await this.staffFirstName.fill('a');
        await this.staffLastName.fill(lname);
        await this.staffDOB.fill(dob);
        await this.gender.first().click();
        await this.genderInput.first().click();
        await this.bloodtype.click();
        await this.bloodtypeInput.first().click();
        await this.staffEmail.fill(email);
        await this.staffPhone.fill(ph);
        await this.role.click();
        await this.roleoption.first().click();
        await this.branchdrpdwn.click();
        await this.branchoption.click();
        await this.departmentdrpdwn.click();
        await this.deparmentmenuoption.click();
        await this.shiftdrpdwn.click();
        await this.shiftoption.click();
        await this.textboxxx.nth(4).fill(sal);
        await this.createStaffBtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async createStaffAndRefresh(fname, lname, dob, email, ph, sal) {
        await this.enableNotificationsbtn.click();
        await this.staffmenu.click();
        await this.staffsubmenu.click();
        await this.addstaffbtn.click();
        await this.staffFirstName.fill(fname);
        await this.staffLastName.fill(lname);
        await this.staffDOB.fill(dob);
        await this.gender.first().click();
        // await this.genderInput.first().click();
        await this.staffEmail.fill(email);
        await this.staffPhone.fill(ph);
        await this.page.reload();
    }

    async createStaffAndNavigateBack(fname, lname, dob, email, ph, sal) {
        await this.enableNotificationsbtn.click();
        await this.staffmenu.click();
        await this.staffsubmenu.click();
        await this.addstaffbtn.click();
        await this.staffFirstName.fill(fname);
        await this.staffLastName.fill(lname);
        await this.staffDOB.fill(dob);
        await this.gender.first().click();
        await this.genderInput.first().click();
        await this.staffEmail.fill(email);
        await this.staffPhone.fill(ph);
        await this.page.goBack();
    }

    async createStaffWithoutEmail(fname, lname, dob, ph, sal) {
        await this.enableNotificationsbtn.click();
        await this.staffmenu.click();
        await this.staffsubmenu.click();
        await this.addstaffbtn.click();
        await this.staffFirstName.fill(fname);
        await this.staffLastName.fill(lname);
        await this.staffDOB.fill(dob);
        await this.gender.first().click();
        await this.genderInput.first().click();
        await this.bloodtype.click();
        await this.bloodtypeInput.first().click();
        await this.staffPhone.fill(ph);
        await this.role.click();
        await this.roleoption.first().click();
        await this.branchdrpdwn.click();
        await this.branchoption.click();
        await this.departmentdrpdwn.click();
        await this.deparmentmenuoption.click();
        await this.shiftdrpdwn.click();
        await this.shiftoption.click();
        await this.textboxxx.nth(4).fill(sal);
        await this.createStaffBtn.click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });

    }

    // ── createDepartment additional helpers ──

    async createDepartmentWithApiFailure(title, description, floor) {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.deparmentmenu.click();
        await this.departmentbtn.click();
        await this.departmentTitle.fill(title);
        await this.departmentDescription.fill(description);
        await this.departmentFloor.fill(floor);
        await this.page.route('**/api/**', route => route.abort());
        await this.savebtn.click();
    }

    async createDepartmentSessionExpiry() {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.deparmentmenu.click();
        await this.departmentbtn.click();
        await this.page.context().clearCookies();
        await this.savebtn.click();
    }

    async createDepartmentConcurrent(title, description, floor) {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.deparmentmenu.click();
        await this.departmentbtn.click();
        await this.departmentTitle.fill(title);
        await this.departmentDescription.fill(description);
        await this.departmentFloor.fill(floor);
        await Promise.all([this.savebtn.click(), this.savebtn.click()]);
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    // ── Createspecialization additional helpers ──

    async createSpecializationWithApiFailure(title, description) {
        await this.enableNotificationsbtn.click();
        await this.doctormenu.click();
        await this.speclizationmenu.click();
        await this.specialiizationtbn.click();
        await this.specilizationTitle.fill(title);
        await this.departmdropdwn.click();
        await this.departmentvalue.click();
        await this.specilizationDescription.fill(description);
        await this.page.route('**/api/**', route => route.abort());
        await this.addspecilizationbtn.click();
    }

    async createSpecializationSessionExpiry() {
        await this.enableNotificationsbtn.click();
        await this.doctormenu.click();
        await this.speclizationmenu.click();
        await this.specialiizationtbn.click();
        await this.page.context().clearCookies();
        await this.addspecilizationbtn.click();
    }

    async createSpecializationConcurrent(title, description) {
        await this.enableNotificationsbtn.click();
        await this.doctormenu.click();
        await this.speclizationmenu.click();
        await this.specialiizationtbn.click();
        await this.specilizationTitle.fill(title);
        await this.departmdropdwn.click();
        await this.departmentvalue.click();
        await this.specilizationDescription.fill(description);
        await Promise.all([this.addspecilizationbtn.click(), this.addspecilizationbtn.click()]);
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    // ── CreateBranch additional helpers ──

    async createBranchWithApiFailure(name, address, email) {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.Allbranches.click();
        await this.addbranch.first().click();
        await this.branchTitle.fill(name);
        await this.branchAddress.fill(address);
        await this.branchEmail.fill(email);
        await this.specilationdrp.click();
        await this.specilationvalue.first().click();
        await this.specializationDropdown.click();
        await this.specilationvalue.first().click();
        await this.page.route('**/api/**', route => route.abort());
        await this.addBranchBtn.click();
    }

    async createBranchSessionExpiry() {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.Allbranches.click();
        await this.addbranch.first().click();
        await this.page.context().clearCookies();
        await this.addBranchBtn.click();
    }

    async createBranchConcurrent(name, address, email) {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.Allbranches.click();
        await this.addbranch.first().click();
        await this.branchTitle.fill(name);
        await this.branchAddress.fill(address);
        await this.branchEmail.fill(email);
        await this.specilationdrp.click();
        await this.specilationvalue.first().click();
        await this.specializationDropdown.click();
        await this.specilationvalue.first().click();
        await Promise.all([this.addBranchBtn.click(), this.addBranchBtn.click()]);
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    // ── createDoctor additional helpers ──

    async createDoctorWithApiFailure(firstName, lastName, dob, email, phone) {
        await this.enableNotificationsbtn.click();
        await this.doctormenu.click();
        await this.Alldoctors.click();
        await this.adddoctorbtn.click();
        await this.doctorFirstName.fill(firstName);
        await this.doctorLastName.fill(lastName);
        await this.doctorDOB.fill(dob);
        await this.Gender.click();
        await this.genderoption.click();
        await this.doctorEmail.fill(email);
        await this.doctorPhone.fill(phone);
        await this.page.route('**/api/**', route => route.abort());
        await this.createdoctor.click();
    }

    async createDoctorSessionExpiry() {
        await this.enableNotificationsbtn.click();
        await this.doctormenu.click();
        await this.Alldoctors.click();
        await this.adddoctorbtn.click();
        await this.page.context().clearCookies();
        await this.createdoctor.click();
    }

    async createDoctorConcurrent(firstName, lastName, dob, email, phone) {
        await this.enableNotificationsbtn.click();
        await this.doctormenu.click();
        await this.Alldoctors.click();
        await this.adddoctorbtn.click();
        await this.doctorFirstName.fill(firstName);
        await this.doctorLastName.fill(lastName);
        await this.doctorDOB.fill(dob);
        await this.Gender.click();
        await this.genderoption.click();
        await this.doctorEmail.fill(email);
        await this.doctorPhone.fill(phone);
        await Promise.all([this.createdoctor.click(), this.createdoctor.click()]);
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    // ── scheduleDoctor additional helpers ──

    async scheduleDoctorWithSqlInjection() {
        await this.enableNotificationsbtn.click();
        await this.doctormenu.click({ TIMEOUT: 2000 });
        await this.doctorschedules.click();
        await this.addschedule.click();
        await this.docname.click();
        await this.docselection.click();
        await this.doctextname.fill("' OR '1'='1");
        await this.avialaabledate.click();
        await this.time.first().fill('10:00');
        await this.time.nth(1).fill('22:00');
        await this.addschedulebtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async scheduleDoctorWithXss() {
        await this.enableNotificationsbtn.click();
        await this.doctormenu.click({ TIMEOUT: 2000 });
        await this.doctorschedules.click();
        await this.addschedule.click();
        await this.docname.click();
        await this.docselection.click();
        await this.doctextname.fill('<script>alert(1)</script>');
        await this.avialaabledate.click();
        await this.time.first().fill('10:00');
        await this.time.nth(1).fill('22:00');
        await this.addschedulebtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async scheduleDoctorWithMaxLengthName() {
        await this.enableNotificationsbtn.click();
        await this.doctormenu.click({ TIMEOUT: 2000 });
        await this.doctorschedules.click();
        await this.addschedule.click();
        await this.docname.click();
        await this.docselection.click();
        await this.doctextname.fill('a'.repeat(500));
        await this.avialaabledate.click();
        await this.time.first().fill('10:00');
        await this.time.nth(1).fill('22:00');
        await this.addschedulebtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async scheduleDoctorWithMinLengthName() {
        await this.enableNotificationsbtn.click();
        await this.doctormenu.click({ TIMEOUT: 2000 });
        await this.doctorschedules.click();
        await this.addschedule.click();
        await this.docname.click();
        await this.docselection.click();
        await this.doctextname.fill('a');
        await this.avialaabledate.click();
        await this.time.first().fill('10:00');
        await this.time.nth(1).fill('22:00');
        await this.addschedulebtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async scheduleDoctorWithApiFailure() {
        await this.enableNotificationsbtn.click();
        await this.doctormenu.click({ TIMEOUT: 2000 });
        await this.doctorschedules.click();
        await this.addschedule.click();
        await this.docname.click();
        await this.docselection.click();
        await this.doctextname.fill('scheduletest');
        await this.avialaabledate.click();
        await this.time.first().fill('10:00');
        await this.time.nth(1).fill('22:00');
        await this.page.route('**/api/**', route => route.abort());
        await this.addschedulebtn.click();
    }

    async scheduleDoctorSessionExpiry() {
        await this.enableNotificationsbtn.click();
        await this.doctormenu.click({ TIMEOUT: 2000 });
        await this.doctorschedules.click();
        await this.addschedule.click();
        await this.page.context().clearCookies();
        await this.addschedulebtn.click();
    }

    async scheduleDoctorConcurrent() {
        await this.enableNotificationsbtn.click();
        await this.doctormenu.click({ TIMEOUT: 2000 });
        await this.doctorschedules.click();
        await this.addschedule.click();
        await this.docname.click();
        await this.docselection.click();
        await this.doctextname.fill('scheduletest');
        await this.avialaabledate.click();
        await this.time.first().fill('10:00');
        await this.time.nth(1).fill('22:00');
        await Promise.all([this.addschedulebtn.click(), this.addschedulebtn.click()]);
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    // ── createStaff additional helpers ──

    async createStaffWithoutPhone(fname, lname, dob, email, sal) {
        await this.enableNotificationsbtn.click();
        await this.staffmenu.click();
        await this.staffsubmenu.click();
        await this.addstaffbtn.click();
        await this.staffFirstName.fill(fname);
        await this.staffLastName.fill(lname);
        await this.staffDOB.fill(dob);
        await this.gender.first().click();
        await this.genderInput.first().click();
        await this.bloodtype.click();
        await this.bloodtypeInput.first().click();
        await this.staffEmail.fill(email);
        await this.role.click();
        await this.roleoption.first().click();
        await this.branchdrpdwn.click();
        await this.branchoption.click();
        await this.departmentdrpdwn.click();
        await this.deparmentmenuoption.click();
        await this.shiftdrpdwn.click();
        await this.shiftoption.click();
        await this.textboxxx.nth(4).fill(sal);
        await this.createStaffBtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async createStaffWithSqlInjection(lname, dob, email, phone) {
        await this.enableNotificationsbtn.click();
        await this.staffmenu.click();
        await this.staffsubmenu.click();
        await this.addstaffbtn.click();
        await this.staffFirstName.fill("' OR '1'='1");
        await this.staffLastName.fill(lname);
        await this.staffDOB.fill(dob);
        await this.gender.first().click();
        await this.genderInput.first().click();
        await this.staffEmail.fill(email);
        await this.staffPhone.fill(phone);
        await this.createStaffBtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async createStaffWithXss(lname, dob, email, phone) {
        await this.enableNotificationsbtn.click();
        await this.staffmenu.click();
        await this.staffsubmenu.click();
        await this.addstaffbtn.click();
        await this.staffFirstName.fill('<script>alert(1)</script>');
        await this.staffLastName.fill(lname);
        await this.staffDOB.fill(dob);
        await this.gender.first().click();
        await this.genderInput.first().click();
        await this.staffEmail.fill(email);
        await this.staffPhone.fill(phone);
        await this.createStaffBtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async createStaffWithApiFailure(fname, lname, dob, email, phone) {
        await this.enableNotificationsbtn.click();
        await this.staffmenu.click();
        await this.staffsubmenu.click();
        await this.addstaffbtn.click();
        await this.staffFirstName.fill(fname);
        await this.staffLastName.fill(lname);
        await this.staffDOB.fill(dob);
        await this.gender.first().click();
        await this.genderInput.first().click();
        await this.staffEmail.fill(email);
        await this.staffPhone.fill(phone);
        await this.page.route('**/api/**', route => route.abort());
        await this.createStaffBtn.click();
    }

    async createStaffSessionExpiry() {
        await this.enableNotificationsbtn.click();
        await this.staffmenu.click();
        await this.staffsubmenu.click();
        await this.addstaffbtn.click();
        await this.page.context().clearCookies();
        await this.createStaffBtn.click();
    }

    async createStaffConcurrent(fname, lname, dob, email, phone) {
        await this.enableNotificationsbtn.click();
        await this.staffmenu.click();
        await this.staffsubmenu.click();
        await this.addstaffbtn.click();
        await this.staffFirstName.fill(fname);
        await this.staffLastName.fill(lname);
        await this.staffDOB.fill(dob);
        await this.gender.first().click();
        await this.genderInput.first().click();
        await this.staffEmail.fill(email);
        await this.staffPhone.fill(phone);
        await Promise.all([this.createStaffBtn.click(), this.createStaffBtn.click()]);
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    // ── createPatient additional helpers ──

    async createPatientWithSqlInjection(lname, age, email, phone) {
        await this.enableNotificationsbtn.click();
        await this.patientmenu.click();
        await this.Allpatient.click();
        await this.addpatientbtn.click();
        await this.patientFirstName.fill("' OR '1'='1");
        await this.patientLastName.fill(lname);
        await this.age.fill(age);
        await this.gender.first().click();
        await this.genderInput.first().click();
        await this.patientEmail.fill(email);
        await this.patientPhone.first().fill(phone);
        await this.createpatientbtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async createPatientWithXss(lname, age, email, phone) {
        await this.enableNotificationsbtn.click();
        await this.patientmenu.click();
        await this.Allpatient.click();
        await this.addpatientbtn.click();
        await this.patientFirstName.fill('<script>alert(1)</script>');
        await this.patientLastName.fill(lname);
        await this.age.fill(age);
        await this.gender.first().click();
        await this.genderInput.first().click();
        await this.patientEmail.fill(email);
        await this.patientPhone.first().fill(phone);
        await this.createpatientbtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async createPatientWithApiFailure(fname, lname, age, email, phone) {
        await this.patientmenu.click();
        await this.Allpatient.click();
        await this.addpatientbtn.click();
        await this.patientFirstName.fill(fname);
        await this.patientLastName.fill(lname);
        await this.age.fill(age);
        await this.gender.first().click();
        await this.genderInput.first().click();
        await this.patientEmail.fill(email);
        await this.patientPhone.first().fill(phone);
        await this.page.route('**/api/**', route => route.abort());
        await this.createpatientbtn.click();
    }

    async createPatientSessionExpiry() {
        await this.enableNotificationsbtn.click();
        await this.patientmenu.click();
        await this.Allpatient.click();
        await this.addpatientbtn.click();
        await this.page.context().clearCookies();
        await this.createpatientbtn.click();
    }

    async createPatientConcurrent(fname, lname, age, email, phone, aadhar, emrname, emrphone) {
        await this.enableNotificationsbtn.click();
        await this.patientmenu.click();
        await this.Allpatient.click();
        await this.addpatientbtn.click();
        await this.patientFirstName.fill(fname);
        await this.patientLastName.fill(lname);
        await this.age.fill(age);
        await this.gender.first().click();
        await this.genderInput.first().click();
        await this.patientbloodgrp.click();
        await this.bloodtypeInput.first().click();
        await this.patientEmail.fill(email);
        await this.patientPhone.first().fill(phone);
        await this.patientAadhar.fill(aadhar);
        await this.patientSource.click();
        await this.patientSourceOption.first().click();
        await this.patientName.fill(emrname);
        await this.patientMobile.fill(emrphone);
        await this.patientRelation.click();
        await this.patientRelationOption.first().click();
        await this.patientConsent.click();
        await Promise.all([this.createpatientbtn.click(), this.createpatientbtn.click()]);
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    // ── createPatient negative scenario helpers ──

    async createPatientWithInvalidEmail(patinename, patientlastname, age, phone, aadhar, emrname, emrphone) {
        await this.enableNotificationsbtn.click();
        await this.patientmenu.click();
        await this.Allpatient.click();
        await this.addpatientbtn.click();
        await this.patientFirstName.fill(patinename);
        await this.patientLastName.fill(patientlastname);
        await this.age.fill(age);
        await this.gender.first().click();
        await this.genderInput.first().click();
        await this.patientbloodgrp.click();
        await this.bloodtypeInput.first().click();
        await this.patientEmail.fill('notanemail');
        await this.patientPhone.first().fill(phone);
        await this.patientAadhar.fill(aadhar);
        await this.patientSource.click();
        await this.patientSourceOption.first().click();
        await this.patientName.fill(emrname);
        await this.patientMobile.fill(emrphone);
        await this.patientRelation.click();
        await this.patientRelationOption.first().click();
        await this.patientConsent.click();
        await this.createpatientbtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async createPatientWithMaxLengthName(patientlastname, age, email, phone, aadhar, emrname, emrphone) {
        await this.enableNotificationsbtn.click();
        await this.patientmenu.click();
        await this.Allpatient.click();
        await this.addpatientbtn.click();
        await this.patientFirstName.fill('a'.repeat(500));
        await this.patientLastName.fill(patientlastname);
        await this.age.fill(age);
        await this.gender.first().click();
        await this.genderInput.first().click();
        await this.patientbloodgrp.click();
        await this.bloodtypeInput.first().click();
        await this.patientEmail.fill(email);
        await this.patientPhone.first().fill(phone);
        await this.patientAadhar.fill(aadhar);
        await this.patientSource.click();
        await this.patientSourceOption.first().click();
        await this.patientName.fill(emrname);
        await this.patientMobile.fill(emrphone);
        await this.patientRelation.click();
        await this.patientRelationOption.first().click();
        await this.patientConsent.click();
        await this.createpatientbtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async createPatientWithMinLengthName(patientlastname, age, email, phone, aadhar, emrname, emrphone) {
        await this.enableNotificationsbtn.click();
        await this.patientmenu.click();
        await this.Allpatient.click();
        await this.addpatientbtn.click();
        await this.patientFirstName.fill('a');
        await this.patientLastName.fill(patientlastname);
        await this.age.fill(age);
        await this.gender.first().click();
        await this.genderInput.first().click();
        await this.patientbloodgrp.click();
        await this.bloodtypeInput.first().click();
        await this.patientEmail.fill(email);
        await this.patientPhone.first().fill(phone);
        await this.patientAadhar.fill(aadhar);
        await this.patientSource.click();
        await this.patientSourceOption.first().click();
        await this.patientName.fill(emrname);
        await this.patientMobile.fill(emrphone);
        await this.patientRelation.click();
        await this.patientRelationOption.first().click();
        await this.patientConsent.click();
        await this.createpatientbtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async createPatientAndRefresh(patinename, patientlastname, age, email, phone) {
        await this.enableNotificationsbtn.click();
        await this.patientmenu.click();
        await this.Allpatient.click();
        await this.addpatientbtn.click();
        await this.patientFirstName.fill(patinename);
        await this.patientLastName.fill(patientlastname);
        await this.age.fill(age);
        await this.gender.first().click();
        await this.genderInput.first().click();
        await this.patientEmail.fill(email);
        await this.patientPhone.first().fill(phone);
        await this.page.reload();
    }

    async createPatientAndNavigateBack(patinename, patientlastname, age, email, phone) {
        await this.enableNotificationsbtn.click();
        await this.patientmenu.click();
        await this.Allpatient.click();
        await this.addpatientbtn.click();
        await this.patientFirstName.fill(patinename);
        await this.patientLastName.fill(patientlastname);
        await this.age.fill(age);
        await this.gender.first().click();
        await this.genderInput.first().click();
        await this.patientEmail.fill(email);
        await this.patientPhone.first().fill(phone);
        await this.page.goBack();
    }

    async createPatientWithoutFirstName(patientlastname, age, email, phone, aadhar, emrname, emrphone) {
        await this.enableNotificationsbtn.click();
        await this.patientmenu.click();
        await this.Allpatient.click();
        await this.addpatientbtn.click();
        await this.patientLastName.fill(patientlastname);
        await this.age.fill(age);
        await this.gender.first().click();
        await this.genderInput.first().click();
        await this.patientbloodgrp.click();
        await this.bloodtypeInput.first().click();
        await this.patientEmail.fill(email);
        await this.patientPhone.first().fill(phone);
        await this.patientAadhar.fill(aadhar);
        await this.patientSource.click();
        await this.patientSourceOption.first().click();
        await this.patientName.fill(emrname);
        await this.patientMobile.fill(emrphone);
        await this.patientRelation.click();
        await this.patientRelationOption.first().click();
        await this.patientConsent.click();
        await this.createpatientbtn.click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });

    }

    async createPatientWithoutPhone(patinename, patientlastname, age, email, aadhar, emrname, emrphone) {
        await this.enableNotificationsbtn.click();
        await this.patientmenu.click();
        await this.Allpatient.click();
        await this.addpatientbtn.click();
        await this.patientFirstName.fill(patinename);
        await this.patientLastName.fill(patientlastname);
        await this.age.fill(age);
        await this.gender.first().click();
        await this.genderInput.first().click();
        await this.patientbloodgrp.click();
        await this.bloodtypeInput.first().click();
        await this.patientEmail.fill(email);
        await this.patientAadhar.fill(aadhar);
        await this.patientSource.click();
        await this.patientSourceOption.first().click();
        await this.patientName.fill(emrname);
        await this.patientMobile.fill(emrphone);
        await this.patientRelation.click();
        await this.patientRelationOption.first().click();
        await this.patientConsent.click();
        await this.createpatientbtn.click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });

    }

    async createPatientWithoutEmail(patinename, patientlastname, age, phone, aadhar, emrname, emrphone) {
        await this.enableNotificationsbtn.click();
        await this.patientmenu.click();
        await this.Allpatient.click();
        await this.addpatientbtn.click();
        await this.patientFirstName.fill(patinename);
        await this.patientLastName.fill(patientlastname);
        await this.age.fill(age);
        await this.gender.first().click();
        await this.genderInput.first().click();
        await this.patientbloodgrp.click();
        await this.bloodtypeInput.first().click();
        await this.patientPhone.first().fill(phone);
        await this.patientAadhar.fill(aadhar);
        await this.patientSource.click();
        await this.patientSourceOption.first().click();
        await this.patientName.fill(emrname);
        await this.patientMobile.fill(emrphone);
        await this.patientRelation.click();
        await this.patientRelationOption.first().click();
        await this.patientConsent.click();
        await this.createpatientbtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async createPatientWithDuplicateAadhar(patinename, patientlastname, age, email, phone, emrname, emrphone) {
        await this.enableNotificationsbtn.click();
        await this.patientmenu.click();
        await this.Allpatient.click();
        await this.addpatientbtn.click();
        await this.patientFirstName.fill(patinename);
        await this.patientLastName.fill(patientlastname);
        await this.age.fill(age);
        await this.gender.first().click();
        await this.genderInput.first().click();
        await this.patientbloodgrp.click();
        await this.bloodtypeInput.first().click();
        await this.patientEmail.fill(email);
        await this.patientPhone.first().fill(phone);
        await this.patientAadhar.fill('123456789012');
        await this.patientSource.click();
        await this.patientSourceOption.first().click();
        await this.patientName.fill(emrname);
        await this.patientMobile.fill(emrphone);
        await this.patientRelation.click();
        await this.patientRelationOption.first().click();
        await this.patientConsent.click();
        await this.createpatientbtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async createPatient(patinename, patientlastname, age, email, phone, aadhar, emrname, emrphone) {
        await this.enableNotificationsbtn.click();
        await this.patientmenu.click();
        await this.Allpatient.click();
        await this.addpatientbtn.click();
        await this.patientFirstName.fill(patinename);
        await this.patientLastName.fill(patientlastname);
        // await this.page.pause();
        await this.age.fill(age);
        await this.gender.first().click();
        await this.genderInput.first().click();
        // await this.patientDOB.fill;('2000-07-21');
        await this.patientbloodgrp.click();
        await this.bloodtypeInput.first().click();
        await this.patientEmail.click();
        await this.patientEmail.fill(email);
        await this.patientPhone.first().click();
        await this.patientPhone.first().fill(phone);
        await this.patientAadhar.click();
        await this.patientAadhar.fill(aadhar);
        await this.patientSource.click();
        await this.patientSourceOption.first().click();
        await this.patientName.fill(emrname);
        await this.patientMobile.click();
        await this.patientMobile.fill(emrphone);
        await this.patientRelation.click();
        await this.patientRelationOption.first().click();
        await this.patientConsent.click();
        await this.createpatientbtn.click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });


    }

    async departmentEdit() {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.deparmentmenu.click();
        await this.row1.first().click();
        await this.edit_dept.click();
        await this.dept_txt_box.fill('Cardiology');
        await this.dept_desc.fill('Testing Cardiac Dieases test');
        await this.dept_floor.fill('2nd floor new buildog');
        this.dept_update_btn.click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });

    }

    async del_dept() {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.deparmentmenu.click();
        await this.search_dept.fill('Cardiology');
        await this.dept_clear.click();
        // await this.dept_active.click();
        // await this.dept_row.click();
        // await this.dept_inactive.click();
        // await this.dept_inactive_row.click();
        await this.dept_row2.click();
        await this.dept_del.click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });
    }

    async search_dept() {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.deparmentmenu.click();
        await this.search_dept.fill('Cardiology');
        await this.clear_search.click();
        // await this.active_filter.click();
        // await this.row.click();
        // await this.inactive_filter.click();
        // await this.inactive_row.click();
    }

    async specialization_edit() {
        await this.enableNotificationsbtn.click();
        await this.edit_specilization.click();
        await this.specilaizationtestbox.fill('Cardiology Specializzation testt');
        await this.specilaizationtestdesc.click();
        await this.update_specilization.click();

    }

    async specilization_search() {
        await this.enableNotificationsbtn.click();
        await this.search_specilization.fill('card');
        await this.clear_specilaitzation.click();

    }

    async specilzation_del() {
        await this.enableNotificationsbtn.click();
        await this.specilzation_row.nth(3).click();
        await this.delete_speoilization.click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });
    }


    async branch_edit() {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.Allbranches.click();
        await this.edit_branch.click();
        await this.edit_branch_textbox.fill('Gatchibowli Main center');
        await this.edit_branch_street.fill('Gatchibowli Road');
        await this.branch_dept.click();
        await this.branch_dept_option.click();
        await this.branch_speci.click();
        await this.branch_speci_option.click();
        await this.branch_update.click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });
    }

    async branch_search() {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.Allbranches.click();
        await this.search_branch.fill('gatch');
        // await this.branch_active.click();

        // this.deactive.nth(4).click();
        // this.branch_inactive.click();
    }


    async Schedule_doc() {
        await this.enableNotificationsbtn.click();
        await this.doctormenu.click({ TIMEOUT: 2000 });
        await this.doctorschedules.click();
        await this.search_schedule.fill('Bhaskar');
        await this.search_schedule_clear.click();
    }

    async schedule_filter() {

        await this.enableNotificationsbtn.click();
        await this.doctormenu.click({ TIMEOUT: 2000 });
        await this.doctorschedules.click();
        await this.search_schedule_status.click();
        await this.search_schedule_status_option.click();
        await this.search_schedule_filter.click();
        await this.search_schedule_filter_option.click();

        await this.allstatus_active.click();

        await this.allstatus_inactive.click();
        await this.allstatus_text.click();
        await this.allstatus.click();
    }

    async schedule_editing() {
        await this.enableNotificationsbtn.click();
        await this.doctormenu.click({ TIMEOUT: 2000 });
        await this.doctorschedules.click();
        await this.schedule_edit.click();
        await this.schedule_edittext.click();
        await this.schedule_input.click();
        await this.consultation.click();
        await this.update_shedule.click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });
    }

    async schedule_delete() {
        await this.enableNotificationsbtn.click();
        await this.doctormenu.click({ TIMEOUT: 2000 });
        await this.doctorschedules.click();
        await this.delete_scheudule.first().click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });


    }

    async staff_search_filter() {
        await this.enableNotificationsbtn.click();
        await this.staffmenu.click();
        await this.staffsubmenu.click();
        await this.staff_allbranches.click();
        await this.staff_allbranches_option.click();
        await this.staff_allbranches.click();
        await this.staff_deprt.click();
        await this.staff_deprt.click();
        await this.staff_role.click();
        await this.staff_role_option.click();
        await this.staff_role.click();
        await this.staff_start_date.nth(1).fill('2026-09-01');
        await this.staff_end_date.nth(2).fill('2026-09-17');
        await this.staff_reset.click();
    }
    async staff_search() {
        await this.enableNotificationsbtn.click();
        await this.staffmenu.click();
        await this.staffsubmenu.click();
        await this.staff_search.fill('Staff New');
        await this.staff_search_clear.click();
    }

    async staff_search_newfilters() {
        await this.enableNotificationsbtn.click();
        await this.staffmenu.click();
        await this.staffsubmenu.click();
        await this.staff_status.click();
        await this.staff_status_inactive.click();

        await this.staff_gender.click();
        await this.staff_gender_female.click();
        await this.staff_gender_female_text.click();
        await this.staff_gender_all.click();
        await this.staff_blood_group.click();
        await this.staff_blood_group_bplus.click();
        await this.staff_blood_group_bplus_selected.click();
        await this.staff_blood_group_all.click();
        await this.staff_page2.click();
        await this.staff_page3.click();
        await this.staff_next_page.click();
        await this.staff_prev_page.click();
    }

    async Appt_search(patientSearch) {
        await this.enableNotificationsbtn.click();
        await this.apptmenu.click();
        await this.appt_search_btn.fill(patientSearch);
        // await this.appt_patient_result.click();
        await this.appt_cancel_btn.click();
    }

    async bookAppointment(patientSearch, branchId, date, notes) {
        await this.enableNotificationsbtn.click();
        await this.apptmenu.click();
        await this.appt_book_btn.click();
        await this.appt_patient_search.fill(patientSearch);
        await this.appt_patient_result_full.waitFor({ state: 'visible' });
        await this.appt_patient_result_full.click();
        await this.appt_next_details_btn.click();
        await this.appt_branch_select.selectOption(branchId);
        await  this.appt_type_dropdown.click();
        await this.appt_type_video.click();
        await  this.appt_visit_type_dropdown.click();
        await this.appt_visit_type_first.click();
        await this.appt_dept_dropdown.click();
        await this.appt_dept_option.click();
        await this.appt_date.fill(date);
        await this.appt_doctor_search.click();
        await this.appt_doctor_option.click();
        await this.appt_time_slot.click();
        await this.appt_notes.fill(notes);
        await this.appt_next_review_btn.click();
        await this.appt_proceed_payment_btn.click();
        await this.appt_share_payment_btn.click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });
    }

    async appt_list_filter() {
        this.enableNotificationsbtn.click();
        await this.appt_list_search.fill('deepthi');
        await this.appt_list_clear.click();
        await this.appt_status_dropdown.click();
        await this.appt_status_confirmed.click();
        await this.appt_status_scheduled.click();
        await this.appt_status_completed.click();
        await this.appt_status_all.click();

        await this.appt_type_filter.click();
        await this.appt_type_inperson.click();
        await this.appt_type_video_option.click();
        await this.appt_type_all.click();

        await this.appt_branch_filter.getByRole('img').click();
        await this.appt_branch_root_text.click();
        await this.appt_branch_filter.click();
        await this.appt_branch_gatch.click();
        await this.appt_branch_all.click();

        await this.appt_doctor_filter.click();
        await this.appt_doctor_bhaskar.click();
        await this.appt_doctor_all.click();

        await this.appt_start_date.fill('2026-09-01');
        await this.appt_end_date.fill('2026-09-17');
        await this.appt_reset_filters.click();

        await this.appt_page2.click();
        await this.appt_page3.click();
        await this.appt_next_page.click();
        await this.appt_prev_page.click();
    }


    async invoice_list_filter() {
        this.enableNotificationsbtn.click();
        await this.invoice_search.fill('deepthi');
        await this.invoice_clear.click();

        await this.invoice_status_dropdown.click();
        await this.invoice_status_paid_selected.click();
        await this.invoice_status_all.click();

        await this.invoice_branch_dropdown.click();
        await this.invoice_branch_gatch.click();
        await this.invoice_branch_sunrise.click();
        await this.invoice_branch_all.click();

        await this.invoice_start_date.fill('2026-09-01');
        await this.invoice_end_date.fill('2026-09-17');
        await this.invoice_reset_filters.click();

        await this.invoice_page2.click();
        await this.invoice_page3.click();
        await this.invoice_next_page.click();
        await this.invoice_prev_page.click();
    }

    async payment_list_filter() {
        this.enableNotificationsbtn.click();
        await this.payment_menu.click();
        await this.payment_reset_filters.click();
        await this.payment_search.click();
        await this.payment_search.fill('deepthi');
        await this.payment_clear.click();

        await this.payment_status_dropdown.click();
        await this.payment_status_completed_selected.click();
        await this.payment_status_failed.click();
        await this.payment_status_all.click();

        await this.payment_method_dropdown.click();
        await this.payment_method_credit.click();
        await this.payment_method_upi.click();
        await this.payment_method_all.click();

        await this.payment_branch_dropdown.click();
        await this.payment_branch_gatch.click();
        await this.payment_branch_ayuman.click();
        await this.payment_branch_all.click();

        await this.payment_start_date.fill('2026-09-01');
        await this.payment_end_date.fill('2026-09-17');
        await this.payment_reset_filters.click();

        await this.payment_page2.click();
        await this.payment_next_page.click();
        await this.payment_prev_page.click();
    }

    async add_coupon(name, code, startDate, endDate, usageLimit, discountValue) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.coupon_menu.click();
        await this.coupon_add_btn.click();
        await this.coupon_name.click();
        await this.coupon_name.fill(name);
        await this.coupon_code.click();
        await this.coupon_code.fill(code);
        await this.coupon_type_dropdown.click();
        await this.coupon_type_option.click();
        await this.coupon_start_date.fill(startDate);
        await this.coupon_end_date.fill(endDate);
        await this.coupon_usage_limit.click();
        await this.coupon_usage_limit.fill(usageLimit);
        await this.coupon_discount_value.click();
        await this.coupon_discount_value.fill(discountValue);
        await this.coupon_save_btn.click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });

    }

    async edit_coupon(name, endDate, discountValue) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.coupon_menu.click();
        await this.coupon_row_btn.first().click();
        await this.coupon_edit_btn.click();
        await this.coupon_name.click();
        await this.coupon_name.fill(name);
        await this.coupon_end_date.fill(endDate);
        await this.coupon_discount_value.click();
        await this.coupon_discount_value.fill(discountValue);
        await this.coupon_update_btn.click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });
    }

    async coupon_search_filter(searchText) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.coupon_menu.click();
        await this.coupon_search.fill(searchText);
        await this.coupon_search_clear.click();
        await this.coupon_campaign_dropdown.click();
        await this.coupon_campaign_none.click();
        await this.coupon_campaign_none_selected.getByRole('img').click();
        await this.coupon_campaign_all.click();
    }

    async add_adhoc_service(name, serviceType, billingPrice, refPrice, visibility, quantity, expiryDate, notes) {

        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.adhoc_menu.click();
        await this.adhoc_add_btn.click();
        await this.adhoc_name.click();
        await this.adhoc_name.fill(name);
        await this.adhoc_service_type_label.click();
        // await this.adhoc_service_type.selectOption(serviceType).first();
        await this.adhoc_billing_price.click();
        await this.adhoc_billing_price.fill(billingPrice);
        await this.adhoc_ref_price.click();
        await this.adhoc_ref_price.fill(refPrice);
        // await this.adhoc_visibility.selectOption(visibility);
        await this.adhoc_quantity.click();
        await this.adhoc_quantity.fill(quantity);
        await this.adhoc_expiry_date.fill(expiryDate);
        await this.adhoc_notes.click();
        await this.adhoc_notes.fill(notes);
        await this.adhoc_save_btn.click();
    }

    async edit_adhoc_service(name, expiryDate, visibility, billingPrice, notes) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.adhoc_menu.click();
        await this.adhoc_row_btn.first().click();
        await this.adhoc_edit_btn.click();
        await this.adhoc_expiry_date.fill(expiryDate);
        await this.adhoc_name.click();
        await this.adhoc_name.fill(name);
        // await this.adhoc_visibility.selectOption(visibility);
        await this.adhoc_billing_price.click();
        await this.adhoc_billing_price.fill(billingPrice);
        await this.adhoc_notes.click();
        await this.adhoc_notes.fill(notes);
        await this.adhoc_update_btn.click();
    }

    async adhoc_search_filter(searchText) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.adhoc_menu.click();
        await this.adhoc_search.click();
        await this.adhoc_search.fill(searchText);
        await this.adhoc_search_clear.click();
        await this.adhoc_status_dropdown.click();
        await this.adhoc_status_deleted.click();
        await this.adhoc_status_deleted_text.click();
    }



    // -- departmentEdit negative scenario helpers --

    async departmentEditWithEmptyTitle() {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.deparmentmenu.click();
        await this.row1.first().click();
        await this.edit_dept.click();
        await this.dept_txt_box.fill('');
        await this.dept_update_btn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async departmentEditWithInvalidTitle(title) {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.deparmentmenu.click();
        await this.Branches.click();
        // await this.deparmentmenu.click();
        await this.row1.first().click();
        await this.edit_dept.click();
        await this.dept_txt_box.fill(title);
        await this.dept_update_btn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async departmentEditWithMaxLengthTitle() {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.deparmentmenu.click();
        await this.row1.first().click();
        await this.edit_dept.click();
        await this.dept_txt_box.fill('a'.repeat(500));
        await this.dept_update_btn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async departmentEditWithMinLengthTitle() {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.deparmentmenu.click();
        await this.row1.first().click();
        await this.edit_dept.click();
        await this.dept_txt_box.fill('a');
        await this.dept_update_btn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async departmentEditDuplicate() {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.deparmentmenu.click();
        await this.row1.first().click();
        await this.edit_dept.click();
        await this.dept_txt_box.fill('Cardiac');
        await this.dept_update_btn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async departmentEditWithApiFailure() {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.deparmentmenu.click();
        await this.row1.first().click();
        await this.edit_dept.click();
        await this.dept_txt_box.fill('Cardiac Issue Updated');
        await this.page.route('**/api/**', route => route.abort());
        await this.dept_update_btn.click();
    }

    async departmentEditSessionExpiry() {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.deparmentmenu.click();
        await this.row1.first().click();
        await this.edit_dept.click();
        await this.page.context().clearCookies();
        await this.dept_update_btn.click();
    }

    async departmentEditAndRefresh() {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.deparmentmenu.click();
        await this.row1.first().click();
        await this.edit_dept.click();
        await this.dept_txt_box.fill('Cardiac Issue Updated');
        await this.page.reload();
    }

    async departmentEditAndNavigateBack() {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.deparmentmenu.click();
        await this.row1.first().click();
        await this.edit_dept.click();
        await this.dept_txt_box.fill('Cardiac Issue Updated');
        await this.page.goBack();
    }

    async departmentEditConcurrent() {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.deparmentmenu.click();
        await this.row1.first().click();
        await this.edit_dept.click();
        await this.dept_txt_box.fill('Cardiac Issue Updated');
        await Promise.all([this.dept_update_btn.click(), this.dept_update_btn.click()]);
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }



    // -- search_dept negative scenario helpers --

    async search_deptWithEmptyValue() {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.deparmentmenu.click();
        await this.search_dept.fill('');
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async search_deptWithInvalidValue(value) {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.deparmentmenu.click();
        await this.search_dept.fill(value);
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async search_deptWithMaxLengthValue() {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.deparmentmenu.click();
        await this.search_dept.fill('a'.repeat(500));
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async search_deptWithMinLengthValue() {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.deparmentmenu.click();
        await this.search_dept.fill('a');
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async search_deptWithApiFailure() {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.deparmentmenu.click();
        await this.page.route('**/api/**', route => route.abort());
        await this.search_dept.fill('cardiac');
    }

    async search_deptSessionExpiry() {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.deparmentmenu.click();
        await this.page.context().clearCookies();
        await this.search_dept.fill('cardiac');
    }

    async search_deptAndRefresh() {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.deparmentmenu.click();
        await this.search_dept.fill('cardiac');
        await this.page.reload();
    }

    async search_deptAndNavigateBack() {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.deparmentmenu.click();
        await this.search_dept.fill('cardiac');
        await this.page.goBack();
    }

    async search_deptConcurrent() {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.deparmentmenu.click();
        await Promise.all([
            this.search_dept.fill('cardiac'),
            this.search_dept.fill('neuro')
        ]);
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }



    // -- branch_edit negative scenario helpers --

    async branch_editWithEmptyName() {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.Allbranches.click();
        await this.edit_branch.click();
        await this.edit_branch_textbox.fill('');
        await this.page.getByRole('button', { name: 'Update Branch' }).click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async branch_editWithInvalidName(name) {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.Allbranches.click();
        await this.edit_branch.click();
        await this.edit_branch_textbox.fill(name);
        await this.page.getByRole('button', { name: 'Update Branch' }).click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async branch_editWithEmptyAddress() {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.Allbranches.click();
        await this.edit_branch.click();
        await this.edit_branch_street.fill('');
        await this.page.getByRole('button', { name: 'Update Branch' }).click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async branch_editWithMaxLengthName() {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.Allbranches.click();
        await this.edit_branch.click();
        await this.edit_branch_textbox.fill('a'.repeat(500));
        await this.page.getByRole('button', { name: 'Update Branch' }).click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async branch_editWithMinLengthName() {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.Allbranches.click();
        await this.edit_branch.click();
        await this.edit_branch_textbox.fill('a');
        await this.page.getByRole('button', { name: 'Update Branch' }).click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async branch_editDuplicate() {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.Allbranches.click();
        await this.edit_branch.click();
        await this.edit_branch_textbox.fill('Gatchibowli');
        await this.page.getByRole('button', { name: 'Update Branch' }).click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async branch_editWithApiFailure() {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.Allbranches.click();
        await this.edit_branch.click();
        await this.edit_branch_textbox.fill('Gatchibowli Main Center Updated');
        await this.page.route('**/api/**', route => route.abort());
        await this.page.getByRole('button', { name: 'Update Branch' }).click();
    }

    async branch_editSessionExpiry() {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.Allbranches.click();
        await this.edit_branch.click();
        await this.page.context().clearCookies();
        await this.page.getByRole('button', { name: 'Update Branch' }).click();
    }

    async branch_editAndRefresh() {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.Allbranches.click();
        await this.edit_branch.click();
        await this.edit_branch_textbox.fill('Gatchibowli Main Center Updated');
        await this.page.reload();
    }

    async branch_editAndNavigateBack() {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.Allbranches.click();
        await this.edit_branch.click();
        await this.edit_branch_textbox.fill('Gatchibowli Main Center Updated');
        await this.page.goBack();
    }

    async branch_editConcurrent() {
        await this.enableNotificationsbtn.click();
        await this.Branches.click();
        await this.Allbranches.click();
        await this.edit_branch.click();
        await this.edit_branch_textbox.fill('Gatchibowli Main Center Updated');
        const updateBtn = this.page.getByRole('button', { name: 'Update Branch' });
        await Promise.all([updateBtn.click(), updateBtn.click()]);
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }



    // -- Appt_search negative scenario helpers --

    async Appt_searchWithEmptyValue() {
        await this.enableNotificationsbtn.click();
        await this.apptmenu.click();
        // await this.patientmenu.click();
        // await this.appt_book_btn.click();
        await this.appt_search_btn.fill('');
        // await this.appt_cancel_btn.click();
    }

    async Appt_searchWithInvalidValue(value) {
        await this.enableNotificationsbtn.click();
        await this.apptmenu.click();
        // await this.patientmenu.click();
        // await this.appt_book_btn.click();
        await this.appt_search_btn.fill(value);
        await this.appt_cancel_btn.click();
    }

    async Appt_searchWithMaxLengthValue() {
        await this.enableNotificationsbtn.click();
        await this.apptmenu.click();
        // await this.patientmenu.click();
        // await this.appt_book_btn.click();
        await this.appt_search_btn.fill('a'.repeat(500));
        await this.appt_cancel_btn.click();
    }

    async Appt_searchWithMinLengthValue() {
        await this.enableNotificationsbtn.click();
        await this.apptmenu.click();
        // await this.patientmenu.click();
        // await this.appt_book_btn.click();
        await this.appt_search_btn.fill('a');
        await this.appt_cancel_btn.click();
    }

    async Appt_searchDuplicate() {
        await this.enableNotificationsbtn.click();
        await this.apptmenu.click();
        // await this.patientmenu.click();
        // await this.appt_book_btn.click();
        // await this.appt_search_btn.fill('Deepthi');
        await this.appt_search_btn.fill('Deepthi');
        await this.appt_cancel_btn.click();
    }

    async Appt_searchWithApiFailure() {
        await this.enableNotificationsbtn.click();
        await this.apptmenu.click();
        // await this.patientmenu.click();
        // await this.appt_book_btn.click();
        await this.page.route('**/api/**', route => route.abort());
        await this.appt_patient_search.fill('Deepthi');
    }

    async Appt_searchSessionExpiry() {
        await this.enableNotificationsbtn.click();
        await this.apptmenu.click();
        // await this.patientmenu.click();
        // await this.appt_book_btn.click();
        await this.page.context().clearCookies();
        await this.appt_patient_search.fill('Deepthi');
    }

    async Appt_searchAndRefresh() {
        await this.enableNotificationsbtn.click();
        await this.apptmenu.click();
        // await this.patientmenu.click();
        // await this.appt_book_btn.click();
        await this.appt_search_btn.fill('Deepthi');
        await this.page.reload();
    }

    async Appt_searchAndNavigateBack() {

        await this.patientmenu.click();
        // await this.apptmenu.click();
        // await this.appt_book_btn.click();
        await this.appt_search_btn.fill('Deepthi');
        await this.page.goBack();
    }

    async Appt_searchConcurrent() {
        await this.enableNotificationsbtn.click();
        await this.apptmenu.click();
        await this.appt_book_btn.click();
        await Promise.all([
            this.appt_patient_search.fill('Deepthi'),
            this.appt_patient_search.fill('Konchada')
        ]);
        await this.appt_cancel_btn.click();
    }



    // -- bookAppointment negative scenario helpers --

    async bookAppointmentWithoutPatient(branchId, date, notes) {
        await this.enableNotificationsbtn.click();
        await this.apptmenu.click();
        await this.appt_book_btn.click();
        await this.appt_patient_search.fill('');
        await this.appt_next_details_btn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async bookAppointmentWithoutDate(patientSearch, branchId, notes) {
        await this.enableNotificationsbtn.click();
        await this.apptmenu.click();
        await this.appt_book_btn.click();
        await this.appt_patient_search.fill(patientSearch);
        await this.appt_patient_result_full.waitFor({ state: 'visible' });
        await this.appt_patient_result_full.click();
        await this.appt_next_details_btn.click();
        await this.appt_notes.fill(notes);
    }

    async bookAppointmentWithInvalidDate(patientSearch, branchId, notes) {
        await this.enableNotificationsbtn.click();
        await this.apptmenu.click();
        await this.appt_book_btn.click();
        await this.appt_patient_search.fill(patientSearch);
        await this.appt_patient_result_full.waitFor({ state: 'visible' });
        await this.appt_patient_result_full.click();
        await this.appt_next_details_btn.click();
        await this.appt_notes.fill(notes);
    }

    async bookAppointmentWithPastDate(patientSearch, branchId, notes) {
        await this.enableNotificationsbtn.click();
        await this.apptmenu.click();
        await this.appt_book_btn.click();
        await this.appt_patient_search.fill(patientSearch);
        await this.appt_patient_result_full.waitFor({ state: 'visible' });
        await this.appt_patient_result_full.click();
        await this.appt_next_details_btn.click();
        await this.appt_date.fill('2000-01-01');
        await this.appt_notes.fill(notes);
    }

    async bookAppointmentWithMaxLengthNotes(patientSearch, branchId, date) {
        await this.enableNotificationsbtn.click();
        await this.apptmenu.click();
        await this.appt_book_btn.click();
        await this.appt_patient_search.fill(patientSearch);
        await this.appt_patient_result_full.click();
        await this.appt_next_details_btn.click();
        await this.appt_branch_select.selectOption(branchId);
        await this.appt_type_dropdown.getByRole('img').click();
        await this.appt_type_video.click();
        await this.appt_visit_type_dropdown.click();
        await this.appt_visit_type_first.click();
        await this.appt_dept_dropdown.click();
        await this.appt_dept_option.click();
        await this.appt_date.fill(date);
        await this.appt_doctor_search.click();
        await this.appt_doctor_option.click();
        await this.appt_time_slot.click();
        await this.appt_notes.fill('a'.repeat(1000));
        await this.appt_next_review_btn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async bookAppointmentWithMinLengthNotes(patientSearch, branchId, date) {
        await this.enableNotificationsbtn.click();
        await this.apptmenu.click();
        await this.appt_book_btn.click();
        await this.appt_patient_search.fill(patientSearch);
        await this.appt_patient_result_full.click();
        await this.appt_next_details_btn.click();
        await this.appt_branch_select.selectOption(branchId);
        await this.appt_type_dropdown.getByRole('img').click();
        await this.appt_type_video.click();
        await this.appt_visit_type_dropdown.click();
        await this.appt_visit_type_first.click();
        await this.appt_dept_dropdown.click();
        await this.appt_dept_option.click();
        await this.appt_date.fill(date);
        await this.appt_doctor_search.click();
        await this.appt_doctor_option.click();
        await this.appt_time_slot.click();
        await this.appt_notes.fill('a');
        await this.appt_next_review_btn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async bookAppointmentDuplicate(patientSearch, branchId, date, notes) {
        await this.enableNotificationsbtn.click();
        await this.apptmenu.click();
        await this.appt_book_btn.click();
        await this.appt_patient_search.fill(patientSearch);
        await this.appt_patient_result_full.click();
        await this.appt_next_details_btn.click();
        await this.appt_branch_select.selectOption(branchId);
        await this.appt_type_dropdown.getByRole('img').click();
        await this.appt_type_video.click();
        await this.appt_visit_type_dropdown.click();
        await this.appt_visit_type_first.click();
        await this.appt_dept_dropdown.click();
        await this.appt_dept_option.click();
        await this.appt_date.fill(date);
        await this.appt_doctor_search.click();
        await this.appt_doctor_option.click();
        await this.appt_time_slot.click();
        await this.appt_notes.fill(notes);
        await this.appt_next_review_btn.click();
        await this.appt_proceed_payment_btn.click();
        await this.appt_share_payment_btn.click();
        await this.appt_book_btn.click();
        await this.appt_patient_search.fill(patientSearch);
        await this.appt_patient_result_full.click();
        await this.appt_next_details_btn.click();
        await this.appt_branch_select.selectOption(branchId);
        await this.appt_date.fill(date);
        await this.appt_doctor_search.click();
        await this.appt_doctor_option.click();
        await this.appt_time_slot.click();
        await this.appt_next_review_btn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async bookAppointmentWithApiFailure(patientSearch, branchId, date, notes) {
        await this.enableNotificationsbtn.click();
        await this.apptmenu.click();
        await this.appt_book_btn.click();
        await this.appt_patient_search.fill(patientSearch);
        await this.appt_patient_result_full.click();
        await this.appt_next_details_btn.click();
        await this.appt_branch_select.selectOption(branchId);
        await this.appt_type_dropdown.getByRole('img').click();
        await this.appt_type_video.click();
        await this.appt_visit_type_dropdown.click();
        await this.appt_visit_type_first.click();
        await this.appt_dept_dropdown.click();
        await this.appt_dept_option.click();
        await this.appt_date.fill(date);
        await this.appt_doctor_search.click();
        await this.appt_doctor_option.click();
        await this.appt_time_slot.click();
        await this.appt_notes.fill(notes);
        await this.appt_next_review_btn.click();
        await this.page.route('**/api/**', route => route.abort());
        await this.appt_proceed_payment_btn.click();
    }

    async bookAppointmentSessionExpiry() {
        await this.enableNotificationsbtn.click();
        await this.apptmenu.click();
        await this.appt_book_btn.click();
        await this.page.context().clearCookies();
        await this.appt_next_details_btn.click();
    }

    async bookAppointmentAndRefresh(patientSearch, branchId, date, notes) {
        await this.enableNotificationsbtn.click();
        await this.apptmenu.click();
        await this.appt_book_btn.click();
        await this.appt_patient_search.fill(patientSearch);
        await this.appt_patient_result_full.click();
        await this.appt_next_details_btn.click();
        await this.appt_branch_select.selectOption(branchId);
        await this.appt_date.fill(date);
        await this.page.reload();
    }

    async bookAppointmentAndNavigateBack(patientSearch, branchId, date, notes) {
        await this.enableNotificationsbtn.click();
        await this.apptmenu.click();
        await this.appt_book_btn.click();
        await this.appt_patient_search.fill(patientSearch);
        await this.appt_patient_result_full.click();
        await this.appt_next_details_btn.click();
        await this.appt_branch_select.selectOption(branchId);
        await this.appt_date.fill(date);
        await this.page.goBack();
    }

    async bookAppointmentConcurrent(patientSearch, branchId, date, notes) {
        await this.enableNotificationsbtn.click();
        await this.apptmenu.click();
        await this.appt_book_btn.click();
        await this.appt_patient_search.fill(patientSearch);
        await this.appt_patient_result_full.click();
        await this.appt_next_details_btn.click();
        await this.appt_branch_select.selectOption(branchId);
        await this.appt_type_dropdown.getByRole('img').click();
        await this.appt_type_video.click();
        await this.appt_visit_type_dropdown.click();
        await this.appt_visit_type_first.click();
        await this.appt_dept_dropdown.click();
        await this.appt_dept_option.click();
        await this.appt_date.fill(date);
        await this.appt_doctor_search.click();
        await this.appt_doctor_option.click();
        await this.appt_time_slot.click();
        await this.appt_notes.fill(notes);
        await this.appt_next_review_btn.click();
        const payBtn = this.appt_proceed_payment_btn;
        await Promise.all([payBtn.click(), payBtn.click()]);
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }



    // -- add_coupon negative scenario helpers --

    async add_couponWithoutName(code, startDate, endDate, usageLimit, discountValue) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.coupon_menu.click();
        await this.coupon_add_btn.click();
        await this.coupon_code.click();
        await this.coupon_code.fill(code);
        await this.coupon_type_dropdown.click();
        await this.coupon_type_option.click();
        await this.coupon_start_date.fill(startDate);
        await this.coupon_end_date.fill(endDate);
        await this.coupon_usage_limit.fill(usageLimit);
        await this.coupon_discount_value.fill(discountValue);
        await this.coupon_save_btn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async add_couponWithoutCode(name, startDate, endDate, usageLimit, discountValue) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.coupon_menu.click();
        await this.coupon_add_btn.click();
        await this.coupon_name.click();
        await this.coupon_name.fill(name);
        await this.coupon_type_dropdown.click();
        await this.coupon_type_option.click();
        await this.coupon_start_date.fill(startDate);
        await this.coupon_end_date.fill(endDate);
        await this.coupon_usage_limit.fill(usageLimit);
        await this.coupon_discount_value.fill(discountValue);
        await this.coupon_save_btn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async add_couponWithInvalidData(name, code, startDate, endDate, usageLimit, discountValue) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.coupon_menu.click();
        await this.coupon_add_btn.click();
        await this.coupon_name.fill(name);
        await this.coupon_code.fill(code);
        await this.coupon_type_dropdown.click();
        await this.coupon_type_option.click();
        await this.coupon_start_date.fill(startDate);
        await this.coupon_end_date.fill(endDate);
        await this.coupon_usage_limit.fill(usageLimit);
        await this.coupon_discount_value.fill(discountValue);
        await this.coupon_save_btn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async add_couponWithEndDateBeforeStartDate(name, code, usageLimit, discountValue) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.coupon_menu.click();
        await this.coupon_add_btn.click();
        await this.coupon_name.fill(name);
        await this.coupon_code.fill(code);
        await this.coupon_type_dropdown.click();
        await this.coupon_type_option.first().click();
        await this.coupon_start_date.fill('2026-12-31');
        await this.coupon_end_date.fill('2026-09-01');
        await this.coupon_usage_limit.fill(usageLimit);
        await this.coupon_discount_value.fill(discountValue);
        await this.coupon_save_btn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async add_couponWithMaxLengthName(code, startDate, endDate, usageLimit, discountValue) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.coupon_menu.click();
        await this.coupon_add_btn.click();
        await this.coupon_name.fill('a'.repeat(500));
        await this.coupon_code.fill(code);
        await this.coupon_type_dropdown.click();
        await this.coupon_type_option.first().click();
        await this.coupon_start_date.fill(startDate);
        await this.coupon_end_date.fill(endDate);
        await this.coupon_usage_limit.fill(usageLimit);
        await this.coupon_discount_value.fill(discountValue);
        await this.coupon_save_btn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async add_couponWithMinLengthName(code, startDate, endDate, usageLimit, discountValue) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.coupon_menu.click();
        await this.coupon_add_btn.click();
        await this.coupon_name.fill('a');
        await this.coupon_code.fill(code);
        await this.coupon_type_dropdown.click();
        await this.coupon_type_option.first().click();
        await this.coupon_start_date.fill(startDate);
        await this.coupon_end_date.fill(endDate);
        await this.coupon_usage_limit.fill(usageLimit);
        await this.coupon_discount_value.fill(discountValue);
        await this.coupon_save_btn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async add_couponDuplicate(name, code, startDate, endDate, usageLimit, discountValue) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.coupon_menu.click();
        await this.coupon_add_btn.click();
        await this.coupon_name.fill(name);
        await this.coupon_code.fill(code);
        await this.coupon_type_dropdown.click();
        await this.coupon_type_option.first().click();
        await this.coupon_start_date.fill(startDate);
        await this.coupon_end_date.fill(endDate);
        await this.coupon_usage_limit.fill(usageLimit);
        await this.coupon_discount_value.fill(discountValue);
        await this.coupon_save_btn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
        await this.coupon_add_btn.click();
        await this.coupon_name.fill(name);
        await this.coupon_code.fill(code);
        await this.coupon_type_dropdown.click();
        await this.coupon_type_option.first().click();
        await this.coupon_start_date.fill(startDate);
        await this.coupon_end_date.fill(endDate);
        await this.coupon_usage_limit.fill(usageLimit);
        await this.coupon_discount_value.fill(discountValue);
        await this.coupon_save_btn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async add_couponWithApiFailure(name, code, startDate, endDate, usageLimit, discountValue) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.coupon_menu.click();
        await this.coupon_add_btn.click();
        await this.coupon_name.fill(name);
        await this.coupon_code.fill(code);
        await this.coupon_type_dropdown.click();
        await this.coupon_type_option.first().click();
        await this.coupon_start_date.fill(startDate);
        await this.coupon_end_date.fill(endDate);
        await this.coupon_usage_limit.fill(usageLimit);
        await this.coupon_discount_value.fill(discountValue);
        await this.page.route('**/api/**', route => route.abort());
        await this.coupon_save_btn.click();
    }

    async add_couponSessionExpiry() {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.coupon_menu.click();
        await this.coupon_add_btn.click();
        await this.page.context().clearCookies();
        await this.coupon_save_btn.click();
    }

    async add_couponAndRefresh(name, code, startDate, endDate) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.coupon_menu.click();
        await this.coupon_add_btn.click();
        await this.coupon_name.fill(name);
        await this.coupon_code.fill(code);
        await this.coupon_start_date.fill(startDate);
        await this.coupon_end_date.fill(endDate);
        await this.page.reload();
    }

    async add_couponAndNavigateBack(name, code, startDate, endDate) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.coupon_menu.click();
        await this.coupon_add_btn.click();
        await this.coupon_name.fill(name);
        await this.coupon_code.fill(code);
        await this.coupon_start_date.fill(startDate);
        await this.coupon_end_date.fill(endDate);
        await this.page.goBack();
    }

    async add_couponConcurrent(name, code, startDate, endDate, usageLimit, discountValue) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.coupon_menu.click();
        await this.coupon_add_btn.click();
        await this.coupon_name.fill(name);
        await this.coupon_code.fill(code);
        await this.coupon_type_dropdown.click();
        await this.coupon_type_option.first().click();
        await this.coupon_start_date.fill(startDate);
        await this.coupon_end_date.fill(endDate);
        await this.coupon_usage_limit.fill(usageLimit);
        await this.coupon_discount_value.fill(discountValue);
        await Promise.all([this.coupon_save_btn.click(), this.coupon_save_btn.click()]);
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }



    // -- edit_coupon negative scenario helpers --

    async edit_couponWithEmptyName() {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.coupon_menu.click();
        await this.coupon_row_btn.first().click();
        await this.coupon_edit_btn.click();
        await this.coupon_name.fill('');
        await this.coupon_update_btn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async edit_couponWithInvalidName(name) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.coupon_menu.click();
        await this.coupon_row_btn.first().click();
        await this.coupon_edit_btn.click();
        await this.coupon_name.fill(name);
        await this.coupon_update_btn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async edit_couponWithPastEndDate() {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.coupon_menu.click();
        await this.coupon_row_btn.first().click();
        await this.coupon_edit_btn.click();
        await this.coupon_end_date.fill('2000-01-01');
        await this.coupon_update_btn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async edit_couponWithInvalidDiscountValue(value) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.coupon_menu.click();
        await this.coupon_row_btn.first().click();
        await this.coupon_edit_btn.click();
        await this.coupon_discount_value.fill(value);
        await this.coupon_update_btn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async edit_couponWithMaxLengthName() {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.coupon_menu.click();
        await this.coupon_row_btn.first().click();
        await this.coupon_edit_btn.click();
        await this.coupon_name.fill('a'.repeat(500));
        await this.coupon_update_btn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async edit_couponWithMinLengthName() {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.coupon_menu.click();
        await this.coupon_row_btn.first().click();
        await this.coupon_edit_btn.click();
        await this.coupon_name.fill('a');
        await this.coupon_update_btn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async edit_couponDuplicate(name, endDate, discountValue) {
        await this.enableNotificationsbtn.click();
        await this.coupon_menu.click();
        await this.coupon_row_btn.first().click();
        await this.coupon_edit_btn.click();
        await this.coupon_name.fill(name);
        await this.coupon_end_date.fill(endDate);
        await this.coupon_discount_value.fill(discountValue);
        await this.coupon_update_btn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
        await this.coupon_row_btn.first().click();
        await this.coupon_edit_btn.click();
        await this.coupon_name.fill(name);
        await this.coupon_end_date.fill(endDate);
        await this.coupon_discount_value.fill(discountValue);
        await this.coupon_update_btn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async edit_couponWithApiFailure(name, endDate, discountValue) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.coupon_menu.click();
        await this.coupon_row_btn.first().click();
        await this.coupon_edit_btn.click();
        await this.coupon_name.fill(name);
        await this.coupon_end_date.fill(endDate);
        await this.coupon_discount_value.fill(discountValue);
        await this.page.route('**/api/**', route => route.abort());
        await this.coupon_update_btn.click();
    }

    async edit_couponSessionExpiry() {
        await this.enableNotificationsbtn.click();
        await this.coupon_menu.click();
        await this.coupon_row_btn.first().click();
        await this.coupon_edit_btn.click();
        await this.page.context().clearCookies();
        await this.coupon_update_btn.click();
    }

    async edit_couponAndRefresh(name, endDate, discountValue) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.coupon_menu.click();
        await this.coupon_row_btn.first().click();
        await this.coupon_edit_btn.click();
        await this.coupon_name.fill(name);
        await this.coupon_end_date.fill(endDate);
        await this.coupon_discount_value.fill(discountValue);
        await this.page.reload();
    }

    async edit_couponAndNavigateBack(name, endDate, discountValue) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.coupon_menu.click();
        await this.coupon_row_btn.first().click();
        await this.coupon_edit_btn.click();
        await this.coupon_name.fill(name);
        await this.coupon_end_date.fill(endDate);
        await this.coupon_discount_value.fill(discountValue);
        await this.page.goBack();
    }

    async edit_couponConcurrent(name, endDate, discountValue) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.coupon_menu.click();
        await this.coupon_row_btn.first().click();
        await this.coupon_edit_btn.click();
        await this.coupon_name.fill(name);
        await this.coupon_end_date.fill(endDate);
        await this.coupon_discount_value.fill(discountValue);
        await Promise.all([this.coupon_update_btn.click(), this.coupon_update_btn.click()]);
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }



    // -- add_adhoc_service negative scenario helpers --

    async add_adhoc_serviceWithoutName(serviceType, billingPrice, refPrice, visibility, quantity, expiryDate, notes) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.adhoc_menu.click();
        await this.adhoc_add_btn.click();
        // await this.adhoc_service_type.selectOption(serviceType);
        await this.adhoc_billing_price.fill(billingPrice);
        await this.adhoc_ref_price.fill(refPrice);
        // await this.adhoc_visibility.selectOption(visibility);
        await this.adhoc_quantity.fill(quantity);
        await this.adhoc_expiry_date.fill(expiryDate);
        await this.adhoc_notes.fill(notes);
        await this.adhoc_save_btn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async add_adhoc_serviceWithoutBillingPrice(name, serviceType, refPrice, visibility, quantity, expiryDate, notes) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.adhoc_menu.click();
        await this.adhoc_add_btn.click();
        await this.adhoc_name.fill(name);
        // await this.adhoc_service_type.selectOption(serviceType);
        await this.adhoc_ref_price.fill(refPrice);
        // await this.adhoc_visibility.selectOption(visibility);
        await this.adhoc_quantity.fill(quantity);
        await this.adhoc_expiry_date.fill(expiryDate);
        await this.adhoc_notes.fill(notes);
        await this.adhoc_save_btn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async add_adhoc_serviceWithInvalidData(name, serviceType, billingPrice, refPrice, visibility, quantity, expiryDate, notes) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.adhoc_menu.click();
        await this.adhoc_add_btn.click();
        await this.adhoc_name.fill(name);
        // await this.adhoc_service_type.selectOption(serviceType);
        await this.adhoc_billing_price.fill(billingPrice);
        await this.adhoc_ref_price.fill(refPrice);
        // await this.adhoc_visibility.selectOption(visibility);
        await this.adhoc_quantity.fill(quantity);
        await this.adhoc_expiry_date.fill(expiryDate);
        await this.adhoc_notes.fill(notes);
        await this.adhoc_save_btn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async add_adhoc_serviceWithPastExpiryDate(name, serviceType, billingPrice, refPrice, visibility, quantity, notes) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.adhoc_menu.click();
        await this.adhoc_add_btn.click();
        await this.adhoc_name.fill(name);
        // await this.adhoc_service_type.selectOption(serviceType);
        await this.adhoc_billing_price.fill(billingPrice);
        await this.adhoc_ref_price.fill(refPrice);
        // await this.adhoc_visibility.selectOption(visibility);
        await this.adhoc_quantity.fill(quantity);
        await this.adhoc_expiry_date.fill('2000-01-01');
        await this.adhoc_notes.fill(notes);
        await this.adhoc_save_btn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async add_adhoc_serviceWithMaxLengthName(serviceType, billingPrice, refPrice, visibility, quantity, expiryDate, notes) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.adhoc_menu.click();
        await this.adhoc_add_btn.click();
        await this.adhoc_name.fill('a'.repeat(500));
        // await this.adhoc_service_type.selectOption(serviceType);
        await this.adhoc_billing_price.fill(billingPrice);
        await this.adhoc_ref_price.fill(refPrice);
        // await this.adhoc_visibility.selectOption(visibility);
        await this.adhoc_quantity.fill(quantity);
        await this.adhoc_expiry_date.fill(expiryDate);
        await this.adhoc_notes.fill(notes);
        await this.adhoc_save_btn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async add_adhoc_serviceWithMinLengthName(serviceType, billingPrice, refPrice, visibility, quantity, expiryDate, notes) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.adhoc_menu.click();
        await this.adhoc_add_btn.click();
        await this.adhoc_name.fill('a');
        // await this.adhoc_service_type.selectOption(serviceType);
        await this.adhoc_billing_price.fill(billingPrice);
        await this.adhoc_ref_price.fill(refPrice);
        // await this.adhoc_visibility.selectOption(visibility);
        await this.adhoc_quantity.fill(quantity);
        await this.adhoc_expiry_date.fill(expiryDate);
        await this.adhoc_notes.fill(notes);
        await this.adhoc_save_btn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async add_adhoc_serviceDuplicate(name, serviceType, billingPrice, refPrice, visibility, quantity, expiryDate, notes) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.adhoc_menu.click();
        await this.adhoc_add_btn.click();
        await this.adhoc_name.fill(name);
        // await this.adhoc_service_type.selectOption(serviceType);
        await this.adhoc_billing_price.fill(billingPrice);
        await this.adhoc_ref_price.fill(refPrice);
        // await this.adhoc_visibility.selectOption(visibility);
        await this.adhoc_quantity.fill(quantity);
        await this.adhoc_expiry_date.fill(expiryDate);
        await this.adhoc_notes.fill(notes);
        await this.adhoc_save_btn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
        await this.adhoc_add_btn.click();
        await this.adhoc_name.fill(name);
        await this.adhoc_service_type.selectOption(serviceType);
        await this.adhoc_billing_price.fill(billingPrice);
        await this.adhoc_ref_price.fill(refPrice);
        await this.adhoc_visibility.selectOption(visibility);
        await this.adhoc_quantity.fill(quantity);
        await this.adhoc_expiry_date.fill(expiryDate);
        await this.adhoc_notes.fill(notes);
        await this.adhoc_save_btn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async add_adhoc_serviceWithApiFailure(name, serviceType, billingPrice, refPrice, visibility, quantity, expiryDate, notes) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.adhoc_menu.click();
        await this.adhoc_add_btn.click();
        await this.adhoc_name.fill(name);
        // await this.adhoc_service_type.selectOption(serviceType);
        await this.adhoc_billing_price.fill(billingPrice);
        await this.adhoc_ref_price.fill(refPrice);
        // await this.adhoc_visibility.selectOption(visibility);
        await this.adhoc_quantity.fill(quantity);
        await this.adhoc_expiry_date.fill(expiryDate);
        await this.adhoc_notes.fill(notes);
        await this.page.route('**/api/**', route => route.abort());
        await this.adhoc_save_btn.click();
    }

    async add_adhoc_serviceSessionExpiry() {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.adhoc_menu.click();
        await this.adhoc_add_btn.click();
        await this.page.context().clearCookies();
        await this.adhoc_save_btn.click();
    }

    async add_adhoc_serviceAndRefresh(name, serviceType, billingPrice, expiryDate) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.adhoc_menu.click();
        await this.adhoc_add_btn.click();
        await this.adhoc_name.fill(name);
        // await this.adhoc_service_type.selectOption(serviceType);
        await this.adhoc_billing_price.fill(billingPrice);
        await this.adhoc_expiry_date.fill(expiryDate);
        await this.page.reload();
    }

    async add_adhoc_serviceAndNavigateBack(name, serviceType, billingPrice, expiryDate) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.adhoc_menu.click();
        await this.adhoc_add_btn.click();
        await this.adhoc_name.fill(name);
        // await this.adhoc_service_type.selectOption(serviceType);
        await this.adhoc_billing_price.fill(billingPrice);
        await this.adhoc_expiry_date.fill(expiryDate);
        await this.page.goBack();
    }

    async add_adhoc_serviceConcurrent(name, serviceType, billingPrice, refPrice, visibility, quantity, expiryDate, notes) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.adhoc_menu.click();
        await this.adhoc_add_btn.click();
        await this.adhoc_name.fill(name);
        // await this.adhoc_service_type.selectOption(serviceType);
        await this.adhoc_billing_price.fill(billingPrice);
        await this.adhoc_ref_price.fill(refPrice);
        // await this.adhoc_visibility.selectOption(visibility);
        await this.adhoc_quantity.fill(quantity);
        await this.adhoc_expiry_date.fill(expiryDate);
        await this.adhoc_notes.fill(notes);
        await Promise.all([this.adhoc_save_btn.click(), this.adhoc_save_btn.click()]);
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }


    // -- edit_adhoc_service negative scenario helpers --

    async edit_adhoc_serviceWithEmptyName(expiryDate, visibility, billingPrice, notes) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.adhoc_menu.click();
        await this.adhoc_row_btn.first().click();
        await this.adhoc_edit_btn.click();
        await this.adhoc_name.fill('');
        await this.adhoc_update_btn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async edit_adhoc_serviceWithInvalidData(name, expiryDate, visibility, billingPrice, notes) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.adhoc_menu.click();
        await this.adhoc_row_btn.first().click();
        await this.adhoc_edit_btn.click();
        await this.adhoc_name.fill(name);
        await this.adhoc_expiry_date.fill(expiryDate);
        // await this.adhoc_visibility.selectOption(visibility);
        await this.adhoc_billing_price.fill(billingPrice);
        await this.adhoc_notes.fill(notes);
        await this.adhoc_update_btn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async edit_adhoc_serviceWithNegativeBillingPrice() {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.adhoc_menu.click();
        await this.adhoc_row_btn.first().click();
        await this.adhoc_edit_btn.click();
        await this.adhoc_billing_price.fill('-1');
        await this.adhoc_update_btn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async edit_adhoc_serviceWithPastExpiryDate() {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.adhoc_menu.click();
        await this.adhoc_row_btn.first().click();
        await this.adhoc_edit_btn.click();
        await this.adhoc_expiry_date.fill('2000-01-01');
        await this.adhoc_update_btn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async edit_adhoc_serviceWithMaxLengthName(expiryDate, visibility, billingPrice, notes) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.adhoc_menu.click();
        await this.adhoc_row_btn.first().click();
        await this.adhoc_edit_btn.click();
        await this.adhoc_name.fill('a'.repeat(500));
        await this.adhoc_expiry_date.fill(expiryDate);
        // await this.adhoc_visibility.selectOption(visibility);
        await this.adhoc_billing_price.fill(billingPrice);
        await this.adhoc_notes.fill(notes);
        await this.adhoc_update_btn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async edit_adhoc_serviceWithMinLengthName(expiryDate, visibility, billingPrice, notes) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.adhoc_menu.click();
        await this.adhoc_row_btn.first().click();
        await this.adhoc_edit_btn.click();
        await this.adhoc_name.fill('a');
        await this.adhoc_expiry_date.fill(expiryDate);
        // await this.adhoc_visibility.selectOption(visibility);
        await this.adhoc_billing_price.fill(billingPrice);
        await this.adhoc_notes.fill(notes);
        await this.adhoc_update_btn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async edit_adhoc_serviceDuplicate(name, expiryDate, visibility, billingPrice, notes) {

        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.adhoc_menu.click();
        await this.adhoc_row_btn.first().click();
        await this.adhoc_edit_btn.click();
        await this.adhoc_name.fill(name);
        await this.adhoc_expiry_date.fill(expiryDate);
        // await this.adhoc_visibility.selectOption(visibility);
        await this.adhoc_billing_price.fill(billingPrice);
        await this.adhoc_notes.fill(notes);
        await this.adhoc_update_btn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
        await this.adhoc_row_btn.first().click();
        await this.adhoc_edit_btn.click();
        await this.adhoc_name.fill(name);
        await this.adhoc_expiry_date.fill(expiryDate);
        await this.adhoc_visibility.selectOption(visibility);
        await this.adhoc_billing_price.fill(billingPrice);
        await this.adhoc_notes.fill(notes);
        await this.adhoc_update_btn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async edit_adhoc_serviceWithApiFailure(name, expiryDate, visibility, billingPrice, notes) {

        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.adhoc_menu.click();
        await this.adhoc_row_btn.first().click();
        await this.adhoc_edit_btn.click();
        await this.adhoc_name.fill(name);
        await this.adhoc_expiry_date.fill(expiryDate);
        // await this.adhoc_visibility.selectOption(visibility);
        await this.adhoc_billing_price.fill(billingPrice);
        await this.adhoc_notes.fill(notes);
        await this.page.route('**/api/**', route => route.abort());
        await this.adhoc_update_btn.click();
    }

    async edit_adhoc_serviceSessionExpiry() {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.adhoc_menu.click();
        await this.adhoc_row_btn.first().click();
        await this.adhoc_edit_btn.click();
        await this.page.context().clearCookies();
        await this.adhoc_update_btn.click();
    }

    async edit_adhoc_serviceAndRefresh(name, expiryDate, billingPrice) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.adhoc_menu.click();
        await this.adhoc_row_btn.first().click();
        await this.adhoc_edit_btn.click();
        await this.adhoc_name.fill(name);
        await this.adhoc_expiry_date.fill(expiryDate);
        await this.adhoc_billing_price.fill(billingPrice);
        await this.page.reload();
    }

    async edit_adhoc_serviceAndNavigateBack(name, expiryDate, billingPrice) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.adhoc_menu.click();
        await this.adhoc_row_btn.first().click();
        await this.adhoc_edit_btn.click();
        await this.adhoc_name.fill(name);
        await this.adhoc_expiry_date.fill(expiryDate);
        await this.adhoc_billing_price.fill(billingPrice);
        await this.page.goBack();
    }

    async edit_adhoc_serviceConcurrent(name, expiryDate, visibility, billingPrice, notes) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.adhoc_menu.click();
        await this.adhoc_row_btn.first().click();
        await this.adhoc_edit_btn.click();
        await this.adhoc_name.fill(name);
        await this.adhoc_expiry_date.fill(expiryDate);
        // await this.adhoc_visibility.selectOption(visibility);
        await this.adhoc_billing_price.fill(billingPrice);
        await this.adhoc_notes.fill(notes);
        await Promise.all([this.adhoc_update_btn.click(), this.adhoc_update_btn.click()]);
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }


    // -- adhoc_search_filter negative scenario helpers --

    async adhoc_search_filterWithEmptyValue() {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.adhoc_menu.click();
        await this.adhoc_search.fill('');
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async adhoc_search_filterWithInvalidValue(value) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.adhoc_menu.click();
        await this.adhoc_search.fill(value);
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async adhoc_search_filterWithMaxLengthValue() {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.adhoc_menu.click();
        await this.adhoc_search.fill('a'.repeat(500));
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async adhoc_search_filterWithMinLengthValue() {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.adhoc_menu.click();
        await this.adhoc_search.fill('a');
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async adhoc_search_filterDuplicate(searchText) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.adhoc_menu.click();
        await this.adhoc_search.fill(searchText);
        await this.adhoc_search.fill(searchText);
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async adhoc_search_filterWithApiFailure(searchText) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.adhoc_menu.click();
        await this.page.route('**/api/**', route => route.abort());
        await this.adhoc_search.fill(searchText);
    }

    async adhoc_search_filterSessionExpiry(searchText) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.adhoc_menu.click();
        await this.page.context().clearCookies();
        await this.adhoc_search.fill(searchText);
    }

    async adhoc_search_filterAndRefresh(searchText) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.adhoc_menu.click();
        await this.adhoc_search.fill(searchText);
        await this.page.reload();
    }

    async adhoc_search_filterAndNavigateBack(searchText) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.adhoc_menu.click();
        await this.adhoc_search.fill(searchText);
        await this.page.goBack();
    }

    async adhoc_search_filterConcurrent(searchText) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.adhoc_menu.click();
        await Promise.all([
            this.adhoc_search.fill(searchText),
            this.adhoc_search.fill('fever')
        ]);
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }



    async CreateInvoice(branchOptionValue, serviceDesc, qty, unitPrice, discount, notes) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.invoicesSubmenu.click();
        await this.createInvoiceBtn.click();
        await this.invoiceBranchSelect.selectOption(branchOptionValue);
        await this.invoicePatientDropdown.click();
        await this.invoicePatientOption.click();
        await this.invoiceServiceDesc.fill(serviceDesc);
        await this.invoiceQty.fill(qty);
        await this.invoiceUnitPrice.fill(unitPrice);
        await this.invoiceDiscount.fill(discount);
        await this.invoiceNotes.fill(notes);
        await this.invoiceSubmitBtn.click();
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });
    }

    async CreateInvoiceWithoutServiceDesc(branchOptionValue, qty, unitPrice, discount, notes) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.invoicesSubmenu.click();
        await this.createInvoiceBtn.click();
        await this.invoiceBranchSelect.selectOption(branchOptionValue);
        await this.invoicePatientDropdown.click();
        await this.invoicePatientOption.click();
        await this.invoiceQty.fill(qty);
        await this.invoiceUnitPrice.fill(unitPrice);
        await this.invoiceDiscount.fill(discount);
        await this.invoiceNotes.fill(notes);
        await this.invoiceSubmitBtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async CreateInvoiceWithoutQty(branchOptionValue, serviceDesc, unitPrice, discount, notes) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.invoicesSubmenu.click();
        await this.createInvoiceBtn.click();
        await this.invoiceBranchSelect.selectOption(branchOptionValue);
        await this.invoicePatientDropdown.click();
        await this.invoicePatientOption.click();
        await this.invoiceServiceDesc.fill(serviceDesc);
        await this.invoiceUnitPrice.fill(unitPrice);
        await this.invoiceDiscount.fill(discount);
        await this.invoiceNotes.fill(notes);
        await this.invoiceSubmitBtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async CreateInvoiceWithoutUnitPrice(branchOptionValue, serviceDesc, qty, discount, notes) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.invoicesSubmenu.click();
        await this.createInvoiceBtn.click();
        await this.invoiceBranchSelect.selectOption(branchOptionValue);
        await this.invoicePatientDropdown.click();
        await this.invoicePatientOption.click();
        await this.invoiceServiceDesc.fill(serviceDesc);
        await this.invoiceQty.fill(qty);
        await this.invoiceDiscount.fill(discount);
        await this.invoiceNotes.fill(notes);
        await this.invoiceSubmitBtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async CreateInvoiceWithZeroUnitPrice(branchOptionValue, serviceDesc, qty, discount, notes) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.invoicesSubmenu.click();
        await this.createInvoiceBtn.click();
        await this.invoiceBranchSelect.selectOption(branchOptionValue);
        await this.invoicePatientDropdown.click();
        await this.invoicePatientOption.click();
        await this.invoiceServiceDesc.fill(serviceDesc);
        await this.invoiceQty.fill(qty);
        await this.invoiceUnitPrice.fill('0');
        await this.invoiceDiscount.fill(discount);
        await this.invoiceNotes.fill(notes);
        await this.invoiceSubmitBtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async CreateInvoiceWithNegativeUnitPrice(branchOptionValue, serviceDesc, qty, discount, notes) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.invoicesSubmenu.click();
        await this.createInvoiceBtn.click();
        await this.invoiceBranchSelect.selectOption(branchOptionValue);
        await this.invoicePatientDropdown.click();
        await this.invoicePatientOption.click();
        await this.invoiceServiceDesc.fill(serviceDesc);
        await this.invoiceQty.fill(qty);
        await this.invoiceUnitPrice.fill('-100');
        await this.invoiceDiscount.fill(discount);
        await this.invoiceNotes.fill(notes);
        await this.invoiceSubmitBtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async CreateInvoiceWithExcessiveDiscount(branchOptionValue, serviceDesc, qty, unitPrice, notes) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.invoicesSubmenu.click();
        await this.createInvoiceBtn.click();
        await this.invoiceBranchSelect.selectOption(branchOptionValue);
        await this.invoicePatientDropdown.click();
        await this.invoicePatientOption.click();
        await this.invoiceServiceDesc.fill(serviceDesc);
        await this.invoiceQty.fill(qty);
        await this.invoiceUnitPrice.fill(unitPrice);
        await this.invoiceDiscount.fill('99999');
        await this.invoiceNotes.fill(notes);
        await this.invoiceSubmitBtn.click();
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

    async CreateInvoiceWithApiFailure(branchOptionValue, serviceDesc, qty, unitPrice, discount, notes) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.invoicesSubmenu.click();
        await this.createInvoiceBtn.click();
        await this.invoiceBranchSelect.selectOption(branchOptionValue);
        await this.invoicePatientDropdown.click();
        await this.invoicePatientOption.click();
        await this.invoiceServiceDesc.fill(serviceDesc);
        await this.invoiceQty.fill(qty);
        await this.invoiceUnitPrice.fill(unitPrice);
        await this.invoiceDiscount.fill(discount);
        await this.invoiceNotes.fill(notes);
        await this.page.route('**/api/**', route => route.abort());
        await this.invoiceSubmitBtn.click();
    }

    async CreateInvoiceSessionExpiry() {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.invoicesSubmenu.click();
        await this.createInvoiceBtn.click();
        await this.page.context().clearCookies();
        await this.invoiceSubmitBtn.click();
    }

    async CreateInvoiceAndRefresh(branchOptionValue, serviceDesc, qty, unitPrice) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.invoicesSubmenu.click();
        await this.createInvoiceBtn.click();
        await this.invoiceBranchSelect.selectOption(branchOptionValue);
        await this.invoicePatientDropdown.click();
        await this.invoicePatientOption.click();
        await this.invoiceServiceDesc.fill(serviceDesc);
        await this.invoiceQty.fill(qty);
        await this.invoiceUnitPrice.fill(unitPrice);
        await this.page.reload();
    }

    async CreateInvoiceAndNavigateBack(branchOptionValue, serviceDesc, qty, unitPrice) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.invoicesSubmenu.click();
        await this.createInvoiceBtn.click();
        await this.invoiceBranchSelect.selectOption(branchOptionValue);
        await this.invoicePatientDropdown.click();
        await this.invoicePatientOption.click();
        await this.invoiceServiceDesc.fill(serviceDesc);
        await this.invoiceQty.fill(qty);
        await this.invoiceUnitPrice.fill(unitPrice);
        await this.page.goBack();
    }

    async CreateInvoiceConcurrent(branchOptionValue, serviceDesc, qty, unitPrice, discount, notes) {
        await this.enableNotificationsbtn.click();
        await this.bilingMenu.click();
        await this.invoicesSubmenu.click();
        await this.createInvoiceBtn.click();
        await this.invoiceBranchSelect.selectOption(branchOptionValue);
        await this.invoicePatientDropdown.click();
        await this.invoicePatientOption.click();
        await this.invoiceServiceDesc.fill(serviceDesc);
        await this.invoiceQty.fill(qty);
        await this.invoiceUnitPrice.fill(unitPrice);
        await this.invoiceDiscount.fill(discount);
        await this.invoiceNotes.fill(notes);
        await Promise.all([this.invoiceSubmitBtn.click(), this.invoiceSubmitBtn.click()]);
        this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
    }

}


module.exports = { HospitalAdminPage };