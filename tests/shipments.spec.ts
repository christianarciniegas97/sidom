import { test } from "../fixtures/base";


test.describe("Shipements test", () =>{

    test.beforeEach(async ({loginPage}) => {
         await loginPage.goToSite();
         await loginPage.logIn( process.env.EMAIL , process.env.PASSWORD);
    })

    test("should display correct page structure", async({ homePage, shipmentsPage}) =>{
         // validate user login success elements 
        await homePage.validateUserLogin();
        await homePage.goToShipments();
        // Validate page structure
        await shipmentsPage.validateShipmentsPage()
    });

})


