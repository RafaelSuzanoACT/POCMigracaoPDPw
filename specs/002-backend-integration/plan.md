# Implementation Plan: Backend Integration

**Branch**: `002-backend-integration` | **Date**: 2025-12-28 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/002-backend-integration/spec.md`

## Summary

This plan defines the technical implementation strategy to connect 34 migrated React pages to the ONS_PoC-PDPW_V2 backend APIs. The approach follows a strict three-layer pattern (Service Layer → React Query Hooks → Components) with 100% test coverage and comprehensive error handling. Priority focuses on 7 critical routine pages first, followed by 27 data collection pages, ensuring the PDPw system can support daily energy production scheduling operations with real backend data.

## Technical Context

**Language/Version**: TypeScript 5.3+ (frontend), .NET 8/C# (backend - read-only)  
**Primary Dependencies**: React 18.2+, React Query 5.x (TanStack Query), Axios 1.x, Vitest + React Testing Library, MSW (Mock Service Worker)  
**Storage**: Backend uses SQL Server (read-only for frontend), frontend uses sessionStorage for unsaved data recovery  
**Testing**: Vitest for unit tests, React Testing Library for component tests, MSW for integration tests, Playwright for E2E  
**Target Platform**: Modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+), responsive (desktop/tablet/mobile)  
**Project Type**: Web application (React SPA frontend + .NET Web API backend)  
**Performance Goals**: 95% of API calls <2s, page load time <3s, no UI blocking during data fetch  
**Constraints**: Backend API contracts are fixed (frontend adapts), 100% test coverage mandatory, zero data loss on errors  
**Scale/Scope**: 34 pages to connect, ~100 backend endpoints, ~170 service functions, ~70 React Query hooks, ~200 tests

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Constitution Compliance

✅ **Principle I - Domain-Driven Language**: All service functions and hooks use ubiquitous language (e.g., `fetchEnergeticData`, `useSaveOfertaExportacao`, `DadosHidraulicos`). No generic names like `getData` or `Manager`.

✅ **Principle II - Test Coverage Mandate**: 100% coverage required for all service layer, hooks, and component integration. Test command: `npm test` in frontend directory.

✅ **Principle III - Visual Identity Preservation**: Backend integration does not change UI appearance - only replaces mock data with real data. Visual parity maintained.

✅ **Principle IV - Accessibility and Responsiveness**: Backend integration does not affect accessibility or responsiveness - component structure unchanged.

✅ **Principle V - Layered Architecture**: Strict enforcement - Components → Hooks → Services → Backend API. No layer bypassing allowed.

✅ **Principle VI - Incremental Migration**: Backend connection prioritized for critical routines (P1), then data collection (P2), queries (P3), admin (P4). Each page independently deployable.

✅ **Principle VII - Design System Consistency**: Backend integration uses existing components - no new UI components needed.

✅ **Principle VIII - Backend Integration Discipline**: This plan's core focus. Service layer + React Query hooks + error handling + 36-point checklist for every page.

### Gates

🟢 **PASS**: No constitution violations. All principles align with backend integration approach.

## Project Structure

### Documentation (this feature)

```text
specs/002-backend-integration/
├── plan.md              # This file (/speckit.plan output)
├── spec.md              # Feature specification (completed)
├── research.md          # Phase 0: Backend API contracts, error patterns, DTO mappings
├── data-model.md        # Phase 1: Service interfaces, hook signatures, error types
├── quickstart.md        # Phase 1: Developer guide for backend integration
├── contracts/           # Phase 1: API endpoint catalog, request/response examples
│   ├── critical-routines.md      # 7 critical routine endpoints
│   ├── data-collection.md        # 27 data collection endpoints
│   ├── queries.md                # 2 query endpoints
│   └── administration.md         # 5 admin endpoints
└── tasks.md             # Phase 2: Detailed task breakdown (/speckit.tasks - NOT created yet)
```

### Source Code (repository root)

```text
frontend/
├── src/
│   ├── services/                 # Service Layer (pure TypeScript, no React)
│   │   ├── api.ts                # ✅ Already exists - Axios client with interceptors
│   │   ├── energeticService.ts   # NEW - Razão Energética API functions
│   │   ├── electricalService.ts  # NEW - Razão Elétrica API functions
│   │   ├── ir1Service.ts         # NEW - Nível de Partida API functions
│   │   ├── ir2Service.ts         # NEW - Dia -1 API functions
│   │   ├── ir3Service.ts         # NEW - Dia -2 API functions
│   │   ├── ir4Service.ts         # NEW - Carga da Ande API functions
│   │   ├── ofertaExportacaoService.ts  # NEW - Oferta Exportação API
│   │   ├── hydraulicService.ts   # NEW - Dados Hidráulicos API
│   │   ├── thermalService.ts     # NEW - Dados Térmicos API
│   │   └── ...                   # Additional services for remaining pages
│   │
│   ├── hooks/                    # React Query Hooks (wraps services)
│   │   ├── useEnergeticData.ts   # NEW - Query + mutation hooks for energetic
│   │   ├── useElectricalData.ts  # NEW - Query + mutation hooks for electrical
│   │   ├── useIR1Data.ts         # NEW - Query + mutation hooks for IR1
│   │   ├── useIR2Data.ts         # NEW - Query + mutation hooks for IR2
│   │   ├── useIR3Data.ts         # NEW - Query + mutation hooks for IR3
│   │   ├── useIR4Data.ts         # NEW - Query + mutation hooks for IR4
│   │   ├── useOfertaExportacaoData.ts  # NEW - Query + mutation for ofertas
│   │   ├── useHydraulicData.ts   # NEW - Query + mutation for hydraulic
│   │   ├── useThermalData.ts     # NEW - Query + mutation for thermal
│   │   └── ...                   # Additional hooks for remaining pages
│   │
│   ├── pages/                    # Components (MODIFY - replace mock data)
│   │   ├── Collection/
│   │   │   ├── Energetic/Energetic.tsx        # MODIFY - connect to hooks
│   │   │   ├── Electrical/Electrical.tsx      # MODIFY - connect to hooks
│   │   │   ├── IR1/IR1.tsx                    # MODIFY - connect to hooks
│   │   │   ├── IR2/IR2.tsx                    # MODIFY - connect to hooks
│   │   │   ├── IR3/IR3.tsx                    # MODIFY - connect to hooks
│   │   │   ├── IR4/IR4.tsx                    # MODIFY - connect to hooks
│   │   │   ├── OfertaExportacao/OfertaExportacao.tsx  # MODIFY
│   │   │   └── ...                            # Remaining pages
│   │   └── ...
│   │
│   ├── types/                    # TypeScript Types
│   │   ├── api.ts                # NEW - Common API types (ErrorResponse, etc.)
│   │   ├── energetic.ts          # NEW - Energetic data DTOs
│   │   ├── electrical.ts         # NEW - Electrical data DTOs
│   │   ├── ir.ts                 # NEW - IR data DTOs
│   │   └── ...                   # Additional types for domains
│   │
│   └── utils/                    # Utility Functions
│       ├── errorHandling.ts      # NEW - Error normalization utilities
│       └── dtoTransformers.ts    # NEW - Backend ↔ Frontend DTO transformers
│
└── tests/
    ├── services/                 # Service Layer Tests (unit)
    │   ├── energeticService.test.ts  # NEW - 100% coverage
    │   ├── electricalService.test.ts # NEW - 100% coverage
    │   └── ...                       # All services tested
    │
    ├── hooks/                    # React Query Hooks Tests (unit)
    │   ├── useEnergeticData.test.ts  # NEW - loading/success/error states
    │   ├── useElectricalData.test.ts # NEW - loading/success/error states
    │   └── ...                       # All hooks tested
    │
    ├── pages/                    # Component Tests (MODIFY - mock hooks)
    │   ├── Energetic.test.tsx    # MODIFY - update to mock hooks
    │   ├── Electrical.test.tsx   # MODIFY - update to mock hooks
    │   └── ...                   # All pages updated
    │
    └── integration/              # Integration Tests (full flow)
        ├── energetic-flow.test.tsx      # NEW - load → edit → save
        ├── electrical-flow.test.tsx     # NEW - load → edit → save
        └── error-recovery.test.tsx      # NEW - error → retry → success

