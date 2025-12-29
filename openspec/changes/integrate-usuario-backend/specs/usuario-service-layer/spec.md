# Specification: User Service Layer

**Capability**: `usuario-service-layer`  
**Change**: integrate-usuario-backend

## ADDED Requirements

### User List Service
Service provides `list()` method calling GET /api/usuarios with pagination and filters.

#### Scenario: Fetch users with pagination
**Given** user clicks "Pesquisar" button on /admin/usuarios  
**When** useUsers hook calls userService.list({page: 1, pageSize: 4, filters: {}})  
**Then** service calls GET /api/usuarios?page=1&pageSize=4  
**And** returns {sucesso: true, usuarios: [...], total: 42}  
**And** component displays 4 users in table

#### Scenario: Filter search by login
**Given** user enters login="ADMIN" in filter  
**When** list() called with {page: 1, pageSize: 4, filters: {login: "ADMIN"}}  
**Then** service calls GET /api/usuarios?page=1&pageSize=4&login=ADMIN  
**And** returns filtered users

### User Create Service
Service provides `create()` method calling POST /api/usuarios.

#### Scenario: Successfully create user
**Given** user fills form with login="NEWUSER", name="Test", email="test@example.com"  
**When** mutation calls userService.create(formData)  
**Then** service calls POST /api/usuarios with JSON body  
**And** returns {sucesso: true, usuario: {...}}  
**And** React Query invalidates user list query

#### Scenario: Duplicate login error
**Given** login "ADMIN" already exists  
**When** create({usuar_id: "ADMIN", ...})  
**Then** backend returns HTTP 409  
**And** service throws HttpError(409, {error: "Duplicate"})  
**And** component displays error

### User Update Service
Service provides `update()` method calling PUT /api/usuarios/{id}.

#### Scenario: Update existing user
**Given** user "ADMIN" exists  
**When** mutation calls userService.update("ADMIN", {name: "Admin User", ...})  
**Then** service calls PUT /api/usuarios/ADMIN with JSON body  
**And** returns updated User object  
**And** React Query invalidates user list query

#### Scenario: User not found
**Given** user "DELETED" was deleted by another user  
**When** update("DELETED", data)  
**Then** backend returns HTTP 404  
**And** service throws HttpError(404)  
**And** component shows error

### User Delete Service
Service provides `delete()` method calling DELETE /api/usuarios/{id} for each ID.

#### Scenario: Delete single user
**Given** user "OLDUSER" selected for deletion  
**When** mutation calls userService.delete(["OLDUSER"])  
**Then** service calls DELETE /api/usuarios/OLDUSER  
**And** returns {sucesso: true}  
**And** React Query invalidates user list query

#### Scenario: Delete multiple users serially
**Given** users ["USER1", "USER2", "USER3"] selected  
**When** delete(["USER1", "USER2", "USER3"])  
**Then** service calls DELETE /api/usuarios/USER1, waits, then USER2, then USER3  
**And** returns {sucesso: true} after all complete

### HTTP Error Handling
Service throws HttpError when HTTP status >= 400.

#### Scenario: Validation error (400)
**Given** service receives HTTP 400 response  
**When** service checks response.status  
**Then** throws HttpError(400, {message: "Bad Request", ...})  
**And** component extracts and displays field errors

#### Scenario: Server error (500)
**Given** backend experiences internal error  
**When** service receives HTTP 500 response  
**Then** throws HttpError(500, {message: "Internal Server Error"})  
**And** component shows "System temporarily unavailable"

### Request Cancellation Support
Service accepts AbortSignal parameter to cancel in-flight requests.

#### Scenario: Cancel request on component unmount
**Given** GET /api/usuarios request is in-flight (2+ seconds)  
**When** user navigates away from /admin/usuarios  
**Then** React Query calls abort() on request signal  
**And** HTTP request cancelled  
**And** no state update error occurs

## MODIFIED Requirements

### userService.list() connects to real backend
Service now calls real GET /api/usuarios instead of returning mock data.

#### Scenario: Backend data returned
**Given** userService.list({page: 1, pageSize: 4})  
**When** backend /api/usuarios is available  
**Then** service makes real HTTP GET request  
**And** response data comes from database  
**And** mock data no longer used

### userService.create/update/delete connect to real backend
Service now calls real POST/PUT/DELETE requests instead of mock responses.

## REMOVED Requirements

None. Service method interfaces remain unchanged.

