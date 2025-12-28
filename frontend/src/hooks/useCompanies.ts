/**
 * useCompanies Hook
 * 
 * React Query hook for managing company data
 * T012: Create useCompanies hook in frontend/src/hooks/useCompanies.ts
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Company } from '../types/api';
import { companyService, CreateCompanyDto, UpdateCompanyDto } from '../services/companyService';

const COMPANIES_QUERY_KEY = 'companies';

/**
 * Hook to fetch all companies
 */
export function useCompanies() {
  return useQuery({
    queryKey: [COMPANIES_QUERY_KEY],
    queryFn: () => companyService.getAll(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to fetch single company by ID
 */
export function useCompanyById(id?: number) {
  return useQuery({
    queryKey: [COMPANIES_QUERY_KEY, id],
    queryFn: () => (id ? companyService.getById(id) : null),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to create company
 */
export function useCreateCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateCompanyDto) => companyService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [COMPANIES_QUERY_KEY] });
    },
  });
}

/**
 * Hook to update company
 */
export function useUpdateCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: UpdateCompanyDto }) =>
      companyService.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [COMPANIES_QUERY_KEY] });
    },
  });
}

/**
 * Hook to delete company
 */
export function useDeleteCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => companyService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [COMPANIES_QUERY_KEY] });
    },
  });
}

/**
 * Combined hook for company CRUD operations
 */
export function useCompanyData() {
  const query = useCompanies();
  const createMutation = useCreateCompany();
  const updateMutation = useUpdateCompany();
  const deleteMutation = useDeleteCompany();

  return {
    // Query data and state
    companies: query.data || [],
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
