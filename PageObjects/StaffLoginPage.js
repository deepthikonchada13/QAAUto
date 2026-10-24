class StaffLoginPage {
    constructor(page) {
        this.page = page;
        this.getstartedfreebtn = page.getByRole('navigation').getByRole('button', { name: 'Sign In' });
        this.hospitaladmin = page.getByRole('button', { name: '👥 Staff Appointments &' });
        this.hospitaladmin2 = page.locator('button').filter({hasText: 'Sunshine'});
        this.username = page.locator("[placeholder='Enter your email']");
        this.password = page.locator("[placeholder='Enter your password']");
        this.loginbtn = page.locator("[type='submit']");
        this.firstloginbtn = page.getByRole('button', { name: 'Yes, Logout & Continue' });
    }


    async validLogin() {
        await this.getstartedfreebtn.click();
        // await this.hospitaladmin.waitFor({ state: 'visible' });
        await this.hospitaladmin.click();
        await this.hospitaladmin2.waitFor({ state: 'visible' });
        await this.hospitaladmin2.click();
        await this.username.waitFor({ state: 'visible' });
        await this.username.fill('whitecoats88@gmail.com'); 
        await this.password.waitFor({ state: 'visible' });
        await this.password.fill('Admin@123');
        await this.loginbtn.waitFor({ state: 'visible' });
        await this.loginbtn.click();
        // if (await this.firstloginbtn.isVisible()) 
            await this.firstloginbtn.click();
        
    }
}
module.exports = { StaffLoginPage };