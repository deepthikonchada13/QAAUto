const { chromium } = require('@playwright/test');  
(async () = 
const browser = await chromium.launch({ headless: true });  
const page = await browser.newPage();  
try {  
await page.goto('https://myappointments.whitecoats.com/login', { waitUntil: 'networkidle' });  
await page.click('div.role-card-label:has-text(\'Super Admin\')');  
await page.fill('[placeholder=\'Enter your email\']', 'superadmin@whitecoats.com');  
await page.fill('[placeholder=\'Enter your password\']', 'Admin@1234');  
await page.click('[type=submit]');  
