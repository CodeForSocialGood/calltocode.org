@login
Feature: Login Page
  To verify login page works as expected
  As a user who wants to login

  Scenario: Verify link to login page
    Given I open the "home" page
    Then I am on the "home" page
    And I am logged out
    When I click the "login" header link
    Then I am on the "login" page

  Scenario Outline: Verify ability to login
    Given I open the "login" page
    Then I am on the "login" page
    And I am logged out
    When I login with the login details <email> <password>
    Then I am logged in

    Examples:
    |      email      |    password    |
    | kevin@email.com | kevin.password |
    | mary@email.com  | mary.password  |
