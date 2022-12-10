const base = require('@playwright/test');

exports.customTest = base.test.extend({
    testDataForOrder :
    {
        username : "hallodu@gmail.com", 
        password :  "Aa12345!",
        desiredProductName : "zara coat 3"
    },
});