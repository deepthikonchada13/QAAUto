const fs = require('fs');
const file = 'PageObjects/PatientPage.js';
let c = fs.readFileSync(file, 'utf8');

const target = 'module.exports = { PatientPage };';
const idx = c.indexOf(target);
console.log('idx:', idx, 'len:', c.length);

const newMethods = `
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

`;

if (idx === -1) { console.error('target not found'); process.exit(1); }
const result = c.slice(0, idx) + newMethods + c.slice(idx);
fs.writeFileSync(file, result, 'utf8');
console.log('done, new length:', fs.readFileSync(file, 'utf8').length);
