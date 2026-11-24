# ADR-004: Separate Presentation, Application, and Domain Logic

## Status

Accepted

## Context

RetireSmart contains retirement planning calculations and financial analysis that must be accurate, testable, maintainable, and easy to evolve.

The application has evolved from a simple break-even calculator into a retirement analysis platform centered around the Retirement Benefit Matrix. The domain now includes concepts such as:

- Personalized Monthly Retirement Benefit Estimates
- Retirement Benefit Matrices
- Claiming Age Benefit Projections
- Break-Even Analysis
- Future Claiming Strategy Comparisons
- Future Optimal Claiming Age Recommendations

React components are responsible for rendering user interfaces and collecting user input. Mixing domain calculations with presentation concerns would make testing, maintenance, and future enhancements more difficult.

The project also aims to support:

- Clean Code practices
- Unit testing
- Mutation testing
- Domain-Driven Design principles
- AI-assisted development
- Future Azure deployments
- Future container-based deployment

## Decision

RetireSmart shall separate responsibilities into Presentation, Application, and Domain layers.

### Presentation Layer Responsibilities

Presentation components are responsible for:

- Rendering user interfaces
- Collecting user input
- Managing UI state
- Handling user interactions
- Displaying calculation results

Presentation components must not contain business calculation logic.

### Application Layer Responsibilities

Application services are responsible for:

- Coordinating use cases
- Orchestrating domain operations
- Transforming user requests into domain operations
- Returning results to the presentation layer

Application services should contain little or no business logic.

### Domain Layer Responsibilities

Domain services and domain models are responsible for:

- Retirement benefit calculations
- Benefit projections
- Break-even calculations
- Claiming strategy analysis
- Retirement planning rules
- Core business concepts and terminology

Business rules must be implemented within the domain layer rather than within React components.

## Current Structure

```text
src/
├── retirement-analysis-matrix
│   ├── application
│   │   └── services
│   │       └── GenerateRetirementBenefitMatrix.ts
│   │
│   ├── domain
│   │   ├── models
│   │   │   ├── RetirementBenefitModels.ts
│   │   │
│   │   ├── rules
│   │   │   └── BenefitRules.ts
│   │   │
│   │   └── services
│   │       └── RetirementBenefitMatrixCalculator.ts
│   │
│   └── presentation
│       ├── components
│       └── pages
```

## Core Domain Flow

```text
PersonalizedMonthlyRetirementBenefitEstimate
                    ↓
     RetirementBenefitMatrixCalculator
                    ↓
         RetirementBenefitMatrix
                    ↓
      ClaimingAgeBenefitProjection
                    ↓
      CumulativeBenefitAmountByAge
```

## Consequences

### Positive

- Easier unit testing
- Easier mutation testing
- Domain logic can evolve independently of the UI
- Smaller React components
- Better separation of concerns
- Improved maintainability
- Improved readability through ubiquitous language
- Easier future feature expansion
- Easier AI-assisted development
- Easier future refactoring

### Negative

- More files and folders
- Additional architectural discipline required
- Developers must understand the responsibilities of each layer

## Notes

When adding new functionality, determine whether the behavior belongs in:

1. Presentation
2. Application
3. Domain

Questions to consider:

- Is this rendering or user interaction? → Presentation
- Is this use-case orchestration? → Application
- Is this a retirement planning rule or calculation? → Domain

Business logic should generally be implemented in the domain layer and exposed through application services rather than implemented directly in React components.
