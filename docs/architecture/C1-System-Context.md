# C1 - System Context

## Purpose

The purpose of RetireSmart is to help individuals evaluate Social Security claiming strategies and understand the long-term financial impact of claiming benefits at different ages.

## Actors

### User

A person planning retirement who wishes to compare Social Security claiming scenarios.

## System

### RetireSmart

A web application that allows users to:

- Enter estimated Social Security benefits for ages 62 through 70
- Compare cumulative benefits over time
- Identify break-even ages
- Evaluate the impact of delaying benefits

## Diagram

```text
+----------------------+
|        User          |
|                      |
| Retirement Planner   |
+----------+-----------+
           |
           |
           v
+----------------------+
|     RetireSmart      |
|                      |
| Social Security      |
| Analysis and         |
| Planning Tool        |
+----------------------+
```

## Notes

Version 1 of RetireSmart operates as a standalone application.

There are currently no external systems, databases, authentication providers, or third-party integrations.

Future versions may integrate with:

- Azure AD Authentication
- Azure Storage
- Azure Functions
- External Social Security data sources
