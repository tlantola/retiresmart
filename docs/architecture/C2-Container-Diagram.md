# C2 - Container Diagram

## Purpose

Shows the major deployable units that make up RetireSmart.

## Current Architecture

```text
+------------------------------------------------+
|                 RetireSmart                    |
+------------------------------------------------+
|                                                |
|  React Single Page Application                 |
|  Technology: React + TypeScript + Vite         |
|                                                |
|  Responsibilities:                             |
|  - Collect user input                          |
|  - Display calculations                        |
|  - Render charts and reports                   |
|  - Host calculation engine                     |
|                                                |
+------------------------------------------------+
```

## Notes

Version 1 contains a single container.

All calculations execute within the browser.

No server-side components currently exist.

## Future Evolution

Potential future containers:

- Azure Static Web App
- Azure Function API
- Azure Storage
- Containerized Calculation Service
