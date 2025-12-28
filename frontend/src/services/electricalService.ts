import { apiClient } from './apiClient';

export interface DadoEletrico {
  id: number;
  usinaId: number;
  usinaNome?: string;
  dataReferencia: string;
  intervalo: number;
  potenciaMW: number;
  razaoEletrica: number;
  fatorPotencia?: number;
  observacao?: string;
}

export interface CreateDadoEletricoDto {
  usinaId: number;
  dataReferencia: string;
  intervalo: number;
  potenciaMW: number;
  razaoEletrica: number;
  fatorPotencia?: number;
  observacao?: string;
}

export interface UpdateDadoEletricoDto {
  potenciaMW?: number;
  razaoEletrica?: number;
  fatorPotencia?: number;
  observacao?: string;
}

export const electricalService = {
  /**
   * Obtém todos os dados elétricos
   */
  async getAll(): Promise<DadoEletrico[]> {
    return apiClient.get<DadoEletrico[]>('/dados-eletricos');
  },

  /**
   * Obtém um dado elétrico por ID
   */
  async getById(id: number): Promise<DadoEletrico> {
    return apiClient.get<DadoEletrico>(`/dados-eletricos/${id}`);
  },

  /**
   * Obtém dados elétricos por período
   */
  async getByPeriod(dataInicio: string, dataFim: string): Promise<DadoEletrico[]> {
    return apiClient.get<DadoEletrico[]>(
      `/dados-eletricos/periodo?dataInicio=${dataInicio}&dataFim=${dataFim}`
    );
  },

  /**
   * Obtém dados elétricos por usina e data
   */
  async getByUsinaAndDate(usinaId: number, dataReferencia: string): Promise<DadoEletrico[]> {
    return apiClient.get<DadoEletrico[]>(
      `/dados-eletricos/usina/${usinaId}/data/${dataReferencia}`
    );
  },

  /**
   * Cria um novo dado elétrico
   */
  async create(data: CreateDadoEletricoDto): Promise<DadoEletrico> {
    return apiClient.post<DadoEletrico>('/dados-eletricos', data);
  },

  /**
   * Atualiza um dado elétrico existente
   */
  async update(id: number, data: UpdateDadoEletricoDto): Promise<void> {
    return apiClient.put<void>(`/dados-eletricos/${id}`, data);
  },

  /**
   * Remove um dado elétrico
   */
  async delete(id: number): Promise<void> {
    return apiClient.delete(`/dados-eletricos/${id}`);
  },

  /**
   * Cria ou atualiza múltiplos dados elétricos (bulk)
   */
  async bulkUpsert(dados: CreateDadoEletricoDto[]): Promise<DadoEletrico[]> {
    return apiClient.post<DadoEletrico[]>('/dados-eletricos/bulk', dados);
  },
};
