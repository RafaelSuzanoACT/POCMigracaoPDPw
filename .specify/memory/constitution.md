<!--
Sync Impact Report (Version 1.1.0):
===========================================
Version change: 1.0.0 → 1.1.0 (MINOR - new principle + material expansions)

Modified principles:
  - Principle V (Layered Architecture): Expanded with explicit backend integration rules
  - Principle VI (Incremental Migration): Added backend connection priority guidance

Added sections:
  - Principle VIII: Backend Integration Discipline (NEW - non-negotiable)
  - Quality Standards → Backend Integration Testing (expanded)
  - Development Workflow → Backend Connection Checklist (expanded)

Templates requiring updates:
  ✅ spec-template.md - Already aligned (user stories include backend integration)
  ✅ plan-template.md - Already aligned (architecture section covers service layer)
  ✅ tasks-template.md - Already aligned (Phase 4 covers backend integration tasks)
  ⚠️ RECOMMENDATION: Add "Backend Connection Checklist" section to tasks-template.md

Follow-up TODOs:
  - Ensure all team members review new Principle VIII
  - Update onboarding documentation to highlight backend-first constraints
  - Consider creating a quick reference card for service layer patterns

Rationale for MINOR bump:
  - No breaking changes to existing principles
  - New Principle VIII adds material guidance without invalidating prior work
  - Expanded sections provide clarity without contradicting existing rules
  - All 34 migrated pages remain compliant (they already follow layered architecture)
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

**Rules:** Backend APIs are already developed and contracts are fixed.

**Rules:**
- **UI Layer**: Functional React components with hooks, focused on presentation
  - Components MUST NOT contain business logic or data transformations
  - Components MUST NOT make direct API calls (use hooks only)
  - Components orchestrate hooks and render UI based on data/state
- **Data Layer**: React Query hooks for data fetching, caching, and synchronization
  - Hooks MUST use service layer functions (never direct fetch/axios calls)
  - Hooks handle loading states, error states, and cache invalidation
  - Query hooks for reads (e.g., `useEnergeticData`), mutation hooks for writes (e.g., `useSaveEnergetic`)
- **Service Layer**: API client services (e.g., `services/energeticService.ts`) handling HTTP communication
  - Services MUST match backend API contracts exactly (no contract changes without backend alignment)
  - Services perform DTO transformations (backend format ↔ frontend format)
  - Services normalize errors into consistent frontend error format
  - Services MUST NOT contain React dependencies (pure TypeScript/JavaScript)
- **Backend Constraint**: Backend is already developed in separate repository (ONS_PoC-PDPW_V2)
  - Frontend MUST adapt to backend contracts, not vice versa
  - Any API contract issues MUST be raised with backend team before frontend changes
  - Service layer is the ONLY place where backend-to-frontend adaptation occurs

**Rationale:** Separation of concerns improves testability, maintainability, and allows independent evolution of layers. The backend-first constraint ensures we don't create impedance mismatches or duplicate business logic in frontend

### V. Layered Architecture (Clean Separation)

The frontend must maintain clear separation between UI components, data fetching logic, and API communication.

**Rules:**
- **UI Layer**: Functional React components with hooks, focused on presentation Backend connection takes priority over new page migration.

**Rules:**
- **Priority 1 (P1)**: Connect already-migrated critical routine pages to backend
  - 7 critical routines identified in `.github/ANALISE_ROTINAS_CRITICAS.md`
  - These pages are already migrated but using mock data
  - Backend connection MUST precede migration of new pages
- **Priority 2 (P2)**: Migrate remaining critical routine pages (7 pages) + connect to backend
  - Complete frontend for all critical routines
  - Immediate backend integration (no mock data phase)
- **Priority 3 (P3)**: Connect other already-migrated pages to backend (37+ pages)
  - Data collection pages already migrated, waiting for backend integration
- **Priority 4 (P4)**: Migrate remaining pages by module (consultation, admin, reports)
- Each feature or page must have: specification (spec.md), plan (plan.md), and tasks (tasks.md) in Spec Kit
- Each increment must be independently deployable and testable
- Work in feature branches; integrate via Pull Requests to `develop` branch

