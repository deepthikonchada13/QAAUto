import {test,request,expect} from '@playwright/test';

const loginpayload={
    email: "superadmin@whitecoats.com",
    password: "Admin@1234",
    forceLogin: true
}

test('Login API', async()=>
{
    const apiContext = await request.newContext();
   const loginresponse= await apiContext.post("https://myappointments-api.whitecoats.com/api/auth/login/super-admin",
        {
            data:loginpayload
        }
    );  
    await expect(loginresponse.ok).toBeTruthy();
    const loginresponsejson = await loginresponse.json();
    console.log(loginresponsejson);
}); 