backend/ (ONS_PoC-PDPW_V2 - EXTERNAL REPOSITORY - READ ONLY)
├── Controllers/                  # API endpoints (reference only)
│   ├── DadosEnergeticosController.cs
│   ├── DadosEletricosController.cs
│   └── ...
└── Swagger documentation at http://localhost:5001/swagger
```

**Structure Decision**: We use the **Web application** structure with separate frontend and backend. Frontend source is in `frontend/src/` organized by responsibility (services, hooks, pages, types, utils). Backend is in separate repository `ONS_PoC-PDPW_V2` and treated as **read-only** - frontend adapts to backend contracts, not vice versa.

## Architecture Overview

### Three-Layer Integration Pattern

```
┌──────────────────────────────────────────────────────────────┐
│  COMPONENT LAYER (React Components - UI Only)                │
│  - Orchestrates hooks                                         │
│  - Renders UI based on data/loading/error states            │
│  - NO direct API calls, NO business logic                    │
│  - Location: frontend/src/pages/**/*.tsx                     │
└────────────────────┬─────────────────────────────────────────┘
                     │ Uses hooks only
                     ↓
┌──────────────────────────────────────────────────────────────┐
│  HOOK LAYER (React Query Hooks - State Management)          │
│  - Wraps service functions in useQuery/useMutation           │
│  - Manages loading, success, error states                    │
│  - Handles caching, refetching, optimistic updates          │
│  - Location: frontend/src/hooks/use*Data.ts                 │
└────────────────────┬─────────────────────────────────────────┘
                     │ Calls service functions
                     ↓
