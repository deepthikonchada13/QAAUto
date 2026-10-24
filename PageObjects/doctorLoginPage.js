class doctorLoginPage {
    constructor(page) {
        this.page = page;
        this.getstartedfreebtn =page.getByRole('navigation').getByRole('button', { name: 'Sign In' });
        this.hospitaladmin = page.getByText('Doctor', { exact: true });
        this.hospitaladmin2 = page.getByRole('button', { name: 'Sunshine' });         
        this.username = page.locator("[placeholder='Enter your email']");
        this.password = page.locator("[placeholder='Enter your password']");
        this.loginbtn = page.locator("[type='submit']");
        this.firstloginbtn = page.getByRole('button', { name: 'Yes, Logout & Continue' });
    }


    async validLogin() {

        await this.getstartedfreebtn.click();
        await this.hospitaladmin.click();
        // await this.hospitaladmin2.click();
        await this.username.fill('owlsure6@gmail.com');
        await this.password.fill('b3P^a3q^UQ*#');
        await this.loginbtn.click();
        await this.firstloginbtn.click();
    }
}
module.exports = { doctorLoginPage };