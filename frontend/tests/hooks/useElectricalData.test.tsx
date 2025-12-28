/**
 * Testes para hooks de Dados Elétricos (Razão Elétrica)
 * Testa os hooks do React Query que gerenciam estado de dados elétricos
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import {
  useElectricalData,
  useElectricalDataByPeriod,
  useElectricalDataByUsinaAndDate,
  useCreateElectricalData,
  useUpdateElectricalData,
  useDeleteElectricalData,
  useBulkUpsertElectricalData,
} from '../../src/hooks/useElectricalData';
import * as electricalService from '../../src/services/electricalService';

// Mock the entire service module
vi.mock('../../src/services/electricalService', () => ({
  getAll: vi.fn(),
  getById: vi.fn(),
  getByPeriod: vi.fn(),
  getByUsinaAndDate: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
  bulkUpsert: vi.fn(),
}));

const mockElectricalData = [
  {
    id: '1',
    dataPdp: '2024-01-15',
    codigoEmpresa: 'EMP001',
    codigoUsina: 'UHE001',
    intervalo: 1,
    potenciaMW: 150.5,
    observacao: 'Normal',
    criadoEm: '2024-01-15T10:00:00Z',
    atualizadoEm: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    dataPdp: '2024-01-15',
    codigoEmpresa: 'EMP001',
    codigoUsina: 'UHE001',
    intervalo: 2,
    potenciaMW: 155.0,
    observacao: null,
    criadoEm: '2024-01-15T10:00:00Z',
    atualizadoEm: '2024-01-15T10:00:00Z',
  },
];

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
}

function createWrapper(queryClient: QueryClient) {
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe('useElectricalData hooks', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = createTestQueryClient();
    vi.clearAllMocks();
  });

  describe('useElectricalData', () => {
    it('deve retornar dados elétricos quando carregados com sucesso', async () => {
      vi.mocked(electricalService.getAll).mockResolvedValue(mockElectricalData);

      const { result } = renderHook(() => useElectricalData(), { 
        wrapper: createWrapper(queryClient),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(mockElectricalData);
      expect(electricalService.getAll).toHaveBeenCalledTimes(1);
    });

    it('deve gerenciar estado de loading corretamente', async () => {
      vi.mocked(electricalService.getAll).mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve(mockElectricalData), 100))
      );

      const { result } = renderHook(() => useElectricalData(), { 
        wrapper: createWrapper(queryClient),
      });

      expect(result.current.isLoading).toBe(true);

      await waitFor(() => expect(result.current.isLoading).toBe(false));
      expect(result.current.data).toEqual(mockElectricalData);
    });

    it('deve gerenciar estado de erro corretamente', async () => {
      const error = new Error('Erro ao carregar dados');
      vi.mocked(electricalService.getAll).mockRejectedValue(error);

      const { result } = renderHook(() => useElectricalData(), { 
        wrapper: createWrapper(queryClient),
      });

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(result.current.error).toBeTruthy();
      expect(result.current.data).toBeUndefined();
    });
  });

  describe('useElectricalDataByPeriod', () => {
    it('deve buscar dados por período quando datas são fornecidas', async () => {
      vi.mocked(electricalService.getByPeriod).mockResolvedValue(mockElectricalData);

      const { result } = renderHook(
        () => useElectricalDataByPeriod('2024-01-15', '2024-01-15'),
        { wrapper: createWrapper(queryClient) }
      );

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(mockElectricalData);
      expect(electricalService.getByPeriod).toHaveBeenCalledWith('2024-01-15', '2024-01-15');
    });

    it('não deve fazer request quando datas não são fornecidas', () => {
      const { result } = renderHook(
        () => useElectricalDataByPeriod('', ''),
        { wrapper: createWrapper(queryClient) }
      );

      expect(result.current.isPending).toBe(true);
      expect(electricalService.getByPeriod).not.toHaveBeenCalled();
    });

    it('não deve fazer request quando apenas uma data é fornecida', () => {
      const { result } = renderHook(
        () => useElectricalDataByPeriod('2024-01-15', ''),
        { wrapper: createWrapper(queryClient) }
      );

      expect(result.current.isPending).toBe(true);
      expect(electricalService.getByPeriod).not.toHaveBeenCalled();
    });
  });

  describe('useElectricalDataByUsinaAndDate', () => {
    it('deve buscar dados por usina e data quando parâmetros são fornecidos', async () => {
      vi.mocked(electricalService.getByUsinaAndDate).mockResolvedValue(mockElectricalData);

      const { result } = renderHook(
        () => useElectricalDataByUsinaAndDate('UHE001', '2024-01-15'),
        { wrapper: createWrapper(queryClient) }
      );

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(mockElectricalData);
      expect(electricalService.getByUsinaAndDate).toHaveBeenCalledWith('UHE001', '2024-01-15');
    });

    it('não deve fazer request quando parâmetros não são fornecidos', () => {
      const { result } = renderHook(
        () => useElectricalDataByUsinaAndDate('', ''),
        { wrapper: createWrapper(queryClient) }
      );

      expect(result.current.isPending).toBe(true);
      expect(electricalService.getByUsinaAndDate).not.toHaveBeenCalled();
    });
  });

  describe('useCreateElectricalData', () => {
    it('deve criar novo dado elétrico com sucesso', async () => {
      const newData = {
        dataPdp: '2024-01-15',
        codigoEmpresa: 'EMP001',
        codigoUsina: 'UHE001',
        intervalo: 3,
        potenciaMW: 160.0,
      };

      const createdData = { ...newData, id: '3', criadoEm: '2024-01-15T10:00:00Z', atualizadoEm: '2024-01-15T10:00:00Z' };
      vi.mocked(electricalService.create).mockResolvedValue(createdData);

      const { result } = renderHook(() => useCreateElectricalData(), { 
        wrapper: createWrapper(queryClient),
      });

      result.current.mutate(newData);

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(createdData);
      expect(electricalService.create).toHaveBeenCalledWith(newData);
    });

    it('deve invalidar cache após criar com sucesso', async () => {
      const newData = {
        dataPdp: '2024-01-15',
        codigoEmpresa: 'EMP001',
        codigoUsina: 'UHE001',
        intervalo: 3,
        potenciaMW: 160.0,
      };

      const createdData = { ...newData, id: '3', criadoEm: '2024-01-15T10:00:00Z', atualizadoEm: '2024-01-15T10:00:00Z' };
      vi.mocked(electricalService.create).mockResolvedValue(createdData);

      const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

      const { result } = renderHook(() => useCreateElectricalData(), { 
        wrapper: createWrapper(queryClient),
      });

      result.current.mutate(newData);

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['electricalData'] });
    });

    it('deve gerenciar erro ao criar', async () => {
      const error = new Error('Erro ao criar dado');
      vi.mocked(electricalService.create).mockRejectedValue(error);

      const { result } = renderHook(() => useCreateElectricalData(), { 
        wrapper: createWrapper(queryClient),
      });

      result.current.mutate({
        dataPdp: '2024-01-15',
        codigoEmpresa: 'EMP001',
        codigoUsina: 'UHE001',
        intervalo: 3,
        potenciaMW: 160.0,
      });

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(result.current.error).toBeTruthy();
    });
  });

  describe('useUpdateElectricalData', () => {
    it('deve atualizar dado elétrico com sucesso', async () => {
      const updateData = {
        dataPdp: '2024-01-15',
        codigoEmpresa: 'EMP001',
        codigoUsina: 'UHE001',
        intervalo: 1,
        potenciaMW: 170.0,
      };

      vi.mocked(electricalService.update).mockResolvedValue();

      const { result } = renderHook(() => useUpdateElectricalData(), { 
        wrapper: createWrapper(queryClient),
      });

      result.current.mutate({ id: '1', data: updateData });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(electricalService.update).toHaveBeenCalledWith('1', updateData);
    });

    it('deve invalidar cache após atualizar com sucesso', async () => {
      vi.mocked(electricalService.update).mockResolvedValue();

      const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

      const { result } = renderHook(() => useUpdateElectricalData(), { 
        wrapper: createWrapper(queryClient),
      });

      result.current.mutate({
        id: '1',
        data: {
          dataPdp: '2024-01-15',
          codigoEmpresa: 'EMP001',
          codigoUsina: 'UHE001',
          intervalo: 1,
          potenciaMW: 170.0,
        },
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['electricalData'] });
    });
  });

  describe('useDeleteElectricalData', () => {
    it('deve deletar dado elétrico com sucesso', async () => {
      vi.mocked(electricalService.delete).mockResolvedValue();

      const { result } = renderHook(() => useDeleteElectricalData(), { 
        wrapper: createWrapper(queryClient),
      });

      result.current.mutate('1');

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(electricalService.delete).toHaveBeenCalledWith('1');
    });

    it('deve invalidar cache após deletar com sucesso', async () => {
      vi.mocked(electricalService.delete).mockResolvedValue();

      const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

      const { result } = renderHook(() => useDeleteElectricalData(), { 
        wrapper: createWrapper(queryClient),
      });

      result.current.mutate('1');

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['electricalData'] });
    });
  });

  describe('useBulkUpsertElectricalData', () => {
    it('deve fazer bulk upsert com sucesso', async () => {
      const bulkData = [
        {
          dataPdp: '2024-01-15',
          codigoEmpresa: 'EMP001',
          codigoUsina: 'UHE001',
          intervalo: 1,
          potenciaMW: 150.5,
        },
        {
          dataPdp: '2024-01-15',
          codigoEmpresa: 'EMP001',
          codigoUsina: 'UHE001',
          intervalo: 2,
          potenciaMW: 155.0,
        },
      ];

      vi.mocked(electricalService.bulkUpsert).mockResolvedValue(mockElectricalData);

      const { result } = renderHook(() => useBulkUpsertElectricalData(), { 
        wrapper: createWrapper(queryClient),
      });

      result.current.mutate(bulkData);

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(mockElectricalData);
      expect(electricalService.bulkUpsert).toHaveBeenCalledWith(bulkData);
    });

    it('deve invalidar cache após bulk upsert com sucesso', async () => {
      const bulkData = [
        {
          dataPdp: '2024-01-15',
          codigoEmpresa: 'EMP001',
          codigoUsina: 'UHE001',
          intervalo: 1,
          potenciaMW: 150.5,
        },
      ];

      vi.mocked(electricalService.bulkUpsert).mockResolvedValue(mockElectricalData);

      const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

      const { result } = renderHook(() => useBulkUpsertElectricalData(), { 
        wrapper: createWrapper(queryClient),
      });

      result.current.mutate(bulkData);

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['electricalData'] });
    });

    it('deve gerenciar erro ao fazer bulk upsert', async () => {
      const error = new Error('Erro ao fazer bulk upsert');
      vi.mocked(electricalService.bulkUpsert).mockRejectedValue(error);

      const { result } = renderHook(() => useBulkUpsertElectricalData(), { 
        wrapper: createWrapper(queryClient),
      });

      result.current.mutate([
        {
          dataPdp: '2024-01-15',
          codigoEmpresa: 'EMP001',
          codigoUsina: 'UHE001',
          intervalo: 1,
          potenciaMW: 150.5,
        },
      ]);

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(result.current.error).toBeTruthy();
    });
  });
});
