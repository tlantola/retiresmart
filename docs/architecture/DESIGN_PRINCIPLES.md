# Design Principles

## Purpose

This document captures the design principles that guide the evolution of RetireSmart.

These principles help ensure that new features, analyses, models, services, pages, and architectural decisions remain consistent with the retirement-planning domain, Domain-Driven Design (DDD), Clean Architecture, and the long-term vision of RetireSmart as a retirement decision-support platform.

---

## 1. Favor Screaming Domain Over Technical Naming

Names should communicate retirement-planning intent, not implementation details.

Prefer names that answer:

> What retirement question does this help solve?

### Prefer

- RetirementBenefitMatrix
- ClaimingStrategyAdvantageMatrix
- ClaimingStrategyComparison
- OpportunityCostOfEarlyClaiming
- ClaimingAgeBenefitProjection

### Avoid

- CalculationResult
- Processor
- Utility
- Manager
- Analyzer
- DataObject

A retiree, financial planner, or business analyst should be able to understand the purpose of a concept with minimal explanation.

---

## 2. Apply the Principle of Least Astonishment to Domain Concepts

Domain concepts should be understandable and unsurprising.

A user should be able to reasonably answer:

- What am I looking at?
- Why would I use this?
- What decision does this help me make?

without requiring significant explanation.

If a concept requires extensive explanation, reconsider the design or naming.

---

## 3. Design the Domain Before Designing the Calculation

Start with the retirement-planning question.

Ask:

> What question is the user trying to answer?

before asking:

> What calculation should be performed?

### Example

Instead of starting with:

> I need a break-even calculation.

Start with:

> How does the advantage of delaying benefits evolve over time?

The domain concept should drive the calculation rather than the calculation driving the domain concept.

---

## 4. Derive New Insights From Existing Domain Artifacts

Prefer deriving analyses from existing domain objects whenever possible.

### Preferred Flow

```text
PersonalizedMonthlyRetirementBenefitEstimate
                    ↓
         RetirementBenefitMatrix
                    ↓
      ClaimingStrategyAdvantageMatrix
                    ↓
         ClaimingStrategyComparison
```

Avoid duplicating calculations that can be derived from an existing artifact.

Domain objects should serve as building blocks for future analysis.

---

## 5. Preserve Ubiquitous Language

RetireSmart should use retirement-planning terminology consistently.

Models, services, pages, documentation, ADRs, and tests should all use the same language.

### Good Examples

- RetirementBenefitMatrix
- ClaimingStrategyAdvantageMatrix
- ClaimingStrategyComparison
- OpportunityCostOfEarlyClaiming

The same concept should never have multiple names.

A concept should be named once and reused consistently throughout the codebase.

---

## 6. Keep Business Logic in the Domain Layer

Retirement-planning rules belong in the domain.

### Domain Responsibilities

- Benefit calculations
- Strategy comparisons
- Business rules
- Analysis generation
- Retirement-planning concepts

### Application Responsibilities

- Use-case orchestration
- Request models
- Response models
- Coordination of domain services

### Presentation Responsibilities

- Rendering
- User interaction
- UI state
- Display formatting

Business rules should never be implemented in React components.

---

## 7. Favor Domain Artifacts Over UI Artifacts

User interface concerns should not drive domain design.

Prefer creating reusable domain concepts that can support multiple pages, views, or visualizations.

### Preferred

```text
ClaimingStrategyAdvantageMatrix
            ↓
    Multiple Views
```

### Avoid

```text
Page A Calculation

Page B Calculation

Page C Calculation
```

Create the domain concept first, then derive the user experiences from it.

---

## 8. Build for Future Analysis

RetireSmart should evolve by adding new analyses rather than replacing existing concepts.

Examples of future analyses:

- Claiming Strategy Comparison
- Opportunity Cost of Early Claiming
- Optimal Claiming Age Recommendations
- Longevity Risk Analysis
- Monte Carlo Simulation

Each new analysis should build upon existing domain artifacts whenever possible.

---

## 9. Prefer Explicit Domain Models

Domain concepts deserve first-class models.

Avoid passing loosely related primitives when a meaningful domain object exists.

### Prefer

```text
RetirementBenefitMatrix
ClaimingStrategyAdvantageMatrix
ClaimingStrategyComparison
```

### Avoid

```text
number
Record<number, number>
unstructured objects
```

A model should represent a retirement-planning concept rather than a storage structure.

---

## 10. Architecture Should Support Understanding

The primary purpose of the architecture is not technical sophistication.

The primary purpose is to communicate the retirement-planning domain clearly.

When evaluating a design, ask:

- Does it make the domain easier to understand?
- Does it strengthen ubiquitous language?
- Does it scream the domain?
- Does it reduce the amount of explanation required?

If the answer is no, reconsider the design.

---

## Guiding Principle

RetireSmart is not being built as a calculator.

RetireSmart is being built as a retirement decision-support platform.

Every design decision should move the project toward helping users understand retirement-planning choices, tradeoffs, risks, and opportunities through clear domain concepts and ubiquitous language.
