import { Nullable } from '../utils/Nullable';
import Role from './Role';

export interface User {
  id: number;
  name: string; // (modifyable)
  email: string;
  photo: Nullable<string>; // (modifyable)
  role: Role;
  createdAt: string;
  // password (modifyable)
}
