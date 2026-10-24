class PatientLoginPage
{
constructor(page)
{
this.page=page;
this.getstartedfreebtn=page.getByRole('navigation').getByRole('button', { name: 'Sign In' });
this.patient=page.getByRole('button', { name: 'Patient Book appointments &' });
this.username=page.getByRole('textbox', { name: 'Mobile Number' });
this.sendotpbtn=page.getByRole('button', { name: 'Send OTP' });
this.password=page.locator('.otp-inputs');
this.loginbtn=page.locator("[type='submit']");
this.firstloginbtn=page.getByRole('button', { name: 'Yes, Logout & Continue' });

}


async validLogin()
{
await this.getstartedfreebtn.click();
await this.patient.click();
await this.username.fill("9346393986");
await this.sendotpbtn.click();
await this.page.pause();


}
}
module.exports={PatientLoginPage};