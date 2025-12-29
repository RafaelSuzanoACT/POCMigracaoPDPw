# Feature Specification: PDPw Backend Integration

**Feature Branch**: `002-backend-integration`  
**Created**: 2025-12-28  
**Status**: Draft  
**Input**: User description: "Conectar todas as páginas React migradas às APIs do backend ONS_PoC-PDPW_V2 existente, priorizando rotinas críticas do PDP"

## Executive Summary

Esta especificação define a integração completa entre o frontend React já migrado e o backend .NET 8 existente (repositório ONS_PoC-PDPW_V2). O objetivo é transformar as 34 páginas atualmente usando dados mockados em páginas produtivas conectadas a APIs reais, priorizando as 7 rotinas críticas do processo de Programação Diária de Produção (PDP).

### Context

- **Backend Status**: ✅ APIs já desenvolvidas e testadas no repositório ONS_PoC-PDPW_V2
- **Frontend Status**: 34 páginas migradas (23.9%), todas usando dados mockados
- **Critical Routines**: 7 rotinas identificadas, 7/14 páginas migradas (50%), 0% backend-connected
- **Primary Goal**: Connect migrated pages to real backend APIs to enable production use
- **Source of Truth**: Backend APIs são autoritativas; frontend adapta-se aos contratos existentes

### Scope Boundaries

**IN SCOPE**:
- Service layer creation for all backend API endpoints
- React Query hooks for data fetching and mutations
- Component integration (replace mock data with real API calls)
- Error handling and loading states
- Integration testing with MSW (Mock Service Worker)
- 100% test coverage for all backend integration code

**OUT OF SCOPE**:
- New business logic in frontend (backend is authoritative)
- API contract modifications (requires backend team coordination)
- New page migrations (covered in spec 001-frontend-migration)
- Backend development or fixes
- Database schema changes

---

## User Scenarios & Testing

### User Story 1 - Critical Routines Backend Connection (Priority: P1) 🔴 MAXIMUM

**Goal**: Connect 7 critical routine pages to real backend APIs to enable daily energy production scheduling operations.

**Why this priority**: These pages are mission-critical for ONS operators. Without backend integration, operators cannot use the migrated frontend for actual production scheduling.

**Independent Test**: For each critical routine page, verify: (1) page loads real data from backend, (2) user can modify data and save successfully, (3) calculations match legacy system results, (4) errors are handled gracefully.

**Acceptance Scenarios**:

1. **Given** operator opens Razão Energética page, **When** operator selects date and company, **Then** system fetches real data from backend API and displays in 48-interval grid with correct totals and averages
2. **Given** operator modifies energetic data in grid, **When** operator clicks save, **Then** system POSTs data to backend, receives 200 OK response, displays success message, and refreshes data
3. **Given** backend API returns 500 Internal Server Error, **When** error occurs during data fetch, **Then** system displays user-friendly error message with retry button
4. **Given** backend API returns validation error, **When** operator tries to save invalid data, **Then** system displays validation error message with specific field highlighted in red

**Critical Routine Pages to Connect** (7 pages):
- ✅ frmColEnergetica.aspx (Razão Energética) - Migrated, backend pending
- ✅ frmColEletrica.aspx (Razão Elétrica) - Migrated, backend pending
- ✅ frmColIR1.aspx (Nível de Partida) - Migrated, backend pending
- ✅ frmColIR2.aspx (Dia -1) - Migrated, backend pending
- ✅ frmColIR3.aspx (Dia -2) - Migrated, backend pending
- ✅ frmColIR4.aspx (Carga da Ande) - Migrated, backend pending
- ✅ frmColOfertaExportacao.aspx - Migrated, backend pending

---

### User Story 2 - Data Collection Pages Backend Connection (Priority: P2) 🟡 HIGH

**Goal**: Connect remaining 27 data collection pages to backend APIs to complete data collection module.

**Why this priority**: After critical routines, completing data collection enables full daily operations.

**Independent Test**: For each data collection page, verify: (1) page fetches list of entities from backend, (2) page loads existing data for selected entity and date, (3) page saves new/modified data successfully, (4) validation errors from backend are displayed clearly.

**Acceptance Scenarios**:

1. **Given** operator opens Vazão page, **When** page loads, **Then** system fetches company list and plant list from backend, displays in cascading filters
2. **Given** operator selects date and plant, **When** selection completes, **Then** system fetches flow data from backend, displays in editable grid
3. **Given** operator enters new flow values, **When** operator saves, **Then** system POSTs to backend, handles optimistic update, shows success toast
4. **Given** backend returns 409 Conflict, **When** conflict occurs, **Then** system displays "Dados foram atualizados por outro usuário. Recarregar página?" with refresh button

