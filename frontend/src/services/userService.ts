import { User } from '../types/user';

const MOCK_USERS: User[] = [
  {
    usuar_id: 'admin',
    usuar_nome: 'Administrador do Sistema',
    usuar_email: 'admin@ons.org.br',
    usuar_telefone: '(21) 9999-9999'
  },
  {
    usuar_id: 'operador',
    usuar_nome: 'Operador PDP',
    usuar_email: 'operador@ons.org.br',
    usuar_telefone: '(21) 8888-8888'
  }
];

export const userService = {
  getAll: async (): Promise<User[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...MOCK_USERS]), 500);
    });
  },

  search: async (filters: Partial<User>): Promise<User[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let results = [...MOCK_USERS];
        if (filters.usuar_id) {
          results = results.filter(u => u.usuar_id.toLowerCase().includes(filters.usuar_id!.toLowerCase()));
        }
        if (filters.usuar_nome) {
          results = results.filter(u => u.usuar_nome.toLowerCase().includes(filters.usuar_nome!.toLowerCase()));
        }
        if (filters.usuar_email) {
          results = results.filter(u => u.usuar_email.toLowerCase().includes(filters.usuar_email!.toLowerCase()));
        }
        resolve(results);
      }, 500);
    });
  },

  create: async (user: User): Promise<User> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        MOCK_USERS.push(user);
        resolve(user);
      }, 500);
    });
  },

  update: async (id: string, user: Partial<User>): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = MOCK_USERS.findIndex(u => u.usuar_id === id);
        if (index !== -1) {
          MOCK_USERS[index] = { ...MOCK_USERS[index], ...user };
          resolve(MOCK_USERS[index]);
        } else {
          reject(new Error('User not found'));
        }
      }, 500);
    });
  },

  delete: async (id: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = MOCK_USERS.findIndex(u => u.usuar_id === id);
        if (index !== -1) {
          MOCK_USERS.splice(index, 1);
        }
        resolve();
      }, 500);
    });
  }
};
