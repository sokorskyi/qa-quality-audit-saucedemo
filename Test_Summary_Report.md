## 🧭 Executive Summary

The application shows stable behavior in core user flows such as authentication and cart operations.

However, critical defects in checkout validation and input handling significantly impact business logic and data integrity.

Immediate attention is required for high-risk areas before production release.

**Test Summary Report**

**Project**: SauceDemo Functional Quality Audit
**Tester**: Tatyana Syrovatko
**Test Type**: Functional / Risk-Based Testing
**Test Cycle**: Sprint 1

**Test Scope**

The objective of this test cycle was to validate core business-critical flows:

- User authentication
- Cart behavior and state management
- Checkout validation logic
- Order confirmation process

Testing was executed using a risk-based approach derived from the identified Risk Register, with a focus on high-impact business scenarios.

**Test Environment**
**Application**: SauceDemo (Web)
**Browser**: Chrome 144.0.7559.133
**OS**: Windows 11 24H2
**Execution Type**: Manual + Automated (Playwright)

Test Coverage Overview
--
**Total User Stories Covered**: 3
**Total Identified Risks**: 7
**Total Test Cases Designed**: 12
**Total Test Cases Executed**: 12

**Coverage includes**:

- Positive scenarios
- Negative validation scenarios
- Boundary validation
- Business logic validation
- Security and access control validation
  
**Test Execution Summary**

**Total Executed**: 12
**Passed**: 9
**Failed**: 3
**Blocked**: 0
**Not Executed**: 0

**Failure Rate**: 25%

Defect Summary
--
**Total Defects Raised**: 3
**Breakdown by Severity**:
**Critical**: 1
**High**: 1
**Medium**: 1

**Critical Defect**

Checkout available with empty cart (Total = 0$)
**Business impact**: Violates checkout integrity and core transactional logic, allowing invalid orders to be placed.

High Defect
--
Whitespace-only input accepted during checkout
**Business impact**: Data integrity issue, allowing incomplete or invalid user data submission.

Medium Defect
--
Special characters accepted without validation
**Business impact**: Input validation weakness, potential risk for data inconsistency.

Risk Assessment

**The most significant risk identified**:

**RSK-005 - Ability to checkout with empty cart**

This issue directly impacts transactional integrity and may lead to incorrect order processing.
Mitigation requires proper backend validation and business rule enforcement.

**Automation Coverage**

Automated tests were implemented using Playwright for selected high-risk scenarios:

Cart functionality (add/remove items)
Cart state persistence after page refresh
Access control validation (unauthorized access)

- Automation was implemented using Playwright for high-risk scenarios.
- Automation supports regression testing and ensures repeatable validation of critical business flows.

Known Issues (Automation Findings)

**TC-CART-NEG-005 - Checkout with empty cart**

This test fails intentionally as it exposes a critical defect.

**Current behavior**: User is able to proceed to checkout with an empty cart
**Expected behavior**: Checkout should be blocked when cart is empty

**Status**: Documented as BUG-004
This test will pass once the defect is fixed.

*Traceability*

All test cases were mapped to identified risks from the Risk Register.

**Examples**:

**TC-CART-NEG-005 → RSK-005 (Checkout with empty cart)**

**TC-AUTH-002 → RSK-002 (Session handling and access control)**

This ensures alignment between risk analysis, test design, and defect detection.

Quality Evaluation
Strengths
Core navigation flows operate as expected without functional defects
Cart add/remove functionality behaves consistently
Authentication boundaries are properly enforced
Weaknesses
Lack of input validation mechanisms in critical form fields
Business logic gap in checkout flow (empty cart allowed)
Conclusion

The system demonstrates stable behavior in core user flows such as authentication and cart management.

However, critical issues in checkout validation and input handling significantly impact overall system reliability and data integrity.

Immediate attention is required for high-risk areas before production usage.







