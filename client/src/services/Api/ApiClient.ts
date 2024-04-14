import axiosCLient from 'axios';
import { AuthResponse, CreateUserDto, CreateUserResponse, User } from './interfaces';

const axios = axiosCLient.create({
  baseURL: import.meta.env.VITE_SERVER_HTTP_URL,
  withCredentials: true,
});

export default class ApiClient {
  static async authenticate() {
    const { data } = await axios.get<AuthResponse>('/auth');

    return data.user;
  }

  static async login(email: User['email'], password: User['password']) {
    const { data } = await axios.post<AuthResponse>('/auth/login', {
      email,
      password,
    });

    return data.user;
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
