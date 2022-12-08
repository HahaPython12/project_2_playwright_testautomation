class LoginPage {

    // put all the locator in the constructor
    constructor(page){
        this.page = page;
        // locators
        this.signInBtn = page.locator("[name='login']");
        this.userEmail = page.locator('#userEmail');
        this.password = page.locator('#userPassword');
    }

    async goTo(url){
        await this.page.goto(url);
    }

    // write reusable utilities / methods
    async validLogin(username, password){
        // Login //
        //--- E.g. ---//
        // Email: hallodu@gmail.com
        //pw: Aa12345!
        await this.userEmail.type(username);
        await this.password.fill(password);
        await this.signInBtn.click();
    }

}
// to make it visible 
module.exports = {LoginPage};