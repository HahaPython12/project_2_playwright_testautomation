import { expect, Locator, Page } from '@playwright/test';

export class CartPage{
    page: Page;
    private cardProdcut: Locator;
    private desiredProductName: Locator;
    private checkoutBtn: Locator;

    constructor(page: Page, desiredProductName: string){
        this.page = page;
        // locators
        this.cardProdcut = page.locator("div li").first();
        this.desiredProductName = page.locator("h3:has-text('" + desiredProductName + "')");
        this.checkoutBtn = page.locator("button:has-text('Checkout')");
    }

    async isCardProductVisible(){
        await this.cardProdcut.waitFor();
        const cartProductVisible = await this.desiredProductName.isVisible();
        expect(cartProductVisible).toBeTruthy()  ;
    }

    async navigateToCheckout(){
        this.checkoutBtn.click();
    }
}
// module.exports = {CartPage};