# Feature Specification: PDPw Frontend Migration - High-Level Overview

**Feature Branch**: `001-frontend-migration`  
**Created**: 2025-12-28  
**Status**: Draft  
**Input**: User description: "Especificação de alto nível para migração do PDPw Frontend baseado em CHECKLIST_MIGRACAO.md, PLANO_MIGRACAO.md, ANALISE_ROTINAS_CRITICAS.md e PLANO_TAREFAS_BACKEND.md"

## Executive Summary

This specification defines the comprehensive migration of the PDPw (Programação Diária de Produção de Energia) frontend system from legacy ASP.NET WebForms (VB.NET) to a modern React + Vite architecture with TypeScript. The PDPw system is critical infrastructure for Brazil's National Electric System Operator (ONS), managing daily energy production scheduling for the entire country.

### Project Scope

- **Total Pages**: 142 ASPX pages to migrate
- **Current Progress**: 34 pages migrated (23.9%)
- **Remaining**: 108 pages pending (76.1%)
- **Critical Routines**: 7 routines involving 14 pages (50% migrated frontend, 0% backend connected)
- **Test Coverage**: 350+ tests created, 100% passing for migrated pages
- **Target**: 100% migration with 100% test coverage and full backend integration

## User Scenarios & Testing

### User Story 1 - Critical Routine Migration (Priority: P1) 🔴 MAXIMUM

**Scenario**: As an ONS operator, I need all 7 critical routines migrated and fully functional so that the daily energy production scheduling process can operate without interruption.

**Why this priority**: These 7 routines represent the core business value of PDPw. Without them, Brazil's daily energy scheduling cannot be executed, directly impacting national energy operations.

**Independent Test**: Each critical routine can be tested independently by verifying: (1) frontend renders correctly with all interactive elements, (2) backend APIs respond with real data, (3) data validation and calculations work correctly, (4) data persists successfully to database.

**Acceptance Scenarios**:

1. **Given** operator accesses Programação Energética page, **When** operator selects date and company, **Then** system displays 48 half-hour intervals for data entry with real-time totals and averages
2. **Given** operator enters energy data for all intervals, **When** operator saves data, **Then** backend persists data and displays confirmation
3. **Given** operator accesses Geração de Arquivos page, **When** operator selects model type (DESSEM/DECOMP), **Then** system generates model input files based on collected data
4. **Given** operator completes all data collection, **When** operator finalizes programming, **Then** system validates all required data and publishes daily schedule

**Critical Routine Breakdown** (from ANALISE_ROTINAS_CRITICAS.md):

1. **Cadastro de Programação Energética, Elétrica e Previsão Eólica** (3 pages)
   - ✅ frmColEnergetica.aspx (Razão Energética) - Migrated, backend pending
   - ✅ frmColEletrica.aspx (Razão Elétrica) - Migrated, backend pending
   - ❌ frmColPrevisaoEolica.aspx (Previsão Eólica) - NOT migrated

2. **Geração de Arquivos para Modelos** (2 pages)
   - ❌ frmGerArquivo.aspx (Gerenciamento de Arquivos) - NOT migrated
   - ❌ frmGerModelos.aspx (Geração de Modelos) - NOT migrated

3. **Finalização da Programação** (2 pages)
   - ❌ frmFinalizacao.aspx (Finalização) - NOT migrated
   - ❌ PDPProgDiaria.aspx (Programação Diária) - NOT migrated

4. **Recebimento de Insumos da Programação Diária** (4 pages)
   - ✅ frmColIR1.aspx (Nível de Partida) - Migrated, backend pending
   - ✅ frmColIR2.aspx (Dia -1) - Migrated, backend pending
   - ✅ frmColIR3.aspx (Dia -2) - Migrated, backend pending
   - ✅ frmColIR4.aspx (Carga da Ande) - Migrated, backend pending

5. **Recebimento de Ofertas de Exportação de Térmicas** (1 page)
   - ✅ frmColOfertaExportacao.aspx - Migrated, backend pending

6. **Recebimento de Ofertas de Resposta Voluntária da Demanda** (1 page)
   - ❌ frmColOfertaRVD.aspx - NOT migrated

7. **Recebimento de Energia Vertida Turbinável** (1 page)
   - ❌ frmColEnergiaVertida.aspx - NOT migrated

---

### User Story 2 - Backend Integration for Migrated Pages (Priority: P1) 🔴 MAXIMUM

