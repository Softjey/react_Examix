import { Nullable } from '../../utils/Nullable';
import Subject from '../enums/Subject';
import { User } from './user';

export interface Test {
  id: number;
  name: string;
  image: Nullable<string>;
  description: string;
  subject: Nullable<Subject>;
  authorId: User['id'];
  createdAt: string;
}
