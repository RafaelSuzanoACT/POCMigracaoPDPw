# Design: User Management Backend Integration

**Change ID**: `integrate-usuario-backend`  
**Scope**: Service layer, React Query hooks, HTTP error handling, concurrent safety  
**Date**: 2025-12-29

## Architectural Overview

```
┌─────────────────────────────────────────────┐
│         UserRegistry Component              │  ← Present UI (form, list, pagination)
└────────────────┬────────────────────────────┘
                 │
        ┌────────▼────────┐
        │ UserRegistryContainer    │  ← Orchestrates hooks & callbacks
        └────────┬────────┘
                 │
    ┌────────────┼────────────┬─────────────────┐
    │            │            │                 │
┌───▼──┐  ┌─────▼────┐  ┌──────▼────┐  ┌──────▼────┐
│useUsers │ useCreateUser│ useUpdateUser│ useDeleteUser │  ← React Query Hooks (NEW)
└───┬──┘  └─────┬────┘  └──────┬────┘  └──────┬────┘
    │           │              │               │
    └─────┬─────┴──────┬───────┴───────┬───────┘
          │            │               │
    ┌─────▼────────────▼───────────────▼────────┐
    │         userService (FIXED)                │  ← Service Layer
    │  • list()  • create()  • update()  • delete() │
    └─────┬─────────────────────────────────────┘
          │
    ┌─────▼────────────────────────────┐
    │     apiClient (Axios)            │  ← HTTP Client (Existing)
    │  http://localhost:5001/api       │
    └─────┬────────────────────────────┘
          │
    ┌─────▼────────────────────────────┐
    │    Backend: /api/usuarios        │  ← Fixed Contract (Read-only)
    │  GET, POST, PUT, DELETE         │
    └──────────────────────────────────┘
```

## Design Decisions & Rationale

### 1. Service Layer Pattern (Minimal)

**Decision**: Fix `userService.ts` to properly call backend endpoints with error handling.

**Rationale**:
- All HTTP calls centralized in one place (single source of truth)
- Components never call APIs directly (separation of concerns)
- Easy to mock in tests
- Easy to add retry logic or request interceptors later

**Example Structure**:
```typescript
export const userService = {
  list: async (params) => {
    // Maps frontend filters to query params
    // Returns UserListResponse or throws HttpError
  },
  create: async (data) => {
    // Validates before send, returns User
  },
  update: async (id, data) => {
    // Validates before send, returns User
  },
  delete: async (ids) => {
    // Accepts array of IDs, returns DeleteResponse
  }
}
```

### 2. React Query for State Management

**Decision**: Introduce React Query hooks (`useUsers`, `useCreateUser`, `useUpdateUser`, `useDeleteUser`) instead of manual `useState` in `UserRegistry`.

**Rationale**:
- **Caching**: Backend list call cached for 5 minutes; reduces unnecessary API calls
- **Invalidation**: When create/update/delete succeeds, automatically refetch list
- **Deduplication**: Multiple components requesting same query share single HTTP call
- **Retry**: Built-in retry logic for transient failures (e.g., network timeout)
- **DevTools**: React Query DevTools provides transparent view of cache state
- **Industry standard**: Used by 90%+ of modern React apps; easier hiring/maintenance

**Why not Redux/Zustand?**
- Redux: Overkill for CRUD operations; requires boilerplate actions/reducers
- Zustand: Manual invalidation logic needed; no caching strategy out-of-box

**Stale-Time Strategy**:
- User list: 5-minute stale time (data refreshes every 5 min or on manual refetch)
- Single user (by ID): 10-minute stale time (rarely changes after creation)
- Rationale: User data changes infrequently; stale data acceptable for brief windows

### 3. HTTP Error Handling

**Decision**: Distinguish between error types and map to user-friendly messages.

**Rationale**:
- **400 (Bad Request)**: Validation error from client (show field-specific error)
- **401 (Unauthorized)**: Session expired (redirect to login)
- **403 (Forbidden)**: User lacks permission (show "Access Denied" message)
- **404 (Not Found)**: User doesn't exist (show "User not found" or refetch list)
- **409 (Conflict)**: Duplicate login/email (show "Login already exists")
- **500/503 (Server Error)**: Service down (show "System unavailable, try later")
- **Network timeout**: Show "Network connection lost"

**Implementation**:
```typescript
class HttpError extends Error {
  constructor(public status: number, public data?: unknown) {
    super(`HTTP ${status}`);
  }
}

// In service methods
if (response.status >= 400) {
  throw new HttpError(response.status, response.data);
}
```

### 4. Request Cancellation & Concurrent Safety

**Decision**: Use AbortController to cancel in-flight requests when component unmounts or user navigates away.

**Rationale**:
- Prevents "Can't perform state update on unmounted component" warning
- Stops unnecessary API calls if user quickly switches pages
- Reduces backend load

**Implementation**:
```typescript
const abortController = new AbortController();

apiClient.get('/usuarios', {
  signal: abortController.signal
});

// On component unmount
return () => abortController.abort();
```

