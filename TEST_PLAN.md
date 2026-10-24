# WhiteCoats Super Admin Automation Test Plan

## Overview
This test plan covers the Super Admin workflows visible in the current repository and the live WhiteCoats application.
It uses the existing Playwright page objects and tests in `PageObjects/` and `tests/`.

## Credentials
- Username: `superadmin@whitecoats.com`
- Password: `Admin@1234`
- Note: the app may prompt `Yes, Logout & Continue` if the account is already logged in on another device.

---

## Modules and Features

### 1. Login / Authentication
- Role selection: Super Admin
- Sign In flow
- Validation errors
- Forgot password link
- Existing session handling

### 2. Subscription Plans
- Open `Subscription Plans`
- Create new plan
- Edit plan name
- Delete plan
- Validation for required fields
- Duplicate plan handling
- Unlimited checkbox behavior

### 3. Tenant Management
- Search tenant by name
- Create tenant
- Edit tenant details
- Extend tenant subscription
- Validation for tenant email, phone, duplicates

### 4. Service Configuration
- Open service configuration
- Enter max doctors, staff, users, patients
- Save configuration
- Validation for blank/invalid values

### 5. Additional Subscription Page (`SubsnewPage`)
- Alternate subscription plan flow
- Toast / success messages
- Field validation

---

## Test Suites

### Suite: Login

#### Test: Super Admin login
1. Navigate to `https://myappointments.whitecoats.com/login`
2. Select `Super Admin`
3. Enter email `superadmin@whitecoats.com`
4. Enter password `Admin@1234`
5. Click `Sign In`
6. If prompted, click `Yes, Logout & Continue`
7. Verify dashboard or home page loads successfully

#### Test: invalid email format
1. Navigate to login page
2. Select `Super Admin`
3. Enter `superadmin` as email
4. Enter `Admin@1234`
5. Click `Sign In`
6. Verify validation message for invalid email

#### Test: invalid password
1. Navigate to login page
2. Select `Super Admin`
3. Enter `superadmin@whitecoats.com`
4. Enter `wrong-password`
5. Click `Sign In`
6. Verify login failed message

#### Test: forgot password navigation
1. Navigate to login page
2. Select `Super Admin`
3. Click `Forgot password?`
4. Verify reset password screen opens

---

### Suite: Subscription Plans

#### Test: create a new subscription plan
1. Login as Super Admin
2. Navigate to `Subscription Plans`
3. Click `➕ Add New Plan`
4. Enter plan details
   - Plan Name: `AutoPlan <timestamp>`
   - Monthly: `1000`
   - Quarterly: `30`
   - Half-Yearly: `10`
   - Yearly: `100`
5. Click `💾 Create Plan`
6. Verify plan appears in the table

#### Test: edit an existing subscription plan name
1. Create a plan
2. Click the `✏️` edit action for the plan
3. Change the plan name
4. Click save
5. Verify updated plan row is visible

#### Test: delete an existing subscription plan
1. Create a plan
2. Click the `🗑️` delete action for the plan
3. Confirm deletion
4. Verify the plan no longer appears in the table

#### Test: validation when plan name is missing
1. Open subscription plan modal
2. Leave plan name blank
3. Fill valid pricing values
4. Click `💾 Create Plan`
5. Verify validation error is shown

#### Test: validation when price fields are missing
1. Open subscription plan modal
2. Enter plan name
3. Leave price fields blank or invalid
4. Click `💾 Create Plan`
5. Verify validation error is shown

---

### Suite: Tenant Management

#### Test: search returns existing tenant
1. Login as Super Admin
2. Navigate to `Tenants`
3. Search for `Santi`
4. Verify tenant row appears

#### Test: search for non-existent tenant
1. Search for a unique missing tenant value
2. Verify result row count is 0

#### Test: create a new tenant with valid data
1. Navigate to `Tenants`
2. Click `➕ Add Tenant ▾`
3. Fill tenant details
4. Generate payment link and send
5. Verify success message

#### Test: tenant creation invalid email
1. Create tenant with invalid email
2. Verify validation message

#### Test: tenant creation missing phone
1. Create tenant with blank phone
2. Verify validation message

#### Test: tenant creation duplicate email or phone
1. Create tenant with duplicate email or phone
2. Verify duplicate error message

#### Test: edit tenant name and email
1. Search existing tenant
2. Open actions menu
3. Click `✏️ Edit Tenant`
4. Update name and email
5. Save
6. Verify updated row contains new values

#### Test: edit tenant invalid email
1. Attempt edit with invalid email
2. Verify validation error

#### Test: edit tenant blank email
1. Attempt edit with blank email
2. Verify validation error

#### Test: extend tenant subscription
1. Search existing tenant
2. Open actions menu
3. Click `Extend Subscription`
4. Enter months
5. Save
6. Verify success state

---

### Suite: Service Configuration

#### Test: save valid configuration
1. Login as Super Admin
2. Navigate to `⚙️ Service Management`
3. Click `⚙️ Configure`
4. Enter values for doctor, staff, max users, max patients
5. Click `Save Configuration`
6. Verify dialog says `Configuration saved successfully!`

#### Test: doctor field blank validation
1. Leave doctor field blank
2. Save
3. Verify validation/failure message

#### Test: staff field blank validation
1. Leave staff field blank
2. Save
3. Verify validation/failure message

#### Test: invalid max user format
1. Enter non-numeric max user value
2. Save
3. Verify validation/failure message

#### Test: invalid max patient format
1. Enter non-numeric max patient value
2. Save
3. Verify validation/failure message

#### Test: zero or negative values
1. Enter 0 or negative values for numeric fields
2. Save
3. Verify validation/failure message

---

### Suite: Subscription Plans via `SubsnewPage`

#### Test: create plan via `SubsnewPage` page object
1. Open subscription plans
2. Add new plan
3. Fill plan values
4. Save
5. Verify plan row appears

#### Test: plan name required validation
1. Open add plan modal
2. Leave plan name blank
3. Save
4. Verify validation for plan name required

#### Test: duplicate plan name error
1. Create plan with existing name
2. Save
3. Verify duplicate plan error message

#### Test: toast success message
1. Create plan successfully
2. Verify toast contains `success`

---

## Notes
- Existing repo tests already cover much of the above.
- The login flow requires selecting the Super Admin role first.
- The app may show a device conflict prompt; handle it by clicking `Yes, Logout & Continue`.
- Use `POManagers` to access page objects in tests.

## Suggested next step
Create matching Playwright spec files for any uncovered suites:
- `tests/Login.spec.js`
- `tests/Subsnew.spec.js`
- `tests/TenantCrud.spec.js`
- `tests/ServiceConfiguration.spec.js`

