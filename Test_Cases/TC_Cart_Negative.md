# Cart - Negative Test Cases
---
## TC-CART-NEG-001 - User cannot access cart page without login

**Priority:** High

**Preconditions:**
User is not logged in.

**Test steps:**
1. Open direct URL to cart page: `https://www.saucedemo.com/cart.html`

**Expected result:**
- User is redirected to the login page
- Access to cart is blocked for unauthenticated user
- Error message is displayed if application supports it

---

## TC-CART-NEG-002 - User cannot access inventory page without login

**Priority:** High

**Preconditions:**
User is not logged in.

**Test steps:**
1. Open direct URL to inventory page: `https://www.saucedemo.com/inventory.html`

**Expected result:**
- User is redirected to the login page
- Inventory page is not accessible without authentication
- Proper error message is displayed

---

## TC-CART-NEG-003 - Cart badge is not displayed when cart is empty

**Priority:** Medium

**Preconditions:**
User is logged in
Cart is empty

**Test steps:**
1. Open inventory page
2. Do not add any products
3. Check cart icon area

**Expected result:**
- Cart badge is not displayed
- No incorrect value such as "0" or "1" is shown

---

## TC-CART-NEG-004 - Remove button is not displayed for product not added to cart

**Priority:** Medium

**Preconditions:**
User is logged in
Product has not been added to cart

**Test steps:**
1. Open inventory page
2. Locate a product that was not added to cart
3. Verify action button state

**Expected result:**
- "Remove" button is not displayed
- "Add to cart" button remains available

---

## TC-CART-NEG-005 - User cannot proceed to checkout from empty cart

**Priority:** High

**Preconditions:**
User is logged in
Cart is empty

**Test steps:**
1. Open cart page
2. Attempt to continue checkout

**Expected result:**
- User cannot proceed with checkout for empty cart
- System blocks invalid flow or keeps user on current step
