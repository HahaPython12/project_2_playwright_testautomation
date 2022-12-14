export default class LoginPage {
    page: any;
    signInBtn: any;
    userEmail: any;
    password: string[];

    // put all the locator in the constructor
    constructor(page: any){
        this.page = page;
        // locators
        this.signInBtn = page.locator("[name='login']");
        this.userEmail = page.locator('#userEmail');
        this.password = page.locator('#userPassword');
    }

    // write reusable utilities / methods
    async goTo(url: string){
        await this.page.goto(url);
    }

    async validLogin(username: string, password: string){
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