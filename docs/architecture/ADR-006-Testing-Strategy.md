# ADR\-006: Testing Strategy

## Status

Accepted

## Context

RetireSmart performs financial calculations that must remain accurate as the application evolves.

The project is also intended to provide hands\-on experience with:

- Test\-Driven Development (TDD)
- Unit Testing
- Mutation Testing
- Clean Code principles
- Refactoring with confidence

A comprehensive testing strategy is required to ensure that calculation logic remains correct and maintainable.

## Decision

RetireSmart will adopt a testing-first mindset for business logic.

Where practical, business logic should be developed using Test-Driven Development (TDD).

The testing strategy will prioritize:

1. Unit tests for business logic
2. Mutation testing to evaluate test effectiveness
3. Integration tests where appropriate
4. Limited UI testing focused on critical user workflows

## Testing Priorities

### Business Logic

Business logic shall be implemented in services and tested using Vitest.

Examples include:

- Lifetime benefit calculations
- Break\-even age calculations
- Benefit comparison calculations
- Future retirement planning calculations

Business logic should be testable without requiring a browser or React component.

### Mutation Testing

StrykerJS will be used to evaluate the effectiveness of unit tests.

The goal is not code coverage alone, but the ability of tests to detect behavioral changes and defects.

Mutation testing should focus primarily on business logic. Mutation testing results should be reviewed periodically to identify weaknesses in the unit test suite.

A high mutation score is preferred over high code coverage alone.

### User Interface Testing

React component tests may be added where they provide meaningful value.

Component tests should focus on:

- Rendering behavior
- User interactions within a component
- Component state transitions
- Accessibility verification

Component tests should avoid validating business calculations that are already covered by unit tests.

Business rules should not be validated exclusively through UI tests.

### End\-to\-End Testing

Playwright will be used for end\-to\-end testing.

Its primary purpose is to validate key user workflows from the user's perspective.

Examples include:

- Entering benefit estimates
- Running calculations
- Viewing break\-even results
- Viewing cumulative benefit projections

Playwright tests should focus on user value rather than implementation details.

### Integration Testing

Integration tests may be used to verify collaboration between components, services, and external dependencies.

Examples include:

- Component-to-service interactions
- Local storage persistence
- Future API integrations
- Future Azure service integrations

Integration tests should focus on interactions between units rather than individual business rules.

## Test Data

Test data should be deterministic and repeatable.

Financial calculations should use known inputs and expected outputs.

Where practical, Golden Master tests should be used to verify calculation results across large data sets. Golden Master test data should be version controlled and treated as a trusted baseline for validating future refactoring efforts.

## Consequences

### Positive

- Greater confidence during refactoring
- Improved code quality
- Better defect detection
- Supports Clean Code practices
- Encourages separation of concerns
- Makes AI\-assisted code changes safer

### Negative

- Additional development effort
- Longer build and test execution times
- Requires maintenance of automated tests

## Notes

Accuracy is a primary requirement of RetireSmart.

Financial calculations should always have automated tests before being exposed through the user interface whenever practical.
