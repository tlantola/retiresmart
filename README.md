# RetireSmart

RetireSmart is a retirement planning application focused on helping individuals evaluate Social Security claiming strategies through break\-even analysis and long\-term benefit modeling.

The application is designed to provide clear, data\-driven insights into the financial impact of claiming Social Security benefits at different ages, enabling more informed retirement planning decisions.

## Vision

RetireSmart aims to make retirement planning more accessible by transforming complex Social Security scenarios into understandable financial projections and comparisons.

Key objectives include:

- Social Security break\-even analysis
- Lifetime benefit projections
- Claiming age comparisons
- Retirement income planning insights
- Interactive visualization of retirement outcomes

## Features

### Current

- Social Security benefit input and validation
- Core benefit modeling domain
- Cumulative benefit calculations
- Automated unit testing
- Architecture Decision Records (ADRs)
- Layered application architecture

### Planned

- Break\-even age analysis
- Scenario comparison
- Retirement planning dashboard
- Interactive charts and visualizations
- Historical and projected benefit analysis
- Cloud deployment and continuous delivery

## Architecture

RetireSmart follows a separation of concerns between the user interface, application services, and business domain.

React UI

    ↓

Application Services

    ↓

Domain Model

Business rules and calculations are implemented within the domain layer to ensure consistency, testability, and maintainability.

Architectural decisions are documented using Architecture Decision Records (ADRs).

## Technology Stack

### Frontend

- React
- TypeScript
- Vite

### Testing

- Vitest
- React Testing Library
- JSDOM

### Quality

- ESLint
- TypeScript strict typing

## Project Structure

src/

├── components/

├── domain/

├── services/

├── types/

└── tests/

## Development

Install dependencies:

npm install

Run locally:

npm run dev

Run tests:

npm run test:run

Generate coverage:

npm run test:coverage

Run linting:

npm run lint

Create a production build:

npm run build

## Project Status

Active development.
