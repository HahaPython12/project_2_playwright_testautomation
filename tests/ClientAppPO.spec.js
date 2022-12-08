const {test,expect} = require('@playwright/test');
const {POManager} = require('../pageobjects/POManager')

// test(Testname, Testfunktion)
test('Page Context Playwright End-to-End Test', async ({browser})=>
{

    //--- Arrange ---//
    // Variables //
    const username = 'hallodu@gmail.com'; 
    const password =  'Aa12345!';
    const url = "https://rahulshettyacademy.com/client";
    const desiredProductName = 'zara coat 3';
    // chrome - plugin / cookies
    const context = await browser.newContext();
    const page = await context.newPage();

    // Objects //
    const poManager = new POManager(page, desiredProductName);

    const loginPage = poManager.getLoginPage();
    const dashboardPage = poManager.getDashboardPage();
    const cardPage = poManager.getCartPage();
    const checkoutPage = poManager.getCheckoutPage();
    const orderReview = poManager.getOrderReview();
    const orderHistory = poManager.getOrderHistory();

    //--- Act ---//
    // Login //
    // cause we use async-methods, to make sure use also ehre await
    await loginPage.goTo(url);
    await loginPage.validLogin(username, password);

    // Dashboard //
    await dashboardPage.searchForProductAddToCart(desiredProductName);
    await dashboardPage.navigateToCart();

    //--- Assert ---//
    // Inside myCart //
    await cardPage.isCardProductVisible();
    await cardPage.navigateToCheckout();


    // Checkout //
    //--- Arrange ---//
    const creditCardNumber = '1234567890';
    const cvvCode = '999';
    const nameOnCard = 'Babie';
    const applyCoupon = 'rahulshattyacademy';
    const address = ' Germany';

    //--- Act ---//
    await checkoutPage.fillOutFields(creditCardNumber, cvvCode, nameOnCard, applyCoupon);
    await checkoutPage.chooseAddress(address);

    //--- Assert ---//
    await checkoutPage.checkFilledUsername(username);
    // await page.pause();
    await checkoutPage.navigateToPlaceOrder();
    

    // Order-Review//
    //--- Arrange ---//
    const expectedValideOrderText = " Thankyou for the order. ";
    const orderNumberValue = await orderReview.getOrderNumber();
    console.log(orderNumberValue);

    //--- Assert ---//
    await orderReview.checkOrderNumber(expectedValideOrderText);
    // await page.pause();


    // Order-History //
    //--- Arrange ---//
    await orderHistory.navigateToOrderHistory();
    const orderNumberValueCut = orderHistory.getCutOrderID(orderNumberValue);

    //--- Act ---//
    await orderHistory.searchForOrderIDAndSelectView(orderNumberValue);
    const orderNumberInsideView = await orderHistory.getOrderIdFromView();

    //--- Assert ---//
    expect(orderNumberInsideView).toContain(orderNumberValueCut);
    // or
    // expect(orderNumberValueCut.includes(orderNumberInsideView)).toBeTruthy();
    // await page.pause();

});