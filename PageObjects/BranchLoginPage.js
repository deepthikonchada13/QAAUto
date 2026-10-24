class BranchLoginPage
{
    constructor(page) {
        this.page = page;
        this.getstartedfreebtn = page.getByRole('navigation').getByRole('button', { name: 'Sign In' });
        this.branchadmin = page.getByRole('button', { name: '🏢 Branch Admin Branch' });
        this.hosipitalname=page.getByRole('button', { name: 'Sunshine' });
        this.username = page.locator("[placeholder='Enter your email']");
        this.password = page.locator("[placeholder='Enter your password']");
        this.loginbtn = page.locator("[type='submit']");
        this.firstloginbtn = page.getByRole('button', { name: 'Yes, Logout & Continue' });
    }

    async validLogin() {

        await this.getstartedfreebtn.click();
        await this.branchadmin.click();
        await this.hosipitalname.click();
        await this.username.fill('deepthivam1759@gmail.com');
        await this.password.fill('Admin@123');
        await this.loginbtn.click();
         await this.firstloginbtn.click();
    }

  
}
  module.exports = { BranchLoginPage };