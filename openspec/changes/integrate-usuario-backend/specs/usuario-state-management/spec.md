# Specification: User State Management via React Query

**Capability**: `usuario-state-management`  
**Change**: integrate-usuario-backend  
**Date**: 2025-12-29  
**Status**: Proposed

## Overview

React Query hooks manage the user management UI state (list, loading, errors, mutations). Hooks replace manual `useState` calls and provide automatic caching, deduplication, refetching, and optimistic updates.

Four hooks cover the primary user flows:
1. `useUsers` - fetch and cache user list
2. `useCreateUser` - create user + invalidate list
3. `useUpdateUser` - update user + invalidate list
4. `useDeleteUser` - delete user + invalidate list

## ADDED Requirements

### FR-101: useUsers Hook for List Management

#### Requirement
The `useUsers` hook shall fetch user list via `userService.list()` with pagination and filters, cache results, and provide loading/error states. When filters change, the hook shall refetch the backend.

#### Acceptance Criteria
- Hook accepts `{ page, pageSize, filters }` parameters
- Uses React Query `useQuery` with queryKey `['users', { page, pageSize, filters }]`
- Sets stale time to 5 minutes (data refreshed every 5 min)
- Provides `data: UserListResponse`, `isLoading: boolean`, `error: Error | null`
- Fetches backend only once per unique parameter combination (deduplication)
- Caches result for 5 minutes (no network call within window)
- When page/filters change, automatically refetches
- Supports `enabled: boolean` to conditionally enable fetching

#### Scenario: Initial load - fetch and cache
```gherkin
Given the user navigates to /admin/usuarios
When the page renders with useUsers hook
Then the hook calls userService.list with page=1, pageSize=4
And the backend responds with 4 users
And React Query caches the response with key ['users', {page:1, pageSize:4, filters:{}}]
And the hook returns { data: {...}, isLoading: false, error: null }
And the component displays the 4 users
```

#### Scenario: Filter change - refetch automatically
```gherkin
Given the user has viewed the user list (cached)
When the user enters login filter "ADMIN" and clicks "Pesquisar"
Then the hook's `filters` parameter changes
And React Query detects the queryKey change
And the hook calls userService.list with page=1, pageSize=4, filters.login="ADMIN"
And the new result is cached with key ['users', {..., filters:{login:"ADMIN"}}]
And the table updates to show filtered users
```

#### Scenario: Pagination - navigate to page 2
```gherkin
Given the user is viewing page 1 of users
When the user clicks "Next Page" (page=2)
Then the hook's `page` parameter changes to 2
And the hook refetches userService.list with page=2
And the table updates with page 2 users
```

#### Scenario: Cache hit - same page accessed twice
```gherkin
Given the user viewed page 1 (cached, within 5-min stale time)
When the user navigates away and back to /admin/usuarios
Then the hook's queryKey remains ['users', {page:1, ...}]
And React Query returns cached data immediately
And no network call is made (0ms response)
And the component displays the same users instantly
```

#### Scenario: Stale time expired - refetch on access
```gherkin
Given the user viewed page 1 (cached 5 minutes ago)
When the user returns to /admin/usuarios after 5+ minutes
Then React Query marks the data as stale
And the hook returns cached data immediately
And in the background, refetches from backend (stale-while-revalidate pattern)
And the table updates with fresh data once response arrives
```

#### Scenario: Disable fetching conditionally
```gherkin
Given the component passes enabled=false to useUsers hook
When the page renders
Then the hook does not call userService.list
And the hook returns { data: undefined, isLoading: false }
And the component can conditionally fetch (e.g., only after user click)
```

#### Scenario: Backend returns error
```gherkin
Given userService.list throws HttpError(500)
When the hook detects the error
Then React Query marks the query as failed
And the hook returns { data: undefined, isLoading: false, error: HttpError(500) }
And the component displays error message "System temporarily unavailable"
```

---

