import { expect, Locator, Page } from "@playwright/test";

export class OrderReview{
    page: Page;
    private valideOrderText: Locator;
    private orderNumber: Locator;

    constructor(page: Page){
        this.page = page;
        // locators
        this.valideOrderText = page.locator('.hero-primary');
        this.orderNumber = page.locator('.em-spacer-1 .ng-star-inserted');
    }

    async checkOrderNumber(expectedValideOrderText: string){
        //--- Assert ---//
        await expect(this.valideOrderText).toHaveText(expectedValideOrderText);
    }

    async getOrderNumber(): Promise<string | null>{
        // change to:
        // const a = await this.orderNumber.textContent();
        // if(a){
        //     return a;
        // }
        // return "Hallo"; ot throw ERROR "can't find string"
        return await this.orderNumber.textContent();
    }
}
// module.exports = {OrderReview};