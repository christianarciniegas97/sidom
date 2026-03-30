import {  expect, Locator, Page } from "@playwright/test"

export default class ShipmentsPage {
    page : Page;

    readonly gridContainer : Locator;

    constructor( page: Page){
        this.page =  page;
        this.gridContainer = page.locator("#gen_container");
    };
    
    async validateShipmentsPage(){
        await expect(this.page).toHaveTitle(/SidomWeb/);
        await expect(this.page).toHaveURL(/modulo=gen/);
        await expect(this.gridContainer).toBeVisible();
    };

}