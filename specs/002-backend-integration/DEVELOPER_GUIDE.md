# Quick Start: Continue Backend Integration Implementation

**Current Status**: Phase 3.1 (Razão Energética) - 50% complete  
**Total Tasks Remaining**: ~220 tasks across Phases 3.1-7  
**Estimated Timeline**: 24-30 hours with 3 parallel developers

---

## What's Been Done ✅

- **Phase 1**: Error handling, DTOs, API types, MSW setup (COMPLETE)
- **Phase 2**: Company, Plant, PlantType services & hooks (COMPLETE)
- **Phase 3.1 (50%)**: Energetic service & hooks with 81 tests (COMPLETE)
- **Remaining**: Component connection, tests, 6 more critical routines, 27 data collection pages

---

## How to Continue: Phase 3.1 Completion

### Step 1: Connect Energetic Component (T030-T032)

**File**: `frontend/src/pages/Collection/Energetic/Energetic.tsx`

```typescript
import { useEnergeticDataManager } from '../../hooks/useEnergeticData';

export function Energetic() {
  // Replace mock data with real backend
  const { 
    data, 
    isLoading, 
    error, 
    bulkUpsert, 
    isBulkUpserting 
  } = useEnergeticDataManager();

  // Show loading skeleton
  if (isLoading) return <LoadingSkeleton />;

  // Show error with retry
  if (error) return <ErrorAlert error={error} onRetry={refetch} />;

  // Normal rendering with real data
  return (
    <div>
      <DataGrid 
        data={data}
        onSave={(newData) => bulkUpsert(newData)}
        isSaving={isBulkUpserting}
      />
    </div>
  );
}
```

**TODO Checklist for component update**:
- [ ] Import hook and remove mock data
- [ ] Add loading state UI (spinner or skeleton)
- [ ] Add error state UI (alert with retry button)
- [ ] Connect data grid to real backend
- [ ] Handle bulk save for 48 intervals
- [ ] Add try/catch for edge cases

### Step 2: Update Component Tests (T033)

**File**: `frontend/tests/pages/Energetic.test.tsx`

```typescript
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Energetic } from '../../../src/pages/Collection/Energetic/Energetic';

// Mock the hook instead of backend directly
vi.mock('../../../src/hooks/useEnergeticData', () => ({
  useEnergeticDataManager: vi.fn()
}));

describe('Energetic Component', () => {
  it('should show loading state', () => {
    vi.mocked(useEnergeticDataManager).mockReturnValue({
      isLoading: true,
      data: [],
      error: null,
      // ... other properties
    });

    render(<Energetic />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('should show error with retry', () => {
    vi.mocked(useEnergeticDataManager).mockReturnValue({
      isLoading: false,
      data: [],
      error: new Error('Server error'),
      // ... other properties
    });

    render(<Energetic />);
    expect(screen.getByText(/error/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
  });

  it('should render data grid with real data', () => {
    vi.mocked(useEnergeticDataManager).mockReturnValue({
      isLoading: false,
      data: [...], // Real data
      error: null,
      // ... other properties
    });

    render(<Energetic />);
    // Verify data is displayed
  });
});
```

### Step 3: Create Integration Test (T034)

**File**: `frontend/tests/integration/energetic-flow.test.tsx`