**Scenario**: As an ONS operator, I need all migrated frontend pages connected to real backend APIs so that I can work with actual production data instead of mock data.

**Why this priority**: Currently 7 critical pages are migrated but using mock data. Without backend integration, these pages cannot be used in production, rendering the migration incomplete and unusable.

**Independent Test**: For each migrated page, verify: (1) API endpoints respond with real database data, (2) data validation matches legacy system rules, (3) save operations persist to database, (4) error handling displays appropriate messages, (5) loading states display correctly.

**Acceptance Scenarios**:

1. **Given** Razão Energética page is loaded, **When** operator selects date and company, **Then** system fetches real data from backend API and displays in 48-interval grid
2. **Given** operator modifies energy values, **When** operator clicks save, **Then** React Query mutation sends data to backend, receives confirmation, and updates UI
3. **Given** backend API returns validation error, **When** error occurs, **Then** frontend displays user-friendly error message in Portuguese with specific field highlights
4. **Given** API call takes longer than 2 seconds, **When** loading occurs, **Then** frontend displays loading spinner with "Carregando dados..." message

**Integration Requirements** (from PLANO_TAREFAS_BACKEND.md):

- Create service layer for each page (e.g., `energeticService.ts`, `electricalService.ts`)
- Implement React Query hooks (`useEnergeticData`, `useSaveEnergetic`, etc.)
- Connect components to hooks replacing mock data
- Validate calculations match legacy system (totals, averages, aggregations)
- Test bulk edit functionality (textarea overlay for 48 intervals)
- Ensure error handling and loading states

---

### User Story 3 - Data Collection Module Completion (Priority: P2) 🟡 HIGH

**Scenario**: As an ONS operator, I need all remaining 108 pages in the Data Collection module migrated so that I have complete functionality parity with the legacy system.

**Why this priority**: After critical routines are functional, completing the Data Collection module (currently 97.4% complete) provides immediate value to daily operations.

**Independent Test**: Each collection page can be tested by: (1) rendering with correct form fields, (2) accepting valid input data, (3) rejecting invalid data with clear messages, (4) saving to backend successfully, (5) displaying confirmation.

**Acceptance Scenarios**:

1. **Given** operator accesses any collection page, **When** page loads, **Then** all form fields render with proper labels, placeholders, and data-testid attributes
2. **Given** operator enters data, **When** data is invalid, **Then** form displays inline validation errors before submission
3. **Given** operator completes form, **When** operator saves, **Then** data persists and operator receives visual confirmation
4. **Given** collection data exists, **When** operator returns to page, **Then** previously saved data is displayed for editing

---

### User Story 4 - Consultation Pages Migration (Priority: P3) 🟢 MEDIUM

**Scenario**: As an ONS operator, I need all 48 consultation pages migrated so that I can query historical data and verify submitted information.

**Why this priority**: Consultation pages provide read-only access to historical data. While important for auditing and verification, they are less critical than data collection and can be migrated after core functionality is complete.

**Independent Test**: Each consultation page can be tested by: (1) displaying search filters, (2) executing queries against backend, (3) rendering results in tables/grids, (4) supporting export to Excel/PDF, (5) pagination working correctly.

**Acceptance Scenarios**:

1. **Given** operator accesses consultation page, **When** operator applies date/company filters, **Then** system displays matching records in paginated table
2. **Given** search results are displayed, **When** operator clicks export, **Then** system generates Excel file with query results
3. **Given** large result set is returned, **When** pagination is needed, **Then** system displays page controls and loads pages efficiently

---

### User Story 5 - Administration and Reports Migration (Priority: P4) 🔵 LOWER

**Scenario**: As an ONS administrator, I need all administration pages (12 pages) and report pages (8 pages) migrated so that I can manage system configuration and generate operational reports.

**Why this priority**: Administration and reports are essential for system management but are used less frequently than data collection and consultation. They can be migrated after primary operational workflows are complete.

**Independent Test**: Administration pages tested by: (1) user CRUD operations work, (2) permissions are enforced, (3) configuration changes persist. Report pages tested by: (1) report parameters accepted, (2) data generated correctly, (3) export formats available.

**Acceptance Scenarios**:

1. **Given** administrator accesses user management, **When** administrator creates/edits/deletes users, **Then** changes are saved and reflected immediately
2. **Given** operator requests operational report, **When** parameters are selected, **Then** system generates PDF/Excel report with correct data
3. **Given** administrator changes system configuration, **When** configuration is saved, **Then** all users see updated behavior without re-login

