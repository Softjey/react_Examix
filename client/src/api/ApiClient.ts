import axiosCLient from 'axios';
import { AuthResponse } from './interfaces';

const axios = axiosCLient.create({
  baseURL: 'http://localhost:3005',
  withCredentials: true,
});

export default class ApiClient {
  static async authenticate() {
    const { status, data } = await axios.get<AuthResponse>('/auth');

    if (status === 401) {
      throw new Error('Unauthorized');
    }

    return data.user;
  }
}
