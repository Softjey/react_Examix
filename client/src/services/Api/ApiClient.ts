import axiosCLient from 'axios';
import { AuthResponse, User } from './interfaces';

const axios = axiosCLient.create({
  baseURL: 'http://localhost:3005',
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
}
