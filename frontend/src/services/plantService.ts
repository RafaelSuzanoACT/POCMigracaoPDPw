/**
 * Plant Service
 * 
 * Handles fetching and managing plant (usina) data from backend
 * T010: Create Plant service in frontend/src/services/plantService.ts
 */

import { apiClient } from './apiClient';
import { Plant } from '../types/api';
import { transformFromApi, transformToApi } from '../utils/dtoTransformers';
import { normalizeError } from '../utils/errorHandling';

export interface CreatePlantDto {
  name: string;
  code: string;
  type: string;
  companyId: number;
}

export interface UpdatePlantDto {
  name?: string;
  code?: string;
  type?: string;
}

export const plantService = {
  /**
   * Get all plants
   */
  async getAll(): Promise<Plant[]> {
    try {
      const data = await apiClient.get<Plant[]>('/plants');
      return transformFromApi(data);
    } catch (error) {
      const normalizedError = normalizeError(error);
      throw new Error(`Failed to fetch plants: ${normalizedError.message}`);
    }
  },

  /**
   * Get plants by company
   */
  async getByCompany(companyId: number): Promise<Plant[]> {
    try {
      const data = await apiClient.get<Plant[]>(`/plants?companyId=${companyId}`);
      return transformFromApi(data);
    } catch (error) {
      const normalizedError = normalizeError(error);
      throw new Error(`Failed to fetch plants: ${normalizedError.message}`);
    }
  },

  /**
   * Get plant by ID
   */
  async getById(id: number): Promise<Plant> {
    try {
      const data = await apiClient.get<Plant>(`/plants/${id}`);
      return transformFromApi(data);
    } catch (error) {
      const normalizedError = normalizeError(error);
      throw new Error(`Failed to fetch plant: ${normalizedError.message}`);
    }
  },

  /**
   * Create new plant
   */
  async create(dto: CreatePlantDto): Promise<Plant> {
    try {
      const payload = transformToApi(dto);
      const data = await apiClient.post<Plant>('/plants', payload);
      return transformFromApi(data);
    } catch (error) {
      const normalizedError = normalizeError(error);
      throw new Error(`Failed to create plant: ${normalizedError.message}`);
    }
  },

  /**
   * Update plant
   */
  async update(id: number, dto: UpdatePlantDto): Promise<Plant> {
    try {
      const payload = transformToApi(dto);
      const data = await apiClient.put<Plant>(`/plants/${id}`, payload);
      return transformFromApi(data);
    } catch (error) {
      const normalizedError = normalizeError(error);
      throw new Error(`Failed to update plant: ${normalizedError.message}`);
    }
  },

  /**
   * Delete plant
   */
  async delete(id: number): Promise<void> {
    try {
      return await apiClient.delete(`/plants/${id}`);
    } catch (error) {
      const normalizedError = normalizeError(error);
      throw new Error(`Failed to delete plant: ${normalizedError.message}`);
    }
  },
};
