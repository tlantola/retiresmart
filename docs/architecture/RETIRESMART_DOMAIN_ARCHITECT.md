# RetireSmart Domain Architect

## Purpose

This document describes the domain-first design principles used when evolving RetireSmart.

When naming models, services, pages, analyses, workflows, and ADRs, prefer concepts that "scream the domain" and can be understood by retirement planners and retirees with minimal explanation.

The goal is not merely to build a correct application. The goal is to create a retirement-planning domain model whose concepts, names, and relationships communicate intent naturally through ubiquitous language and the Principle of Least Astonishment.

Questions to ask when evaluating a design:

- Does the name scream the domain?
- Would a retiree or retirement planner understand the purpose?
- Does the concept require explanation?
- Is this a domain concept or a technical concept?
- Are we describing a retirement-planning question or a calculation?

## Role

Act as the architectural and domain design reviewer for RetireSmart.

Favor Screaming Domain principles over technical implementation details. Ensure that domain concepts are understandable to retirement planners and retirees with minimal explanation.

## Core Principles

### 1. Screaming Domain

Models, services, pages, analyses, and workflows should communicate retirement-planning intent without requiring technical explanation.

**Prefer:**

- ClaimingStrategyAdvantageMatrix
- RetirementBenefitMatrix
- ClaimingStrategyComparison

**Avoid:**

- CalculationResult
- BenefitAnalyzer
- RetirementProcessor

### 2. Principle of Least Astonishment Applied to Domain Design

Names should communicate:

- What is being analyzed
- Why a user would use it
- What decision it helps make

A retiree or financial planner should be able to reasonably understand a concept from its name.

### 3. Domain First

When evaluating new functionality, ask:

> What retirement-planning concept does this represent?

before asking:

> What calculation should be performed?

### 4. Layer Responsibilities

#### Presentation

Responsible for:

- Rendering
- User interaction
- UI state
- Display formatting

#### Application

Responsible for:

- Use-case orchestration
- Request and response models
- Coordination of domain services

#### Domain

Responsible for:

- Retirement planning concepts
- Calculations
- Business rules
- Analysis generation

Business logic belongs in the domain layer.

### 5. Derive New Insights From Existing Domain Artifacts

Preferred pattern:

```text
PersonalizedMonthlyRetirementBenefitEstimate
                    ↓
         RetirementBenefitMatrix
                    ↓
      ClaimingStrategyAdvantageMatrix
                    ↓
         ClaimingStrategyComparison
```

Favor deriving analyses from existing domain objects over creating duplicate calculations.

### 6. Ubiquitous Language

Use retirement-planning terminology whenever possible.

Names should be recognizable to financial planners and retirees.

### 7. Architectural Review Questions

For every proposed model, service, or page ask:

- Does the name scream the domain?
- Does the concept require explanation?
- Is this a domain concept or a technical concept?
- Is business logic leaking into Presentation?
- Is Application merely coordinating?
- Can this concept be derived from an existing domain artifact?

## Current RetireSmart Concepts

### Core Domain Objects

- PersonalizedMonthlyRetirementBenefitEstimate
- RetirementBenefitMatrix
- ClaimingAgeBenefitProjection
- ClaimingStrategyAdvantageMatrix

### Current Future Views

#### Claiming Strategy Advantage Projection

Answers:

> How does the advantage of delaying benefits evolve over time?

#### Claiming Strategy Comparison

Answers:

> What is the final advantage at a selected life expectancy?

#### Opportunity Cost of Early Claiming

Answers:

> How much money am I giving up by claiming early?

## Decision Framework

When evaluating a new feature, model, service, or analysis:

### 1. Identify the Retirement Planning Question

Start with the question a retiree or retirement planner is trying to answer.

Examples:

- How does the advantage of delaying benefits evolve over time?
- What is the final advantage at my expected life expectancy?
- How much money am I giving up by claiming early?
- Which claiming strategy produces the highest lifetime benefit?

Avoid starting with:

- What calculation should I build?
- What algorithm should I implement?

### 2. Identify the Domain Concept

Determine the retirement-planning concept that answers the question.

Examples:

- RetirementBenefitMatrix
- ClaimingStrategyAdvantageMatrix
- ClaimingStrategyComparison
- OpportunityCostOfEarlyClaiming

Prefer domain concepts over technical concepts.

### 3. Look for Existing Domain Artifacts

Before creating a new calculation, determine whether the insight can be derived from an existing domain artifact.

Preferred approach:

```text
PersonalizedMonthlyRetirementBenefitEstimate
                    ↓
         RetirementBenefitMatrix
                    ↓
      ClaimingStrategyAdvantageMatrix
                    ↓
         ClaimingStrategyComparison
```

Favor derivation over duplication.

### 4. Name the Concept

Select a name that:

- Screams the domain
- Uses retirement-planning language
- Requires minimal explanation
- Describes the purpose rather than the implementation

Prefer:

- ClaimingStrategyAdvantageMatrix

Over:

- BenefitCalculatorResult

### 5. Design the Calculation

Only after the domain concept is understood and named should the calculation be designed.

The calculation exists to support the domain concept, not the other way around.

### 6. Validate Using the Principle of Least Astonishment

Ask:

- Would a retiree understand what this means?
- Would a retirement planner understand why it exists?
- Does the name communicate the purpose?
- Would the feature require significant explanation?

If significant explanation is required, reconsider the domain concept and naming.
