export interface User {
  id: number;
  name: string;
  email: string;
  photo?: string;
  role: 'TEACHER' | 'ADMIN';
  createdAt: string;
}
