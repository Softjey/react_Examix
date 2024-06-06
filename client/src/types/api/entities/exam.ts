import { Test } from './test';
import { Result } from './Result';
import { User } from './user';

export interface Exam {
  id: number;
  authorId: User['id'];
  createdAt: string;
  test: Pick<Test, 'id' | 'name' | 'image' | 'description' | 'subject' | 'createdAt'>;
  results: Pick<Result, 'studentName'>[];
}
