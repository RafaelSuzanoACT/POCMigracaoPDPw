/**
 * Componente: UserRegistry
 * Tela: Cadastro de Usuários (frmCadUsuario.aspx)
 *
 * Funcionalidades:
 * - Formulário de cadastro com Login, Nome, E-mail e Telefone
 * - Listagem paginada de usuários (4 por página)
 * - Pesquisa com filtros (login, nome, email, telefone)
 * - Inclusão, alteração e exclusão de usuários
 * - Seleção múltipla para exclusão
 */

import React, { useState, useEffect } from 'react';
import {
  User,
  UserFormData,
  UserListResponse,
  UserFilters,
  UserPaginationParams,
  UserFormMode,
} from '../../types/user';
import styles from './UserRegistry.module.css';

interface UserRegistryProps {
  onLoadUsers?: (params: UserPaginationParams) => Promise<UserListResponse>;
  onSaveUser?: (
    user: UserFormData,
    mode: UserFormMode
  ) => Promise<{ sucesso: boolean; mensagem: string }>;
  onDeleteUsers?: (userIds: string[]) => Promise<{ sucesso: boolean; mensagem: string }>;
}

const UserRegistry: React.FC<UserRegistryProps> = ({ onLoadUsers, onSaveUser, onDeleteUsers }) => {
  const [formData, setFormData] = useState<UserFormData>({
    usuar_id: '',
    usuar_nome: '',
    usuar_email: '',
    usuar_telefone: '',
  });

  const [filters, setFilters] = useState<UserFilters>({});
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [formMode, setFormMode] = useState<UserFormMode>(UserFormMode.CREATE);

  // Paginação
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(4); // 4 registros por página (conforme legado)
  const [totalItems, setTotalItems] = useState(0);

  // Estado dos botões
  const [buttonsState, setButtonsState] = useState({
    pesquisar: true,
    alterar: false,
    salvar: true,
    excluir: false,
    cancelar: true,
  });

  useEffect(() => {
    // Não carrega automaticamente, só após pesquisa
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    setMessage('');

    try {
      let response: UserListResponse;

      if (onLoadUsers) {
        response = await onLoadUsers({
          page: currentPage,
          pageSize,
          filters,
        });
      } else {
        // Mock data para desenvolvimento
        response = generateMockUsers(currentPage, pageSize, filters);
      }

      if (response.sucesso) {
        setUsers(response.usuarios);
        setTotalItems(response.total);

        // Habilita botões de alteração e exclusão se houver registros
        if (response.usuarios.length > 0) {
          setButtonsState((prev) => ({
            ...prev,
            alterar: true,
            excluir: true,
          }));
        }
      } else {
        setMessage(response.mensagem || 'Erro ao carregar usuários');
        setUsers([]);
      }
    } catch (error) {
      setMessage('Erro ao carregar usuários');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof UserFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFilterChange = (field: keyof UserFilters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePesquisar = () => {
    setCurrentPage(0);
    setSelectedUsers(new Set());
    loadUsers();
  };

  const handleAlterar = () => {
    if (selectedUsers.size === 0) {
      alert('Selecione pelo menos um item para alteração.');
      return;
    }

    if (selectedUsers.size > 1) {
      alert('Marque somente um item para alteração!');
      return;
    }

    const userId = Array.from(selectedUsers)[0];
    const user = users.find((u) => u.usuar_id === userId);

    if (user) {
      setFormData({
        usuar_id: user.usuar_id,
        usuar_nome: user.usuar_nome,
        usuar_email: user.usuar_email,
        usuar_telefone: user.usuar_telefone,
      });
      setFormMode(UserFormMode.EDIT);
      setButtonsState({
        pesquisar: false,
        alterar: false,
        salvar: true,
        excluir: false,
        cancelar: true,
      });
    }
  };

  const handleSalvar = async () => {
    // Validação
    if (
      !formData.usuar_id ||
      !formData.usuar_nome ||
      !formData.usuar_email ||
      !formData.usuar_telefone
    ) {
      alert('Não foi possível incluir o usuário! Preencha todos os campos.');
      return;
    }

    setLoading(true);
    try {
      let result: { sucesso: boolean; mensagem: string };

      if (onSaveUser) {
        result = await onSaveUser(formData, formMode);
      } else {
        // Mock para desenvolvimento
        result = {
          sucesso: true,
          mensagem:
            formMode === UserFormMode.EDIT
              ? 'Usuário alterado com sucesso!'
              : 'Usuário incluído com sucesso!',
        };
      }

      if (result.sucesso) {
        const successMessage = result.mensagem;
        handleCancelar();
        setMessage(successMessage);
        loadUsers();
      } else {
        alert(result.mensagem);
      }
    } catch (error) {
      alert('Não foi possível salvar o usuário!');
    } finally {
      setLoading(false);
    }
  };

  const handleExcluir = async () => {
    if (selectedUsers.size === 0) {
      alert('Selecione pelo menos um item para exclusão.');
      return;
    }

    if (!window.confirm(`Confirma a exclusão de ${selectedUsers.size} usuário(s)?`)) {
      return;
    }

    setLoading(true);
    try {
      let result: { sucesso: boolean; mensagem: string };

      if (onDeleteUsers) {
        result = await onDeleteUsers(Array.from(selectedUsers));
      } else {
        // Mock para desenvolvimento
        result = {
          sucesso: true,
          mensagem: 'Usuário(s) excluído(s) com sucesso!',
        };
      }

      if (result.sucesso) {
        setMessage(result.mensagem);
        setSelectedUsers(new Set());
        loadUsers();
      } else {
        alert(result.mensagem || 'Não foi possível excluir o(s) registro(s)!');
      }
    } catch (error) {
      alert('Não foi possível excluir o(s) registro(s)!');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelar = () => {
    setFormData({
      usuar_id: '',
      usuar_nome: '',
      usuar_email: '',
      usuar_telefone: '',
    });
    setFormMode(UserFormMode.CREATE);
    setSelectedUsers(new Set());
    setButtonsState({
      pesquisar: true,
      alterar: false,
      salvar: true,
      excluir: false,
      cancelar: true,
    });
  };

  const handleCheckboxChange = (userId: string) => {
    setSelectedUsers((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setSelectedUsers(new Set());
  };

  useEffect(() => {
    if (currentPage >= 0 && users.length > 0) {
      loadUsers();
    }
  }, [currentPage]);

  const totalPages = Math.ceil(totalItems / pageSize);
  const isLoginDisabled = formMode === UserFormMode.EDIT;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Cadastro de Usuários</h1>
      </div>

      <div className={styles.content}>
        <div className={styles.formSection}>
          <div className={styles.formRow}>
            <label className={styles.label}>Login:&nbsp;</label>
            <input
              type="text"
              className={styles.inputShort}
              value={formData.usuar_id}
              onChange={(e) => handleInputChange('usuar_id', e.target.value)}
              maxLength={8}
              disabled={isLoginDisabled}
            />
          </div>

          <div className={styles.formRow}>
            <label className={styles.label}>Nome:&nbsp;</label>
            <input
              type="text"
              className={styles.inputLong}
              value={formData.usuar_nome}
              onChange={(e) => handleInputChange('usuar_nome', e.target.value)}
              maxLength={40}
            />
          </div>

          <div className={styles.formRow}>
            <label className={styles.label}>E-mail:&nbsp;</label>
            <input
              type="text"
              className={styles.inputLong}
              value={formData.usuar_email}
              onChange={(e) => handleInputChange('usuar_email', e.target.value)}
              maxLength={40}
            />
          </div>

          <div className={styles.formRow}>
            <label className={styles.label}>Telefone:&nbsp;</label>
            <input
              type="text"
              className={styles.inputMedium}
              value={formData.usuar_telefone}
              onChange={(e) => handleInputChange('usuar_telefone', e.target.value)}
              maxLength={20}
            />
          </div>
        </div>

        {message && <div className={styles.message}>{message}</div>}

        {loading ? (
          <div className={styles.loading}>Carregando...</div>
        ) : (
          <>
            {users.length > 0 && (
              <div className={styles.tableSection}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th style={{ width: '20px' }}></th>
                      <th style={{ width: '100px' }}>Login</th>
                      <th style={{ width: '200px' }}>Nome</th>
                      <th style={{ width: '200px' }}>E-mail</th>
                      <th style={{ width: '100px' }}>Telefone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr
                        key={user.usuar_id}
                        className={index % 2 === 0 ? styles.evenRow : styles.oddRow}
                      >
                        <td className={styles.checkboxCell}>
                          <input
                            type="checkbox"
                            checked={selectedUsers.has(user.usuar_id)}
                            onChange={() => handleCheckboxChange(user.usuar_id)}
                          />
                        </td>
                        <td>{user.usuar_id}</td>
                        <td>{user.usuar_nome}</td>
                        <td>{user.usuar_email}</td>
                        <td>{user.usuar_telefone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {totalPages > 1 && (
                  <div className={styles.pagination}>
                    {currentPage > 0 && (
                      <button onClick={() => handlePageChange(currentPage - 1)}>
                        &lt;Anterior
                      </button>
                    )}
                    <span className={styles.pageInfo}>
                      Página {currentPage + 1} de {totalPages}
                    </span>
                    {currentPage < totalPages - 1 && (
                      <button onClick={() => handlePageChange(currentPage + 1)}>Próxima&gt;</button>
                    )}
                  </div>
                )}
              </div>
            )}
          </>
        )}

        <div className={styles.buttonSection}>
          <button
            className={styles.button}
            onClick={handlePesquisar}
            disabled={!buttonsState.pesquisar || loading}
          >
            Pesquisar
          </button>
          <button
            className={styles.button}
            onClick={handleAlterar}
            disabled={!buttonsState.alterar || loading}
          >
            Alterar
          </button>
          <button
            className={styles.button}
            onClick={handleSalvar}
            disabled={!buttonsState.salvar || loading}
          >
            Salvar
          </button>
          <button
            className={styles.button}
            onClick={handleExcluir}
            disabled={!buttonsState.excluir || loading}
          >
            Excluir
          </button>
          <button
            className={styles.button}
            onClick={handleCancelar}
            disabled={!buttonsState.cancelar || loading}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Função para gerar dados mock durante desenvolvimento
 */
function generateMockUsers(page: number, pageSize: number, filters: UserFilters): UserListResponse {
  const allUsers: User[] = [
    {
      usuar_id: 'admin',
      usuar_nome: 'Administrador do Sistema',
      usuar_email: 'admin@ons.org.br',
      usuar_telefone: '(21) 3444-9000',
    },
    {
      usuar_id: 'jsilva',
      usuar_nome: 'João da Silva',
      usuar_email: 'joao.silva@ons.org.br',
      usuar_telefone: '(21) 3444-9001',
    },
    {
      usuar_id: 'mferreira',
      usuar_nome: 'Maria Ferreira',
      usuar_email: 'maria.ferreira@ons.org.br',
      usuar_telefone: '(21) 3444-9002',
    },
    {
      usuar_id: 'psantos',
      usuar_nome: 'Pedro Santos',
      usuar_email: 'pedro.santos@ons.org.br',
      usuar_telefone: '(21) 3444-9003',
    },
    {
      usuar_id: 'acosta',
      usuar_nome: 'Ana Costa',
      usuar_email: 'ana.costa@ons.org.br',
      usuar_telefone: '(21) 3444-9004',
    },
    {
      usuar_id: 'roliveira',
      usuar_nome: 'Ricardo Oliveira',
      usuar_email: 'ricardo.oliveira@ons.org.br',
      usuar_telefone: '(21) 3444-9005',
    },
    {
      usuar_id: 'csouza',
      usuar_nome: 'Carlos Souza',
      usuar_email: 'carlos.souza@ons.org.br',
      usuar_telefone: '(21) 3444-9006',
    },
    {
      usuar_id: 'flima',
      usuar_nome: 'Fernanda Lima',
      usuar_email: 'fernanda.lima@ons.org.br',
      usuar_telefone: '(21) 3444-9007',
    },
    {
      usuar_id: 'arodrigues',
      usuar_nome: 'André Rodrigues',
      usuar_email: 'andre.rodrigues@ons.org.br',
      usuar_telefone: '(21) 3444-9008',
    },
    {
      usuar_id: 'jalves',
      usuar_nome: 'Juliana Alves',
      usuar_email: 'juliana.alves@ons.org.br',
      usuar_telefone: '(21) 3444-9009',
    },
  ];

  // Aplicar filtros
  let filteredUsers = allUsers;

  if (filters.login) {
    filteredUsers = filteredUsers.filter((u) =>
      u.usuar_id.toLowerCase().includes(filters.login!.toLowerCase())
    );
  }

  if (filters.nome) {
    filteredUsers = filteredUsers.filter((u) =>
      u.usuar_nome.toLowerCase().includes(filters.nome!.toLowerCase())
    );
  }

  if (filters.email) {
    filteredUsers = filteredUsers.filter((u) =>
      u.usuar_email.toLowerCase().includes(filters.email!.toLowerCase())
    );
  }

  if (filters.telefone) {
    filteredUsers = filteredUsers.filter((u) => u.usuar_telefone.includes(filters.telefone!));
  }

  const start = page * pageSize;
  const end = start + pageSize;
  const paginatedUsers = filteredUsers.slice(start, end);

  return {
    sucesso: true,
    usuarios: paginatedUsers,
    total: filteredUsers.length,
  };
}

export default UserRegistry;
