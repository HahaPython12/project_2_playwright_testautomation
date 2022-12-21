Feature: End-To-End Test

    Feature Description: check from the user logiin until the order history

    As a user
    I want to do login to the page
    So I can buy some items and check my order

    @EndtoEnd
    Scenario: Login to Rahul Shetty Academy
        Given a user has navigated to 'Rahul Shetty Academy'
        When user type valid '<username>', '<password>' and click login
        Then he should enter his account-page 'AutomationAutomation Practice'

    Examples:
        | username          | password | 
        | hallodu@gmail.com | Aa12345! | 

    @EndtoEnd
    Scenario: Choose a Product from the Dashboard, add it to the cart
        Given a user is already logged in to 'Rahul Shetty Academy' with '<username>' and '<password>'
        When choose a product '<product>' and add to cart
        Then I see the product '<product>' inside the cart

    Examples:
        | username          | password | product     |
        | hallodu@gmail.com | Aa12345! | zara coat 3 |