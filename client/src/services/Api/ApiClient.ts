import axiosCLient from 'axios';
import { AuthResponse, CreateUserDto, CreateUserResponse, WithMessage } from './interfaces';
import { User } from '../../types/user';

const axios = axiosCLient.create({
  baseURL: import.meta.env.VITE_SERVER_HTTP_URL,
  withCredentials: true,
});

export default class ApiClient {
  static async authenticate() {
    const { data } = await axios.get<AuthResponse>('/auth');

    return data.user;
  }

  static async login(email: User['email'], password: string) {
    const { data } = await axios.post<AuthResponse>('/auth/login', {
      email,
      password,
    });

    return data.user;
  }

  static async logout() {
    const { data } = await axios.get<WithMessage>('/auth/logout');

    return data.message;
  }

  static async createUser({ email, password, name, role }: CreateUserDto) {
    const { data } = await axios.post<CreateUserResponse>('/users', {
      email,
      password,
      name,
      role,
    });

    return data;
  }
}
