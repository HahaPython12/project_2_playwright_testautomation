const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('./utils/APIUtils').default;

// TESTCASE: Verify order created is showing in history page
// Precondition - login, create order via API-

// the information under Network -> Fetch/XHR -> Headers, Payload, etc.
const loginAPIURL = "https://rahulshettyacademy.com/api/ecom/auth/login"
// JavaSript-object value dont have quotes "".
const loginPayLoad = {userEmail: "hallodu@gmail.com", userPassword: "Aa12345!"};

const createOrderAPIURL = "https://rahulshettyacademy.com/api/ecom/order/create-order";
const createOrderPayload = {orders: 
    [{country: "Germany", productOrderedId: "6262e95ae26b7e1a10e89bf0"}]};
let response;

// for mocking response inside test
const fakePayloadOrders = {data:[],message:"No Orders"};

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

    // Intercept Network Response //
    const URLWeWantToRoute = 'https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/638bbda503841e9c9a49a7d6';

    await page.route(URLWeWantToRoute, async route=>
        {
            //intercepting response - API response->(playwright fakeresponse)->browser->render data on front
            // get the real response, fetching response
            const realResponse = await page.request.fetch(route.request());
            // fake response
            let body = JSON.stringify(fakePayloadOrders);
            // will send repsonse back to browser
            route.fulfill(
            {
                // send back same response
                realResponse,
                // in this way we overwrite the existing body with our fakePayloadOrders
                body,
            });
        });
    // await page.pause();

    // locators
    const orderHistoryBtn = page.locator('.fa-handshake-o');
    const orderTableRows = page.locator('.table tbody tr');

    //--- Act ---//
    await orderHistoryBtn.click();
    // wait until page is fully load
    await page.waitForLoadState('networkidle');
    //await page.pause();

    //--- Assert ---/
    console.log(await page.locator('.mt-4').textContent());

});