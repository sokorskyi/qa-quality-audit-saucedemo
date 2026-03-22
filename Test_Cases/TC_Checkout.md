Test Cases - Checkout
--

**Positive scenarios**

**Related risk:** 

RSK-004 - Checkout validation gaps

TC-CHECKOUT-001 - User can open checkout form from cart with added item
--
**Priority**: High

**Preconditions**:

User is logged in
At least one product is added to cart

**Steps to reproduce**:

1. Open cart page
2. Click the button [Checkout]

**Expected result**:

User is redirected to checkout information form
Fields for First Name, Last Name and Postal Code are visible

**Actual result**:

The user is transferred to the checkout page
Fields are available to fill in

--

## TC-CHECKOUT-002 – User can continue checkout with valid data
--

**Related risk:**  

RSK-004 - Checkout validation gaps

**Priority**: High

**Preconditions**:

User is logged in
At least one product is added to cart
User is on checkout information page

**Steps to reproduce**:

1. Enter valid First Name
2. Enter valid Last Name
3. Enter valid Zip/ Postal Code
4. Click  the button [Continue]

**Expected result**:

User is redirected to checkout overview page

**Actual result**:

User is redirected to checkout overview page

--

## TC-CHECKOUT-003 – Checkout overview displays correct item and pricing data
--

**Related risk:**  

RSK-003 - Incorrect cart totals / item list inconsistency  

**Priority**: High

**Preconditions**:

User completed checkout information with valid data  
User is on checkout overview page  

**Steps to reproduce**:

1. Verify product name  
2. Verify product price  
3. Verify payment information  
4. Verify shipping information  

**Expected result**:

Correct product is displayed  
Price is consistent with cart data  
Overview information is displayed correctly  

**Actual result**:

Correct product name and price are displayed  
Overview information is consistent with cart data  

--

## TC-CHECKOUT-004 – User can finish order successfully
--

**Related risk:**  

RSK-004 - Checkout validation gaps  

**Priority**: High

**Preconditions**:

User is on checkout overview page  
There are one or more products in the cart

**Steps to reproduce**:
1. Fill in all the required fields(First Name, Last Name, Zip/ Postal Code)
2. Click on the button [Continue]
3. Click the button [Finish]  

**Expected result**:

Order is completed successfully  
Confirmation page is displayed  

**Actual result**:

Order is completed successfully  
Confirmation page is displayed  

--

## TC-CHECKOUT-005 – User can return to inventory after order completion
--

**Related risk:**  

RSK-004 - Checkout validation gaps  

**Priority**: Medium

**Preconditions**:

User completed order successfully  
User is on confirmation page  

**Steps to reproduce**:

1. Click the button [Back Home]  

**Expected result**:

User is redirected to inventory page  

**Actual result**:

User is redirected to inventory page  

--

**Negative scenarios**

## TC-CHECKOUT-NEG-001 – User cannot continue checkout with empty First Name
--

**Related risk:**  

RSK-004 - Checkout validation gaps  

**Priority**: High

**Preconditions**:

User is logged in  
Product is added to cart  
User is on checkout information page  

**Steps to reproduce**:

1. Leave First Name empty  
2. Fill Last Name  
3. Fill Postal Code  
4. Click the button [Continue]  

**Expected result**:

User remains on checkout information page  
Validation error message is displayed  

**Actual result**:

User remains on checkout information page  
Validation error message is displayed: "Error: First Name is required"

--

## TC-CHECKOUT-NEG-002 – User cannot continue checkout with empty Last Name
--

**Related risk:**  

RSK-004 - Checkout validation gaps  

**Priority**: High

**Preconditions**:

User is logged in  
Product is added to cart  
User is on checkout information page  

**Steps to reproduce**:

1. Fill First Name  
2. Leave Last Name empty  
3. Fill Postal Code  
4. Click the button [Continue]  

**Expected result**:

User remains on checkout information page  
Validation error message is displayed  

**Actual result**:

User remains on checkout information page  
Validation error message is displayed: "Error: Last Name is required" 

--

## TC-CHECKOUT-NEG-003 – User cannot continue checkout with empty Postal Code
--

**Related risk:**  

RSK-004 - Checkout validation gaps  

**Priority**: High

**Preconditions**:

User is logged in  
Product is added to cart  
User is on checkout information page  

**Steps to reproduce**:

1. Fill First Name  
2. Fill Last Name  
3. Leave Postal Code empty  
4. Click the button [Continue]  

**Expected result**:

User remains on checkout information page  
Validation error message is displayed  

**Actual result**:

User remains on checkout information page  
Validation error message is displayed: "Error: Postal Code is required"  

--

## TC-CHECKOUT-NEG-004 – User should not be able to submit whitespace-only values
--

**Related risk:**  

RSK-004 - Checkout validation gaps  

**Priority**: High

**Preconditions**:

User is on checkout information page  

**Steps to reproduce**:

1. Enter whitespace in First Name  
2. Enter whitespace in Last Name  
3. Enter whitespace in Postal Code  
4. Click the button [Continue]  

**Expected result**:

Validation should reject input  
User should remain on the same page  

**Actual result**:

Whitespace-only input is accepted  
User proceeds to next step without error message 

--

## TC-CHECKOUT-NEG-006 – User should not be able to submit special characters only
--

**Related risk:**  

RSK-004 - Checkout validation gaps  

**Priority**: Medium

**Preconditions**:

User is on checkout information page  

**Steps to reproduce**:

1. Enter special characters in First Name  
2. Enter special characters in Last Name  
3. Enter special characters in Postal Code  
4. Click the button [Continue]  

**Expected result**:

Validation should reject invalid input  
User should remain on checkout page  

**Actual result**:

Special characters are accepted  
User proceeds to next step