**Rationale:** Backend connection unlocks production use of already-completed work. Migrating new pages without connecting existing ones creates technical debt. Critical routines must be production-ready before expanding scope
### VI. Incremental Migration by Feature Priority

Migration must proceed in small, prioritized increments (1-3 day cycles) focusing on critical routines first.

**Rules:**
- Prioritize based on `.github/ANALISE_ROTINAS_CRITICAS.md` and `.github/PLANO_TAREFAS_BACKEND.md`
- Each feature or page must have: specification (spec.md), plan (plan.md), and tasks (tasks.md) in Spec Kit
- C

### VIII. Backend Integration Discipline (NON-NEGOTIABLE)

All backend integration must follow strict patterns to ensure reliability, testability, and consistency. Backend APIs are authoritative; frontend adapts.

**Rules:**
- **Service Layer is Mandatory**: Every backend endpoint MUST have a corresponding service function
  - Location: `frontend/src/services/{domain}Service.ts` (e.g., `energeticService.ts`)
  - Pattern: Pure TypeScript functions that return Promises
  - Responsibilities: HTTP calls, DTO transformations, error normalization
  - Example:
    ```typescript
    // frontend/src/services/energeticService.ts
    export async function fetchEnergeticData(date: string, companyId: number): Promise<EnergeticData> {
      const response = await api.get(`/energetic/${date}/${companyId}`);
      return transformBackendToFrontend(response.data);
    }
    ```

**Backend Integration Testing (Mandatory):**
- **Service Layer Tests**: Unit tests for every service function
  - Mock axios/fetch calls using MSW (Mock Service Worker) or vitest mocks
  - Test success scenarios (200 responses, correct DTO transformation)
  - Test error scenarios (404, 500, network errors, validation errors)
  - Test edge cases (empty responses, malformed data, timeout)
  - Example:
    ```typescript
    // frontend/tests/services/energeticService.test.ts
    describe('energeticService', () => {
      it('should fetch and transform energetic data', async () => {
        mockApi.onGet('/energetic/2025-01-01/123').reply(200, mockBackendData);
        const result = await fetchEnergeticData('2025-01-01', 123);
        expect(result).toEqual(expectedFrontendData);
      });
    });
    ```

- **React Query Hook Tests**: Tests for every custom hook
  - Use `@testing-library/react-hooks` or `renderHook` from RTL
  - Test loading state, success state, error state
  - TIdentify backend API endpoints in ONS_PoC-PDPW_V2 repository
   - Create feature specification using `.specify/templates/spec-template.md`
   - Define user stories with priorities (P1, P2, P3...)
   - Get approval before proceeding

2. **Planning Phase:**
   - Create implementation plan using `.specify/templates/plan-template.md`
   - Define technical approach, dependencies, and structure
   - Run constitution check (ensure Principle VIII compliance)
   - Identify data models and API contracts
   - Document service layer and hooks architecture

3. **Task Breakdown:**
   - Generate tasks using `.specify/templates/tasks-template.md`
   - Organize tasks by user story (enables independent delivery)
   - Mark parallel tasks with [P]
   - Include backend integration tasks (service, hooks, tests)

4. **Implementation:**
   - Create feature branch from `develop`
   - **Backend Integration First** (if connecting existing page):
     1. Create service layer functions
     2. Write service layer tests (TDD)
     3. Create React Query hooks
     4. Write hook tests
     5. Connect component to hooks (replace mock data)
     6. Update component tests to mock hooks
     7. Create integration test
   - **New Page Migration** (if migrating from legacy):
     1. Create TypeScript types
     2. Create component (use hooks from start, no mock data phase)
     3. Create service layer + tests
     4. Create hooks + tests
     5. Connect component + tests
   - Ensure all checklist items from `.github/CHECKLIST_MIGRACAO.md` and Principle VIII Backend Connection Checklist are met
   - Self-review before PR

5. **Review and Integration:**
   - Create Pull Request to `develop`
   - PR description MUST include:
     - Backend endpoints used
     - Service layer pattern used
     - Test coverage report (must be 100%)
     - Screenshots/videos of success and error states
   - Code review by peers (focus on Principle VIII compliance)
   - Run automated tests
   - Merge upon approval