---

### Edge Cases

**Data Consistency**:
- What happens when multiple operators edit the same data simultaneously?
- How does system handle partial form submission when network fails mid-save?
- What occurs when backend returns stale data during cache invalidation?

**Browser Compatibility**:
- How does system behave on older browsers (IE11, older Chrome/Firefox)?
- What happens when JavaScript is disabled?
- How are responsive breakpoints handled on unusual screen sizes?

**Performance**:
- What happens when 48-interval grids have thousands of historical records?
- How does system handle slow API responses (>5 seconds)?
- What occurs during backend maintenance windows?

**Legacy Data Migration**:
- How are existing database records handled during schema changes?
- What happens if legacy data has validation issues under new rules?
- How is data consistency maintained during parallel legacy/new system operation?

## Requirements

### Functional Requirements

#### Quality Mandates (from CHECKLIST_MIGRACAO.md)

- **FR-001**: System MUST implement unique `data-testid` attributes on ALL interactive elements using pattern `{component}-{element}-{index?}`
  - Examples: `data-testid="btn-save"`, `data-testid="input-username"`, `data-testid="nav-link-0"`
  - Rationale: Enables automated E2E testing with Playwright/Cypress for regression prevention

- **FR-002**: System MUST achieve 100% unit test coverage for all migrated pages using React Testing Library + Vitest
  - Test categories required: rendering, user interactions, state changes, error handling, loading states
  - All tests MUST pass before page is considered complete
  - Rationale: Critical system requires confidence in every migration step

- **FR-003**: System MUST be fully responsive across three breakpoints:
  - Mobile: < 768px
  - Tablet: 768px - 1024px  
  - Desktop: > 1024px
  - All pages MUST be usable on touch devices and with keyboard navigation
  - Rationale: Modern systems require multi-device accessibility

- **FR-004**: System MUST meet minimum WCAG 2.1 Level AA accessibility standards:
  - All forms MUST have proper `<label>` elements
  - Interactive elements MUST have appropriate ARIA attributes
  - Keyboard navigation MUST work for all workflows
  - Color contrast MUST meet 4.5:1 ratio
  - Rationale: Legal compliance and inclusive design

- **FR-005**: System MUST maintain visual identity of legacy WebForms system:
  - Preserve original color palette
  - Preserve original typography and font sizes
  - Preserve layout structure and spacing
  - Use CSS Modules for style isolation
  - Allow incremental UX improvements only with justification
  - Rationale: Minimize operator retraining and maintain user familiarity

#### Architecture Requirements

- **FR-006**: Frontend MUST use layered architecture with clear separation:
  - **UI Layer**: Functional React components with hooks (no class components)
  - **Data Layer**: React Query hooks for caching, fetching, synchronization
  - **Service Layer**: Axios-based API clients (e.g., `services/energeticService.ts`)
  - No direct API calls from components; always use service layer + hooks
  - Rationale: Maintainability, testability, and independent layer evolution

- **FR-007**: Frontend MUST use TypeScript for all new code:
  - Prefer TypeScript; JavaScript with JSDoc types acceptable if needed
  - All props MUST be typed with interfaces
  - Avoid `any` type; use `unknown` when type is truly unknown
  - Rationale: Type safety prevents runtime errors in critical system

- **FR-008**: All pages MUST follow incremental migration workflow:
  1. Analyze legacy code in `legado/` directory (read-only reference)
  2. Create React component in `frontend/src/pages/`
  3. Create CSS Module in `frontend/src/pages/`
  4. Create unit tests in `frontend/tests/pages/`
  5. Create service layer in `frontend/src/services/`
  6. Implement React Query hooks
  7. Connect component to backend via hooks
  8. Verify checklist compliance (.github/CHECKLIST_MIGRACAO.md)
  9. Create Pull Request to `develop` branch
  - Rationale: Standardized workflow ensures consistency and quality

#### Backend Integration Requirements

- **FR-009**: All migrated pages MUST connect to backend APIs in ONS_PoC-PDPW_V2 repository:
  - Use React Query for data fetching with automatic caching
  - Implement optimistic UI updates for better UX
  - Handle loading states with spinners and skeleton screens
  - Display user-friendly error messages in Portuguese
  - Implement retry logic for transient failures
  - Rationale: Production system requires real data and robust error handling

