const { LoginPage } = require('../PageObjects/LoginPage');
const { SuperAdminPage } = require('../PageObjects/SuperAdminPage');
const { ServiceConfigurationPage } = require('../PageObjects/ServiceConfigurationPage');
const { SubscriptionPlanPage } = require('../PageObjects/SubscriptionPlanPage');
const { SubscriptionPlansPage } = require('../PageObjects/SubscriptionPlansPage');
const { SubsnewPage } = require('../PageObjects/SubsnewPage');
const { HospitalLoginPage } = require('../PageObjects/HospitalLoginPage');
const { HospitalAdminPage } = require('../PageObjects/HospitalAdminPage');
const { PatientLoginPage } = require('../PageObjects/PatientLoginPage');
const { PatientPage } = require('../PageObjects/PatientPage');
const { StaffLoginPage } = require('../PageObjects/StaffLoginPage');
const { StaffDashbaordPage } = require('../PageObjects/StaffDashbaordPage');
const { doctorLoginPage } = require('../PageObjects/doctorLoginPage');
const { doctorPortalPage } = require('../PageObjects/doctorPortalPage');
const { BranchLoginPage } = require('../PageObjects/BranchLoginPage');
const { BranchPortalPage } = require('../PageObjects/BranchPortalPage');



class POManagers {
    constructor(page) {
        this.page = page;
        this.loginpage = new LoginPage(this.page);
        this.superAdmin = new SuperAdminPage(this.page);
        this.serviceconfiguration = new ServiceConfigurationPage(this.page);
        this.subscription = new SubscriptionPlanPage(this.page);
        this.subscriptionPlans = new SubscriptionPlansPage(this.page);
        this.subsnew = new SubsnewPage(this.page);
        this.hospitalLoginpage = new HospitalLoginPage(this.page);
        this.hospitalAdminPage = new HospitalAdminPage(this.page);
        this.patientloginpage = new PatientLoginPage(this.page);
        this.patientpage = new PatientPage(this.page);
        this.stafflogin = new StaffLoginPage(this.page);
        this.staffdashboard = new StaffDashbaordPage(this.page);
        this.doctorloginpage = new doctorLoginPage(this.page);
        this.doctorportalpage = new doctorPortalPage(this.page);
        this.branchloginpage = new BranchLoginPage(this.page);
        this.branchPortalPage = new BranchPortalPage(this.page);






    }

    Loginpage() {

        return this.loginpage;
    }

    SuperAdminPage() {
        return this.superAdmin;
    }

    ServiceConfigurationPage() {
        return this.serviceconfiguration;
    }

    SubscriptionPlanPage() {
        return this.subscription;
    }

    SubscriptionPlansPage() {
        return this.subscriptionPlans;
    }

    SubsnewPage() {
        return this.subsnew;
    }


    HospitalLoginPage() {
        return this.hospitalLoginpage;
    }

    HospitalAdminPage() {
        return this.hospitalAdminPage;
    }

    PatientLoginPage() {
        return this.patientloginpage;
    }

    PatientPage() {
        return this.patientpage;
    }

    StaffLoginPage() {
        return this.stafflogin;
    }

    StaffDashbaordPage() {
        return this.staffdashboard;
    }

    doctorLoginPage() {
        return this.doctorloginpage;
    }

    doctorPortalPage() {
        return this.doctorportalpage;
    }

    BranchLoginPage() {
        return this.branchloginpage;
    }

    BranchPortalPage() {
        return this.branchPortalPage;
    }
}

module.exports = { POManagers };