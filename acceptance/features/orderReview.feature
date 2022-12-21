Feature: Review an already placed order

    Feature Description: Checkout is already done, now reviewing the placed order.

    As a user
    I want to review my order
    So I can verify it

    @EndtoEnd
    Scenario: Reviewing a placed order
        Given I am already logged in to 'Rahul Shetty Academy' with '<username>', '<password>', a '<product>' inside the cart and I filled out '<creditcardnumber>', '<cvvcode>', '<nameoncard>', '<applycoupon>' and the '<address>' at the checkout page.
        When I place the order
        Then I check if the expected text '<expectedText>' is displayed

    Examples:
        | username          | password | product     | creditcardnumber | cvvcode | nameoncard | applycoupon        | address | expectedText              |
        | hallodu@gmail.com | Aa12345! | zara coat 3 | 1234567890       | 999     | Babie      | rahulshattyacademy | Germany | Thankyou for the order. |