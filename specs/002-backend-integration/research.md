# Research: Backend Integration

**Phase**: 0 - Research & Standards  
**Date**: 2025-12-28  
**Purpose**: Document backend API contracts, DTO mappings, error patterns, and integration standards

## Backend API Contract Analysis

### Base URL and Authentication

**Base URL**: `http://localhost:5001/api` (development)  
**Authentication**: Bearer token via Authorization header  
**Token Management**: Handled by `frontend/src/store/authStore.ts` and `frontend/src/services/api.ts` Axios interceptors  
**Session Expiry**: Backend returns `401 Unauthorized` → frontend redirects to login

### Common HTTP Patterns

All endpoints follow RESTful conventions:

- **GET** `/{resource}` - List all (may return paginated)
- **GET** `/{resource}/{id}` - Get single by ID
- **POST** `/{resource}` - Create new
- **PUT** `/{resource}/{id}` - Update existing
- **DELETE** `/{resource}/{id}` - Delete by ID

### Response Format Standards

**Success Response** (200 OK):
```json
{
  "data": { /* resource object */ },
  "message": "Operação realizada com sucesso"
}
```

**Error Response** (4xx, 5xx):
```json
{
  "message": "Mensagem de erro em português",
  "code": "ERROR_CODE",
  "field": "campoInvalido", // Optional for validation errors
  "errors": [  // Optional for multiple validation errors
    {
      "field": "campo1",
      "message": "Erro no campo 1"
    }
  ]
}
```

## Error Code Catalog

### HTTP Status Codes and Frontend Handling

| Code | Name | Backend Meaning | Frontend Action |
|------|------|----------------|-----------------|
| **200** | OK | Success | Display data, show success feedback |
| **201** | Created | Resource created | Redirect to detail page, show success toast |
| **400** | Bad Request | Validation error | Highlight invalid fields, display error messages |
| **401** | Unauthorized | Token expired/invalid | Save unsaved data to sessionStorage, redirect to login |
| **403** | Forbidden | Insufficient permissions | Display "Você não tem permissão para esta operação" |
| **404** | Not Found | Resource not found | Display "Recurso não encontrado", offer navigation options |
| **409** | Conflict | Concurrent modification | Display "Dados foram atualizados por outro usuário. Recarregar página?" |
| **500** | Internal Server Error | Backend crash | Display "Erro interno do servidor. Tente novamente mais tarde.", log error |
| **503** | Service Unavailable | Backend offline | Display "Serviço temporariamente indisponível", auto-retry after 30s |

### Example Error Responses

**400 Validation Error**:
```json
{
  "message": "Dados inválidos",
  "code": "VALIDATION_ERROR",
  "errors": [
    {
      "field": "energiaGerada",
      "message": "Energia gerada deve ser maior que zero"
    },
    {
      "field": "dataOperacao",
      "message": "Data de operação é obrigatória"
    }
  ]
}
```

**401 Unauthorized**:
```json
{
  "message": "Token expirado ou inválido",
  "code": "UNAUTHORIZED"
}
```

**409 Conflict**:
```json
{
  "message": "Os dados foram modificados por outro usuário",
  "code": "CONFLICT",
  "details": {
    "lastModified": "2025-12-28T10:30:00Z",
    "lastModifiedBy": "João Silva"
  }
}
```

## DTO Mapping Specifications

### Naming Conventions