┌──────────────────────────────────────────────────────────────┐
│  SERVICE LAYER (Pure TypeScript - HTTP Communication)       │
│  - Pure functions (no React dependencies)                    │
│  - HTTP calls via centralized Axios client (api.ts)         │
│  - DTO transformations (backend ↔ frontend format)          │
│  - Error normalization (consistent error format)            │
│  - Location: frontend/src/services/*Service.ts              │
└────────────────────┬─────────────────────────────────────────┘
                     │ HTTP requests (Axios)
                     ↓
┌──────────────────────────────────────────────────────────────┐
│  BACKEND API (.NET 8 Web API - ONS_PoC-PDPW_V2)            │
│  - RESTful endpoints at http://localhost:5001/api/*         │
│  - Authoritative source for business logic                   │
│  - Fixed contracts (frontend adapts, not backend)           │
│  - Location: External repository (read-only)                │
└──────────────────────────────────────────────────────────────┘
```

### Service Layer Pattern

Each service file (`frontend/src/services/{domain}Service.ts`) follows this structure:

```typescript
// Example: energeticService.ts
import { apiClient } from './api';
import type { EnergeticData, EnergeticDataDto, SaveEnergeticRequest } from '../types/energetic';
import { transformEnergeticFromBackend, transformEnergeticToBackend } from '../utils/dtoTransformers';
import { normalizeError } from '../utils/errorHandling';

/**
 * Fetch energetic data for a specific date and company
 * @param date - Date in YYYY-MM-DD format
 * @param companyId - Company identifier
 * @returns Promise with energetic data in frontend format
 */
export async function fetchEnergeticData(date: string, companyId: number): Promise<EnergeticData> {
  try {
    const response = await apiClient.get<EnergeticDataDto>(`/dadosenergeticos/${date}/${companyId}`);
    return transformEnergeticFromBackend(response);
  } catch (error) {
    throw normalizeError(error, 'Erro ao buscar dados energéticos');
  }
}

/**
 * Save energetic data for a specific date and company
 * @param data - Energetic data to save
 * @returns Promise with saved energetic data
 */
export async function saveEnergeticData(data: SaveEnergeticRequest): Promise<EnergeticData> {
  try {
    const payload = transformEnergeticToBackend(data);
    const response = await apiClient.post<EnergeticDataDto>('/dadosenergeticos', payload);
    return transformEnergeticFromBackend(response);
  } catch (error) {
    throw normalizeError(error, 'Erro ao salvar dados energéticos');
  }
}

/**
 * Delete energetic data for a specific date and company
 * @param date - Date in YYYY-MM-DD format
 * @param companyId - Company identifier
 */
export async function deleteEnergeticData(date: string, companyId: number): Promise<void> {
  try {
    await apiClient.delete(`/dadosenergeticos/${date}/${companyId}`);
  } catch (error) {
    throw normalizeError(error, 'Erro ao excluir dados energéticos');
  }
}
```

**Key Principles:**
- Pure TypeScript functions (no React dependencies)
- JSDoc comments for all public functions
- Use centralized `apiClient` from `api.ts`
- DTO transformations handle format differences between backend and frontend
- Error normalization provides consistent error format
- Functions return typed Promises

### React Query Hooks Pattern

Each hook file (`frontend/src/hooks/use{Domain}Data.ts`) follows this structure:

```typescript
// Example: useEnergeticData.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as energeticService from '../services/energeticService';
import type { EnergeticData, SaveEnergeticRequest } from '../types/energetic';

/**
 * Query hook to fetch energetic data
 * @param date - Date in YYYY-MM-DD format
 * @param companyId - Company identifier
 * @returns Query result with data, loading, error states
 */
export function useEnergeticData(date: string, companyId: number) {
  return useQuery({
    queryKey: ['energetic', date, companyId],
    queryFn: () => energeticService.fetchEnergeticData(date, companyId),
    enabled: !!date && !!companyId, // Only fetch when params are available
    staleTime: 5 * 60 * 1000, // 5 minutes (data changes infrequently)
    retry: 3, // Retry failed requests 3 times
  });
}

/**
 * Mutation hook to save energetic data
 * @returns Mutation result with mutate function, loading, error states
 */