**Data Collection Page Categories** (27 pages):
- Hydraulic Data (3 pages)
- Thermal Data (7 pages)
- Interchange Data (3 pages)
- Load Data (3 pages)
- Other Collection Data (11 pages)

---

### User Story 3 - Query Pages Backend Connection (Priority: P3) 🟠 MEDIUM

**Goal**: Connect 2 migrated query pages to backend APIs to enable data consultation.

**Why this priority**: Query pages provide historical data access and reporting.

**Independent Test**: For each query page, verify: (1) filters are populated from backend metadata APIs, (2) query executes with correct parameters, (3) results display in paginated grid, (4) export functionality generates files from backend data.

**Acceptance Scenarios**:

1. **Given** operator opens FlowQuery page, **When** page loads, **Then** system fetches filter options from backend metadata APIs
2. **Given** operator sets filters and clicks "Consultar", **Then** system POSTs query to backend with filters, displays results in paginated grid
3. **Given** query returns 1000 records, **When** results display, **Then** system shows first 50 records with pagination controls
4. **Given** operator clicks "Exportar Excel", **When** export triggers, **Then** system calls backend export endpoint, downloads Excel file

**Query Pages** (2 pages):
- ✅ frmCnsVazao.aspx (FlowQuery) - Migrated, backend pending
- ✅ frmCnsGeracao.aspx (GenerationQuery) - Migrated, backend pending

---

### User Story 4 - Administration Pages Backend Connection (Priority: P4) 🔵 LOWER

**Goal**: Connect 5 migrated administration pages to backend APIs for user management and system configuration.

**Why this priority**: Administration pages are used less frequently (weekly/monthly) and by fewer users (admins only).

**Independent Test**: For each admin page, verify: (1) page loads current configuration/users from backend, (2) admin can create/update/delete entities, (3) changes persist to database, (4) audit logs are created for all changes.

**Acceptance Scenarios**:

1. **Given** admin opens User Management page, **When** page loads, **Then** system fetches user list from backend, displays in searchable table
2. **Given** admin creates new user, **When** admin saves, **Then** system POSTs to backend, creates user in database, displays success message
3. **Given** non-admin user tries to access admin page, **When** page loads, **Then** system checks authorization with backend, redirects to access denied page if insufficient permissions

**Administration Pages** (5 pages):
- User management
- Role management
- Company configuration
- System parameters
- Audit logs

---

### Edge Cases

**Network and Connectivity**:
- What happens when network connection drops during data save?
  - System preserves unsaved data in sessionStorage, displays reconnection dialog, allows retry when connection restored
- What happens when API endpoint is unreachable (backend down)?
  - System displays "Serviço temporariamente indisponível" with auto-retry every 30s
- What happens when API call times out (>30s)?
  - System cancels request, displays timeout error, offers manual retry button

**Data Conflicts and Concurrency**:
- What happens when two operators save data for same entity simultaneously?
  - Backend uses optimistic locking, returns 409 Conflict, frontend displays refresh option
- What happens when operator modifies stale data (loaded 30 minutes ago)?
  - Backend checks data timestamp, rejects if stale, frontend refreshes data

**Validation and Business Rules**:
- What happens when backend returns validation error?
  - Frontend parses error response, highlights specific field in red, displays validation message near field
- What happens when backend returns multiple validation errors?
  - Frontend displays all errors in summary list, highlights all invalid fields, focuses first invalid field

**Authentication and Authorization**:
- What happens when user session expires during data entry?
  - System detects 401 Unauthorized, saves form data to sessionStorage, redirects to login, restores data after re-authentication
- What happens when user lacks permission for specific operation?
  - Backend returns 403 Forbidden, frontend displays "Você não tem permissão para esta operação"

---

## Requirements

### Functional Requirements

**Service Layer (FR-001 to FR-005)**:

- **FR-001**: System MUST create dedicated service file for each domain (e.g., `frontend/src/services/energeticService.ts`) containing all backend API functions for that domain
- **FR-002**: All service functions MUST return typed Promises and handle DTO transformations between backend format and frontend format
- **FR-003**: Service layer MUST normalize all backend errors into consistent frontend error format with properties: `code`, `message`, `field`
- **FR-004**: Service functions MUST use centralized Axios instance from `frontend/src/services/api.ts` with configured interceptors
- **FR-005**: Service layer MUST NOT contain React dependencies (pure TypeScript/JavaScript functions only)

**React Query Hooks (FR-006 to FR-010)**:

- **FR-006**: System MUST create React Query hook file for each domain wrapping service functions
- **FR-007**: Query hooks MUST use `useQuery` for read operations with appropriate `queryKey` including all parameters
- **FR-008**: Mutation hooks MUST use `useMutation` for write operations with `onSuccess`, `onError`, and `onSettled` callbacks
- **FR-009**: Hooks MUST implement proper `enabled` conditions to prevent unnecessary API calls
- **FR-010**: Hooks MUST configure appropriate `staleTime` and `cacheTime` based on data volatility

