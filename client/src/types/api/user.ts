import Role from './Role';

export interface User {
  id: number;
  name: string;
  email: string;
  photo?: string;
  role: Role;
  createdAt: string;
}