```typescript
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Energetic } from '../../../src/pages/Collection/Energetic/Energetic';
import { mockEndpoint } from '../setup/mswServer';

describe('Energetic Data Flow - Integration', () => {
  it('should complete full user flow: load → edit → save', async () => {
    // 1. SETUP: Mock initial data load
    mockEndpoint('get', '/dadosenergeticos/usina/100/data/2024-01-15', [
      { id: 1, intervalo: 1, valorMW: 100, razaoEnergetica: 50 },
      // ... 47 more intervals
    ]);

    // 2. RENDER component
    render(<Energetic />);

    // 3. VERIFY: Initial load
    await waitFor(() => {
      expect(screen.getByText('100')).toBeInTheDocument(); // First value
    });

    // 4. EDIT: User modifies interval 1
    const valorInput = screen.getByDisplayValue('100');
    await userEvent.clear(valorInput);
    await userEvent.type(valorInput, '120');

    // 5. SAVE: User clicks save button
    mockEndpoint('post', '/dadosenergeticos/bulk', [
      { id: 1, intervalo: 1, valorMW: 120, razaoEnergetica: 50 },
      // ... updated intervals
    ], { status: 201 });

    await userEvent.click(screen.getByRole('button', { name: /save/i }));

    // 6. VERIFY: Success message and data refresh
    await waitFor(() => {
      expect(screen.getByText(/saved/i)).toBeInTheDocument();
    });

    // 7. VERIFY: New value persisted
    expect(screen.getByDisplayValue('120')).toBeInTheDocument();
  });

  it('should handle errors gracefully', async () => {
    // Mock error response
    mockErrorEndpoint('get', '/dadosenergeticos/usina/100/data/2024-01-15', 500, 'Server error');

    render(<Energetic />);

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });

    // User clicks retry
    await userEvent.click(screen.getByRole('button', { name: /retry/i }));

    // Now mock success
    mockEndpoint('get', '/dadosenergeticos/usina/100/data/2024-01-15', [...]);

    await waitFor(() => {
      expect(screen.getByText(/data/i)).toBeInTheDocument();
    });
  });
});
```

### Step 4: Verify Backend Connection Checklist (T035)

**File**: `.github/CHECKLIST_MIGRACAO.md`

Add to checklist for Razão Energética page:

```markdown
## Razão Energética (Energetic) - Backend Connection

### Service Layer (36 points)
- [x] Service layer created (energeticService.ts)
- [x] CRUD operations implemented (get, create, update, delete, bulk)
- [x] Error handling with normalizeError()
- [x] DTO transformation (transformFromApi/transformToApi)
- [x] 100% test coverage on service (35+ tests)
- [x] All HTTP error codes handled (400, 404, 409, 500)
- [x] Network errors handled gracefully
- [x] Retry logic in hooks enabled

### Hook Layer (36 points)
- [x] React Query hooks created (useEnergeticDataManager)
- [x] Query caching configured (5 min stale time)
- [x] Loading states managed
- [x] Error states with retry
- [x] 100% test coverage on hooks (11 test suites)
- [x] Bulk mutation for 48 intervals
- [x] Cache invalidation on mutations

### Component Layer
- [ ] Component connected to hooks (IN PROGRESS - T030)
- [ ] Loading UI implemented (T031)
- [ ] Error UI with retry (T032)
- [ ] Component tests updated to mock hooks (T033)
- [ ] Integration test created (T034)

### Data & Functionality
- [ ] All 48 intervals fetch correctly
- [ ] Bulk edit/save works for all intervals
- [ ] Calculations (total, average) correct
- [ ] Date selection cascades properly
- [ ] Usina selection cascades properly

### Performance & Quality
- [ ] API calls complete < 2 seconds (95% target)
- [ ] No console errors/warnings
- [ ] Accessibility check (WCAG 2.1 AA)
- [ ] Responsive design (desktop/tablet/mobile)
- [ ] Error messages user-friendly (Portuguese)
- [ ] Loading indicators visible

### Documentation
- [x] Service documented (JSDoc)
- [x] Hooks documented (JSDoc)
- [ ] Component documented (needs update)
- [ ] Integration test documented
- [ ] README updated with new endpoints
```

---

## Pattern for Next Critical Routine (Razão Elétrica)

After completing Phase 3.1, use this exact pattern for remaining 6 critical routines:

### T036-T039: Service Layer
```
1. Check electrical.ts service exists
2. Add error handling: import normalizeError
3. Add DTO transformation: import transformers
4. Wrap all methods in try/catch
5. Update endpoint URLs from backend API docs
```

