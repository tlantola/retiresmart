# ADR\-004: Separate UI and Business Logic

## Status

Accepted

## Context

RetireSmart contains financial calculations and retirement planning rules that must be accurate, testable, and easy to maintain.

React components are responsible for rendering user interfaces and handling user interactions. Combining calculation logic with UI logic can make testing, maintenance, and future enhancement more difficult.

The project also aims to support:

- Clean Code practices
- Unit testing
- Mutation testing
- AI\-assisted development
- Future Azure and container\-based deployments

## Decision

Business logic shall be separated from user interface logic.

React components will be responsible for:

- Rendering data
- Collecting user input
- Handling user interactions
- Managing UI state

Business services will be responsible for:

- Social Security calculations
- Break\-even calculations
- Benefit projections
- Future retirement planning rules

## Example Structure

src/

components/

  BenefitEntryForm.tsx

  ResultsTable.tsx

  BreakEvenSummary.tsx

services/

  SocialSecurityCalculator.ts

types/

  BenefitEstimate.ts

## Consequences

### Positive

- Easier unit testing
- Easier mutation testing
- Smaller React components
- Better separation of concerns
- Easier future refactoring
- Improves maintainability
- Improves AI\-assisted code generation and maintenance

### Negative

- Slightly more files
- Requires discipline when introducing new functionality

## Notes

Whenever new functionality is added, determine whether it is:

1. User interface behavior
2. Business logic

Business logic should generally be implemented in services rather than React components.
