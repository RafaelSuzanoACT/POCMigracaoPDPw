<!--
Sync Impact Report (Version 1.0.0):
===========================================
Version change: Initial → 1.0.0
Modified principles: N/A (initial creation)
Added sections:
  - Core Principles (7 principles)
  - Quality Standards
  - Development Workflow
  - Governance

Templates requiring updates:
  ✅ spec-template.md - Aligned (user stories prioritization matches constitution)
  ✅ plan-template.md - Aligned (constitution check section ready)
  ✅ tasks-template.md - Aligned (task categorization by user story)

Follow-up TODOs: None
===========================================
-->

# PDPw Migration Project Constitution

## Core Principles

### I. Domain-Driven Language (NON-NEGOTIABLE)

All code MUST use the ubiquitous language of the PDP domain. This is non-negotiable to ensure clarity and maintainability.

**Rules:**
- Use Portuguese terms from the PDP domain: ProgramacaoEnergetica, DadosHidraulicos, DadosTermicos, OfertaExportacao, ComentarioDESSEM, Agente, Insumos, DESSEM
- Avoid generic terms like Manager, Helper, Utils in domain contexts
- API endpoints, database tables, and UI labels must reflect domain terminology
- Every class, method, and component name must be immediately understandable to domain experts

**Rationale:** The PDPw system serves a highly specialized domain (daily production scheduling for the Brazilian electric sector). Using consistent domain language reduces cognitive load, prevents miscommunication, and makes the codebase accessible to domain experts.

---

### II. Test Coverage Mandate (NON-NEGOTIABLE)

Every migrated page and feature MUST achieve 100% test coverage before being considered complete.

**Rules:**
- All components must have unit tests (React Testing Library + Vitest/Jest)
- All service layers must have unit tests with mocked dependencies
- Test execution command: `npm test` or `npx vitest run tests` (frontend)
- Tests must verify: rendering, user interactions, state changes, error handling
- Tests must be written FIRST, fail, then implementation proceeds (TDD when feasible)

**Rationale:** The PDPw system is critical infrastructure for Brazil's national electric system operator (ONS). Any regression could impact daily energy production scheduling. 100% coverage ensures confidence during migration and future maintenance.

---

### III. Visual Identity Preservation with UX Enhancement

The new React interface MUST maintain the visual identity of the legacy WebForms system while improving usability where clearly beneficial.

**Rules:**
- Colors, fonts, and layout structure should closely match the legacy system
- Component-level improvements are allowed: better spacing, clearer feedback, smoother interactions
- Any significant visual deviation requires explicit justification and approval
- User familiarity is paramount; operators should feel at home immediately

**Rationale:** PDPw operators are accustomed to the existing interface. Dramatic changes increase training time and risk of operational errors. Incremental UX improvements maintain efficiency while modernizing.

---

### IV. Accessibility and Responsiveness

All migrated pages MUST meet minimum WCAG accessibility standards and be fully responsive across desktop, tablet, and mobile devices.

**Rules:**
- All interactive elements must have unique `data-testid` attributes (format: `{component}-{element}-{index?}`)
- Forms must have proper labels and ARIA attributes
- Keyboard navigation must be fully functional
- Responsive breakpoints: mobile (<768px), tablet (768px-1024px), desktop (>1024px)
- Follow checklist in `.github/CHECKLIST_MIGRACAO.md`

**Rationale:** Modern applications must be accessible to all users and usable on various devices. This ensures compliance and future-proofs the system for evolving user needs.

---

### V. Layered Architecture (Clean Separation)

The frontend must maintain clear separation between UI components, data fetching logic, and API communication.

**Rules:**
- **UI Layer**: Functional React components with hooks, focused on presentation
- **Data Layer**: React Query hooks for data fetching, caching, and synchronization
- **Service Layer**: API client services (e.g., `services/energeticService.ts`) handling HTTP communication
- No direct API calls from components; always use service layer + hooks
- No business logic in components; components orchestrate hooks and render UI

**Rationale:** Separation of concerns improves testability, maintainability, and allows independent evolution of layers. It also facilitates mocking during tests.

---

### VI. Incremental Migration by Feature Priority

Migration must proceed in small, prioritized increments (1-3 day cycles) focusing on critical routines first.

**Rules:**
- Prioritize based on `.github/ANALISE_ROTINAS_CRITICAS.md` and `.github/PLANO_TAREFAS_BACKEND.md`
- Each feature or page must have: specification (spec.md), plan (plan.md), and tasks (tasks.md) in Spec Kit
- Critical routines (e.g., Programação Energética, Geração de Arquivos, Finalização) have maximum priority
- Each increment must be independently deployable and testable
- Work in feature branches; integrate via Pull Requests to `develop` branch

