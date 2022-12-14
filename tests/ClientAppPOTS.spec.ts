import { test, expect } from '@playwright/test';

// test(Testname, Testfunktion)
test('@TS Page Context Playwright End-to-End Test', async ({browser})=>
{

    //--- Arrange ---//
    // chrome - plugin / cookies
    const givenEmail: string = 'hallodu@gmail.com'; 
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.pause();
});