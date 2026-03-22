TC-CHECK-001 - Checkout is blocked when cart is empty (UI navigation)
--
**Priority**: Critical

**Preconditions**:

User is logged in and the cart is empty.

**Test steps**:

1. Open the cart page.
2. Attempt to proceed to checkout (if the button is available).

**Expected result**:

User cannot proceed to checkout with an empty cart.
A message is shown or the action is blocked.

**Actual result**:

The Checkout button is enabled even when the cart is empty.
The user is allowed to proceed to the checkout form.
Input fields for user data are accessible and can be filled in despite having no products in the cart.


TC-CHECK-002 - Direct URL access to checkout with empty cart is blocked
--
**Priority**: Critical

**Preconditions**:

User is logged in and the cart is empty.

**Test steps**:

1. Navigate directly to /checkout-step-one.html (or the first checkout step URL).
2. Observe what happens.

**Expected result**:

User is redirected back to cart or inventory.
Or a clear message is displayed that checkout requires items in cart.
Checkout form is not usable without items.

**Actual result**:

The user is able to complete the checkout process with an empty cart.
The order is successfully submitted.
The total cost is displayed as 0$.





















