import { expect, Locator, Page } from '@playwright/test';

export class CheckoutPage{
    page: Page;
    private userNameCheckout: Locator;
    private userAddress: Locator;
    private addressOptionsDropdown: Locator;
    private creditCardNumber: Locator;
    private expireDateMonth: Locator;
    private expireDateDay: Locator;
    private applyCoupon: Locator;
    private cvvCode: Locator;
    private nameOnCard: Locator;
    private placeOrderBtn: Locator;

    constructor(page: Page){
        this.page = page;
        // locators
        this.userNameCheckout = page.locator('.user__name');
        this.userAddress = page.locator("[placeholder='Select Country']");
        this.addressOptionsDropdown = page.locator('.ta-results');
    
        this.creditCardNumber = page.locator("[value*='4542']");
        this.expireDateMonth = page.locator('.ddl').nth(0);
        this.expireDateDay = page.locator('.ddl').nth(1);
        this.applyCoupon = page.locator("[name*='coupon']");

        this.cvvCode = page.locator('.small .txt').nth(0);
        this.nameOnCard = page.locator('.field .txt').nth(2);

        this.placeOrderBtn = page.locator('.action__submit');
    }

    async fillOutFields(creditCardNumber: string, cvvCode: string, nameOnCard: string, applyCoupon: string){

        await this.creditCardNumber.fill(creditCardNumber);
        await this.cvvCode.type(cvvCode);
        await this.nameOnCard.type(nameOnCard);
        await this.expireDateMonth.click();
        //await this.expireDateMonth.locator('option').nth(7).click();
        await this.expireDateDay.click();
        //await this.expireDateDay.locator('option').nth(21).click();
        await this.applyCoupon.type(applyCoupon);
    }

    async checkFilledUsername(username: string){
        await this.userNameCheckout.textContent();
        await expect(this.userNameCheckout).toContainText(username);
    }
    
    async chooseAddress(address: string){

        await this.userAddress.type('Ger', {delay: 100});
        
        await this.addressOptionsDropdown.waitFor();
        const countAddressOptions = await this.addressOptionsDropdown.locator('button').count();
        for (let i=0; countAddressOptions >i; i++){
            if(await this.addressOptionsDropdown.locator('button').nth(i).textContent() === address){
                await this.addressOptionsDropdown.locator('button').nth(i).click();
                break;
            }
        }
    }

    async navigateToPlaceOrder(){
        await this.placeOrderBtn.click();
    }
}
// module.exports = {CheckoutPage};