# QA Automation Project - Playwright

End-to-end QA automation project covering critical user flows of the SauceDemo e-commerce application.

This project demonstrates a structured QA approach including:
- Risk-based test design
- Negative testing strategy
- Bug identification and documentation
- Automated UI testing using Playwright

---

## Scope

The automation suite covers critical business flows:

- User authentication (positive & negative)
- Cart behavior validation
- Checkout validation
- Prevention of order placement with empty cart

---

## Test Strategy

Automation focuses on:

- High-risk scenarios
- Business-critical flows
- Regression-prone validation logic

Test design techniques applied:
- Boundary Value Analysis
- Negative testing
- Input validation testing

---
## Covered Modules

- login.spec.ts – authentication validation  
- logout.spec.ts – logout flow validation  
- cart.spec.ts – cart functionality  
- cart-negative.spec.ts – negative cart scenarios  
- checkout.spec.ts – positive and negative checkout scenarios  

---

## How to run

Install dependencies and execute tests:

```bash
cd automation/playwright
npm install
npx playwright test
