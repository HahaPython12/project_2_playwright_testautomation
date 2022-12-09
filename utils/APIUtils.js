class APIUtils
{

    constructor(apiContext, loginAPIURL, loginPayLoad){
        this.apiContext = apiContext;
        this.loginAPIURL = loginAPIURL;
        this.loginPayLoad = loginPayLoad;
    }

    async getToken(){
        //--- Act ---//
        // Post-Call
        const loginResponse = await this.apiContext.post(this.loginAPIURL, {data: this.loginPayLoad});

        //--- Assertion ---//
        // checke stautscodes: 200, 201, 
        // expect((loginResponse).ok()).toBeTruthy();

        // grab response-body after the call is made, extract token out of it
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        console.log(token);
        // now set token in application of parameter in the session storage,
        // see under test
        return token;
    }

    async createOrder(createOrderAPIURL, createOrderPayload){
        // Create Order API //
        //--- Act ---//
        // dummy-object contain and return token and orderID
        let response = {};
        response.token = await this.getToken();
        const createOrderResponse = await this.apiContext.post(createOrderAPIURL, 
        {
            data: createOrderPayload, 
            headers: {
                        'Authorization': response.token,
                        'Content-Tpye' : 'application/json'
            }
        });
    
        const createOrderResponseJson = await createOrderResponse.json();
        const orderID = createOrderResponseJson.orders[0];
        console.log(orderID);
        response.orderID = orderID;
        
        //--- Assert ---//

        return response;
    }

}
export default {APIUtils}