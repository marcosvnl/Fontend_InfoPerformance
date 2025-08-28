export interface User {
  id: number;
  userName: string;
  name: string;
  lastName: string;
  password: string;
  email: string;
  address: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface LoginCredentials {
  userName: string;
  password: string;
}