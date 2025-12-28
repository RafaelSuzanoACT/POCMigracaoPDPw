import { apiClient } from './apiClient';

export interface DadoEnergetico {
  id: number;
  usinaId: number;
  usinaNome?: string;
  dataReferencia: string;
  intervalo: number;
  valorMW: number;
  razaoEnergetica: number;
  observacao?: string;
}

export interface CreateDadoEnergeticoDto {
  usinaId: number;
  dataReferencia: string;
  intervalo: number;
  valorMW: number;
  razaoEnergetica: number;
  observacao?: string;
}

export interface UpdateDadoEnergeticoDto {
  valorMW?: number;
  razaoEnergetica?: number;
  observacao?: string;
}

export const energeticService = {
  /**
   * Obtém todos os dados energéticos
   */
  async getAll(): Promise<DadoEnergetico[]> {
    return apiClient.get<DadoEnergetico[]>('/dados-energeticos');
  },

  /**
   * Obtém um dado energético por ID
   */
  async getById(id: number): Promise<DadoEnergetico> {
    return apiClient.get<DadoEnergetico>(`/dados-energeticos/${id}`);
  },

  /**
   * Obtém dados energéticos por período
   */
  async getByPeriod(dataInicio: string, dataFim: string): Promise<DadoEnergetico[]> {
    return apiClient.get<DadoEnergetico[]>(
      `/dados-energeticos/periodo?dataInicio=${dataInicio}&dataFim=${dataFim}`
    );
  },

  /**
   * Obtém dados energéticos por usina e data
   */
  async getByUsinaAndDate(usinaId: number, dataReferencia: string): Promise<DadoEnergetico[]> {
    return apiClient.get<DadoEnergetico[]>(
      `/dados-energeticos/usina/${usinaId}/data/${dataReferencia}`
    );
  },

  /**
   * Cria um novo dado energético
   */
  async create(data: CreateDadoEnergeticoDto): Promise<DadoEnergetico> {
    return apiClient.post<DadoEnergetico>('/dados-energeticos', data);
  },

  /**
   * Atualiza um dado energético existente
   */
  async update(id: number, data: UpdateDadoEnergeticoDto): Promise<void> {
    return apiClient.put<void>(`/dados-energeticos/${id}`, data);
  },

  /**
   * Remove um dado energético
   */
  async delete(id: number): Promise<void> {
    return apiClient.delete(`/dados-energeticos/${id}`);
  },

  /**
   * Cria ou atualiza múltiplos dados energéticos (bulk)
   */
  async bulkUpsert(dados: CreateDadoEnergeticoDto[]): Promise<DadoEnergetico[]> {
    return apiClient.post<DadoEnergetico[]>('/dados-energeticos/bulk', dados);
  },
};
