import { Given, When, Then } from "@cucumber/cucumber";
import { page } from './world';
import { expect, Locator } from '@playwright/test';
import { POManager } from '../../pageobjectsTS/POManager';


Given('I am already logged in to {string} with {string}, {string}, a {string} inside the cart and I filled out {string}, {string}, {string}, {string} and the {string} at the checkout page.', 
async (expectedText: string, givenEmail: string, password: string, product: string, creditCardNumber: string, cvvCode: string, nameOnCard: string, applyCoupon: string, address: string) => {
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
});


When('I place the order', async () => {
    const poManager = new POManager(page, 'productname');
    const checkoutPage = poManager.getCheckoutPage();
    await checkoutPage.navigateToPlaceOrder();
});


Then('I check if the expected text {string} is displayed', async (expectedValideOrderText: string) => {
    // Order-Review //
    const poManager = new POManager(page, 'productname');
    const orderReview = poManager.getOrderReview();
    await orderReview.checkOrderNumber(expectedValideOrderText);
});