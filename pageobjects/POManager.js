/*
The POManager provide all the objects for the test.
So the each object dosn't need to be imported and instantiated in the test-file.
Just ask the POManager for an object and store it into a variable.
*/

const {LoginPage} = require('./LoginPage');
const {DashboardPage} = require('./DashboardPage');
const {CartPage} = require('./CartPage');
const {CheckoutPage} = require('./CheckoutPage');
const {OrderReview} = require('./OrderReview');


class POManager{
    constructor(page, desiredProductName){
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
}
module.exports = {POManager};