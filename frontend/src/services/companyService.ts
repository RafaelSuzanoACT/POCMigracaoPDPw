/**
 * Company Service
 * 
 * Handles fetching and managing company data from backend
 * T009: Create Company service in frontend/src/services/companyService.ts
 */

import { apiClient } from './apiClient';
import { Company } from '../types/api';
import { transformFromApi, transformToApi } from '../utils/dtoTransformers';
import { normalizeError } from '../utils/errorHandling';

export interface CreateCompanyDto {
  name: string;
  code: string;
}

export interface UpdateCompanyDto {
  name?: string;
  code?: string;
}

export const companyService = {
  /**
   * Get all companies
   */
  async getAll(): Promise<Company[]> {
    try {
      const data = await apiClient.get<Company[]>('/companies');
      return transformFromApi(data);
    } catch (error) {
      const normalizedError = normalizeError(error);
      throw new Error(`Failed to fetch companies: ${normalizedError.message}`);
    }
  },

  /**
   * Get company by ID
   */
  async getById(id: number): Promise<Company> {
    try {
      const data = await apiClient.get<Company>(`/companies/${id}`);
      return transformFromApi(data);
    } catch (error) {
      const normalizedError = normalizeError(error);
      throw new Error(`Failed to fetch company: ${normalizedError.message}`);
    }
  },

  /**
   * Create new company
   */
  async create(dto: CreateCompanyDto): Promise<Company> {
    try {
      const payload = transformToApi(dto);
      const data = await apiClient.post<Company>('/companies', payload);
      return transformFromApi(data);
    } catch (error) {
      const normalizedError = normalizeError(error);
      throw new Error(`Failed to create company: ${normalizedError.message}`);
    }
  },

  /**
   * Update company
   */
  async update(id: number, dto: UpdateCompanyDto): Promise<Company> {
    try {
      const payload = transformToApi(dto);
      const data = await apiClient.put<Company>(`/companies/${id}`, payload);
      return transformFromApi(data);
    } catch (error) {
      const normalizedError = normalizeError(error);
      throw new Error(`Failed to update company: ${normalizedError.message}`);
    }
  },

  /**
   * Delete company
   */
  async delete(id: number): Promise<void> {
    try {
      return await apiClient.delete(`/companies/${id}`);
    } catch (error) {
      const normalizedError = normalizeError(error);
      throw new Error(`Failed to delete company: ${normalizedError.message}`);
    }
  },
};
