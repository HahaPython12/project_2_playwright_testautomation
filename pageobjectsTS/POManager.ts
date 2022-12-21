/*
The POManager provide all the objects for the test.
So the each object dosn't need to be imported and instantiated in the test-file.
Just ask the POManager for an object and store it into a variable.
*/

import { LoginPage } from '../pageobjectsTS/LoginPage';
import { DashboardPage } from '../pageobjectsTS//DashboardPage';
import { CartPage } from '../pageobjectsTS/CartPage';
import { CheckoutPage } from './CheckoutPage';
import { OrderReview } from './OrderReview';
import { OrderHistory } from './OrderHistory';

import { Page } from "@playwright/test";

export class POManager {
    page: Page;
    desiredProductName: string;
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    cardPage: CartPage;
    checkoutPage: CheckoutPage;
    orderReview: OrderReview;
    orderHistory: OrderHistory;

    constructor(page: Page, desiredProductName: string) {
        this.page = page;
        this.desiredProductName = desiredProductName;
        // Objects //
        // create objects of the pages class, sending page (and product) as an argument.
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cardPage = new CartPage(this.page, desiredProductName);
        this.checkoutPage = new CheckoutPage(this.page);
        this.orderReview = new OrderReview(this.page);
        this.orderHistory = new OrderHistory(this.page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }

    getCartPage() {
        return this.cardPage;
    }

    getCheckoutPage() {
        return this.checkoutPage;
    }

    getOrderReview() {
        return this.orderReview;
    }

    getOrderHistory() {
        return this.orderHistory;
    }
}
// module.exports = {POManager};