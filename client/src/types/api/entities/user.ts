import { Nullable } from '../../utils/Nullable';
import Role from '../enums/Role';

export interface User {
  id: number;
  name: string;
  email: string;
  photo: Nullable<string>;
  role: Role;
  createdAt: string;
}
