# Specification: User Error Handling & Resilience

**Capability**: `usuario-error-handling`  
**Change**: integrate-usuario-backend

## ADDED Requirements

### HTTP Status Code Mapping to User Messages
Errors mapped to user-friendly messages based on HTTP status.

#### Scenario: 400 Validation error with field message
**Given** backend returns HTTP 400 {email: "Invalid format"}  
**When** service throws HttpError(400, data)  
**And** component catches error  
**Then** component extracts error.data.email  
**And** displays inline error near email field "Email format is invalid"  
**And** user can correct and retry

#### Scenario: 409 Conflict - duplicate login
**Given** backend returns HTTP 409 {error: "Duplicate login"}  
**When** component receives HttpError(409)  
**Then** shows user message "Login ADMIN already exists"  
**And** user modifies login and retries

#### Scenario: 500 Server error - generic message
**Given** backend returns HTTP 500  
**When** component receives HttpError(500)  
**Then** displays "System error. Please try again later."  
**And** does NOT show raw error details to user  
**And** technical error logged to console (dev only)

#### Scenario: Network timeout
**Given** backend unavailable for 30+ seconds  
**When** axios throws TimeoutError  
**Then** component shows "Network connection timeout"  
**And** React Query retries automatically  
**And** if all retries fail, error persists

### Form Data Preservation After Error
Form data remains visible after failed save, enabling correction without re-entry.

#### Scenario: Form data preserved after validation error
**Given** user fills create form with data  
**When** user clicks "Salvar" and backend returns HTTP 400  
**Then** form data remains visible in all fields  
**And** error message shown below form  
**And** user reads error and corrects the field  
**And** clicks "Salvar" again without re-entering all data

### Optimistic Update Rollback on Error
UI reverts optimistic changes when backend returns error.

#### Scenario: Optimistic delete rolled back
**Given** React Query optimistically removes user from table  
**When** backend returns HTTP 403 (insufficient permission)  
**Then** React Query onError callback reverts the cache  
**And** user reappears in table  
**And** error message "You do not have permission to delete"  
**And** user sees previous state restored

### Request Cancellation Handling
Cancelled requests handled gracefully without state update errors.

#### Scenario: Navigation during fetch cancels request
**Given** GET /api/usuarios request in-flight  
**When** user navigates to different page  
**Then** React Query calls abort() on signal  
**And** request cancelled by browser  
**And** no "Can't perform state update on unmounted component" warning  
**And** new page loads cleanly

### Error Display in UI - Toast Notifications
Errors shown via dismissible toast notifications.

#### Scenario: Show error toast with retry button
**Given** user tries to create and gets HTTP 500  
**When** mutation onError fires  
**Then** component shows toast notification  
**With** text "Failed to create user"  
**And** includes "Retry" button  
**And** stays visible until user dismisses or clicks Retry

### Validation Error Extraction
Field-level errors extracted from server 400 response and displayed inline.

#### Scenario: Extract and display field errors
**Given** backend returns HTTP 400 {email: "Invalid", telefone: "Too short"}  
**When** component catches HttpError(400, data)  
**Then** component reads error.data.email and error.data.telefone  
**And** displays near respective form fields  
**And** form highlights invalid fields with red border  
**And** user corrects and resubmits

### Logging and Observability
All errors logged to console for debugging.

#### Scenario: Log 500 error with context
**Given** backend returns HTTP 500  
**When** service throws HttpError(500)  
**And** error handler logs to console.error  
**Then** log includes timestamp, HTTP 500, URL, method, response body  
**And** sensitive data (passwords) redacted  
**And** developers can debug via browser console

## REMOVED Requirements

None. Error handling is new functionality.

