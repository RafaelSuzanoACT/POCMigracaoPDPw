# Specification: User Service Layer

**Capability**: `usuario-service-layer`  
**Change**: integrate-usuario-backend  
**Date**: 2025-12-29  
**Status**: Proposed

## Overview

The User Service Layer is the centralized, single-point-of-truth for all HTTP communication with the backend `/api/usuarios` endpoints. It encapsulates request building, response parsing, error handling, and request lifecycle (cancellation, retry).

All user management operations (list, create, update, delete) flow through this service; components and React Query hooks never call APIs directly.

## ADDED Requirements

### FR-001: User List Service with Pagination & Filters

#### Requirement
The service shall provide an async method `list()` that fetches users from `GET /api/usuarios` with support for pagination (page, pageSize) and optional filters (login, nome, email, telefone).

#### Acceptance Criteria
- Method accepts `UserPaginationParams` (page, pageSize, filters)
- Maps frontend filter names to backend query parameter names
- Appends query params to URL (e.g., `?page=1&pageSize=4&login=admin`)
- Returns `UserListResponse` with users array and total count
- Throws `HttpError` on HTTP error status (400, 401, 403, 404, 5xx)
- Supports AbortSignal for request cancellation
- Timeout enforced at 30 seconds (ApiClient default)

#### Scenario: Happy path - fetch first page of users
```gherkin
Given the user is on the User Registry page
When the user clicks "Pesquisar" button
Then the service calls GET /api/usuarios?page=1&pageSize=4
And the response contains a list of users (e.g., 4 users, total=42)
And the method returns { sucesso: true, usuarios: [...], total: 42 }
And the component displays users in the table
```

#### Scenario: Filtered search - fetch users by login
```gherkin
Given the user enters "ADMIN" in the login filter
When the user clicks "Pesquisar"
Then the service calls GET /api/usuarios?page=1&pageSize=4&login=ADMIN
And the response filters to users with login containing "ADMIN"
And the table updates with filtered results
```

#### Scenario: Backend returns 400 (validation error)
```gherkin
Given invalid page number (page=-1)
When the service calls list with page=-1
Then the backend responds HTTP 400
And the method throws HttpError(400, { error: "..." })
And the component catches error and shows error message
```

#### Scenario: Network timeout (30+ seconds)
```gherkin
Given the backend is slow or unavailable
When the service makes GET /api/usuarios
And the request exceeds 30-second timeout
Then the service throws HttpError(timeout)
And the component shows "Network connection timeout"
```

---

### FR-002: User Create Service

#### Requirement
The service shall provide an async method `create()` that sends `POST /api/usuarios` with user data (login, name, email, phone) and returns the created user.

#### Acceptance Criteria
- Method accepts `UserFormData` (usuar_id, usuar_nome, usuar_email, usuar_telefone)
- Sends JSON body to POST /api/usuarios
- Returns the created User object (includes any server-generated fields if applicable)
- Returns success response with user data
- Throws `HttpError` on failure (400 validation, 409 duplicate, 500 server error)
- Supports AbortSignal for cancellation

#### Scenario: Successfully create a new user
```gherkin
Given the user fills form with login="NEWUSER", name="New User", email="new@test.com", phone="1199999999"
When the user clicks "Salvar"
Then the service calls POST /api/usuarios with the form data
And the backend returns HTTP 201 with created user
And the method returns { sucesso: true, usuario: {...} }
And the component shows success message "Usuário incluído com sucesso!"
And the list is automatically refreshed (via React Query invalidation)
```

#### Scenario: Duplicate login (409 Conflict)
```gherkin
Given login "ADMIN" already exists
When the user tries to create user with login="ADMIN"
Then the service calls POST /api/usuarios
And the backend returns HTTP 409 { error: "Duplicate login" }
And the method throws HttpError(409, ...)
And the component shows user-friendly error "Login already exists"
```

#### Scenario: Validation error (400 Bad Request)
```gherkin
Given the user enters invalid email "not-an-email"
When the user clicks "Salvar"
Then the service calls POST /api/usuarios
And the backend returns HTTP 400 { errors: { email: "Invalid email" } }
And the method throws HttpError(400, ...)
And the component extracts field errors and displays them
```

---

### FR-003: User Update Service

#### Requirement
The service shall provide an async method `update()` that sends `PUT /api/usuarios/{id}` with updated user data and returns the updated user.

#### Acceptance Criteria
- Method accepts (id: string, data: UserFormData)
- Sends JSON body to PUT /api/usuarios/{id}
- Returns the updated User object
- Throws `HttpError` on failure (400 validation, 404 not found, 500 server error)
- Supports AbortSignal for cancellation

#### Scenario: Successfully update existing user
```gherkin
Given user "ADMIN" exists
When the user edits the user and clicks "Salvar"
Then the service calls PUT /api/usuarios/ADMIN with updated fields
And the backend returns HTTP 200 with updated user
And the method returns { sucesso: true, usuario: {...} }
And the component shows success message "Usuário alterado com sucesso!"
And the list is automatically refreshed
```

#### Scenario: User not found (404)
```gherkin
Given user with ID "NONEXISTENT" does not exist
When the service tries to update /api/usuarios/NONEXISTENT
Then the backend returns HTTP 404
And the method throws HttpError(404, ...)
And the component shows error "User not found"
And the list is refetched (user may have been deleted elsewhere)
```

---

### FR-004: User Delete Service

