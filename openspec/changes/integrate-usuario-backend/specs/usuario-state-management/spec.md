# Specification: User State Management

**Capability**: `usuario-state-management`  
**Change**: integrate-usuario-backend

## ADDED Requirements

### useUsers Hook for List Query
Hook provides automatic fetching, caching, and refetching of user list.

#### Scenario: Initial fetch and cache
**Given** user navigates to /admin/usuarios  
**When** UserRegistry component renders and useUsers hook initializes  
**Then** hook calls userService.list({page: 1, pageSize: 4, filters: {}})  
**And** data cached with queryKey ['users', {page: 1, pageSize: 4, filters: {}}]  
**And** hook returns {data: UserListResponse, isLoading: false, error: null}  
**And** component displays users

#### Scenario: Automatic refetch on page change
**Given** user list cached on page 1  
**When** user clicks "Next Page" (page changed to 2)  
**Then** hook detects queryKey change  
**And** automatically calls userService.list({page: 2, pageSize: 4})  
**And** new result cached separately  
**And** table updates with page 2 users

#### Scenario: Cache hit - stale-while-revalidate
**Given** user viewed page 1 (cached within 5-minute stale time)  
**When** user navigates away and back to /admin/usuarios  
**Then** React Query returns cached data immediately (0ms)  
**And** component displays page 1 users instantly  
**And** in background, refetch triggered  
**And** data refreshes after response arrives

### useCreateUser Hook for Create Mutation
Hook sends create request and invalidates list query on success.

#### Scenario: Create user with optimistic update
**Given** UserRegistry form filled with new user data  
**When** user clicks "Salvar" and mutation calls mutate(formData)  
**Then** React Query optimistically adds new user to cache immediately  
**And** table instantly shows new user  
**And** mutation calls userService.create(formData)  
**And** backend returns HTTP 201 with created user  
**And** mutation invalidates ['users', ...] query  
**And** useUsers hook refetches list in background  
**And** success toast shows "Usuário incluído com sucesso!"

#### Scenario: Create fails - optimistic update rolled back
**Given** mutation sent to backend  
**When** backend returns HTTP 409 (duplicate login)  
**Then** React Query onError callback reverts optimistic add  
**And** new user removed from table  
**And** hook returns error "Login already exists"  
**And** component displays error message

### useUpdateUser Hook for Update Mutation
Hook sends update request and invalidates list query on success.

#### Scenario: Update user with optimistic update
**Given** user "ADMIN" form edited  
**When** mutation calls mutate({id: "ADMIN", data: updatedData})  
**Then** React Query optimistically updates user in cache  
**And** table instantly shows updated name/email  
**And** mutation calls userService.update("ADMIN", data)  
**And** backend returns HTTP 200 with updated user  
**And** mutation invalidates ['users', ...] query  
**And** success toast shows "Usuário alterado com sucesso!"

### useDeleteUser Hook for Delete Mutation
Hook sends delete request and invalidates list query on success.

#### Scenario: Delete user with optimistic removal
**Given** user "OLDUSER" selected for deletion  
**When** user confirms and mutation calls mutate({userIds: ["OLDUSER"]})  
**Then** React Query optimistically removes user from cache  
**And** table no longer shows "OLDUSER"  
**And** mutation calls userService.delete(["OLDUSER"])  
**And** backend returns HTTP 200  
**And** mutation invalidates ['users', ...] query  
**And** success toast shows "Usuário excluído com sucesso!"

### Query Invalidation on Mutations
All mutations automatically invalidate and refetch user list query.

#### Scenario: Create triggers list refetch
**Given** useUsers hook has cached list query  
**When** useCreateUser mutation succeeds  
**Then** mutation calls queryClient.invalidateQueries(['users', ...])  
**And** React Query marks all user list queries as stale  
**And** useUsers hook automatically refetches in background  
**And** table updates with fresh data

### Retry Logic for Transient Errors
Mutations automatically retry on transient errors (5xx, timeout) but not on client errors (4xx).

#### Scenario: Transient 503 error - auto-retry succeeds
**Given** mutation calls backend  
**When** backend returns HTTP 503 (temporary unavailable)  
**Then** React Query retries after 100ms  
**And** backend still returns 503  
**Then** React Query retries after 200ms  
**And** backend returns HTTP 200 (success)  
**Then** mutation completes successfully  
**And** user sees success toast

#### Scenario: Validation error (400) - no retry
**Given** mutation sent with invalid data  
**When** backend returns HTTP 400  
**Then** React Query does NOT retry (4xx not retried)  
**And** error shown immediately  
**And** user corrects form and tries again

### Error Handling in Hooks
Hooks catch and expose errors from service layer.

#### Scenario: Distinguish error types by status
**Given** mutation fails with HttpError(400, {field: "email"})  
**When** component receives error  
**Then** component can check error.status === 400  
**And** display field-level validation error  
**And** when HttpError(500) received  
**Then** component checks error.status === 500  
**And** displays generic "System unavailable" message

## REMOVED Requirements

None. Hooks are new functionality.

