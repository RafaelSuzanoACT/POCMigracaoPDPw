# Implementation Tasks: integrate-usuario-backend

**Change**: integrate-usuario-backend  
**Status**: Pending Approval  
**Date**: 2025-12-29  
**Estimated Duration**: 40 hours (~5 days for 1 dev, ~2 days for 2 devs in parallel)

## Task Summary

| Phase | Tasks | Estimated Hours | Deps |
|-------|-------|-----------------|------|
| Phase 1: Core Service Layer | 8 | 8h | None |
| Phase 2: HTTP Error Handling | 5 | 6h | Phase 1 |
| Phase 3: React Query Hooks | 8 | 12h | Phase 1, 2 |
| Phase 4: Component Integration | 6 | 8h | Phase 3 |
| Phase 5: Comprehensive Tests | 10 | 12h | Phase 1-4 |
| Phase 6: E2E Validation | 3 | 2h | Phase 5 |
| **Totals** | **40** | **48h** | - |

---

## Phase 1: Core Service Layer (8 tasks, 8 hours)

**Goal**: Establish reliable HTTP communication with backend `/api/usuarios` endpoints  
**Success Criteria**: All service methods reach backend correctly; errors throw HttpError; AbortSignal supported

### Task 1.1: Create HttpError Class
- **File**: `frontend/src/utils/httpError.ts`
- **Description**: Define `HttpError` class extending Error with `status: number` and `data?: unknown` properties
- **Acceptance**: 
  - [ ] HttpError can be thrown with `new HttpError(400, {...})`
  - [ ] Error includes descriptive message
  - [ ] status property accessible
  - [ ] data property contains server error payload
- **Testing**: Unit test file `frontend/tests/utils/httpError.test.ts` with 100% coverage
- **Estimated**: 1h

### Task 1.2: Fix userService.list() - Backend Connection
- **File**: `frontend/src/services/userService.ts` (modify existing)
- **Description**: Update `list()` method to:
  - Make real GET /api/usuarios request (not mock)
  - Build query params from filters (login, nome, email, telefone)
  - Accept optional AbortSignal
  - Throw HttpError on HTTP error status
  - Support pagination (page, pageSize)
- **Acceptance**:
  - [ ] GET /api/usuarios?page=1&pageSize=4 succeeds with mock backend
  - [ ] Query params correctly formatted (URLSearchParams)
  - [ ] Returns UserListResponse interface
  - [ ] Throws HttpError(400) on invalid page
  - [ ] AbortSignal parameter supported (passed to axios config)
- **Testing**: Unit tests in `frontend/tests/services/userService.test.ts`
- **Dependencies**: Task 1.1 (HttpError)
- **Estimated**: 2h

### Task 1.3: Fix userService.create() - Backend Connection
- **File**: `frontend/src/services/userService.ts` (modify existing)
- **Description**: Update `create()` method to:
  - Make real POST /api/usuarios request
  - Send UserFormData as JSON body
  - Accept optional AbortSignal
  - Throw HttpError on error
  - Return created User object
- **Acceptance**:
  - [ ] POST /api/usuarios with { usuar_id, usuar_nome, usuar_email, usuar_telefone }
  - [ ] Returns User object on success
  - [ ] Throws HttpError(409) on duplicate login (expected behavior)
  - [ ] Throws HttpError(400) on validation error
  - [ ] AbortSignal supported
- **Testing**: Unit tests in `frontend/tests/services/userService.test.ts`
- **Dependencies**: Task 1.1 (HttpError)
- **Estimated**: 2h

### Task 1.4: Fix userService.update() - Backend Connection
- **File**: `frontend/src/services/userService.ts` (modify existing)
- **Description**: Update `update()` method to:
  - Make real PUT /api/usuarios/{id} request
  - Send UserFormData as JSON body
  - Accept optional AbortSignal
  - Throw HttpError on error
- **Acceptance**:
  - [ ] PUT /api/usuarios/ADMIN with updated fields
  - [ ] Returns updated User object
  - [ ] Throws HttpError(404) if user doesn't exist
  - [ ] Throws HttpError(400) on validation error
  - [ ] AbortSignal supported
