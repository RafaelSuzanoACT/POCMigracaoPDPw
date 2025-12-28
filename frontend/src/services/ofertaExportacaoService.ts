import { apiClient } from './apiClient';

export interface OfertaExportacao {
  id: number;
  usinaId: number;
  usinaNome?: string;
  empresaId: number;
  empresaNome?: string;
  dataPDP: string;
  tipoPrograma: string;
  statusONS: 'PENDENTE' | 'APROVADA' | 'REJEITADA';
  dataEnvio: string;
  dataAnalise?: string;
  observacaoONS?: string;
  intervalos: IntervaloPotencia[];
}

export interface IntervaloPotencia {
  intervalo: number;
  potenciaOfertadaMW: number;
  potenciaAprovadaMW?: number;
}

export interface CreateOfertaExportacaoDto {
  usinaId: number;
  empresaId: number;
  dataPDP: string;
  tipoPrograma: string;
  intervalos: IntervaloPotencia[];
}

export interface UpdateOfertaExportacaoDto {
  statusONS?: 'PENDENTE' | 'APROVADA' | 'REJEITADA';
  observacaoONS?: string;
  intervalos?: IntervaloPotencia[];
}

export const ofertaExportacaoService = {
  /**
   * Obtém todas as ofertas de exportação
   */
  async getAll(): Promise<OfertaExportacao[]> {
    return apiClient.get<OfertaExportacao[]>('/ofertas-exportacao');
  },

  /**
   * Obtém uma oferta por ID
   */
  async getById(id: number): Promise<OfertaExportacao> {
    return apiClient.get<OfertaExportacao>(`/ofertas-exportacao/${id}`);
  },

  /**
   * Obtém ofertas pendentes de análise
   */
  async getPendentes(): Promise<OfertaExportacao[]> {
    return apiClient.get<OfertaExportacao[]>('/ofertas-exportacao/pendentes');
  },

  /**
   * Obtém ofertas aprovadas
   */
  async getAprovadas(): Promise<OfertaExportacao[]> {
    return apiClient.get<OfertaExportacao[]>('/ofertas-exportacao/aprovadas');
  },

  /**
   * Obtém ofertas rejeitadas
   */
  async getRejeitadas(): Promise<OfertaExportacao[]> {
    return apiClient.get<OfertaExportacao[]>('/ofertas-exportacao/rejeitadas');
  },

  /**
   * Obtém ofertas por usina
   */
  async getByUsina(usinaId: number): Promise<OfertaExportacao[]> {
    return apiClient.get<OfertaExportacao[]>(`/ofertas-exportacao/usina/${usinaId}`);
  },

  /**
   * Obtém ofertas por empresa
   */
  async getByEmpresa(empresaId: number): Promise<OfertaExportacao[]> {
    return apiClient.get<OfertaExportacao[]>(`/ofertas-exportacao/empresa/${empresaId}`);
  },

  /**
   * Obtém ofertas por data PDP
   */
  async getByDataPDP(dataPDP: string): Promise<OfertaExportacao[]> {
    return apiClient.get<OfertaExportacao[]>(`/ofertas-exportacao/data-pdp/${dataPDP}`);
  },

  /**
   * Cria uma nova oferta de exportação
   */
  async create(data: CreateOfertaExportacaoDto): Promise<OfertaExportacao> {
    return apiClient.post<OfertaExportacao>('/ofertas-exportacao', data);
  },

  /**
   * Atualiza uma oferta de exportação
   */
  async update(id: number, data: UpdateOfertaExportacaoDto): Promise<void> {
    return apiClient.put<void>(`/ofertas-exportacao/${id}`, data);
  },

  /**
   * Remove uma oferta de exportação
   */
  async delete(id: number): Promise<void> {
    return apiClient.delete(`/ofertas-exportacao/${id}`);
  },

  /**
   * Aprova uma oferta (ONS)
   */
  async aprovar(id: number, observacao?: string): Promise<void> {
    return apiClient.post<void>(`/ofertas-exportacao/${id}/aprovar`, { observacao });
  },

  /**
   * Rejeita uma oferta (ONS)
   */
  async rejeitar(id: number, observacao: string): Promise<void> {
    return apiClient.post<void>(`/ofertas-exportacao/${id}/rejeitar`, { observacao });
  },

  /**
   * Envia oferta para análise do ONS
   */
  async enviar(id: number): Promise<void> {
    return apiClient.post<void>(`/ofertas-exportacao/${id}/enviar`, {});
  },
};
