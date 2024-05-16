import Subject from './Subject';
import Type from './Type';

export type Answer = { title: string; isCorrect: boolean };

export interface Question {
  id: number;
  title: string;
  type: Type;
  answers: Answer[];
  createdAt: Date;
  authorId?: number;
  subject?: Subject;
}