**Component Integration (FR-011 to FR-015)**:

- **FR-011**: Components MUST import and use React Query hooks exclusively (MUST NOT import service layer directly)
- **FR-012**: Components MUST handle three states for every data operation: `isLoading`, `isError`, `isSuccess`
- **FR-013**: Components MUST display user-friendly error messages in Portuguese with domain-specific context
- **FR-014**: Components MUST show success feedback after mutations (toast notification or visual confirmation)
- **FR-015**: Components MUST preserve unsaved form data in `sessionStorage` when API errors occur

**Error Handling (FR-016 to FR-020)**:

- **FR-016**: System MUST handle HTTP error codes distinctly: 400 (validation), 401 (auth expired), 403 (forbidden), 404 (not found), 409 (conflict), 500 (server error)
- **FR-017**: System MUST log all API errors to console (development) and error tracking service (production)
- **FR-018**: System MUST implement retry logic for transient errors with exponential backoff (1s, 2s, 4s)
- **FR-019**: System MUST display network offline indicator when `navigator.onLine === false`
- **FR-020**: System MUST implement request cancellation for aborted operations using AbortController

**Testing (FR-021 to FR-024)**:

- **FR-021**: System MUST achieve 100% test coverage for all service layer functions (success, error, edge cases)
- **FR-022**: System MUST achieve 100% test coverage for all React Query hooks (loading, success, error states)
- **FR-023**: System MUST implement integration tests using MSW for critical user flows
- **FR-024**: System MUST pass Backend Connection Checklist (36 points from Constitution v1.1.0) for each connected page

### Key Entities

**Service Layer Entities**:
- **Service Module**: TypeScript file containing API functions for a domain
  - Contains: fetch functions, save functions, delete functions, DTO transformers, error normalizers

**React Query Entities**:
- **Query Hook**: Custom hook wrapping service function for read operations
  - Returns: `{ data, isLoading, error, refetch }`
- **Mutation Hook**: Custom hook wrapping service function for write operations
  - Returns: `{ mutate, isLoading, error, isSuccess }`

**Backend Contract Entities** (read-only):
- **API Endpoint**: HTTP endpoint in ONS_PoC-PDPW_V2 backend
  - Properties: method, path, request DTO, response DTO, error codes
- **DTO**: Backend's data format (may differ from frontend format)

---

## Success Criteria

### Measurable Outcomes

**Backend Connection Completeness (SC-001 to SC-004)**:

- **SC-001**: 100% of 7 critical routine pages successfully connected to backend APIs with all CRUD operations functional
- **SC-002**: 100% of 27 data collection pages successfully connected to backend APIs with full data persistence
- **SC-003**: All 34 migrated pages removed from mock data mode - zero pages using hardcoded data in production
- **SC-004**: Backend Connection Checklist (36 points) passes for 100% of connected pages

**Quality and Testing (SC-005 to SC-008)**:

- **SC-005**: 100% test coverage maintained for all service layer code (minimum 100 tests)
- **SC-006**: 100% test coverage maintained for all React Query hooks (minimum 70 tests)
- **SC-007**: Zero failing tests in CI/CD pipeline - all 350+ existing tests plus new integration tests pass
- **SC-008**: Integration tests created for all critical user flows (minimum 20 integration tests)

**Performance and UX (SC-009 to SC-012)**:

- **SC-009**: 95% of API calls complete within 2 seconds under normal network conditions
- **SC-010**: Loading states display correctly for 100% of API operations
- **SC-011**: Error recovery succeeds in 90% of transient failures without manual page refresh
- **SC-012**: Zero user-reported issues of data loss during save operations

**Operational Readiness (SC-013 to SC-016)**:

- **SC-013**: All connected pages validated by ONS operators in staging environment with real backend APIs
- **SC-014**: 100% of backend API endpoints documented with request/response examples
- **SC-015**: Error handling documentation complete with user-facing message catalog in Portuguese
- **SC-016**: Zero security vulnerabilities introduced - verified by security audit

---

## Backend Connection Standards

### Definition: "Connected to Backend"

A page is considered **"Connected to Backend"** when ALL 36 criteria from Constitution Principle VIII are met:

**Service Layer Criteria** (6 points):
1. ✅ Service file exists
2. ✅ All CRUD functions implemented
3. ✅ DTO transformations implemented
4. ✅ Error normalization implemented
5. ✅ Service tests exist with 100% coverage
6. ✅ All service tests pass

