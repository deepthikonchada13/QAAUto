class LoginPage
{
constructor(page)
{
this.page=page;
this.getstartedfreebtn=page.getByRole('navigation').getByRole('button', { name: 'Sign In' });
this.superadmin=page.getByRole('button', { name: '⭐ Super Admin Platform-wide' });
this.username=page.locator("[placeholder='Enter your email']");
this.password=page.locator("[placeholder='Enter your password']");
this.loginbtn=page.locator("[type='submit']");
this.firstloginbtn=page.getByText("Yes, Logout & Continue");
}


async validLogin()
{
await this.getstartedfreebtn.click();
await this.superadmin.click();
await this.username.fill("superadmin@whitecoats.com");
await this.password.fill("Admin@123456");
await this.loginbtn.click();
await this.firstloginbtn.click();

}
}
module.exports={LoginPage};