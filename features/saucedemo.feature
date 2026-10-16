Feature: SauceDemo authentication and checkout
  As a shopper
  I want to sign in and complete a purchase
  So that I can verify the shopping flow and its login errors

  Scenario: A standard user completes a purchase
    Given I am on the SauceDemo login page
    When I sign in as "standard_user" with password "secret_sauce"
    Then I should see the Products page
    When I add "Sauce Labs Backpack" to the cart
    And I open the cart and proceed to checkout
    And I enter first name "Test", last name "User", and postal code "12345"
    And I continue and finish the checkout
    Then I should see "Thank you for your order!"
    And I save a screenshot as "artifacts/saucedemo/standard-user-completes-checkout.png"

  Scenario: A locked-out user cannot sign in
    Given I am on the SauceDemo login page
    When I sign in as "locked_out_user" with password "secret_sauce"
    Then I should see the error "Epic sadface: Sorry, this user has been locked out."
    And I save a screenshot as "artifacts/saucedemo/locked-out-user-cannot-sign-in.png"

  Scenario: Invalid credentials are rejected
    Given I am on the SauceDemo login page
    When I sign in as "invalid_user" with password "wrong_password"
    Then I should see the error "Epic sadface: Username and password do not match any user in this service"
    And I save a screenshot as "artifacts/saucedemo/invalid-credentials-are-rejected.png"