- **FR-010**: Service layer MUST implement consistent patterns:
  - All API calls use centralized Axios instance with interceptors
  - Authentication tokens automatically attached to requests
  - Response data transformed to frontend models (DTOs)
  - Errors normalized to consistent format
  - Request/response logging for debugging
  - Rationale: Consistency reduces bugs and improves maintainability

#### Domain-Specific Requirements

- **FR-011**: All 48-interval grids (Energética, Elétrica, Eólica) MUST support:
  - Individual cell editing with inline validation
  - Bulk editing via textarea overlay (copy/paste from Excel)
  - Real-time calculation of totals and averages
  - Cell highlighting for validation errors
  - Auto-save drafts every 30 seconds
  - Rationale: Critical data entry workflows require robust editing capabilities

- **FR-012**: File generation pages MUST support:
  - Selection of model type (DESSEM, DECOMP, etc.)
  - Configuration of generation parameters
  - Real-time progress indication
  - Download of generated files
  - History of previous generations
  - Rationale: Model file generation is core PDPw functionality

- **FR-013**: Finalization workflow MUST include:
  - Validation checklist showing completion status of all required data
  - Summary dashboard of collected data (counts, totals, missing items)
  - Confirmation dialog with audit trail information
  - Generation of finalization reports
  - Email notifications to stakeholders
  - Rationale: Finalization is irreversible and requires careful validation

### Key Entities

**Pages/Components**:
- **Collection Pages**: Forms for operators to input daily energy data (hydraulic, thermal, wind, exports)
- **Consultation Pages**: Read-only views for querying historical data with filters and exports
- **Administration Pages**: User management, system configuration, permissions
- **Report Pages**: Operational reports generation with various formats (PDF, Excel)
- **Utility Pages**: File management, model generation, system tools

**Data Structures**:
- **48-Interval Grid**: Time series data structure representing 24 hours in 30-minute increments
- **Programação Energética/Elétrica**: Energy and electrical scheduling data for specific dates
- **Previsão Eólica**: Wind power generation forecasts by wind farm
- **Ofertas**: Export offers and voluntary demand response bids
- **Insumos**: Input data from agents (starting levels, day-ahead data)

**Workflows**:
- **Data Collection Flow**: Login → Select Date/Entity → Enter Data → Validate → Save → Confirm
- **Model Generation Flow**: Select Model → Configure Parameters → Generate → Monitor Progress → Download
- **Finalization Flow**: Validate Completeness → Review Summary → Confirm → Generate Reports → Publish

## Success Criteria

### Measurable Outcomes

**Migration Completion**:
- **SC-001**: 100% of 142 legacy pages successfully migrated to React (currently 23.9%)
- **SC-002**: 100% of migrated pages have 100% passing unit test coverage (currently 350+ tests, 100% passing for migrated pages)
- **SC-003**: All 7 critical routines (14 pages) fully functional with backend integration (currently 50% migrated frontend, 0% backend connected)

**Quality Metrics**:
- **SC-004**: Zero accessibility violations when tested with axe-core or WAVE tools on all migrated pages
- **SC-005**: All migrated pages achieve Lighthouse scores: Performance ≥90, Accessibility ≥95, Best Practices ≥90
- **SC-006**: All interactive elements across all pages have unique `data-testid` attributes following naming convention

**User Experience**:
- **SC-007**: Operators can complete data entry workflows at least as fast as legacy system (baseline: measure legacy workflow time)
- **SC-008**: 95% of operators report visual familiarity with new system (maintain legacy look-and-feel)
- **SC-009**: Zero training required for operators transitioning to new system due to visual preservation

**Technical Performance**:
- **SC-010**: All consultation pages load initial data within 2 seconds on standard ONS network
- **SC-011**: 48-interval grids support real-time updates without perceptible lag (<100ms per cell edit)
- **SC-012**: System handles 100 concurrent operators without performance degradation

**Integration Success**:
- **SC-013**: All migrated pages successfully fetch and save data to backend APIs with <5% error rate
- **SC-014**: Frontend-backend integration tested with automated E2E tests covering critical workflows
- **SC-015**: All legacy functionality verified working in new system through side-by-side comparison testing

**Operational Readiness**:
- **SC-016**: System deployed to production with zero downtime migration strategy
- **SC-017**: Rollback plan tested and documented for emergency reversion to legacy system
- **SC-018**: All ONS operators trained and certified on new system before legacy system retirement

