# Specification: User Error Handling & Resilience

**Capability**: `usuario-error-handling`  
**Change**: integrate-usuario-backend  
**Date**: 2025-12-29  
**Status**: Proposed

## Overview

Error handling and resilience ensures that the user management feature degrades gracefully under adverse conditions (network failures, backend errors, invalid input). Users receive clear feedback and can recover without data loss.

This capability covers:
1. HTTP-specific error messages (4xx vs 5xx)
2. Network resilience (timeout, retry, cancellation)
3. Validation error extraction
4. Error display in UI (toasts, inline messages)
5. Data recovery (form state persisted)

## ADDED Requirements

### FR-201: HTTP Status Code Handling

#### Requirement
The error handling layer shall map HTTP status codes to user-friendly messages and recovery actions:
- 400: Validation error (show field-specific messages from server)
- 401: Unauthorized (redirect to login)
- 403: Forbidden (show "Access Denied")
- 404: Not Found (show "User not found" or refetch list)
- 409: Conflict (show "Login already exists" or "Email already in use")
- 500/503: Server Error (show "System temporarily unavailable, try again later")
- Timeout: Show "Network connection timeout"

#### Acceptance Criteria
- Service layer throws HttpError with status code
- Components can check error.status to distinguish type
- Default error message provided for each status code
- Server error payload (if available) is extracted and shown
- Error messages are localized (PT-BR) in frontend
- No raw HTTP status codes shown to user

#### Scenario: 400 Validation Error - show field-specific message
```gherkin
Given the user submits create form with invalid email "invalid-email"
When userService.create() calls backend
And backend returns HTTP 400 { email: "Email format invalid" }
Then the component catches HttpError(400, { email: "..." })
And extracts the field error from server payload
And displays inline error near email field "Email format invalid"
And the "Salvar" button remains visible for correction
```

#### Scenario: 409 Conflict - duplicate login
```gherkin
Given login "ADMIN" already exists
When the user tries to create new user with login="ADMIN"
And backend returns HTTP 409 { error: "Duplicate login" }
Then the component shows error message "Login ADMIN already exists"
And the user can modify the login and retry "Salvar"
```

#### Scenario: 404 Not Found - user deleted elsewhere
```gherkin
Given user "ADMIN" exists in the list
When the user clicks "Editar" for that user
And the edit form loads
And backend returns 404 when trying to save (user deleted by another user)
Then the component shows error "User not found"
And the component offers to "Refresh list" to sync
And clicking refresh reloads the user list
```

#### Scenario: 500 Server Error - generic message
```gherkin
Given the backend encounters an unhandled exception
When userService.create() calls POST /api/usuarios
And backend returns HTTP 500 { error: "Internal Server Error" }
Then the component shows generic message "System error. Please try again later."
And does NOT show raw server error details to user
And includes technical error in browser console (development only)
And offers "Retry" button to try again
```

#### Scenario: Network timeout (30+ seconds)
```gherkin
Given the backend is completely unavailable or very slow
When userService.list() call exceeds 30-second timeout
Then axios throws TimeoutError
And the component shows "Network connection timeout. Please check your connection."
And React Query retries automatically (up to 3 times)
And if all retries fail, error remains visible
```

---

### FR-202: Validation Error Extraction

#### Requirement
The error handling layer shall extract field-level validation errors from the server response (if structured as `{ fieldName: "error message" }`) and make them available to components for inline display.

#### Acceptance Criteria
- When backend returns HTTP 400 with error payload
- Parse error payload structure (flat object or nested)
- Extract field-specific error messages
- Components can access error.data.fieldName or error.data.errors
- Fallback to generic message if structure is unknown
- Multiple validation errors per field are concatenated

#### Scenario: Extract and display field errors
```gherkin
Given backend returns HTTP 400 { email: "Invalid format", telefone: "Must be 10-20 characters" }
When the component catches HttpError(400, data)
Then the component can read error.data.email and error.data.telefone
And display near respective form fields
And the form highlights invalid fields with red border
And the user can correct and resubmit
```

---

### FR-203: Optimistic Update Rollback on Error

#### Requirement
When mutations with optimistic updates fail, the UI shall revert to the previous state (before the optimistic change) and display the error.

#### Acceptance Criteria
- React Query mutation onError callback reverts optimistic update
- Previous state is restored to cache
- Component receives updated data via hook
- Error message is displayed alongside the reverted state
- User can retry the operation

#### Scenario: Create user fails - optimistic add is rolled back
```gherkin
Given the user creates new user "NEWUSER"
When React Query optimistically adds user to list immediately
Then table shows "NEWUSER" before backend response
And backend returns HTTP 500 (error)
Then React Query onError callback reverts the cache
And "NEWUSER" is removed from the table
And error message "Failed to create user" is shown
And the user can retry the "Salvar" action
```

#### Scenario: Delete user fails - removed user restored
```gherkin
Given the user selects user "ADMIN" for deletion
When React Query optimistically removes "ADMIN" from list
Then table no longer shows "ADMIN"
And backend returns HTTP 403 (insufficient permission)
Then React Query reverts the optimistic delete
And "ADMIN" reappears in the table
And error message "You do not have permission to delete this user"
```

---

### FR-204: Request Cancellation Handling

#### Requirement
When a component unmounts or request is aborted, the error (AbortError) shall not cause state update errors or break the UI.