### Backend Connection Checklist (Per Page)

**Pre-Integration:**
- [ ] Backend API endpoints identified in ONS_PoC-PDPW_V2
- [ ] API contracts documented (request/response formats)
- [ ] Legacy business rules analyzed in `legado/` code-behind files

**Service Layer:**
- [ ] Service file created in `frontend/src/services/{domain}Service.ts`
- [ ] All CRUD functions implemented (fetch, save, update, delete)
- [ ] DTO transformations implemented (backend ↔ frontend format)
- [ ] Error normalization implemented
- [ ] Service tests created with 100% coverage
- [ ] Service tests pass (success, error, edge cases)

**React Query Hooks:**
- [ ] Query hooks created for reads (e.g., `useEnergeticData`)
- [ ] Mutation hooks created for writes (e.g., `useSaveEnergetic`)
- [ ] Hooks use service layer (no direct API calls)
- [ ] Hook tests created with full coverage
- [ ] Hook tests pass (loading, success, error, refetch)

**Component Integration:**
- [ ] Component imports hooks (not service directly)
- [ ] Component handles loading state (spinner, skeleton, message)
- [ ] Component handles success state (displays data correctly)
- [ ] Component handles error state (user-friendly message in Portuguese)
- [ ] Component shows success feedback after mutations (toast, confirmation)
- [ ] Component tests updated to mock hooks (using `vi.mock` or MSW)
- [ ] Component tests pass with 100% coverage

**Integration Testing:**
- [ ] Integration test created in `frontend/tests/integration/`
- [ ] Test covers full user flow (load → interact → save → confirm)
- [ ] Test covers error recovery (API error → display → retry → success)
- [ ] MSW handlers configured for backend API mocking
- [ ] Integration tests pass

**Quality Gates:**
- [ ] All tests pass (`npm test` in frontend directory)
- [ ] Test coverage 100% on touched files
- [ ] No console errors or warnings
- [ ] Visual parity with legacy system maintained
- [ ] Accessibility validated (axe-core, keyboard navigation)
- [ ] Page listed in `.github/CHECKLIST_MIGRACAO.md` as "Backend Connected"

**Documentation:**
- [ ] Service layer functions documented with JSDoc
- [ ] Hook usage documented with examples
- [ ] Error scenarios documented (what errors can occur, how handled)
- [ ] CHECKLIST1MIGRACAO.md updated with backend statusg states, error states, caching, refetching, optimistic updates
  - Example:
    ```typescript
    // frontend/src/hooks/useEnergeticData.ts
    export function useEnergeticData(date: string, companyId: number) {
      return useQuery({
        queryKey: ['energetic', date, companyId],
        queryFn: () => energeticService.fetchEnergeticData(date, companyId),
        enabled: !!date && !!companyId
      });
    }
    ```

- **Error Handling is Mandatory**: All backend errors MUST be handled gracefully
  - Service layer normalizes backend errors into consistent format
  - Components display user-friendly error messages (Portuguese, domain-specific)
  - Errors are logged for debugging (without exposing sensitive data)
  - Network errors, validation errors, and authorization errors have distinct UX

- **No Frontend Business Logic**: Frontend MUST NOT replicate backend business rules
  - Calculations performed by backend MUST NOT be recalculated in frontend (except for UI-only features like client-side totals preview)
  - Validation rules come from backend (frontend may duplicate for UX, but backend is authoritative)
  - Data transformations in service layer are for format adaptation only, not business logic

- **API Contract Respect**: Frontend MUST conform to backend API contracts
  - No modifications to API requests/responses without backend team coordination
  - If API contract is inadequate, raise issue with backend team
  - Service layer adapts backend format to frontend format (DTO transformation layer)

**Rationale:** The backend is already developed and contains critical business logic for Brazil's energy sector. Frontend must integrate reliably without duplicating or contradicting backend behavior. Strict patterns ensure every page connects consistently, making maintenance and testing predictable.

---ritical routines (e.g., Programação Energética, Geração de Arquivos, Finalização) have maximum priority
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