export function useSaveEnergetic() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SaveEnergeticRequest) => energeticService.saveEnergeticData(data),
    onSuccess: (savedData) => {
      // Invalidate and refetch related queries
      queryClient.invalidateQueries({ queryKey: ['energetic'] });
      
      // Optimistically update cache
      queryClient.setQueryData(
        ['energetic', savedData.date, savedData.companyId],
        savedData
      );
    },
    onError: (error) => {
      console.error('Failed to save energetic data:', error);
    },
  });
}

/**
 * Mutation hook to delete energetic data
 * @returns Mutation result with mutate function, loading, error states
 */
export function useDeleteEnergetic() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ date, companyId }: { date: string; companyId: number }) =>
      energeticService.deleteEnergeticData(date, companyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['energetic'] });
    },
  });
}
```

**Key Principles:**
- One hook file per domain (groups related queries and mutations)
- Query hooks use `useQuery` for read operations
- Mutation hooks use `useMutation` for write operations
- Proper `queryKey` structure (domain, params) for cache management
- `enabled` conditions prevent unnecessary API calls
- `staleTime` and `cacheTime` configured based on data volatility
- Cache invalidation and optimistic updates on mutations

### Component Integration Pattern

Components are modified to replace mock data with hooks:

```typescript
// Example: Energetic.tsx (BEFORE - mock data)
const Energetic: React.FC = () => {
  const [data, setData] = useState<EnergeticData>(MOCK_DATA);
  const [loading, setLoading] = useState(false);
  
  const handleSave = () => {
    setLoading(true);
    // Simulated save
    setTimeout(() => {
      setLoading(false);
      alert('Dados salvos com sucesso!');
    }, 1000);
  };
  
  return (
    <div>
      {loading && <p>Carregando...</p>}
      {/* Render mock data */}
    </div>
  );
};

// AFTER - real backend integration
const Energetic: React.FC = () => {
  const [date, setDate] = useState('');
  const [companyId, setCompanyId] = useState<number | null>(null);
  
  // Query hook - fetches data automatically when params change
  const { data, isLoading, error, refetch } = useEnergeticData(date, companyId!);
  
  // Mutation hook - saves data when user submits
  const { mutate: saveData, isPending: isSaving } = useSaveEnergetic();
  
  const handleSave = (modifiedData: EnergeticData) => {
    saveData(modifiedData, {
      onSuccess: () => {
        toast.success('Dados salvos com sucesso!');
      },
      onError: (err) => {
        toast.error('Erro ao salvar dados: ' + err.message);
      },
    });
  };
  
  if (isLoading) return <LoadingSpinner message="Carregando dados energéticos..." />;
  if (error) return <ErrorMessage error={error} onRetry={refetch} />;
  
  return (
    <div>
      {/* Render real data from backend */}
      <button onClick={handleSave} disabled={isSaving}>
        {isSaving ? 'Salvando...' : 'Salvar'}
      </button>
    </div>
  );
};
```

**Key Principles:**
- Components import and use hooks only (never import services directly)
- Three states handled: `isLoading`, `error`, `isSuccess` (data available)
- Loading state shows spinner or skeleton
- Error state shows user-friendly message with retry option
- Success feedback after mutations (toast notification)
- Disabled state during mutations (prevent double-submit)

### Error Handling Strategy

Comprehensive error handling at all layers:

**Service Layer** (`frontend/src/utils/errorHandling.ts`):
```typescript
export interface NormalizedError {
  code: string;
  message: string;
  field?: string;
  details?: any;
}

export function normalizeError(error: any, fallbackMessage: string): NormalizedError {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const data = error.response?.data;
    
    // 400: Validation error
    if (status === 400) {
      return {
        code: 'VALIDATION_ERROR',
        message: data?.message || 'Dados inválidos',
        field: data?.field,
        details: data?.errors,
      };
    }
    
    // 401: Unauthorized (session expired)
    if (status === 401) {
      return {
        code: 'UNAUTHORIZED',
        message: 'Sessão expirada. Por favor, faça login novamente.',
      };
    }
    
    // 403: Forbidden (insufficient permissions)
    if (status === 403) {
      return {
        code: 'FORBIDDEN',
        message: 'Você não tem permissão para esta operação.',
      };
    }
    
    // 404: Not found
    if (status === 404) {
      return {
        code: 'NOT_FOUND',
        message: data?.message || 'Recurso não encontrado.',
      };
    }
    
    // 409: Conflict (concurrent modification)
    if (status === 409) {
      return {
        code: 'CONFLICT',
        message: 'Dados foram atualizados por outro usuário. Recarregue a página.',
      };
    }
    
    // 500: Server error
    if (status === 500) {
      return {
        code: 'SERVER_ERROR',
        message: 'Erro interno do servidor. Tente novamente mais tarde.',
      };
    }
    
    // Network error
    if (!error.response) {
      return {
        code: 'NETWORK_ERROR',
        message: 'Erro de conexão com o servidor. Verifique sua internet.',
      };
    }
  }
  
  return {
    code: 'UNKNOWN_ERROR',
    message: fallbackMessage,
  };
}
```

**Component Layer** (user-facing error messages):
- Display Portuguese error messages from normalized errors
- Show retry button for transient errors (network, timeout)
- Highlight invalid fields for validation errors
- Preserve unsaved data in sessionStorage for recovery

### Testing Strategy

**Service Layer Tests** (unit tests with MSW):
```typescript
// energeticService.test.ts
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import * as energeticService from '../services/energeticService';

