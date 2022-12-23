import { Given, When, Then } from "@cucumber/cucumber";
import { page } from '../steps/world';
import { expect, Locator } from '@playwright/test';
import { POManager } from '../../pageobjectsTS/POManager';



//--- Arrange ---//
// chrome - plugin / cookies
// const givenEmail: string = 'hallodu@gmail.com';
// const password: string = 'Aa12345!';

Given('I navigate to {string}', async (expectedText: string) => {
    const poManager = new POManager(page, 'abc');
    const loginPage = poManager.getLoginPage();
    const actualText = await loginPage.actualTextOnLoginPage.textContent();
    console.log(actualText);
    expect(expectedText).toEqual(actualText!.trim());
    console.log("Hallo_login")
});


When('I type valid {string}, {string} and click login', async (givenEmail: string, password: string) => {
    //--- Act ---//
    // Login //
    const poManager = new POManager(page, 'abc');
    const loginPage = poManager.getLoginPage();
    await loginPage.validLogin(givenEmail, password);
});


Then('I should enter my account-page {string}', async (expectedPageTitle: string) => {
    // text from logo
    const subTitle: Locator = page.locator('.left');
    const textOfSubTitle = await subTitle.textContent();
    console.log(textOfSubTitle);
    expect(expectedPageTitle).toEqual(textOfSubTitle!.trim());
});