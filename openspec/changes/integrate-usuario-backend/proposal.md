# Proposal: Integrate User Management Route with Backend API

**Change ID**: `integrate-usuario-backend`  
**Status**: Proposal (Review Required)  
**Date**: 2025-12-29  
**Priority**: P1 (Critical for Administration Module)

## Executive Summary

This proposal establishes a complete, production-ready integration between the frontend `/admin/usuarios` route and the backend `/api/usuarios` endpoints. The route currently has component structure and mock data handlers but lacks live backend connectivity, error resilience, and comprehensive test coverage.

**Goal**: Enable operators to perform full CRUD operations on user accounts (Create, Read, Update, Delete) with real backend data, robust error handling, request cancellation, concurrent operation safety, and 100% test coverage across service layer, hooks, and components.

**Scope**: 
- Frontend service layer for user management operations
- React Query hooks for state management and caching
- Error handling and HTTP-specific resilience
- Component integration tests
- Unit tests for all new code

**Out of Scope**:
- Backend API changes (backend contract is fixed and read-only for frontend)
- UI component redesign (only connects existing components to real data)
- Database or data model changes
- Authentication/authorization implementation

## Current State Analysis

### What Works Today
- ✅ Route `/admin/usuarios` exists and renders `UserRegistry` component
- ✅ Component structure with form, list, filters, pagination
- ✅ Mock data generator for development
- ✅ Service file `userService.ts` with API call signatures
- ✅ TypeScript types for User data models (`user.ts`)
- ✅ Container pattern (`UserRegistryContainer.tsx`) for component-service binding
- ✅ Backend has fully operational `/api/usuarios` endpoints (verified via Swagger)

### What's Missing (Gaps)
- ❌ **Live backend connectivity**: Service methods exist but don't truly connect or handle failures
- ❌ **State management**: No React Query hooks for caching, refetching, optimistic updates
- ❌ **Error handling**: No HTTP-specific error messages (4xx vs 5xx distinction)
- ❌ **Request lifecycle**: No loading/error states, request cancellation, retry logic
- ❌ **Concurrent safety**: No protection against race conditions (e.g., simultaneous saves)
- ❌ **Test coverage**: Service layer methods have no tests; integration tests missing
- ❌ **Performance**: No query caching, deduplication, or stale-time configuration

## Why This Change is Needed

**Business Impact**:
- User management is a critical administration routine that must be reliable for ONS operators
- Backend API is ready and expects frontend consumption
- Current mock data prevents real testing and operator feedback

**Technical Impact**:
- Unconnected services create tech debt and false confidence
- Missing error handling leads to poor UX and hard-to-debug issues
- Lack of React Query integration duplicates state logic across components
- No test coverage creates maintenance risk for future refactors

## Success Criteria

1. **Connectivity**: All user CRUD operations (list, create, update, delete) reach backend API endpoints without errors
2. **Error Handling**: HTTP errors (400, 401, 403, 404, 409, 500, 503) are caught and reported with user-friendly messages
3. **State Management**: React Query manages user list caching, invalidation, and concurrent request safety
4. **Test Coverage**: 100% of service methods and hooks have unit tests; component integration tests validate UI flows
5. **Performance**: List endpoint queries are cached with 5-minute stale time; filter changes trigger new fetches
6. **Request Lifecycle**: UI accurately reflects loading, error, and success states; users can cancel long-running requests
7. **Developer Experience**: Service layer is well-documented; hooks follow TanStack Query patterns; tests are clear and maintainable

## Implementation Strategy

### Phase 1: Core Service Layer (Minimal, Straightforward)
- Fix `userService.ts` to properly call backend endpoints with correct paths
- Add HTTP error handling for all CRUD methods
- Implement request cancellation via AbortController

### Phase 2: React Query Integration
- Create `useUsers` hook (list with caching and filters)
- Create `useCreateUser` hook (create with optimistic updates)
- Create `useUpdateUser` hook (update with optimistic updates)
- Create `useDeleteUser` hook (delete with confirmation flow)
- Wire hooks into `UserRegistryContainer` to replace manual state

### Phase 3: Component Integration
- Update `UserRegistry` to use React Query hooks instead of callback props
- Add loading skeleton/spinner for list
- Add error message display
- Add success toast for CRUD operations

### Phase 4: Comprehensive Testing
- Unit tests for service layer (mocked HTTP)
- Unit tests for React Query hooks (mocked HTTP)
- Integration tests for component flows (user clicks, form submissions)
- E2E smoke test (if applicable)

## Key Decisions

1. **Service-first approach**: All HTTP calls centralized in service layer; components never call APIs directly
2. **React Query for state**: Avoids manual state management complexity, provides caching/invalidation out-of-box
3. **Optimistic updates**: Show immediate UI feedback while backend processes (better UX)
4. **Explicit error types**: Handle 400/409 (validation) differently from 500/503 (service down)
5. **Test-driven**: Write tests before component updates to ensure service layer is solid first

## Design Rationale

See [design.md](./design.md) for detailed architectural reasoning, including:
- Why React Query over Redux/Zustand
- Caching strategy and stale-time logic
- Error recovery patterns
- Concurrent request safety mechanisms

## Open Questions / Clarifications Needed

None at this time. Proposal is grounded in:
- ✅ Live backend verification (Swagger at `http://localhost:5001/swagger/index.html`)
- ✅ Current frontend code review (types, service structure, component hierarchy)
- ✅ Existing test patterns from [002-backend-integration](../../specs/002-backend-integration/) spec
- ✅ Team coding standards from [copilot-instructions.md](../../.github/copilot-instructions.md)

## Next Steps

1. **Review & Approval**: Stakeholder approval of this proposal
2. **Design Review**: Technical review of [design.md](./design.md)
3. **Implementation**: Execute tasks from [tasks.md](./tasks.md) in order
4. **Validation**: Run `openspec validate integrate-usuario-backend --strict`
5. **Deployment**: Merge to `develop` branch with PR review

## Related Documents

- [Specification: Backend Integration Patterns](../../specs/002-backend-integration/spec.md)
- [Design: Detailed Architectural Decisions](./design.md)
- [Tasks: Implementation Checklist](./tasks.md)
- [Spec Deltas: Capability Requirements](./specs/)
- [Backend Swagger API](http://localhost:5001/swagger/index.html)
- [Team Coding Standards](./.github/copilot-instructions.md)