- **Testing**: Unit tests in `frontend/tests/services/userService.test.ts`
- **Dependencies**: Task 1.1 (HttpError)
- **Estimated**: 1.5h

### Task 1.5: Fix userService.delete() - Backend Connection
- **File**: `frontend/src/services/userService.ts` (modify existing)
- **Description**: Update `delete()` method to:
  - Make real DELETE /api/usuarios/{id} request for each ID
  - Accept array of IDs, process serially
  - Accept optional AbortSignal
  - Throw HttpError on error
- **Acceptance**:
  - [ ] DELETE /api/usuarios/USER1 succeeds
  - [ ] Multiple IDs deleted serially (USER1, then USER2, then USER3)
  - [ ] Returns { sucesso: true } on success
  - [ ] Throws HttpError if any delete fails
  - [ ] Partial success not rolled back (user deleted before failure)
  - [ ] AbortSignal supported
- **Testing**: Unit tests in `frontend/tests/services/userService.test.ts`
- **Dependencies**: Task 1.1 (HttpError)
- **Estimated**: 1.5h

### Task 1.6: Unit Tests for userService (All Methods)
- **File**: `frontend/tests/services/userService.test.ts`
- **Description**: Comprehensive unit tests for service layer
- **Acceptance**:
  - [ ] Test list() with pagination and filters
  - [ ] Test create() success and error (400, 409)
  - [ ] Test update() success and error (404)
  - [ ] Test delete() single and multiple
  - [ ] Test AbortSignal cancellation
  - [ ] Test HTTP error transformation to HttpError
  - [ ] Mock axios/apiClient (not real HTTP)
  - [ ] 100% code coverage for userService.ts
- **Testing**: Run `npm test frontend/tests/services/userService.test.ts`
- **Dependencies**: Tasks 1.1-1.5
- **Estimated**: 2h

---

## Phase 2: HTTP Error Handling (5 tasks, 6 hours)

**Goal**: Map HTTP errors to user-friendly messages and support recovery  
**Success Criteria**: All HTTP status codes handled; validation errors extracted; no raw HTTP codes shown to user

### Task 2.1: Create Error Handler Utility
- **File**: `frontend/src/utils/errorMessages.ts`
- **Description**: Map HTTP status codes to user-friendly error messages
- **Function**: `getUserFriendlyMessage(httpStatus: number, serverData?: unknown): string`
- **Acceptance**:
  - [ ] 400 → "Please check your input and try again"
  - [ ] 401 → "Your session has expired. Please log in again."
  - [ ] 403 → "You do not have permission to perform this action."
  - [ ] 404 → "The requested resource was not found."
  - [ ] 409 → Check server data for conflict type (duplicate login, email, etc.)
  - [ ] 500 → "System error. Please try again later."
  - [ ] 503 → "System temporarily unavailable. Please try again later."
  - [ ] timeout → "Network connection timeout."
  - [ ] All strings are PT-BR (Portuguese)
- **Testing**: Unit tests `frontend/tests/utils/errorMessages.test.ts`
- **Estimated**: 1h

### Task 2.2: Create Validation Error Extractor
- **File**: `frontend/src/utils/extractValidationErrors.ts`
- **Description**: Extract field-level errors from server 400 response
- **Function**: `extractValidationErrors(errorData: unknown): Record<string, string[]>`
- **Acceptance**:
  - [ ] Extract flat object: `{ email: "Invalid" }` → `{ email: ["Invalid"] }`
  - [ ] Extract nested: `{ errors: { email: "Invalid" } }` → `{ email: ["Invalid"] }`
  - [ ] Handle multiple errors per field
  - [ ] Return empty object if structure unknown
- **Testing**: Unit tests `frontend/tests/utils/extractValidationErrors.test.ts`
- **Estimated**: 1h

