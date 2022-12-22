import { Given, When, Then } from "@cucumber/cucumber";
import { page } from './world';
import { expect, Locator } from '@playwright/test';
import { POManager } from '../../pageobjectsTS/POManager';

Given('I am already logged in to {string} with {string}, {string} and a {string} inside the cart.', async (expectedText: string, givenEmail: string, password: string, product: string) => {
    const poManager = new POManager(page, product);
    const loginPage = poManager.getLoginPage();
    const actualText = await loginPage.actualTextOnLoginPage.textContent();
    console.log(actualText);
    expect(expectedText).toEqual(actualText!.trim());

    // Login //
    // const poManager = new POManager(page, product);
    await loginPage.validLogin(givenEmail, password);

    // Dashboard //
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchForProductAddToCart(product);
    await dashboardPage.navigateToCart();

    // CartPage //
    const cardPage = poManager.getCartPage();
    await cardPage.isCardProductVisible();
    await cardPage.navigateToCheckout();
});


When('I fill out {string}, {string}, {string}, {string} and the {string}', async (creditCardNumber: string, cvvCode: string, nameOnCard: string, applyCoupon: string, address: string) => {
    // CheckoutPage //
    const poManager = new POManager(page, 'productname');
    const checkoutPage = poManager.getCheckoutPage();
    await checkoutPage.fillOutFields(creditCardNumber, cvvCode, nameOnCard, applyCoupon);
    await checkoutPage.chooseAddress(' ' + address);
});


Then('I see the {string} is already filled and I can place the order', async (givenEmail: string) => {
    // CheckoutPage //
    const poManager = new POManager(page, 'productname');
    const checkoutPage = poManager.getCheckoutPage();
    await checkoutPage.checkFilledUsername(givenEmail);
});