const server = setupServer();

beforeEach(() => server.listen());
afterEach(() => server.resetHandlers());

describe('energeticService', () => {
  describe('fetchEnergeticData', () => {
    it('should fetch and transform data successfully', async () => {
      server.use(
        rest.get('*/dadosenergeticos/:date/:companyId', (req, res, ctx) => {
          return res(ctx.json({ /* mock backend data */ }));
        })
      );
      
      const result = await energeticService.fetchEnergeticData('2025-01-01', 123);
      expect(result).toEqual({ /* expected frontend data */ });
    });
    
    it('should handle 404 error', async () => {
      server.use(
        rest.get('*/dadosenergeticos/:date/:companyId', (req, res, ctx) => {
          return res(ctx.status(404), ctx.json({ message: 'Not found' }));
        })
      );
      
      await expect(energeticService.fetchEnergeticData('2025-01-01', 999))
        .rejects.toThrow('Recurso não encontrado');
    });
    
    it('should handle network error', async () => {
      server.use(
        rest.get('*/dadosenergeticos/:date/:companyId', (req, res) => {
          return res.networkError('Connection refused');
        })
      );
      
      await expect(energeticService.fetchEnergeticData('2025-01-01', 123))
        .rejects.toThrow('Erro de conexão com o servidor');
    });
  });
});
```

**Hook Tests** (using `renderHook` from React Testing Library):
```typescript
// useEnergeticData.test.ts
import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEnergeticData } from '../hooks/useEnergeticData';
import * as energeticService from '../services/energeticService';

vi.mock('../services/energeticService');

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: any) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useEnergeticData', () => {
  it('should fetch data successfully', async () => {
    const mockData = { /* mock data */ };
    vi.mocked(energeticService.fetchEnergeticData).mockResolvedValue(mockData);
    
    const { result } = renderHook(
      () => useEnergeticData('2025-01-01', 123),
      { wrapper: createWrapper() }
    );
    
    expect(result.current.isLoading).toBe(true);
    
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toEqual(mockData);
    });
  });
  
  it('should handle error', async () => {
    const error = new Error('Network error');
    vi.mocked(energeticService.fetchEnergeticData).mockRejectedValue(error);
    
    const { result } = renderHook(
      () => useEnergeticData('2025-01-01', 123),
      { wrapper: createWrapper() }
    );
    
    await waitFor(() => {
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toEqual(error);
    });
  });
  
  it('should not fetch when params are missing', () => {
    const { result } = renderHook(
      () => useEnergeticData('', 123),
      { wrapper: createWrapper() }
    );
    
    expect(result.current.isLoading).toBe(false);
    expect(energeticService.fetchEnergeticData).not.toHaveBeenCalled();
  });
});
```

**Component Tests** (mock hooks):
```typescript
// Energetic.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Energetic from '../pages/Collection/Energetic/Energetic';
import * as useEnergeticDataHook from '../hooks/useEnergeticData';

vi.mock('../hooks/useEnergeticData');

describe('Energetic Component', () => {
  it('should show loading state', () => {
    vi.mocked(useEnergeticDataHook.useEnergeticData).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
      refetch: vi.fn(),
    } as any);
    
    render(<Energetic />);
    expect(screen.getByText(/carregando/i)).toBeInTheDocument();
  });
  
  it('should show error state with retry button', () => {
    const mockRefetch = vi.fn();
    vi.mocked(useEnergeticDataHook.useEnergeticData).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('Network error'),
      refetch: mockRefetch,
    } as any);
    
    render(<Energetic />);
    expect(screen.getByText(/erro/i)).toBeInTheDocument();
    
    const retryButton = screen.getByText(/tentar novamente/i);
    userEvent.click(retryButton);
    expect(mockRefetch).toHaveBeenCalled();
  });
  
  it('should display data successfully', () => {
    const mockData = { /* mock energetic data */ };
    vi.mocked(useEnergeticDataHook.useEnergeticData).mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    } as any);
    
    render(<Energetic />);
    expect(screen.getByText(/razão energética/i)).toBeInTheDocument();
  });
});
```

**Integration Tests** (full user flow):
```typescript
// energetic-flow.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import App from '../App';

