# RetireSmart Architectural Review Report

## Review Scope and Baseline

The governing sources present in the workspace are:

- `docs/architecture/RETIRESMART_DOMAIN_ARCHITECT.md`
- `docs/architecture/DESIGN_PRINCIPLES.md`
- `docs/architecture/UBIQUITIOUS_LANGUAGE.md`
- Related accepted ADRs, especially ADR-004 and ADR-006

The requested `docs/architect.md`, `docs/design-principles.md`, and `docs/ubiquitous-language.md` paths do not exist; the files above are their architecture-directory equivalents.

Validation performed:

- `npm run build`: passes
- `npm run test:run`: 20 pass, 5 fail

## Executive Summary

The workspace has a sensible high-level layer separation, and the domain calculation is isolated in a domain service. The most important findings are:

1. The suite is currently red because application and validator tests use incomplete `Complete Claiming Age Estimate Set` fixtures, while the validator requires all ages 62 through 70.
2. The cross-estimate monthly-benefit monotonicity business rule is implemented only in the Application validator, rather than as a reusable Domain rule predicate.
3. Core domain concepts are not modeled strongly enough: JavaScript `number` and `Record<number, ...>` types do not distinguish claiming age, projection age, and benefit amounts or enforce the complete estimate set.
4. Application tests duplicate detailed validation and domain-calculation scenarios.
5. Presentation hardcodes the 62-through-70 claiming-age range and repeats nine nearly identical inputs.
6. Rule tests, validator tests, and application tests overlap around invalid benefit amounts and projection ages.

No changes have been made. The report below distinguishes confirmed findings from simplification opportunities.

## Findings

### Critical 1: Current request fixtures contradict the `Complete Claiming Age Estimate Set` invariant

**Evidence**

- `GenerateRetirementBenefitMatrixRequestValidator.ts` requires exactly nine estimates, ages 62 through 70.
- `GenerateRetirementBenefitMatrixRequestValidator.test.ts` accepts tests with only ages 62 and 63, and also tests only age 62 as successful.
- `GenerateRetirementBenefitMatrix.test.ts` uses one-estimate and two-estimate requests for successful responses.
- A baseline test run has five failures caused by these fixtures.

**Why it is an issue**
The tests describe and expect successful behavior for requests that the documented domain concept says are incomplete. This destroys confidence in the suite and also demonstrates inconsistent interpretation of the `Complete Claiming Age Estimate Set`.

**Governance**

- Ubiquitous Language: `Complete Claiming Age Estimate Set`
- Domain Architect: explicit domain concepts and validation of existing artifacts
- ADR-006: accuracy and trustworthy deterministic tests

**Proposed change**
Create one shared valid-estimate factory or domain fixture builder, and use complete 62-through-70 arrays in every success case:

```ts
export function createCompleteEstimateSet(
  monthlyBenefitAmounts: readonly number[] = [
    2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800,
  ],
): PersonalizedMonthlyRetirementBenefitEstimate[] {
  return monthlyBenefitAmounts.map((monthlyBenefitAmount, index) => ({
    age: MINIMUM_CLAIMING_AGE + index,
    monthlyBenefitAmount,
  }));
}
```

Keep malformed requests in validator tests and use service tests only for successful orchestration and invalid-to-failure response mapping.

**Estimated improvement**

- Maintainability: High
- Domain clarity: High
- Testability: High
- Ubiquitous Language alignment: High

### Critical 2: The suite is red and test expectations hide the validator/service contract mismatch

**Evidence**

- Five Vitest tests fail.
- Three are validator tests expecting incomplete requests to be valid.
- Two are application-service tests expecting matrix responses from incomplete requests.

**Why it is an issue**
This is more than stale test data: it is evidence that Application tests, Validator tests, and the domain's documented complete-set requirement do not agree. Deliverables cannot be considered verified while the suite is red.

**Governance**

- ADR-006 testing priority and mutation testing
- Design Principles: testability and domain responsibilities

**Proposed change**
Correct fixtures first and rerun targeted test files. If invalid-request behavior is intentionally meant to allow partial sets for future API flexibility, then update the governing `Complete Claiming Age Estimate Set` requirement and the validator together. The latter should not be inferred without an explicit domain decision.

