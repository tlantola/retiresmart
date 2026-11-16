# ADR\-005: Defer Backend\-for\-Frontend (BFF)

## Status

Accepted

## Context

The initial release of RetireSmart performs all calculations locally within the browser and does not require server\-side orchestration.

## Decision

Do not introduce a Backend\-for\-Frontend layer in the initial architecture.

Business calculations will execute entirely within the client application.

## Consequences

### Positive

- Simpler architecture
- Reduced hosting costs
- Easier local development
- Fewer deployment artifacts
- Faster learning of React and TypeScript fundamentals

### Negative

- Future integrations may require architectural changes
- Calculation logic cannot be shared across multiple applications without extraction

## Reconsideration Criteria

A BFF should be evaluated if RetireSmart introduces:

- User authentication
- Persistent profile storage
- Multiple backend services
- External data providers
- Shared API consumers
