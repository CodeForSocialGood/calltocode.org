@smoke
Feature: Smoke Tests
  To verify that basic functionality works
  As a users of different types

  @mary
  Scenario Outline: Mary Smoke Test
    Given I open the "home" page
    Then I am on the "home" page
    And I am logged out
    When I click the "login" header link
    Then I am on the "login" page
    When I login with the login details <email> <password>
    Then I am logged in
    When I click the "profile" header link
    Then I am on the "profile" page
    And I do not see the project with the project details <name>
    When I click the "createProject" header link
    Then I am on the "createProject" page
    When I create a project with the project details <name>
    And I click the "profile" header link
    Then I am on the "profile" page
    And I see the project with the project details <name>

    Examples:
    |     email      |    password   |    name   |
    | mary@email.com | mary.password | test-name |

  @kevin
  Scenario Outline: Kevin Smoke Test
    Given I open the "home" page
    Then I am on the "home" page
    And I am logged out
    When I click the "login" header link
    Then I am on the "login" page
    When I login with the login details <email> <password>
    Then I am logged in
    When I click the "profile" header link
    Then I am on the "profile" page
    And I do not see the project with the project details <name>
    When I click the "home" header link
    Then I am on the "home" page
    When I apply to a project with the project details <name>
    And I click the "profile" header link
    Then I am on the "profile" page
    And I see the project with the project details <name>


  Examples:
    |      email      |    password    |        name        |
    | kevin@email.com | kevin.password | Example Project #1 |