**Rationale:** Incremental delivery reduces risk, enables early feedback, and maintains momentum. Prioritization ensures the most critical functionality is migrated first, maximizing value delivery.

---

### VII. Design System Consistency

All components must use the PDPW design system/theme consistently.

**Rules:**
- Use CSS Modules for component styling to ensure isolation
- Shared styles and theme variables must be centralized
- Reusable UI components (buttons, forms, tables) must be extracted to `components/` directory
- Visual consistency across all pages is mandatory

**Rationale:** A consistent design system improves user experience, speeds up development (reusable components), and simplifies maintenance.

---

## Quality Standards

### Code Quality

**React/TypeScript:**
- Use functional components with hooks exclusively
- TypeScript is strongly recommended; JavaScript with JSDoc types is acceptable if necessary
- Components must be small and focused (single responsibility)
- Props must be typed with interfaces
- Use `const` for components and hooks; avoid `function` declarations

**Testing:**
- Prioritize React Testing Library for component tests
- Use Vitest (current setup) or Jest for test execution
- Mock external dependencies (API calls, localStorage, etc.)
- Test user behavior, not implementation details
- Integration tests are required when components interact with multiple services

**Naming Conventions:**
- Components: PascalCase (e.g., `DadosHidraulicosForm.tsx`)
- Custom hooks: `use` prefix (e.g., `useDadosHidraulicos`)
- Utility functions: camelCase (e.g., `formatDate`)
- CSS Modules: kebab-case (e.g., `dados-hidraulicos.module.css`)

### Documentation

- Every component with complex logic must have a JSDoc comment explaining its purpose
- Service functions must document parameters, return types, and error conditions
- README files must be updated when project structure changes
- Critical business rules discovered during migration must be documented in the relevant spec files

---

## Development Workflow

### Feature Development Cycle

1. **Specification Phase:**
   - Analyze legacy code in `legado/` directory (read-only reference)
   - Create feature specification using `.specify/templates/spec-template.md`
   - Define user stories with priorities (P1, P2, P3...)
   - Get approval before proceeding

2. **Planning Phase:**
   - Create implementation plan using `.specify/templates/plan-template.md`
   - Define technical approach, dependencies, and structure
   - Run constitution check
   - Identify data models and API contracts

3. **Task Breakdown:**
   - Generate tasks using `.specify/templates/tasks-template.md`
   - Organize tasks by user story (enables independent delivery)
   - Mark parallel tasks with [P]

4. **Implementation:**
   - Create feature branch from `develop`
   - Write tests first (TDD)
   - Implement functionality to pass tests
   - Ensure all checklist items from `.github/CHECKLIST_MIGRACAO.md` are met
   - Self-review before PR

5. **Review and Integration:**
   - Create Pull Request to `develop`
   - Code review by peers
   - Run automated tests
   - Merge upon approval

### Commit Standards

Use conventional commit format:

```
<type>(<scope>): <message>

Types: feat, fix, refactor, test, docs, style, chore
Scopes: component name, feature area, or domain entity

Examples:
- feat(dados-hidraulicos): implement hydraulic data collection page
- fix(ofertas): correct export offer validation logic
- test(energetica): add unit tests for energetic service
- docs(constitution): update quality standards
```

### Branch Strategy

- `main`: Production-ready code
- `develop`: Integration branch for features
- `feature/###-feature-name`: Individual features
- `bugfix/###-bug-description`: Bug fixes
- `hotfix/###-critical-fix`: Emergency production fixes

---

## Governance

### Constitution Authority

This constitution supersedes all other development practices and guidelines. In case of conflict, this document takes precedence.

### Amendment Process

1. Propose amendment with clear rationale
2. Document impact on existing codebase
3. Update affected templates in `.specify/templates/`
4. Increment version following semantic versioning:
   - **MAJOR**: Backward-incompatible principle removal or redefinition
   - **MINOR**: New principle/section added or material expansion
   - **PATCH**: Clarifications, wording fixes, non-semantic refinements
5. Update Sync Impact Report (HTML comment at top of this file)
6. Get team approval before adoption

### Compliance Review

- All Pull Requests must be checked against constitution principles
- Spec Kit workflows (`.specify/templates/`) must align with constitution
- Periodic reviews (monthly) to ensure ongoing compliance
- Violations must be justified in PR description or rejected

### Runtime Guidance

For detailed day-to-day development guidance, refer to `.github/copilot-instructions.md`. That file provides tactical implementation guidance; this constitution provides strategic principles.

---

**Version**: 1.0.0 | **Ratified**: 2025-12-28 | **Last Amended**: 2025-12-28
