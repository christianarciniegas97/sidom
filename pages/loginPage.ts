import  { Locator, Page } from "@playwright/test";

export default class LoginPage {
    page : Page

    readonly loginContainer : Locator;
    readonly emailInput : Locator;
    readonly passwordInput : Locator;
    readonly submitButton : Locator;

    constructor(page: Page){ 
        this.page = page
        
        this.loginContainer = page.locator(".login")
        this.emailInput = page.getByPlaceholder("Correo electrónico");
        this.passwordInput = page.getByPlaceholder("Contraseña");
        this.submitButton = page.locator(`input[type="submit"]`)
    }

    async goToSite(){
        await this.page.goto("/")
    };

    async logIn( email: string, password : string){
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
        await this.page.waitForLoadState("domcontentloaded")
    };

}