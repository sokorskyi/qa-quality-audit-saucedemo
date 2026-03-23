Test Cases - Auth Boundaries
--
**Related risk**: 

*RSK-001 - Auth boundary issue (access without login)*

**Purpose**: 

Verify that protected pages cannot be accessed without authentication and that session/logout behavior does not allow unauthorized access.

TC-AUTH-001 - Direct access to inventory page without login
---
**Priority**: Critical

**Preconditions**:

User is logged out (no active session).

**Test steps**:

1. Open a new Incognito/Private window.
2. Navigate directly to the inventory page URL: (https://www.saucedemo.com/inventory.html).
3. Observe what happens.

**Expected result**:

User should be redirected to the login page.
Inventory content should not be visible.
No sensitive data should be accessible.

**Actual result**:

In Incognito mode, direct access to the inventory page is not possible without providing valid credentials.
The system displays the messages:
Username is required"
Password is required"
After entering incorrect login credentials, the message appears:
"Username and password do not match any user in this service."
The user remains on the login page and cannot access the inventory.

TC-AUTH-002 - Direct access to cart page without login
--
**Priority**: Critical

**Preconditions**:

User is logged out (no active session).

**Test steps**:

1. Open a new Incognito window.
2. Navigate directly to the cart page URL (https://www.saucedemo.com/cart.htmll).
3. Observe what happens.

**Expected result**:

User should be redirected to the login page.
Cart content should not be visible.

**Actual result**:

The user is not allowed to access the cart page directly.
The user remains on the login page and the following message is displayed:
"You can only access '/cart.html' when you are logged in."
No cart content is visible.

TC-AUTH-003 - Logout should invalidate access to protected pages (refresh)
---
**Priority**: High

**Preconditions**:

User is logged in and is currently on the inventory page.

**Test steps**:

1. Click Logout.
2. After logout, try to refresh the last protected page.
3. Observe what happens.

**Expected result**:

User should remain logged out.
Refresh should not restore access to the protected page.
User should be redirected to login.

**Actual result**:

After logout, refreshing the previously opened protected page does not restore access.
The user remains on the login page and cannot return to the previous step.

TC-AUTH-004 - Back button after logout should not restore access
---
**Priority**: High

**Preconditions**:

User is logged in and has visited a protected page (inventory or cart).

**Test steps**:

1. Click Logout.
2. Use the browser Back button several times to return to the previous page.
3. Observe if protected content becomes visible.

**Expected result**:

Protected content should not be visible after logout.
If the browser displays a cached page, any interaction should force redirect to login.
User should not be able to perform actions.

**Actual result**:

After logout, using the browser Back button does not allow access to the protected page.
The user is redirected to the login page and cannot interact with any protected content









