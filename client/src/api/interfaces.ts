export interface UserResponse {
  id: number;
  name: string;
  email: string;
  role: 'TEACHER' | 'ADMIN';
  createdAt: string;
}

export interface AuthResponse {
  message: string;
  user: UserResponse;
}
