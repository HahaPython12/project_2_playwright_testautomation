Feature: User login

    Feature Description: check if a user login is valid

    As a user
    I want to do login to the page
    So I can buy some items

    @EndtoEnd
    Scenario: Login to Rahul Shetty Academy
        Given a user has navigated to 'Rahul Shetty Academy'
        When user type valid '<username>', '<password>' and click login
        Then he should enter his account-page 'AutomationAutomation Practice'

    Examples:
        | username          | password | 
        | hallodu@gmail.com | Aa12345! | 