const server = setupServer();

beforeEach(() => server.listen());
afterEach(() => server.resetHandlers());

describe('Energetic Flow Integration', () => {
  it('should complete full user flow: load → edit → save → confirm', async () => {
    // Mock backend API
    server.use(
      rest.get('*/dadosenergeticos/:date/:companyId', (req, res, ctx) => {
        return res(ctx.json({ /* mock data */ }));
      }),
      rest.post('*/dadosenergeticos', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ success: true }));
      })
    );
    
    render(<App />);
    
    // Navigate to energetic page
    userEvent.click(screen.getByText(/razão energética/i));
    
    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText(/carregando/i)).not.toBeInTheDocument();
    });
    
    // Edit data
    const input = screen.getByLabelText(/energia/i);
    await userEvent.clear(input);
    await userEvent.type(input, '1234.56');
    
    // Save
    const saveButton = screen.getByText(/salvar/i);
    await userEvent.click(saveButton);
    
    // Confirm success
    await waitFor(() => {
      expect(screen.getByText(/salvo com sucesso/i)).toBeInTheDocument();
    });
  });
});
```

## Backend API Endpoints Catalog

Based on analysis of ONS_PoC-PDPW_V2 repository and Swagger documentation at `http://localhost:5001/swagger`:

### Critical Routines (P1) - 7 Pages

| Page | Backend Endpoint | Methods | Notes |
|------|-----------------|---------|-------|
| **Razão Energética** | `/api/dadosenergeticos` | GET, POST, PUT, DELETE | 48 intervals, totals, averages |
| **Razão Elétrica** | `/api/dadoseletricos` | GET, POST, PUT, DELETE | 48 intervals, by plant |
| **Nível de Partida (IR1)** | `/api/insumos-recebimento/ir1` | GET, POST, PUT, DELETE | Initial water levels |
| **Dia -1 (IR2)** | `/api/insumos-recebimento/ir2` | GET, POST, PUT, DELETE | Day -1 data |
| **Dia -2 (IR3)** | `/api/insumos-recebimento/ir3` | GET, POST, PUT, DELETE | Day -2 data |
| **Carga da Ande (IR4)** | `/api/insumos-recebimento/ir4` | GET, POST, PUT, DELETE | Ande load data |
| **Oferta Exportação** | `/api/ofertas-exportacao` | GET, POST, PUT, DELETE | Export offers |

### Data Collection (P2) - 27 Pages

| Domain | Backend Endpoint | Methods | Count |
|--------|-----------------|---------|-------|
| **Dados Hidráulicos** | `/api/dados-hidraulicos` | GET, POST, PUT, DELETE | 3 pages (vazão, volume, geração) |
| **Dados Térmicos** | `/api/dados-termicos` | GET, POST, PUT, DELETE | 7 pages (disponibilidade, geração, combustível, etc.) |
| **Intercâmbio** | `/api/intercambio` | GET, POST, PUT, DELETE | 3 pages |
| **Carga** | `/api/carga` | GET, POST, PUT, DELETE | 3 pages |
| **Outros** | `/api/coleta/*` | GET, POST, PUT, DELETE | 11 pages (various collection data) |

### Queries (P3) - 2 Pages

| Page | Backend Endpoint | Methods | Notes |
|------|-----------------|---------|-------|
| **FlowQuery** | `/api/consultas/vazao` | POST (query) | Paginated results |
| **GenerationQuery** | `/api/consultas/geracao` | POST (query) | Paginated results |

### Administration (P4) - 5 Pages

| Page | Backend Endpoint | Methods | Notes |
|------|-----------------|---------|-------|
| **User Management** | `/api/usuarios` | GET, POST, PUT, DELETE | User CRUD |
| **Role Management** | `/api/perfis` | GET, POST, PUT, DELETE | Role CRUD |
| **Company Config** | `/api/empresas` | GET, POST, PUT, DELETE | Company settings |
| **System Parameters** | `/api/parametros` | GET, POST, PUT, DELETE | System config |
| **Audit Logs** | `/api/auditoria` | GET | Read-only logs |

### Common Endpoints (All Pages)

| Endpoint | Purpose | Methods |
|----------|---------|---------|
| `/api/empresas` | Fetch company list for filters | GET |
| `/api/usinas` | Fetch plant list for filters | GET |
| `/api/tipos-usina` | Fetch plant types | GET |
| `/api/health` | Health check | GET |

## Implementation Phases

### Phase 0: Research & Standards Definition ✅ (Complete during /speckit.plan)

