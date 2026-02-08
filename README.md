# Resource Demo – Angular Standalone + NgRx

This project is a small, focused Angular application that demonstrates a scalable, enterprise-oriented frontend architecture using modern Angular features and NgRx for state management.

The goal of this project is not visual design, but clean structure, clear data flow and maintainable architecture.

---

## Tech Stack

- Angular (Standalone Components & Lazy Routes)
- NgRx (Store, Effects, Selectors, Facade Pattern)
- TypeScript (strict mode)
- OpenAPI-first approach (generated API types)
- Mock Backend via HTTP Interceptor
- RxJS
- SCSS

---

## Application Overview

The application consists of a single feature: **Resources**.

It provides:
- A resource list view
- A resource detail view
- Mocked backend communication
- Centralized state management

Routing, state and side effects are fully decoupled from UI components.

---

## Architecture

### Feature-first Structure

features/resources/
- api  
  - resources.api.ts  
- +state  
  - resources.actions.ts  
  - resources.reducer.ts  
  - resources.selectors.ts  
  - resources.models.ts
  - resources.effects.ts  
  - resources.facade.ts  
  - resources.vm.ts  
- pages  
  - resource-list  
  - resource-detail  
- resources.routes.ts  

---

### Key Architectural Decisions

- **Standalone Components and Lazy Routes**  
  Each feature registers its own state and effects at route level.

- **NgRx with Facade Pattern**  
  Components interact only with facades, not directly with the store.

- **Clear Separation of Concerns**
  - api: API communication  
  - +state: state, side effects, selectors and view models  
  - pages: UI-only components  

- **ViewModel Selectors**  
  Pages consume typed view models instead of multiple individual selectors.

---

## State Management

NgRx is used to provide:
- Predictable state transitions
- Centralized side-effect handling
- Explicit data flow (Action → Effect → Reducer → Selector)

Components are intentionally kept simple:
- No business logic
- No manual subscriptions
- Only dispatching actions and consuming observables

---

## OpenAPI Integration

The project follows an OpenAPI-first approach.

- API types are generated automatically from an OpenAPI JSON specification
- Generated files are excluded from linting and treated as read-only artifacts

This ensures type safety while keeping generated code clean and CI-friendly.

---

## Build & Tooling

A single build script orchestrates all relevant steps:

- dependency installation
- OpenAPI type generation
- post-processing of generated files
- linting
- application build

To run the full build pipeline:

npm run build:all

---

## Scalability

If the feature grows, the state can easily be split into dedicated slices, for example:
- entities for normalized resource data
- list for filtering, paging and sorting
- detail for selection, editing and validation

This allows the architecture to scale without increasing complexity in individual files.

---

## Getting Started

Install dependencies and start the application:

npm run build:all  
npm start  

The application will be available at:

http://localhost:4200

---

## Quality and Tooling

- Strict TypeScript configuration
- Strict Angular template checks
- Consistent naming and folder structure
- Linting and formatting enabled
- Automated handling of generated code

---

## Notes

UI styling is intentionally kept minimal to focus on:
- architecture
- maintainability
- state management
- developer experience

---

## Author

M.R.  
Senior Software Engineer – Frontend / Fullstack
