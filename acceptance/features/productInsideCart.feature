Feature: Choose a product and add to cart

    Feature Description: Choose a product from the dashboard, add it to the cart and navigate to the cart.

    As a user
    I want to choose a product
    So I can add it to my cart

    @EndtoEnd
    Scenario: Choose a Product from the Dashboard, add it to the cart
        Given I am already logged in to 'Rahul Shetty Academy' with '<username>' and '<password>'
        When I choose a product '<product>' and add to cart
        Then I see the product '<product>' inside the cart

    Examples:
        | username          | password | product     |
        | hallodu@gmail.com | Aa12345! | zara coat 3 |