**Output**: `research.md` document with:
- Backend API contract details for all 34 pages
- DTO mapping specifications (backend format ↔ frontend format)
- Error code catalog (400, 401, 403, 404, 409, 500)
- Authentication flow documentation
- Performance benchmarks (baseline API response times)

**Tasks**:
1. Document all backend endpoints from Swagger UI
2. Analyze DTO structures (request/response formats)
3. Identify DTO transformations needed (naming differences, date formats, etc.)
4. Document error responses for each endpoint
5. Test authentication flow with backend
6. Measure baseline API response times

### Phase 1: Design & Contracts ✅ (Complete during /speckit.plan)

**Output**: `data-model.md`, `contracts/`, `quickstart.md`

**Tasks**:
1. Create `data-model.md` with:
   - Service interface definitions for all domains
   - Hook signatures for all pages
   - Error type definitions
   - DTO transformation function signatures
2. Create `contracts/` directory with:
   - `critical-routines.md`: All 7 critical routine endpoints detailed
   - `data-collection.md`: All 27 data collection endpoints detailed
   - `queries.md`: All 2 query endpoints detailed
   - `administration.md`: All 5 admin endpoints detailed
3. Create `quickstart.md` developer guide:
   - Backend integration checklist (36 points)
   - Service layer template code
   - Hook template code
   - Component integration template code
   - Testing template code
4. Update agent context (run `.specify/scripts/bash/update-agent-context.sh copilot`)

### Phase 2: Task Generation (Separate command: /speckit.tasks)

**Output**: `tasks.md` with detailed task breakdown

**NOT PART OF THIS COMMAND** - Run `/speckit.tasks` separately after plan is approved.

## Development Workflow per Page

For each page to be connected to backend (34 pages total):

### Step 1: Analysis (30 min)
- Read backend API documentation from `contracts/` directory
- Identify all endpoints needed (list, get, create, update, delete)
- Document DTO differences (backend vs frontend format)
- Identify validation rules from backend
- Review legacy code in `legado/` for business rules

### Step 2: Service Layer (2 hours)
- Create service file: `frontend/src/services/{domain}Service.ts`
- Implement CRUD functions (fetch, save, update, delete)
- Create DTO transformer functions
- Add JSDoc comments to all functions
- Write service unit tests (100% coverage):
  - Success scenarios (200 OK, correct transformation)
  - Error scenarios (400, 401, 403, 404, 409, 500)
  - Network errors (timeout, offline)
  - Edge cases (empty response, malformed JSON)

### Step 3: Hook Layer (1 hour)
- Create hook file: `frontend/src/hooks/use{Domain}Data.ts`
- Implement query hooks (read operations)
- Implement mutation hooks (write operations)
- Configure cache strategy (staleTime, cacheTime, retry)
- Write hook unit tests (100% coverage):
  - Loading state
  - Success state
  - Error state
  - Refetch behavior
  - Cache behavior

### Step 4: Component Integration (2 hours)
- Modify component to import hooks (remove mock data imports)
- Replace mock data with hook calls
- Implement loading state UI
- Implement error state UI with retry
- Implement success feedback (toast after save)
- Add unsaved data recovery (sessionStorage)
- Update component tests to mock hooks
- Ensure 100% test coverage maintained

### Step 5: Integration Testing (1 hour)
- Create integration test in `frontend/tests/integration/`
- Test full user flow (load → interact → save → confirm)
- Test error recovery (error → retry → success)
- Configure MSW handlers for backend mocking
- Verify all tests pass

### Step 6: Documentation & Review (30 min)
- Update `.github/CHECKLIST_MIGRACAO.md` status
- Verify Backend Connection Checklist (36 points)
- Run all tests (`npm test`)
- Verify no console errors/warnings
- Create Pull Request with:
  - Backend endpoints used
  - Service layer pattern
  - Test coverage report
  - Screenshots/videos

**Total per page**: ~7 hours

**Total effort estimate**:
- 7 critical routines × 7h = 49 hours (P1)
- 27 data collection pages × 7h = 189 hours (P2)
- 2 query pages × 7h = 14 hours (P3)
- 5 admin pages × 7h = 35 hours (P4)
- **Total: 287 hours (~36 days for 1 developer, ~12 days for 3 developers in parallel)**

## Metrics Tracking

### Backend Connection Progress

Track in `.github/CHECKLIST_MIGRACAO.md`:

```markdown
## Backend Integration Status

| Métrica | Valor |
|---------|-------|
| **Total de Páginas Migradas** | 34 |
| **Páginas Conectadas ao Backend** | 0 |
| **Progresso Backend** | 0.0% |

### Por Prioridade

| Prioridade | Páginas | Conectadas | Progresso |
|-----------|---------|------------|-----------|
| **P1 - Críticas** | 7 | 0 | 0.0% |
| **P2 - Coleta** | 27 | 0 | 0.0% |
| **P3 - Consultas** | 2 | 0 | 0.0% |
| **P4 - Admin** | 5 | 0 | 0.0% |
```

