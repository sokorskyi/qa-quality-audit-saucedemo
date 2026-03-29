![CI](https://github.com/Tatyana0903/qa-quality-audit-saucedemo/actions/workflows/playwright.yml/badge.svg)

## Key Highlights

- Risk-based QA approach focused on business-critical flows  
- Combination of manual testing and UI automation (Playwright)  
- Real defects identified and documented  
- CI pipeline with automated test execution (GitHub Actions)  
- Stable tests with retries and expected failure handling
  
## Project Goal

The goal of this project is to demonstrate a structured QA approach to testing a real web application by combining:

- manual testing
- risk-based analysis
- bug reporting
- test design
- UI test automation
- CI-based execution and reporting

This repository reflects how functional quality can be assessed and documented from both manual and automation perspectives.

## Application Under Test

SauceDemo is a demo e-commerce web application used for validating common user flows such as:

- authentication
- cart behavior
- checkout process
- session handling
- form validation

## Scope of Testing

This project focuses on the most business-critical and regression-prone areas of the application:

- login and logout flows
- cart functionality
- checkout process
- negative validation scenarios
- defect reproduction and documentation

## What Is Covered in This Project

### Manual QA
- risk assessment
- audit scope definition
- test case design
- negative and positive test scenarios
- defect documentation
- traceability thinking

### Automation QA
- Playwright UI automation
- stable selectors and structured test implementation
- expected failure handling for known bugs
- retries and trace for CI stability
- HTML test reports
- GitHub Actions CI pipeline

## Repository Structure

Audit_Scope/             - audit objective and testing scope  
Bug_Reports/             - documented defects and bug evidence  
Data_Analysis/           - risk-related and supporting analysis  
Project_Management/      - task and workflow organization  
Test_Cases/              - manual test cases and coverage documents  
automation/playwright/   - Playwright automation suite  
docs/                    - supporting documentation  
evidence/                - screenshots and supporting files  
Test_Summary_Report.md   - consolidated project summary

## Why This Project Matters

This project demonstrates a real-world QA approach:

- focusing on high-risk functionality  
- identifying and reproducing real defects  
- combining manual and automated testing  
- maintaining test stability in CI  
- delivering structured and professional QA documentation
