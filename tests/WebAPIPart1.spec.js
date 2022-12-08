const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('./utils/APIUtils').default;

// TESTCASE: Verify order created is showing in history page
// Precondition - login, create order via API-call

// the information under Network -> Fetch/XHR -> Headers, Payload, etc.
const loginAPIURL = "https://rahulshettyacademy.com/api/ecom/auth/login"
// JavaSript-object value dont have quotes "".
const loginPayLoad = {userEmail: "hallodu@gmail.com", userPassword: "Aa12345!"};

const createOrderAPIURL = "https://rahulshettyacademy.com/api/ecom/order/create-order";
const createOrderPayload = {orders: 
    [{country: "Germany", productOrderedId: "6262e95ae26b7e1a10e89bf0"}]};
let response;

test.beforeAll(async ()=>
{
    // Login - Create Order - API //
    //--- Arrange ---//
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginAPIURL, loginPayLoad);
    response = await apiUtils.createOrder(createOrderAPIURL, createOrderPayload);

});


test.beforeEach( async ()=>
{


});


// test(Testname, Testfunktion)
test('Place the Order', async ({browser})=>
{
    //--- Arrange ---//
    // chrome - plugin / cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    /* 
    now set token in application of parameter in the session storage
    playwrigth can't insert token inside the browser
    insert token via JS expressions, storing the cookie.
    */
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client");


    // Order-History //
    //--- Arrange ---//
    let orderNumberValue = response.orderID;
    // locators
    const orderHistoryBtn = page.locator('.fa-handshake-o');
    const orderTableRows = page.locator('.table tbody tr');

    //--- Act ---//
    await orderHistoryBtn.click();
    console.log(await orderTableRows.nth(0).locator('th').textContent());

    // const orderNumberValueCut = orderNumberValue.split(' ')[2].split(' ')[0];
    console.log('Number: ' + orderNumberValue)

    // wait until body is loaded
    await page.locator('tbody').waitFor();
    for (let i =0; i<await orderTableRows.count(); i++){
        const actualRowOrderNumber = await orderTableRows.nth(i).locator('th').textContent();
        if(actualRowOrderNumber === orderNumberValue){
            // click the first button
            await orderTableRows.nth(i).locator('button').nth(0).click();
        }
    }

    const orderNumberInsideView = await page.locator('.col-text').textContent();

    //--- Assert ---//
    expect(orderNumberInsideView).toContain(orderNumberValue);
    // or
    // expect(orderNumberValue.includes(orderNumberInsideView)).toBeTruthy();
    await page.pause();

});