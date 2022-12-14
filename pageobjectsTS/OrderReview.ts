import { expect } from "@playwright/test";

export default class OrderReview{
    page: any;
    valideOrderText: any;
    orderNumber: any;

    constructor(page: any){
        this.page = page;
        // locators
        this.valideOrderText = page.locator('.hero-primary');
        this.orderNumber = page.locator('.em-spacer-1 .ng-star-inserted');
    }

    async checkOrderNumber(expectedValideOrderText: string){
        //--- Assert ---//
        await expect(this.valideOrderText).toHaveText(expectedValideOrderText);
    }

    async getOrderNumber(){
        return await this.orderNumber.textContent();
    }
}
// module.exports = {OrderReview};