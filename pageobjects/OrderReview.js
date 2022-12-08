const {expect} = require("@playwright/test");

class OrderReview{
    constructor(page){
        this.page = page;
        // locators
        this.valideOrderText = page.locator('.hero-primary');
        this.orderNumber = page.locator('.em-spacer-1 .ng-star-inserted');
    }

    async checkOrderNumber(expectedValideOrderText){
        //--- Assert ---//
        await expect(this.valideOrderText).toHaveText(expectedValideOrderText);
    }

    async getOrderNumber(){
        return await this.orderNumber.textContent();
    }
}
module.exports = {OrderReview};