### Task 2.3: Wire Error Handler to Service Layer
- **File**: `frontend/src/services/userService.ts` (modify existing)
- **Description**: Enhance service methods to include user-friendly error messages
- **Acceptance**:
  - [ ] All service methods catch HttpError and log
  - [ ] Errors thrown with full context (status, URL, payload)
  - [ ] Sensitive data redacted before logging (no passwords)
  - [ ] Console.error used in development
- **Testing**: Verify error logs in browser console
- **Estimated**: 1h

### Task 2.4: Integration Test - Error Paths
- **File**: `frontend/tests/integration/userService.errors.test.ts`
- **Description**: Test error flows end-to-end (service → component)
- **Acceptance**:
  - [ ] 400 validation error with field message
  - [ ] 409 duplicate login error
  - [ ] 404 user not found error
  - [ ] 500 server error with generic message
  - [ ] Timeout error handled gracefully
  - [ ] AbortError (cancelled request) handled silently
- **Testing**: Run `npm test frontend/tests/integration/`
- **Estimated**: 2h

### Task 2.5: Document Error Handling Patterns
- **File**: `frontend/docs/error-handling.md` (new)
- **Description**: Developer guide for error handling patterns
- **Acceptance**:
  - [ ] Document HttpError class usage
  - [ ] Explain error message mapping
  - [ ] Show component integration example
  - [ ] List error codes and meanings
- **Testing**: N/A (documentation)
- **Estimated**: 1h

---

## Phase 3: React Query Hooks (8 tasks, 12 hours)

**Goal**: Implement state management hooks with caching, invalidation, optimistic updates  
**Success Criteria**: All hooks tested; caching works; mutations invalidate queries; optimistic updates rollback on error

### Task 3.1: Create useUsers Hook
- **File**: `frontend/src/hooks/useUsers.ts`
- **Description**: React Query hook for list query
- **Acceptance**:
  - [ ] Hook accepts `{ page, pageSize, filters }`
  - [ ] Uses `useQuery` with queryKey `['users', { page, pageSize, filters }]`
  - [ ] Stale time: 5 minutes (300,000 ms)
  - [ ] Returns `{ data: UserListResponse, isLoading, error, refetch }`
  - [ ] Auto-refetch when params change
  - [ ] Conditional fetch via `enabled` parameter
  - [ ] Cache hit returns data instantly
- **Testing**: Unit test `frontend/tests/hooks/useUsers.test.ts`
- **Estimated**: 2h

### Task 3.2: Create useCreateUser Hook
- **File**: `frontend/src/hooks/useCreateUser.ts`
- **Description**: React Query hook for create mutation with optimistic update
- **Acceptance**:
  - [ ] Hook returns `{ mutate, mutateAsync, isPending, error, data }`
  - [ ] Mutation calls `userService.create(data)`
  - [ ] Optimistic update: add new user to cache immediately
  - [ ] On success: invalidate `['users', ...]` query (triggers refetch)
  - [ ] On error: rollback optimistic update to previous state
  - [ ] Retry: 3 times on 5xx, 0 times on 4xx
  - [ ] Retry delay: 100ms, 200ms, 400ms (exponential backoff)
- **Testing**: Unit test `frontend/tests/hooks/useCreateUser.test.ts`
- **Estimated**: 3h

### Task 3.3: Create useUpdateUser Hook
- **File**: `frontend/src/hooks/useUpdateUser.ts`
- **Description**: React Query hook for update mutation with optimistic update
- **Acceptance**:
  - [ ] Hook returns `{ mutate, mutateAsync, isPending, error, data }`
  - [ ] Mutation accepts `{ id, data: UserFormData }`
  - [ ] Mutation calls `userService.update(id, data)`
  - [ ] Optimistic update: modify user in cache immediately
  - [ ] On success: invalidate `['users', ...]` query
  - [ ] On error: rollback optimistic update
  - [ ] Retry logic same as create (3x, exponential backoff)
- **Testing**: Unit test `frontend/tests/hooks/useUpdateUser.test.ts`
- **Estimated**: 2.5h

