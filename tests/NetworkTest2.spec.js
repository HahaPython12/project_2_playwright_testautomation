const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('./utils/APIUtils').default;

// TESTCASE: Verify order created is showing in history page
// Precondition - login, create order via API-

/*
First Acount:
Mail: hallodu@gmail.com
Password: Aa12345!

Scond Account:
Mail: secondEmail@gmail.com
Password: Aa12345!
*/

// the information under Network -> Fetch/XHR -> Headers, Payload, etc.
const loginAPIURL = "https://rahulshettyacademy.com/api/ecom/auth/login"
// JavaSript-object value dont have quotes "".
const loginPayLoad = {userEmail: "secondEmail@gmail.com", userPassword: "Aa12345!"};

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


    // Order-History Security Testing//
    //--- Arrange ---//
    const expectedAuthorizationMsg = 'You are not authorize to view this order';
    // locators
    const orderHistoryBtn = page.locator('.fa-handshake-o');
    const viewBtn =  page.locator("button:has-text('View')").first();

    //--- Act ---//
    await orderHistoryBtn.click();
    
    // URL of second account, first account should enter this side
    const URLtoMock = 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=639068fa03841e9c9a4c37d6';
    const URLnotAuthorizedOfFirstAccount = 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=63905f4d03841e9c9a4c2c61';
    
    // first argument: actual URL, second argument: what have to proceed
    await page.route(URLtoMock, route => route.continue({url:URLnotAuthorizedOfFirstAccount}));
    // wait until page is fully load
    await viewBtn.click();
    await page.waitForLoadState('networkidle');
    await page.pause();

    //--- Assert ---/
    const authorizationText = await page.locator('.blink_me').textContent();
    console.log(authorizationText);
    expect(authorizationText.includes(expectedAuthorizationMsg)).toBeTruthy;
});