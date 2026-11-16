# C3 - Component Diagram

## Purpose

Shows the major software components within the RetireSmart application.

## Diagram

```text
+-------------------------+
|         App             |
+-----------+-------------+
            |
            |
            v

+-------------------------+
| Benefit Entry Form      |
+-----------+-------------+
            |
            |
            v

+-------------------------+
| Social Security         |
| Calculator Service      |
+-----------+-------------+
            |
            |
            +-----------------+
            |                 |
            v                 v

+----------------+   +------------------+
| Results Table  |   | Break-Even       |
|                |   | Analysis         |
+----------------+   +------------------+
```

## Responsibilities

### App

Application composition and routing.

### Benefit Entry Form

Collects Social Security estimates from the user.

### Social Security Calculator Service

Calculates:

- Lifetime benefits
- Break-even ages
- Comparison metrics

### Results Table

Displays calculated benefit data.

### Break-Even Analysis

Displays comparisons and recommendations.