## Assumptions

1. **Backend APIs**: ONS_PoC-PDPW_V2 repository contains all necessary backend APIs; any missing endpoints will be developed by backend team
2. **Legacy Access**: `legado/` directory contains complete VB.NET/WebForms source code for reference during migration
3. **Browser Support**: Target browsers are modern versions (Chrome 90+, Firefox 88+, Edge 90+, Safari 14+); IE11 support not required
4. **Infrastructure**: React frontend will be containerized with Docker and deployed to ONS infrastructure
5. **Authentication**: Existing authentication system (IntegracaoIntUnica) will be integrated; frontend receives token from backend
6. **Data Migration**: Database schema remains compatible; no major data migration required
7. **Parallel Operation**: Legacy and new systems will operate in parallel during transition period for validation
8. **Team Size**: Assumed 2-3 frontend developers available for migration work
9. **Timeline**: Migration is incremental; critical routines prioritized first, followed by remaining modules
10. **Testing Environment**: Dedicated QA environment available for integration testing before production deployment

## Dependencies

### External Dependencies

- **Backend APIs** (ONS_PoC-PDPW_V2): All frontend pages depend on corresponding backend endpoints being available
- **Legacy System** (pdpw_act): Required as reference for business logic and validation rules
- **ONS Authentication System**: Frontend requires SSO integration for user login
- **ONS Network Infrastructure**: Deployment depends on ONS server infrastructure availability

### Internal Dependencies

- **Design System**: Reusable components library should be created early to ensure consistency
- **API Client**: Centralized Axios instance with interceptors must be configured before any backend integration
- **React Query Setup**: Global query client configuration required before implementing data hooks
- **Routing**: React Router setup must be complete before adding new page routes
- **Testing Infrastructure**: Vitest + React Testing Library configured before writing tests

### Priority Dependencies

1. **P1 (Blocking)**: Complete backend API development for 7 critical routines
2. **P1 (Blocking)**: Establish frontend architecture (routing, state management, API client)
3. **P2 (High)**: Create shared component library (forms, tables, buttons, grids)
4. **P2 (High)**: Define and implement 48-interval grid component (used in multiple pages)
5. **P3 (Medium)**: Setup automated E2E testing infrastructure (Playwright/Cypress)
6. **P4 (Low)**: Performance optimization and monitoring setup

## Out of Scope

The following items are explicitly OUT OF SCOPE for this migration:

1. **New Features**: No new functionality beyond what exists in legacy system
2. **Backend Development**: Backend API development is separate workstream (ONS_PoC-PDPW_V2 team)
3. **Database Migration**: Database schema changes handled by backend team
4. **Infrastructure Setup**: DevOps and infrastructure managed by separate team
5. **Mobile Native Apps**: Only responsive web app; no iOS/Android native apps
6. **Real-time Collaboration**: No simultaneous multi-user editing of same data
7. **Advanced Analytics**: No new dashboards or analytics beyond existing reports
8. **Internationalization**: System remains Portuguese-only (no i18n required)
9. **Third-party Integrations**: No new external system integrations
10. **Performance Optimization Beyond Requirements**: Optimization only to meet SC-010, SC-011, SC-012 criteria

## References

This specification synthesizes information from the following project documents:

- **CHECKLIST_MIGRACAO.md**: Quality requirements, test coverage mandates, accessibility requirements
- **PLANO_MIGRACAO.md**: Migration phases, module breakdown, current progress (23.9% complete)
- **ANALISE_ROTINAS_CRITICAS.md**: 7 critical routines, 14 critical pages, priority definitions
- **PLANO_TAREFAS_BACKEND.md**: Backend integration tasks, service layer patterns, hooks implementation
- **.specify/memory/constitution.md**: Project constitution with 7 core principles
- **.github/copilot-instructions.md**: Tactical development guidance and coding standards

## Next Steps

After approval of this specification, the following activities will commence:

1. **Planning Phase** (`/speckit.plan`): Create technical implementation plan with architecture decisions
2. **Task Breakdown** (`/speckit.tasks`): Generate detailed task list organized by user story priority
3. **Feature Branch Development**: Implement tasks incrementally following TDD approach
4. **Continuous Integration**: Merge completed user stories to `develop` branch via PR
5. **Production Deployment**: Deploy completed critical routines to production after validation
