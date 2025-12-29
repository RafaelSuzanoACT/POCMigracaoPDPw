/**
 * Testes para o serviço de usuários
 * Valida integração com backend em localhost:5001/api
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { userService } from '../../src/services/userService';
import { UserFormData, UserPaginationParams } from '../../src/types/user';

// Mock do apiClient
vi.mock('../../src/services/apiClient', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('userService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('list', () => {
    it('deve chamar a API com parâmetros corretos', async () => {
      const { apiClient } = await import('../../src/services/apiClient');
      const mockResponse = {
        sucesso: true,
        usuarios: [
          {
            usuar_id: 'admin',
            usuar_nome: 'Admin',
            usuar_email: 'admin@test.com',
            usuar_telefone: '1234567890',
          },
        ],
        total: 1,
      };

      vi.mocked(apiClient.get).mockResolvedValue(mockResponse);

      const params: UserPaginationParams = {
        page: 0,
        pageSize: 4,
        filters: {
          login: 'admin',
        },
      };

      const result = await userService.list(params);

      expect(apiClient.get).toHaveBeenCalledWith(
        expect.stringContaining('/usuarios?')
      );
      expect(apiClient.get).toHaveBeenCalledWith(
        expect.stringContaining('page=0')
      );
      expect(apiClient.get).toHaveBeenCalledWith(
        expect.stringContaining('pageSize=4')
      );
      expect(apiClient.get).toHaveBeenCalledWith(
        expect.stringContaining('login=admin')
      );
      expect(result).toEqual(mockResponse);
    });

    it('deve retornar erro em caso de falha na API', async () => {
      const { apiClient } = await import('../../src/services/apiClient');
      vi.mocked(apiClient.get).mockRejectedValue(new Error('Network error'));

      const params: UserPaginationParams = {
        page: 0,
        pageSize: 4,
      };

      const result = await userService.list(params);

      expect(result.sucesso).toBe(false);
      expect(result.mensagem).toBe('Erro ao carregar usuários');
      expect(result.usuarios).toEqual([]);
      expect(result.total).toBe(0);
    });
  });

  describe('create', () => {
    it('deve criar um novo usuário', async () => {
      const { apiClient } = await import('../../src/services/apiClient');
      const newUser: UserFormData = {
        usuar_id: 'newuser',
        usuar_nome: 'New User',
        usuar_email: 'newuser@test.com',
        usuar_telefone: '9876543210',
      };

      const mockResponse = newUser;
      vi.mocked(apiClient.post).mockResolvedValue(mockResponse);

      const result = await userService.create(newUser);

      expect(apiClient.post).toHaveBeenCalledWith('/usuarios', newUser);
      expect(result.sucesso).toBe(true);
      expect(result.mensagem).toBe('Usuário incluído com sucesso!');
      expect(result.usuario).toEqual(mockResponse);
    });

    it('deve retornar erro em caso de falha', async () => {
      const { apiClient } = await import('../../src/services/apiClient');
      const newUser: UserFormData = {
        usuar_id: 'newuser',
        usuar_nome: 'New User',
        usuar_email: 'newuser@test.com',
        usuar_telefone: '9876543210',
      };

      vi.mocked(apiClient.post).mockRejectedValue(new Error('Validation error'));

      const result = await userService.create(newUser);

      expect(result.sucesso).toBe(false);
      expect(result.mensagem).toContain('Não foi possível incluir o usuário!');
    });
  });

  describe('update', () => {
    it('deve atualizar um usuário existente', async () => {
      const { apiClient } = await import('../../src/services/apiClient');
      const userId = 'admin';
      const updatedUser: UserFormData = {
        usuar_id: userId,
        usuar_nome: 'Admin Updated',
        usuar_email: 'admin.updated@test.com',
        usuar_telefone: '1111111111',
      };

      const mockResponse = updatedUser;
      vi.mocked(apiClient.put).mockResolvedValue(mockResponse);

      const result = await userService.update(userId, updatedUser);

      expect(apiClient.put).toHaveBeenCalledWith(`/usuarios/${userId}`, updatedUser);
      expect(result.sucesso).toBe(true);
      expect(result.mensagem).toBe('Usuário alterado com sucesso!');
      expect(result.usuario).toEqual(mockResponse);
    });
  });

  describe('delete', () => {
    it('deve excluir um único usuário', async () => {
      const { apiClient } = await import('../../src/services/apiClient');
      const userId = 'admin';

      vi.mocked(apiClient.delete).mockResolvedValue(undefined);

      const result = await userService.delete([userId]);

      expect(apiClient.delete).toHaveBeenCalledWith(`/usuarios/${userId}`);
      expect(result.sucesso).toBe(true);
      expect(result.mensagem).toBe('Usuário excluído com sucesso!');
    });

    it('deve excluir múltiplos usuários', async () => {
      const { apiClient } = await import('../../src/services/apiClient');
      const userIds = ['admin', 'user1', 'user2'];

      vi.mocked(apiClient.post).mockResolvedValue(undefined);

      const result = await userService.delete(userIds);

      expect(apiClient.post).toHaveBeenCalledWith('/usuarios/delete-multiple', {
        ids: userIds,
      });
      expect(result.sucesso).toBe(true);
      expect(result.mensagem).toBe('3 usuário(s) excluído(s) com sucesso!');
    });
  });

  describe('getAll', () => {
    it('deve buscar todos os usuários', async () => {
      const { apiClient } = await import('../../src/services/apiClient');
      const mockUsers = [
        {
          usuar_id: 'admin',
          usuar_nome: 'Admin',
          usuar_email: 'admin@test.com',
          usuar_telefone: '1234567890',
        },
        {
          usuar_id: 'user1',
          usuar_nome: 'User 1',
          usuar_email: 'user1@test.com',
          usuar_telefone: '0987654321',
        },
      ];

      vi.mocked(apiClient.get).mockResolvedValue(mockUsers);

      const result = await userService.getAll();

      expect(apiClient.get).toHaveBeenCalledWith('/usuarios');
      expect(result).toEqual(mockUsers);
    });

    it('deve retornar array vazio em caso de erro', async () => {
      const { apiClient } = await import('../../src/services/apiClient');
      vi.mocked(apiClient.get).mockRejectedValue(new Error('Network error'));

      const result = await userService.getAll();

      expect(result).toEqual([]);
    });
  });

  describe('getById', () => {
    it('deve buscar usuário por ID', async () => {
      const { apiClient } = await import('../../src/services/apiClient');
      const userId = 'admin';
      const mockUser = {
        usuar_id: userId,
        usuar_nome: 'Admin',
        usuar_email: 'admin@test.com',
        usuar_telefone: '1234567890',
      };

      vi.mocked(apiClient.get).mockResolvedValue(mockUser);

      const result = await userService.getById(userId);

      expect(apiClient.get).toHaveBeenCalledWith(`/usuarios/${userId}`);
      expect(result).toEqual(mockUser);
    });

    it('deve retornar null em caso de erro', async () => {
      const { apiClient } = await import('../../src/services/apiClient');
      vi.mocked(apiClient.get).mockRejectedValue(new Error('Not found'));

      const result = await userService.getById('nonexistent');

      expect(result).toBeNull();
    });
  });
});
