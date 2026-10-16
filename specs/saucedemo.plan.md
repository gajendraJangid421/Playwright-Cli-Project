# SauceDemo Test Plan

## Application Overview

SauceDemo (Swag Labs) is a sample shopping application. These scenarios cover successful sign-in and checkout, plus the locked-out-account and invalid-credentials login failures. Each scenario starts from the login page and captures a screenshot of its final outcome.

## Test Scenarios

### 1. Authentication and checkout

**Seed:** `https://www.saucedemo.com/` (open a fresh page for each scenario)

#### 1.1. standard-user-completes-checkout

**Feature:** `features/saucedemo.feature`

```gherkin
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
```

### 2. Login failures

**Seed:** `https://www.saucedemo.com/` (open a fresh page for each scenario)

#### 2.1. locked-out-user-cannot-sign-in

**Feature:** `features/saucedemo.feature`

```gherkin
Scenario: A locked-out user cannot sign in
  Given I am on the SauceDemo login page
  When I sign in as "locked_out_user" with password "secret_sauce"
  Then I should see the error "Epic sadface: Sorry, this user has been locked out."
  And I save a screenshot as "artifacts/saucedemo/locked-out-user-cannot-sign-in.png"
```

#### 2.2. invalid-credentials-are-rejected

**Feature:** `features/saucedemo.feature`

```gherkin
Scenario: Invalid credentials are rejected
  Given I am on the SauceDemo login page
  When I sign in as "invalid_user" with password "wrong_password"
  Then I should see the error "Epic sadface: Username and password do not match any user in this service"
  And I save a screenshot as "artifacts/saucedemo/invalid-credentials-are-rejected.png"
```
