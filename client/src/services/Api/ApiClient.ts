import axiosCLient from 'axios';
import { User } from '../../types/api/user';
import { AuthResponse } from './types/auth';
import { CreateUserDto, CreateUserResponse } from './types/create-user';
import { WithMessage } from './types/utils';
import { GlobalSearchResponse } from './types/global-search';

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

  static async globalSearch(query: string, limit: number = 9) {
    const { data } = await axios.get<GlobalSearchResponse>('/search', {
      params: { query, limit },
    });

    return data.results;
  }
}
