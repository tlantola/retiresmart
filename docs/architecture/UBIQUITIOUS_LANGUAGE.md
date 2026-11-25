# Ubiquitous Language

## Purpose

This document defines the core domain language used throughout RetireSmart.

The purpose of this language is to establish a shared vocabulary that is used consistently across:

- Domain Models
- Domain Services
- Application Services
- Presentation Components
- ADRs
- Documentation
- Tests

When a concept is added to this document, it becomes the preferred terminology for that concept throughout the project.

---

# Core Principles

## One Concept, One Name

A domain concept should have a single name.

Avoid creating synonyms for the same concept.

### Preferred

```text
RetirementBenefitMatrix
```

Used everywhere.

### Avoid

```text
RetirementBenefitMatrix
BenefitProjectionMatrix
RetirementProjectionMatrix
```

referring to the same concept.

---

## Domain Language Over Technical Language

Prefer retirement-planning terminology over implementation terminology.

### Prefer

```text
ClaimingStrategyComparison
```

### Avoid

```text
ComparisonResult
CalculationOutput
AnalysisData
```

The domain should describe retirement-planning concepts, not software structures.

---

# Retirement Planning Concepts

## Age

A retirement-planning age expressed as a whole number.

### Examples

```text
62
67
70
86
```

### Used For

- Claiming ages
- Projection ages
- Life expectancy

---

## Claiming Age

The age at which Social Security retirement benefits begin.

### Examples

```text
62
63
64
65
66
67
68
69
70
```

Claiming age is one of the most important domain concepts in RetireSmart because most analyses compare claiming strategies.

---

## Projection Age

A future age used when evaluating cumulative retirement benefits.

### Example

```text
Projection Age = 86
```

Question answered:

> How much money would have been received by age 86?

Projection ages are commonly used throughout the Retirement Benefit Matrix.

---

## Life Expectancy

An age used to represent a projected lifespan for comparison purposes.

### Example

```text
Life Expectancy = 86
```

Question answered:

> If I live to age 86, what is the outcome of each claiming strategy?

Life expectancy is an analysis input rather than a claiming strategy.

---

# Existing Domain Artifacts

## PersonalizedMonthlyRetirementBenefitEstimate

A user-provided monthly Social Security retirement benefit amount associated with a specific claiming age.

### Example

```text
Age 62 → $1,500
Age 67 → $2,100
Age 70 → $2,604
```

This serves as the primary user input to RetireSmart.

---

## RetirementBenefitMatrix

The core domain artifact of RetireSmart.

Contains retirement benefit projections for every claiming age and every projection age.

### Purpose

Answers:

> How much money will I have received by a specific age if I claim benefits at a particular claiming age?

### Derived From

```text
PersonalizedMonthlyRetirementBenefitEstimate
```

---

## ClaimingAgeBenefitProjection

A projection of retirement benefits for a specific claiming age.

Contains cumulative benefit amounts for all projection ages associated with a single claiming strategy.

### Example

```text
Claim at age 67
```

Projected through:

```text
67
68
69
...
100
```

---

## CumulativeBenefitAmountByAge

The total retirement benefits received by a specific age.

### Example

```text
Age 86 → $542,000
```

Represents cumulative lifetime benefits through a projection age.

---

# Emerging Domain Artifacts

## ClaimingStrategyAdvantageMatrix

A domain artifact derived from the Retirement Benefit Matrix.

Compares claiming strategies and quantifies the advantage of one claiming age versus another.

### Purpose

Answers:

> How much better off would I be by delaying benefits?

### Derived From

```text
RetirementBenefitMatrix
```

This artifact serves as the foundation for future claiming strategy analyses.

---

## Claiming Strategy Advantage Projection

A future analysis view derived from the Claiming Strategy Advantage Matrix.

### Answers

> How does the advantage of delaying benefits evolve over time?

### Purpose

Displays how the advantage of one claiming strategy changes across projection ages.

---

## Claiming Strategy Comparison

A future analysis view derived from the Claiming Strategy Advantage Matrix.

### Answers

> What is the final advantage at a selected life expectancy?

### Purpose

Provides a summary comparison of claiming strategies at a specific life expectancy.

---

## Opportunity Cost of Early Claiming

A future analysis view derived from the Claiming Strategy Advantage Matrix.

### Answers

> How much money am I giving up by claiming early?

### Purpose

Highlights the potential foregone benefits associated with earlier claiming strategies.

---

# Architectural Concepts

## Presentation Layer

Responsible for:

- Rendering
- User interaction
- UI state
- Display formatting

Must not contain retirement-planning business rules.

---

## Application Layer

Responsible for:

- Use-case orchestration
- Request models
- Response models
- Coordination of domain services

Contains minimal business logic.

---

## Domain Layer

Responsible for:

- Retirement-planning concepts
- Business rules
- Calculations
- Analysis generation

The domain layer is the authoritative source for retirement-planning behavior.

---

# Future Domain Concepts

The following concepts are being considered for future evolution of RetireSmart:

- Optimal Claiming Age
- Longevity Risk Analysis
- Claiming Strategy Recommendations
- Monte Carlo Simulation
- Retirement Income Scenarios

These concepts should be evaluated using the Design Principles and RetireSmart Domain Architect documents before becoming part of the official ubiquitous language.
