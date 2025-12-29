# Quickstart: Backend Integration

**Audience**: Frontend developers connecting pages to backend  
**Prerequisites**: Node.js 18+, npm, ONS_PoC-PDPW_V2 backend running on localhost:5001

## Overview

This guide shows how to connect a React page to the backend using the three-layer pattern:
**Components → Hooks → Services → Backend API**

## Step 1: Create Service Layer (2 hours)

### 1.1 Create Service File

```bash
# Create service file
touch frontend/src/services/energeticService.ts
```

### 1.2 Implement CRUD Functions

```typescript
// frontend/src/services/energeticService.ts
import { apiClient } from './api';
import type { EnergeticData } from '../types/energetic';
import { transformEnergeticFromBackend, transformEnergeticToBackend } from '../utils/dtoTransformers';
import { normalizeError } from '../utils/errorHandling';

/**
 * Fetch energetic data for a specific date and company
 */
export async function fetchEnergeticData(date: string, companyId: number): Promise<EnergeticData> {
  try {
    const response = await apiClient.get(`/dadosenergeticos/${date}/${companyId}`);
    return transformEnergeticFromBackend(response);
  } catch (error) {
    throw normalizeError(error, 'Erro ao buscar dados energéticos');
  }
}

/**
 * Save energetic data
 */
export async function saveEnergeticData(data: Partial<EnergeticData>): Promise<EnergeticData> {
  try {
    const payload = transformEnergeticToBackend(data);
    const response = await apiClient.post('/dadosenergeticos', payload);
    return transformEnergeticFromBackend(response);
  } catch (error) {
    throw normalizeError(error, 'Erro ao salvar dados energéticos');
  }
}
```

### 1.3 Write Service Tests

```typescript
// frontend/tests/services/energeticService.test.ts
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
          return res(ctx.json({ Id: 1, DataOperacao: '2025-12-28', /* ... */ }));
        })
      );
      
      const result = await energeticService.fetchEnergeticData('2025-12-28', 5);
      expect(result.id).toBe(1);
      expect(result.operationDate).toBeInstanceOf(Date);
    });
    
    it('should handle 404 error', async () => {
      server.use(
        rest.get('*/dadosenergeticos/:date/:companyId', (req, res, ctx) => {
          return res(ctx.status(404), ctx.json({ message: 'Not found' }));
        })
      );
      
      await expect(energeticService.fetchEnergeticData('2025-12-28', 999))
        .rejects.toThrow();
    });
  });
});
```

## Step 2: Create React Query Hooks (1 hour)

### 2.1 Create Hook File

```bash
touch frontend/src/hooks/useEnergeticData.ts
```

### 2.2 Implement Query and Mutation Hooks

```typescript
// frontend/src/hooks/useEnergeticData.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as energeticService from '../services/energeticService';

export function useEnergeticData(date: string, companyId: number) {
  return useQuery({
    queryKey: ['energetic', date, companyId],
    queryFn: () => energeticService.fetchEnergeticData(date, companyId),
    enabled: !!date && !!companyId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useSaveEnergetic() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: energeticService.saveEnergeticData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['energetic'] });
    },
  });
}
```

### 2.3 Write Hook Tests

```typescript
// frontend/tests/hooks/useEnergeticData.test.ts
import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEnergeticData } from '../hooks/useEnergeticData';
import * as energeticService from '../services/energeticService';

vi.mock('../services/energeticService');

const createWrapper = () => {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return ({ children }: any) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useEnergeticData', () => {
  it('should fetch data successfully', async () => {
    const mockData = { id: 1, /* ... */ };
    vi.mocked(energeticService.fetchEnergeticData).mockResolvedValue(mockData);
    
    const { result } = renderHook(() => useEnergeticData('2025-12-28', 5), { wrapper: createWrapper() });
    
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockData);
  });
});
```

## Step 3: Connect Component (2 hours)

### 3.1 Import Hooks (Remove Mock Data)

```typescript
// frontend/src/pages/Collection/Energetic/Energetic.tsx

// BEFORE (mock data)
import { MOCK_ENERGETIC_DATA } from '../../../mocks/energeticData';
const [data, setData] = useState(MOCK_ENERGETIC_DATA);

// AFTER (real backend)
import { useEnergeticData, useSaveEnergetic } from '../../../hooks/useEnergeticData';
const { data, isLoading, error, refetch } = useEnergeticData(date, companyId!);
const { mutate: saveData, isPending } = useSaveEnergetic();
```

### 3.2 Handle Loading/Error/Success States

