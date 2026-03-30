import {  Locator, Page } from "@playwright/test"
import  expectElementsToBeVisible  from "../utils/helpers"

export default class HomePage {
    page : Page;
    
    readonly navbarContainer : Locator;
    readonly usernameText : Locator;
    readonly companyImg : Locator;
    readonly brandNameText : Locator;
    readonly menuContainer : Locator; 
    readonly shipmentButton : Locator;  
    readonly documetButton : Locator;

    constructor( page: Page){
        this.page =  page
        this.navbarContainer = page.locator('#navTop')
        this.usernameText = page.getByText('Tester QA (Administrador)');
        this.companyImg = page.locator('.logoCliente');
        this.brandNameText = page.locator('#nombre-branch-umsa');
        this.menuContainer = page.locator('#page_menu');
        this.shipmentButton = page.locator(`div[title="Embarques"]`); 
        this.documetButton = page.locator(`div[title="Documentos"]`); 

    };

    async validateUserLogin(){
        await expectElementsToBeVisible(
        [this.navbarContainer, this.companyImg, this.usernameText, this.brandNameText, this.menuContainer])
    }; 

    async goToShipments () {
        await this.shipmentButton.click();
        await this.page.waitForLoadState('networkidle');
    };

    async goToDocuments () {
        await this.documetButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}