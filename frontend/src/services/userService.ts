import { apiClient } from './apiClient';
import {
  User,
  UserFormData,
  UserListResponse,
  UserPaginationParams,
  UserOperationResponse,
} from '../types/user';

export const userService = {
  /**
   * Lista usuários com paginação e filtros
   */
  list: async (params: UserPaginationParams): Promise<UserListResponse> => {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('page', params.page.toString());
      queryParams.append('pageSize', params.pageSize.toString());

      if (params.filters?.login) {
        queryParams.append('login', params.filters.login);
      }
      if (params.filters?.nome) {
        queryParams.append('nome', params.filters.nome);
      }
      if (params.filters?.email) {
        queryParams.append('email', params.filters.email);
      }
      if (params.filters?.telefone) {
        queryParams.append('telefone', params.filters.telefone);
      }

      const response = await apiClient.get<UserListResponse>(`/usuarios?${queryParams.toString()}`);
      return response;
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      return {
        sucesso: false,
        mensagem: 'Erro ao carregar usuários',
        usuarios: [],
        total: 0,
      };
    }
  },

  /**
   * Busca todos os usuários
   */
  getAll: async (): Promise<User[]> => {
    try {
      const response = await apiClient.get<User[]>('/usuarios');
      return response;
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      return [];
    }
  },

  /**
   * Busca usuário por ID
   */
  getById: async (id: string): Promise<User | null> => {
    try {
      const response = await apiClient.get<User>(`/usuarios/${id}`);
      return response;
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      return null;
    }
  },

  /**
   * Cria novo usuário
   */
  create: async (user: UserFormData): Promise<UserOperationResponse> => {
    try {
      const response = await apiClient.post<User>('/usuarios', user);
      return {
        sucesso: true,
        mensagem: 'Usuário incluído com sucesso!',
        usuario: response,
      };
    } catch (error: any) {
      console.error('Erro ao criar usuário:', error);
      return {
        sucesso: false,
        mensagem: error.message || 'Não foi possível incluir o usuário!',
      };
    }
  },

  /**
   * Atualiza usuário existente
   */
  update: async (id: string, user: UserFormData): Promise<UserOperationResponse> => {
    try {
      const response = await apiClient.put<User>(`/usuarios/${id}`, user);
      return {
        sucesso: true,
        mensagem: 'Usuário alterado com sucesso!',
        usuario: response,
      };
    } catch (error: any) {
      console.error('Erro ao atualizar usuário:', error);
      return {
        sucesso: false,
        mensagem: error.message || 'Não foi possível alterar o usuário!',
      };
    }
  },

  /**
   * Exclui um ou mais usuários
   */
  delete: async (userIds: string[]): Promise<UserOperationResponse> => {
    try {
      if (userIds.length === 1) {
        await apiClient.delete(`/usuarios/${userIds[0]}`);
        return {
          sucesso: true,
          mensagem: 'Usuário excluído com sucesso!',
        };
      } else {
        // Exclusão em lote
        await apiClient.post('/usuarios/delete-multiple', { ids: userIds });
        return {
          sucesso: true,
          mensagem: `${userIds.length} usuário(s) excluído(s) com sucesso!`,
        };
      }
    } catch (error: any) {
      console.error('Erro ao excluir usuário(s):', error);
      return {
        sucesso: false,
        mensagem: error.message || 'Não foi possível excluir o(s) usuário(s)!',
      };
    }
  },
};