### T040-T042: Service Tests
```
1. Copy energeticService.test.ts template
2. Replace "energetic" with "electrical"
3. Adjust test data for electrical properties
4. Test all error scenarios (400/404/500)
5. Test network errors
```

### T043-T044: Hooks & Hook Tests
```
1. Copy useEnergeticData.ts template
2. Replace queries/mutations for electrical
3. Create corresponding hook tests
4. Verify all state transitions
```

### T045-T050: Component Connection
```
1. Find Electrical.tsx component
2. Import useElectricalDataManager() hook
3. Replace mock data with real data
4. Add loading/error UI
5. Update component tests
6. Create integration test
```

---

## Running Tests Before Completing Each Task

```bash
# Test Phase 3.1 service
npm test -- energeticService.test.ts

# Test Phase 3.1 hooks
npm test -- useEnergeticData.test.ts

# Test Phase 3.1 component (once connected)
npm test -- Energetic.test.tsx

# Test integration flow
npm test -- energetic-flow.test.tsx

# Full test suite
npm test

# Watch specific file
npm test -- --watch energetic
```

---

## Key Files to Reference

| Purpose | File | Why Reference |
|---------|------|---|
| Service template | `frontend/src/services/energeticService.ts` | Shows error handling + transformers pattern |
| Hook template | `frontend/src/hooks/useEnergeticData.ts` | Shows React Query setup + bulk mutations |
| Service test template | `frontend/tests/services/energeticService.test.ts` | Shows error scenario coverage |
| Hook test template | `frontend/tests/hooks/useEnergeticData.test.ts` | Shows state transition testing |
| MSW setup | `frontend/tests/setup/mswServer.ts` | Use `mockEndpoint()` + `mockErrorEndpoint()` |
| Error handling | `frontend/src/utils/errorHandling.ts` | Import `normalizeError` in all services |
| Transformers | `frontend/src/utils/dtoTransformers.ts` | Use `transformFromApi` / `transformToApi` |

---

## Team Work Distribution (3 developers)

**Developer 1 (Backend Integration Lead)**:
- Continue Phase 3.1 completion (component connection)
- Oversee Phase 3.2-3.7 (all critical routines)
- Code review for all PRs

**Developer 2 (Service/Hook Implementation)**:
- Implement service + hooks for IR1, IR2, IR3, IR4
- Create all service and hook tests
- Parallel work: Can work while Dev 1 does component connection

**Developer 3 (Component & Integration)**:
- Component connection for Energetic (once service/hooks ready)
- Component tests and integration tests
- Can work in parallel after Phase 2 foundational complete

---

## Commit Message Format

```
feat(backend-integration): T030 Connect Energetic component to backend

- Import useEnergeticDataManager hook
- Replace mock data with real backend calls
- Add loading spinner UI
- Add error alert with retry button
- Update component tests to mock hook

Refs: specs/002-backend-integration/tasks.md#T030-T032
Related: CHECKLIST_MIGRACAO.md - Razão Energética
```

---

## Common Issues & Solutions

### Issue: "Cannot find module energeticService"
**Solution**: Check service export: `export const energeticService = {...}`

### Issue: "Hook returns undefined data"
**Solution**: Check React Query wrapper in tests: `<QueryClientProvider>`

### Issue: "Test hangs on waitFor"
**Solution**: Mock MSW endpoint before rendering: `mockEndpoint('get', '/path', data)`

### Issue: "Transform error on dates"
**Solution**: Ensure API response has ISO date format: `"2024-01-15T00:00:00Z"`

---

## Success Criteria for Phase 3.1

- [ ] Component loads real data from backend
- [ ] User can edit 48 intervals
- [ ] Bulk save sends all intervals correctly
- [ ] Errors display with retry button
- [ ] All 130+ tests passing
- [ ] API calls < 2 seconds
- [ ] No console errors
- [ ] CHECKLIST_MIGRACAO.md shows ✅ for all 36 points

**Estimated Time**: 2-3 hours for one developer

---

**Next Command**: `npm test` to verify all existing tests pass before proceeding