### Test Coverage Metrics

Track in CI/CD pipeline:

```
Service Layer Coverage:  0 / 100 tests (target: 100%)
Hook Layer Coverage:     0 / 70 tests (target: 100%)
Integration Tests:       0 / 20 tests (target: 100%)
Total Test Coverage:     350 / 540 tests (64.8% - target: 100%)
```

### Performance Metrics

Track in production monitoring:

```
API Response Time (p95):  0ms (target: <2000ms)
Page Load Time (p95):     0ms (target: <3000ms)
Error Rate:               0% (target: <1%)
Success Rate:             0% (target: >99%)
```

## Risk Mitigation

### Risk 1: Backend API Changes During Integration
**Probability**: Medium | **Impact**: High  
**Mitigation**:
- Freeze backend API contracts before starting frontend integration
- Coordinate with backend team on any breaking changes
- Use API versioning if changes are necessary
- Service layer isolates components from backend changes

### Risk 2: Performance Issues with Large Data Sets
**Probability**: Medium | **Impact**: Medium  
**Mitigation**:
- Implement pagination for list endpoints (100 records per page)
- Use virtualization for large grids (react-window or similar)
- Optimize React Query cache strategy (aggressive caching for static data)
- Monitor API response times in production

### Risk 3: Concurrent Data Modifications
**Probability**: Low | **Impact**: Medium  
**Mitigation**:
- Backend implements optimistic locking (409 Conflict on stale data)
- Frontend displays refresh option when conflict detected
- Preserve user's unsaved changes in sessionStorage for recovery
- Show clear conflict resolution UI

### Risk 4: Network Failures During Data Entry
**Probability**: Medium | **Impact**: High  
**Mitigation**:
- Preserve unsaved form data in sessionStorage automatically
- Display reconnection dialog when network drops
- Auto-retry transient failures (exponential backoff: 1s, 2s, 4s)
- Manual retry button for persistent failures

### Risk 5: Test Coverage Slippage
**Probability**: Low | **Impact**: High  
**Mitigation**:
- Pre-commit hook checks test coverage (fail if <100% on touched files)
- CI/CD pipeline blocks merge if tests fail
- Pull request template requires test coverage screenshot
- Dedicated code review focus on Backend Connection Checklist (36 points)

## Assumptions

1. **Backend Stability**: ONS_PoC-PDPW_V2 backend APIs are deployed, stable, and accessible from frontend dev environment
2. **API Contracts Frozen**: Backend API contracts will not change during frontend integration without coordination
3. **Authentication Ready**: Backend authentication flow is functional and frontend can obtain tokens
4. **CORS Configured**: Backend accepts requests from frontend origins (dev: localhost:5173, prod: TBD)
5. **Test Environment Available**: Backend team provides test/staging environment with test data
6. **Swagger Documentation Accurate**: Swagger UI at http://localhost:5001/swagger reflects actual API behavior
7. **Error Format Consistent**: Backend returns errors in consistent JSON format across all endpoints
8. **Performance Acceptable**: Backend APIs respond within 2 seconds for typical queries
9. **Legacy Coexistence**: Both legacy WebForms and new React frontend will run concurrently for 6-12 months
10. **Team Availability**: 2 backend developers available for questions, 3 frontend developers for implementation

## Dependencies

**External Dependencies**:
- ONS_PoC-PDPW_V2 backend must be running and accessible
- SQL Server database must be populated with test data
- Backend team availability for API contract questions

**Internal Dependencies**:
- Frontend infrastructure complete (✅ already done - Phase 0)
- React Query (TanStack Query) already configured (✅ verified in existing code)
- Axios client with interceptors already setup (✅ exists at `frontend/src/services/api.ts`)
- Authentication store with token management ready (✅ exists at `frontend/src/store/authStore.ts`)

**No Blockers**: All dependencies satisfied. Ready to proceed with implementation.

## Next Steps

1. **Approve This Plan**: Review plan with team, get approval before proceeding
2. **Run `/speckit.tasks`**: Generate detailed task breakdown (140 tasks for Phase 4)
3. **Start P1 Implementation**: Begin with 7 critical routine pages (highest priority)
4. **Weekly Progress Review**: Track metrics, identify blockers, adjust timeline if needed
5. **Iterate**: Complete P1 → P2 → P3 → P4 incrementally

---

**Plan Status**: ✅ **COMPLETE** - Ready for task generation  
**Next Command**: `/speckit.tasks` to generate detailed task breakdown  
**Estimated Duration**: 36 days (1 dev) or 12 days (3 devs parallel)
