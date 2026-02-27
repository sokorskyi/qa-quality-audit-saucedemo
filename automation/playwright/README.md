# Playwright Automation Layer

This directory contains automated UI tests implemented using Playwright.

## Scope

The automation suite covers critical business flows:

- User authentication (positive & negative)
- Cart behavior validation
- Checkout validation
- Prevention of order placement with empty cart

## Test Strategy

Automation focuses on:
- High-risk scenarios
- Business-critical flows
- Regression-prone validation logic

## Structure

tests/ - test specifications  
pages/ - Page Object Model classes  
test-data/ - static test data  
playwright.config.ts - configuration  
