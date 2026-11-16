# ADR\-003: Use Vite

## Status

Accepted

## Context

RetireSmart requires a lightweight development environment that supports React and TypeScript while providing fast feedback during development.

## Decision

Use Vite as the build and development platform.

## Consequences

### Positive

- Fast startup times
- Fast hot module reloading
- Simple configuration
- Excellent React and TypeScript support
- Strong developer experience

### Negative

- Additional tooling concepts to learn
- Occasional ecosystem changes requiring upgrades

## Notes

The project was initialized using the React \+ TypeScript Vite template.

Future tooling decisions should integrate cleanly with the Vite ecosystem whenever possible.