**Estimated improvement**

- Maintainability: High
- Domain clarity: High
- Testability: Critical
- Ubiquitous Language alignment: High

### Recommended 3: Monotonic benefit amounts are a Domain rule implemented only in the Application validator

**Evidence**
The cross-estimate check in `GenerateRetirementBenefitMatrixRequestValidator.ts` directly compares adjacent monthly benefit amounts. `BenefitRules.ts` has only range and projection-age predicates.

**Why it is an issue**
The rule is reusable retirement-planning business behavior, not merely an HTTP/request shape concern. Keeping it only in the validator makes it harder to reuse in other use cases and weakens the Domain as the authoritative source.

**Governance**

- Design Principles sections 6 and 7
- ADR-004
- Ubiquitous Language: Domain responsibilities

**Proposed change**
Move the reusable predicate to Domain rules:

```ts
export function areMonthlyBenefitAmountsIncreasing(
  estimates: readonly PersonalizedMonthlyRetirementBenefitEstimate[],
): boolean {
  return estimates.every(
    (estimate, index) =>
      index === 0 ||
      estimate.monthlyBenefitAmount >=
        estimates[index - 1].monthlyBenefitAmount,
  );
}
```

The validator should call this predicate and remain responsible for producing use-case-specific error text and aggregating errors.

**Estimated improvement**

- Maintainability: High
- Domain clarity: High
- Testability: High
- Ubiquitous Language alignment: High

### Recommended 4: Request and domain models are not strong enough to represent the core concepts

**Evidence**

- `Age`, `MonthlyBenefitAmount`, and `CumulativeBenefitAmount` are aliases of `number`.
- `ClaimingAgeBenefits` is `Record<Age, ClaimingAgeBenefitProjection>`.
- `GenerateRetirementBenefitMatrixRequest.estimates` is `Personalized...[]`.
- `tsconfig.app.json` does not enable strict TypeScript checking.

**Why it is an issue**
The type system cannot prevent a projection age, claiming age, and unrelated number from being accidentally exchanged. An array also cannot express the documented exact 62-through-70 complete set, while a general record can contain arbitrary ages.

**Governance**

- Design Principles section 10: explicit domain models
- Domain Architect: domain-first, explicit concepts
- ADR-002 TypeScript

**Proposed change**
Add a first-class complete-set model and distinguish domain quantities:

```ts
export type ClaimingAge = number & { readonly __claimingAge: unique symbol };
export type ProjectionAge = number & { readonly __projectionAge: unique symbol };
export type MonthlyBenefitAmount =
  number & { readonly __monthlyBenefitAmount: unique symbol };
export interface CompleteClaimingAgeEstimateSet {
  readonly estimates:
    readonly [/* age 62 estimate */ ... /* age 70 estimate */];
}
```

At minimum, introduce named interfaces for `ClaimingAgeBenefitProjection` and a complete estimate set rather than passing an unstructured array. Enable TypeScript `strict`; if full brands are too large for the current phase, start with the complete-set interface and the named domain quantity types.

**Estimated improvement**

- Maintainability: High
- Domain clarity: High
- Testability: Medium
- Ubiquitous Language alignment: High

### Recommended 5: Application Service tests duplicate detailed validation and calculation behavior

**Evidence**
`GenerateRetirementBenefitMatrix.test.ts` repeats:

- Invalid monthly-benefit amount behavior
- Invalid projection age behavior
- Invalid monotonic estimates behavior
- Expected matrix values and projection definitions

The application test should mainly prove orchestration and response mapping.

**Why it is an issue**
Detailed assertions belong at the layer that owns the behavior. Repeating them creates many reasons to update tests and makes mutation-test and diagnosis effort less focused.

**Governance**

- ADR-006 test responsibility boundaries
- Design Principles: application orchestration
- Domain Architect: application coordinates domain behavior

**Proposed change**
Keep in Application tests:

- Valid request returns a success response containing the domain matrix.
- Invalid request returns `isSuccessful: false` and validation errors.
- Domain-service collaboration is delegated and not reimplemented.

