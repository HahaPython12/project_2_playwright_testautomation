Feature: Ordernumber is displayed in order history

    Feature Description: Checkout is already done, now reviewing the order history.

    As a user
    I want to check my order history
    So I can verify that my order is right

    @EndtoEnd
    Scenario: Reviewing the order history
        Given I am already logged in to 'Rahul Shetty Academy' with '<username>', '<password>', a '<product>' inside the cart and I filled out '<creditcardnumber>', '<cvvcode>', '<nameoncard>', '<applycoupon>', '<address>' at the checkout page and i see the '<expectedText>' text.
        When I click on order history 
        Then I check if the expected ordernumber is displayed

    Examples:
        | username          | password | product     | creditcardnumber | cvvcode | nameoncard | applycoupon        | address | expectedText            |
        | hallodu@gmail.com | Aa12345! | zara coat 3 | 1234567890       | 999     | Babie      | rahulshattyacademy | Germany | Thankyou for the order. |