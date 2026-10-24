class ServiceConfigurationPage
{
constructor(page)
{
this.page=page;
this.servicemgtpage=page.getByRole('button', { name: '⚙️ Service Management' });
this.configurebtn=page.getByRole('button', { name: '⚙️ Configure' });
this.doctortxtbox=page.getByRole('textbox').nth(1);
this.stafftxtbox=page.getByRole('textbox').nth(2);
this.maxusertxtbox=page.getByRole('textbox').nth(3);
this.maxpatientbox=page.getByRole('textbox').nth(4);

}
async serviceMgt(doctxtbox,stafftxtbox,maxusertxtbox,patienttxtbox)
{
await this.servicemgtpage.first().click(); 
  await this.configurebtn.first().click();
  await this.doctortxtbox.click();
  await this.doctortxtbox.fill(doctxtbox);
  await this.stafftxtbox.fill(stafftxtbox);
  await this.maxusertxtbox.fill(maxusertxtbox);
  await this.maxpatientbox.fill(patienttxtbox);
  let dialogMessage = null;
  try {
    const [dialog] = await Promise.all([
      this.page.waitForEvent('dialog', { timeout: 3000 }),
      this.page.getByRole('button', { name: 'Save Configuration' }).click(),
    ]);
    dialogMessage = dialog.message();
    await dialog.dismiss();
  } catch (e) {
    // no dialog appeared within timeout
  }
  return dialogMessage;
}
}
module.exports={ServiceConfigurationPage};