### FR-102: useCreateUser Hook for Mutation

#### Requirement
The `useCreateUser` hook shall send create request via `userService.create()`, show optimistic updates (add user to list immediately), invalidate the user list on success, and handle errors with rollback.

#### Acceptance Criteria
- Hook accepts no required parameters
- Returns `{ mutate, mutateAsync, isPending, error, data }` (React Query mutation API)
- Mutation accepts `UserFormData` and calls `userService.create()`
- On success, invalidates query `['users', ...]` to trigger list refetch
- Supports optimistic updates: add new user to cache before server responds
- On error, reverts optimistic update and shows error message
- Retry logic via React Query (3 retries with exponential backoff for transient errors)

#### Scenario: Successfully create user (optimistic update)
```gherkin
Given the user fills create form and clicks "Salvar"
When the component calls mutate({ usuar_id: "NEWUSER", ... })
Then React Query immediately updates cache (optimistic): adds new user to list
And the table shows new user (perceived instant save)
And the hook calls userService.create() to backend
And backend returns HTTP 201 with created user
And the cache update is confirmed (no revert)
And success message shows "Usuário incluído com sucesso!"
```

#### Scenario: Create fails (optimistic update reverted)
```gherkin
Given the user fills create form and clicks "Salvar"
When the component calls mutate with data
And React Query optimistically adds user to list
And the backend returns HTTP 409 (duplicate login)
Then React Query reverts the optimistic update
And the table no longer shows the new user
And the hook returns error "Login already exists"
And the component displays the error message
```

#### Scenario: Network retry - transient error
```gherkin
Given userService.create() calls backend
When the backend times out (first attempt)
Then React Query automatically retries (2nd attempt)
And the retry uses exponential backoff (100ms, 200ms, 400ms)
And if retry succeeds, mutation completes normally
And if all retries fail, error is shown
```

#### Scenario: Handle 400 validation error gracefully
```gherkin
Given the user submits invalid data (bad email)
When the mutation calls userService.create()
And the backend returns HTTP 400 { error: "Invalid email" }
Then the mutation does not retry (4xx errors not retried)
And the hook returns error with server message
And the component shows field-specific error
```

---

### FR-103: useUpdateUser Hook for Mutation

#### Requirement
The `useUpdateUser` hook shall send update request via `userService.update()`, support optimistic updates, invalidate the user list on success, and handle errors with rollback.

#### Acceptance Criteria
- Hook accepts no required parameters
- Returns `{ mutate, mutateAsync, isPending, error, data }` (React Query mutation API)
- Mutation accepts `{ id: string, data: UserFormData }` and calls `userService.update(id, data)`
- On success, invalidates query `['users', ...]` to trigger list refetch
- Supports optimistic updates: update user in cache before server responds
- On error, reverts optimistic update
- Retry logic via React Query (3 retries for transient errors)

#### Scenario: Successfully update user (optimistic)
```gherkin
Given the user edits user "ADMIN" (changes name, email)
When the component calls mutate({ id: "ADMIN", data: {...} })
Then React Query immediately updates cache (optimistic)
And the table shows updated user name/email instantly
And the mutation calls userService.update("ADMIN", {...})
And backend returns HTTP 200 with updated user
And success message shows "Usuário alterado com sucesso!"
```

#### Scenario: Update fails (404 not found)
```gherkin
Given the user tries to update user "ADMIN"
When backend returns HTTP 404 (user deleted elsewhere)
Then React Query reverts optimistic update
And the user sees original data again
And error message "User not found"
And the user is prompted to refetch list
```

---

### FR-104: useDeleteUser Hook for Mutation

#### Requirement
The `useDeleteUser` hook shall send delete request via `userService.delete()`, handle multiple selections, invalidate the user list on success, and show confirmation before delete.

