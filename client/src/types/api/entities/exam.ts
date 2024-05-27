import { Test } from './test';
import { User } from './user';

export interface Exam {
  id: number;
  authorId: User['id'];
  createdAt: string;
  test: Pick<Test, 'id' | 'name' | 'image' | 'description' | 'subject' | 'createdAt'>;
  results: { studentName: string }[];
}
