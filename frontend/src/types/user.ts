/**
 * Tipos TypeScript para o módulo de Usuários (frmCadUsuario.aspx)
 * 
 * Sistema: PDPw - Programação Diária de Produção
 * Módulo: Administração > Cadastro de Usuários
 */

/**
 * Interface para dados de usuário
 */
export interface User {
  usuar_id: string;        // Login do usuário (max 8 caracteres)
  usuar_nome: string;      // Nome completo (max 40 caracteres)
  usuar_email: string;     // E-mail (max 40 caracteres)
  usuar_telefone: string;  // Telefone (max 20 caracteres)
}

/**
 * Interface para formulário de cadastro/edição de usuário
 */
export interface UserFormData {
  usuar_id: string;
  usuar_nome: string;
  usuar_email: string;
  usuar_telefone: string;
}

/**
 * Interface para resposta da API de listagem de usuários
 */
export interface UserListResponse {
  sucesso: boolean;
  mensagem?: string;
  usuarios: User[];
  total: number;
}

/**
 * Interface para parâmetros de filtro de usuários
 */
export interface UserFilters {
  login?: string;
  nome?: string;
  email?: string;
  telefone?: string;
}

/**
 * Interface para parâmetros de paginação
 */
export interface UserPaginationParams {
  page: number;
  pageSize: number;
  filters?: UserFilters;
}

/**
 * Interface para operações CRUD de usuário
 */
export interface UserOperationResponse {
  sucesso: boolean;
  mensagem: string;
  usuario?: User;
}

/**
 * Enum para tipos de operação no formulário
 */
export enum UserFormMode {
  CREATE = 'create',
  EDIT = 'edit',
  VIEW = 'view'
}