**React Query Hooks Criteria** (6 points):
7. ✅ Hook file exists
8. ✅ Query hooks created for reads
9. ✅ Mutation hooks created for writes
10. ✅ Hooks use service layer
11. ✅ Hook tests exist with full coverage
12. ✅ All hook tests pass

**Component Integration Criteria** (7 points):
13. ✅ Component imports hooks
14. ✅ Loading state displays correctly
15. ✅ Success state displays data correctly
16. ✅ Error state displays user-friendly message
17. ✅ Success feedback displays after mutations
18. ✅ Component tests updated to mock hooks
19. ✅ All component tests pass with 100% coverage

**Integration Testing Criteria** (5 points):
20. ✅ Integration test exists
21. ✅ Test covers full user flow
22. ✅ Test covers error recovery
23. ✅ MSW handlers configured
24. ✅ All integration tests pass

**Quality Gates** (6 points):
25. ✅ All tests pass
26. ✅ Test coverage 100% on touched files
27. ✅ No console errors or warnings
28. ✅ Visual parity maintained
29. ✅ Accessibility validated
30. ✅ Responsive design maintained

**Documentation Criteria** (6 points):
31. ✅ Service functions documented with JSDoc
32. ✅ Hook usage documented
33. ✅ Error scenarios documented
34. ✅ Backend API contract documented
35. ✅ CHECKLIST_MIGRACAO.md updated
36. ✅ PLANO_TAREFAS_BACKEND.md updated

### Test Scenarios (Mandatory Coverage)

Every connected page MUST have tests covering:

**Unit Tests - Service Layer**:
- ✅ Success scenario: 200 response with valid data
- ✅ Error scenario: 400 with validation errors
- ✅ Error scenario: 500 internal server error
- ✅ Error scenario: Network timeout
- ✅ Edge case: Empty array/null response
- ✅ Edge case: Malformed JSON

**Unit Tests - React Query Hooks**:
- ✅ Loading state before API completes
- ✅ Success state after successful API call
- ✅ Error state after failed API call
- ✅ Refetch triggers new API call
- ✅ Second call uses cached data
- ✅ Enabled condition prevents API call

**Unit Tests - Component Integration**:
- ✅ Loading display when `isLoading: true`
- ✅ Data display when `isSuccess: true`
- ✅ Error display when `isError: true`
- ✅ User interaction triggers mutation
- ✅ Success feedback after mutation succeeds
- ✅ Error recovery with retry button

**Integration Tests - Full User Flow**:
- ✅ Happy path: load → select → view → modify → save → confirm
- ✅ Error recovery: error → message → retry → success
- ✅ Validation error: save invalid → see errors → correct → save successfully
- ✅ Session expiry: modify → 401 → login → restore → save

---

## Assumptions

1. **Backend Availability**: ONS_PoC-PDPW_V2 backend APIs are deployed and accessible from frontend development environment
2. **API Contracts Stable**: Backend API contracts are stable and will not change without coordination
3. **Authentication**: Backend provides authentication tokens via existing login flow
4. **CORS Configuration**: Backend CORS accepts requests from frontend development and production origins
5. **Test Backend**: Backend team provides test/staging environment with test data
6. **API Documentation**: Backend team provides OpenAPI/Swagger documentation for all endpoints
7. **Error Format**: Backend returns errors in consistent JSON format
8. **Performance**: Backend APIs respond within 2 seconds for typical queries
9. **Pagination**: Backend implements pagination for lists exceeding 100 records
10. **Legacy Compatibility**: Both legacy WebForms and new React frontend will coexist during transition (6-12 months)

---

## Out of Scope

1. Backend development, API creation, bug fixes
2. Database schema changes
3. Business logic changes (all in backend)
4. API contract changes (requires backend coordination)
5. New page migrations (covered in spec 001)
6. Infrastructure, deployment, scaling
7. Authentication system changes
8. Remaining query pages (46 pages not yet migrated)
9. Remaining admin pages (7 pages not yet migrated)
10. All report pages (8 pages not yet migrated)

---

## Related Documents

- `.specify/memory/constitution.md` - Principle VIII (Backend Integration Discipline)
- `specs/001-frontend-migration/spec.md` - Frontend migration user stories
- `specs/001-frontend-migration/plan.md` - Technical architecture
- `specs/001-frontend-migration/tasks.md` - Task breakdown (Phase 4)
- `.github/ANALISE_ROTINAS_CRITICAS.md` - 7 critical routines
- `.github/PLANO_TAREFAS_BACKEND.md` - Backend connection tasks
- `.github/CHECKLIST_MIGRACAO.md` - Migration status
- `.github/PLANO_MIGRACAO.md` - Overall migration plan
- `.github/copilot-instructions.md` - Development guidelines
