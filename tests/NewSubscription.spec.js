import { test, expect } from '@playwright/test';
import { POManagers } from '../PageObjects/POManagers';

let pomanager;

test.describe('Super Admin — Subscription Plans', () => {

    test.beforeEach(async ({ page }) => {

        pomanager = new POManagers(page);

        await page.goto("https://myappointments.whitecoats.com/");

        await pomanager.Loginpage().validLogin();

    });

//     test("Create Subscription Plan", async ({ page }) => {

//         const subscription = pomanager.SubsnewPage();

//         await subscription.createPlan({

//             planName: `Premium`,

//             monthlyPrice: "100",

//             quarterlyPrice: "300",

//             halfYearlyPrice: "600",

//             yearlyPrice: "1200"

//         });
// //await page.pause();
//         await subscription.verifyPlanCreated(planName);

//     });

    test("Plan Name Mandatory", async ({ page }) => {

        const subscription = pomanager.SubsnewPage();

        await subscription.createPlan({

            planName: "",

            monthlyPrice: "100",

            quarterlyPrice: "300",

            halfYearlyPrice: "600",

            yearlyPrice: "1200"

        });

        // await subscription.verifyPlanNameRequired();

    });

    test("Duplicate Subscription Plan", async ({ page }) => {

        const subscription = pomanager.SubsnewPage();

        await subscription.createPlan({

            planName: "Premium",

            monthlyPrice: "100",

            quarterlyPrice: "300",

            halfYearlyPrice: "600",

            yearlyPrice: "1200"

        });

          // await subscription.verifyDuplicatePlanError();

    });

});