#### Requirement
The service shall provide an async method `delete()` that sends `DELETE /api/usuarios/{id}` and returns success/failure response.

#### Acceptance Criteria
- Method accepts array of IDs (userIds: string[])
- Sends DELETE request to /api/usuarios/{id} for each ID (serial)
- Returns response with success flag
- Throws `HttpError` on failure
- Supports AbortSignal for cancellation

#### Scenario: Successfully delete single user
```gherkin
Given user "OLDUSER" is selected for deletion
When the user clicks "Excluir" and confirms
Then the service calls DELETE /api/usuarios/OLDUSER
And the backend returns HTTP 200 or 204
And the method returns { sucesso: true }
And the component shows success message "Usuário excluído com sucesso!"
And the list is automatically refreshed (user removed)
```

#### Scenario: Delete multiple users (serial)
```gherkin
Given users ["USER1", "USER2", "USER3"] are selected
When the user clicks "Excluir" and confirms
Then the service calls DELETE /api/usuarios/USER1
And waits for success
And then calls DELETE /api/usuarios/USER2
And waits for success
And then calls DELETE /api/usuarios/USER3
And the method returns { sucesso: true } after all complete
And the list is refreshed with remaining users
```

#### Scenario: Partial failure during multi-delete
```gherkin
Given users ["USER1", "USER2"] are selected
When the service deletes USER1 successfully
And then tries to delete USER2 (backend returns 500)
Then the method throws HttpError(500)
And the component shows error "Failed to delete user(s)"
And USER1 remains deleted (not rolled back)
And the user can retry deleting USER2
```

---

### FR-005: HTTP Error Handling

#### Requirement
The service shall catch all HTTP error status codes and throw typed `HttpError` exceptions with status and optional error payload, enabling components to distinguish error types.

#### Acceptance Criteria
- All service methods check response.status and throw HttpError if >= 400
- HttpError includes status code and server error body (if available)
- Service does NOT swallow errors; errors propagate to caller
- Service includes no retry logic (React Query handles retries)
- All HTTP errors are logged to console in development

#### Scenario: HTTP 4xx error (client error)
```gherkin
Given a service call returns HTTP 400
When the method checks response.status
Then it throws HttpError(400, { message: "Bad Request", ...})
And the error includes the server error body
And the component catches the error and displays user-friendly message
```

#### Scenario: HTTP 5xx error (server error)
```gherkin
Given the backend returns HTTP 500 (Internal Server Error)
When the service checks response.status
Then it throws HttpError(500, { message: "Internal Server Error" })
And the error is logged to console
And the component shows user message "System temporarily unavailable"
```

---

### FR-006: Request Cancellation Support

#### Requirement
The service shall accept an optional `AbortSignal` parameter (via axios config) and pass it to all HTTP calls, enabling components to cancel in-flight requests on unmount or navigation.

#### Acceptance Criteria
- Each service method accepts optional `signal: AbortSignal`
- Signal is passed to apiClient calls via axios config
- When signal is aborted, axios throws AbortError
- Service does NOT handle AbortError (lets it propagate)
- React Query hooks handle AbortError gracefully (no UI update on unmount)

#### Scenario: Component unmounts while list is loading
```gherkin
Given a GET /api/usuarios request is in-flight (2 seconds elapsed)
When the user navigates away from /admin/usuarios
Then React Query calls abort() on the request signal
And the in-flight request is cancelled
And no state update occurs (prevents memory leak warning)
And the next page loads cleanly
```

---

## MODIFIED Requirements

### FR-007: userService.list() now connects to backend (modified from mock)

#### Previous Behavior
- Returned mock user data
- No network call

#### New Behavior
- Makes real HTTP GET /api/usuarios request
- Returns backend response
- Falls back to error response on failure
- Maintains same interface (UserListResponse)

#### Scenario: Verify backend connection
```gherkin
Given userService.list is called
When the backend /api/usuarios is available
Then the method makes a real HTTP GET request
And the response comes from the database
And mock data is no longer used
```

---

### FR-008: userService.create/update/delete connect to backend (modified from mock)

#### Previous Behavior
- Returned mock success response

#### New Behavior
- Makes real HTTP POST/PUT/DELETE requests
- Returns backend response
- Throws on error
- Maintains same interface (UserOperationResponse)

---

## REMOVED Requirements

None. The service interface remains stable; only the implementation changes from mock to real HTTP.

## Dependencies

- **APIClient**: existing axios wrapper; provides HTTP methods (get, post, put, delete)
- **UserFormData, User, UserListResponse types**: existing; no changes needed
- **HttpError class**: NEW (defined in this capability)

## Edge Cases & Constraints

1. **Empty user list**: Backend returns `{ usuarios: [], total: 0 }` - valid response
2. **Large page numbers**: Backend may return empty list or 404 - handled as valid
3. **Special characters in filters**: Frontend should URL-encode; axios does this automatically
4. **Rate limiting**: Backend may return HTTP 429 - service throws HttpError(429); React Query honors Retry-After header if present (future enhancement)
5. **Session expiration**: Backend returns 401 - component redirects to login (future implementation)

## Testing Requirements

- Unit tests for each service method using mocked axios
- Test both success and error paths (400, 401, 403, 404, 409, 500, 503, timeout)
- Test request cancellation (AbortSignal)
- Test query param building (filter mapping)
- Verify HttpError is thrown with correct status and payload

