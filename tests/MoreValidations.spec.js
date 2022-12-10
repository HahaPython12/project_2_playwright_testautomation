const {test,expect} = require('@playwright/test');

// let test run parallel with:
test.describe.configure({mode:'parallel'});
// spezificly saying that test should run serial with:
//test.describe.configure({mode:'serial'});
test("Popup validations", async ({page})=>
{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    /*
    await page.goto('https://google.com');
    // going back from a webside
    await page.goBack();
    // go forword
    await page.goForward();
    */

    // Check if Elements are in invisible mode or not //
    //--- Arrange ---//
    const displayElement = page.locator('#displayed-text');
    const hideBtn = page.locator('#hide-textbox');

    //--- Act ---//

    //--- Assert ---//
    await expect(displayElement).toBeVisible();

    //--- Act ---//
    await hideBtn.click();

    //--- Assert ---//
    await expect(displayElement).toBeHidden();


    // Handle dialogs / Java pup-ups
    //--- Arrange ---//
    const confirmBtn = page.locator('#confirmbtn');

    //--- Act ---//
    page.on('dialog', dialog => dialog.accept());
    await confirmBtn.click();


    // Handle hover over an item //
    //--- Arrange ---//
    const hoverMenu = page.locator('#mousehover');

    //--- Act ---//
    await hoverMenu.hover();


    // Handle Childframes //
    //--- Arrange ---//
    const expectedNumberOfSubs = '13,522';
    const expectedSubsSentence = 'Join 13,522 Happy Subscibers!';
    // from this locator you will get a new page-object
    const framesPage = page.frameLocator('#courses-iframe');
    // every element of this childframe need to be accessed by framesPage now
    const allAccessPlanMenu = framesPage.locator("li a[href='lifetime-access']:visible");
    const allAccessPlanInside = framesPage.locator(".text h2");

    //--- Act ---//
    await allAccessPlanMenu.click();
    const allAccessPlanInsideText = await allAccessPlanInside.textContent();
    console.log(allAccessPlanInsideText);
    const numberOfSubs = allAccessPlanInsideText.split(' ')[1];
    console.log(numberOfSubs);

    //--- Assert ---//
    // used for comparison after text-extraction, like line 62
    expect(numberOfSubs).toContain(expectedNumberOfSubs);
    // used for an locator-object like line 56, text must fit completly
    await expect(allAccessPlanInside).toHaveText(expectedSubsSentence);

});

test.skip("Screenshot & Visual comparison", async({page})=>
{

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    // Check if Elements are in invisible mode or not //
    //--- Arrange ---//
    const displayElement = page.locator('#displayed-text');
    const hideBtn = page.locator('#hide-textbox');

    //--- Act ---//

    //--- Assert ---//
    await expect(displayElement).toBeVisible();

    //--- Act ---//
    await hideBtn.click();
    // screenshot of the hole page
    await page.screenshot({path: 'screenshot.png'});

    //--- Assert ---//
    await expect(displayElement).toBeHidden();
});

test.skip("Visual Testing", async({page})=>
{
    await page.goto("https://google.com/");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');
});