#### Acceptance Criteria
- Hook accepts no required parameters
- Returns `{ mutate, mutateAsync, isPending, error, data }`
- Mutation accepts array `userIds: string[]` and calls `userService.delete(userIds)`
- On success, invalidates query `['users', ...]` to trigger list refetch
- Supports optimistic updates: remove users from cache immediately
- Confirmation logic handled by component (hook does not force confirmation)
- Retry logic via React Query

#### Scenario: Delete single user with confirmation
```gherkin
Given the user selects user "OLDUSER"
When the user clicks "Excluir" button
And the component shows confirmation dialog
And the user clicks "Confirm"
Then the component calls mutate({ userIds: ["OLDUSER"] })
And React Query optimistically removes user from cache
And the table no longer shows "OLDUSER"
And the mutation calls userService.delete(["OLDUSER"])
And backend returns HTTP 200
And success message "Usuário excluído com sucesso!"
```

#### Scenario: Delete multiple users
```gherkin
Given users ["USER1", "USER2", "USER3"] are selected
When the user clicks "Excluir" and confirms
Then the component calls mutate({ userIds: ["USER1", "USER2", "USER3"] })
And React Query optimistically removes all 3 from cache
And the table hides all 3 users
And the mutation calls userService.delete([...])
And backend processes delete requests (serial)
And success message "3 usuários excluídos"
```

#### Scenario: Delete fails - partial success
```gherkin
Given users ["USER1", "USER2"] are selected
When user1 deletes successfully
And user2 delete fails (500 error)
Then the mutation throws error
And React Query reverts optimistic update for user2
And USER1 remains deleted from cache (not rolled back)
And error message "Failed to delete 1 user"
```

---

### FR-105: Query Invalidation Strategy

#### Requirement
All mutation hooks (`useCreateUser`, `useUpdateUser`, `useDeleteUser`) shall invalidate the user list query on success, triggering an automatic refetch of the entire list.

#### Acceptance Criteria
- Create/Update/Delete mutation success → invalidates query key `['users', ...]` (all user list queries)
- On invalidation, useUsers hook automatically refetches
- Refetch happens in background (doesn't block UI)
- Component receives fresh data via useUsers hook without manual refresh
- Table updates automatically with latest data

#### Scenario: Create user → list updates automatically
```gherkin
Given useUsers displays current user list
When useCreateUser mutation succeeds
Then mutation calls queryClient.invalidateQueries(['users', ...])
And React Query marks ['users', page:1, ...] as stale
And useUsers hook refetches in background
And the user list query refreshes without UI blocking
And the new user appears in the table
And the user sees "Usuário incluído com sucesso!" message
```

---

### FR-106: Error Handling in Hooks

#### Requirement
Hooks shall catch errors from service layer (HttpError, AbortError) and make them available to components via the `error` property. Errors shall include HTTP status and user-friendly message.

#### Acceptance Criteria
- HttpError exceptions are caught by React Query
- Error object includes status code and server message
- Component can extract error.status to distinguish error type
- AbortError (cancelled requests) are handled gracefully (no UI update)
- Error messages persist until user dismisses or retries

#### Scenario: Distinguish 4xx (client) vs 5xx (server) error
```gherkin
Given a mutation fails with HttpError(400, {...})
When the hook catches the error
Then the component can check error.status === 400
And display field-level validation error
And when mutation fails with HttpError(500)
Then the component can check error.status === 500
And display "System unavailable" generic message
```

---

## Dependencies

- **React Query (TanStack Query)**: useQuery, useMutation, useQueryClient
- **userService**: list, create, update, delete methods
- **User types**: User, UserFormData, UserListResponse, UserPaginationParams
- **HttpError class**: thrown by userService

## Testing Requirements

- Unit tests for each hook using React Query testing utilities (renderHook)
- Test successful data fetch, error handling, cache behavior
- Test mutation success, error, optimistic update, rollback
- Test query invalidation triggers refetch
- Mock userService.* methods (not HTTP directly)
- Mock React Query queryClient
- Test retry logic (simulate transient error + retry)

