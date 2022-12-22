import { Locator, Page } from "@playwright/test";
export class LoginPage {
    page: Page; // alternativly only as "private page: any" as arg. of constructor
    private signInBtn: Locator;
    private userEmail: Locator;
    private password: Locator; 
    actualTextOnLoginPage: Locator;

    // put all the locator in the constructor
    constructor(page: Page) {
        this.page = page;
        // locators
        this.signInBtn = page.locator("[name='login']");
        this.userEmail = page.locator('#userEmail');
        this.password = page.locator('#userPassword');
        this.actualTextOnLoginPage =  page.locator(`.title em`);        // Rahul Shetty Academy
    }

    // write reusable utilities / methods
    async goTo(url: string) {
        await this.page.goto(url);
    }

    async validLogin(username: string, password: string) {
        // Login //
        //--- E.g. ---//
        // Email: hallodu@gmail.com
        //pw: Aa12345!
        await this.userEmail.type(username);
        await this.password.fill(password);
        await this.signInBtn.click();
        // wait until page is fully loaded
        await this.page.waitForLoadState('networkidle');
    }

}
// to make it visible
// module.exports = {LoginPage};