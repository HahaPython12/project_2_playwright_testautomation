import { Locator, Page } from "@playwright/test";

export class DashboardPage{
    page: Page;
    private cardProducts: Locator;
    private productsText: Locator;
    private cartBtn: Locator;
    
    constructor(page: Page){
        this.page = page;
        // locators
        this.cardProducts = page.locator('.card-body');
        this.productsText = page.locator('.card-body b');
        this.cartBtn = page.locator("[routerlink='/dashboard/cart']");
    }

    async searchForProductAddToCart(desiredProductName: string){
        const titles = this.productsText.allTextContents();
        console.log(titles);
        // look for the desired product e.g. : 'zara coat 3'
        const countProducts = await this.cardProducts.count();
        for(let i =0; countProducts >i; i++){
            if(await this.cardProducts.nth(i).locator('b').textContent() === desiredProductName){
                // add desired product to mycart
                console.log(await this.cardProducts.nth(i).locator('b').textContent());
                await this.cardProducts.nth(i).locator("text=' Add To Cart'").click();
                break;
            } 
        }
    }

    async navigateToCart(){
        await this.cartBtn.click();
    }
}
// to make it visible 
// module.exports = {DashboardPage};