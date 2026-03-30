import { test as base } from "@playwright/test"
import LoginPage from "../pages/loginPage"
import ShipmentsPage  from "../pages/shipmentPage"
import HomePage from "../pages/homePage"
import DocumentPage from "../pages/documentspage"

type MyFixtures = {
    loginPage : LoginPage
    homePage : HomePage
    shipmentsPage : ShipmentsPage
    documentPage : DocumentPage
}

export const test = base.extend<MyFixtures>({
    loginPage : async ({page}, use) => {
        await use(new LoginPage(page))
    },
    homePage : async({page}, use) => {
        await use(new HomePage(page))
    },
    shipmentsPage : async({page}, use) => {
        await use(new ShipmentsPage(page))
    },
    documentPage : async({page}, use) => {
        await use(new DocumentPage(page))
    },
})

export { expect } from "@playwright/test"