```typescript
if (isLoading) {
  return <LoadingSpinner message="Carregando dados energéticos..." />;
}

if (error) {
  return (
    <ErrorMessage 
      message={error.message}
      onRetry={refetch}
    />
  );
}

if (!data) {
  return <EmptyState message="Nenhum dado disponível" />;
}

// Render data
return (
  <div>
    {/* Grid with real data */}
    <button onClick={() => saveData(modifiedData)} disabled={isPending}>
      {isPending ? 'Salvando...' : 'Salvar'}
    </button>
  </div>
);
```

### 3.3 Update Component Tests

```typescript
// frontend/tests/pages/Energetic.test.tsx
import { vi } from 'vitest';
import * as useEnergeticDataHook from '../../../hooks/useEnergeticData';

vi.mock('../../../hooks/useEnergeticData');

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
```

## Step 4: Integration Test (1 hour)

```typescript
// frontend/tests/integration/energetic-flow.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import App from '../App';

const server = setupServer(
  rest.get('*/dadosenergeticos/:date/:companyId', (req, res, ctx) => {
    return res(ctx.json({ /* mock data */ }));
  }),
  rest.post('*/dadosenergeticos', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ success: true }));
  })
);

beforeEach(() => server.listen());
afterEach(() => server.resetHandlers());

it('should complete full user flow', async () => {
  render(<App />);
  
  // Navigate to page
  userEvent.click(screen.getByText(/razão energética/i));
  
  // Wait for data
  await waitFor(() => {
    expect(screen.queryByText(/carregando/i)).not.toBeInTheDocument();
  });
  
  // Edit and save
  const input = screen.getByLabelText(/energia/i);
  await userEvent.clear(input);
  await userEvent.type(input, '1234.56');
  
  const saveButton = screen.getByText(/salvar/i);
  await userEvent.click(saveButton);
  
  // Verify success
  await waitFor(() => {
    expect(screen.getByText(/salvo com sucesso/i)).toBeInTheDocument();
  });
});
```

## Step 5: Run Tests & Verify (30 min)

```bash
# Run all tests
cd frontend
npm test

# Check coverage
npm test -- --coverage

# Verify 100% coverage on service, hooks, component
```

## Step 6: Update Documentation (30 min)

Update `.github/CHECKLIST_MIGRACAO.md`:

```markdown
### Razão Energética (frmColEnergetica.aspx)
- [x] Migrada
- [x] Conectada ao Backend ✅ **NEW**
- [x] Service layer: `energeticService.ts` ✅ **NEW**
- [x] Hooks: `useEnergeticData.ts` ✅ **NEW**
- [x] Testes: 100% coverage ✅ **NEW**
```

## Backend Connection Checklist (36 Points)

Use this checklist for EVERY page connected to backend:

**Service Layer** (6 points):
- [ ] Service file exists in `frontend/src/services/{domain}Service.ts`
- [ ] All CRUD functions implemented (fetch, save, update, delete)
- [ ] DTO transformations implemented
- [ ] Error normalization implemented
- [ ] Service tests exist with 100% coverage
- [ ] All service tests pass

**React Query Hooks** (6 points):
- [ ] Hook file exists in `frontend/src/hooks/use{Domain}Data.ts`
- [ ] Query hooks created for reads
- [ ] Mutation hooks created for writes
- [ ] Hooks use service layer (no direct API calls)
- [ ] Hook tests exist with full coverage
- [ ] All hook tests pass

**Component Integration** (7 points):
- [ ] Component imports hooks (not service directly)
- [ ] Loading state displays correctly
- [ ] Success state displays data correctly
- [ ] Error state displays user-friendly message
- [ ] Success feedback displays after mutations
- [ ] Component tests updated to mock hooks
- [ ] All component tests pass with 100% coverage

**Integration Testing** (5 points):
- [ ] Integration test exists in `frontend/tests/integration/`
- [ ] Test covers full user flow (load → interact → save → confirm)
- [ ] Test covers error recovery (error → retry → success)
- [ ] MSW handlers configured
- [ ] All integration tests pass

**Quality Gates** (6 points):
- [ ] All tests pass (`npm test`)
- [ ] Test coverage 100% on touched files
- [ ] No console errors or warnings
- [ ] Visual parity maintained (no UI changes)
- [ ] Accessibility validated
- [ ] Responsive design maintained

**Documentation** (6 points):
- [ ] Service functions documented with JSDoc
- [ ] Hook usage documented
- [ ] Error scenarios documented
- [ ] Backend API contract documented
- [ ] `.github/CHECKLIST_MIGRACAO.md` updated
- [ ] Status marked as "Conectada ao Backend"

---

**Total Time per Page**: ~7 hours  
**Quickstart Status**: ✅ **COMPLETE** - Ready for use by developers
