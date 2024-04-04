import axiosCLient from 'axios';
import { AuthResponse } from './interfaces';

const axios = axiosCLient.create({
  baseURL: 'http://localhost:3005',
  withCredentials: true,
});

export default class ApiClient {
  static async authenticate() {
    const { data } = await axios.get<AuthResponse>('/auth');

    return data.user;
  }
}