#### Acceptance Criteria
- React Query hooks use AbortSignal to cancel in-flight requests
- When signal is aborted (user navigates away), request is cancelled
- AbortError is caught internally; no exception bubbles up
- No "Can't perform state update on unmounted component" warning
- UI remains clean if user quickly switches pages

#### Scenario: Navigate away during list load
```gherkin
Given user is viewing /admin/usuarios and list is loading
When the user clicks navigation link and leaves the page
Then React Query calls abort() on the request signal
And the backend request is cancelled (HTTP 0 / connection closed)
And no state update error occurs
And the new page loads cleanly
```

---

### FR-205: Retry Strategy for Transient Errors

#### Requirement
React Query shall automatically retry transient errors (5xx, timeout) up to 3 times with exponential backoff before showing error to user.

#### Acceptance Criteria
- Mutations retry on HTTP 5xx (server error)
- Mutations retry on timeout
- Mutations do NOT retry on HTTP 4xx (client error)
- Retry delay: 1st retry 100ms, 2nd 200ms, 3rd 400ms
- User sees loading state during retries
- After 3 failed retries, error is shown
- User can manually retry via button click

#### Scenario: Transient 503 error - auto-retry succeeds
```gherkin
Given userService.create() calls backend
When backend returns HTTP 503 (service temporarily unavailable)
Then React Query retries (1st retry after 100ms)
And backend still returns 503
Then React Query retries (2nd retry after 200ms)
And backend returns HTTP 201 (success)
Then mutation succeeds as if no error occurred
And user sees "Usuário incluído com sucesso!"
```

#### Scenario: Validation error (400) - no retry
```gherkin
Given userService.create() calls backend with invalid data
When backend returns HTTP 400 (validation error)
Then React Query does NOT retry (4xx errors not retried)
And error is shown immediately "Email is required"
And user corrects the form and tries again
```

---

### FR-206: Error Message Display in UI

#### Requirement
Components shall display errors to users via toast notifications (success/error) or inline field messages (validation errors).

#### Acceptance Criteria
- Success messages: Toast at top-right for 3 seconds ("Usuário incluído com sucesso!")
- Error messages: Toast at top-right for 5 seconds or until dismissed
- Validation errors: Inline near form fields (red text + highlight)
- System errors: Modal or persistent message at top of form
- Multiple errors: Show all (toast may queue them)
- Error messages are clear and actionable (not technical jargon)

#### Scenario: Show success toast after create
```gherkin
Given user successfully creates a user
When userService.create() returns User object
Then mutation onSuccess fires
And component shows toast notification
With text "Usuário incluído com sucesso!"
And auto-dismisses after 3 seconds
```

#### Scenario: Show error toast with retry button
```gherkin
Given user tries to delete but gets HTTP 500 error
When mutation onError fires
Then component shows toast notification
With text "Failed to delete user"
And includes "Retry" button
And stays visible until user dismisses or clicks Retry
```

#### Scenario: Show inline validation error
```gherkin
Given user submits form with invalid email
When component receives HttpError(400, { email: "Invalid" })
Then component displays error near email field
With red border and text "Email format is invalid"
And user focuses on email field to correct it
```

---

### FR-207: Form State Persistence (Recovery)

#### Requirement
When an error occurs during create/update, the form data shall be preserved in component state (or localStorage) so the user does not lose their input.

#### Acceptance Criteria
- Form data is held in component state while editing
- If save fails, form data remains visible and editable
- User can correct the error and retry without re-entering data
- Optional: form data persisted to sessionStorage for page reload recovery

#### Scenario: Form data preserved after validation error
```gherkin
Given the user fills create form with data and clicks "Salvar"
And backend returns HTTP 400 (validation error)
Then the form data is still visible in all fields
And the user can read the error message and correct the field
And click "Salvar" again without re-entering all data
```

---

### FR-208: Logging and Observability

#### Requirement
All errors shall be logged to browser console (development) and optionally to error tracking service (production ready).

#### Acceptance Criteria
- HttpError exceptions logged with status, URL, payload
- Request/response details included (method, endpoint, timestamp)
- Sensitive data (passwords, PII) redacted before logging
- Development: verbose console logs; Production: error tracking service ready
- Components log component-level errors (render errors, mutation failures)

#### Scenario: Log 500 error for debugging
```gherkin
Given backend returns HTTP 500 Internal Server Error
When userService throws HttpError(500, payload)
Then console.error logs:
  - Timestamp
  - HTTP status 500
  - URL (POST /api/usuarios)
  - Request body (without passwords)
  - Response body (server error details)
And this helps developers debug the issue
```

---

## Dependencies

- **Service layer (usuario-service-layer)**: throws HttpError
- **Hooks (usuario-state-management)**: catch errors, support onError callbacks
- **Component library**: toast notification component
- **React**: error boundary (for render errors)

## Testing Requirements

- Unit tests for error handling logic (status code → message mapping)
- Integration tests for component error display (show/dismiss toasts, inline errors)
- Tests for optimistic update rollback
- Tests for request cancellation (AbortError)
- Tests for retry logic (mock transient error, verify retries)
- Tests for form data preservation (data remains visible after error)
- Snapshot tests for error message strings (PT-BR)

## Edge Cases

1. **No network**: Service throws error (connection refused) - show "Network unavailable"
2. **CORS error**: Browser blocks request - show generic error (no details exposed)
3. **Server error without body**: HTTP 500 with empty response - show generic message
4. **Multiple errors**: User tries operation, fails, tries again immediately - queue errors or combine into single message
5. **Error during error recovery**: Rare edge case - log and show simplified error