**Concurrent Edit Safety**:
- Use optimistic updates: Show change immediately, confirm with backend
- On backend failure, revert to previous state with error message
- React Query handles this via `onError` callback

### 5. Optimistic Updates

**Decision**: Show UI changes immediately (optimistic) while backend processes. Revert on failure.

**Rationale**:
- Better perceived performance (no "saving..." delay)
- Users see their action worked before server responds
- React Query automatically reverts on mutation error

**Example Flow**:
```
User clicks "Delete User"
  ↓
Frontend removes from list immediately (optimistic)
  ↓
Backend processes DELETE request
  ↓
If success: List stays updated ✓
If failure: Revert to previous list + show error ✗
```

### 6. Caching & Invalidation Strategy

**Decision**: Automatic query invalidation on mutations.

**Rationale**:
- Create/Update/Delete mutation → invalidate user list query
- React Query refetches list automatically
- No manual cache-busting code needed

**Implementation**:
```typescript
useMutation(userService.create, {
  onSuccess: (newUser, variables, context) => {
    // Invalidate list query
    queryClient.invalidateQueries(['users', 'list']);
  }
});
```

### 7. Test Coverage Strategy

**Decision**: 100% test coverage for service layer, hooks, and component integration.

**Pattern**:
- **Service tests**: Mock HTTP (via MSW or Vitest mocks), verify request/response transformation
- **Hook tests**: Render hook, wait for async, verify returned data and cache behavior
- **Component tests**: Render component, mock hooks, click buttons, verify UI updates

**Tools**: Vitest (unit), React Testing Library (component), MSW (HTTP mocking)

## Performance Implications

| Scenario | Current (Mock) | After (Backend) | Impact |
|----------|--------|--------|--------|
| Initial load | ~0ms | 100-200ms | Acceptable (backend ~100ms) |
| Filter change | Instant | 100-200ms | Acceptable |
| Cached list access | N/A | ~0ms (5-min cache) | **Improved** |
| Create user | ~0ms | 200-300ms | Acceptable |
| Bulk delete (5 users) | ~0ms | 500-1000ms (serial) | Acceptable |

**Optimization Notes**:
- Consider parallel DELETE calls if backend supports (currently serial in proposal)
- Consider pagination to reduce initial load payload
- Caching reduces repeated list fetches by ~80% (estimated)

## Dependency Graph

```
useUsers
  ↓
  → userService.list()
    → apiClient.get()
      → HTTP: GET /api/usuarios

useCreateUser
  ↓
  → userService.create()
    → apiClient.post()
      → HTTP: POST /api/usuarios
    → invalidate(['users', 'list'])
      → triggers useUsers refetch

useUpdateUser
  ↓
  → userService.update()
    → apiClient.put()
      → HTTP: PUT /api/usuarios/{id}
    → invalidate(['users', 'list'])

useDeleteUser
  ↓
  → userService.delete()
    → apiClient.delete()
      → HTTP: DELETE /api/usuarios/{id}
    → invalidate(['users', 'list'])
```

## Alternative Considered & Rejected

### 1. Manual State Management (useState + useEffect)
- ❌ Duplicates logic across components
- ❌ No built-in caching or deduplication
- ❌ No automatic retry on failure
- ❌ Hard to coordinate concurrent updates

### 2. Redux
- ❌ Excessive boilerplate for simple CRUD
- ❌ Action/reducer/selector pattern overhead
- ❌ Not worth it for 1-2 pages managing users

### 3. Fetch directly in component
- ❌ Violates separation of concerns
- ❌ Hard to test
- ❌ Duplicates HTTP logic
- ❌ No error handling reuse

### 4. GraphQL
- ❌ Backend is REST (fixed contract)
- ❌ Frontend would need GraphQL-to-REST bridge
- ❌ Out of scope

## Risk Mitigation

| Risk | Mitigation |
|------|-----------|
| Backend endpoint unavailable | Service returns error; UI shows "System unavailable"; user can retry |
| Network timeout | HTTP client has 30-second timeout; React Query retries 3x with exponential backoff |
| Concurrent create (same login) | Backend returns 409 Conflict; UI shows "Login already exists" |
| Unsaved data lost on navigation | SessionStorage persists form state (nice-to-have, not required) |
| Cache stale (data changed externally) | Manual refetch button; 5-min stale time acceptable for admin operations |

## Rollout Strategy

1. **Phase 1**: Service layer + hooks (no UI changes yet)
2. **Parallel**: Full test coverage
3. **Phase 2**: Wire components to hooks (swap props with hooks)
4. **Phase 3**: Manual testing in dev environment
5. **Phase 4**: Merge to develop, test in staging
6. **Phase 5**: Deploy to production

## Observability & Debugging

**React Query DevTools**: Enable in development to inspect:
- Cached user list state
- Query refetch triggers
- Mutation history

**HTTP Logging**: apiClient logs all requests/responses to browser console (development only)

**Error Tracking**: All HttpErrors logged with status, URL, payload for debugging

## Backward Compatibility

**No breaking changes**: 
- Existing component props unchanged (UserRegistry still receives `onLoadUsers` etc.)
- Mock path still works for offline development
- Can toggle between mock and real backend via environment variable

