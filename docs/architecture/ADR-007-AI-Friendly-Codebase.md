# ADR-007: AI-Friendly Codebase

## Status

Accepted

## Context

RetireSmart is intended to be maintained and extended by both human developers and AI-assisted development tools.

Modern software development increasingly includes AI agents that generate, refactor, review, and explain code. Codebases that are difficult for humans to understand are often difficult for AI systems to reason about accurately.

The project aims to promote practices that improve maintainability, readability, and extensibility for all contributors.

## Decision

RetireSmart shall favor simple, explicit, and well-structured code over clever or highly condensed implementations.

Architecture, code organization, naming, and testing practices should support both human comprehension and AI-assisted development.

## Principles

### Meaningful Names

Variables, functions, classes, files, and folders should use descriptive names that communicate intent.

Prefer:

```text
calculateBreakEvenAge
```

over:

```text
calcAge
```

### Small Functions

Functions should perform a single responsibility and be kept reasonably small.

Functions should read like business rules and tell a clear story.

### Separation of Concerns

User interface behavior, business logic, infrastructure concerns, and test code should remain clearly separated.

Business rules should be implemented in services whenever practical.

### Explicit Types

TypeScript types and interfaces should model the business domain clearly.

Avoid use of the `any` type unless there is a compelling justification.

### Consistent Project Structure

Files should be organized according to responsibility.

Example:

```text
src/
  components/
  services/
  types/
  tests/
```

### Automated Tests

Tests should document expected behavior and provide confidence during refactoring.

Business rules should have automated tests whenever practical.

### Architecture Documentation

Architectural decisions should be documented using:

- ADRs
- C4 diagrams
- Requirements documentation

Documentation should evolve alongside the codebase.

## Consequences

### Positive

- Easier onboarding for developers
- Easier AI-assisted maintenance
- Improved code readability
- Improved refactoring confidence
- Reduced architectural drift
- Better long-term maintainability

### Negative

- Requires discipline and consistency
- May occasionally favor clarity over brevity

## Notes

Code should be optimized for understanding first and implementation second.

If a developer or AI agent cannot easily determine the purpose of a component, service, function, or test, the design should be reconsidered.
