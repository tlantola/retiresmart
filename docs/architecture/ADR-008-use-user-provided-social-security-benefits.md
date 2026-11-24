# ADR\-008: Use User\-Provided Social Security Benefit Amounts

## Status

Accepted

## Context

RetireSmart originally explored deriving claiming\-age benefit amounts from a user's Full Retirement Age (FRA) benefit using estimated reduction and increase factors.

For example:

- Age 62 = FRA benefit × reduction factor
- Age 70 = FRA benefit × delayed retirement credit factor

This approach requires RetireSmart to model Social Security benefit rules, retirement credits, and claiming reductions.

During design and testing, it became clear that users already have access to claim\-age\-specific benefit amounts through their Social Security Statement, which provides projected retirement benefits for each claiming age from 62 through 70.

The goal of RetireSmart is to analyze claiming strategies, not to estimate Social Security benefits.

## Decision

RetireSmart will require users to enter the monthly benefit amount for each claiming age from 62 through 70, as reported by the Social Security Administration.

The application will not calculate or estimate benefit amounts based on an FRA benefit.

Example input:

| Claiming Age | Monthly Benefit |
| ------------ | --------------- |
| 62           | User\-provided  |
| 63           | User\-provided  |
| 64           | User\-provided  |
| 65           | User\-provided  |
| 66           | User\-provided  |
| 67           | User\-provided  |
| 68           | User\-provided  |
| 69           | User\-provided  |
| 70           | User\-provided  |

RetireSmart will use these values as the authoritative source for retirement benefit analysis.

## Consequences

### Positive

- Uses actual SSA\-provided values instead of estimates.
- Eliminates maintenance of Social Security reduction and credit formulas.
- Avoids inaccuracies caused by future Social Security rule changes.
- Simplifies domain logic.
- Focuses RetireSmart on retirement analysis rather than benefit estimation.
- Allows users to compare claiming strategies using their actual projected benefits.

### Negative

- Requires users to manually enter multiple values.
- Users must obtain benefit information from their Social Security Statement before using the application.

## Future Direction

RetireSmart will generate a Retirement Benefit Matrix using the user-provided monthly benefit amounts for ages 62 through 70.

The Retirement Benefit Matrix will serve as the primary domain result:

- Break\-even analysis
- Lifetime benefit comparisons
- Optimal claiming\-age recommendations
- Future reporting and visualization features

The application will determine the optimal claiming age for a user\-defined expected lifespan by identifying the strategy that produces the highest cumulative lifetime benefit at the selected age.