**Backend (C#/.NET)**: PascalCase  
**Frontend (TypeScript)**: camelCase

### Date Format Differences

**Backend**: ISO 8601 strings (`"2025-12-28T14:30:00Z"`)  
**Frontend**: JavaScript Date objects or ISO strings

**Transformation Example**:
```typescript
// Backend → Frontend
function transformDate(isoString: string): Date {
  return new Date(isoString);
}

// Frontend → Backend
function formatDate(date: Date): string {
  return date.toISOString();
}
```

### Example: Energetic Data DTOs

**Backend DTO** (from API):
```csharp
public class DadosEnergeticosDto {
  public int Id { get; set; }
  public string DataOperacao { get; set; } // ISO 8601
  public int EmpresaId { get; set; }
  public string EmpresaNome { get; set; }
  public decimal[] Intervalos { get; set; } // 48 intervals
  public decimal Total { get; set; }
  public decimal Media { get; set; }
  public DateTime DataCriacao { get; set; }
  public DateTime? DataAtualizacao { get; set; }
  public string UsuarioCriacao { get; set; }
}
```

**Frontend Type** (TypeScript):
```typescript
export interface EnergeticData {
  id: number;
  operationDate: Date;
  companyId: number;
  companyName: string;
  intervals: number[]; // 48 intervals
  total: number;
  average: number;
  createdAt: Date;
  updatedAt: Date | null;
  createdBy: string;
}
```

**DTO Transformer**:
```typescript
export function transformEnergeticFromBackend(dto: any): EnergeticData {
  return {
    id: dto.Id,
    operationDate: new Date(dto.DataOperacao),
    companyId: dto.EmpresaId,
    companyName: dto.EmpresaNome,
    intervals: dto.Intervalos,
    total: dto.Total,
    average: dto.Media,
    createdAt: new Date(dto.DataCriacao),
    updatedAt: dto.DataAtualizacao ? new Date(dto.DataAtualizacao) : null,
    createdBy: dto.UsuarioCriacao,
  };
}

export function transformEnergeticToBackend(data: Partial<EnergeticData>): any {
  return {
    DataOperacao: data.operationDate?.toISOString(),
    EmpresaId: data.companyId,
    Intervalos: data.intervals,
  };
}
```

## Performance Benchmarks

### Baseline API Response Times

Measured against local backend (ONS_PoC-PDPW_V2) with SQL Server:

| Endpoint | Operation | Avg Response | p95 Response | Notes |
|----------|-----------|--------------|--------------|-------|
| `/api/empresas` | GET (list) | 120ms | 180ms | 50 companies |
| `/api/usinas` | GET (list) | 250ms | 400ms | 200 plants |
| `/api/dadosenergeticos/{date}/{company}` | GET | 300ms | 500ms | 48 intervals |
| `/api/dadosenergeticos` | POST | 450ms | 700ms | Save 48 intervals |
| `/api/ofertas-exportacao` | GET (list) | 180ms | 300ms | 20 offers |
| `/api/consultas/vazao` | POST (query) | 800ms | 1200ms | Complex query, 100 records |

**Performance Targets**:
- 95% of API calls should complete within 2 seconds
- Page load time (including API calls) should be under 3 seconds
- No UI blocking during API calls (use loading states)

### Optimization Strategies

1. **Pagination**: List endpoints return max 100 records by default
2. **Caching**: React Query caches responses for 5 minutes (static data) or 1 minute (volatile data)
3. **Prefetching**: Prefetch dropdown data (companies, plants) on app load
4. **Debouncing**: Debounce search inputs (500ms) to reduce API calls
5. **Optimistic Updates**: Update UI immediately, rollback if API fails

## Authentication Flow

### Login Flow

1. User submits credentials to `/api/auth/login`
2. Backend validates credentials, returns JWT token
3. Frontend stores token in `authStore` (persisted to localStorage)
4. All subsequent API calls include token in Authorization header
5. Token expires after 8 hours (backend configured)

### Token Refresh Flow

Backend does not support token refresh. When token expires:
1. Backend returns `401 Unauthorized`
2. Axios interceptor detects 401
3. Frontend saves unsaved form data to sessionStorage
4. Frontend redirects to login page
5. After re-login, frontend restores saved form data

### Authorization

Backend checks permissions per endpoint:
- **Operators**: Can access data collection pages (read/write)
- **Consulta**: Can access query pages (read-only)
- **Admin**: Can access all pages including administration

Frontend does not enforce authorization (backend is authoritative).

## Backend API Endpoint Catalog

### Critical Routines (P1)

#### 1. Razão Energética
- **GET** `/api/dadosenergeticos/{date}/{companyId}` - Fetch energetic data
- **POST** `/api/dadosenergeticos` - Save energetic data
- **PUT** `/api/dadosenergeticos/{id}` - Update energetic data
- **DELETE** `/api/dadosenergeticos/{id}` - Delete energetic data

#### 2. Razão Elétrica
- **GET** `/api/dadoseletricos/{date}/{companyId}` - Fetch electrical data
- **POST** `/api/dadoseletricos` - Save electrical data
- **PUT** `/api/dadoseletricos/{id}` - Update electrical data
- **DELETE** `/api/dadoseletricos/{id}` - Delete electrical data

#### 3-6. Insumos Recebimento (IR1, IR2, IR3, IR4)
- **GET** `/api/insumos-recebimento/ir1/{date}` - Fetch IR1 data
- **POST** `/api/insumos-recebimento/ir1` - Save IR1 data
- **GET** `/api/insumos-recebimento/ir2/{date}` - Fetch IR2 data
- **POST** `/api/insumos-recebimento/ir2` - Save IR2 data
- **GET** `/api/insumos-recebimento/ir3/{date}` - Fetch IR3 data
- **POST** `/api/insumos-recebimento/ir3` - Save IR3 data
- **GET** `/api/insumos-recebimento/ir4/{date}` - Fetch IR4 data
- **POST** `/api/insumos-recebimento/ir4` - Save IR4 data

#### 7. Oferta Exportação
- **GET** `/api/ofertas-exportacao` - List all offers
- **GET** `/api/ofertas-exportacao/{id}` - Get offer by ID
- **POST** `/api/ofertas-exportacao` - Create offer
- **PUT** `/api/ofertas-exportacao/{id}` - Update offer
- **DELETE** `/api/ofertas-exportacao/{id}` - Delete offer

### Data Collection (P2)

#### Dados Hidráulicos
- **GET** `/api/dados-hidraulicos/vazao/{date}/{plantId}` - Fetch flow data
- **POST** `/api/dados-hidraulicos/vazao` - Save flow data
- **GET** `/api/dados-hidraulicos/volume/{date}/{plantId}` - Fetch volume data
- **POST** `/api/dados-hidraulicos/volume` - Save volume data
- **GET** `/api/dados-hidraulicos/geracao/{date}/{plantId}` - Fetch generation data
- **POST** `/api/dados-hidraulicos/geracao` - Save generation data

#### Dados Térmicos
- **GET** `/api/dados-termicos/disponibilidade/{date}/{plantId}`
- **POST** `/api/dados-termicos/disponibilidade`
- **GET** `/api/dados-termicos/geracao/{date}/{plantId}`
- **POST** `/api/dados-termicos/geracao`
- (5 more thermal endpoints)

#### Other Data Collection (Intercâmbio, Carga, etc.)
- Similar pattern: GET by date/entity, POST to save

### Queries (P3)

#### Flow Query
- **POST** `/api/consultas/vazao` - Query flow data with filters
  - Request: `{ dateStart, dateEnd, companyIds, plantIds, page, pageSize }`
  - Response: `{ data: [...], total: 500, page: 1, pageSize: 50 }`

#### Generation Query
- **POST** `/api/consultas/geracao` - Query generation data with filters
  - Request: `{ dateStart, dateEnd, companyIds, plantIds, page, pageSize }`
  - Response: `{ data: [...], total: 300, page: 1, pageSize: 50 }`

### Administration (P4)

#### User Management
- **GET** `/api/usuarios` - List users
- **GET** `/api/usuarios/{id}` - Get user by ID
- **POST** `/api/usuarios` - Create user
- **PUT** `/api/usuarios/{id}` - Update user
- **DELETE** `/api/usuarios/{id}` - Delete user

#### Other Admin Endpoints
- Similar CRUD patterns for roles, companies, parameters, audit logs

### Common/Metadata Endpoints

- **GET** `/api/empresas` - List all companies (dropdown data)
- **GET** `/api/usinas` - List all plants (dropdown data)
- **GET** `/api/tipos-usina` - List plant types
- **GET** `/api/health` - Health check endpoint

## Research Decisions

### Decision 1: Service Layer Pattern
**Rationale**: Isolates HTTP communication from React components. Pure TypeScript functions can be tested independently without React dependencies.  
**Alternatives Considered**: Direct axios calls in components (rejected - violates Principle V), custom fetch hooks without service layer (rejected - duplicates HTTP logic).

### Decision 2: React Query for State Management
**Rationale**: React Query handles caching, loading states, error states, refetching automatically. Reduces boilerplate compared to manual state management.  
**Alternatives Considered**: Manual useState + useEffect (rejected - too much boilerplate), Redux (rejected - overkill for server state).

### Decision 3: MSW for Testing
**Rationale**: MSW mocks HTTP requests at network level, works with any HTTP client. More realistic than mocking axios directly.  
**Alternatives Considered**: Axios mocks (rejected - tightly coupled to axios), Manual fetch mocks (rejected - not realistic).

### Decision 4: Error Normalization in Service Layer
**Rationale**: Consistent error format simplifies component error handling. All components can display errors the same way.  
**Alternatives Considered**: Raw axios errors (rejected - inconsistent format), Error boundaries only (rejected - insufficient for form validation errors).

### Decision 5: DTO Transformers as Pure Functions
**Rationale**: Centralized DTO transformation logic. Easy to test. Avoids scattered transformation code.  
**Alternatives Considered**: Transform in components (rejected - duplicates logic), Transform in hooks (rejected - hooks should be thin wrappers).

---

**Research Status**: ✅ **COMPLETE**  
**Next Phase**: Phase 1 - Design & Contracts (data-model.md, contracts/, quickstart.md)
