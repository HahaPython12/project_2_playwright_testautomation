class LoginPage {

    // put all the locator in the constructor
    constructor(page){
        this.page = page;
        // locators
        this.signInBtn = page.locator("[name='login']");
        this.userEmail = page.locator('#userEmail');
        this.password = page.locator('#userPassword');
    }

    // write reusable utilities / methods
    async goTo(url){
        await this.page.goto(url);
    }

    async validLogin(username, password){
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
module.exports = {LoginPage};