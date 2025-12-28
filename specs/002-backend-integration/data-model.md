# Data Model: Backend Integration

**Phase**: 1 - Design & Contracts  
**Date**: 2025-12-28  
**Purpose**: Define service interfaces, hook signatures, error types, and DTO transformations

## Service Layer Interfaces

### Standard Service Pattern

Every service module exports functions following this pattern:

```typescript
// Pattern: {Domain}Service.ts
export async function fetch{Domain}Data(params): Promise<{Domain}Data>
export async function save{Domain}Data(data): Promise<{Domain}Data>
export async function update{Domain}Data(id, data): Promise<{Domain}Data>
export async function delete{Domain}Data(id): Promise<void>
```

### Example: Energetic Service Interface

```typescript
// frontend/src/services/energeticService.ts
export async function fetchEnergeticData(
  date: string,
  companyId: number
): Promise<EnergeticData>;

export async function saveEnergeticData(
  data: SaveEnergeticRequest
): Promise<EnergeticData>;

export async function deleteEnergeticData(
  date: string,
  companyId: number
): Promise<void>;
```

## React Query Hook Signatures

### Standard Hook Pattern

Every hook module exports hooks following this pattern:

```typescript
// Pattern: use{Domain}Data.ts
export function use{Domain}Data(params): UseQueryResult<{Domain}Data>
export function useSave{Domain}(): UseMutationResult<{Domain}Data>
export function useUpdate{Domain}(): UseMutationResult<{Domain}Data>
export function useDelete{Domain}(): UseMutationResult<void>
```

### Example: Energetic Hook Signatures

```typescript
// frontend/src/hooks/useEnergeticData.ts
export function useEnergeticData(
  date: string,
  companyId: number
): UseQueryResult<EnergeticData, NormalizedError>;

export function useSaveEnergetic(): UseMutationResult<
  EnergeticData,
  NormalizedError,
  SaveEnergeticRequest
>;

export function useDeleteEnergetic(): UseMutationResult<
  void,
  NormalizedError,
  { date: string; companyId: number }
>;
```

## Error Type Definitions

### NormalizedError Type

```typescript
// frontend/src/types/api.ts
export interface NormalizedError {
  code: string; // 'VALIDATION_ERROR', 'UNAUTHORIZED', 'NOT_FOUND', etc.
  message: string; // User-friendly message in Portuguese
  field?: string; // Optional: field name for validation errors
  details?: ValidationError[]; // Optional: multiple validation errors
}

export interface ValidationError {
  field: string;
  message: string;
}
```

## DTO Transformation Function Signatures

### Transform Pattern

```typescript
// Pattern: transformers.ts
export function transform{Domain}FromBackend(dto: BackendDto): FrontendType
export function transform{Domain}ToBackend(data: FrontendType): BackendDto
```

### Example: Energetic Transformers

```typescript
// frontend/src/utils/dtoTransformers.ts
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

## Domain Types Summary

### Critical Routines (P1)

1. **Energetic**: `EnergeticData`, `SaveEnergeticRequest`
2. **Electrical**: `ElectricalData`, `SaveElectricalRequest`
3. **IR1**: `IR1Data`, `SaveIR1Request`
4. **IR2**: `IR2Data`, `SaveIR2Request`
5. **IR3**: `IR3Data`, `SaveIR3Request`
6. **IR4**: `IR4Data`, `SaveIR4Request`
7. **OfertaExportacao**: `OfertaExportacao`, `CreateOfertaRequest`

### Common Types

```typescript
export interface Company {
  id: number;
  name: string;
  code: string;
}

export interface Plant {
  id: number;
  name: string;
  companyId: number;
  type: string;
}

export interface IntervalData {
  intervals: number[]; // Always 48 intervals (30-min periods)
  total: number;
  average: number;
}
```

---

**Data Model Status**: ✅ **COMPLETE**  
**Next**: Create API contracts in `/contracts/` directory
