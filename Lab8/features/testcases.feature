Feature: Automation Exercise Test Cases

  Scenario: TC02 Login User with correct email and password
    Given I open the browser
    When I navigate to the homepage
    And I click on Signup Login
    And I enter name "ExistingUser" and email "existing@mail.com"
    Then I should see "Login to your account"
    And I close the browser

  Scenario: TC04 Logout User
    Given I open the browser
    When I navigate to the homepage
    And I click on Signup Login
    And I enter name "LogoutUser" and email "unique"
    And I click Signup button
    Then I should see "ENTER ACCOUNT INFORMATION"
    When I fill account details
    And I click Create Account button
    Then I should see "ACCOUNT CREATED!"
    And I close the browser

  Scenario: TC05 Register User with existing email
    Given I open the browser
    When I navigate to the homepage
    And I click on Signup Login
    And I enter name "TestUser" and email "existing@mail.com"
    And I click Signup button
    Then I should see "Email Address already exist!"
    And I close the browser

  Scenario: TC06 Contact Us Form
    Given I open the browser
    When I navigate to the homepage
    And I click on Signup Login
    Then I should see "Contact us"
    And I close the browser
