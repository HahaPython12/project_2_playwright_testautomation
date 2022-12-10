const {test,expect} = require('@playwright/test');


// test(Testname, Testfunktion)
test('@Web Browser Context Playwright test', async ({browser})=>
{
    //--- Arrange ---//
    // chrome - plugin / cookies
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    // locators
    const userName = page.locator('#username');
    const password = page.locator("[type='password']");
    const sginInBtn = page.locator('#signInBtn');
    const errorMsgText = page.locator("[style*='block']");
    const cardTitles = page.locator('.card-body a');

    
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


test('UI Controls', async ({page})=>
{

    //--- Arrange ---//
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    // get the title - assertion
    console.log(await page.title());
    
    // loctors
    const userName = page.locator('#username');
    const password = page.locator("[type='password']");
    const sginInBtn = page.locator('#signInBtn');
    const dropDown = page.locator('select.form-control');
    const radioBtn = page.locator('.radiotextsty'); // are two inside
    const popUpRadioBtn = page.locator('#okayBtn');
    const checkBox = page.locator('#terms');

    //--- Act ---//
    await userName.fill('rahulshettyacademy');
    await password.type('learning');
    await dropDown.selectOption('consult');
    await radioBtn.last().click();
    await popUpRadioBtn.click();
    await checkBox.click();

    /*
    await Promise.all(
        [
            page.waitForNavigation(),
            sginInBtn.click()
        ]
    );
    */
    // await page.pause();

    //--- Assert ---//
    await expect(radioBtn.last()).toBeChecked();
    await expect(checkBox).toBeChecked();
    // alternative: it will give a boolian value
    console.log(await radioBtn.last().isChecked());
    
    //--- Act ---//
    await checkBox.uncheck();

    //--- Assert ---//
    // see if it is unchecked
    expect(await checkBox.isChecked()).toBeFalsy();


});

test('UI Control Blinking Text', async ({page})=>
{
    //--- Arrange ---//
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    // get the title - assertion
    console.log(await page.title());

    // locators
    const documentLink = page.locator("[href*='document']");

    //--- Act ---//


    //--- Assert ---//
    await expect(documentLink).toHaveAttribute('class', 'blinkingText');

});

test('Child windows Handling', async ({browser})=>
{
    //--- Arrange ---//
    // chrome - plugin / cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    // get the title - assertion
    console.log(await page.title());

    // locators page
    const documentLink = page.locator("[href*='document']");
    const userName = page.locator('#username');

    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'),
            documentLink.click()
        ]
    );

    // locators newPage
    const redText = newPage.locator('.red');
    
    const redTextContent = await redText.textContent();
    console.log(redTextContent);

    // we anna only the email, so split the string twice
    // split, take second element of array, split again, take the first one
    const domainName = redTextContent.split('@')[1].split(' ')[0];
    console.log(domainName);

    //--- Act ---/
    await userName.type(domainName);
    await page.pause();

    //--- Assert ---//

});