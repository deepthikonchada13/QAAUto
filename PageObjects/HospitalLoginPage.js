class HospitalLoginPage {
    constructor(page) {
        this.page = page;
        this.getstartedfreebtn = page.getByRole('navigation').getByRole('button', { name: 'Sign In' });
        this.hospitaladmin = page.getByRole('button', { name: '🏥 Hospital Admin Hospital' });
        this.username = page.locator("[placeholder='Enter your email']");
        this.password = page.locator("[placeholder='Enter your password']");
        this.loginbtn = page.locator("[type='submit']");
        this.firstloginbtn = page.getByRole('button', { name: 'Yes, Logout & Continue' });
    }


    async validLogin() {

        await this.getstartedfreebtn.click();
        await this.hospitaladmin.click();
        await this.username.fill('deepthikonchada1213@gmail.com');
        await this.password.fill('Admin@123');
        await this.loginbtn.click();
        await this.firstloginbtn.click();
    }
}
module.exports = { HospitalLoginPage };