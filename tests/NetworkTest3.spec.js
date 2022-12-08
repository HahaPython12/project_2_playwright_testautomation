const {test,expect} = require('@playwright/test');


// test(Testname, Testfunktion)
test('Browser Context Playwright test', async ({browser})=>
{
    //--- Arrange ---//
    // chrome - plugin / cookies
    const context = await browser.newContext();
    const page = await context.newPage();

    //-- blocking css-styles --//
    // with '**/*.css we block any URL with .css ending
    // page.route('**/*.css', route=> route.abort());
    //-- blocking all the images --//
    // page.route('**/*.{jpg,png,jpeg}', route=> route.abort());
    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    // locators
    const userName = page.locator('#username');
    const password = page.locator("[type='password']");
    const sginInBtn = page.locator('#signInBtn');
    const errorMsgText = page.locator("[style*='block']");
    const cardTitles = page.locator('.card-body a');

    //-- Check request-url and status-codes --//
    // whenever a request-call occured, it should print the url
    page.on('request', request=> console.log(request.url()));
    // what is the status
    page.on('response', response=> console.log(response.url(), response.status()));

    //--- Act ---//
    // there are up to 7 locators/selectors to identify an object on the webpage
    // mainly used are css- and xpath-selectors
    // playwright predominantly supprts css-selectors
    await userName.type("rahulshetty");
    await password.type('learning');
    await sginInBtn.click();
    console.log(await errorMsgText.textContent());

    //--- Assert ---//
    await expect(errorMsgText).toContainText('Incorrect');

    //--- Act ---//
    // use of fill(), to clear previous text
    await userName.fill('');
    await userName.fill('rahulshettyacademy');
    
    // Race-Condition
    await Promise.all(
        [
            page.waitForNavigation(),
            sginInBtn.click()
        ]
    );
    
    // console.log(await cardTitles.nth(0).textContent());
    // console.log(await cardTitles.nth(1).textContent());
    const allCardTitles = await cardTitles.allTextContents();
    console.log(allCardTitles);

    //--- Assert ---//


});