/**
 * usePlants Hook
 * 
 * React Query hook for managing plant (usina) data
 * T013: Create usePlants hook in frontend/src/hooks/usePlants.ts
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plant } from '../types/api';
import { plantService, CreatePlantDto, UpdatePlantDto } from '../services/plantService';

const PLANTS_QUERY_KEY = 'plants';

/**
 * Hook to fetch all plants
 */
export function usePlants() {
  return useQuery({
    queryKey: [PLANTS_QUERY_KEY],
    queryFn: () => plantService.getAll(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to fetch plants by company
 */
export function usePlantsByCompany(companyId?: number) {
  return useQuery({
    queryKey: [PLANTS_QUERY_KEY, 'company', companyId],
    queryFn: () => (companyId ? plantService.getByCompany(companyId) : null),
    enabled: !!companyId,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch single plant by ID
 */
export function usePlantById(id?: number) {
  return useQuery({
    queryKey: [PLANTS_QUERY_KEY, id],
    queryFn: () => (id ? plantService.getById(id) : null),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to create plant
 */
export function useCreatePlant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreatePlantDto) => plantService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PLANTS_QUERY_KEY] });
    },
  });
}

/**
 * Hook to update plant
 */
export function useUpdatePlant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: UpdatePlantDto }) =>
      plantService.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PLANTS_QUERY_KEY] });
    },
  });
}

/**
 * Hook to delete plant
 */
export function useDeletePlant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => plantService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PLANTS_QUERY_KEY] });
    },
  });
}

/**
 * Combined hook for plant CRUD operations
 */
export function usePlantData() {
  const query = usePlants();
  const createMutation = useCreatePlant();
  const updateMutation = useUpdatePlant();
  const deleteMutation = useDeletePlant();

  return {
    // Query data and state
    plants: query.data || [],
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,

    // Mutations
    create: createMutation.mutate,
    update: updateMutation.mutate,
    delete: deleteMutation.mutate,

    // Mutation states
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,

    // Refetch
    refetch: query.refetch,
  };
}
