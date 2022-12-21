import { test, expect, Page } from '@playwright/test';
import { POManager } from '../pageobjectsTS/POManager';
const dataSet = JSON.parse(JSON.stringify(require('../utils/ClientAppPOTestData.json')));

// test(Testname, Testfunktion)
test(`@TS Playwright End-to-End Test for ${dataSet[0].desiredProductName}`, async ({ browser }) => {

    //--- Arrange ---//
    // Variables //
    const url: string = "https://rahulshettyacademy.com/client";
    // chrome - plugin / cookies
    const context = await browser.newContext();
    const page: Page = await context.newPage();

    // Objects //
    const poManager = new POManager(page, dataSet[0].desiredProductName);

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
    await loginPage.validLogin(dataSet[0].username, dataSet[0].password);

    // Dashboard //
    await dashboardPage.searchForProductAddToCart(dataSet[0].desiredProductName);
    await dashboardPage.navigateToCart();

    //--- Assert ---//
    // Inside myCart //
    await cardPage.isCardProductVisible();
    await cardPage.navigateToCheckout();

    // Checkout //
    //--- Arrange ---//
    const creditCardNumber: string = '1234567890';
    const cvvCode: string = '999';
    const nameOnCard: string = 'Babie';
    const applyCoupon: string = 'rahulshattyacademy';
    const address: string = ' Germany';

    //--- Act ---//
    await checkoutPage.fillOutFields(creditCardNumber, cvvCode, nameOnCard, applyCoupon);
    await checkoutPage.chooseAddress(address);

    //--- Assert ---//
    await checkoutPage.checkFilledUsername(dataSet[0].username);
    // await page.pause();
    await checkoutPage.navigateToPlaceOrder();


    // Order-Review//
    //--- Arrange ---//
    const expectedValideOrderText: string = " Thankyou for the order. ";
    const orderNumberValue: string | null = await orderReview.getOrderNumber();
    console.log(orderNumberValue);

    //--- Assert ---//
    await orderReview.checkOrderNumber(expectedValideOrderText);
    // await page.pause();


    // Order-History //
    //--- Arrange ---//
    await orderHistory.navigateToOrderHistory();
    const orderNumberValueCut = orderHistory.getCutOrderID(orderNumberValue);

    //--- Act ---//
    await orderHistory.searchForOrderIDAndSelectView(orderNumberValue as string);
    const orderNumberInsideView = await orderHistory.getOrderIdFromView();

    //--- Assert ---//
    expect(orderNumberInsideView).toContain(orderNumberValueCut);
    // or
    // expect(orderNumberValueCut.includes(orderNumberInsideView)).toBeTruthy();
    // await page.pause();

});