import { expect, Locator } from "@playwright/test";

export default class OrderHistory{
    page: any;
    private orderBtn: Locator;
    private orderTableRows: Locator;

    constructor(page: any){
        this.page = page;
        // locators
        this.orderBtn = page.locator('.fa-handshake-o');
        this.orderTableRows = page.locator('.table tbody tr');

    }

    async searchForOrderIDAndSelectView(orderNumberValue: string){
        // console.log(await this.orderTableRows.nth(0).locator('th').textContent());
        const orderNumberValueCut = this.getCutOrderID(orderNumberValue)
        // console.log('Number: ' + orderNumberValueCut)

        // wait until body is loaded
        await this.page.locator('tbody').waitFor();
        for (let i =0; i<await this.orderTableRows.count(); i++){
            const actualRowOrderNumber = await this.orderTableRows.nth(i).locator('th').textContent();
            if(actualRowOrderNumber === orderNumberValueCut){
                // click the first button go to viewPage
                await this.orderTableRows.nth(i).locator('button').nth(0).click();
                break;
            }
        }
    }

    async getOrderIdFromView(){
        // give back the orderNumberInsideView
        return await this.page.locator('.col-text').textContent();
    }

    async navigateToOrderHistory(){
        await this.orderBtn.click();
    }

    getCutOrderID(orderNumberValue: string){
        // cut out the order-ID: orderNumberValueCut
        return orderNumberValue.split(' ')[2].split(' ')[0];
    }
}
// module.exports = {OrderHistory}