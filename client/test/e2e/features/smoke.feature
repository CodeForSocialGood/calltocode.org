Feature: Smoke Tests
  To verify that basic functionality works
  As a users of different types

  Scenario: Mary Smoke Test
    Given I open the "home" page
    And I am logged out
    Then I am on the "home" page
    When I click the "login" header link
    Then I am on the "login" page
    When I login with the login details mary@email.com mary.password
    Then I am logged in
    When I click the "profile" header link
    Then I am on the "profile" page
    When I click the "createProject" header link
    Then I am on the "createProject" page
    When I create a project with the project details test-name
    And I click the "profile" header link
    Then I see the project with the project details test-name
