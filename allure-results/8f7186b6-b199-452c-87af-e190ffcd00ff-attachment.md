# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: StaffDashboard.spec.js >> Staff Dashboard - All Scenarios >> search a patient and Edit patient details  @new
- Location: tests\StaffDashboard.spec.js:789:3

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for getByText('Select Blood Group')

```

# Test source

```ts
  700 |         await this.enableNotificationsbtn.click();
  701 |         await this.AddNewPatient.click();
  702 |         await this.AllPatients.click();
  703 |         await this.patientSearchBox.fill(value);
  704 |         await Promise.all([
  705 |             this.patientSearchBox.press('Enter'),
  706 |             this.genderdrop.click(),
  707 |         ]);
  708 |     }
  709 | 
  710 |     async SearchPatientinvoicePage(searchText) {
  711 |         await this.enableNotificationsbtn.click();
  712 |         await this.invoiceMenu.click();
  713 |         await this.billingInvoicesBtn.click();
  714 |         await this.reset.click();
  715 |         await this.searchtextbox_invoice.fill(searchText);
  716 |         await this.status.click();
  717 |         await this.statusoption_paid.click();
  718 |         await this.view.first().click();
  719 |         const page1Promise = this.page.waitForEvent('popup');
  720 |         await this.printinvoice.click();
  721 |         await page1Promise;
  722 |         this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
  723 |         await this.email.click();
  724 |         await this.cancelnow.click();
  725 |     }
  726 | 
  727 |     async billingInvoiceSearchEmpty() {
  728 |         await this.enableNotificationsbtn.click();
  729 |         await this.invoiceMenu.click();
  730 |         await this.billingInvoicesBtn.click();
  731 |         await this.searchtextbox_invoice.fill('');
  732 |         await this.searchtextbox_invoice.press('Enter');
  733 |     }
  734 | 
  735 |     async billingInvoiceSearchInvalidData(value) {
  736 |         await this.enableNotificationsbtn.click();
  737 |         await this.invoiceMenu.click();
  738 |         await this.billingInvoicesBtn.click();
  739 |         await this.searchtextbox_invoice.fill(value);
  740 |         await this.searchtextbox_invoice.press('Enter');
  741 |     }
  742 | 
  743 |     async billingInvoiceSearchWhitespace() {
  744 |         await this.enableNotificationsbtn.click();
  745 |         await this.invoiceMenu.click();
  746 |         await this.billingInvoicesBtn.click();
  747 |         await this.searchtextbox_invoice.fill('   ');
  748 |         await this.searchtextbox_invoice.press('Enter');
  749 |     }
  750 | 
  751 |     async billingInvoiceSearchMaxLength() {
  752 |         await this.enableNotificationsbtn.click();
  753 |         await this.invoiceMenu.click();
  754 |         await this.billingInvoicesBtn.click();
  755 |         await this.searchtextbox_invoice.fill('a'.repeat(500));
  756 |         await this.searchtextbox_invoice.press('Enter');
  757 |     }
  758 | 
  759 |     async billingInvoiceSearchMinLength() {
  760 |         await this.enableNotificationsbtn.click();
  761 |         await this.invoiceMenu.click();
  762 |         await this.billingInvoicesBtn.click();
  763 |         await this.searchtextbox_invoice.fill('a');
  764 |         await this.searchtextbox_invoice.press('Enter');
  765 |     }
  766 | 
  767 |     async billingInvoiceSearchAndRefresh(value) {
  768 |         await this.enableNotificationsbtn.click();
  769 |         await this.invoiceMenu.click();
  770 |         await this.billingInvoicesBtn.click();
  771 |         await this.searchtextbox_invoice.fill(value);
  772 |         await this.page.reload();
  773 |     }
  774 | 
  775 |     async billingInvoiceSearchAndNavigateBack(value) {
  776 |         await this.enableNotificationsbtn.click();
  777 |         await this.invoiceMenu.click();
  778 |         await this.billingInvoicesBtn.click();
  779 |         await this.searchtextbox_invoice.fill(value);
  780 |         await this.searchtextbox_invoice.press('Enter');
  781 |         await this.page.goBack();
  782 |     }
  783 | 
  784 |     async billingInvoiceSearchConcurrent(value) {
  785 |         await this.enableNotificationsbtn.click();
  786 |         await this.invoiceMenu.click();
  787 |         await this.billingInvoicesBtn.click();
  788 |         await this.searchtextbox_invoice.fill(value);
  789 |         await Promise.all([
  790 |             this.searchtextbox_invoice.press('Enter'),
  791 |             this.status.click(),
  792 |         ]);
  793 |     }
  794 | 
  795 |     async editPatient() {
  796 |         await this.enableNotificationsbtn.click();
  797 |         await this.AddNewPatient.click();
  798 |         await this.AllPatients.click();
  799 |         await this.editBtn.click();
> 800 |         await this.editBloodGroupDrop.click();
      |                                       ^ Error: locator.click: Target page, context or browser has been closed
  801 |         await this.editBloodGroupBPlus.click();
  802 |         await this.editGenderDrop.click();
  803 |         await this.editGenderFemale.click();
  804 |         await this.editAbhaNumber.fill('1234567890123');
  805 |         await this.editAadharNumber.fill('1234567890123');
  806 |         await this.editEmergencyPhone.fill('8186801168');
  807 |         await this.editRelationDrop.click();
  808 |         await this.editRelationSibling.click();
  809 |         await this.editSourceDrop.click();
  810 |         await this.editSourceOnline.click();
  811 |         await this.editDoctorHospital.fill('deepthi');
  812 |         await this.editSymptomsField.fill('fever');
  813 |         this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
  814 |         await this.updatePatientBtn.click();
  815 |     }
  816 | 
  817 |     async EditProfilescreen() {
  818 |         await this.enableNotificationsbtn.click();
  819 |         await this.proffile.click();
  820 |         await this.editprofile.click();
  821 |         await this.agestaff.fill('2008-05-18');
  822 |         await this.namestaff.fill('Deepthi konchada');
  823 |         await this.savechanges.click();
  824 |     }
  825 | 
  826 |     // ── editPatient negative scenario helpers ──
  827 | 
  828 |     async editPatientWithInvalidAbha(abhaValue) {
  829 |         await this.enableNotificationsbtn.click();
  830 |         await this.AddNewPatient.click();
  831 |         await this.AllPatients.click();
  832 |         await this.editBtn.click();
  833 |         await this.editAbhaNumber.clear();
  834 |         await this.editAbhaNumber.fill(abhaValue);
  835 |         await this.updatePatientBtn.click();
  836 |         this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
  837 |     }
  838 | 
  839 |     async editPatientWithInvalidAadhar(aadharValue) {
  840 |         await this.enableNotificationsbtn.click();
  841 |         await this.AddNewPatient.click();
  842 |         await this.AllPatients.click();
  843 |         await this.editBtn.click();
  844 |         await this.editAadharNumber.clear();
  845 |         await this.editAadharNumber.fill(aadharValue);
  846 |         await this.updatePatientBtn.click();
  847 |         this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
  848 |     }
  849 | 
  850 |     async editPatientWithInvalidPhone(phoneValue) {
  851 |         await this.enableNotificationsbtn.click();
  852 |         await this.AddNewPatient.click();
  853 |         await this.AllPatients.click();
  854 |         await this.editBtn.click();
  855 |         await this.editEmergencyPhone.clear();
  856 |         await this.editEmergencyPhone.fill(phoneValue);
  857 |         await this.updatePatientBtn.click();
  858 |         this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
  859 |     }
  860 | 
  861 |     async editPatientWithEmptyDoctorName() {
  862 |         await this.enableNotificationsbtn.click();
  863 |         await this.AddNewPatient.click();
  864 |         await this.AllPatients.click();
  865 |         await this.editBtn.click();
  866 |         await this.editDoctorHospital.clear();
  867 |         await this.updatePatientBtn.click();
  868 |         this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
  869 |     }
  870 | 
  871 |     async editPatientWithMaxLengthSymptoms() {
  872 |         await this.enableNotificationsbtn.click();
  873 |         await this.AddNewPatient.click();
  874 |         await this.AllPatients.click();
  875 |         await this.editBtn.click();
  876 |         await this.editSymptomsField.fill('a'.repeat(1000));
  877 |         await this.updatePatientBtn.click();
  878 |         this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
  879 |     }
  880 | 
  881 |     async editPatientWithMinLengthSymptoms() {
  882 |         await this.enableNotificationsbtn.click();
  883 |         await this.AddNewPatient.click();
  884 |         await this.AllPatients.click();
  885 |         await this.editBtn.click();
  886 |         await this.editSymptomsField.fill('a');
  887 |         await this.updatePatientBtn.click();
  888 |         this.page.once('dialog', dialog => { dialog.dismiss().catch(() => { }); });
  889 |     }
  890 | 
  891 |     async editPatientAndRefresh() {
  892 |         await this.enableNotificationsbtn.click();
  893 |         await this.AddNewPatient.click();
  894 |         await this.AllPatients.click();
  895 |         await this.editBtn.click();
  896 |         await this.editDoctorHospital.fill('test');
  897 |         await this.page.reload();
  898 |     }
  899 | 
  900 |     async editPatientAndNavigateBack() {
```