import type { User, LoginCredentials } from '../types/User';

const API_BASE_URL = 'http://localhost:3001';

// Simulação de banco de dados fake
let users: User[] = [
  {
    id: 1,
    userName: 'admin',
    name: 'Admin',
    lastName: 'User',
    password: 'admin123',
    email: 'admin@example.com',
    address: '123 Admin Street',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-02')
  }
];

// Simular delay de rede
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Login
  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    await delay(500);
    
    const user = users.find(u => 
      u.userName === credentials.userName && u.password === credentials.password
    );

    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    // Simular token JWT
    const token = btoa(JSON.stringify({ 
      id: user.id, 
      userName: user.userName,
      exp: Date.now() + 24 * 60 * 60 * 1000 // 24 horas
    }));

    return { user, token };
  },

  // CRUD Operations
  async getUsers(): Promise<User[]> {
    await delay(300);
    return users;
  },

  async getUserById(id: number): Promise<User> {
    await delay(300);
    const user = users.find(u => u.id === id);
    if (!user) throw new Error('Usuário não encontrado');
    return user;
  },

  async createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    await delay(500);
    
    const newUser: User = {
      ...userData,
      id: Math.max(...users.map(u => u.id)) + 1,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    users.push(newUser);
    return newUser;
  },

  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    await delay(500);
    
    const index = users.findIndex(u => u.id === id);
    if (index === -1) throw new Error('Usuário não encontrado');

    users[index] = {
      ...users[index],
      ...userData,
      updatedAt: new Date()
    };

    return users[index];
  },

  async deleteUser(id: number): Promise<void> {
    await delay(500);
    users = users.filter(u => u.id !== id);
  }
};