### Task 3.4: Create useDeleteUser Hook
- **File**: `frontend/src/hooks/useDeleteUser.ts`
- **Description**: React Query hook for delete mutation
- **Acceptance**:
  - [ ] Hook returns `{ mutate, mutateAsync, isPending, error, data }`
  - [ ] Mutation accepts `{ userIds: string[] }`
  - [ ] Mutation calls `userService.delete(userIds)`
  - [ ] Optimistic update: remove users from cache immediately
  - [ ] On success: invalidate `['users', ...]` query
  - [ ] On error: rollback optimistic delete
  - [ ] Retry logic same as create
- **Testing**: Unit test `frontend/tests/hooks/useDeleteUser.test.ts`
- **Estimated**: 2.5h

### Task 3.5: Unit Tests for Hooks
- **File**: `frontend/tests/hooks/{useUsers,useCreateUser,useUpdateUser,useDeleteUser}.test.ts`
- **Description**: Comprehensive hook testing
- **Acceptance**:
  - [ ] Each hook has unit tests covering happy path and error cases
  - [ ] Mock userService methods (not HTTP)
  - [ ] Mock React Query queryClient
  - [ ] Test caching behavior (cache hit, stale time)
  - [ ] Test mutation success and error
  - [ ] Test optimistic update and rollback
  - [ ] Test query invalidation (triggers refetch)
  - [ ] 100% code coverage for all hooks
- **Testing**: Run `npm test frontend/tests/hooks/`
- **Estimated**: 2.5h

### Task 3.6: Create Hooks Barrel Export
- **File**: `frontend/src/hooks/index.ts`
- **Description**: Export all hooks for easy import
- **Acceptance**:
  - [ ] `export { useUsers, useCreateUser, useUpdateUser, useDeleteUser }`
  - [ ] Components can import: `import { useUsers } from '@/hooks'`
- **Testing**: N/A (import check)
- **Estimated**: 0.5h

---

## Phase 4: Component Integration (6 tasks, 8 hours)

**Goal**: Wire UserRegistry component to React Query hooks; replace mock callbacks with real hooks  
**Success Criteria**: Component fetches/creates/updates/deletes via backend; UI reflects loading/error states

### Task 4.1: Update UserRegistryContainer to Use Hooks
- **File**: `frontend/src/pages/Administration/UserRegistryContainer.tsx` (modify)
- **Description**: Replace callbacks with React Query hooks
- **Acceptance**:
  - [ ] Remove mock callbacks (onLoadUsers, onSaveUser, onDeleteUsers)
  - [ ] Add hooks: `useUsers`, `useCreateUser`, `useUpdateUser`, `useDeleteUser`
  - [ ] Extract page/pageSize/filters from component state
  - [ ] Pass hook methods as callbacks to UserRegistry component
  - [ ] Handle loading and error states
- **Estimated**: 2h

### Task 4.2: Add Loading Skeleton to UserRegistry
- **File**: `frontend/src/pages/Administration/UserRegistry.tsx` (modify)
- **Description**: Show loading indicator while list is fetching
- **Acceptance**:
  - [ ] When `isLoading: true`, show skeleton table
  - [ ] Skeleton has same layout as real table (rows with placeholders)
  - [ ] Once data loads, skeleton replaced with real data
- **Estimated**: 1.5h

### Task 4.3: Add Error Message Display
- **File**: `frontend/src/pages/Administration/UserRegistry.tsx` (modify)
- **Description**: Display error messages when operations fail
- **Acceptance**:
  - [ ] If `useUsers` hook has error, show error banner at top
  - [ ] Error includes "Retry" button
  - [ ] If mutation fails (create/update/delete), show error message
  - [ ] Field validation errors shown inline near form fields
  - [ ] After retry success, error is cleared
- **Estimated**: 2h

