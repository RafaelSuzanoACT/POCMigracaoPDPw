import React, { useState, useEffect } from 'react';
import styles from './UserManagement.module.css';
import { User } from '../../../types/user';
import { userService } from '../../../services/userService';

const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  // Form state
  const [formData, setFormData] = useState<Partial<User>>({
    usuar_id: '',
    usuar_nome: '',
    usuar_email: '',
    usuar_telefone: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const result = await userService.getAll();
      setUsers(result);
    } catch (err) {
      setError('Erro ao carregar usuários.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const result = await userService.search(formData);
      setUsers(result);
    } catch (err) {
      setError('Erro ao pesquisar usuários.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.usuar_id || !formData.usuar_nome) {
      alert('Login e Nome são obrigatórios.');
      return;
    }

    try {
      if (isEditing) {
        await userService.update(formData.usuar_id, formData);
        alert('Usuário atualizado com sucesso!');
      } else {
        await userService.create(formData as User);
        alert('Usuário criado com sucesso!');
      }
      handleCancel(); // Reset form
      loadUsers();
    } catch (err) {
      alert('Erro ao salvar usuário.');
    }
  };

  const handleEdit = () => {
    if (selectedIds.length !== 1) {
      alert('Selecione apenas um usuário para alterar.');
      return;
    }
    const userToEdit = users.find(u => u.usuar_id === selectedIds[0]);
    if (userToEdit) {
      setFormData({ ...userToEdit });
      setIsEditing(true);
    }
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0) {
      alert('Selecione usuários para excluir.');
      return;
    }
    if (window.confirm('Tem certeza que deseja excluir os usuários selecionados?')) {
      try {
        for (const id of selectedIds) {
          await userService.delete(id);
        }
        loadUsers();
        setSelectedIds([]);
      } catch (err) {
        alert('Erro ao excluir usuários.');
      }
    }
  };

  const handleCancel = () => {
    setFormData({
      usuar_id: '',
      usuar_nome: '',
      usuar_email: '',
      usuar_telefone: ''
    });
    setIsEditing(false);
    setSelectedIds([]);
  };

  const handleSelect = (id: string) => {
    setSelectedIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Cadastro de Usuários</h1>

      <div className={styles.formContainer}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="usuar_id">Login:</label>
            <input
              type="text"
              id="usuar_id"
              name="usuar_id"
              value={formData.usuar_id || ''}
              onChange={handleInputChange}
              disabled={isEditing} // Login usually cannot be changed
              maxLength={8}
              data-testid="input-login"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="usuar_nome">Nome:</label>
            <input
              type="text"
              id="usuar_nome"
              name="usuar_nome"
              value={formData.usuar_nome || ''}
              onChange={handleInputChange}
              maxLength={40}
              data-testid="input-nome"
            />
          </div>
        </div>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="usuar_email">E-mail:</label>
            <input
              type="text"
              id="usuar_email"
              name="usuar_email"
              value={formData.usuar_email || ''}
              onChange={handleInputChange}
              maxLength={40}
              data-testid="input-email"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="usuar_telefone">Telefone:</label>
            <input
              type="text"
              id="usuar_telefone"
              name="usuar_telefone"
              value={formData.usuar_telefone || ''}
              onChange={handleInputChange}
              maxLength={20}
              data-testid="input-telefone"
            />
          </div>
        </div>

        <div className={styles.actions}>
          <button className={`${styles.button} ${styles.buttonSecondary}`} onClick={handleSearch} disabled={isEditing} data-testid="btn-pesquisar">
            Pesquisar
          </button>
          <button className={`${styles.button} ${styles.buttonPrimary}`} onClick={handleSave} data-testid="btn-salvar">
            {isEditing ? 'Salvar Alterações' : 'Incluir'}
          </button>
          <button className={`${styles.button} ${styles.buttonSecondary}`} onClick={handleEdit} disabled={isEditing || selectedIds.length !== 1} data-testid="btn-alterar">
            Alterar
          </button>
          <button className={`${styles.button} ${styles.buttonDanger}`} onClick={handleDelete} disabled={selectedIds.length === 0} data-testid="btn-excluir">
            Excluir
          </button>
          <button className={`${styles.button} ${styles.buttonSecondary}`} onClick={handleCancel} data-testid="btn-cancelar">
            Cancelar
          </button>
        </div>
      </div>

      {loading && <p>Carregando...</p>}
      {error && <p className={styles.errorMessage}>{error}</p>}

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th></th>
              <th>Login</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Telefone</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.usuar_id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(user.usuar_id)}
                    onChange={() => handleSelect(user.usuar_id)}
                    data-testid={`checkbox-${user.usuar_id}`}
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
      </div>
    </div>
  );
};

export default UserManagementPage;
