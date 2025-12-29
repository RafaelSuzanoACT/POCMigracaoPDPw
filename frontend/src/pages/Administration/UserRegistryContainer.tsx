/**
 * Container para conectar UserRegistry com userService
 * Conecta o componente de apresentação com as chamadas reais à API
 */

import React from 'react';
import UserRegistry from './UserRegistry';
import { userService } from '../../services/userService';
import {
  UserFormData,
  UserPaginationParams,
  UserListResponse,
  UserFormMode,
} from '../../types/user';

const UserRegistryContainer: React.FC = () => {
  const handleLoadUsers = async (params: UserPaginationParams): Promise<UserListResponse> => {
    return await userService.list(params);
  };

  const handleSaveUser = async (
    user: UserFormData,
    mode: UserFormMode
  ): Promise<{ sucesso: boolean; mensagem: string }> => {
    if (mode === UserFormMode.EDIT) {
      return await userService.update(user.usuar_id, user);
    } else {
      return await userService.create(user);
    }
  };

  const handleDeleteUsers = async (
    userIds: string[]
  ): Promise<{ sucesso: boolean; mensagem: string }> => {
    return await userService.delete(userIds);
  };

  return (
    <UserRegistry
      onLoadUsers={handleLoadUsers}
      onSaveUser={handleSaveUser}
      onDeleteUsers={handleDeleteUsers}
    />
  );
};

export default UserRegistryContainer;
