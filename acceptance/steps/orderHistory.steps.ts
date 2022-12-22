import { Given, When, Then } from "@cucumber/cucumber";
import { page } from './world';
import { expect, Locator } from '@playwright/test';
import { POManager } from '../../pageobjectsTS/POManager';

let orderNumberValue: string | null;
let orderNumberValueCut: string;

Given('I am already logged in to {string} with {string}, {string}, a {string} inside the cart and I filled out {string}, {string}, {string}, {string}, {string} at the checkout page and i see the {string} text.',
 async (expectedText: string, givenEmail: string, password: string, product: string, creditCardNumber: string, cvvCode: string, nameOnCard: string, applyCoupon: string, address: string, expectedValideOrderText: string) => {
    const poManager = new POManager(page, product);
    const loginPage = poManager.getLoginPage();
    const actualText = await loginPage.actualTextOnLoginPage.textContent();
    console.log(actualText);
    expect(expectedText).toEqual(actualText!.trim());

    // Login //
    await loginPage.validLogin(givenEmail, password);

    // Dashboard //
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchForProductAddToCart(product);
    await dashboardPage.navigateToCart();

    // CartPage //
    const cardPage = poManager.getCartPage();
    await cardPage.isCardProductVisible();
    await cardPage.navigateToCheckout();

    // CheckoutPage //
    const checkoutPage = poManager.getCheckoutPage();
    await checkoutPage.fillOutFields(creditCardNumber, cvvCode, nameOnCard, applyCoupon);
    await checkoutPage.chooseAddress(' ' + address);
    await checkoutPage.checkFilledUsername(givenEmail);
    await checkoutPage.navigateToPlaceOrder();

    // Order-Review //
    const orderReview = poManager.getOrderReview();
    await orderReview.checkOrderNumber(expectedValideOrderText);
    orderNumberValue = await orderReview.getOrderNumber();

});

When('I click on order history', async () => {
    // Order-History //
    const poManager = new POManager(page, 'productname');
    const orderHistory = poManager.getOrderHistory();
    await orderHistory.navigateToOrderHistory();
    orderNumberValueCut = orderHistory.getCutOrderID(orderNumberValue)!;
});

Then('I check if the expected ordernumber is displayed', async () => {
    const poManager = new POManager(page, 'productname');
    const orderHistory = poManager.getOrderHistory();
    await orderHistory.searchForOrderIDAndSelectView(orderNumberValue as string);
    const orderNumberInsideView = await orderHistory.getOrderIdFromView();
    expect(orderNumberInsideView).toContain(orderNumberValueCut);
});