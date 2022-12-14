/*
The POManager provide all the objects for the test.
So the each object dosn't need to be imported and instantiated in the test-file.
Just ask the POManager for an object and store it into a variable.
*/

import LoginPage from '../pageobjectsTS/LoginPage';
import DashboardPage from '../pageobjectsTS//DashboardPage';
import CartPage from '../pageobjectsTS/CartPage';
import CheckoutPage from './CheckoutPage';
import OrderReview from './OrderReview';
import OrderHistory from './OrderHistory';


export default class POManager{
    page: any;
    desiredProductName: any;
    loginPage: LoginPage;
    dashboardPage: any;
    cardPage: any;
    checkoutPage: any;
    orderReview: any;
    orderHistory: any;

    constructor(page : any, desiredProductName: string){
        this.page = page;
        this.desiredProductName = desiredProductName;
        // Objects //
        // create an object of the LoginPage class, sending page as an argument.
        this.loginPage = new LoginPage(this.page);
        // create an object of the DashboardPage class,
        this.dashboardPage = new DashboardPage(this.page);
        // create object of CardPage
        this.cardPage = new CartPage(this.page, desiredProductName);
        // create object of CheckoutPage
        this.checkoutPage = new CheckoutPage(this.page);
        // create object of OrderReview
        this.orderReview = new OrderReview(this.page);
        // create object of OrderHistory
        this.orderHistory = new OrderHistory(this.page);
    }

    getLoginPage(){
        return this.loginPage;
    }

    getDashboardPage(){
        return this.dashboardPage;
    }
    
    getCartPage(){
        return this.cardPage;
    }
    
    getCheckoutPage(){
        return this.checkoutPage;
    }
    
    getOrderReview(){
        return this.orderReview;
    }
    
    getOrderHistory(){
        return this.orderHistory;
    }
}
// module.exports = {POManager};