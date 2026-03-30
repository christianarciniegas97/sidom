import { test } from "../fixtures/base"

test.describe("Documents test", () =>{

    test.beforeEach(async ({loginPage, homePage}) => {
         await loginPage.goToSite();
         await loginPage.logIn( process.env.EMAIL , process.env.PASSWORD);
         await homePage.goToDocuments();
    })

    test("should apply filter with range date", async({ documentPage }) =>{
        // select range date add to string from 10 to 30
        await documentPage.selectDateRange("10", "30");
        await documentPage.submitFormDocument();
        await documentPage.validateResultOfDocuments();
    });

    test("should can open detail document", async({ documentPage }) =>{
        await documentPage.submitFormDocument();
        // open first document in mode edit
        await documentPage.validateDataEditDocuments();
    });

    test("should can download document", async({ documentPage }) =>{
        await documentPage.submitFormDocument();
        await documentPage.completeDataFromPopupExcel("automationDownload");
        await documentPage.validateDownload()
    });
})