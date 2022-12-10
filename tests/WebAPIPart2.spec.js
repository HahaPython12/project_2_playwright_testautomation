const {test,expect} = require('@playwright/test');

let webContext;

test.beforeAll(async ({browser})=>{

    //--- Arrange ---//
    // chrome - plugin / cookies 
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    // locators
    const userEmail = page.locator('#userEmail');
    const password = page.locator('#userPassword');
    const signInBtn = page.locator("[name='login']");

    // Login //
    //--- Act ---//
    // Email: hallodu@gmail.com
    //pw: Aa12345!
    await userEmail.type('hallodu@gmail.com');
    await password.fill('Aa12345!');
    await signInBtn.click();
    await page.waitForLoadState('networkidle');
    // store cookies on browser-context - level
    await context.storageState({path: 'state.json'});

    // inject the cookies into the new browser, safe it to a global variable
    // login will be bypassed
    webContext = await browser.newContext({storageState:'state.json'});

});


// test(Testname, Testfunktion)
test('@API Page Context Playwright End-to-End Test', async ({})=>
{

    //--- Arrange ---//
    // chrome - plugin / cookies
    const givenEmail = 'hallodu@gmail.com'; 
    const desiredProductName = 'zara coat 3';
    // const context = await browser.newContext();
    // const page = await context.newPage();

    // create page of with injected login-cookie
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");

    // locators
    const cardProducts = page.locator('.card-body');

    // console.log(await cardProducts.locator('b').allTextContents());
    // lock for the desired product: 'zara coast 3'
    const countProducts = await cardProducts.count();
    for(let i =0; countProducts >i; i++){
        if(await cardProducts.nth(i).locator('b').textContent() === desiredProductName){
            // add desired product to mycart
            console.log(await cardProducts.nth(i).locator('b').textContent());
            await cardProducts.nth(i).locator("text=' Add To Cart'").click();
            break;
        } 
    }

    // inside myCart //
    //--- Act ---//
    const cartBtn = page.locator("[routerlink='/dashboard/cart']");
    await cartBtn.click();
    // wait for table occure because no autowait for method isVisible()
    await page.waitForLoadState('networkidle');
    // or with:
    // await page.locator('div ki').last().waitFor();

    const myCartProductVisible = await page.locator("h3:has-text('zara coat 3')").isVisible;
    // await page.pause();

    //--- Assert ---//
    expect(myCartProductVisible).toBeTruthy();

    // Checkout //
    //--- Arrange ---//
    // locators
    const checkoutBtn = page.locator("button:has-text('Checkout')");
    const userName = page.locator('.user__name');
    const userAddress = page.locator("[placeholder='Select Country']");
    
    const creditCardNumber = page.locator("[value*='4542']");
    const expireDateMonth = page.locator('.ddl').nth(0);
    const expireDateDay = page.locator('.ddl').nth(1);
    const applyCoupon = page.locator("[name*='coupon']");

    const cvvCode = page.locator('.small .txt').nth(0);
    const nameOnCard = page.locator('.field .txt').nth(2);
    

    //--- Act ---//
    await checkoutBtn.click();
    
    await creditCardNumber.fill('1234567890');
    await cvvCode.type('999');
    await nameOnCard.type('Babie');
    await expireDateMonth.click();
    //await expireDateMonth.locator('option').nth(7).click();
    await expireDateDay.click();
    //await expireDateDay.locator('option').nth(21).click();
    await applyCoupon.type('rahulshattyacademy');
    await page.pause();
    
    
    await userName.textContent();

    await userAddress.type('Ger', {delay: 100});
    const addressOptionsDropdown = page.locator('.ta-results');
    await addressOptionsDropdown.waitFor();
    const countAddressOptions = await addressOptionsDropdown.locator('button').count();
    for (let i=0; countAddressOptions >i; i++){
        if(await addressOptionsDropdown.locator('button').nth(i).textContent() === ' Germany'){
            await addressOptionsDropdown.locator('button').nth(i).click();
            break;
        }
    }

    //--- Assert ---//
    await expect(userName).toContainText(givenEmail);

    await page.pause();


    // Place Order //
    //--- Arrange ---//
    const expectedVaildeOrderText = " Thankyou for the order. ";
    const placeOrderBtn = page.locator('.action__submit');
    const valideOrderText = page.locator('.hero-primary');
    const orderNumber = page.locator('.em-spacer-1 .ng-star-inserted');

    //--- Act ---//
    await placeOrderBtn.click();
    const orderNumberValue = await orderNumber.textContent();

    //--- Assert ---//
    await expect(valideOrderText).toHaveText(expectedVaildeOrderText);
    console.log(orderNumberValue);

    await page.pause();


    // Order-History //
    //--- Arrange ---//
    // locators
    const orderBtn = page.locator('.fa-handshake-o');
    const orderTableRows = page.locator('.table tbody tr');

    //--- Act ---//
    await orderBtn.click();
    console.log(await orderTableRows.nth(0).locator('th').textContent());
    
    const orderNumberValueCut = orderNumberValue.split(' ')[2].split(' ')[0];
    console.log('Number: ' + orderNumberValueCut)

    // wait until body is loaded
    await page.locator('tbody').waitFor();
    for (let i =0; i<await orderTableRows.count(); i++){
        const actualRowOrderNumber = await orderTableRows.nth(i).locator('th').textContent();
        if(actualRowOrderNumber === orderNumberValueCut){
            // click the first button
            await orderTableRows.nth(i).locator('button').nth(0).click();
        }
    }

    const orderNumberInsideView = await page.locator('.col-text').textContent();


    //--- Assert ---//
    expect(orderNumberInsideView).toContain(orderNumberValueCut);
    // or
    // expect(orderNumberValueCut.includes(orderNumberInsideView)).toBeTruthy();
    await page.pause();

});