Move:

- Cumulative-benefit matrix values to domain service tests.
- Range, monotonicity, complete-set, and projection-age rules to rule/validator tests.

**Estimated improvement**

- Maintainability: High
- Domain clarity: Medium
- Testability: High
- Ubiquitous Language alignment: Medium

### Recommended 6: Validator tests are too coupled to implementation constants and some success cases are not complete

**Evidence**
The validator tests contain boundary cases that duplicate rule tests and use incomplete estimates in otherwise successful scenarios.

**Why it is an issue**
Tests should verify validator responsibilities: complete-set structure, age sequence, cross-estimate rule, and error aggregation. Boundaries of individual predicates belong in rule tests. Incomplete fixtures make a "valid" result impossible under the documented contract.

**Governance**

- ADR-006
- Design Principles section 7
- Ubiquitous Language: one concept/one name

**Proposed change**
For validator tests, use complete valid fixtures and change one field per invalid case. Keep only:

- Range boundaries in `BenefitRules.test.ts`.
- Complete-set and age-sequence tests in validator tests.
- Monotonicity tests in rule tests and one validator aggregation test.

**Estimated improvement**

- Maintainability: High
- Domain clarity: Medium
- Testability: High
- Ubiquitous Language alignment: Medium

### Recommended 7: Presentation repeats and hardcodes the claiming-age range

**Evidence**
`BenefitInputForm.tsx`:

- Repeats nine field blocks manually.
- Uses numeric literals 62 through 70 in loops and keys.
- Imports a Domain rule constant for the default analysis end age.
- Imports application request and domain estimate types to construct request state.

**Why it is an issue**
The claiming-age range and complete set are domain constants, but they are duplicated in presentation. Adding/removing a supported claiming age would require coordinated changes in Domain rules, validator, and JSX. Presentation also owns construction of a domain-shaped request rather than merely rendering and forwarding raw interaction values.

**Governance**

- Screaming Domain and Ubiquitous Language
- Design Principles sections 5 and 6
- Clean Architecture boundaries

**Proposed change**
Render one field block by mapping a shared claiming-age list. Use a complete-estimate-set factory in Application or Domain and keep presentation focused on collecting strings. Import shared constants rather than repeating literals.

```tsx
{
  CLAIMING_AGES.map((age) => (
    <label key={age} htmlFor={`benefit-${age}`}>
      Monthly Benefit at Age {age}:&nbsp;
      <input
        id={`benefit-${age}`}
        type="number"
        value={benefitAmounts[age]}
        onChange={(event) =>
          setBenefitAmounts((current) => ({
            ...current,
            [age]: event.target.value,
          }))
        }
      />
    </label>
  ));
}
```

This is a maintainability refactor; it should not move business calculation into the component.

**Estimated improvement**

- Maintainability: High
- Domain clarity: High
- Testability: Medium
- Ubiquitous Language alignment: High

### Recommended 8: Domain rules mix policy constants with UI defaults and ambiguous names

**Evidence**
`DEFAULT_ANALYSIS_END_AGE = 90` is in `BenefitRules.ts`, while Presentation imports it. The file combines:

- Benefit bounds
- Claiming-age bounds
- A presentation default
- Predicate functions

**Why it is an issue**
A UI default is not a reusable Domain rule. `BenefitRules.ts` is less cohesive than a domain-rule module. It may become a grab-bag for unrelated application or presentation policies.

**Governance**

- Clean Architecture responsibilities
- Domain Architect: domain concepts before calculations
- Design Principles: cohesion and explicit responsibility

**Proposed change**
Move `DEFAULT_ANALYSIS_END_AGE` to presentation configuration or an application request default. Keep age and benefit range constants in Domain models/rules. Rename generic module members to domain concepts where useful, for example `isProjectionEndAgeValid` to a projection-age rule that explicitly validates `ProjectionAge`.

**Estimated improvement**

- Maintainability: High
- Domain clarity: High
- Testability: High
- Ubiquitous Language alignment: Medium

### Recommended 9: Domain Service test description uses a concept absent from the governed language

