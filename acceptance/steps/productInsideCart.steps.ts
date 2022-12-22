import { Given, When, Then } from "@cucumber/cucumber";
import { page } from './world';
import { expect, Locator } from '@playwright/test';
import { POManager } from '../../pageobjectsTS/POManager';


Given('I am already logged in to {string} with {string} and {string}', 
async (expectedText: string, givenEmail: string, password: string) => {
    const poManager = new POManager(page, 'productName');
    const loginPage = poManager.getLoginPage();
    const actualText = await loginPage.actualTextOnLoginPage.textContent();
    console.log(actualText);
    expect(expectedText).toEqual(actualText!.trim());

    // Login //
    await loginPage.validLogin(givenEmail, password);
});

When('I choose a product {string} and add to cart', async (product: string) => {
    const poManager = new POManager(page, product);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchForProductAddToCart(product);
    await dashboardPage.navigateToCart();
});


Then('I see the product {string} inside the cart', async (product: string) => {
    const poManager = new POManager(page, product);
    const cardPage = poManager.getCartPage();
    await cardPage.isCardProductVisible();
});