### Task 4.4: Add Toast Notifications
- **File**: `frontend/src/pages/Administration/UserRegistry.tsx` (modify)
- **Description**: Show success/error toast notifications
- **Acceptance**:
  - [ ] After create success: "Usuário incluído com sucesso!"
  - [ ] After update success: "Usuário alterado com sucesso!"
  - [ ] After delete success: "Usuário excluído com sucesso!"
  - [ ] Toast auto-dismisses after 3s (success) or 5s (error)
  - [ ] Multiple toasts queue
- **Implementation Note**: Use existing toast library (if available) or create simple version
- **Estimated**: 1.5h

### Task 4.5: Update UserRegistry Form State Handling
- **File**: `frontend/src/pages/Administration/UserRegistry.tsx` (modify)
- **Description**: Ensure form data persists after error
- **Acceptance**:
  - [ ] Form data remains visible after validation error
  - [ ] User can correct and resubmit without re-entering data
  - [ ] Optional: persist form state to sessionStorage for reload recovery
- **Estimated**: 1h

### Task 4.6: Verify Component UI States
- **File**: `frontend/src/pages/Administration/UserRegistry.tsx` (test)
- **Description**: Manual testing of all UI states
- **Acceptance**:
  - [ ] Initial load: empty form, "Pesquisar" button enabled
  - [ ] Loading list: skeleton showing
  - [ ] List loaded: users displayed, buttons enabled
  - [ ] Create form: can fill and submit
  - [ ] Create success: toast, list refreshes
  - [ ] Create error: error message, form preserved
  - [ ] Update/Delete: same flows
- **Testing**: Manual QA in development environment
- **Estimated**: 1.5h

---

## Phase 5: Comprehensive Tests (10 tasks, 12 hours)

**Goal**: 100% test coverage; all flows tested (happy path, errors, edge cases)  
**Success Criteria**: `npm test` shows 100% coverage; all tests pass

### Task 5.1: Unit Tests - Service Layer Complete
- **File**: `frontend/tests/services/userService.test.ts`
- **Description**: Already created in Phase 1; ensure comprehensive
- **Acceptance**:
  - [ ] Happy paths: list, create, update, delete
  - [ ] Error paths: 400, 404, 409, 500
  - [ ] Edge cases: empty list, timeout, AbortError
  - [ ] 100% coverage (all branches)
- **Estimated**: 2h (refine + add missing tests)

### Task 5.2: Unit Tests - Error Utilities
- **File**: `frontend/tests/utils/{httpError,errorMessages,extractValidationErrors}.test.ts`
- **Description**: Already created; ensure complete
- **Acceptance**:
  - [ ] HttpError: constructor, properties, message
  - [ ] Error message mapping: all 8 status codes
  - [ ] Validation error extraction: flat, nested, multiple
  - [ ] 100% coverage
- **Estimated**: 2h (refine)

### Task 5.3: Unit Tests - Hooks (All Hooks)
- **File**: `frontend/tests/hooks/*.test.ts`
- **Description**: Already created; ensure complete
- **Acceptance**:
  - [ ] useUsers: fetch, cache, refetch, error
  - [ ] useCreateUser: success, error, optimistic, rollback, retry
  - [ ] useUpdateUser: success, error, optimistic, rollback
  - [ ] useDeleteUser: success, error, optimistic, rollback
  - [ ] 100% coverage for all hooks
- **Estimated**: 3h (refine)

### Task 5.4: Integration Tests - Component Flows
- **File**: `frontend/tests/integration/UserRegistry.test.tsx`
- **Description**: Test component with mocked hooks and HTTP
- **Acceptance**:
  - [ ] Render UserRegistry component
  - [ ] User clicks "Pesquisar": list loads and displays
  - [ ] User fills create form and clicks "Salvar": user created, toast shown
  - [ ] User edits and clicks "Salvar": user updated, toast shown
  - [ ] User selects and deletes: user deleted, toast shown
  - [ ] Create fails: error shown, form preserved
  - [ ] Retry after error: succeeds
- **Tools**: Vitest + React Testing Library + MSW
- **Estimated**: 3h

