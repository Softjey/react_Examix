export interface User {
  email: string;
  password: string;
}

export interface UserResponse {
  id: number;
  name: string;
  email: User['email'];
  role: 'TEACHER' | 'ADMIN';
  createdAt: string;
}

export interface AuthResponse {
  message: string;
  user: UserResponse;
}

export interface CreateUserDto {
  email: string;
  password: string;
  name: string;
  role: 'TEACHER' | 'ADMIN';
}

export interface CreateUserResponse {
  message: string;
  newUser: UserResponse;
}
