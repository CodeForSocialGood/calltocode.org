Feature: Kevin Smoke Test

Scenario: Navigate to login page

  Given I open the app
  Then the login nav button is visible

  When I click on the login nav button
  Then I am routed to the login page

Scenario: Input login details

  Given I open the app login page
  Then the login form is visible
  And the login field is visible
  And the password field is visible

  When I input the login details:
    | email    | kevin@email.com |
    | password | kevin.password  |
  And I submit the login form
  Then I am routed to the home page
  And the profile nav button is visible
  And the logout nav button is visible