### Task 5.5: Snapshot Tests - Error Messages
- **File**: `frontend/tests/snapshots/errorMessages.snap`
- **Description**: Snapshot tests for all error message strings (PT-BR)
- **Acceptance**:
  - [ ] All error messages captured in snapshots
  - [ ] Easy to spot translation changes
  - [ ] Maintained alongside error message updates
- **Estimated**: 1h

### Task 5.6: E2E Smoke Test (Playwright)
- **File**: `frontend/tests/e2e/userManagement.spec.ts` (optional)
- **Description**: Basic E2E test for create → list → update → delete flow
- **Acceptance**:
  - [ ] Start dev server
  - [ ] Navigate to /admin/usuarios
  - [ ] Create, update, delete user
  - [ ] Verify list updates
  - [ ] Close browser
- **Testing**: Run `npm run e2e` (if configured)
- **Estimated**: 2h (optional)

---

## Phase 6: E2E Validation & Deployment (3 tasks, 2 hours)

**Goal**: Verify everything works end-to-end; merge and deploy  
**Success Criteria**: All tests pass; manual testing confirms; no blockers

### Task 6.1: Run Full Test Suite
- **Command**: `npm test -- --coverage`
- **Acceptance**:
  - [ ] All tests pass (0 failures)
  - [ ] Coverage >= 100% for service, hooks, error utils
  - [ ] Coverage >= 80% for components
  - [ ] No warnings or deprecations
- **Estimated**: 0.5h

### Task 6.2: Manual Testing in Dev Environment
- **Steps**:
  1. Start backend: `docker-compose up` (or equivalent)
  2. Start frontend: `npm run dev`
  3. Navigate to `/admin/usuarios`
  4. Perform CRUD operations (create, read, update, delete)
  5. Test error cases (invalid input, network timeout, etc.)
- **Acceptance**:
  - [ ] All operations work smoothly
  - [ ] Loading states show correctly
  - [ ] Error messages are clear
  - [ ] Toasts appear and dismiss
  - [ ] Pagination works
  - [ ] Filters work
- **Estimated**: 1h

### Task 6.3: PR Review & Merge
- **Steps**:
  1. Create PR to `develop` branch
  2. Add description linking to proposal
  3. Request code review
  4. Address feedback
  5. Merge to `develop`
- **Acceptance**:
  - [ ] PR has description and links to proposal
  - [ ] All checks pass (linting, tests, build)
  - [ ] Reviewed by at least 1 peer
  - [ ] Merged to develop
- **Estimated**: 0.5h

---

## Parallelization Opportunities

These tasks can be run in parallel (different developers):
- **Developer 1**: Phase 1 (Service Layer) + Phase 2 (Error Handling)
- **Developer 2**: Phase 3 (Hooks) in parallel with Phase 1
- **Developer 3**: Phase 4 (Component Integration) once Phase 3 is mostly done
- **All**: Phase 5 (Tests) once respective code is done

**Critical Path**: 1 → 2 → 3 → 4 → 5 → 6

---

## Validation Checklist

Before marking tasks complete, verify:
- [ ] Code follows team conventions (copilot-instructions.md)
- [ ] No console errors or warnings
- [ ] No TypeScript type errors
- [ ] Test command: `npm test` runs successfully
- [ ] All tests pass
- [ ] Coverage meets target (100% service, 80% components)
- [ ] Manual testing completed
- [ ] PR reviewed and approved
- [ ] Code merged to develop

---

## Notes for Developers

1. **Mocking**: Use Vitest to mock `userService` in hooks tests; use MSW to mock HTTP in integration tests
2. **Error Codes**: Reference backend Swagger at http://localhost:5001/swagger/index.html for exact error structures
3. **Naming**: Follow existing patterns in codebase (camelCase functions, PascalCase components, hooks start with `use`)
4. **Documentation**: Add JSDoc comments to all new functions and hooks
5. **Git**: Create feature branch `feature/integrate-usuario-backend` from `develop`; commit frequently with clear messages
6. **Questions**: Ask lead if:
   - Error structure from backend differs from assumptions
   - React Query version or patterns unclear
   - Toast notification library to use

