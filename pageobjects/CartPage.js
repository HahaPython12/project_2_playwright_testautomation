const {expect} = require('@playwright/test');

class CartPage{
    constructor(page, desiredProductName){
        this.page = page;
        // locators
        this.cardProdcut = page.locator("div li").first();
        this.desiredProductName = page.locator("h3:has-text('" + desiredProductName + "')");
    }

    async isCardProductVisible(){
        await this.cardProdcut.waitFor();
        const cartProductVisible = await this.desiredProductName.isVisible();
        expect(cartProductVisible).toBeTruthy();
    }
}
module.exports = {CartPage};