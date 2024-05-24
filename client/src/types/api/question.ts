import { Nullable } from '../utils/Nullable';
import Subject from './Subject';
import Type from './Type';
import { User } from './user';

export type Answer = { title: string; isCorrect: boolean };

export interface Question {
  id: number;
  title: string;
  type: Type;
  answers: Answer[];
  createdAt: Date;
  authorId: Nullable<User['id']>;
  subject: Nullable<Subject>;
}