**Evidence**
`describe('RetirementAnalysisMatrixCalculator', ...)` does not match `RetirementBenefitMatrixCalculator` or the governed `RetirementBenefitMatrix`.

**Why it is an issue**
This is an additional name for the same concept and makes test output less searchable and less consistent with the ubiquitous language.

**Governance**

- Ubiquitous Language: one concept/one name
- Design Principles: preserve ubiquitous language

**Proposed change**
Rename the test suite:

```ts
describe('calculateRetirementBenefitMatrix', () => {
  // ...
});
```

**Estimated improvement**

- Maintainability: Medium
- Domain clarity: High
- Testability: Medium
- Ubiquitous Language alignment: High

### Optional 10: Domain calculator tests contain overlapping scenarios

**Evidence**
The first four tests separately verify ages 62, 63, 64, and 65 cumulative values. Several additional tests overlap same projections and independent projections.

**Why it is an issue**
The test suite is not inherently wrong, but multiple near-identical arrangements reduce readability and mutation-test signal.

**Governance**

- ADR-006 mutation-testing effectiveness
- Avoid unnecessary duplication

**Proposed change**
Use table-driven tests for selected known projections and one full-matrix golden example:

```ts
it.each([
  [62, 18000],
  [63, 36000],
  [64, 54000],
  [65, 72000],
])('projects ... through age %i', (age, expected) => {
  // Known inputs and one projection assertion
});
```

Retain separate tests for independent estimates and not projecting beyond the end age.

**Estimated improvement**

- Maintainability: High
- Domain clarity: Medium
- Testability: High
- Ubiquitous Language alignment: Low

### Optional 11: Misleading test names

**Evidence**
Application tests named `throws when ...` do not throw; they return failure responses.

**Why it is an issue**
The name describes the wrong observable behavior and can slow diagnosis.

**Governance**

- Principle of Least Astonishment
- Test responsibility clarity

**Proposed change**
Rename to:

- `returns a failure response when retirement benefit estimates are invalid`
- `returns a failure response when projection end age is below the minimum claiming age`
- `returns a failure response when a monthly benefit amount is invalid`

**Estimated improvement**

- Maintainability: Medium
- Domain clarity: Medium
- Testability: Medium
- Ubiquitous Language alignment: Medium

### Optional 12: Presentation test coverage is absent

**Evidence**
No React presentation tests are present. The only test suites cover rules, domain service, validator, and application service.

**Why it is an issue**
The project can regress user interactions and result/error rendering without component-level coverage. ADR-006 anticipates limited component tests for critical rendering and interactions.

**Governance**

- ADR-006 UI testing and integration testing
- Presentation responsibilities

**Proposed change**
Add small tests only for:

- Submitting a complete set from the form.
- Rendering validation errors.
- Rendering a matrix and clearing stale state on failure.

Do not assert cumulative benefit arithmetic in React tests.

**Estimated improvement**

- Maintainability: Medium
- Domain clarity: Low
- Testability: High
- Ubiquitous Language alignment: Low

## Confirmed Clean Areas

- `RetirementBenefitMatrixCalculator.ts` contains calculation behavior and no request-validation logic.
- `GenerateRetirementBenefitMatrix.ts` delegates validation and calculation, and does not perform calculation itself.
- `BenefitRules.ts` contains reusable range predicates, even though more domain rules can be extracted.
- The validator calls domain predicates instead of duplicating range arithmetic.
- Presentation components do not implement cumulative-benefit calculations.
- Domain and application responsibilities are broadly separated.
- No obvious unreachable or dead exported symbol was found in the targeted source.

## Prioritized Implementation Sequence

1. Correct and share complete 62-through-70 test request fixtures.
2. Restore a passing baseline and verify the validator contract.
3. Extract monotonicity and complete-estimate-set rules into Domain models/rules.
4. Strengthen TypeScript types and enable strict checking.
5. Reduce application test overlap and rename misleading test cases.
6. Simplify presentation fields and remove duplicated claiming-age literals.
7. Add focused presentation tests and optional table-driven domain test cleanup.
