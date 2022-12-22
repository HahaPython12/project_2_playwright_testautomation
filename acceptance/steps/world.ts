import { After, Before, setDefaultTimeout } from "@cucumber/cucumber";
import { Browser, chromium, Page } from "@playwright/test";
// import { POManager } from "../../pageobjectsTS/POManager";

let page: Page;
let browser: Browser;
// let poManager: POManager;

setDefaultTimeout(60000);

Before(async () => {
    try {
        browser = await chromium.launch({headless: false});
        const context = await browser.newContext();
        page = await context.newPage()
        await page.goto("https://rahulshettyacademy.com/client");
        console.log(`captured site title as ${await page.title()}`);
        // const poManager = new POManager(page, 'abc');
    } 
    catch (error) {
        console.log(`chrome navigation to demo site failed due to ${error}`);
        throw new Error(`chrome navigation to demo site failed due to ${error}`);
    }
    return page;
});

After(async () => {
    await browser.close();
});

export { page, browser };