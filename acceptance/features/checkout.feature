Feature: Checkout

    Feature Description: Filling out the checkout page, so we can place an order

    As a user
    I want to checkout
    So I can pay the products

    @EndtoEnd
    Scenario: Choose a Product from the Dashboard, add to cart
        Given I am already logged in to 'Rahul Shetty Academy' with '<username>', '<password>' and a '<product>' inside the cart.
        When I fill out '<creditcardnumber>', '<cvvcode>', '<nameoncard>', '<applycoupon>' and the '<address>'
        Then I see the '<username>' is already filled and I can place the order

    Examples:
        | username          | password | product     | creditcardnumber | cvvcode | nameoncard | applycoupon        | address |
        | hallodu@gmail.com | Aa12345! | zara coat 3 | 1234567890       | 999     | Babie      | rahulshattyacademy | Germany |