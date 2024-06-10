import { Nullable } from '../../utils/Nullable';
import Subject from '../enums/Subject';
import QuestionType from '../enums/Type';
import { User } from './user';

export type Answer = { title: string; isCorrect: boolean };
export type StudentAnswer = Pick<Answer, 'title'>;

export interface Question {
  id: number;
  title: string;
  type: QuestionType;
  answers: Answer[];
  createdAt: string;
  authorId: Nullable<User['id']>;
  subject: Nullable<Subject>;
}
